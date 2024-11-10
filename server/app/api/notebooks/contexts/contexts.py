from fastapi import APIRouter, Depends, HTTPException, Request
from ....middleware.auth import get_current_user
from ....db import get_db
from ....crud import post_context_metadata, get_contexts, get_notebook
from ....schemas.contexts import ContextsGetResponse, ContextMetadataPostRequest, ContextMetadataPostResponse
from supabase import Client
from ....utils import generate_signed_upload_url

router = APIRouter()

@router.get("", response_model=ContextsGetResponse)
async def list_contexts(notebook_id: str, request: Request, db: Client = Depends(get_db)):
    user = get_current_user(request)
    notebook = await get_notebook(db, notebook_id)

    if notebook.owner_id != user.id:
        raise HTTPException(status_code=403, detail="You are not the owner of this notebook")
    
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
        "original_file_name": context.original_file_name
    }
    print(context_data)
    created_context = await post_context_metadata(db, context_data)
    print(created_context)
    if not created_context:
        raise HTTPException(status_code=500, detail="Failed to create context")

    signed_upload_url = await generate_signed_upload_url(
        db=db,
        storage_path=f"{notebook_id}/{created_context.id}/{context.original_file_name}"
    )

    return ContextMetadataPostResponse(
        id=created_context.id,
        name=created_context.name,
        description=created_context.description,
        type=created_context.type,
        original_file_name=created_context.original_file_name,
        signed_upload_url=signed_upload_url
    )
