from fastapi import APIRouter
from facades import trader_facade

router = APIRouter()

@router.get("/api/traders")
def get_traders():
    return trader_facade.list_traders()

@router.post("/api/traders")
def add_trader(trader: dict):
    return trader_facade.create_trader(trader)
