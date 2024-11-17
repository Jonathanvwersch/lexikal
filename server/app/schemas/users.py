from .base import CamelCaseModel

class User(CamelCaseModel):
    id: str
    email: str
    name: str
    profile_image_url: str
