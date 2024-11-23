"""Authentication middleware and utilities for FastAPI."""

from app.db import supabase
from fastapi import Depends, HTTPException, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from gotrue import User

security = HTTPBearer()


def auth_middleware(
    request: Request, credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Validate JWT token and set user identity in request state."""
    auth_response = supabase.auth.get_user(credentials.credentials)

    if not auth_response.user:
        raise HTTPException(status_code=401, detail="JWT token is invalid")

    request.state.identity = auth_response.user


def get_current_user(request: Request) -> User:
    """Get authenticated user from request state."""
    if not hasattr(request.state, "identity"):
        raise HTTPException(status_code=401, detail="Missing JWT token")
    return request.state.identity
