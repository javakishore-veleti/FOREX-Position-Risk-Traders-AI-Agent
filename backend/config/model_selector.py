class ModelRouter:

    @staticmethod
    def select_model(role: str, prompt: str, cost_sensitive: bool = False) -> str:
        # Simplified rules — you can expand this later
        if "AML" in prompt or "compliance" in prompt.lower():
            return "amazon.titan-text-lite-v1" if cost_sensitive else "anthropic.claude-v2"

        if "exposure" in prompt or "risk" in prompt.lower():
            return "meta-llama/Llama-2-13b"

        if role.lower() == "onboarding":
            return "amazon.titan-text-lite-v1"

        # Fallback
        return "meta-llama/Llama-2-7b"
