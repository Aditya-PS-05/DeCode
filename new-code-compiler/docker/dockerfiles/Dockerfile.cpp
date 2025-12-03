# Dockerfile for C++ worker (secure, for code execution)
FROM gcc:12.2.0-bullseye

WORKDIR /runner

RUN apt-get update && \
    apt-get install -y --no-install-recommends tini seccomp python3 python3-pip curl ca-certificates gnupg && \
    install -m 0755 -d /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg && \
    chmod a+r /etc/apt/keyrings/docker.gpg && \
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian bullseye stable" > /etc/apt/sources.list.d/docker.list && \
    apt-get update && \
    apt-get install -y --no-install-recommends docker-ce-cli && \
    pip3 install --no-cache-dir redis && \
    rm -rf /var/lib/apt/lists/*

COPY src/test_harnesses/harness_cpp.cpp /runner/harness_cpp.cpp
COPY src/worker/static_analysis.py /runner/static_analysis.py
COPY src/worker/execution_manager.py /runner/execution_manager.py
COPY src/worker/jobqueue.py /runner/jobqueue.py
COPY docker/seccomp-profile.json /runner/seccomp-profile.json
COPY src/worker/main.py /runner/main.py

RUN useradd --no-create-home --shell /usr/sbin/nologin runneruser

# USER runneruser

ENV EXEC_MEMORY_MB=128
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["python3", "/runner/main.py"]