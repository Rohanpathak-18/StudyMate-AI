import os

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from services.document_service import process_document
from vectorstore.faiss_store import (
    create_vectorstore,
    search_documents,
)
from services.rag_service import generate_answer


app = FastAPI(
    title="StudyMate AI RAG Service",
    version="1.0.0",
)


class ChatRequest(BaseModel):
    message: str
    k: int = 4


@app.get("/")
def root():
    return {
        "success": True,
        "message": "StudyMate AI RAG service is running",
    }


@app.get("/api/health")
def health_check():
    return {
        "success": True,
        "message": "StudyMate AI RAG service is running",
    }


@app.post("/api/index-document")
def index_document(file_path: str):

    try:
        file_path = os.path.abspath(file_path)

        print("\n==============================")
        print("INDEX DOCUMENT")
        print("Path:", file_path)
        print("Exists:", os.path.exists(file_path))
        print("==============================")

        if not os.path.exists(file_path):
            raise FileNotFoundError(
                f"Uploaded file does not exist: {file_path}"
            )

        if not os.path.isfile(file_path):
            raise ValueError(
                f"Path is not a file: {file_path}"
            )

        result = process_document(file_path)

        print(
            "Characters:",
            len(result["text"])
        )

        print(
            "Chunks:",
            result["chunk_count"]
        )

        if result["chunk_count"] == 0:
            raise ValueError(
                "No chunks were created from the document."
            )

        create_vectorstore(
            result["chunks"]
        )

        print("VECTORSTORE CREATED")

        return {
            "success": True,
            "message": "Document indexed successfully",
            "chunk_count": result["chunk_count"],
        }

    except Exception as error:

        print("\n!!!!!!!! INDEXING FAILED !!!!!!!!")
        print(
            type(error).__name__,
            ":",
            str(error)
        )
        print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n")

        raise HTTPException(
            status_code=500,
            detail=f"{type(error).__name__}: {str(error)}",
        )


@app.get("/api/search")
def search(
    query: str,
    k: int = 4
):
    try:
        results = search_documents(
            query,
            k
        )

        return {
            "success": True,
            "count": len(results),
            "results": [
                {
                    "content":
                        document.page_content,
                    "metadata":
                        document.metadata,
                }
                for document in results
            ],
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error),
        )


@app.post("/api/chat")
def chat(request: ChatRequest):

    try:
        if not request.message.strip():
            raise HTTPException(
                status_code=400,
                detail="Message cannot be empty",
            )

        result = generate_answer(
            request.message,
            request.k
        )

        return {
            "success": True,
            "answer": result["answer"],
            "sources": result["sources"],
        }

    except HTTPException:
        raise

    except Exception as error:

        print(
            "CHAT ERROR:",
            type(error).__name__,
            str(error)
        )

        raise HTTPException(
            status_code=500,
            detail=f"{type(error).__name__}: {str(error)}",
        )