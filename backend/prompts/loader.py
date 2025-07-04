import json
import os

PROMPT_DIR = os.path.join(os.path.dirname(__file__))


def load_prompt_for_class(class_name: str, role: str = "trader") -> str:
    for fname in os.listdir(PROMPT_DIR):
        if not fname.endswith(".json"):
            continue
        with open(os.path.join(PROMPT_DIR, fname), "r") as f:
            data = json.load(f)
            if data.get("python_class_used_by") == class_name and role in data.get("roles_list", []):
                instructions = "\n".join(data.get("instructions_list", []))
                return f"### Prompting Instructions for {role}:\n{instructions}"

    return f"### Default prompt: respond as {role} with helpful information."
