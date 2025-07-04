from models.trader_model import Trader
from services.impl.trader_service_impl import TraderServiceImpl

svc = TraderServiceImpl()


def list_traders():
    return svc.get_all()


def create_trader(data: dict):
    return svc.add(Trader.model_validate(data))
