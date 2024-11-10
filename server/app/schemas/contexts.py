from storage3.types import SignedUploadURL
from ..models.contexts import ContextType
from pydantic import Field
from .base import CamelCaseModel

class ContextBase(CamelCaseModel):
    name: str = Field(..., description="The name of the context")
    description: str | None = Field(None, description="The description of the context")
    type: ContextType = Field(..., description="The type of the context, e.g., PDF, text") 
    original_file_name: str = Field(..., description="The name of the context file")

class Context(ContextBase):
    id: str = Field(..., description="The unique identifier of the context")

class ContextGetResponse(Context):
    """Response model for getting a single context"""
    pass

class ContextsGetResponse(CamelCaseModel):
    """Response model for getting multiple contexts"""
    contexts: list[ContextGetResponse] = Field(..., description="The list of contexts")

class ContextMetadataPostRequest(ContextBase):
    """Request model for posting context metadata"""
    pass

class ContextMetadataPostResponse(Context):
    """Response model for posting context metadata"""
    signed_upload_url: str = Field(..., description="Signed URL for uploading context file")
