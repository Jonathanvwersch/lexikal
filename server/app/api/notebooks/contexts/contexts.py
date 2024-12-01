"""
API Router for managing notebook contexts and document processing.

This module handles operations related to context management within notebooks,
including listing contexts, uploading files, processing documents, and converting
PDFs to markdown format.
"""

import logging

from app.crud import get_context as fetch_context
from app.crud import get_contexts as fetch_contexts
from app.crud import get_notebook, post_context_metadata, store_chunks
from app.db import get_db
from app.middleware.auth import get_current_user
from app.schemas.contexts import (
    ContextGetResponse,
    ContextMetadataPostRequest,
    ContextMetadataPostResponse,
    ContextsGetResponse,
)
from app.utils import build_context_storage_path, generate_signed_upload_url
from app.utils.chunking import chunk_pdf_document, embed_multimodal_chunks
from app.utils.contexts import get_signed_context_url
from fastapi import APIRouter, Depends, HTTPException, Request
from supabase import Client

router = APIRouter()


@router.get("", response_model=ContextsGetResponse, status_code=200)
async def get_contexts(
    request: Request,
    notebook_id: str,
    db: Client = Depends(get_db),
):
    """List all contexts associated with a specific notebook."""
    user = get_current_user(request)
    notebook = await get_notebook(db, notebook_id)

    if notebook.owner_id != user.id:
        raise HTTPException(
            status_code=403, detail="You are not the owner of this notebook"
        )

    contexts = await fetch_contexts(db, notebook_id)
    return ContextsGetResponse(
        contexts=[
            ContextGetResponse(
                id=context.id,
                name=context.name,
                description=context.description,
                type=context.type,
                original_file_name=context.original_file_name,
                url=get_signed_context_url(
                    user.id, notebook_id, context.id, context.original_file_name, db
                ),
            )
            for context in contexts
        ]
    )


@router.get("/{context_id}", status_code=200, response_model=ContextGetResponse)
async def get_context(
    request: Request,
    context_id: str,
    notebook_id: str,
    db: Client = Depends(get_db),
):
    """Get metadata for a specific context.

    Args:
        context_id: ID of the context to retrieve
        notebook_id: ID of the notebook containing the context

    Returns:
        ContextGetResponse: Context metadata with signed URL
    """
    user = get_current_user(request)
    notebook = await get_notebook(db, notebook_id)

    if notebook.owner_id != user.id:
        raise HTTPException(
            status_code=403, detail="You are not the owner of this notebook"
        )

    context = await fetch_context(db, context_id)
    signed_url = get_signed_context_url(
        user.id, notebook_id, context_id, context.original_file_name, db
    )
    return ContextGetResponse(
        id=context.id,
        name=context.name,
        description=context.description,
        type=context.type,
        original_file_name=context.original_file_name,
        url=signed_url,
    )


@router.post("/metadata", response_model=ContextMetadataPostResponse, status_code=201)
async def upload_metadata(
    request: Request,
    notebook_id: str,
    context: ContextMetadataPostRequest,
    db: Client = Depends(get_db),
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
    user = get_current_user(request)
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

    signed_upload_url = generate_signed_upload_url(
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
    request: Request,
    context_id: str,
    notebook_id: str,
    db: Client = Depends(get_db),
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
        user = get_current_user(request)

        notebook = await get_notebook(db, notebook_id)

        if notebook.owner_id != user.id:
            raise HTTPException(
                status_code=403, detail="You are not the owner of this notebook"
            )

        context = await fetch_context(db, context_id)
        if not context:
            raise HTTPException(status_code=404, detail="Context not found")

        storage_path = build_context_storage_path(
            user.id, notebook_id, context_id, context.original_file_name
        )

        # Download file from Supabase storage
        file_data = db.storage.from_("contexts").download(storage_path)

        # Get chunks and metadata from PDF document
        chunks, multimodal_inputs, metadata = chunk_pdf_document(file_data)

        # Pass all required arguments to embed_multimodal_chunks
        embedded_chunks = embed_multimodal_chunks(
            chunks=chunks,
            multimodal_inputs=multimodal_inputs,
            chunk_metadata=metadata,
        )

        # Log chunk data before storing
        logging.debug("Number of chunks to store: %d", len(chunks))
        if chunks:
            logging.debug("Sample chunk structure: %s", chunks[0])

        await store_chunks(db, context_id, embedded_chunks)

        return {"status": "success"}

    except Exception as e:
        logging.error("Failed to process document: %s", str(e))
        raise HTTPException(
            status_code=500, detail=f"Failed to process document: {str(e)}"
        ) from e
