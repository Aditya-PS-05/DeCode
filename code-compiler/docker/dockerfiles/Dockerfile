# Dockerfile for main executor service
FROM python:3.9-slim

RUN apt-get update && apt-get install -y \
    docker.io \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY executor.py .
COPY execution_service.py .

CMD ["python", "execution_service.py"]