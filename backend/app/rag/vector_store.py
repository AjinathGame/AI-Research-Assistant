import os
import time
from pathlib import Path
from typing import List, Dict, Any, Optional

import chromadb

from app.rag.embeddings import embed_texts, embed_query


CHROMA_DIR = os.environ.get(
    "CHROMA_DIR",
    str(Path(__file__).resolve().parents[2] / "chroma_db")
)

Path(CHROMA_DIR).mkdir(parents=True, exist_ok=True)


_chroma_client = chromadb.PersistentClient(
    path=CHROMA_DIR
)


_collection = _chroma_client.get_or_create_collection(
    name="research_docs",
    metadata={"hnsw:space": "cosine"}
)


def add_chunks(chunks: List[Dict[str, Any]]) -> int:
    if not chunks:
        return 0

    total_start = time.perf_counter()

    documents = []
    ids = []
    metadatas = []

    for chunk in chunks:
        documents.append(chunk["text"])

        ids.append(
            f"{chunk['pdf_id']}::p{chunk['page']}::c{chunk['chunk_index']}"
        )

        metadatas.append({
            "pdf_id": str(chunk["pdf_id"]),
            "user_id": str(chunk["user_id"]),
            "filename": chunk["filename"],
            "technology_id": str(chunk["technology_id"]),
            "folder_id": str(chunk["folder_id"]),
            "page": chunk["page"],
        })

    embedding_start = time.perf_counter()

    embeddings = embed_texts(documents)

    batch_size = 128

    vector_start = time.perf_counter()

    for i in range(0, len(documents), batch_size):
        _collection.add(
            ids=ids[i:i + batch_size],
            documents=documents[i:i + batch_size],
            embeddings=embeddings[i:i + batch_size],
            metadatas=metadatas[i:i + batch_size],
        )

    
    total_time = time.perf_counter() - total_start

 
    return len(documents)


def delete_pdf(pdf_id: str) -> int:
    if not pdf_id:
        return 0

    pdf_id = str(pdf_id).strip()

    if not pdf_id:
        return 0

    try:
        existing = _collection.get(
            where={
                "pdf_id": pdf_id
            },
            include=[]
        )

        ids = existing.get("ids", []) if existing else []

        if not ids:
            return 0

        _collection.delete(
            ids=ids
        )

        return len(ids)

    except Exception as error:
        print(
            f"ChromaDB PDF deletion error: {error}",
            flush=True
        )
        raise


def get_pdf_chunks(pdf_id: str) -> List[Dict[str, Any]]:
    if not pdf_id:
        return []

    pdf_id = str(pdf_id).strip()

    if not pdf_id:
        return []

    result = _collection.get(
        where={
            "pdf_id": pdf_id
        }
    )

    if not result or not result.get("ids"):
        return []

    chunks = []

    ids = result.get("ids", [])
    documents = result.get("documents", [])
    metadatas = result.get("metadatas", [])

    for i, chunk_id in enumerate(ids):
        chunks.append({
            "id": chunk_id,
            "text": (
                documents[i]
                if i < len(documents)
                else ""
            ),
            "metadata": (
                metadatas[i]
                if i < len(metadatas)
                else {}
            ),
        })

    return chunks


def search_chunks(
    query: str,
    user_id: str,
    technology_id: Optional[str] = None,
    folder_id: Optional[str] = None,
    top_k: int = 5,
) -> List[Dict[str, Any]]:

    if not query or not query.strip():
        return []

    if not user_id or not str(user_id).strip():
        return []

    if top_k <= 0:
        return []

    total_start = time.perf_counter()

    user_id = str(user_id).strip()

    embedding_start = time.perf_counter()

    query_embedding = embed_query(query)

    embedding_time = time.perf_counter() - embedding_start

    

    conditions = [
        {
            "user_id": user_id
        }
    ]

    if technology_id and technology_id.lower() != "all":
        conditions.append({
            "technology_id": str(technology_id)
        })

    if folder_id and folder_id.lower() != "all":
        conditions.append({
            "folder_id": str(folder_id)
        })

    if len(conditions) == 1:
        where = conditions[0]
    else:
        where = {
            "$and": conditions
        }

    chroma_start = time.perf_counter()

    candidate_k = max(top_k * 3, top_k)

    result = _collection.query(
        query_embeddings=[query_embedding],
        n_results=candidate_k,
        where=where,
        include=[
            "documents",
            "metadatas",
            "distances",
        ],
    )

    chroma_time = time.perf_counter() - chroma_start

   

    if not result or not result.get("ids"):
        print(
            "RAG_HITS: 0",
            flush=True
        )

        print(
            f"RAG_RELEVANT_HITS: 0",
            flush=True
        )

      
        return []

    ids = result["ids"][0]

    if not ids:
        return []

    documents = result.get(
        "documents",
        [[]]
    )[0]

    metadatas = result.get(
        "metadatas",
        [[]]
    )[0]

    distances = result.get(
        "distances",
        [[]]
    )[0]

    

    min_similarity = float(
        os.environ.get(
            "RAG_MIN_SIMILARITY",
            "0.45"
        )
    )

    filtered_results = []

    for i, chunk_id in enumerate(ids):

        distance = (
            float(distances[i])
            if i < len(distances)
            else 1.0
        )

        similarity = max(
            0.0,
            1.0 - distance
        )

        metadata = (
            metadatas[i]
            if i < len(metadatas)
            else {}
        )

        if similarity < min_similarity:
            continue

        text = (
            documents[i]
            if i < len(documents)
            else ""
        )

        if not text or not text.strip():
            continue

        filtered_results.append({
            "id": chunk_id,
            "text": text,
            "pdf_id": metadata.get("pdf_id"),
            "pdf_name": metadata.get("filename"),
            "page": metadata.get("page"),
            "technology_id": metadata.get("technology_id"),
            "folder_id": metadata.get("folder_id"),
            "score": round(similarity, 4),
        })

    unique_results = []

    seen_pages = set()

    for item in filtered_results:

        page_key = (
            str(item.get("pdf_id")),
            str(item.get("page"))
        )

        if page_key in seen_pages:
            continue

        seen_pages.add(page_key)

        unique_results.append(item)

       

    return unique_results