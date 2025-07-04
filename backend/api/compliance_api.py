from fastapi import APIRouter
from backend.dto.common import PromptQueryDTO

compliance_router = APIRouter(prefix="/api/compliance")

@compliance_router.post("/onboarding/status")
async def onboarding_status_summary(payload: PromptQueryDTO):
    return {
        "status": "success",
        "customers": payload.context.customers,
        "response": f"Simulated onboarding status for: {payload.message}"
    }

@compliance_router.post("/screening/summary")
async def compliance_screening_summary(payload: PromptQueryDTO):
    return {
        "status": "success",
        "books": payload.context.books,
        "response": f"Simulated screening outcome for: {payload.message}"
    }
