"""Database models for user-related entities."""

from dataclasses import dataclass

from sqlalchemy import TIMESTAMP, UUID, Column, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


@dataclass
class User(Base):
    """Represents a user in the system.

    Attributes:
        id: Unique identifier for the user
        username: User's chosen username
        email: User's email address
    """

    __tablename__ = "users"

    id = Column(UUID, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    profile_image_url = Column(String)
    created_at = Column(TIMESTAMP(timezone=True))
