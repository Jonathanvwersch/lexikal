from typing import List, Tuple
import voyageai
import numpy as np

from ..models.chunks import Chunk
from ..schemas.chat import ChatMessage
from supabase import Client
from openai import AsyncOpenAI

# Initialize the clients
openai_client = AsyncOpenAI()
voyage_client = voyageai.Client()  # This will use VOYAGE_API_KEY from environment variables

async def get_relevant_chunks(db: Client, context_ids: List[str], query: str) -> List[Chunk]:
    """
    Retrieve relevant chunks from the database using semantic search
    """
    # Get query embedding using Voyage AI
    query_embedding = voyage_client.embed(
        [query],
        model="voyage-3",
        input_type="query"
    ).embeddings[0]

    # Add after getting embeddings
    print(f"Query embedding norm: {np.linalg.norm(query_embedding)}")

    # Perform vector similarity search against chunks
    response = db.rpc(
        'match_chunks',
        {
            'query_embedding': query_embedding,
            'context_ids': context_ids,
            'match_threshold': 0.0,  # Remove threshold temporarily
            'match_count': 10
        }
    ).execute()

    # Add after vector search
    print(f"Initial matches: response")

    if not response.data:
        return []

    # Extract just the content for reranking
    contents = [chunk['content'] for chunk in response.data]
    
    # Rerank using only the text content
    reranked = voyage_client.rerank(
        query, 
        contents,  # Pass only the text content
        model="rerank-2",
        top_k=3
    )

    # Access the results property of RerankingObject
    scored_chunks = []
    for result in reranked.results:
        original_chunk = response.data[result.index]
        original_chunk['similarity'] = result.relevance_score
        scored_chunks.append(original_chunk)

    return scored_chunks

async def generate_response(
    query: str,
    chunks: List[Chunk],
    history: List[ChatMessage] = None
) -> Tuple[str, List[dict]]:
    """
    Generate a response using the relevant chunks and chat history
    """
    # Format context from chunks
    context = "\n\n".join([chunk["content"] for chunk in chunks])
    
    # Prepare messages for ChatGPT
    messages = []
    
    # Add chat history if provided
    if history:
        messages.extend([{"role": msg.role, "content": msg.content} for msg in history])

    # Add system message with context
    messages.append({
        "role": "system",
        "content": f"You are a helpful AI assistant. Use the following context to answer the user's question:\n\n{context}. If you are unable to find the answer in the context, say that the answer is not in the selected context and the user should upload more contexts or select additional contexts."
    })
    # Add user's query
    messages.append({"role": "user", "content": query})
    
    # Get response from ChatGPT using the async client
    response = await openai_client.chat.completions.create(
        model="gpt-4",
        messages=messages,
        temperature=0.7
    )
    
    # Extract sources from used chunks
    sources = [{
        "context_id": chunk["context_id"],
        "content": chunk["content"][:200]  # Preview of the chunk
    } for chunk in chunks]
    
    return response.choices[0].message.content, sources 