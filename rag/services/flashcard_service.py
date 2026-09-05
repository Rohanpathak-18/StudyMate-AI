import json

from services.rag_service import (
    client,
    MODEL_NAME,
)

from vectorstore.faiss_store import (
    search_documents,
)


def parse_json(text: str):
    text = text.strip()

    if text.startswith("```"):
        text = (
            text.replace("```json", "")
            .replace("```", "")
            .strip()
        )

    return json.loads(text)


def generate_flashcards(
    count: int = 10
):
    if client is None:
        raise ValueError(
            "HF_TOKEN is missing from rag/.env"
        )

    documents = search_documents(
        "important concepts definitions formulas facts",
        max(count * 2, 10),
    )

    if not documents:
        raise ValueError(
            "No indexed document found. Upload a document first."
        )

    context = "\n\n".join(
        document.page_content
        for document in documents
    )

    prompt = f"""
Create exactly {count} useful study flashcards.

Return ONLY valid JSON.

Format:

{{
  "title": "Study Flashcards",
  "cards": [
    {{
      "front": "Question or concept",
      "back": "Clear answer"
    }}
  ]
}}

Study material:

{context}
"""

    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {
                "role": "system",
                "content":
                    "You create concise educational flashcards.",
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
        temperature=0.3,
        max_tokens=1800,
    )

    return parse_json(
        response.choices[0].message.content
    )