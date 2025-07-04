from backend.dto.common import PromptQueryDTO
from backend.service.impl.position_risk_service_impl import PositionRiskServiceImpl


class PositionRiskOrchestrator:

    def __init__(self):
        self.service = PositionRiskServiceImpl()

    async def run_position_summary(self, payload: PromptQueryDTO) -> dict:
        return await self.service.summarize_risk_position(payload)
