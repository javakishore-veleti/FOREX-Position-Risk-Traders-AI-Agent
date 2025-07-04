from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from uuid import uuid4

router = APIRouter()
books_db = []


class TradingBook(BaseModel):
    id: str
    name: str
    desk: str


@router.post("/api/trading-books")
def add_book(book: TradingBook):
    books_db.append(book)
    return {"message": "Book added"}


@router.get("/api/trading-books")
def list_books():
    return books_db
