import sys
import json
import io
from contextlib import redirect_stdout, redirect_stderr

if __name__ == "__main__":
    # Read input JSON from stdin
    input_text = sys.stdin.read()
    input_data = json.loads(input_text)

    try:
        # Capture stdout and stderr
        stdout_capture = io.StringIO()
        stderr_capture = io.StringIO()

        with redirect_stdout(stdout_capture), redirect_stderr(stderr_capture):
            exec(input_data["code"])

        # Get captured output
        stdout_text = stdout_capture.getvalue()
        stderr_text = stderr_capture.getvalue()

        if stderr_text:
            print(json.dumps({"error": stderr_text.strip()}))
        else:
            print(json.dumps({"output": stdout_text.strip() if stdout_text else "No output"}))
    except Exception as e:
        print(json.dumps({"error": str(e)}))