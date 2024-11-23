"""Database operations for managing document chunks and their embeddings."""

import logging
import re
from typing import Dict, List

from pydantic_settings import BaseSettings
from supabase import Client


def clean_text(text: str) -> str:
    """Clean text by removing null bytes and invalid characters"""
    # Remove null bytes
    text = text.replace("\x00", "")
    # Replace other common problematic characters
    text = re.sub(r"[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]", "", text)
    return text


async def store_chunks(db: Client, context_id: str, chunks: List[Dict]):
    """Store document chunks and their embeddings in the database"""
    try:
        # Prepare chunks for insertion with cleaned text
        chunk_records = [
            {
                "context_id": context_id,
                "content": clean_text(chunk["content"]),  # Clean the text content
                "embedding": chunk["embedding"],
                "metadata": chunk.get("metadata", {}),
            }
            for chunk in chunks
        ]

        logging.debug(
            "Inserting %d chunks for context_id: %s", len(chunk_records), context_id
        )

        # Use upsert instead of insert
        response = db.table("chunks").upsert(chunk_records).execute()

        # Check for errors in the response
        if hasattr(response, "error") and response.error:
            logging.error("Supabase error response: %s", response.error)
            raise RuntimeError(f"Supabase error: {response.error}")

        return response.data if hasattr(response, "data") else []

    except Exception as e:
        logging.error("Error storing chunks: %s", str(e))
        raise


class Settings(BaseSettings):
    """Configuration settings for text chunking and embedding parameters."""

    CHUNK_SIZE: int = 500
    CHUNK_OVERLAP: int = 50
    EMBEDDING_BATCH_SIZE: int = 20

    class Config:
        """Pydantic configuration class"""

        env_file = ".env"
        extra = "allow"  # Allow extra fields from environment variables


settings = Settings()
