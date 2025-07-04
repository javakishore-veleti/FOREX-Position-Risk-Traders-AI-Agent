from fastapi import FastAPI
from api import trader_routes
from db.session import init_db

app = FastAPI()
init_db()
app.include_router(trader_routes.router)
