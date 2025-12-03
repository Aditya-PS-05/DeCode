# Dockerfile for Java worker (secure, for code execution)
FROM eclipse-temurin:21-jdk-jammy

WORKDIR /runner

# No network tools, only restricted user and seccomp, plus Docker CLI
RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc tini seccomp python3 python3-pip curl ca-certificates gnupg && \
    install -m 0755 -d /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg && \
    chmod a+r /etc/apt/keyrings/docker.gpg && \
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu jammy stable" > /etc/apt/sources.list.d/docker.list && \
    apt-get update && \
    apt-get install -y --no-install-recommends docker-ce-cli && \
    pip3 install --no-cache-dir redis && \
    rm -rf /var/lib/apt/lists/*

COPY test_harnesses/harness_java.java /runner/harness_java.java
COPY static_analysis.py /runner/static_analysis.py
COPY execution_manager.py /runner/execution_manager.py
COPY jobqueue.py /runner/jobqueue.py
COPY seccomp-profile.json /runner/seccomp-profile.json

RUN useradd --no-create-home --shell /usr/sbin/nologin runneruser

# USER runneruser

ENV JAVA_TOOL_OPTIONS="-XX:MaxRAM=128m"
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["python3", "/runner/execution_manager.py"]