import os

from langchain_text_splitters import RecursiveCharacterTextSplitter

from loaders.pdf_loader import load_pdf
from loaders.docx_loader import load_docx
from loaders.pptx_loader import load_pptx
from loaders.text_loader import load_text


def load_document(file_path: str) -> str:
    extension = os.path.splitext(file_path)[1].lower()

    if extension == ".pdf":
        return load_pdf(file_path)

    if extension == ".docx":
        return load_docx(file_path)

    if extension == ".pptx":
        return load_pptx(file_path)

    if extension == ".txt":
        return load_text(file_path)

    raise ValueError(f"Unsupported file type: {extension}")


def split_text(text: str):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        separators=[
            "\n\n",
            "\n",
            ". ",
            " ",
            ""
        ],
    )

    return splitter.split_text(text)


def process_document(file_path: str):
    text = load_document(file_path)

    if not text.strip():
        raise ValueError("No readable text found in document")

    chunks = split_text(text)

    return {
        "text": text,
        "chunks": chunks,
        "chunk_count": len(chunks),
    }