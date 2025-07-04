from fastapi import FastAPI

app = FastAPI(
    title="FOREX Position Risk AI Agent",
    version="0.1.0",
    description="Scoped LLM assistant for trader, risk analyst, and onboarding use cases.",
)


@app.get("/ping")
async def health_check():
    return {"status": "ok", "message": "API is alive"}
