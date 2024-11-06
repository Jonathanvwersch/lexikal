from sqlalchemy import Column, Integer, String, DateTime, func, ForeignKey, Enum
from sqlalchemy.ext.declarative import declarative_base
import enum
 
Base = declarative_base()

class ContextType(enum.Enum):
    PDF = "pdf"
    EXTERNAL_URL = "external_url"
    FREE_FORM_TEXT = "free_form_text"

class Context(Base):
    __tablename__ = "contexts"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    description = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    notebook_id = Column(Integer, ForeignKey("notebooks.id"))
    file_url = Column(String)
    type = Column(Enum(ContextType), nullable=False)
