import hashlib

def hash_prompt(prompt_str: str) -> str:
    """
    Returns the first 10 characters of the SHA256 hash of a prompt string.
    Useful for tracking prompt variants in telemetry.
    """
    return hashlib.sha256(prompt_str.encode("utf-8")).hexdigest()[:10]
