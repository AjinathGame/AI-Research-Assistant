from typing import List, Dict, Any
import time

from google import genai
from google.genai import types

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
) -> Dict[str, Any]:

    if not question or not question.strip():
        raise ValueError("Question cannot be empty")

    if not hits:
        return {
            "answer": (
                "The uploaded documents do not contain enough "
                "information to answer this question."
            ),
            "webSources": []
        }

    prompt_start = time.perf_counter()

    prompt = build_prompt(
        question=question,
        hits=hits
    )

    prompt_time = time.perf_counter() - prompt_start

    print(
        f"RAG_PROMPT_BUILD: "
        f"{prompt_time:.3f}s",
        flush=True
    )

    if not prompt.strip():
        return {
            "answer": (
                "The uploaded documents do not contain enough "
                "information to answer this question."
            ),
            "webSources": []
        }

   
    try:

        gemini_start = time.perf_counter()

        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.2
            )
        )

        gemini_time = (
            time.perf_counter() - gemini_start
        )

       
        answer = response.text

        if not answer:
            answer = (
                "The uploaded documents do not contain enough "
                "information to answer this question."
            )

        return {
            "answer": answer.strip(),
            "webSources": []
        }

    except Exception as error:

        

        if "429" in str(error):

            raise RuntimeError(
                "Gemini API quota exceeded. "
                "Please check your Gemini API quota."
            ) from error

        raise RuntimeError(
            "Failed to generate answer using Gemini"
        ) from error