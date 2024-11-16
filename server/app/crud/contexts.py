from supabase import Client
from ..models import Context
from ..schemas.contexts import ContextsGetResponse, ContextGetResponse, ContextMetadataPostResponse
from typing import TypedDict
import logging

class ContextInsert(TypedDict):
    name: str
    description: str | None
    notebook_id: str
    type: str

async def get_contexts(db: Client, notebook_id: str) -> ContextsGetResponse:
    """Get all contexts for a given notebook"""
    response = db.table('contexts').select("*").eq('notebook_id', notebook_id).execute()
    contexts = [ContextGetResponse(**context) for context in response.data]
    return ContextsGetResponse(contexts=contexts)

async def post_context_metadata(db: Client, context: ContextInsert) -> Context:
    """Uploads context metadata to the database"""
    response = db.table('contexts').insert(context).execute()
    if response.data:
        return Context(**response.data[0])
    return None

async def get_context(db: Client, context_id: str) -> Context:
    response = db.table('contexts').select("*").eq('id', context_id).single().execute()
    if response.data:
        return Context(**response.data)
    return None

async def create_context(db: Client, context_data: dict):
    """Store context data in the database"""
    try:
        response = db.table("contexts").insert(context_data).execute()
        return response.data[0] if response.data else None
    except Exception as e:
        logging.error(f"Error creating context: {str(e)}")
        raise