"""Base schema models and configurations for the application."""

from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class CamelCaseModel(BaseModel):
    """Base model class that converts snake_case to camelCase for all schema attributes."""

    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)
