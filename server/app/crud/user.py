from db import supabase
from app import models, schemas
from ..schemas import user as user_schema

def get_user_by_email(email: str):
    return supabase.query(user_schema.User).filter(user_schema.User.email == email).first()
def create_user(user: schemas.UserCreate):
    db_user = models.User(email=user.email, full_name=user.full_name)
    supabase.add(db_user)
    supabase.commit()
    supabase.refresh(db_user)
    return db_user
