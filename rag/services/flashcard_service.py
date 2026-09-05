import json
import re

from services.rag_service import client, MODEL_NAME
from vectorstore.faiss_store import search_documents


def parse_json(text: str):
    text = text.strip()

    text = re.sub(
        r"^```(?:json)?\s*",
        "",
        text,
        flags=re.IGNORECASE,
    )

    text = re.sub(
        r"\s*```$",
        "",
        text,
        flags=re.IGNORECASE,
    )

    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass

    match = re.search(
        r"\{[\s\S]*\}",
        text
    )

    if not match:
        raise ValueError(
            "AI did not return valid JSON."
        )

    return json.loads(
        match.group(0)
    )


def generate_flashcards(count: int = 10):

    if client is None:
        raise ValueError(
            "HF_TOKEN is missing from rag/.env"
        )

    count = max(
        5,
        min(int(count), 15)
    )

    documents = search_documents(
        "important concepts definitions formulas facts key points",
        10
    )

    if not documents:
        raise ValueError(
            "No indexed document found."
        )

    context = "\n\n".join(
        document.page_content
        for document in documents
    )

    prompt = f"""
Create exactly {count} useful study flashcards
from the following study material.

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

STUDY MATERIAL:

{context}
"""

    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {
                "role": "system",
                "content": (
                    "You create concise and accurate "
                    "educational flashcards. "
                    "Return JSON only."
                ),
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
        temperature=0.2,
        max_tokens=1800,
    )

    content = response.choices[0].message.content

    if not content:
        raise ValueError(
            "AI returned an empty flashcard response."
        )

    return parse_json(content)