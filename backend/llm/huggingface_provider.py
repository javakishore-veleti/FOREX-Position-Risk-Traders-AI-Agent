import os
import httpx
from backend.llm.base_provider import LLMProvider


class HuggingFaceProvider(LLMProvider):
    def __init__(self):
        self.api_base = "https://api-inference.huggingface.co/models"
        self.api_key = os.getenv("HUGGINGFACE_API_KEY")

    async def run_inference(self, model_id: str, prompt: str, system_prompt: str) -> str:
        url = f"{self.api_base}/{model_id}"
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

        payload = {
            "inputs": f"{system_prompt}\n\n{prompt}",
            "parameters": {
                "temperature": 0.7,
                "max_new_tokens": 512
            }
        }

        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(url, headers=headers, json=payload)
            response.raise_for_status()
            data = response.json()
            return data[0]["generated_text"] if isinstance(data, list) else data.get("generated_text", "")
