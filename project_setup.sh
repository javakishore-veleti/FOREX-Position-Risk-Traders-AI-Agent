#!/bin/bash

echo "📦 Bootstrapping FOREX-Position-Risk-Traders-AI-Agent project structure..."

### Core Folders
mkdir -p frontend
mkdir -p prompts
mkdir -p tests
mkdir -p cicd/aws-infra/terraform-code/{auth,vllm-serving,data-lake,bedrock,redis-cache,dynamodb-meta,monitoring}

### Backend Layered Structure (DDD-Style)
mkdir -p backend/api
mkdir -p backend/facade
mkdir -p backend/workflow/subtasks
mkdir -p backend/service/interface
mkdir -p backend/service/impl
mkdir -p backend/dao
mkdir -p backend/config
mkdir -p backend/dto
mkdir -p backend/entity
mkdir -p backend/llm
mkdir -p backend/prompts
touch backend/__init__.py
touch backend/llm/__init__.py

### DTOs
cat <<EOL > backend/dto/common.py
from pydantic import BaseModel
from typing import List

class ScopeContext(BaseModel):
    user_id: str
    books: List[str]
    customers: List[str]

class PromptQueryDTO(BaseModel):
    message: str
    context: ScopeContext
EOL

### Entity Classes
touch backend/entity/llm_prompt_entity.py
touch backend/entity/trade_position_entity.py
touch backend/entity/cache_prompt_response.py

### Prompt Registry Files
touch backend/prompts/trader_position_risk_prompts.json
touch backend/prompts/risk_analyst_prompts.json
touch backend/prompts/trade_activity_prompts.json
touch backend/prompts/onboarding_ops_prompts.json
touch backend/prompts/prompt_registry_loader.py

### LLM Provider Modules
touch backend/llm/base_provider.py
touch backend/llm/openai_provider.py
touch backend/llm/huggingface_provider.py
touch backend/llm/bedrock_provider.py
touch backend/llm/llm_router.py

### Terraform Root Files
touch cicd/aws-infra/terraform-code/{main.tf,variables.tf,README.md}

# Terraform module stubs
for dir in auth vllm-serving data-lake bedrock redis-cache dynamodb-meta monitoring; do
  touch cicd/aws-infra/terraform-code/$dir/{main.tf,variables.tf,outputs.tf}
done

### .gitignore
cat <<EOL > .gitignore
# Python
venv/
__pycache__/
*.py[cod]

# Terraform
.terraform/
terraform.tfstate*
*.tfvars

# Angular
frontend/node_modules/
frontend/dist/
.angular/

# Misc
*.log
.env
*.parquet
EOL

### package.json for Terraform Orchestration
cat <<EOL > package.json
{
  "name": "forex-position-risk-traders-ai-agent",
  "version": "1.0.0",
  "scripts": {
    "infra:init": "cd cicd/aws-infra/terraform-code && terraform init",
    "infra:validate": "cd cicd/aws-infra/terraform-code && terraform validate",
    "infra:all": "cd cicd/aws-infra/terraform-code && terraform apply -auto-approve",
    "infra:destroy": "cd cicd/aws-infra/terraform-code && terraform destroy -auto-approve"
  }
}
EOL

echo "✅ Project scaffold ready with modular LLM backend and Terraform IaC!"
