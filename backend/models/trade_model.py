from sqlmodel import SQLModel, Field
from typing import Optional, List
import uuid

class ForexTrade(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    from_currency: str
    to_currency: str
    amount: float
    trade_date: str
    customer_id: str
    book_ids: str  # Comma-separated string of book UUIDs
