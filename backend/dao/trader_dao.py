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
