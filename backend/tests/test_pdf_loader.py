from app.rag.pdf_loader import extract_pages

PDF_PATH = "storage/uploads/test.pdf"

pages = extract_pages(PDF_PATH)

print(f"Total pages: {len(pages)}")

for page in pages:
    print(f"\nPage: {page['page']}")
    print(page["text"][:500])