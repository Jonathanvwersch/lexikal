"""CRUD operations for notebook management."""

from typing import Optional

from app.models import Notebook
from app.schemas.notebooks import (
    NotebookGetResponse,
    NotebookPostRequest,
    NotebooksGetResponse,
)
from supabase import Client


async def get_notebooks(db: Client, user_id: str) -> NotebooksGetResponse:
    """Get all notebooks for a user."""
    response = db.table("notebooks").select("*").eq("owner_id", user_id).execute()
    notebooks = [NotebookGetResponse(**notebook) for notebook in response.data]
    return NotebooksGetResponse(notebooks=notebooks)


async def get_notebook(db: Client, notebook_id: str) -> Optional[Notebook]:
    """Get a specific notebook by ID."""
    response = (
        db.table("notebooks").select("*").eq("id", notebook_id).single().execute()
    )
    if response.data:
        return Notebook(**response.data)
    return None


async def post_notebook(
    db: Client, user_id: str, notebook: NotebookPostRequest
) -> Optional[Notebook]:
    """Create a new notebook."""
    notebook_data = {
        "name": notebook.name,
        "description": notebook.description,
        "owner_id": user_id,
    }

    response = db.table("notebooks").insert(notebook_data).execute()
    if response.data:
        return Notebook(**response.data[0])
    return None
