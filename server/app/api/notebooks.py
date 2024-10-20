from fastapi import APIRouter, HTTPException
from ..schemas import notebook as notebook_schema
import supabase

router = APIRouter()

@router.post("/notebooks/", response_model=notebook_schema.NotebookPostResponse)
async def create_notebook(notebook: notebook_schema.NotebookPostRequest):
    response = supabase.table("notebooks").insert({"title": notebook.name}).execute()
    if len(response.data) == 0:
        raise HTTPException(status_code=400, detail="Failed to create notebook")
    return response.data[0]

@router.get("/notebooks/", response_model=list[notebook_schema.NotebookPostResponse])
async def list_notebooks(skip: int = 0, limit: int = 100):
    response = supabase.table("notebooks").select("*").range(skip, skip + limit - 1).execute()
    return response.data

@router.get("/notebooks/{notebook_id}", response_model=notebook_schema.NotebookPostResponse)
async def read_notebook(notebook_id: int):
    response = supabase.table("notebooks").select("*").eq("id", notebook_id).execute()
    if len(response.data) == 0:
        raise HTTPException(status_code=404, detail="Notebook not found")
    return response.data[0]
