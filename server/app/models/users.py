from sqlalchemy import Column, String, TIMESTAMP, UUID
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(UUID, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    profile_image_url = Column(String)
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
