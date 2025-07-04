def rank_responses(responses: list, message: str, scope: dict) -> dict:
    books = [b.lower() for b in scope.get("books", [])]
    customers = [c.lower() for c in scope.get("customers", [])]

    def score(resp):
        content = resp.get("text", "").lower()
        score = 0
        if any(b in content for b in books): score += 0.4
        if any(c in content for c in customers): score += 0.3
        if "exposure" in content: score += 0.2
        if "var" in content: score += 0.1
        return score

    scored = [{"provider": r["provider"], "text": r.get("text", ""), "score": score(r)} for r in responses if "text" in r]
    ranked = sorted(scored, key=lambda x: x["score"], reverse=True)

    explanation = []
    for r in responses:
        if "error" in r:
            explanation.append(f"{r['provider']} failed: {r['error']}")
        elif r["provider"] != ranked[0]["provider"]:
            explanation.append(f"{r['provider']} scored lower due to insufficient context mention.")

    return {
        "summary": f"{ranked[0]['provider']} selected based on book/customer context and prompt relevance.",
        "best_response": ranked[0]["text"],
        "rankings": ranked,
        "explanation": explanation
    }
