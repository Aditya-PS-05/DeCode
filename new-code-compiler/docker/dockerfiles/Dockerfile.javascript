# Dockerfile for JavaScript/Node.js worker (secure, for code execution)
FROM node:20-slim

WORKDIR /runner

# Install dependencies including Docker CLI
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    tini seccomp python3 python3-pip curl ca-certificates gnupg && \
    install -m 0755 -d /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg && \
    chmod a+r /etc/apt/keyrings/docker.gpg && \
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian bookworm stable" > /etc/apt/sources.list.d/docker.list && \
    apt-get update && \
    apt-get install -y --no-install-recommends docker-ce-cli && \
    pip3 install --no-cache-dir redis --break-system-packages && \
    rm -rf /var/lib/apt/lists/*

COPY src/worker/static_analysis.py /runner/static_analysis.py
COPY src/worker/execution_manager.py /runner/execution_manager.py
COPY src/worker/jobqueue.py /runner/jobqueue.py
COPY docker/seccomp-profile.json /runner/seccomp-profile.json
COPY src/worker/main.py /runner/main.py

RUN useradd --no-create-home --shell /usr/sbin/nologin runneruser

# USER runneruser

ENV NODE_ENV=production
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["python3", "/runner/main.py"]
