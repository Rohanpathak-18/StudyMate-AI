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


class GenerateRequest(BaseModel):
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
def index_document(file_path: str):
    try:
        file_path = os.path.abspath(file_path)

        print("\n======================================")
        print("STUDYMATE AI - DOCUMENT INDEXING")
        print("======================================")
        print("File path:", file_path)
        print("File exists:", os.path.exists(file_path))
        print("======================================")

        if not os.path.exists(file_path):
            raise FileNotFoundError(
                f"File not found: {file_path}"
            )

        if not os.path.isfile(file_path):
            raise ValueError(
                f"Path is not a file: {file_path}"
            )

        result = process_document(
            file_path
        )

        print(
            "Extracted text length:",
            len(result["text"])
        )

        print(
            "Number of chunks:",
            result["chunk_count"]
        )

        if not result["chunks"]:
            raise ValueError(
                "No text chunks were created."
            )

        create_vectorstore(
            result["chunks"]
        )

        print(
            "FAISS vectorstore created successfully."
        )

        print(
            "======================================\n"
        )

        return {
            "success": True,
            "message": "Document indexed successfully",
            "chunk_count": result["chunk_count"],
        }

    except Exception as error:
        print("\n======================================")
        print("DOCUMENT INDEXING FAILED")
        print(
            "Error type:",
            type(error).__name__
        )
        print(
            "Error:",
            str(error)
        )
        print("======================================\n")

        raise HTTPException(
            status_code=500,
            detail=(
                f"{type(error).__name__}: "
                f"{str(error)}"
            ),
        )


@app.get("/api/search")
def search(
    query: str,
    k: int = 4,
):
    try:
        if not query.strip():
            raise HTTPException(
                status_code=400,
                detail="Search query cannot be empty",
            )

        results = search_documents(
            query,
            k,
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

    except HTTPException:
        raise

    except Exception as error:
        print(
            "SEARCH ERROR:",
            str(error)
        )

        raise HTTPException(
            status_code=500,
            detail=str(error),
        )

@app.post("/api/chat")
def chat(request: ChatRequest):

    try:
        result = generate_answer(
            request.message,
            request.k
        )

        return result

    except Exception as e:

        print(
            "CHAT ERROR:",
            type(e).__name__,
            str(e)
        )

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

@app.post("/api/generate-quiz")
def generate_quiz(
    request: GenerateRequest
):
    try:
        from services.quiz_service import (
            generate_quiz as create_quiz,
        )

        result = create_quiz(
            request.count
        )

        return {
            "success": True,
            "quiz": result,
        }

    except Exception as error:
        print(
            "QUIZ ERROR:",
            type(error).__name__,
            str(error)
        )

        raise HTTPException(
            status_code=500,
            detail=(
                f"{type(error).__name__}: "
                f"{str(error)}"
            ),
        )


@app.post("/api/generate-flashcards")
def generate_flashcards(
    request: GenerateRequest
):
    try:
        from services.flashcard_service import (
            generate_flashcards as create_flashcards,
        )

        result = create_flashcards(
            request.count
        )

        return {
            "success": True,
            "flashcards": result,
        }

    except Exception as error:
        print(
            "FLASHCARD ERROR:",
            type(error).__name__,
            str(error)
        )

        raise HTTPException(
            status_code=500,
            detail=(
                f"{type(error).__name__}: "
                f"{str(error)}"
            ),
        )