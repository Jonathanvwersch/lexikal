from fastapi import Request, HTTPException, Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from gotrue import User, UserResponse


from app.db import supabase

security = HTTPBearer()

def auth_middleware(request: Request, credentials: HTTPAuthorizationCredentials = Depends(security)):
        print(credentials.credentials)
        auth_response = supabase.auth.get_user(credentials.credentials)

        if not auth_response.user:
            raise HTTPException(
                status_code=401,
                detail="JWT token is invalid"
            )
        
        request.state.identity = auth_response.user

def get_current_user(request: Request) -> User:
    if not hasattr(request.state, "identity"):
        raise HTTPException(
            status_code=401,
            detail="Not authenticated"
        )
    return request.state.identity


