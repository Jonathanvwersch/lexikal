from typing import List, Tuple

from ..models.chunks import Chunk
from ..schemas.chat import ChatMessage
from langchain_openai import OpenAIEmbeddings
from supabase import Client
from openai import AsyncOpenAI
import os

# Initialize the async client
client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

async def get_relevant_chunks(db: Client, context_ids: List[str], query: str) -> List[Chunk]:
    """
    Retrieve relevant chunks from the database using semantic search
    """
    embeddings = OpenAIEmbeddings()
    query_embedding = embeddings.embed_query(query)

    # Perform vector similarity search against chunks
    response = db.rpc(
        'match_chunks',
        {
            'query_embedding': query_embedding,
            'context_ids': context_ids,
            'match_count': 5,
            'match_threshold': 0.5
        }
    ).execute()

    
    if not response.data:
        return []
        
    return response.data

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
        "content": f"You are a helpful AI assistant. Use the following context to answer the user's question:\n\n{context}. If you are unable to find the answer in the context, say so. If "
    })
    # Add user's query
    messages.append({"role": "user", "content": query})
    
    # Get response from ChatGPT using the async client
    response = await client.chat.completions.create(
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