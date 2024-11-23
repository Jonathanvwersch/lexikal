"""Pydantic schemas for notebook-related data models."""

from datetime import datetime

from pydantic import BaseModel, Field

from .base import CamelCaseModel


class NotebookBase(BaseModel):
    """Base model for notebook data.

    Attributes:
        name: The name of the notebook
        description: Optional description of the notebook
    """

    name: str = Field(..., description="The name of the notebook")
    description: str | None = Field(None, description="The description of the notebook")


class NotebookPostRequest(NotebookBase):
    """Request model for creating a new notebook."""


class NotebookWithTimestamps(NotebookBase):
    """Notebook model with timestamp and ID fields.

    Attributes:
        id: Unique identifier of the notebook
        created_at: Timestamp of notebook creation
        updated_at: Timestamp of last notebook update
    """

    id: str = Field(..., description="The unique identifier of the notebook")
    created_at: datetime = Field(
        ..., description="The date and time the notebook was created"
    )
    updated_at: datetime = Field(
        ..., description="The date and time the notebook was last updated"
    )


class NotebookPostResponse(NotebookWithTimestamps, CamelCaseModel):
    """Response model for notebook creation endpoint."""


class NotebookGetResponse(NotebookWithTimestamps, CamelCaseModel):
    """Response model for getting a single notebook.

    Attributes:
        owner_id: Unique identifier of the notebook owner
    """

    owner_id: str = Field(
        ..., description="The unique identifier of the user who owns the notebook"
    )


class NotebooksGetResponse(CamelCaseModel):
    """Response model for getting multiple notebooks.

    Attributes:
        notebooks: List of notebook responses
    """

    notebooks: list[NotebookGetResponse] = Field(
        ..., description="The list of notebooks"
    )
