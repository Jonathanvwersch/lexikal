"""CRUD operations for managing contexts and their associated files."""

import logging
from typing import Optional, Tuple, TypedDict

from app.models import Context, FileMarkdown
from app.schemas.contexts import ContextGetResponse, ContextsGetResponse
from app.utils.storage import build_context_storage_path
from supabase import Client


class ContextInsert(TypedDict):
    """Type definition for context insertion data."""

    name: str
    description: str | None
    notebook_id: str
    type: str


async def get_contexts(db: Client, notebook_id: str) -> ContextsGetResponse:
    """Get all contexts for a given notebook.

    Args:
        db: Supabase client instance
        notebook_id: ID of the notebook to fetch contexts for

    Returns:
        ContextsGetResponse containing list of contexts
    """
    response = db.table("contexts").select("*").eq("notebook_id", notebook_id).execute()
    contexts = [ContextGetResponse(**context) for context in response.data]
    return ContextsGetResponse(contexts=contexts)


async def post_context_metadata(
    db: Client, context: ContextInsert
) -> Optional[Context]:
    """Upload context metadata to the database.

    Args:
        db: Supabase client instance
        context: Context metadata to insert

    Returns:
        Created Context object or None if creation failed
    """
    response = db.table("contexts").insert(context).execute()
    if response.data:
        return Context(**response.data[0])
    return None


async def get_context(db: Client, context_id: str) -> Optional[Context]:
    """Retrieve a specific context by ID.

    Args:
        db: Supabase client instance
        context_id: ID of the context to retrieve

    Returns:
        Context object if found, None otherwise
    """
    response = db.table("contexts").select("*").eq("id", context_id).single().execute()
    if response.data:
        return Context(**response.data)
    return None


async def get_context_file(
    db: Client, user_id: str, notebook_id: str, context_id: str, file_name: str
) -> Tuple[bytes, str]:
    """Retrieve a context file from storage.

    Args:
        db: Supabase client instance
        user_id: ID of the user
        notebook_id: ID of the notebook
        context_id: ID of the context
        file_name: Name of the file to retrieve

    Returns:
        Tuple of (file_bytes, mime_type)
    """
    storage_path = build_context_storage_path(
        user_id, notebook_id, context_id, file_name
    )
    file_bytes = db.storage.from_("contexts").download(storage_path)
    return file_bytes, "application/pdf"


async def create_context(db: Client, context_data: dict) -> Optional[dict]:
    """Store context data in the database.

    Args:
        db: Supabase client instance
        context_data: Dictionary containing context data

    Returns:
        Created context data if successful, None otherwise

    Raises:
        Exception: If context creation fails
    """
    try:
        response = db.table("contexts").insert(context_data).execute()
        return response.data[0] if response.data else None
    except Exception as e:
        logging.error("Error creating context: %s", str(e))
        raise


async def get_file_markdown(db: Client, context_id: str) -> Optional[FileMarkdown]:
    """Retrieve markdown file associated with a context.

    Args:
        db: Supabase client instance
        context_id: ID of the context

    Returns:
        FileMarkdown object if found, None otherwise
    """
    response = (
        db.table("file_markdowns").select("*").eq("context_id", context_id).execute()
    )
    return response.data[0] if response.data else None
