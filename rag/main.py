import os
import shutil
import tempfile

from fastapi import FastAPI, HTTPException, UploadFile, File
from pydantic import BaseModel

from services.document_service import process_document
from vectorstore.faiss_store import create_vectorstore, search_documents
from services.rag_service import generate_answer


app = FastAPI(
    title="StudyMate AI RAG Service",
    version="1.0.0"
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
        "message": "StudyMate AI RAG service is running"
    }


@app.get("/api/health")
def health_check():
    return {
        "success": True,
        "message": "StudyMate AI RAG service is running"
    }


@app.post("/api/index-document")
async def index_document(file: UploadFile = File(...)):

    temp_file_path = None
    temp_directory = None

    try:

        if not file.filename:
            raise ValueError("Uploaded file does not have a filename.")

        original_filename = os.path.basename(file.filename)

        extension = os.path.splitext(original_filename)[1].lower()

        allowed_extensions = {
            ".pdf",
            ".docx",
            ".pptx",
            ".txt"
        }

        if extension not in allowed_extensions:
            raise ValueError(
                f"Unsupported file type: {extension}"
            )

        # Create temporary directory
        temp_directory = tempfile.mkdtemp(
            prefix="studymate_"
        )

        temp_file_path = os.path.join(
            temp_directory,
            original_filename
        )

        print("\n======================================")
        print("STUDYMATE AI - DOCUMENT INDEXING")
        print("======================================")
        print(
            "Original filename:",
            original_filename
        )
        print(
            "Temporary path:",
            temp_file_path
        )

        # Save uploaded file
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(
                file.file,
                buffer
            )

        print(
            "File exists:",
            os.path.exists(temp_file_path)
        )

        print(
            "File size:",
            os.path.getsize(temp_file_path),
            "bytes"
        )

        print("======================================")

        if not os.path.exists(temp_file_path):
            raise FileNotFoundError(
                "Temporary uploaded file was not created."
            )

        # Process document
        result = process_document(
            temp_file_path
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

        # Create FAISS index
        create_vectorstore(
            result["chunks"]
        )

        print(
            "FAISS vectorstore created successfully."
        )

        print("======================================\n")

        return {
            "success": True,
            "message": "Document indexed successfully",
            "filename": original_filename,
            "chunk_count": result["chunk_count"]
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
            detail=f"{type(error).__name__}: {str(error)}"
        )

    finally:

        try:

            if temp_file_path:
                if os.path.exists(temp_file_path):
                    os.remove(temp_file_path)

            if temp_directory:
                if os.path.isdir(temp_directory):
                    os.rmdir(temp_directory)

        except Exception as cleanup_error:

            print(
                "Temporary file cleanup failed:",
                cleanup_error
            )

        try:
            await file.close()

        except Exception:
            pass


@app.get("/api/search")
def search(
    query: str,
    k: int = 4
):

    try:

        if not query.strip():
            raise HTTPException(
                status_code=400,
                detail="Search query cannot be empty"
            )

        results = search_documents(
            query,
            k
        )

        return {
            "success": True,
            "count": len(results),
            "results": [
                {
                    "content": document.page_content,
                    "metadata": document.metadata
                }
                for document in results
            ]
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
            detail=str(error)
        )


@app.post("/api/chat")
def chat(request: ChatRequest):

    try:

        result = generate_answer(
            request.message,
            request.k
        )

        return result

    except Exception as error:

        print(
            "CHAT ERROR:",
            type(error).__name__,
            str(error)
        )

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )


@app.post("/api/generate-quiz")
def generate_quiz(
    request: GenerateRequest
):

    try:

        from services.quiz_service import (
            generate_quiz as create_quiz
        )

        result = create_quiz(
            request.count
        )

        return {
            "success": True,
            "quiz": result
        }

    except Exception as error:

        print(
            "QUIZ ERROR:",
            type(error).__name__,
            str(error)
        )

        raise HTTPException(
            status_code=500,
            detail=f"{type(error).__name__}: {str(error)}"
        )


@app.post("/api/generate-flashcards")
def generate_flashcards(
    request: GenerateRequest
):

    try:

        from services.flashcard_service import (
            generate_flashcards as create_flashcards
        )

        result = create_flashcards(
            request.count
        )

        return {
            "success": True,
            "flashcards": result
        }

    except Exception as error:

        print(
            "FLASHCARD ERROR:",
            type(error).__name__,
            str(error)
        )

        raise HTTPException(
            status_code=500,
            detail=f"{type(error).__name__}: {str(error)}"
        )