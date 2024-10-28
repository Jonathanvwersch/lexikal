import logging
from fastapi import APIRouter, Depends, Request

from ..middleware.auth import auth_middleware, get_current_user
from ..db import get_db
from ..crud import get_notebook, get_notebooks, create_notebook
from supabase import Client

router = APIRouter(
    prefix="/notebooks",
    tags=["notebooks"],
    dependencies=[Depends(auth_middleware)]
)
@router.get("")
async def list_notebooks(request: Request, db: Client = Depends(get_db)):
    user = get_current_user(request)
    try:
        notebooks = await get_notebooks(db, user.id)
        logging.info(f"Retrieved notebooks: {notebooks}")
        return notebooks
    except Exception as e:
        logging.error(f"Error retrieving notebooks: {str(e)}")
        raise

@router.get("{notebook_id}")
async def read_notebook(notebook_id: str, db: Client = Depends(get_db)):
    return await get_notebook(db, notebook_id)

@router.post("")
async def create_new_notebook(request: Request, db: Client = Depends(get_db)):
    user = get_current_user(request)
    return await create_notebook(db, user.id)
