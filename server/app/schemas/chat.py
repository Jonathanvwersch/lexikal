from pydantic import BaseModel
from typing import List, Optional

class ChatMessage(BaseModel):
    role: str  # "user" or "assistant"
    content: str

class ChatRequest(BaseModel):
    message: str
    context_ids: Optional[List[str]] = None  # If None, chat with all contexts
    history: Optional[List[ChatMessage]] = None  # Previous messages for context

class ChatResponse(BaseModel):
    message: str
    sources: List[dict]  # References to source materials used