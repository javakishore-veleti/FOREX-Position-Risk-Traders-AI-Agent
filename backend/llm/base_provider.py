from abc import ABC, abstractmethod


class LLMProvider(ABC):
    @abstractmethod
    async def run_inference(self, model_id: str, prompt: str, system_prompt: str) -> str:
        pass
