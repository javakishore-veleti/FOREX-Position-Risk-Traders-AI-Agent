from backend.prompts.prompt_registry_loader import PromptRegistryLoader

PromptRegistryLoader.load_registry()
instructions = PromptRegistryLoader.get_instructions_for("TraderRiskOrchestrator")

system_prompt = (
    "You are assisting a FOREX trader. Follow these rules:\n" +
    "\n".join([f"- {line}" for line in instructions]) +
    f"\nBooks: {scope.get('books')}\nCustomers: {scope.get('customers')}"
)
