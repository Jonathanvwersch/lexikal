from fastapi import FastAPI
from .api import auth
from .db.supabase import create_supabase_client
import uvicorn

app = FastAPI()

app.include_router(auth.router, prefix="/auth")

@app.get("/")
async def root():
    return {"status": "ok"}

def start():
    """Launched with `poetry run start` at root level"""
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)