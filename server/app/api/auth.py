from fastapi import APIRouter, HTTPException, Body, status, Depends
from db import supabase
from app import schemas
from app import crud
from dotenv import load_dotenv


router = APIRouter()

load_dotenv()

@router.post("/google-oauth")
async def google_oauth(token: str = Body(...)):
    """
    Authenticates a user using Google OAuth token with Supabase and creates a user if one does not exist.
    """
    try:
        response = supabase.auth.sign_in_with_oauth(provider='google', token=token)
        
        if response.get('error'):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Failed to authenticate with Google",
            )

        user_data = response.get('user')
        if not user_data:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Failed to retrieve user data from Google",
            )

        email = user_data.get('email')
        full_name = user_data.get('user_metadata', {}).get('full_name', '')

        existing_user = crud.get_user_by_email(db, email=email)
        
        if not existing_user:
            new_user = schemas.UserCreate(email=email, full_name=full_name)
            created_user = crud.create_user(db=db, user=new_user)
            return { "user": created_user }

        return { "user": existing_user }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Failed to authenticate with Google: {str(e)}",
        )
