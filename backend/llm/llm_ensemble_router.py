import os
import asyncio
from backend.llm.llm_router import build_system_prompt
from backend.llm.openai_provider import OpenAIProvider
from backend.llm.huggingface_provider import HuggingFaceProvider
from backend.llm.bedrock_provider import BedrockProvider

active_providers = os.getenv("LLM_ROUTING_ENABLED", "openai,huggingface,bedrock").split(",")

provider_map = {
    "openai": OpenAIProvider(),
    "huggingface": HuggingFaceProvider(),
    "bedrock": BedrockProvider(),
}


async def call_provider(name, model_id, user_prompt, system_prompt):
    provider = provider_map[name]
    try:
        response = await provider.run_inference(model_id, user_prompt, system_prompt)
        return {"provider": f"{name}:{model_id}", "text": response}
    except Exception as e:
        return {"provider": f"{name}:{model_id}", "error": str(e)}


async def ensemble_query(message: str, scope: dict, model_map: dict, role_hint="trader") -> list:
    system_prompt = build_system_prompt(scope, role=role_hint)

    calls = [
        call_provider(name, model_map[name], message, system_prompt)
        for name in active_providers if name in provider_map and name in model_map
    ]

    return await asyncio.gather(*calls)
