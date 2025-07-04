from fastapi import APIRouter

ping_router = APIRouter()

@ping_router.get("/ping")
async def health_check():
    return {"status": "ok", "message": "API is alive"}
