# Dockerfile for Java worker (secure, for code execution)
FROM openjdk:18-jdk-slim

WORKDIR /runner

# No network tools, only restricted user and seccomp
RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc tini seccomp python3 python3-pip && \
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