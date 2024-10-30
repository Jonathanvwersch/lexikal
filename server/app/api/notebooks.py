import logging
from fastapi import APIRouter, Depends, Request

from ..middleware.auth import auth_middleware, get_current_user
from ..db import get_db
from ..crud import get_notebook, create_notebook
from ..schemas.notebooks import NotebookPostRequest, NotebookPostResponse, NotebookGetResponse, NotebooksGetResponse
from supabase import Client

router = APIRouter(
    prefix="/notebooks",
    tags=["notebooks"],
    dependencies=[Depends(auth_middleware)]
)
@router.get("", response_model=NotebooksGetResponse)
async def list_notebooks(request: Request, db: Client = Depends(get_db)):
    user = get_current_user(request)
    try:
        notebooks = []
        logging.info(f"Retrieved notebooks: {notebooks}")
        return NotebooksGetResponse(notebooks=notebooks)
    except Exception as e:
        logging.error(f"Error retrieving notebooks: {str(e)}")
        raise

@router.get("/{notebook_id}", response_model=NotebookGetResponse)
async def read_notebook(notebook_id: str, db: Client = Depends(get_db)):
    return await get_notebook(db, notebook_id)

@router.post("", response_model=NotebookPostResponse)
async def create_new_notebook(
    request: Request,
    notebook: NotebookPostRequest,
    db: Client = Depends(get_db)
):
    user = get_current_user(request)
    return await create_notebook(db, user.id, notebook)
