from abc import ABC, abstractmethod
from backend.dto.common import PromptQueryDTO


class PositionRiskServiceInterface(ABC):
    @abstractmethod
    async def summarize_risk_position(self, payload: PromptQueryDTO) -> dict:
        pass
