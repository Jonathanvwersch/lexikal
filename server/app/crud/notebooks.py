from supabase import Client
from ..models import Notebook
from ..schemas.notebooks import NotebookPostRequest, NotebooksGetResponse, NotebookGetResponse
from typing import List

async def get_notebooks(db: Client, user_id: str) -> NotebooksGetResponse:
    """Get all notebooks for a user"""
    response = db.table('notebooks').select("*").eq('owner_id', user_id).execute()
    notebooks = [NotebookGetResponse(**notebook) for notebook in response.data]
    return NotebooksGetResponse(notebooks=notebooks)

async def get_notebook(db: Client, notebook_id: str) -> Notebook:
    """Get a specific notebook by ID"""
    response = db.table('notebooks').select("*").eq('id', notebook_id).single().execute()
    if response.data:
        return Notebook(**response.data)
    return None

async def create_notebook(db: Client, user_id: str, notebook: NotebookPostRequest) -> Notebook:
    """Create a new notebook"""
    notebook_data = {
        'name': notebook.name,
        'description': notebook.description,
        'owner_id': user_id,
    }

    response = db.table('notebooks').insert(notebook_data).execute()
    if response.data:
        return Notebook(**response.data[0])
    return None