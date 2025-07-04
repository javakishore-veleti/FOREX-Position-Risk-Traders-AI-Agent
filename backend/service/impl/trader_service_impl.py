from backend.config.model_selector import ModelRouter


class TraderRiskServiceImpl:
    async def get_response(self, message, scope):
        role = "trader"  # You could pass this dynamically later
        model = ModelRouter.select_model(role=role, prompt=message)

        return await query_llm(
            model=model,
            user_prompt=message,
            scope=scope.dict() if hasattr(scope, "dict") else scope,
        )
