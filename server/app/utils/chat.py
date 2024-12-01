"""Utility functions for chat-related operations including semantic search and response generation."""

import os
from typing import List, Tuple

import voyageai
from app.models.chunks import Chunk
from app.schemas.chat import ChatMessage, ChatMessageSource
from dotenv import load_dotenv
from openai import AsyncOpenAI
from supabase import Client

load_dotenv()

# Initialize the clients
openai_client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
voyage_client = voyageai.Client(api_key=os.getenv("VOYAGE_API_KEY"))


async def get_relevant_chunks(
    db: Client, context_ids: List[str], query: str
) -> List[Chunk]:
    """
    Retrieve relevant chunks from the database using semantic search with multimodal embeddings
    """
    query_embedding = voyage_client.multimodal_embed(
        inputs=[[query]], model="voyage-multimodal-3", input_type="query"
    ).embeddings[0]

    response = db.rpc(
        "match_chunks",
        {
            "query_embedding": query_embedding,
            "context_ids": context_ids,
            "match_threshold": 0.0,
            "match_count": 10,
        },
    ).execute()

    if not response.data:
        return []

    contents = [chunk["content"] for chunk in response.data]

    reranked = voyage_client.rerank(query, contents, model="rerank-2", top_k=3)

    scored_chunks = []
    for result in reranked.results:
        original_chunk = response.data[result.index]
        original_chunk["similarity"] = result.relevance_score
        scored_chunks.append(original_chunk)

    return scored_chunks


async def generate_response(
    query: str, chunks: List[Chunk], history: List[ChatMessage] = None
) -> Tuple[str, List[ChatMessageSource]]:
    """
    Generate a response using the relevant chunks and chat history with citations
    """
    # Format context from chunks with identifiers
    context_with_refs = []
    for i, chunk in enumerate(chunks):
        # Create a reference ID for each chunk starting from 0
        citation_id = f"{i}"
        context_with_refs.append(
            f"Context citation ID: {citation_id}, Context: {chunk['content']}"
        )

    context = "\n\n".join(context_with_refs)

    messages = []
    if history:
        messages.extend([{"role": msg.role, "content": msg.content} for msg in history])

    # Updated system prompt to request citations
    messages.append(
        {
            "role": "system",
            "content": (
                "You are a world class researcher. "
                "You are going to be provided with a set of chunks of information, known henceforth as context, sourced from a document using retrieval augmented generation. "
                "Your job is to synthesize the information and provide a detailed and comprehensive response to the user's query based solely on the context provided. "
                "The context are presented in a list format separated by spaces. Each chunk has an associated citation ID. "
                "Here is the context:\n\n"
                f"{context}\n\n"
                "Requirements for your response:"
                "1. If you reference a specific context chunk within your response, include the citation ID DIRECTLY in square brackets, i.e. [X] where X is the citation ID (starting from 0), after the reference, just as a world class researcher would do."
                "2. If you combine information from multiple chunks, include all relevant citations at the end of your response. Each citation should be cited within its own square brackets like [X][Y]. But in general, cite each chunk context individually."
                "3. If the answer cannot be found in the provided context, indicate this clearly by stating the following: 'Based on the available context, I don't have enough information to answer that question.'"
                "4. Make your citations flow naturally within sentences while being precise about sources"
                "5. Your response should be detailed and comprehensive, and cite the relevant context chunks to support your points of view."
            ),
        }
    )

    messages.append({"role": "user", "content": query})

    # Get response from ChatGPT
    response = await openai_client.chat.completions.create(
        model="gpt-4",
        messages=messages,
        temperature=0,
    )

    # Extract sources with zero-based citation IDs
    sources = [
        {
            "context_id": chunk["context_id"],
            "content": chunk["content"],
            "similarity": chunk.get("similarity", 0),
            "metadata": chunk.get("metadata", {}),
            "citation_id": f"{i}",
        }
        for i, chunk in enumerate(chunks)
    ]

    return response.choices[0].message.content, sources
