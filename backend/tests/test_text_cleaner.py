from app.rag.pdf_loader import extract_pages
from app.rag.text_cleaner import clean_pages


pdf_path = "storage/uploads/test.pdf"

pages = extract_pages(pdf_path)
cleaned_pages = clean_pages(pages)

for page in cleaned_pages:
    print(f"\nPage {page['page']}")
    print(page["text"][:500])