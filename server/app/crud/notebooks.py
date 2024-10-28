from supabase import Client
from ..models import Notebook
from typing import List

async def get_notebooks(db: Client, user_id: str) -> List[Notebook]:
    """Get all notebooks"""
    response = db.table('notebooks').select("*").eq('user_id', user_id).execute()
    return [Notebook(**notebook) for notebook in response.data]

async def get_notebook(db: Client, notebook_id: str) -> Notebook:
    """Get a specific notebook by ID"""
    response = db.table('notebooks').select("*").eq('id', notebook_id).single().execute()
    if response.data:
        return Notebook(**response.data)
    return None

async def create_notebook(db: Client, user_id: str) -> Notebook:
    """Create a new notebook"""
    response = db.table('notebooks').insert({
        'user_id': user_id,
        'name': 'New Notebook',
    }).execute()
    if response.data:
        return Notebook(**response.data[0])
    return None
