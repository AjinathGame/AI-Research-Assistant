from app.rag.llm import generate_answer


hits = [
    {
        "pdf_name": "Machine_Learning.pdf",
        "page": 12,
        "text": (
            "Supervised learning is a machine learning approach "
            "where a model learns from labelled training data."
        )
    },
    {
        "pdf_name": "Machine_Learning.pdf",
        "page": 15,
        "text": (
            "Classification is a supervised learning task used "
            "to predict discrete class labels."
        )
    }
]


question = "What is supervised learning?"


answer = generate_answer(
    question=question,
    hits=hits
)


print("\n==============================")
print("QUESTION")
print("==============================")
print(question)

print("\n==============================")
print("ANSWER")
print("==============================")
print(answer)