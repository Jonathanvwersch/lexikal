from fastapi import APIRouter, Depends, Request
from ...middleware.auth import auth_middleware, get_current_user
from ...db import get_db
from ...crud import get_notebooks, post_notebook
from ...schemas.notebooks import NotebookPostRequest, NotebookPostResponse, NotebooksGetResponse
from supabase import Client
from .contexts import router as contexts_router
from .chat import router as chat_router

router = APIRouter(
    prefix="/notebooks",
    tags=["notebooks"],
    dependencies=[Depends(auth_middleware)],
    redirect_slashes=False
)

@router.get("", response_model=NotebooksGetResponse)
async def list_notebooks(request: Request, db: Client = Depends(get_db)):
    user = get_current_user(request)
    return await get_notebooks(db, user.id)

@router.post("", response_model=NotebookPostResponse)
async def create_notebook(
    request: Request,
    notebook: NotebookPostRequest,
    db: Client = Depends(get_db)
):  
    user = get_current_user(request)
    return await post_notebook(db, user.id, notebook)

router.include_router(contexts_router, prefix="/{notebook_id}/contexts", tags=["contexts"])
router.include_router(chat_router, prefix="/{notebook_id}/chat", tags=["chat"])
