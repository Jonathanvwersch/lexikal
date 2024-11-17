from ..schemas.users import User
from ..db import get_db
from supabase import Client
from ..middleware.auth import auth_middleware, get_current_user
from fastapi import APIRouter, Depends, Request
from ..crud.users import get_user_by_id

router = APIRouter(
    prefix="/users",
    tags=["users"],
    dependencies=[Depends(auth_middleware)],
    redirect_slashes=False
)

@router.get("/me", response_model=User)
async def get_user(request: Request, db: Client = Depends(get_db)):
    user = get_current_user(request)
    return await get_user_by_id(db, user.id)