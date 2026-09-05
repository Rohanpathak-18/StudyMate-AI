import json

from huggingface_hub import InferenceClient

from services.rag_service import client, MODEL_NAME
from vectorstore.faiss_store import search_documents


def extract_json(text: str):
    text = text.strip()

    if text.startswith("```"):
        text = text.replace(
            "```json",
            ""
        ).replace(
            "```",
            ""
        ).strip()

    return json.loads(text)


def generate_quiz(
    document_id: str,
    count: int = 5,
):
    if client is None:
        raise ValueError(
            "HF_TOKEN is missing."
        )

    documents = search_documents(
        "important concepts definitions facts key ideas",
        document_id,
        min(count * 2, 12),
    )

    if not documents:
        raise ValueError(
            "No document content found."
        )

    context = "\n\n".join(
        document.page_content
        for document in documents
    )

    prompt = f"""
Create exactly {count} multiple choice questions
from the study material below.

Return ONLY valid JSON.

Format:

{{
  "title": "Study Quiz",
  "questions": [
    {{
      "question": "...",
      "options": [
        "...",
        "...",
        "...",
        "..."
      ],
      "answer": 0,
      "explanation": "..."
    }}
  ]
}}

The answer must be the zero-based option index.

STUDY MATERIAL:
{context}
"""

    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {
                "role": "system",
                "content":
                    "You generate accurate educational quizzes."
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
        temperature=0.3,
        max_tokens=1800,
    )

    return extract_json(
        response.choices[0].message.content
    )