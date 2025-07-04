from backend.llm.base_provider import LLMProvider


class DummyProvider(LLMProvider):
    async def run_inference(self, model_id, prompt, system_prompt):
        return f"[Simulated LLM reply] Prompt: {prompt} | System: {system_prompt}"
