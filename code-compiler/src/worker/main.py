import time
from jobqueue import queue
from execution_manager import execute_job

def worker_loop():
    while True:
        job_pack = queue.dequeue(timeout=5)
        if not job_pack:
            time.sleep(1)
            continue
        job = job_pack["job"]
        job_id = job_pack["id"]
        job["job_id"] = job_id
        print(f"Running job {job_id} for language {job['language']}")
        result = execute_job(job)
        queue.put_result(job_id, result)

if __name__ == "__main__":
    print("Worker starting up (single process demo mode)...")
    worker_loop()