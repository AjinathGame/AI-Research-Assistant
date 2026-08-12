from typing import List, Dict, Any


def build_prompt(
    question: str,
    hits: List[Dict[str, Any]]
) -> str:

    if not question or not question.strip():
        raise ValueError("Question cannot be empty")

    if not hits:
        return (
            f"Question: {question}\n\n"
            "There are no matching passages in the knowledge base."
        )

    context_blocks = []

    for i, hit in enumerate(hits, start=1):
        pdf_name = hit.get("pdf_name") or "Unknown PDF"
        page = hit.get("page") or "Unknown"
        text = hit.get("text") or ""

        context_blocks.append(
            f"[Source {i}] PDF: {pdf_name} | Page: {page}\n{text}"
        )

    context = "\n\n---\n\n".join(context_blocks)

    prompt = (
        "You are a research assistant. Answer the user's question STRICTLY "
        "using the context passages provided below. "
        "Do not use information that is not present in the context. "
        "If the answer is not available in the context, say you don't have "
        "that information in the uploaded notes. "
        "Always cite sources inline like [Source 1], [Source 2]. "
        "Be concise, factual, and structured.\n\n"
        "=== CONTEXT ===\n"
        f"{context}\n\n"
        "=== QUESTION ===\n"
        f"{question}\n\n"
        "=== ANSWER ==="
    )

    return prompt