import os
from dotenv import load_dotenv
from supabase import create_client, Client

def create_supabase_client() -> Client:
    load_dotenv()
    url: str = os.environ.get("SUPABASE_URL")
    key: str = os.environ.get("SUPABASE_KEY")
    
    if not url or not key:
        raise ValueError("Supabase URL and KEY must be set in the environment variables.")
    
    return create_client(url, key)

supabase: Client = create_supabase_client()
