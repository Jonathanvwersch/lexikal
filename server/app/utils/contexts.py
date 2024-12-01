"""Utility functions for handling context objects."""

from app.utils.storage import build_context_storage_path, generate_signed_url
from supabase import Client


def get_signed_context_url(
    user_id: str, notebook_id: str, context_id: str, original_file_name: str, db: Client
) -> str:
    """Get signed URL for context object.

    Args:
        user_id: User ID
        notebook_id: Notebook ID
        context_id: Context ID
        original_file_name: Original file name
        db: Supabase client instance

    Returns:
        Signed URL for context object
    """
    path = build_context_storage_path(
        user_id, notebook_id, context_id, original_file_name
    )
    return generate_signed_url(db, path, 60 * 60 * 4)
