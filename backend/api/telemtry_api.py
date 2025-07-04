from fastapi import Query
from fastapi.responses import JSONResponse
from fastapi import APIRouter

telemetry_router = APIRouter()

@telemetry_router.get("/api/telemetry/prompts")
async def get_prompts(score_lt: float = Query(None)):
    # Replace with real filtering logic
    data = [
        {
            "prompt_hash": "abc123",
            "score": 1.7,
            "role": "analyst",
            "metrics": {"var_included": False}
        }
    ]
    return JSONResponse(content=data)
