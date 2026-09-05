from services.rag_service import (
    client,
    MODEL_NAME,
)


def generate_summary(text, max_tokens=700):
    if not text or not text.strip():
        return {
            "success": False,
            "summary": "No content available to summarize.",
        }

    prompt = f"""
You are StudyMate AI.

Create a clear study-friendly summary
of the following material.

Rules:
- Keep the important concepts.
- Use simple language.
- Organize the summary with headings
  when useful.
- Do not invent information.
- Focus only on the provided material.

Material:
{text}

Summary:
"""

    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {
                "role": "system",
                "content": (
                    "You are an educational "
                    "summarization assistant."
                ),
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
        max_tokens=max_tokens,
        temperature=0.2,
    )

    summary = (
        response.choices[0]
        .message
        .content
        .strip()
    )

    return {
        "success": True,
        "summary": summary,
    }