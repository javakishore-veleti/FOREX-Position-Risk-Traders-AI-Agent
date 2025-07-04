import re


def evaluate_response_metrics(response_text: str, books: list, customers: list) -> dict:
    text = response_text.lower()

    def contains_all(items):
        return all(item.lower() in text for item in items)

    hedge_terms = ["as an ai", "i am unable", "i cannot", "hypothetical", "might", "could", "would",
                   "i don't have access"]

    return {
        "context_coverage_score": 1.0 if contains_all(books + customers) else 0.5 if any(
            item.lower() in text for item in books + customers) else 0.0,
        "precision_penalty": -0.2 if any(ht in text for ht in hedge_terms) else 0.0,
        "clarity_score": 1.0 if "-" in text or "•" in text or re.search(r"(\d+\.\s)", text) else 0.5,
        "var_included": 1.0 if "var" in text and re.search(r"\$\d+|\d+%|\d+m|\d+mm", text) else 0.0
    }
