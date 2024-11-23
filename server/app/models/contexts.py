"""Database models for context management."""

import enum

from sqlalchemy import Column, DateTime, Enum, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class ContextType(enum.Enum):
    """Enumeration of supported context types for document processing."""

    PDF = "pdf"
    EXTERNAL_URL = "external_url"
    FREE_FORM_TEXT = "free_form_text"


class Context(Base):
    """Database model representing a context for document storage and processing."""

    __tablename__ = "contexts"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    description = Column(String)
    created_at = Column(DateTime(timezone=True))
    updated_at = Column(DateTime(timezone=True))
    notebook_id = Column(Integer, ForeignKey("notebooks.id"))
    type = Column(Enum(ContextType), nullable=False)
    original_file_name = Column(String)
