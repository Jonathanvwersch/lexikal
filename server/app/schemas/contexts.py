from ..models.contexts import ContextType
from pydantic import Field
from .base import CamelCaseModel

## BASE

class ContextBase(CamelCaseModel):
    name: str = Field(..., description="The name of the context")
    description: str | None = Field(None, description="The description of the context")
    type: ContextType = Field(..., description="The type of the context, e.g., PDF, text")

class ContextId(CamelCaseModel):
    id: str = Field(..., description="The unique identifier of the context")

class ContextUploadSignedUrl(CamelCaseModel):
    signed_upload_url: str | None = Field(None, description="A signed URL of the file")  

class Context(ContextBase, ContextId):
    pass

## GET
class ContextGetResponse(Context, CamelCaseModel):
    pass

class ContextsGetResponse(CamelCaseModel):
    contexts: list[ContextGetResponse] = Field(..., description="The list of contexts")

## POST METADATA
class ContextMetadataBase(CamelCaseModel):
    name: str = Field(..., description="The name of the context")
    description: str | None = Field(None, description="The description of the context")
    type: ContextType = Field(..., description="The type of the context")

class ContextMetadataSignedUploadUrl(CamelCaseModel):
    signed_upload_url: str | None = Field(None, description="A signed URL for uploading a file")

class ContextMetadataPostRequest(ContextMetadataBase):
    pass

class ContextMetadataPostResponse(ContextId, ContextBase, ContextMetadataSignedUploadUrl, CamelCaseModel):
    pass

## POST FILE
class ContextFileUploadPostRequest(ContextId, CamelCaseModel):
    name: str = Field(..., description="The name of the context")

class ContextFileUploadPostResponse(ContextMetadataSignedUploadUrl, CamelCaseModel):
    pass


