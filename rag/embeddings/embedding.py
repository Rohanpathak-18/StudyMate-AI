from langchain_community.embeddings import FastEmbedEmbeddings


MODEL_NAME = "BAAI/bge-small-en-v1.5"


def get_embeddings():
    return FastEmbedEmbeddings(
        model_name=MODEL_NAME,
        threads=2,
        batch_size=32,
        parallel=None,
    )