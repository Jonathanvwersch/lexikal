from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
import tempfile
from typing import List, Dict, Any
import os
from pathlib import Path
import logging
from pydantic import BaseModel

# Set logging levels
logging.getLogger("httpx").setLevel(logging.WARNING)
logging.getLogger("httpcore").setLevel(logging.WARNING)
logging.getLogger("hpack").setLevel(logging.WARNING)

logger = logging.getLogger(__name__)

class ChunkProcessingResponse(BaseModel):
    status: str
    context_id: str
    processing_time: float

def process_pdf_document(pdf_data: bytes) -> List[Dict[str, Any]]:
    """Process a PDF document to create chunks with embeddings."""
    temp_file_path = None
    pages = []  # Initialize pages outside the try block
    
    try:
        # Create temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_file:
            temp_file.write(pdf_data)
            temp_file_path = temp_file.name

        # Load PDF
        logger.info("Loading PDF with PyPDFLoader")
        loader = PyPDFLoader(temp_file_path)
        pages = loader.load()  # Assign to the outer scope variable
        
        if not pages:
            logger.error("No pages found in PDF")
            raise ValueError("No pages found in PDF")

        # Create text splitter
        logger.info("Initializing text splitter")
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=500,
            chunk_overlap=50,
            length_function=len,
            separators=["\n\n", "\n", " ", ""]
        )

        # Split documents into chunks
        logger.info("Splitting documents into chunks")
        chunks = text_splitter.split_documents(pages)
        
        if not chunks:
            logger.error("No chunks created from document")
            raise ValueError("No chunks created from document")

        # Initialize embeddings
        logger.info("Initializing OpenAI embeddings")
        embeddings = OpenAIEmbeddings()

        # Process chunks and create embeddings
        processed_chunks = []
        for i, chunk in enumerate(chunks):
            try:
                embedding = embeddings.embed_query(chunk.page_content)
                processed_chunks.append({
                    "content": chunk.page_content,
                    "embedding": embedding,
                    "metadata": {
                        "page": chunk.metadata.get("page", 0),
                        "chunk_index": i,
                        "source": Path(temp_file_path).name
                    }
                })
            except Exception as e:
                logger.error(f"Failed to process chunk {i}: {str(e)}")
                raise

        logger.info(f"Successfully processed {len(processed_chunks)} chunks")
        return processed_chunks

    except Exception as e:
        logger.error(f"Error processing PDF: {str(e)}", exc_info=True)
        raise

    finally:
        if temp_file_path and os.path.exists(temp_file_path):
            logger.info(f"Cleaning up temporary file: {temp_file_path}")
            os.unlink(temp_file_path)