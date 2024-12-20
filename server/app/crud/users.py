"""CRUD operations for user management."""

from app.models.users import User
from supabase import Client


async def get_user_by_id(db: Client, user_id: str) -> User:
    """Get a specific user by ID"""
    response = db.table("users").select("*").eq("id", user_id).single().execute()
    if response.data:
        return User(**response.data)
    return None
