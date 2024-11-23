"""Database models for markdown file-related entities."""

from dataclasses import dataclass

from sqlalchemy import UUID, Column, DateTime, ForeignKey, String, func
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


@dataclass
class FileMarkdown(Base):
    """Represents a markdown file in the system.

    Attributes:
        id: Unique identifier for the file
        context_id: ID of the associated context
        content: The markdown content
        _metadata: Additional metadata stored as JSON
        images: Image-related data stored as JSON
        created_at: Timestamp when the file was created
    """

    __tablename__ = "file_markdowns"

    id: UUID = Column(UUID, primary_key=True, server_default=func.uuid_generate_v4())
    context_id: UUID = Column(UUID, ForeignKey("contexts.id", ondelete="CASCADE"))
    content: str = Column(String, nullable=False)
    _metadata: dict = Column("metadata", JSONB)
    images: dict = Column(JSONB)
    created_at: DateTime = Column(DateTime(timezone=True))
