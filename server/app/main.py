from fastapi import FastAPI, status
from supabase import create_client, Client
from dotenv import load_dotenv
import os
from .api import notebooks
import uvicorn
load_dotenv()

app = FastAPI()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)


app.include_router(notebooks.router)

@app.get("/")
async def root():
    return status.HTTP_200_OK

def start():
    """Launched with `poetry run start` at root level"""
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
