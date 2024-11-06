from app.db import supabase


async def save_file_to_supabase(file_content: bytes, filename: str) -> str:
    """Save a file to Supabase"""
    response = supabase.storage.from_("notebooks").upload(filename, file_content)
    return response.data[0].public_url
