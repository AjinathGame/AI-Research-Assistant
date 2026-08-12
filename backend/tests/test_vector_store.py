from app.rag.vector_store import (
    add_chunks,
    search_chunks,
    get_pdf_chunks,
    delete_pdf,
)


test_chunks = [
    {
        "pdf_id": "test-pdf-001",
        "user_id": "user-001",
        "filename": "research.pdf",
        "technology": "AI",
        "page": 1,
        "chunk_index": 0,
        "text": "Artificial Intelligence allows computers to perform tasks that normally require human intelligence.",
    },
    {
        "pdf_id": "test-pdf-001",
        "user_id": "user-001",
        "filename": "research.pdf",
        "technology": "AI",
        "page": 2,
        "chunk_index": 0,
        "text": "Retrieval Augmented Generation retrieves relevant document chunks before generating an answer.",
    },
    {
        "pdf_id": "test-pdf-001",
        "user_id": "user-001",
        "filename": "research.pdf",
        "technology": "AI",
        "page": 3,
        "chunk_index": 0,
        "text": "Vector databases store embeddings and help find semantically similar documents.",
    },
]


print("Adding chunks...")

count = add_chunks(test_chunks)

print(f"Chunks added: {count}")


print("\nGetting PDF chunks...")

stored_chunks = get_pdf_chunks("test-pdf-001")

print(f"Stored chunks: {len(stored_chunks)}")


print("\nSearching...")

results = search_chunks(
    query="How does RAG retrieve information?",
    user_id="user-001",
    technology="AI",
    top_k=3,
)


print(f"Results found: {len(results)}")


for result in results:
    print("\n-----------------------------")
    print(f"Page: {result['page']}")
    print(f"Score: {result['score']}")
    print(f"Text: {result['text']}")


print("\nDeleting test PDF...")

deleted = delete_pdf("test-pdf-001")

print(f"Chunks deleted: {deleted}")