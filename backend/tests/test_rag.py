from app.rag.rag_service import ask_question


question = "why data science is important explain in details with an examples?"

user_id = "YOUR_USER_ID"


result = ask_question(
    question=question,
    user_id=user_id,
    technology="Data Science",
    top_k=5,
)


print("\n==============================")
print("QUESTION")
print("==============================")

print(question)


print("\n==============================")
print("ANSWER")
print("==============================")

print(result["answer"])


print("\n==============================")
print("SOURCES")
print("==============================")

for source in result["sources"]:

    print(
        f"PDF: {source['pdf_name']} | "
        f"Page: {source['page']} | "
        f"Score: {source['score']}"
    )