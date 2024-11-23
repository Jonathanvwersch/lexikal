"""Utility functions for chat-related operations including semantic search and response generation."""

import os
from typing import List, Tuple

import voyageai
from app.models.chunks import Chunk
from app.schemas.chat import ChatMessage
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
) -> Tuple[str, List[dict]]:
    """
    Generate a response using the relevant chunks and chat history
    """
    # Format context from chunks
    context = "\n\n".join([chunk["content"] for chunk in chunks])

    messages = []

    if history:
        messages.extend([{"role": msg.role, "content": msg.content} for msg in history])

    # Add system message with context and improved prompt
    messages.append(
        {
            "role": "system",
            "content": (
                f"You are a helpful AI assistant analyzing PDF documents. "
                f"Use the following context to answer the user's question:\n\n{context}\n\n"
                "If the answer cannot be found in the provided context, please indicate this "
                "and suggest uploading more documents or selecting additional contexts."
                "When referencing information, be specific about where it comes from in the document."
            ),
        }
    )

    messages.append({"role": "user", "content": query})

    # Get response from ChatGPT
    response = await openai_client.chat.completions.create(
        model="gpt-4", messages=messages, temperature=0.7
    )

    # Extract sources with more context
    sources = [
        {
            "context_id": chunk["context_id"],
            "content": chunk["content"][:200],  # Preview of the chunk
            "similarity": chunk.get("similarity", 0),  # Include similarity score
            "metadata": chunk.get("metadata", {}),  # Include metadata like page numbers
        }
        for chunk in chunks
    ]

    return response.choices[0].message.content, sources
