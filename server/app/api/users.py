"""User-related API endpoints and routes."""

from app.crud.users import get_user_by_id
from app.db import get_db
from app.middleware.auth import auth_middleware, get_current_user
from app.schemas.users import User
from fastapi import APIRouter, Depends, Request
from supabase import Client

router = APIRouter(
    prefix="/users",
    tags=["users"],
    dependencies=[Depends(auth_middleware)],
    redirect_slashes=False,
)


@router.get("/me", response_model=User)
async def get_user(request: Request, db: Client = Depends(get_db)) -> User:
    """Get the current user's information.

    Args:
        request (Request): The incoming request object
        db (Client): Database client dependency

    Returns:
        User: The current user's information
    """
    user = get_current_user(request)
    return await get_user_by_id(db, user.id)
