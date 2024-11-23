"""Database module for managing Supabase client connections."""

from typing import Generator

from supabase import Client as SupabaseClient

from .supabase import supabase


def get_db() -> Generator[SupabaseClient, None, None]:
    """
    Database dependency that manages Supabase client connections.
    Use this as a FastAPI dependency.
    """
    try:
        yield supabase
    finally:
        pass


__all__ = ["supabase", "get_db"]
