from typing import List, Dict, Any

from google import genai

from app.config.settings import (
    GEMINI_API_KEY,
    GEMINI_MODEL,
)

from app.rag.prompt import build_prompt


client = genai.Client(
    api_key=GEMINI_API_KEY
)


def generate_answer(
    question: str,
    hits: List[Dict[str, Any]]
) -> str:

    if not question or not question.strip():
        raise ValueError("Question cannot be empty")

    if not hits:
        return "The answer is not available in the uploaded documents."

    prompt = build_prompt(
        question=question,
        hits=hits
    )

    try:

        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt
        )

        if not response.text:
            return "No answer was generated."

        return response.text.strip()

    except Exception as error:

        print("Gemini API Error:", error)

        raise RuntimeError(
            "Failed to generate answer using Gemini"
        ) from error