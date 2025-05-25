# Dockerfile for C++ worker (secure, for code execution)
FROM gcc:12.2.0-bullseye

WORKDIR /runner

RUN apt-get update && \
    apt-get install -y --no-install-recommends tini seccomp python3 python3-pip && \
    rm -rf /var/lib/apt/lists/*

COPY test_harnesses/harness_cpp.cpp /runner/harness_cpp.cpp
COPY static_analysis.py /runner/static_analysis.py
COPY execution_manager.py /runner/execution_manager.py
COPY jobqueue.py /runner/jobqueue.py
COPY seccomp-profile.json /runner/seccomp-profile.json

RUN useradd --no-create-home --shell /usr/sbin/nologin runneruser

# USER runneruser

ENV EXEC_MEMORY_MB=128
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["python3", "/runner/execution_manager.py"]