"""API router module for the server application."""

from .healthz import router as healthz
from .notebooks import router as notebooks
from .users import router as users

__all__ = ["healthz", "notebooks", "users"]
