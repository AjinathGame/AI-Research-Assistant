from app.rag.prompt import build_prompt


hits = [
    {
        "pdf_name": "research.pdf",
        "page": 2,
        "text": "Retrieval Augmented Generation retrieves relevant document chunks before generating an answer.",
        "score": 0.6756,
    },
    {
        "pdf_name": "research.pdf",
        "page": 3,
        "text": "Vector databases store embeddings and help find semantically similar documents.",
        "score": 0.6055,
    },
]


question = "How does RAG retrieve information?"


prompt = build_prompt(
    question=question,
    hits=hits
)


print(prompt)