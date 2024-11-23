"""Database models for notebook-related entities."""

from dataclasses import dataclass

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


@dataclass
class Notebook(Base):
    """Represents a notebook in the system.

    Attributes:
        id: Unique identifier for the notebook
        name: Name of the notebook
        description: Optional description of the notebook
        created_at: Timestamp when the notebook was created
        updated_at: Timestamp when the notebook was last updated
        owner_id: ID of the user who owns this notebook
    """

    __tablename__ = "notebooks"
    id: int = Column(Integer, primary_key=True, index=True)
    name: str = Column(String, unique=True, index=True)
    description: str = Column(String)
    created_at: DateTime = Column(DateTime(timezone=True))
    updated_at: DateTime = Column(DateTime(timezone=True))
    owner_id: int = Column(Integer, ForeignKey("users.id"))
