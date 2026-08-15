from typing import List, Dict, Any


def build_prompt(
    question: str,
    hits: List[Dict[str, Any]]
) -> str:

    if not question or not question.strip():
        raise ValueError("Question cannot be empty")

    if not hits:
        return (
            "No relevant information was found in the uploaded documents."
        )

    context_blocks = []

    for i, hit in enumerate(hits, start=1):

        pdf_name = hit.get("pdf_name") or "Unknown PDF"
        page = hit.get("page") or "Unknown"
        text = hit.get("text") or ""

        context_blocks.append(
            f"""
SOURCE {i}
PDF: {pdf_name}
PAGE: {page}

CONTENT:
{text}
"""
        )

    context = "\n\n-------------------------\n\n".join(context_blocks)

    prompt = f"""
You are an intelligent AI research assistant working inside a
document-based Retrieval-Augmented Generation (RAG) system.

Your task is to answer the user's question using the retrieved
information from the uploaded research documents.

IMPORTANT INSTRUCTIONS:

1. Do NOT copy sentences directly from the source documents.

2. Understand the retrieved information first and generate a
   NEW answer in your own words.

3. Combine information from multiple retrieved sources when
   appropriate.

4. You may explain, compare, summarize, organize, and logically
   connect the information found in the sources.

5. You may provide examples only when they are supported by the
   retrieved context or are simple illustrative examples that
   do not introduce new factual claims.

6. Do NOT use external knowledge, internet knowledge, or information
   that is not supported by the retrieved documents.

7. Do NOT invent facts, statistics, research results, names,
   dates, or technical claims.

8. If the retrieved documents do not contain enough information
   to answer the question, clearly say:
   "The uploaded documents do not contain enough information
   to answer this question."

9. Do not mention "context", "retrieved chunks", "vector database",
   "embeddings", or internal RAG processing in the final answer.

10. Write the answer naturally as if you already understood the
    research material.

11. For detailed questions, structure the answer using:
    - Short introduction
    - Main points
    - Examples where supported
    - Short conclusion

12. Cite the relevant source after each important claim using:
    [Source 1], [Source 2], etc.

13. The answer should be a synthesized explanation, NOT a
    copy-paste or paragraph-by-paragraph summary.

========================
RETRIEVED RESEARCH DATA
========================

{context}

========================
USER QUESTION
========================

{question}

========================
GENERATE THE ANSWER
========================
"""

    return prompt