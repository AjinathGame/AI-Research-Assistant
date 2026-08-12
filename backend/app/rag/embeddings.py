from typing import List

from fastembed import TextEmbedding


MODEL_NAME = "BAAI/bge-small-en-v1.5"


_embedding_model = TextEmbedding(
    model_name=MODEL_NAME
)


def embed_texts(texts: List[str]) -> List[List[float]]:
    if not texts:
        return []

    embeddings = _embedding_model.embed(texts)

    return [embedding.tolist() for embedding in embeddings]


def embed_query(query: str) -> List[float]:
    if not query or not query.strip():
        return []

    embedding = _embedding_model.embed([query])

    return next(embedding).tolist()