"""Database models for managing text chunks and their embeddings."""

from dataclasses import dataclass

from sqlalchemy import ARRAY, JSON, TIMESTAMP, UUID, Column, Float, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


@dataclass
class Chunk(Base):
    """Database model representing text chunks with their embeddings and metadata."""

    __tablename__ = "chunks"

    id = Column(UUID, primary_key=True, index=True)
    created_at = Column(TIMESTAMP(timezone=True))
    content = Column(Text)
    embedding = Column(ARRAY(Float))  # vector type in postgres maps to ARRAY(Float)
    _metadata = Column("metadata", JSON)  # metadata is a reserved word in SQLAlchemy
    context_id = Column(UUID)
