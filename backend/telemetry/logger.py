import json
import logging
import os
from logging.handlers import RotatingFileHandler

LOG_DIR = "logs"
LOG_FILE = "prompt_telemetry.jsonl"
os.makedirs(LOG_DIR, exist_ok=True)

log_path = os.path.join(LOG_DIR, LOG_FILE)

logger = logging.getLogger("PromptTelemetry")
logger.setLevel(logging.INFO)

if not logger.handlers:
    handler = RotatingFileHandler(
        log_path,
        maxBytes=5 * 1024 * 1024,  # 5 MB
        backupCount=7              # Keep last 7 logs
    )
    formatter = logging.Formatter('%(message)s')
    handler.setFormatter(formatter)
    logger.addHandler(handler)

from datetime import datetime
import time


def log_prompt_telemetry(use_case, provider, role, prompt_hash, score, status, start_time, metrics=None):
    from datetime import datetime
    import time

    record = {
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "use_case": use_case,
        "provider": provider,
        "role": role,
        "prompt_hash": prompt_hash,
        "score": round(score, 3),
        "duration_ms": round((time.time() - start_time) * 1000),
        "status": status,
        "metrics": metrics or {}
    }
    logger.info(json.dumps(record))

