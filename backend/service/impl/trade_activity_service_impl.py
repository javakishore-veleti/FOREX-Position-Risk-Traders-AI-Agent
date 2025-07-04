import os
from backend.service.interface.trade_activity_service_interface import TradeActivityServiceInterface
from backend.dto.common import PromptQueryDTO
from backend.llm.llm_ensemble_router import ensemble_query
from backend.service.evaluator.ranker import rank_responses


class TradeActivityServiceImpl(TradeActivityServiceInterface):
    async def summarize_trade_volume(self, payload: PromptQueryDTO) -> dict:
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
            role_hint="analyst"
        )

        print("Returning Rank Responses")
        return rank_responses(results, payload.message, scope)
