import os as _os
from typing import Any, Optional
import redis as _redis
import json as _json
import uuid as _uuid

class CodeQueue:
    def __init__(self):
        url = _os.environ.get("QUEUE_URL", "redis://localhost:6379/0")
        self.redis = _redis.Redis.from_url(url, decode_responses=True)
        self.queue_name = "code_runner_jobs"
        self.result_prefix = "code_runner_result:"

    def enqueue(self, job: dict) -> str:
        job_id = str(_uuid.uuid4())
        packed = _json.dumps({"id": job_id, "job": job})
        self.redis.lpush(self.queue_name, packed)
        return job_id

    def dequeue(self, timeout=1) -> Optional[dict]:
        job = self.redis.brpop(self.queue_name, timeout=timeout)
        if job is None:
            return None
        _, packed = job
        return _json.loads(packed)

    def put_result(self, job_id: str, result: dict):
        key = self.result_prefix + job_id
        self.redis.set(key, _json.dumps(result), ex=600)

    def get_result(self, job_id: str) -> Optional[dict]:
        key = self.result_prefix + job_id
        data = self.redis.get(key)
        if data:
            return _json.loads(data)
        return None

queue = CodeQueue()