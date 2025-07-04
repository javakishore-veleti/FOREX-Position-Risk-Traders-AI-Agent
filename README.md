# FOREX-Position-Risk-Traders-AI-Agent

A modular, multi-provider AI assistant built to support position risk analytics, trade summaries, and compliance workflows for forex traders, analysts, and onboarding teams.

## Overview

This system enables scoped AI inference powered by multiple LLM backends (OpenAI, Hugging Face, AWS Bedrock, Claude, and more) while maintaining strict data boundaries through prompt governance, role-specific instructions, and dependency-injected DTOs.

## Features

- Multi-model LLM routing: Hugging Face, Claude, Titan, and OpenAI-compatible vLLM
- Trader and analyst prompt orchestration through workflow → service → router layers
- Role-based prompt governance using JSON-based prompt registries
- Scoped inference with user-specific context (books, customers, roles)
- Structured FastAPI backend with layered architecture and pluggable LLM providers
- Redis-backed prompt-response caching for latency and cost optimization
- Cloud-native infrastructure scaffolded via Terraform modules (Bedrock, vLLM, Redis, Data Lake)

## Architecture

[HTTP Request] → [FastAPI Router] → [Orchestrator Class] → [Workflow/Subtask] → [Service Layer] → [LLM Router] ├─ OpenAI / vLLM ├─ Hugging Face ├─ AWS Bedrock (Claude, Titan, etc.)

## Directory Structure

backend/ ├── api/ # FastAPI routes ├── facade/ # Domain orchestrators ├── workflow/ # Prompt flows and subtasks ├── service/ # Core service logic and model calls ├── dto/ # Pydantic data models (request/response) ├── entity/ # Entity abstractions (trade, prompt, user) ├── llm/ # LLMProvider interface and implementations ├── prompts/ # Prompt governance files (JSON and loader) ├── config/ # Configuration modules

cicd/aws-infra/ # Cloud Terraform modules by domain └── terraform-code/ ├── auth/ ├── vllm-serving/ ├── bedrock/ ├── data-lake/ ├── redis-cache/ ├── monitoring/

tests/ # Async API and inference-level tests


## Getting Started

### Install Dependencies

Using Poetry:

poetry install

### Run the API Locally

uvicorn backend.app:app --reload


### Example POST Request

Endpoint: `/api/risk/position/summary`

```json
{
  "message": "What’s my EUR/USD exposure today?",
  "context": {
    "user_id": "trader_aruna",
    "books": ["FX-G10"],
    "customers": ["Cust203"]
  }
}
```

```sh

poetry run black .

poetry run isort .

poetry run pytest

```

## License

Apache License 2.0  
Author: Aruna  
Version: 0.1.0
