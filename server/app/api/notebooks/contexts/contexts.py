from fastapi import APIRouter, Depends, File, HTTPException, Request, UploadFile
from ....middleware.auth import get_current_user
from ....db import get_db
from ....crud import post_context_metadata, get_contexts, get_notebook
from ....schemas.contexts import ContextsGetResponse, ContextMetadataPostRequest, ContextMetadataPostResponse, ContextFileUploadPostRequest, ContextFileUploadPostResponse
from supabase import Client
from ....utils import get_context_by_id, save_file_to_supabase, generate_signed_upload_url

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
    }

    created_context = await post_context_metadata(db, context_data)

    signed_upload_url = await generate_signed_upload_url(
        db=db,
        storage_path=f"{notebook_id}/{created_context.id}/"
    )
    print("signed_upload_url", signed_upload_url)
    context_data["signed_upload_url"] = signed_upload_url
    context

    return ContextMetadataPostResponse(
        id=created_context.id,
        name=context.name,
        description=context.description,
        type="pdf",
        signed_upload_url=signed_upload_url
    )

@router.post("/{context_id}/upload", response_model=ContextFileUploadPostResponse)
async def upload_file(
    request: Request,
    notebook_id: str,
    context_id: str,
    file: UploadFile = File(...),
    db: Client = Depends(get_db)
):
    user = get_current_user(request)
    notebook = await get_notebook(db, notebook_id)

    if notebook.owner_id != user.id:
        raise HTTPException(status_code=403, detail="You are not the owner of this notebook")
    
    existing_context = await get_context_by_id(db, context_id)
    if not existing_context:
        raise HTTPException(status_code=404, detail="Context not found")

    if not file.content_type == "application/pdf": 
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    try:
        file_content = await file.read()
        
        await save_file_to_supabase(
            db=db,
            file_content=file_content,
            filename=file.filename,
            storage_path=f"{notebook_id}/{context_id}/{file.filename}",
            content_type="application/pdf"
        )

        signed_upload_url = await generate_signed_upload_url(
            db=db,
            storage_path=f"{notebook_id}/{context_id}/{file.filename}"
        )

        print("signed_upload_url", signed_upload_url)
        
        return ContextFileUploadPostResponse(
            signed_upload_url
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process upload: {str(e)}")