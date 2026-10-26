#!/bin/sh
set -eu
export RAG_URL=http://127.0.0.1:8000
export RAG_LOCAL_ONLY=true
: "${MONGO_URI:?Set MONGO_URI in the combined Render service environment}"
: "${HF_TOKEN:?Set HF_TOKEN in the combined Render service environment}"

cd /app/rag
/opt/rag-venv/bin/uvicorn main:app --host 127.0.0.1 --port 8000 --workers 1 &
RAG_PID=$!
API_PID=""

cleanup() {
  if [ -n "$API_PID" ]; then
    kill "$API_PID" 2>/dev/null || true
    wait "$API_PID" 2>/dev/null || true
  fi
  kill "$RAG_PID" 2>/dev/null || true
  wait "$RAG_PID" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

attempt=0
until /opt/rag-venv/bin/python -c "from urllib.request import urlopen; urlopen('http://127.0.0.1:8000/api/health', timeout=2).read()" >/dev/null 2>&1; do
  if ! kill -0 "$RAG_PID" 2>/dev/null; then
    echo "RAG service exited before becoming healthy" >&2
    exit 1
  fi
  attempt=$((attempt + 1))
  if [ "$attempt" -ge 60 ]; then
    echo "RAG service did not become healthy within 120 seconds" >&2
    exit 1
  fi
  sleep 2
done

cd /app/server
node server.js &
API_PID=$!
wait "$API_PID"
