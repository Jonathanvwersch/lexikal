"""Pydantic schemas for chat-related data models and API requests/responses."""

from typing import List, Optional

from pydantic import BaseModel


class ChatMessage(BaseModel):
    """A single message in a chat conversation."""

    role: str  # "user" or "assistant"
    content: str


class ChatMessageMetadata(BaseModel):
    """Metadata for a chat message."""

    page: int


class ChatMessageSource(BaseModel):
    """A source for a chat message."""

    context_id: str
    content: str
    similarity: float
    metadata: ChatMessageMetadata
    citation_id: str


class ChatRequest(BaseModel):
    """Schema for incoming chat API requests."""

    message: str
    context_ids: Optional[List[str]] = None
    history: Optional[List[ChatMessage]] = None  # Previous messages for context


class ChatResponse(BaseModel):
    """Schema for outgoing chat API responses."""

    message: str
    sources: List[ChatMessageSource]
