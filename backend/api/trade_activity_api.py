from fastapi import APIRouter
from backend.dto.common import PromptQueryDTO

trade_router = APIRouter(prefix="/api/trade-activity")

@trade_router.post("/book/volume")
async def trade_volume_by_book(payload: PromptQueryDTO):
    return {
        "status": "success",
        "books": payload.context.books,
        "response": f"Simulated trade volume summary for: {payload.message}"
    }

@trade_router.post("/customer/activity")
async def customer_trade_activity(payload: PromptQueryDTO):
    return {
        "status": "success",
        "customers": payload.context.customers,
        "response": f"Simulated customer activity for: {payload.message}"
    }
