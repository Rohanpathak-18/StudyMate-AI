import os

from dotenv import load_dotenv
from huggingface_hub import InferenceClient

from vectorstore.faiss_store import search_documents


load_dotenv()

HF_TOKEN = os.getenv("HF_TOKEN")

MODEL_NAME = os.getenv(
    "LLM_MODEL",
    "Qwen/Qwen2.5-7B-Instruct"
)

client = None

if HF_TOKEN:
    client = InferenceClient(
        api_key=HF_TOKEN,
        provider="auto",
    )


SYSTEM_PROMPT = """
You are StudyMate AI, an intelligent study assistant.

Use only the supplied document context.

Rules:
1. Do not invent information.
2. Explain clearly and simply.
3. If the answer is not present in the document,
   say:
   "I couldn't find the answer in the uploaded document."
4. Use bullets or numbered points when useful.
"""


def generate_answer(
    question: str,
    document_id: str,
    k: int = 4,
):
    if not question.strip():
        raise ValueError(
            "Question cannot be empty"
        )

    if client is None:
        raise ValueError(
            "HF_TOKEN is missing. "
            "Add HF_TOKEN to rag/.env."
        )

    documents = search_documents(
        question,
        document_id,
        k,
    )

    if not documents:
        return {
            "answer": (
                "I couldn't find relevant information "
                "in the uploaded document."
            ),
            "sources": [],
        }

    context_parts = []

    for index, document in enumerate(
        documents,
        start=1
    ):
        context_parts.append(
            f"[Context {index}]\n"
            f"{document.page_content}"
        )

    context = "\n\n".join(
        context_parts
    )

    user_prompt = f"""
Answer the question using only the context.

QUESTION:
{question}

CONTEXT:
{context}

If the answer is not available in the context,
say:

"I couldn't find the answer in the uploaded document."
"""

    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT,
            },
            {
                "role": "user",
                "content": user_prompt,
            },
        ],
        temperature=0.2,
        max_tokens=500,
    )

    answer = response.choices[0].message.content

    return {
        "answer": answer,
        "sources": [
            {
                "content": document.page_content,
                "metadata": document.metadata,
            }
            for document in documents
        ],
    }