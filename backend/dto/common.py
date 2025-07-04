from typing import List

from pydantic import BaseModel


class ScopeContext(BaseModel):
    user_id: str
    books: List[str]
    customers: List[str]


class PromptQueryDTO(BaseModel):
    message: str
    context: ScopeContext
