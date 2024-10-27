from fastapi import APIRouter, Depends
from ..db import get_db
from ..crud import get_notebook, get_notebooks, create_notebook
from supabase import Client
import logging

router = APIRouter(
    prefix="/notebooks",
    tags=["notebooks"],
)

@router.get("")
async def list_notebooks(db: Client = Depends(get_db)):
    try:
        notebooks = await get_notebooks(db)
        logging.info(f"Retrieved notebooks: {notebooks}")
        return notebooks
    except Exception as e:
        logging.error(f"Error retrieving notebooks: {str(e)}")
        raise

@router.get("{notebook_id}")
async def read_notebook(notebook_id: str, db: Client = Depends(get_db)):
    return await get_notebook(db, notebook_id)

@router.post("/")
async def create_new_notebook(db: Client = Depends(get_db)):
    return await create_notebook(db)
