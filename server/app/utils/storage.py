from fastapi import HTTPException
from supabase import Client
from storage3.types import SignedUploadURL

async def save_file_to_supabase(db: Client, file_content: bytes, storage_path: str, content_type: str) -> str:
    """
    Uploads a file to Supabase storage and returns the URL
    """
    try:
        db.storage.from_('contexts').upload(
            path=storage_path,
            file=file_content,
            file_options={"content-type": content_type},
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to upload file: {str(e)}")
    

async def generate_signed_url(db: Client, storage_path: str, expires_in: int) -> str:
    """
    Generates a signed URL for a file in Supabase storage
    """
    return db.storage.from_('contexts').create_signed_url(storage_path, expires_in=expires_in)

async def generate_signed_upload_url(db: Client, storage_path: str) -> str:
    """
    Generates a signed URL for a file in Supabase storage
    """
    signed_url = db.storage.from_('contexts').create_signed_upload_url(storage_path)['signed_url']
    
    return signed_url
