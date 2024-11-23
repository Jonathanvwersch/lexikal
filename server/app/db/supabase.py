"""Database connection utilities for Supabase."""

import os

from dotenv import load_dotenv
from supabase import Client, create_client


def create_supabase_client() -> Client:
    """Create and return a Supabase client instance using environment variables."""
    load_dotenv()
    url: str = os.environ.get("SUPABASE_URL")
    server_role_key: str = os.environ.get("SUPABASE_SERVER_ROLE_KEY")

    if not url or not server_role_key:
        raise ValueError(
            "Supabase URL and SERVER ROLE KEY must be set in the environment variables."
        )

    return create_client(url, server_role_key)


supabase: Client = create_supabase_client()
