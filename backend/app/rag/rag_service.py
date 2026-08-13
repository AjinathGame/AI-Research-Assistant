from typing import Dict, Any, Optional

from app.rag.retriever import retrieve
from app.rag.llm import generate_answer


def ask_question(
    question: str,
    user_id: str,
    technology: Optional[str] = None,
    top_k: int = 5,
) -> Dict[str, Any]:

    if not question or not question.strip():
        raise ValueError("Question cannot be empty")

    if not user_id or not user_id.strip():
        raise ValueError("User ID is required")

    hits = retrieve(
        query=question,
        user_id=user_id,
        technology=technology,
        top_k=top_k,
    )

    if not hits:

        return {
            "answer": (
                "The answer is not available "
                "in the uploaded documents."
            ),
            "sources": [],
        }

    answer = generate_answer(
        question=question,
        hits=hits,
    )

    sources = []

    seen = set()

    for hit in hits:

        pdf_name = hit.get("pdf_name")
        page = hit.get("page")

        key = (
            pdf_name,
            page
        )

        if key in seen:
            continue

        seen.add(key)

        sources.append({
            "pdf_name": pdf_name,
            "page": page,
            "score": hit.get("score"),
        })

    return {
        "answer": answer,
        "sources": sources,
    }