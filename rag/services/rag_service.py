import os

from dotenv import load_dotenv
from huggingface_hub import InferenceClient

load_dotenv()

HF_TOKEN = os.getenv("HF_TOKEN")
MODEL_NAME = os.getenv(
    "LLM_MODEL",
    "openai/gpt-oss-20b"
)
HF_PROVIDER = os.getenv(
    "HF_PROVIDER",
    "together"
)

if not HF_TOKEN:
    raise ValueError(
        "HF_TOKEN is missing in rag/.env"
    )

print("====================================")
print("HF MODEL    :", MODEL_NAME)
print("HF PROVIDER :", HF_PROVIDER)
print("====================================")

client = InferenceClient(
    api_key=HF_TOKEN,
    provider=HF_PROVIDER
)


def generate_answer(question, k=4):

    from vectorstore.faiss_store import search_documents

    # Retrieve LangChain Document objects
    documents = search_documents(
        question,
        k
    )

    if not documents:
        return {
            "success": True,
            "answer": (
                "I could not find relevant "
                "information in the uploaded "
                "documents."
            ),
            "sources": []
        }

    # Convert Document objects into text
    context_parts = []
    sources = []

    for index, doc in enumerate(documents):

        if hasattr(doc, "page_content"):
            content = doc.page_content

            if content and content.strip():
                context_parts.append(
                    content.strip()
                )

            # Collect source metadata safely
            metadata = getattr(
                doc,
                "metadata",
                {}
            ) or {}

            source = {
                "index": index + 1,
                "source": metadata.get(
                    "source",
                    metadata.get(
                        "file_name",
                        "Uploaded document"
                    )
                )
            }

            if "page" in metadata:
                source["page"] = (
                    metadata["page"]
                )

            sources.append(source)

        elif isinstance(doc, str):

            if doc.strip():
                context_parts.append(
                    doc.strip()
                )

            sources.append({
                "index": index + 1,
                "source": "Uploaded document"
            })

    # Combine retrieved text
    context = "\n\n".join(
        context_parts
    )

    if not context.strip():
        return {
            "success": True,
            "answer": (
                "I could not find relevant "
                "content in the uploaded "
                "documents."
            ),
            "sources": sources
        }

    prompt = f"""
You are StudyMate AI, an AI tutor.

Answer the user's question using ONLY
the provided study material.

If the answer is not present in the
material, clearly say that it was not
found in the uploaded document.

Study material:
{context}

User question:
{question}

Give a clear, accurate and helpful answer.
"""

    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a helpful "
                    "educational AI tutor."
                )
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        max_tokens=500,
        temperature=0.3
    )

    answer = (
        response
        .choices[0]
        .message
        .content
    )

    return {
        "success": True,
        "answer": answer,
        "sources": sources
    }