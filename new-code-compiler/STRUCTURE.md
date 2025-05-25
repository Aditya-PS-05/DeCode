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