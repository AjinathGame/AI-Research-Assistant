import os
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

    documents = []
    ids = []
    metadatas = []

    for chunk in chunks:
        documents.append(chunk["text"])

        ids.append(
            f"{chunk['pdf_id']}::p{chunk['page']}::c{chunk['chunk_index']}"
        )

        metadatas.append({
            "pdf_id": chunk["pdf_id"],
            "user_id": chunk["user_id"],
            "filename": chunk["filename"],
            "technology": chunk["technology"],
            "page": chunk["page"],
        })

    embeddings = embed_texts(documents)

    batch_size = 128

    for i in range(0, len(documents), batch_size):
        _collection.add(
            ids=ids[i:i + batch_size],
            documents=documents[i:i + batch_size],
            embeddings=embeddings[i:i + batch_size],
            metadatas=metadatas[i:i + batch_size],
        )

    return len(documents)


def delete_pdf(pdf_id: str) -> int:
    existing = _collection.get(
        where={"pdf_id": pdf_id}
    )

    ids = existing.get("ids", []) if existing else []

    if ids:
        _collection.delete(ids=ids)

    return len(ids)


def get_pdf_chunks(pdf_id: str) -> List[Dict[str, Any]]:
    result = _collection.get(
        where={"pdf_id": pdf_id}
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
            "text": documents[i] if i < len(documents) else "",
            "metadata": metadatas[i] if i < len(metadatas) else {},
        })

    return chunks


def search_chunks(
    query: str,
    user_id: str,
    technology: Optional[str] = None,
    top_k: int = 5,
) -> List[Dict[str, Any]]:

    if not query or not query.strip():
        return []

    query_embedding = embed_query(query)

    where = {
        "user_id": user_id
    }

    if technology and technology.lower() != "all":
        where = {
            "$and": [
                {"user_id": user_id},
                {"technology": technology},
            ]
        }

    result = _collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k,
        where=where,
        include=[
            "documents",
            "metadatas",
            "distances",
        ],
    )

    if not result or not result.get("ids"):
        return []

    ids = result["ids"][0]

    if not ids:
        return []

    documents = result.get("documents", [[]])[0]
    metadatas = result.get("metadatas", [[]])[0]
    distances = result.get("distances", [[]])[0]

    results = []

    for i, chunk_id in enumerate(ids):

        distance = (
            float(distances[i])
            if i < len(distances)
            else 0.0
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

        results.append({
            "id": chunk_id,
            "text": documents[i] if i < len(documents) else "",
            "pdf_id": metadata.get("pdf_id"),
            "pdf_name": metadata.get("filename"),
            "page": metadata.get("page"),
            "technology": metadata.get("technology"),
            "score": round(similarity, 4),
        })

    return results