from datetime import datetime
from pydantic import BaseModel, Field

class NotebookPostRequest(BaseModel):
    name: str = Field(..., description="The name of the notebook")
    description: str = Field(..., description="The description of the notebook")

class NotebookPostResponse(BaseModel):
    id: str = Field(..., description="The unique identifier of the notebook")
    name: str = Field(..., description="The name of the notebook")
    description: str = Field(..., description="The description of the notebook")
    created_at: datetime = Field(..., description="The date and time the notebook was created")
    updated_at: datetime = Field(..., description="The date and time the notebook was last updated")

class NotebookPatchRequest(BaseModel):
    name: str = Field(..., description="The name of the notebook")
    description: str = Field(..., description="The description of the notebook")

class NotebookGetResponse(BaseModel):
    id: str = Field(..., description="The unique identifier of the notebook")
    name: str = Field(..., description="The name of the notebook")
    description: str = Field(..., description="The description of the notebook")
    created_at: datetime = Field(..., description="The date and time the notebook was created")
    updated_at: datetime = Field(..., description="The date and time the notebook was last updated")

class NotebooksGetResponse(BaseModel):
    notebooks: list[NotebookGetResponse] = Field(..., description="The list of notebooks")

