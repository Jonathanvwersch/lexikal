from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import voyageai
import tempfile
from typing import List, Dict, Any
import os
from pathlib import Path
import logging
from pydantic import BaseModel

logger = logging.getLogger(__name__)

class ChunkProcessingResponse(BaseModel):
    status: str
    context_id: str
    processing_time: float

def process_pdf_document(pdf_data: bytes) -> List[Dict[str, Any]]:
    """Process a PDF document to create chunks with embeddings."""
    try:
        # Create temporary file and load PDF
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_file:
            temp_file.write(pdf_data)
            temp_file_path = temp_file.name
            
            loader = PyPDFLoader(temp_file_path)
            pages = loader.load()

        # Split into chunks
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=500,
            chunk_overlap=50,
            length_function=len,
            separators=["\n\n", "\n", " ", ""]
        )
        chunks = text_splitter.split_documents(pages)
        
        # Extract content from chunks
        chunk_contents = [chunk.page_content for chunk in chunks]
        
        # Get embeddings in batches
        vo = voyageai.Client()
        batch_size = 128
        embeddings_batches = [
            vo.embed(
                chunk_contents[i : i + batch_size],
                model="voyage-3",
                input_type="document"
            ).embeddings
            for i in range(0, len(chunk_contents), batch_size)
        ]
        
        # Flatten embeddings list
        embeddings = [e for batch in embeddings_batches for e in batch]
        
        # Combine chunks with their embeddings
        processed_chunks = [
            {
                "content": chunk.page_content,
                "embedding": embedding,
                "metadata": {
                    "page": chunk.metadata.get("page", 0),
                    "chunk_index": idx,
                    "source": Path(temp_file_path).name
                }
            }
            for idx, (chunk, embedding) in enumerate(zip(chunks, embeddings))
        ]

        return processed_chunks

    finally:
        if 'temp_file_path' in locals() and os.path.exists(temp_file_path):
            os.unlink(temp_file_path)