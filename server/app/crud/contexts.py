from supabase import Client
from ..models import Context
from ..schemas.contexts import ContextsGetResponse, ContextGetResponse, ContextMetadataPostResponse
from typing import TypedDict

class ContextInsert(TypedDict):
    name: str
    description: str | None
    notebook_id: str
    type: str
    file_url: str | None

async def get_contexts(db: Client, notebook_id: str) -> ContextsGetResponse:
    """Get all contexts for a user"""
    print("notebook_id", notebook_id)
    response = db.table('contexts').select("*").eq('notebook_id', notebook_id).execute()
    print("response",response)
    contexts = [ContextGetResponse(**context) for context in response.data]
    print("contexts",contexts)
    return ContextsGetResponse(contexts=contexts)

async def post_context_metadata(db: Client, context: ContextInsert) -> ContextMetadataPostResponse:
    """Uploads context metadata to the database"""
    response = db.table('contexts').insert(context).execute()
    if response.data:
        return ContextMetadataPostResponse(**response.data[0])
    return None

async def update_context_file_url(db: Client, context_id: str, file_url: str) -> Context:
    """Update the file URL for a context"""
    response = db.table('contexts').update({'file_url': file_url}).eq('id', context_id).execute()
    if response.data:
        return Context(**response.data[0])
    return None