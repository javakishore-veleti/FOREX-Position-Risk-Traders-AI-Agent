from backend.llm.dummy_provider import DummyProvider

provider_map = {
    "dummy": DummyProvider(),
}


def build_system_prompt(scope: dict, role: str = "trader") -> str:
    books = ", ".join(scope.get("books", []))
    customers = ", ".join(scope.get("customers", []))
    return f"Role: {role}\nLimit books to: {books}\nCustomers: {customers}"


async def query_llm(model: str, message: str, scope: dict, role_hint: str = "trader") -> str:
    provider_name, model_id = model.split(":", 1)
    provider = provider_map.get(provider_name)

    if not provider:
        raise ValueError(f"Unknown LLM provider: {provider_name}")

    system_prompt = build_system_prompt(scope, role=role_hint)
    return await provider.run_inference(model_id, message, system_prompt)
