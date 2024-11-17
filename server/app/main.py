from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from .db import supabase
import uvicorn
from .api.notebooks.notebooks import router as notebooks_router
from .api.users import router as users_router
import openai
import os
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

@asynccontextmanager
async def lifespan():
    yield
    await supabase.client.close()


app = FastAPI(root_path="/api/v1", redirect_slashes=False)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://127.0.0.1:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(notebooks_router)
app.include_router(users_router)
app.router.redirect_slashes = False 


@app.get("/")
async def root():
    return {"status": "ok"}

def start():
    """Launched with `poetry run start` at root level"""
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
