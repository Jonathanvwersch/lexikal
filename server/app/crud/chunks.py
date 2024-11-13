from supabase import Client
from typing import List, Dict
import logging
import re

def clean_text(text: str) -> str:
    """Clean text by removing null bytes and invalid characters"""
    # Remove null bytes
    text = text.replace('\x00', '')
    # Replace other common problematic characters
    text = re.sub(r'[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]', '', text)
    return text

async def store_chunks(db: Client, context_id: str, chunks: List[Dict]):
    """Store document chunks and their embeddings in the database"""
    try:
        # Prepare chunks for insertion with cleaned text
        chunk_records = [{
            "context_id": context_id,
            "content": clean_text(chunk["content"]),  # Clean the text content
            "embedding": chunk["embedding"],
            "metadata": chunk.get("metadata", {})
        } for chunk in chunks]
        
        logging.debug(f"Inserting {len(chunk_records)} chunks for context_id: {context_id}")
        
        # Use upsert instead of insert
        response = (
            db.table('chunks')
            .upsert(chunk_records)
            .execute()
        )
        
        # Check for errors in the response
        if hasattr(response, 'error') and response.error:
            logging.error(f"Supabase error response: {response.error}")
            raise Exception(f"Supabase error: {response.error}")
            
        return response.data if hasattr(response, 'data') else []
        
    except Exception as e:
        logging.error(f"Error storing chunks: {str(e)}")
        raise

