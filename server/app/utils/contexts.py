from supabase import Client
from ..models import Context

def get_context_by_id(db: Client, context_id: str) -> Context:
    response = db.table('contexts').select("*").eq('id', context_id).single().execute()
    if response.data:
        return Context(**response.data)
    return None
        