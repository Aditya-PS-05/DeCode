FROM public.ecr.aws/lambda/python:3.10

# Install required packages
RUN yum update -y && \
    yum install -y gcc-c++ java-1.8.0-openjdk-devel && \
    yum clean all

# Create non-root user for additional security
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Set resource limits
RUN echo "* soft nproc 32" >> /etc/security/limits.conf && \
    echo "* hard nproc 64" >> /etc/security/limits.conf && \
    echo "* soft nofile 1024" >> /etc/security/limits.conf && \
    echo "* hard nofile 2048" >> /etc/security/limits.conf

# Copy requirements and install dependencies
COPY requirements.txt ${LAMBDA_TASK_ROOT}
RUN pip install --no-cache-dir -r requirements.txt

# Copy function code
COPY lambda_function.py ${LAMBDA_TASK_ROOT}

# Set up temporary directory with proper permissions
RUN mkdir -p /tmp/code_execution && \
    chmod 755 /tmp/code_execution

# Set environment variables for security
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV MALLOC_ARENA_MAX=2

# Remove unnecessary packages and clean up
RUN yum history -y undo last || true && \
    yum clean all && \
    rm -rf /var/cache/yum

CMD ["lambda_function.handler"]