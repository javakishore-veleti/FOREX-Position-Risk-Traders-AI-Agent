import os

from backend.llm.llm_router import build_system_prompt
from backend.service.interface.trade_activity_service_interface import TradeActivityServiceInterface
from backend.dto.common import PromptQueryDTO
from backend.llm.llm_ensemble_router import ensemble_query
from backend.service.evaluator.ranker import rank_responses
from backend.telemetry.logger import log_prompt_telemetry
import time

from backend.utils.hash_utils import hash_prompt


class TradeActivityServiceImpl(TradeActivityServiceInterface):


    async def summarize_trade_volume(self, payload: PromptQueryDTO) -> dict:
        start_time = time.time()

        scope = payload.context.dict()

        model_map = {
            "openai": os.getenv("OPENAI_MODEL"),
            "huggingface": os.getenv("HUGGINGFACE_MODEL"),
            "bedrock": os.getenv("BEDROCK_MODEL")
        }

        role = scope.get("role", "analyst")
        system_prompt = build_system_prompt(scope, role)
        full_prompt = f"{system_prompt.strip()}\n\n{payload.message.strip()}"

        results = await ensemble_query(
            message=payload.message,
            scope=scope,
            model_map=model_map,
            role_hint="analyst"
        )

        print("Returning Rank Responses")
        # 1. Ranked responses (list of dicts)
        ranked_responses = rank_responses(results, payload.message, scope)

        # 2. Log telemetry
        for r in ranked_responses:
            if not isinstance(r, dict):
                print(f"⚠️ Skipping malformed response: {r}")
                continue

            log_prompt_telemetry(
                use_case="summarize_trade_volume_by_book",
                provider=r.get("provider", "unknown"),
                role=payload.context.get("role", "analyst"),
                prompt_hash=hash_prompt(full_prompt),
                score=r.get("score", 0),
                status="success",
                start_time=start_time,
                metrics=r.get("metrics", {})
            )

        # 3. Final return payload
        top = ranked_responses["rankings"][0]
        return {
            "summary": f"{top['provider']} selected based on book/customer context and prompt relevance.",
            "best_response": top["text"],
            "rankings": ranked_responses["rankings"],
            "explanation": ranked_responses.get("explanation", [])
        }

