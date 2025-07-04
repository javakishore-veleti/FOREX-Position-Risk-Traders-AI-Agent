from backend.workflow.trader_workflow import TraderRiskWorkflow
from backend.dto.common import PromptQueryDTO, PromptResponseDTO

class TraderRiskOrchestrator:
    def __init__(self):
        self.workflow = TraderRiskWorkflow()

    async def handle_request(self, query: PromptQueryDTO) -> PromptResponseDTO:
        answer = await self.workflow.run(query.message, query.context)
        return PromptResponseDTO(response=answer)
