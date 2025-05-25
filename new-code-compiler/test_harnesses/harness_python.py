import sys
import json

def run_user_code(user_func, input_data):
    # Simpler than LeetCode: input_data is always a dict
    return user_func(**input_data)

if __name__ == "__main__":
    # Read input JSON from stdin
    input_text = sys.stdin.read()
    input_data = json.loads(input_text)

    # User code must define a function 'solution'
    # The exec replaces this function below!
    def solution():
        raise NotImplementedError("User function not provided")

    # The exec replaces this function.
    ns = {}
    exec(input_data["code"], ns)
    user_func = ns["solution"]

    try:
        out = run_user_code(user_func, input_data.get("input", {}))
        print(json.dumps({"output": out}))
    except Exception as e:
        print(json.dumps({"error": str(e)}))