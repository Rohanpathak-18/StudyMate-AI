from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from services.document_service import process_document
from vectorstore.faiss_store import (
    create_vectorstore,
    search_documents,
)
from services.rag_service import generate_answer
from services.quiz_service import generate_quiz
from services.flashcard_service import generate_flashcards


app = FastAPI(
    title="StudyMate AI RAG Service",
    version="1.0.0",
)


class ChatRequest(BaseModel):
    message: str
    document_id: str
    k: int = 4


class GenerateRequest(BaseModel):
    document_id: str
    count: int = 5


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
def index_document(
    file_path: str,
    document_id: str,
):
    try:
        print("=================================")
        print("INDEXING DOCUMENT")
        print("Document ID:", document_id)
        print("File path:", file_path)
        print("=================================")

        result = process_document(
            file_path
        )

        print(
            "Chunks:",
            result["chunk_count"]
        )

        create_vectorstore(
            result["chunks"],
            document_id,
        )

        return {
            "success": True,
            "message": "Document indexed successfully",
            "document_id": document_id,
            "chunk_count": result["chunk_count"],
        }

    except Exception as error:
        print(
            "INDEXING ERROR:",
            str(error)
        )

        raise HTTPException(
            status_code=500,
            detail=str(error),
        )


@app.get("/api/search")
def search(
    query: str,
    document_id: str,
    k: int = 4,
):
    try:
        results = search_documents(
            query,
            document_id,
            k,
        )

        return {
            "success": True,
            "count": len(results),
            "results": [
                {
                    "content": document.page_content,
                    "metadata": document.metadata,
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
def chat(
    request: ChatRequest
):
    try:
        if not request.message.strip():
            raise HTTPException(
                status_code=400,
                detail="Message cannot be empty",
            )

        result = generate_answer(
            request.message,
            request.document_id,
            request.k,
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
            str(error)
        )

        raise HTTPException(
            status_code=500,
            detail=str(error),
        )


@app.post("/api/generate-quiz")
def generate_quiz_endpoint(
    request: GenerateRequest
):
    try:
        result = generate_quiz(
            request.document_id,
            request.count,
        )

        return {
            "success": True,
            "quiz": result,
        }

    except Exception as error:
        print(
            "QUIZ ERROR:",
            str(error)
        )

        raise HTTPException(
            status_code=500,
            detail=str(error),
        )


@app.post("/api/generate-flashcards")
def generate_flashcards_endpoint(
    request: GenerateRequest
):
    try:
        result = generate_flashcards(
            request.document_id,
            request.count,
        )

        return {
            "success": True,
            "flashcards": result,
        }

    except Exception as error:
        print(
            "FLASHCARD ERROR:",
            str(error)
        )

        raise HTTPException(
            status_code=500,
            detail=str(error),
        )