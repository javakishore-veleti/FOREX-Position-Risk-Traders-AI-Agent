from backend.dto.common import PromptQueryDTO
from backend.llm.llm_ensemble_router import ensemble_query
from backend.service.evaluator.ranker import rank_responses  # scaffold this next

from backend.service.interface.position_risk_service_interface import PositionRiskServiceInterface
import os


class PositionRiskServiceImpl(PositionRiskServiceInterface):
    async def summarize_risk_position(self, payload: PromptQueryDTO) -> dict:
        scope = payload.context.dict()

        model_map = {
            "openai": os.getenv("OPENAI_MODEL"),
            "huggingface": os.getenv("HUGGINGFACE_MODEL"),
            "bedrock": os.getenv("BEDROCK_MODEL")
        }

        results = await ensemble_query(
            message=payload.message,
            scope=scope,
            model_map=model_map,
            role_hint="trader"
        )

        summary = rank_responses(results, payload.message, scope)

        return summary
