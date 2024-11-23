"""User-related API endpoints and routes."""

from fastapi import APIRouter

router = APIRouter(
    prefix="/healthz",
    tags=["healthz"],
    redirect_slashes=False,
)


@router.get("/healthz")
async def health():
    """Health check endpoint.

    Returns:
        dict: API status information
    """
    return {"status": "ok"}
