"""FastAPI server application entry point."""

import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.healthz import router as healthz_router
from .api.notebooks.notebooks import router as notebooks_router
from .api.users import router as users_router

load_dotenv()

app = FastAPI(root_path="/api/v1", redirect_slashes=False)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:8000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(notebooks_router)
app.include_router(users_router)
app.include_router(healthz_router)
app.router.redirect_slashes = False


def start():
    """Launched with `poetry run start` at root level"""
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
