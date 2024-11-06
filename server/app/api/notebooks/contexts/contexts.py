from fastapi import APIRouter, Depends, File, HTTPException, Request, UploadFile
from ....middleware.auth import get_current_user
from ....db import get_db
from ....crud import post_context_metadata, get_contexts, update_context_file_url
from ....schemas.contexts import ContextsGetResponse, ContextMetadataPostRequest, ContextMetadataPostResponse, ContextFileUploadPostRequest, ContextFileUploadPostResponse
from supabase import Client
from ....utils import get_context_by_id, save_file_to_supabase

router = APIRouter()

@router.get("", response_model=ContextsGetResponse)
async def list_contexts(notebook_id: str, request: Request, db: Client = Depends(get_db)):
    user = get_current_user(request)
    return await get_contexts(db, notebook_id)

@router.post("/metadata", response_model=ContextMetadataPostResponse)
async def upload_metadata(
    notebook_id: str,
    context: ContextMetadataPostRequest,
    db: Client = Depends(get_db)
):
    context_data = {
        "name": context.name,
        "description": context.description,
        "notebook_id": notebook_id,
        "type": "pdf", 
        "file_url": None 
    }

    print(context_data)
    created_context = await post_context_metadata(db, context_data)
    return created_context

@router.post("/{context_id}/upload")
async def upload_file(
    context_id: str,
    file: UploadFile = File(...),
    db: Client = Depends(get_db)
):
    # Retrieve context to verify existence
    existing_context = await get_context_by_id(db, context_id)
    if not existing_context:
        raise HTTPException(status_code=404, detail="Context not found")

    # Process the file (store in Supabase)
    file_content = await file.read()
    file_url = await save_file_to_supabase(file_content, file.filename)

    # Update context with file URL
    updated_context = await update_context_file_url(db, context_id, file_url)
    return updated_context
