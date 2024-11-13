from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
import tempfile
from typing import List, Dict, Any
import os
from pathlib import Path
import logging

# Set logging levels
logging.getLogger("httpx").setLevel(logging.WARNING)
logging.getLogger("httpcore").setLevel(logging.WARNING)
logging.getLogger("hpack").setLevel(logging.WARNING)

logger = logging.getLogger(__name__)

def process_pdf_document(pdf_data: bytes) -> List[Dict[str, Any]]:
    """
    Process a PDF document to create chunks with embeddings.
    
    Args:
        pdf_data (bytes): Raw PDF file data
        
    Returns:
        List[Dict[str, Any]]: List of dictionaries containing:
            - content: The text content of the chunk
            - embedding: Vector embedding of the content
            - metadata: Dictionary with page number and chunk index
            
    Raises:
        ValueError: If pdf_data is empty or invalid
        Exception: If OpenAI API key is not set
    """
    print(f"Starting PDF processing with data size: {len(pdf_data)} bytes")
    
    if not pdf_data:
        print("Empty PDF data received")
        raise ValueError("PDF data cannot be empty")
        
    if not os.getenv('OPENAI_API_KEY'):
        print("OPENAI_API_KEY environment variable not set")
        raise Exception("OPENAI_API_KEY environment variable not set")

    # Create a temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_file:
        temp_file.write(pdf_data)
        temp_file_path = temp_file.name
        print(f"Created temporary file at: {temp_file_path}")

    try:
        # Load PDF
        print("Loading PDF with PyPDFLoader")
        loader = PyPDFLoader(temp_file_path)
        pages = loader.load()
        print(f"Loaded {len(pages)} pages from PDF")

        if not pages:
            print("No pages found in PDF")
            raise ValueError("No pages found in PDF")

        # Create text splitter
        print("Initializing text splitter")
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=500,
            chunk_overlap=50,
            length_function=len,
            separators=["\n\n", "\n", " ", ""]
        )

        # Split documents into chunks
        print("Splitting documents into chunks")
        chunks = text_splitter.split_documents(pages)
        print(f"Created {len(chunks)} chunks from document")

        # Initialize embeddings
        print("Initializing OpenAI embeddings")
        embeddings = OpenAIEmbeddings()

        # Process chunks and create embeddings
        processed_chunks = []
        print("Starting chunk processing and embedding generation")
        for i, chunk in enumerate(chunks):
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

        print(f"Successfully processed all {len(processed_chunks)} chunks")
        return processed_chunks

    except Exception as e:
        print(f"Error processing PDF: {str(e)}", exc_info=True)
        raise

    finally:
        # Clean up temporary file
        if os.path.exists(temp_file_path):
            print(f"Cleaning up temporary file: {temp_file_path}")
            os.unlink(temp_file_path)

            