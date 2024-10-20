import datetime
from pydantic import BaseModel
from uuid import UUID
from sqlmodel import Field 


class Notebook(BaseModel):
    id: UUID = Field(default=None, primary_key=True)
    name: str
    created_at: datetime
    last_updated: datetime
