from fastapi import APIRouter
from backend.dto.common import PromptQueryDTO
from backend.facade.position_risk_orchestrator import PositionRiskOrchestrator

risk_router = APIRouter(prefix="/api/risk")
orchestrator = PositionRiskOrchestrator()

@risk_router.post("/position/summary")
async def position_summary(payload: PromptQueryDTO):
    return await orchestrator.run_position_summary(payload)
