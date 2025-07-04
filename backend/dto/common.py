from pydantic import BaseModel
from typing import List

class ScopeContext(BaseModel):
    user_id: str
    books: List[str]
    customers: List[str]

class PromptQueryDTO(BaseModel):
    message: str
    context: ScopeContext
