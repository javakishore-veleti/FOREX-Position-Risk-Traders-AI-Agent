from fastapi import APIRouter
from backend.dto.common import PromptQueryDTO
from backend.facade.trade_activity_orchestrator import TradeActivityOrchestrator

trade_router = APIRouter(prefix="/api/trade-activity")
orchestrator = TradeActivityOrchestrator()


@trade_router.post("/book/volume")
async def trade_volume_by_book(payload: PromptQueryDTO):
    return await orchestrator.run_trade_volume_summary(payload)


@trade_router.post("/customer/activity")
async def customer_trade_activity(payload: PromptQueryDTO):
    return {
        "status": "success",
        "customers": payload.context.customers,
        "response": f"Simulated customer activity for: {payload.message}"
    }


@trade_router.post("/book/volume")
async def trade_volume_summary(payload: PromptQueryDTO):
    return await orchestrator.run_trade_volume_summary(payload)
