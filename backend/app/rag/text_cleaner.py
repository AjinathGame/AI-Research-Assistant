import re
from typing import List, Dict, Any


def clean_text(text: str) -> str:
    if not text:
        return ""

    text = text.replace("\r", " ")
    text = re.sub(r"\s+", " ", text)
    text = re.sub(r"([a-zA-Z])-\s+([a-zA-Z])", r"\1\2", text)

    return text.strip()


def clean_pages(pages: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    cleaned_pages = []

    for page in pages:
        cleaned = clean_text(page.get("text", ""))

        if cleaned:
            cleaned_pages.append({
                "page": page["page"],
                "text": cleaned
            })

    return cleaned_pages