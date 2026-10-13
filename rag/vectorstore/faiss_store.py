import os

from langchain_community.vectorstores import FAISS

from embeddings.embedding import get_embeddings


VECTORSTORE_PATH = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "vectorstore_data"
)


def create_vectorstore(chunks):

    if not chunks:
        raise ValueError(
            "Cannot create vectorstore from empty chunks."
        )

    embeddings = get_embeddings()

    os.makedirs(
        VECTORSTORE_PATH,
        exist_ok=True
    )

    # Keep earlier uploads searchable when a new document is indexed.
    if os.path.isfile(os.path.join(VECTORSTORE_PATH, "index.faiss")):
        vectorstore = FAISS.load_local(
            VECTORSTORE_PATH,
            embeddings,
            allow_dangerous_deserialization=True
        )
        vectorstore.add_texts(chunks)
    else:
        vectorstore = FAISS.from_texts(
            texts=chunks,
            embedding=embeddings
        )

    vectorstore.save_local(
        VECTORSTORE_PATH
    )

    return vectorstore


def load_vectorstore():

    embeddings = get_embeddings()

    if not os.path.exists(
        VECTORSTORE_PATH
    ):
        raise FileNotFoundError(
            "Vector store does not exist. Upload a document first."
        )

    return FAISS.load_local(
        VECTORSTORE_PATH,
        embeddings,
        allow_dangerous_deserialization=True
    )


def search_documents(
    query: str,
    k: int = 4
):
    vectorstore = load_vectorstore()

    return vectorstore.similarity_search(
        query,
        k=k
    )
