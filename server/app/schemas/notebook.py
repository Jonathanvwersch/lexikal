from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class NotebookPostRequest(BaseModel):
    name: str

class NotebookPatchRequest(BaseModel):
    name: Optional[str] = None

class NotebookPostResponse(BaseModel):
    id: int
    title: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
