from dao import trader_dao
from models.trader_model import Trader
from services.trader_service import TraderService

class TraderServiceImpl(TraderService):
    def get_all(self):
        return trader_dao.get_all_traders()

    def add(self, trader: Trader):
        return trader_dao.insert_trader(trader)
