# LeetCode-Style Code Runner: Monorepo Structure

```
new-code-compiler/
├── api_gateway.py            # API Gateway (handles requests, pushes jobs to queue, returns results)
├── main.py                   # Entrypoint for orchestrating workers and system (if single-process demo)
├── docker-compose.yaml       # Local development: bring up API, workers, Redis, etc.
├── Dockerfile                # Base image for workers/secure containers
├── Dockerfile.api            # API Gateway Dockerfile
├── Dockerfile.python         # Python worker image (isolated/secure)
├── Dockerfile.java           # Java worker image (isolated/secure)
├── Dockerfile.cpp            # C++ worker image (isolated/secure)
├── seccomp-profile.json      # Restrictive seccomp profile for container isolation
├── jobqueue.py                  # Lightweight queue (or Redis/SQS client for prod)
├── test_harnesses/           # Prebuilt test harnesses per language
│   ├── harness_python.py
│   ├── harness_java.java
│   └── harness_cpp.cpp
├── static_analysis.py        # Dangerous-pattern static code scanner
├── execution_manager.py      # Logic for spawning/reaping per-execution containers
├── result_storage.py         # Store/retrieve execution results
└── README.md                 # Full documentation and API usage
```

- All sensitive code-execution happens in per-job Docker containers with seccomp and temporary file systems.
- API Gateway exposes `/submit`, `/result/<job_id>`, and `/languages` endpoints (OpenAPI/Swagger documented if FastAPI).
- Includes secured and extensible static code analysis, harness injection, containerized worker demo per language.

======================================================

1. Python Example:
  {
    "language": "python",
    "code": "def add(a, b):\n    return a + b\n\nresult = add(5, 3)\nprint(f'Result: {result}')",
    "input": {}
  }

  2. C++ Example:
  {"language": "cpp","code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a = 10, b = 20;\n    int sum = a + b;\n    cout << \"Sum: \" << sum << endl;\n    return 0;\n}","input": {}}

  3. Java Example:
  {"language": "java", "code": "public class Main {\n    public static void main(String[] args) {\n        int a = 15;\n        int b = 25;\n        int sum = a + b;\n  System.out.println(\"Sum: \" + sum);\n    }\n}","input": {}}

  4. Rust Example:
  {"language": "rust","code": "fn fibonacci(n: u32) -> u32 {\n    match n {\n        0 => 0,\n        1 => 1,\n        _ => fibonacci(n - 1) + fibonacci(n - 2)\n    }\n}\n\nfn main() {\n    for i in 0..10 {\n        println!(\"fib({}) = {}\", i, fibonacci(i));\n    }\n}","input": {}}

  5. Javascript Example:
  {
    "language": "javascript",
    "code": "console.log('Hello from JavaScript!');",
    "input": {}
  }

  {
    "language": "javascript",
    "code": "async function delay(ms) {\n    return new Promise(resolve => setTimeout(resolve, ms));\n}\n\nasync function main() {\n    
  console.log('Start');\n    await delay(100);\n    console.log('After 100ms');\n    const result = [1, 2, 3].map(x => x * x);\n    
  console.log('Squares:', result);\n}\n\nmain();",
    "input": {}
  }
======================= Commands =====================
======================================================


export QUEUE_URL=redis://localhost:6380/0 && uv run main.py


docker-compose up -d

docker-compose build

docker network rm code-compiler-network

docker compose up