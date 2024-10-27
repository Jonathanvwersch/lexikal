from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from .db import supabase
import uvicorn
from .api.notebooks import router as notebooks_router

@asynccontextmanager
async def lifespan():
    # Startup
    yield
    # Shutdown
    await supabase.client.close()


app = FastAPI(redirect_slashes=False, root_path="/api/v1")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(notebooks_router)

@app.get("/")
async def root():
    return {"status": "ok"}

def start():
    """Launched with `poetry run start` at root level"""
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
