from uuid import UUID
from pydantic import BaseModel
from typing import Optional

class NotebookPostRequest(BaseModel):
    name: str

class NotebookPatchRequest(BaseModel):
    name: Optional[str] = None

class NotebookPostResponse(BaseModel):
    id: UUID


