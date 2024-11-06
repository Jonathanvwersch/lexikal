from datetime import datetime
from pydantic import BaseModel, Field
from .base import CamelCaseModel

class NotebookBase(BaseModel):
    name: str = Field(..., description="The name of the notebook")
    description: str | None = Field(None, description="The description of the notebook")

class NotebookPostRequest(NotebookBase):
    pass

class NotebookWithTimestamps(NotebookBase):
    id: str = Field(..., description="The unique identifier of the notebook")
    created_at: datetime = Field(..., description="The date and time the notebook was created")
    updated_at: datetime = Field(..., description="The date and time the notebook was last updated")

class NotebookPostResponse(NotebookWithTimestamps, CamelCaseModel):
    pass

class NotebookGetResponse(NotebookWithTimestamps, CamelCaseModel):
    owner_id: str = Field(..., description="The unique identifier of the user who owns the notebook")

class NotebooksGetResponse(CamelCaseModel):
    notebooks: list[NotebookGetResponse] = Field(..., description="The list of notebooks")
