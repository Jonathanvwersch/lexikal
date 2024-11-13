from supabase import Client
from ..models import Context
from ..schemas.contexts import ContextsGetResponse, ContextGetResponse, ContextMetadataPostResponse
from typing import TypedDict

class ContextInsert(TypedDict):
    name: str
    description: str | None
    notebook_id: str
    type: str

async def get_contexts(db: Client, notebook_id: str) -> ContextsGetResponse:
    """Get all contexts for a user"""
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