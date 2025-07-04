import json
import os

PROMPT_DIR = os.path.join(os.path.dirname(__file__))


def load_prompt_for_class(class_name: str, role: str = "trader") -> str:
    file_map = {
        "PositionRiskOrchestrator": "risk_position.json",
        "TradeActivityOrchestrator": "trade_activity_prompts.json"
    }
    file_name = file_map.get(class_name)
    if not file_name:
        raise ValueError(f"No prompt file defined for class: {class_name}")

    with open(f"backend/prompts/{file_name}") as f:
        prompt_data = json.load(f)

    base_instructions = prompt_data.get("instructions_list", [])
    role_instructions = prompt_data.get("role_overrides", {}).get(role, {}).get("instructions_list", [])
    combined = base_instructions + role_instructions

    return "### Prompting Instructions for analyst:\n" + "\n".join(f"- {i}" for i in combined) + "\n"


