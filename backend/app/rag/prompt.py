from typing import List, Dict, Any


def build_prompt(
    question: str,
    hits: List[Dict[str, Any]]
) -> str:

    if not question or not question.strip():
        raise ValueError("Question cannot be empty")

    if not hits:
        return ""

    context_blocks = []

    for i, hit in enumerate(hits, start=1):

        pdf_name = hit.get("pdf_name") or "Unknown PDF"
        page = hit.get("page") or "Unknown"
        text = hit.get("text") or ""

        if not text.strip():
            continue

        context_blocks.append(
            f"PDF Source {i}\n"
            f"PDF: {pdf_name}\n"
            f"Page: {page}\n"
            f"Content:\n{text}"
        )

    if not context_blocks:
        return ""

    pdf_context = "\n\n---\n\n".join(context_blocks)

    prompt = f"""
You are an AI research assistant that answers questions
strictly from the user's uploaded PDF documents.

USER QUESTION:
{question}

UPLOADED PDF SOURCES:
{pdf_context}

STRICT RULES:

1. Answer ONLY using information explicitly present
   in the uploaded PDF sources above.

2. Do NOT use your own general knowledge.

3. Do NOT assume information that is not present
   in the PDF sources.

4. Do NOT infer an answer merely because the question
   is related to the general topic of the PDF.

5. If the PDF sources do not contain enough information
   to answer the question, respond EXACTLY with:

"The uploaded documents do not contain enough information
to answer this question."

6. Do not provide a partial answer from general knowledge
   when the required information is missing from the PDFs.

7. Synthesize information from the relevant PDF sources
   in your own words.

8. Do not copy long sentences directly from the sources.

9. Every important factual claim must be supported by
   one or more PDF sources.

10. Use citations in this format:

[PDF Source 1]
[PDF Source 2]

11. Do not create fake citations.

12. Do not mention embeddings, vector databases,
    retrieval, chunks, prompts, RAG, or internal processing.

13. Keep the answer directly related to the user's question.

14. For detailed questions, use headings, bullet points,
    examples, or step-by-step explanations when supported
    by the PDF sources.

15. If the question asks for information that is not
    available in the uploaded PDFs, use the exact
    insufficient-information response given above.

GENERATE THE ANSWER:
"""

    return prompt