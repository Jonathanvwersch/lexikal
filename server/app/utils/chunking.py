"""Utility functions for processing and chunking PDF documents with text and image extraction."""

import io
import logging
import os
import tempfile
from typing import Any, Dict, List

import fitz
import voyageai
from app.models.chunks import Chunk
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain_core.documents import Document
from PIL import Image

logger = logging.getLogger(__name__)


def extract_page_image_from_document(
    pdf_document: fitz.Document, page_number: int
) -> Image.Image:
    """Extract an image from a specific PDF page."""
    page = pdf_document[page_number]
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))  # 2x scale for better quality
    img_data = pix.tobytes("png")
    return Image.open(io.BytesIO(img_data))


def create_multimodal_document_chunks(
    pdf_document: fitz.Document, pages: List[Any]
) -> tuple[List[Document], List, List]:
    """Helper function to create chunks with images from PDF pages."""
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len,
    )
    chunks = text_splitter.split_documents(pages)

    multimodal_inputs = []
    chunk_metadata = []

    for chunk in chunks:
        page_number = chunk.metadata.get("page")

        chunk.metadata["page"] = page_number + 1

        if page_number is not None and page_number < len(pdf_document):
            try:
                page_image = extract_page_image_from_document(pdf_document, page_number)
                multimodal_input = [chunk.page_content, page_image]
            except (fitz.FileDataError, fitz.EmptyFileError, ValueError) as e:
                logger.warning(
                    "Failed to extract image from page %d: %s",
                    page_number,
                    str(e),
                )
                multimodal_input = [chunk.page_content]
        else:
            multimodal_input = [chunk.page_content]

        multimodal_inputs.append(multimodal_input)
        chunk_metadata.append(chunk.metadata)

    return chunks, multimodal_inputs, chunk_metadata


def chunk_pdf_document(
    file_bytes: bytes,
) -> tuple[List[Document], List, List]:
    """Process a PDF document and return chunks with images."""
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_file:
        tmp_file.write(file_bytes)
        pdf_path = tmp_file.name

        try:
            pdf_document = fitz.open(pdf_path)
            loader = PyPDFLoader(pdf_path)
            pages = loader.load()

            chunks, multimodal_inputs, chunk_metadata = (
                create_multimodal_document_chunks(pdf_document, pages)
            )

            return chunks, multimodal_inputs, chunk_metadata

        finally:
            if "pdf_document" in locals():
                pdf_document.close()
            os.unlink(pdf_path)


def embed_multimodal_chunks(
    chunks: List, multimodal_inputs: List, chunk_metadata: List
) -> List[Chunk]:
    """Create embeddings for the chunks using Voyage AI."""
    try:
        vo = voyageai.Client()
        result = vo.multimodal_embed(
            inputs=multimodal_inputs,
            model="voyage-multimodal-3",
            input_type="document",
        )

        return [
            {
                "content": chunk.page_content,
                "metadata": metadata,
                "embedding": result.embeddings[i],
            }
            for i, (chunk, metadata) in enumerate(zip(chunks, chunk_metadata))
        ]

    except Exception as e:
        logger.error("Error creating embeddings: %s", str(e))
        raise
