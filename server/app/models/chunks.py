from sqlalchemy import Column, Text, TIMESTAMP, UUID, ARRAY, Float, JSON
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Chunk(Base):
    __tablename__ = "chunks"

    id = Column(UUID, primary_key=True, index=True)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    content = Column(Text)
    embedding = Column(ARRAY(Float))  # vector type in postgres maps to ARRAY(Float)
    _metadata = Column("metadata", JSON) # metadata is a reserved word in SQLAlchemy
    context_id = Column(UUID)
