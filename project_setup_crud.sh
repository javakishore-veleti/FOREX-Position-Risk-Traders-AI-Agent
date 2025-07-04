#!/bin/bash

# Set up backend directory structure
mkdir -p backend/{api,facades,services/impl,dao,models,db}
cd backend

# Create virtual environment and install dependencies
pip install fastapi uvicorn sqlmodel

# requirements.txt
cat <<EOF > requirements.txt
fastapi
uvicorn
sqlmodel
EOF

# --- db/session.py ---
cat <<EOF > db/session.py
from sqlmodel import SQLModel, create_engine, Session

sqlite_url = "sqlite:///db.sqlite3"
engine = create_engine(sqlite_url, echo=True)

def get_session():
    return Session(engine)

def init_db():
    import models.trader_model
    import models.book_model
    import models.customer_model
    import models.trade_model
    SQLModel.metadata.create_all(engine)
EOF

# --- models ---
cat <<EOF > models/trader_model.py
from sqlmodel import SQLModel, Field
from typing import Optional
import uuid

class Trader(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    name: str
    email: str
    desk: str
    role: str
EOF

cat <<EOF > models/book_model.py
from sqlmodel import SQLModel, Field
from typing import Optional
import uuid

class TradingBook(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    name: str
    desk: str
EOF

cat <<EOF > models/customer_model.py
from sqlmodel import SQLModel, Field
from typing import Optional
import uuid

class Customer(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    name: str
    email: str
    organization: Optional[str] = None
    tier: Optional[str] = None
EOF

cat <<EOF > models/trade_model.py
from sqlmodel import SQLModel, Field
from typing import Optional, List
import uuid

class ForexTrade(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    from_currency: str
    to_currency: str
    amount: float
    trade_date: str
    customer_id: str
    book_ids: str  # Comma-separated string of book UUIDs
EOF

# --- DAO layer ---
cat <<EOF > dao/trader_dao.py
from models.trader_model import Trader
from sqlmodel import select
from db.session import get_session

def get_all_traders():
    with get_session() as session:
        return session.exec(select(Trader)).all()

def insert_trader(trader: Trader):
    with get_session() as session:
        session.add(trader)
        session.commit()
        session.refresh(trader)
        return trader
EOF

# --- Service Interface ---
cat <<EOF > services/trader_service.py
from models.trader_model import Trader
from typing import List, Protocol

class TraderService(Protocol):
    def get_all(self) -> List[Trader]: ...
    def add(self, trader: Trader) -> Trader: ...
EOF

# --- Service Impl ---
cat <<EOF > services/impl/trader_service_impl.py
from dao import trader_dao
from models.trader_model import Trader
from services.trader_service import TraderService

class TraderServiceImpl(TraderService):
    def get_all(self):
        return trader_dao.get_all_traders()

    def add(self, trader: Trader):
        return trader_dao.insert_trader(trader)
EOF

# --- Facade ---
cat <<EOF > facades/trader_facade.py
from models.trader_model import Trader
from services.impl.trader_service_impl import TraderServiceImpl

svc = TraderServiceImpl()

def list_traders():
    return svc.get_all()

def create_trader(data: dict):
    return svc.add(Trader.model_validate(data))
EOF

# --- API Route ---
cat <<EOF > api/trader_routes.py
from fastapi import APIRouter
from facades import trader_facade

router = APIRouter()

@router.get("/api/traders")
def get_traders():
    return trader_facade.list_traders()

@router.post("/api/traders")
def add_trader(trader: dict):
    return trader_facade.create_trader(trader)
EOF

# --- main.py ---
cat <<EOF > main.py
from fastapi import FastAPI
from api import trader_routes
from db.session import init_db

app = FastAPI()
init_db()
app.include_router(trader_routes.router)
EOF

echo "✅ Project scaffolded. Run with: cd backend && uvicorn main:app --reload"
