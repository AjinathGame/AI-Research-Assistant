from typing import List, Dict, Any
from pathlib import Path

import fitz


def extract_pages(file_path: str) -> List[Dict[str, Any]]:
    pdf_path = Path(file_path)

    if not pdf_path.exists():
        raise FileNotFoundError(f"PDF file not found: {file_path}")

    if pdf_path.suffix.lower() != ".pdf":
        raise ValueError("The provided file is not a PDF")

    pages = []

    with fitz.open(file_path) as document:
        for page_number, page in enumerate(document, start=1):
            text = page.get_text("text") or ""

            if text.strip():
                pages.append({
                    "page": page_number,
                    "text": text.strip()
                })

    return pages