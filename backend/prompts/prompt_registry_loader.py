import json
import os
from pathlib import Path
from typing import Dict, List

PROMPT_REGISTRY_DIR = Path(__file__).parent  # backend/prompts/


class PromptUseCase:
    def __init__(
        self,
        name: str,
        python_class_used_by: str,
        roles: List[str],
        instructions: List[str],
        examples: List[str],
    ):
        self.use_case_name = name
        self.python_class_used_by = python_class_used_by
        self.roles_list = roles
        self.instructions_list = instructions
        self.prompt_examples = examples


class PromptRegistryLoader:
    registry: Dict[str, PromptUseCase] = {}

    @classmethod
    def load_registry(cls):
        for file in os.listdir(PROMPT_REGISTRY_DIR):
            if file.endswith("_prompts.json"):
                with open(PROMPT_REGISTRY_DIR / file, "r") as f:
                    data = json.load(f)
                    use_case = PromptUseCase(
                        name=data["use_case_name"],
                        python_class_used_by=data["python_class_used_by"],
                        roles=data["roles_list"],
                        instructions=data["instructions_list"],
                        examples=data["prompt_examples"],
                    )
                    cls.registry[data["python_class_used_by"]] = use_case

    @classmethod
    def get_instructions_for(cls, python_class: str) -> List[str]:
        if python_class not in cls.registry:
            cls.load_registry()
        return (
            cls.registry.get(python_class).instructions_list
            if python_class in cls.registry
            else []
        )

    @classmethod
    def get_examples_for(cls, python_class: str) -> List[str]:
        if python_class not in cls.registry:
            cls.load_registry()
        return (
            cls.registry.get(python_class).prompt_examples
            if python_class in cls.registry
            else []
        )
