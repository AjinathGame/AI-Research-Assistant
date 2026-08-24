from typing import Dict, Any, List, Optional

from app.rag.pdf_loader import extract_pages
from app.rag.text_cleaner import clean_pages
from app.rag.chunker import chunk_pages
from app.rag.vector_store import add_chunks
from app.rag.retriever import retrieve
from app.rag.llm import generate_answer


def index_pdf(
    file_path: str,
    pdf_id: str,
    user_id: str,
    filename: str,
    technology_id: str,
    folder_id: str,
) -> Dict[str, Any]:

    if not file_path:
        raise ValueError("PDF file path is required")

    if not pdf_id:
        raise ValueError("PDF ID is required")

    if not user_id:
        raise ValueError("User ID is required")

    if not filename:
        raise ValueError("Filename is required")

    if not technology_id:
        raise ValueError("Technology ID is required")

    if not folder_id:
        raise ValueError("Folder ID is required")

    pages = extract_pages(file_path)

    if not pages:
        raise ValueError(
            "No readable text found in PDF"
        )

    cleaned_pages = clean_pages(pages)

    if not cleaned_pages:
        raise ValueError(
            "No usable text found after cleaning"
        )

    chunks = chunk_pages(cleaned_pages)

    if not chunks:
        raise ValueError(
            "No chunks generated from PDF"
        )

    chunks_for_store = []

    for chunk in chunks:
        chunks_for_store.append({
            "pdf_id": pdf_id,
            "user_id": user_id,
            "filename": filename,
            "technology_id": technology_id,
            "folder_id": folder_id,
            "page": chunk["page"],
            "chunk_index": chunk["chunk_index"],
            "text": chunk["text"],
        })

    stored_count = add_chunks(
        chunks_for_store
    )

    return {
        "status": "completed",
        "pdf_id": pdf_id,
        "filename": filename,
        "technology_id": technology_id,
        "folder_id": folder_id,
        "pages": len(cleaned_pages),
        "chunks": len(chunks),
        "stored_chunks": stored_count,
    }


def ask_question(
    question: str,
    user_id: str,
    technology_id: Optional[str] = None,
    folder_id: Optional[str] = None,
    top_k: int = 5,
) -> Dict[str, Any]:

    if not question or not question.strip():
        raise ValueError(
            "Question cannot be empty"
        )

    if not user_id or not user_id.strip():
        raise ValueError(
            "User ID is required"
        )

    hits = retrieve(
        query=question,
        user_id=user_id,
        technology_id=technology_id,
        folder_id=folder_id,
        top_k=top_k,
    )

    if not hits:
        return {
            "answer": (
                "The answer is not available "
                "in the selected folder."
            ),
            "sources": [],
        }

    answer = generate_answer(
        question=question,
        hits=hits,
    )

    sources = []

    for hit in hits:
        sources.append({
            "pdf_id": hit.get("pdf_id"),
            "pdf_name": hit.get("pdf_name"),
            "page": hit.get("page"),
            "technology_id": hit.get("technology_id"),
            "folder_id": hit.get("folder_id"),
            "score": hit.get("score"),
        })

    return {
        "answer": answer,
        "sources": sources,
    }