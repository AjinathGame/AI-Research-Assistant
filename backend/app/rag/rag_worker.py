import sys
import json
import traceback

from app.rag.rag_engine import index_pdf, ask_question
from app.rag.vector_store import delete_pdf


def process_request(request):
    action = request.get("action")

    if action == "index_pdf":
        return index_pdf(
            file_path=request.get("file_path"),
            pdf_id=request.get("pdf_id"),
            user_id=request.get("user_id"),
            filename=request.get("filename"),
            technology_id=request.get("technology_id"),
            folder_id=request.get("folder_id"),
        )

    if action == "ask_question":
        return ask_question(
            question=request.get("question"),
            user_id=request.get("user_id"),
            technology_id=request.get("technology_id"),
            folder_id=request.get("folder_id"),
            top_k=request.get("top_k", 5),
        )

    if action == "delete_pdf":
        deleted_chunks = delete_pdf(
            pdf_id=request.get("pdf_id")
        )

        return {
            "success": True,
            "deletedChunks": deleted_chunks,
        }

    raise ValueError(f"Unknown action: {action}")


def main():
    print("RAG_WORKER_READY", flush=True)

    for line in sys.stdin:
        line = line.strip()

        if not line:
            continue

        request_id = None

        try:
            request = json.loads(line)

            request_id = request.get("requestId")

            result = process_request(request)

            print(
                "RAG_RESULT:"
                + json.dumps(
                    {
                        "requestId": request_id,
                        "result": result,
                    },
                    ensure_ascii=False,
                ),
                flush=True,
            )

        except Exception as error:
            print(
                "RAG_ERROR:"
                + json.dumps(
                    {
                        "requestId": request_id,
                        "message": str(error),
                    },
                    ensure_ascii=False,
                ),
                flush=True,
            )

            traceback.print_exc(file=sys.stderr)
            sys.stderr.flush()


if __name__ == "__main__":
    main()