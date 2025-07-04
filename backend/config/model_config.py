class ModelConfig:
    DEFAULT_MODEL = "meta-llama/Llama-2-13b"

    MODEL_MAP = {
        "trader": "meta-llama/Llama-2-13b",
        "analyst": "anthropic.claude-v2",
        "compliance": "amazon.titan-text-lite-v1"
    }

    @staticmethod
    def get_model_for_role(role: str) -> str:
        return ModelConfig.MODEL_MAP.get(role, ModelConfig.DEFAULT_MODEL)
