from backend.orchestration.evaluators import evaluate_response_metrics


def rank_responses(responses: list, context: dict) -> list:
    books = context.get("books", [])
    customers = context.get("customers", [])

    ranked = []
    for r in responses:
        metrics = evaluate_response_metrics(r["text"], books, customers)

        score = 0.5  # base
        score += metrics["context_coverage_score"]
        score += metrics["var_included"]
        score += metrics["clarity_score"]
        score += metrics["precision_penalty"]

        ranked.append({**r, "score": round(score, 3), "metrics": metrics})

    ranked.sort(key=lambda x: x["score"], reverse=True)
    return ranked
