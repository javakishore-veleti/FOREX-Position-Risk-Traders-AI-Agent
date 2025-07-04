from abc import ABC, abstractmethod
from backend.dto.common import PromptQueryDTO


class TradeActivityServiceInterface(ABC):
    @abstractmethod
    async def summarize_trade_volume(self, payload: PromptQueryDTO) -> dict:
        pass
