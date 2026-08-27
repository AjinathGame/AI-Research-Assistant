from app.rag.embeddings import embed_texts, embed_query


texts = [
    "Machine learning is a subset of artificial intelligence.",
    "Retrieval augmented generation retrieves relevant documents before generating an answer."
]


embeddings = embed_texts(texts)

print(f"Number of embeddings: {len(embeddings)}")
print(f"Embedding dimension: {len(embeddings[0])}")
print(f"First embedding values: {embeddings[0][:5]}")


query_embedding = embed_query(
    "What is retrieval augmented generation?"
)

print(f"Query embedding dimension: {len(query_embedding)}")
print(f"Query embedding values: {query_embedding[:5]}")