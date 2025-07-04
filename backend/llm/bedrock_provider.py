import boto3
import json
import os
from backend.llm.base_provider import LLMProvider


class BedrockProvider(LLMProvider):
    def __init__(self):
        self.client = boto3.client("bedrock-runtime", region_name=os.getenv("AWS_REGION", "us-east-1"))

    async def run_inference(self, model_id: str, prompt: str, system_prompt: str) -> str:
        if "claude" in model_id:
            body = {
                "anthropic_version": "bedrock-2023-05-31",
                "max_tokens": 1024,
                "temperature": 0.7,
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": prompt}
                ]
            }
        else:
            raise ValueError(f"Unsupported Bedrock model: {model_id}")

        response = self.client.invoke_model(
            modelId=model_id,
            contentType="application/json",
            accept="application/json",
            body=json.dumps(body)
        )

        result = json.loads(response["body"].read())
        return result["content"][0]["text"]
