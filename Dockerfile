FROM node:22-bookworm-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PYTHONPATH=/app/rag \
    RAG_URL=http://127.0.0.1:8000 \
    RAG_LOCAL_ONLY=true \
    EMBEDDING_THREADS=1 \
    TOKENIZERS_PARALLELISM=false

RUN apt-get update && apt-get install -y --no-install-recommends \
      python3 python3-venv python3-pip build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY server/package.json server/package-lock.json /app/server/
RUN cd /app/server && npm ci --omit=dev

COPY rag/requirements.txt /app/rag/requirements.txt
RUN python3 -m venv /opt/rag-venv \
    && /opt/rag-venv/bin/pip install --upgrade pip \
    && /opt/rag-venv/bin/pip install -r /app/rag/requirements.txt

COPY server/ /app/server/
COPY rag/ /app/rag/
COPY deploy/start-combined.sh /app/deploy/start-combined.sh

EXPOSE 10000
CMD ["/bin/sh", "/app/deploy/start-combined.sh"]
