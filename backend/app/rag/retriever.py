from typing import List, Dict, Any, Optional

from app.rag.vector_store import search_chunks


def retrieve(
    query: str,
    user_id: str,
    technology: Optional[str] = None,
    top_k: int = 5,
) -> List[Dict[str, Any]]:

    if not query or not query.strip():
        return []

    if not user_id or not user_id.strip():
        return []

    if top_k <= 0:
        return []

    results = search_chunks(
        query=query,
        user_id=user_id,
        technology=technology,
        top_k=top_k,
    )

    return results