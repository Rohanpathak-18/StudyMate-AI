import os
from functools import lru_cache

from langchain_community.vectorstores import FAISS
from embeddings.embedding import get_embeddings

VECTORSTORE_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "vectorstore_data")
MONGO_INDEX_NAME = "studymate-faiss-index"


@lru_cache(maxsize=1)
def _get_mongo_bucket():
    mongo_uri = os.getenv("MONGO_URI")
    if not mongo_uri:
        return None

    from gridfs import GridFSBucket
    from pymongo import MongoClient

    client = MongoClient(mongo_uri, serverSelectionTimeoutMS=5000)
    database = client.get_default_database("studymate")
    return GridFSBucket(database, bucket_name="studymate_vector_index")


def _load_persisted_index(embeddings):
    bucket = _get_mongo_bucket()
    if bucket is None:
        return None

    files = list(bucket.find({"filename": MONGO_INDEX_NAME}).sort("uploadDate", -1).limit(1))
    if not files:
        return None

    serialized = bucket.open_download_stream(files[0]["_id"]).read()
    return FAISS.deserialize_from_bytes(
        serialized,
        embeddings,
        allow_dangerous_deserialization=True,
    )


def _persist_index(vectorstore):
    bucket = _get_mongo_bucket()
    if bucket is None:
        return

    for stored_file in bucket.find({"filename": MONGO_INDEX_NAME}):
        bucket.delete(stored_file["_id"])

    bucket.upload_from_stream(MONGO_INDEX_NAME, vectorstore.serialize_to_bytes())


def _load_vectorstore(embeddings):
    persisted = _load_persisted_index(embeddings)
    if persisted is not None:
        return persisted

    if os.path.isfile(os.path.join(VECTORSTORE_PATH, "index.faiss")):
        return FAISS.load_local(
            VECTORSTORE_PATH,
            embeddings,
            allow_dangerous_deserialization=True,
        )
    return None


def create_vectorstore(chunks):
    if not chunks:
        raise ValueError("Cannot create vectorstore from empty chunks.")

    embeddings = get_embeddings()
    os.makedirs(VECTORSTORE_PATH, exist_ok=True)
    vectorstore = _load_vectorstore(embeddings)

    if vectorstore is not None:
        vectorstore.add_texts(chunks)
    else:
        vectorstore = FAISS.from_texts(texts=chunks, embedding=embeddings)

    # MongoDB is authoritative in combined/free deployments; the local copy
    # remains a useful cache and keeps the existing three-process dev flow.
    vectorstore.save_local(VECTORSTORE_PATH)
    _persist_index(vectorstore)
    return vectorstore


def load_vectorstore():
    embeddings = get_embeddings()
    vectorstore = _load_vectorstore(embeddings)
    if vectorstore is None:
        raise FileNotFoundError("Vector store does not exist. Upload a document first.")
    return vectorstore


def search_documents(query: str, k: int = 4):
    return load_vectorstore().similarity_search(query, k=k)
