"""User schema definitions."""

from .base import CamelCaseModel


class User(CamelCaseModel):
    """Pydantic model representing a user in the system."""

    id: str
    email: str
    name: str
    profile_image_url: str
