from pydantic import BaseModel, EmailStr, Field

class UserCreate(BaseModel):
    email: EmailStr = Field(...)
    password: str = Field(..., min_length=8)
