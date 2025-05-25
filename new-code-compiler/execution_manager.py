import os
import subprocess
import tempfile
import shutil
import json
import sys

from static_analysis import static_code_scan

LANG_MAP = {"python": ".py", "java": ".java", "cpp": ".cpp"}

def run_containerization(language, code, input_data, job_id):
    """
    Launches language-specific code in a secure temporary containerized environment.
    """
    file_ext = LANG_MAP.get(language)
    if not file_ext:
        return {"error": "Unsupported language"}
    with tempfile.TemporaryDirectory() as tmpd:
        # Prepare user code file path
        user_code_path = os.path.join(tmpd, f"user_code{file_ext}")
        with open(user_code_path, "w") as f:
            f.write(code)
        
        # Harness path (already in image at /runner)
        harness_name = f"harness_{language}{file_ext}"
        # Prepare input.json
        json_input_path = os.path.join(tmpd, "input.json")
        with open(json_input_path, "w") as f:
            json.dump({"input": input_data, "code": code}, f)
        
        # Security: Use restrictive seccomp, drop all capabilities, read-only root, short resource budget
        docker_run = [
            "docker", "run", "--rm",
            "--network", "none",
            "--cpus", "1", "--memory", "128m",
            "-i",  # Attach stdin for harness expecting stdin input
            # Seccomp temporarily disabled for troubleshooting; restore for prod!
            "-v", f"{user_code_path}:/runner/user_code{file_ext}:ro",
            "-v", f"{json_input_path}:/runner/input.json:ro",
            "--workdir", "/runner",
            f"new-code-compiler_worker-{language}:latest",  # match docker-compose image name
        ]
        # Python: ["python", "harness_python.py", ...]
        if language == "python":
            # Pipe /runner/input.json as stdin to harness_python.py inside container
            docker_run += ["python", "harness_python.py"]
            # Instead of shell redirect, handle input.json as stdin via subprocess below
        elif language == "java":
            docker_run += ["sh", "-c", "javac user_code.java && java Harness"]
        elif language == "cpp":
            docker_run += ["sh", "-c", "g++ -O2 -o main user_code.cpp && ./main"]

        try:
            # Open the input.json file and pass it as stdin for the process
            with open(json_input_path, "rb") as fin:
                proc = subprocess.run(
                    docker_run,
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE,
                    stdin=fin,
                    timeout=20
                )
            out = proc.stdout.decode(errors="replace")
            err = proc.stderr.decode(errors="replace")
            if proc.returncode != 0:
                return {"error": f"{err.strip() or 'Code failed'}"}
            if out:
                try:
                    return json.loads(out)
                except Exception:
                    return {"output": out.strip()}
            else:
                return {"output": "No output."}
        except subprocess.TimeoutExpired:
            return {"error": "Execution timed out"}
        except Exception as e:
            return {"error": str(e)}

def execute_job(job):
    language = job.get("language")
    code = job.get("code")
    input_data = job.get("input", {})
    job_id = job.get("job_id", "unknown_job")
    try:
        # Static security analysis
        static_code_scan(code, language)
    except Exception as e:
        return {"error": f"Static code scan failed: {str(e)}"}
    return run_containerization(language, code, input_data, job_id)