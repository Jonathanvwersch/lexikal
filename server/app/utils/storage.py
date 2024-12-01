"""Utility functions for handling file storage operations with Supabase."""

from fastapi import HTTPException
from supabase import Client


async def save_file_to_supabase(
    db: Client, file_content: bytes, storage_path: str, content_type: str
) -> str:
    """
    Uploads a file to Supabase storage and returns the URL
    """
    try:
        db.storage.from_("contexts").upload(
            path=storage_path,
            file=file_content,
            file_options={"content-type": content_type},
        )

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to upload file: {str(e)}"
        ) from e


def generate_signed_url(db: Client, storage_path: str, expiry: int = 3600) -> str:
    """
    Generates a signed URL for a file in Supabase storage

    Args:
        db: Supabase client instance
        storage_path: Path to the file in storage
        expiry: Expiry time in seconds (default 1 hour)

    Returns:
        Signed URL string
    """
    try:
        return db.storage.from_("contexts").create_signed_url(storage_path, expiry)[
            "signedURL"
        ]
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to generate signed URL: {str(e)}"
        ) from e


def generate_signed_upload_url(db: Client, storage_path: str) -> str:
    """
    Generates a signed URL for a file in Supabase storage
    """
    try:
        return db.storage.from_("contexts").create_signed_upload_url(storage_path)[
            "signed_url"
        ]
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to generate signed upload URL: {str(e)}"
        ) from e


def build_context_storage_path(
    user_id: str, notebook_id: str, context_id: str, original_file_name: str
) -> str:
    """
    Builds a storage path for a context file stored in Supabase's storage
    """
    return f"{user_id}/{notebook_id}/{context_id}/{original_file_name}"
