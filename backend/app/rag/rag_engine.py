from typing import Dict, Any, List, Optional
import time

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

    total_start = time.perf_counter()

    start = time.perf_counter()

    pages = extract_pages(file_path)

   

    if not pages:
        raise ValueError("No readable text found in PDF")

    start = time.perf_counter()

    cleaned_pages = clean_pages(pages)



    if not cleaned_pages:
        raise ValueError(
            "No usable text found after cleaning"
        )

    start = time.perf_counter()

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

    start = time.perf_counter()

    stored_count = add_chunks(
        chunks_for_store
    )


    total_time = (
        time.perf_counter() - total_start
    )

  
    return {
        "status": "completed",
        "pdf_id": pdf_id,
        "filename": filename,
        "technology_id": technology_id,
        "folder_id": folder_id,
        "pages": len(cleaned_pages),
        "chunks": len(chunks),
        "chunkCount": len(chunks),
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

    total_start = time.perf_counter()

    retrieve_start = time.perf_counter()

    hits = retrieve(
        query=question,
        user_id=user_id,
        technology_id=technology_id,
        folder_id=folder_id,
        top_k=top_k,
    )

    retrieve_time = (
        time.perf_counter() - retrieve_start
    )

    

    sources: List[Dict[str, Any]] = []

    seen_sources = set()

    for hit in hits:

        pdf_id = hit.get("pdf_id")
        page = hit.get("page")

        source_key = (
            str(pdf_id),
            str(page)
        )

        if source_key in seen_sources:
            continue

        seen_sources.add(source_key)

        sources.append({
            "pdf_id": pdf_id,
            "pdf_name": hit.get("pdf_name"),
            "page": page,
            "technology_id": hit.get("technology_id"),
            "folder_id": hit.get("folder_id"),
            "score": hit.get("score"),
        })

    if not hits:

        total_time = (
            time.perf_counter() - total_start
        )

        return {
            "answer": (
                "The uploaded documents do not contain "
                "enough information to answer this question."
            ),
            "sources": [],
            "webSources": [],
        }

    generate_start = time.perf_counter()

    generation_result = generate_answer(
        question=question,
        hits=hits,
    )

    generate_time = (
        time.perf_counter() - generate_start
    )

    
    answer = generation_result.get(
        "answer",
        "No answer was generated."
    )

    web_sources = generation_result.get(
        "webSources",
        []
    )

    total_time = (
        time.perf_counter() - total_start
    )

    return {
        "answer": answer,
        "sources": sources,
        "webSources": web_sources,
    }