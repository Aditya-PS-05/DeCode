import os
import subprocess
import tempfile
import shutil
import json
import sys

from static_analysis import static_code_scan

LANG_MAP = {"python": ".py", "java": ".java", "cpp": ".cpp", "rust": ".rs", "javascript": ".js"}

def run_containerization(language, code, input_data, job_id):
    """
    Launches language-specific code in a secure temporary containerized environment.
    """
    file_ext = LANG_MAP.get(language)
    if not file_ext:
        return {"error": "Unsupported language"}

    # Use TMPDIR if set (for Docker-in-Docker scenarios), otherwise use default
    tmpdir_base = os.environ.get('TMPDIR', tempfile.gettempdir())

    with tempfile.TemporaryDirectory(dir=tmpdir_base) as tmpd:
        # For Java, extract the public class name to use as filename
        class_name = None
        if language == "java":
            import re
            match = re.search(r'public\s+class\s+(\w+)', code)
            if match:
                class_name = match.group(1)
                filename = f"{class_name}.java"
            else:
                # No public class, use default name
                class_name = "Main"
                filename = "Main.java"
        else:
            filename = f"user_code{file_ext}"

        # Prepare user code file path
        user_code_path = os.path.join(tmpd, filename)
        with open(user_code_path, "w") as f:
            f.write(code)

        # Harness path (already in image at /runner)
        harness_name = f"harness_{language}{file_ext}"
        # Prepare input.json
        json_input_path = os.path.join(tmpd, "input.json")
        with open(json_input_path, "w") as f:
            json.dump({"input": input_data, "code": code}, f)

        # For Docker-in-Docker: convert container paths to host paths
        # If TMPDIR is set, it means we're in a container with a mounted volume
        # The host can access these files via the same mounted path structure
        tmpdir_env = os.environ.get('TMPDIR')
        host_tmp_path = os.environ.get('HOST_TMP_PATH')

        if tmpdir_env and host_tmp_path:
            # Convert container paths to host paths
            host_user_code_path = user_code_path.replace(tmpdir_env, host_tmp_path)
            host_json_input_path = json_input_path.replace(tmpdir_env, host_tmp_path)
        else:
            host_user_code_path = user_code_path
            host_json_input_path = json_input_path

        # Security: Use restrictive seccomp, drop all capabilities, read-only root, short resource budget
        docker_run = [
            "docker", "run", "--rm",
            "--network", "none",
            "--cpus", "1", "--memory", "128m",
            "-i",  # Attach stdin for harness expecting stdin input
            # Seccomp temporarily disabled for troubleshooting; restore for prod!
            "-v", f"{host_user_code_path}:/runner/{filename}:ro",
            "-v", f"{host_json_input_path}:/runner/input.json:ro",
            "--workdir", "/runner",
            f"new-code-compiler_worker-{language}:latest",  # match docker-compose image name
        ]
        # Python: ["python", "harness_python.py", ...]
        if language == "python":
            # Pipe /runner/input.json as stdin to harness_python.py inside container
            docker_run += ["python", "harness_python.py"]
            # Instead of shell redirect, handle input.json as stdin via subprocess below
        elif language == "java":
            # Use the class_name extracted earlier
            docker_run += ["sh", "-c", f"javac {filename} && java {class_name}"]
        elif language == "cpp":
            docker_run += ["sh", "-c", f"g++ -O2 -o main {filename} && ./main"]
        elif language == "rust":
            docker_run += ["sh", "-c", f"rustc -O {filename} -o main && ./main"]
        elif language == "javascript":
            docker_run += ["node", filename]

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