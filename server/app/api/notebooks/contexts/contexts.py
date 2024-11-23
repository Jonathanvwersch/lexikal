"""
API Router for managing notebook contexts and document processing.

This module handles operations related to context management within notebooks,
including listing contexts, uploading files, processing documents, and converting
PDFs to markdown format.
"""

import base64
import logging
import os
import tempfile

from app.crud import (
    get_context,
    get_context_file,
    get_contexts,
    get_notebook,
    post_context_metadata,
    store_chunks,
)
from app.db import get_db
from app.middleware.auth import get_current_user
from app.schemas.contexts import (
    ContextFileGetResponse,
    ContextMetadataPostRequest,
    ContextMetadataPostResponse,
    ContextsGetResponse,
    FileMarkdownResponse,
)
from app.utils import build_context_storage_path, generate_signed_upload_url
from app.utils.chunking import process_pdf_document
from fastapi import APIRouter, Depends, HTTPException, Request
from marker.convert import convert_single_pdf
from supabase import Client

router = APIRouter()


@router.get("", response_model=ContextsGetResponse, status_code=200)
async def list_contexts(
    notebook_id: str, request: Request, db: Client = Depends(get_db)
):
    """
    List all contexts associated with a specific notebook.

    Args:
        notebook_id (str): The ID of the notebook
        request (Request): The FastAPI request object
        db (Client): Database client dependency

    Returns:
        ContextsGetResponse: List of contexts

    Raises:
        HTTPException: 403 if user is not the notebook owner
    """
    user = get_current_user(request)
    notebook = await get_notebook(db, notebook_id)

    if notebook.owner_id != user.id:
        raise HTTPException(
            status_code=403, detail="You are not the owner of this notebook"
        )

    return await get_contexts(db, notebook_id)


@router.post("/metadata", response_model=ContextMetadataPostResponse, status_code=201)
async def upload_metadata(
    notebook_id: str,
    context: ContextMetadataPostRequest,
    db: Client = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """
    Upload metadata for a new context.

    Args:
        notebook_id (str): The ID of the notebook
        context (ContextMetadataPostRequest): Context metadata
        db (Client): Database client dependency
        current_user (dict): Current authenticated user

    Returns:
        ContextMetadataPostResponse: Created context with signed upload URL

    Raises:
        HTTPException: 500 if context creation fails
    """
    user = current_user
    context_data = {
        "name": context.name,
        "description": context.description,
        "notebook_id": notebook_id,
        "type": "pdf",
        "original_file_name": context.original_file_name,
    }

    created_context = await post_context_metadata(db, context_data)

    if not created_context:
        raise HTTPException(status_code=500, detail="Failed to create context")

    signed_upload_url = await generate_signed_upload_url(
        db=db,
        storage_path=build_context_storage_path(
            user_id=user.id,
            notebook_id=notebook_id,
            context_id=created_context.id,
            original_file_name=context.original_file_name,
        ),
    )

    return ContextMetadataPostResponse(
        id=created_context.id,
        name=created_context.name,
        description=created_context.description,
        type=created_context.type,
        original_file_name=created_context.original_file_name,
        signed_upload_url=signed_upload_url,
    )


@router.post("/{context_id}/chunk", status_code=204)
async def process_document_chunks(
    context_id: str,
    notebook_id: str,
    db: Client = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """
    Process and store document chunks for a given context.

    Args:
        context_id (str): The ID of the context
        notebook_id (str): The ID of the notebook
        db (Client): Database client dependency
        current_user (dict): Current authenticated user

    Raises:
        HTTPException: 403 if user is not the notebook owner
        HTTPException: 404 if context not found
        HTTPException: 500 if processing fails
    """
    try:
        user_id = current_user.id

        notebook = await get_notebook(db, notebook_id)

        if notebook.owner_id != current_user.id:
            raise HTTPException(
                status_code=403, detail="You are not the owner of this notebook"
            )

        context = await get_context(db, context_id)
        if not context:
            raise HTTPException(status_code=404, detail="Context not found")

        storage_path = build_context_storage_path(
            user_id, notebook_id, context_id, context.original_file_name
        )

        # Download file from Supabase storage
        file_data = db.storage.from_("contexts").download(storage_path)

        # Process the PDF and get chunks with embeddings
        chunks = process_pdf_document(file_data)

        # Log chunk data before storing
        logging.debug("Number of chunks to store: %d", len(chunks))
        if chunks:
            logging.debug("Sample chunk structure: %s", chunks[0])

        await store_chunks(db, context_id, chunks)

        return {"status": "success"}

    except Exception as e:
        logging.error("Failed to process document: %s", str(e))
        raise HTTPException(
            status_code=500, detail=f"Failed to process document: {str(e)}"
        ) from e


@router.get(
    "/{context_id}/file", response_model=ContextFileGetResponse, status_code=200
)
async def get_file(
    notebook_id: str,
    context_id: str,
    db: Client = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """
    Retrieve a file associated with a context.

    Args:
        notebook_id (str): The ID of the notebook
        context_id (str): The ID of the context
        db (Client): Database client dependency
        current_user (dict): Current authenticated user

    Returns:
        ContextFileGetResponse: File content and media type

    Raises:
        HTTPException: 403 if user is not the notebook owner
        HTTPException: 404 if context not found
    """
    user_id = current_user.id

    notebook = await get_notebook(db, notebook_id)

    if notebook.owner_id != current_user.id:
        raise HTTPException(
            status_code=403, detail="You are not the owner of this notebook"
        )

    context = await get_context(db, context_id)
    if not context:
        raise HTTPException(status_code=404, detail="Context not found")

    file_bytes, content_type = await get_context_file(
        db, user_id, notebook_id, context_id, context.original_file_name
    )

    # Convert bytes to base64 string for safe transmission
    encoded_content = base64.b64encode(file_bytes).decode("ascii")

    return ContextFileGetResponse(
        content=encoded_content,  # Send base64 encoded string instead of raw bytes
        media_type=content_type,
    )


@router.post("/{context_id}/to-markdown", response_model=FileMarkdownResponse)
async def convert_to_markdown(
    context_id: str,
    notebook_id: str,
    db: Client = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """
    Convert a PDF context file to markdown format.

    Args:
        context_id (str): The ID of the context
        notebook_id (str): The ID of the notebook
        db (Client): Database client dependency
        current_user (dict): Current authenticated user

    Returns:
        FileMarkdownResponse: Converted markdown content with metadata

    Raises:
        HTTPException: 403 if user is not the notebook owner
        HTTPException: 404 if context not found
        HTTPException: 500 if conversion fails
    """
    try:
        user_id = current_user.id
        notebook = await get_notebook(db, notebook_id)
        if notebook.owner_id != current_user.id:
            raise HTTPException(
                status_code=403, detail="You are not the owner of this notebook"
            )

        # Get context
        context = await get_context(db, context_id)
        if not context:
            raise HTTPException(status_code=404, detail="Context not found")

        # Get file from storage
        storage_path = build_context_storage_path(
            user_id, notebook_id, context_id, context.original_file_name
        )
        file_bytes = db.storage.from_("contexts").download(storage_path)

        # Create a temporary file to store the PDF
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_file:
            tmp_file.write(file_bytes)
            tmp_file_path = tmp_file.name

        try:
            # Convert PDF to markdown using marker
            markdown_content, images, meta = convert_single_pdf(
                fname=tmp_file_path, ocr_all_pages=True, model_lst=["layout", "ocr"]
            )

            # Store markdown in database
            data = {
                "context_id": context_id,
                "content": markdown_content,
                "metadata": meta,
                "images": (
                    {k: str(v.tobytes()) for k, v in images.items()} if images else None
                ),
            }

            result = db.table("file_markdowns").insert(data).execute()

            if not result.data:
                raise HTTPException(status_code=500, detail="Failed to store markdown")

            return FileMarkdownResponse(
                id=result.data[0]["id"],
                context_id=context_id,
                content=markdown_content,
                created_at=result.data[0]["created_at"],
                images=images,
            )

        finally:
            # Clean up the temporary file
            os.unlink(tmp_file_path)

    except Exception as e:
        logging.error("Failed to convert PDF to markdown: %s", str(e))
        raise HTTPException(
            status_code=500, detail=f"Failed to convert PDF to markdown: {str(e)}"
        ) from e
