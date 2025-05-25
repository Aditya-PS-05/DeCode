from queue import Queue as ThreadQueue
from typing import Optional

# For demo/MVP in-memory result store for API workers (just a dict, in prod use Redis/DB)
class InMemoryResultStore:
    def __init__(self):
        self.data = {}
    def put(self, job_id: str, result: dict):
        self.data[job_id] = result
    def get(self, job_id: str) -> Optional[dict]:
        return self.data.pop(job_id, None)

# Use Redis-based store if running with queue.py, else fallback to memory store
try:
    from queue import queue
    result_store = queue  # Redis interface
except ImportError:
    result_store = InMemoryResultStore()