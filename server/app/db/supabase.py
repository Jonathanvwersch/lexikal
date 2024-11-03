import os
from dotenv import load_dotenv
from supabase import create_client, Client

def create_supabase_client() -> Client:
    load_dotenv()
    url: str = os.environ.get("SUPABASE_URL")
    server_role_key: str = os.environ.get("SUPABASE_SERVER_ROLE_KEY")
    
    if not url or not server_role_key:
        raise ValueError("Supabase URL and SERVER ROLE KEY must be set in the environment variables.")
    
    return create_client(url, server_role_key)

supabase: Client = create_supabase_client()
