from fastapi import APIRouter, Depends, Request

from ..middleware.auth import auth_middleware, get_current_user
from ..db import get_db
from ..crud import create_notebook, get_notebooks
from ..schemas.notebooks import NotebookPostRequest, NotebookPostResponse, NotebookGetResponse, NotebooksGetResponse
from supabase import Client

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
async def create_new_notebook(
    request: Request,
    notebook: NotebookPostRequest,
    db: Client = Depends(get_db)
):  
    user = get_current_user(request)
    return await create_notebook(db, user.id, notebook)
