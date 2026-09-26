from typing import List, Dict, Any
import time

from google import genai

from app.config.settings import (
    GEMINI_API_KEY,
    GEMINI_MODEL,
)

from app.rag.prompt import build_prompt


client = genai.Client(
    api_key=GEMINI_API_KEY
)


MAX_RETRIES = 3


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

    prompt_time = (
        time.perf_counter() - prompt_start
    )

    print(
        f"RAG_PROMPT_BUILD: {prompt_time:.3f}s",
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

    for attempt in range(1, MAX_RETRIES + 1):

        try:

            gemini_start = time.perf_counter()

            interaction = client.interactions.create(
                model=GEMINI_MODEL,
                input=prompt,
                generation_config={
        "thinking_level": "low"
    }
            )

            gemini_time = (
                time.perf_counter() - gemini_start
            )

            print(
                f"GEMINI_GENERATION: "
                f"{gemini_time:.3f}s "
                f"(attempt {attempt})",
                flush=True
            )

            answer = interaction.output_text

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

            error_text = str(error)

            print(
                f"GEMINI_ERROR: "
                f"attempt {attempt}/{MAX_RETRIES}: "
                f"{error_text}",
                flush=True
            )

            lower_error = error_text.lower()

            if (
                "429" in error_text
                or "quota" in lower_error
                or "resource_exhausted" in lower_error
            ):

                raise RuntimeError(
                    "Gemini API quota has been reached. "
                    "Please try again later."
                ) from error

            if (
                "503" in error_text
                or "unavailable" in lower_error
                or "high demand" in lower_error
            ):

                if attempt < MAX_RETRIES:

                    wait_time = 2 ** attempt

                    print(
                        f"GEMINI_RETRY: "
                        f"waiting {wait_time}s before retry...",
                        flush=True
                    )

                    time.sleep(wait_time)

                    continue

                raise RuntimeError(
                    "Gemini is temporarily unavailable. "
                    "Please try again in a few seconds."
                ) from error

            if (
                "404" in error_text
                or "not_found" in lower_error
            ):

                raise RuntimeError(
                    f"Gemini model '{GEMINI_MODEL}' "
                    "is not available for this API key."
                ) from error

            raise RuntimeError(
                "Failed to generate answer using Gemini."
            ) from error

    raise RuntimeError(
        "Gemini is temporarily unavailable. "
        "Please try again in a few seconds."
    )