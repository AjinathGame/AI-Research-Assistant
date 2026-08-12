from typing import List, Dict, Any

from langchain_text_splitters import RecursiveCharacterTextSplitter


_splitter = RecursiveCharacterTextSplitter(
    chunk_size=900,
    chunk_overlap=150,
    separators=["\n\n", "\n", ". ", " ", ""],
)


def chunk_page(page_text: str) -> List[str]:
    if not page_text or not page_text.strip():
        return []

    return _splitter.split_text(page_text)


def chunk_pages(pages: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    chunks = []

    for page in pages:
        page_number = page["page"]
        page_text = page.get("text", "")

        page_chunks = chunk_page(page_text)

        for chunk_index, chunk in enumerate(page_chunks):
            chunks.append({
                "page": page_number,
                "chunk_index": chunk_index,
                "text": chunk,
            })

    return chunks