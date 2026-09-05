import os

from langchain_community.vectorstores import FAISS

from embeddings.embedding import get_embeddings


BASE_VECTORSTORE_PATH = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "vectorstore_data"
)


def get_vectorstore_path(document_id: str):
    return os.path.join(
        BASE_VECTORSTORE_PATH,
        str(document_id)
    )


def create_vectorstore(chunks, document_id: str):
    embeddings = get_embeddings()

    vectorstore = FAISS.from_texts(
        texts=chunks,
        embedding=embeddings,
        metadatas=[
            {
                "document_id": str(document_id),
            }
            for _ in chunks
        ],
    )

    vectorstore_path = get_vectorstore_path(
        document_id
    )

    os.makedirs(
        vectorstore_path,
        exist_ok=True
    )

    vectorstore.save_local(
        vectorstore_path
    )

    return vectorstore


def load_vectorstore(document_id: str):
    embeddings = get_embeddings()

    vectorstore_path = get_vectorstore_path(
        document_id
    )

    if not os.path.exists(vectorstore_path):
        raise FileNotFoundError(
            "Vector store does not exist for this document."
        )

    return FAISS.load_local(
        vectorstore_path,
        embeddings,
        allow_dangerous_deserialization=True,
    )


def search_documents(
    query: str,
    document_id: str,
    k: int = 4
):
    vectorstore = load_vectorstore(
        document_id
    )

    return vectorstore.similarity_search(
        query,
        k=k,
    )