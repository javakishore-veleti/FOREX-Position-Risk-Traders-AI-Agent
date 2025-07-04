from backend.dto.common import PromptQueryDTO
from backend.service.impl.trade_activity_service_impl import TradeActivityServiceImpl


class TradeActivityOrchestrator:
    def __init__(self):
        self.service = TradeActivityServiceImpl()

    async def run_trade_volume_summary(self, payload: PromptQueryDTO) -> dict:
        return await self.service.summarize_trade_volume(payload)
