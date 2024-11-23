"""API routes for managing notebooks and their associated resources."""

from app.crud import get_notebooks, post_notebook
from app.db import get_db
from app.middleware.auth import auth_middleware, get_current_user
from app.schemas.notebooks import (
    NotebookPostRequest,
    NotebookPostResponse,
    NotebooksGetResponse,
)
from fastapi import APIRouter, Depends, Request
from supabase import Client

from .chat import router as chat_router
from .contexts import router as contexts_router

router = APIRouter(
    prefix="/notebooks",
    tags=["notebooks"],
    dependencies=[Depends(auth_middleware)],
    redirect_slashes=False,
)


@router.get("", response_model=NotebooksGetResponse)
async def list_notebooks(request: Request, db: Client = Depends(get_db)):
    """Retrieve all notebooks for the authenticated user.

    Args:
        request (Request): The incoming request object containing user authentication
        db (Client): Database client dependency

    Returns:
        NotebooksGetResponse: List of notebooks belonging to the user
    """
    user = get_current_user(request)
    return await get_notebooks(db, user.id)


@router.post("", response_model=NotebookPostResponse)
async def create_notebook(
    request: Request, notebook: NotebookPostRequest, db: Client = Depends(get_db)
):
    """Create a new notebook for the authenticated user.

    Args:
        request (Request): The incoming request object containing user authentication
        notebook (NotebookPostRequest): The notebook data to be created
        db (Client): Database client dependency

    Returns:
        NotebookPostResponse: The created notebook data
    """
    user = get_current_user(request)
    return await post_notebook(db, user.id, notebook)


router.include_router(
    contexts_router, prefix="/{notebook_id}/contexts", tags=["contexts"]
)
router.include_router(chat_router, prefix="/{notebook_id}/chat", tags=["chat"])
