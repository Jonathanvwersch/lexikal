from fastapi import APIRouter, Depends, HTTPException, Request
from ....middleware.auth import get_current_user
from ....db import get_db
from ....crud import get_notebook, get_contexts
from ....schemas.chat import ChatRequest, ChatResponse
from ....utils.chat import get_relevant_chunks, generate_response
from supabase import Client

router = APIRouter()

@router.post("", response_model=ChatResponse)
async def chat_with_notebook(
    notebook_id: str,
    chat_request: ChatRequest,
    request: Request,
    db: Client = Depends(get_db)
):
    user = get_current_user(request)
    notebook = await get_notebook(db, notebook_id)

    if notebook.owner_id != user.id:
        raise HTTPException(status_code=403, detail="You are not the owner of this notebook")

    # If no context_ids provided, get all contexts for the notebook
    context_ids = chat_request.context_ids
    if not context_ids:
        contexts = await get_contexts(db, notebook_id)
        context_ids = [context.id for context in contexts.contexts]

    # Get relevant chunks based on the query
    relevant_chunks = await get_relevant_chunks(
        db=db,
        context_ids=context_ids,
        query=chat_request.message
    )
    
    # Generate response using chunks and chat history
    response, sources = await generate_response(
        query=chat_request.message,
        chunks=relevant_chunks,
        history=chat_request.history
    )

    return ChatResponse(
        message=response,
        sources=sources
    ) 