from app.rag.vector_store import add_chunks, delete_pdf
from app.rag.retriever import retrieve


pdf_id = "retriever-test-001"

chunks = [
    {
        "pdf_id": pdf_id,
        "user_id": "user-001",
        "filename": "ai_notes.pdf",
        "technology": "AI",
        "page": 1,
        "chunk_index": 0,
        "text": "Artificial Intelligence enables computers to perform tasks that normally require human intelligence.",
    },
    {
        "pdf_id": pdf_id,
        "user_id": "user-001",
        "filename": "ai_notes.pdf",
        "technology": "AI",
        "page": 2,
        "chunk_index": 0,
        "text": "Retrieval Augmented Generation retrieves relevant document chunks before generating an answer.",
    },
    {
        "pdf_id": pdf_id,
        "user_id": "user-001",
        "filename": "ai_notes.pdf",
        "technology": "AI",
        "page": 3,
        "chunk_index": 0,
        "text": "Vector databases store embeddings and perform semantic similarity search.",
    },
]


print("Adding test chunks...")

added = add_chunks(chunks)

print(f"Chunks added: {added}")


print("\nRetrieving relevant chunks...")

results = retrieve(
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
    print(f"PDF: {result['pdf_name']}")
    print(f"Technology: {result['technology']}")
    print(f"Text: {result['text']}")


print("\nDeleting test data...")

deleted = delete_pdf(pdf_id)

print(f"Chunks deleted: {deleted}")