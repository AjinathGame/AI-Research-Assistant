from app.rag.pdf_loader import extract_pages
from app.rag.text_cleaner import clean_pages
from app.rag.chunker import chunk_pages


pdf_path = "storage/uploads/test.pdf"

pages = extract_pages(pdf_path)
cleaned_pages = clean_pages(pages)
chunks = chunk_pages(cleaned_pages)

print(f"Total pages: {len(cleaned_pages)}")
print(f"Total chunks: {len(chunks)}")

for chunk in chunks[:10]:
    print(f"\nPage: {chunk['page']}")
    print(f"Chunk: {chunk['chunk_index']}")
    print(chunk["text"])