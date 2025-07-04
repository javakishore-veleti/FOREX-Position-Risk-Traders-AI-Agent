from sqlmodel import SQLModel, Field
from typing import Optional
import uuid

class Customer(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    name: str
    email: str
    organization: Optional[str] = None
    tier: Optional[str] = None
