"""Pydantic schemas for context-related data models."""

from datetime import datetime

from app.models.contexts import ContextType
from app.schemas.base import CamelCaseModel
from pydantic import Field


class ContextBase(CamelCaseModel):
    """Base Pydantic model for context data."""

    name: str = Field(..., description="The name of the context")
    description: str | None = Field(None, description="The description of the context")
    type: ContextType = Field(
        ..., description="The type of the context, e.g., PDF, text"
    )
    original_file_name: str = Field(..., description="The name of the context file")


class Context(ContextBase):
    """Pydantic model representing a complete context with ID."""

    id: str = Field(..., description="The unique identifier of the context")


class ContextGetResponse(Context):
    """Response model for getting a single context."""


class ContextsGetResponse(CamelCaseModel):
    """Response model for getting multiple contexts."""

    contexts: list[ContextGetResponse] = Field(..., description="The list of contexts")


class ContextMetadataPostRequest(ContextBase):
    """Request model for posting context metadata."""


class ContextMetadataPostResponse(Context):
    """Response model for posting context metadata."""

    signed_upload_url: str = Field(
        ..., description="Signed URL for uploading context file"
    )


class ContextFileGetResponse(CamelCaseModel):
    """Response model for getting a context file."""

    content: str = Field(..., description="The file content")
    media_type: str = Field(..., description="The media type of the file")


class FileMarkdownResponse(CamelCaseModel):
    """Response model for markdown file content."""

    id: str
    context_id: str
    content: str
    created_at: datetime
    images: dict[str, str] | None
