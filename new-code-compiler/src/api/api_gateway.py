import os
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from jobqueue import queue as code_queue
import uuid

app = FastAPI(
    title="De-Code",
    description="Secure containerized code runner for Python, Java, C++, Rust",
    version="1.0.0"
)

LANGUAGES = ["python", "java", "cpp", "rust"]

class SubmitRequest(BaseModel):
    language: str
    code: str
    input: dict = {}

@app.get("/languages")
def get_languages():
    return {"languages": LANGUAGES}

@app.post("/submit")
def submit_code(req: SubmitRequest):
    if req.language.lower() not in LANGUAGES:
        raise HTTPException(status_code=400, detail="Unsupported language.")
    if not req.code or not isinstance(req.code, str):
        raise HTTPException(status_code=400, detail="Valid code required")
    job = {
        "job_id": str(uuid.uuid4()),
        "language": req.language.lower(),
        "code": req.code,
        "input": req.input
    }
    job_id = code_queue.enqueue(job)
    return {"job_id": job_id}

@app.get("/result/{job_id}")
def get_result(job_id: str):
    result = code_queue.get_result(job_id)
    if not result:
        return JSONResponse(status_code=202, content={"status": "pending"})
    return result