import os

from langchain_community.embeddings import FastEmbedEmbeddings


MODEL_NAME = "BAAI/bge-small-en-v1.5"


def get_embeddings():
    return FastEmbedEmbeddings(
        model_name=MODEL_NAME,
        threads=int(os.getenv("EMBEDDING_THREADS", "1")),
        batch_size=16,
        parallel=None,
    )
