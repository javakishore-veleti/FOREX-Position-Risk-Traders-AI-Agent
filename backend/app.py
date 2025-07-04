from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from backend.api.ping_api import ping_router
from backend.api.risk_position_api import risk_router
from backend.api.trade_activity_api import trade_router
from backend.api.compliance_api import compliance_router

app = FastAPI(
    title="FOREX Position Risk AI Agent",
    version="0.1.0"
)

app.include_router(ping_router)
app.include_router(risk_router)
app.include_router(trade_router)
app.include_router(compliance_router)