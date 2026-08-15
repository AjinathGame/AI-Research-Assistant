from typing import Dict, Any

from app.rag.rag_engine import ask_question as run_rag


def ask_question(
    question: str,
    user_id: str,
    technology: str = "all",
) -> Dict[str, Any]:

    return run_rag(
        question=question,
        user_id=user_id,
        technology=technology,
        top_k=5,
    )