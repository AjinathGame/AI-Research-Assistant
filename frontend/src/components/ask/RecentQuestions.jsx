import { useEffect, useState } from "react";
import {
  MessageCircle,
  Trash2,
  Loader2,
  Clock,
} from "lucide-react";

import API_BASE_URL from "../../api/api";

export default function RecentQuestions({
  onQuestionSelect,
}) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadChatHistory();
  }, []);

  const loadChatHistory = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/chat/history`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch chat history"
        );
      }

      setQuestions(data.data || []);
    } catch (error) {
      console.error("Chat History Error:", error);

      setError(
        error.message || "Failed to load chat history"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteHistory = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all chat history?"
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/chat/history`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete chat history"
        );
      }

      setQuestions([]);
    } catch (error) {
      console.error(
        "Delete Chat History Error:",
        error
      );

      setError(
        error.message || "Failed to delete chat history"
      );
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "";

    const currentDate = new Date();
    const questionDate = new Date(date);

    const difference = currentDate - questionDate;

    const minutes = Math.floor(
      difference / (1000 * 60)
    );

    const hours = Math.floor(
      difference / (1000 * 60 * 60)
    );

    const days = Math.floor(
      difference / (1000 * 60 * 60 * 24)
    );

    if (minutes < 1) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes} min ago`;
    }

    if (hours < 24) {
      return `${hours} hr ago`;
    }

    if (days < 7) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }

    return questionDate.toLocaleDateString();
  };

  return (
    <section className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">

      <div className="p-5 border-b border-gray-100">

        <div className="flex items-center justify-between gap-3">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <MessageCircle
                size={20}
                className="text-blue-600"
              />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Recent Questions
              </h2>

              <p className="text-xs text-gray-500 mt-1">
                Your previous questions
              </p>
            </div>

          </div>

          {questions.length > 0 && (
            <button
              onClick={deleteHistory}
              disabled={deleting}
              className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 cursor-pointer disabled:opacity-50"
              title="Clear chat history"
            >
              {deleting ? (
                <Loader2
                  size={15}
                  className="animate-spin"
                />
              ) : (
                <Trash2 size={15} />
              )}

              Clear
            </button>
          )}

        </div>

      </div>

      <div className="max-h-[520px] overflow-y-auto p-4">

        {loading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2
              size={25}
              className="animate-spin text-blue-600"
            />
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : questions.length === 0 ? (
          <div className="py-10 text-center">

            <MessageCircle
              size={38}
              className="mx-auto text-gray-300"
            />

            <h3 className="mt-3 font-semibold text-gray-700">
              No questions yet
            </h3>

            <p className="mt-1 text-sm text-gray-400">
              Your recent questions will appear here.
            </p>

          </div>
        ) : (
          <div className="space-y-3">

            {questions.map((item) => (
              <button
                key={item._id}
                type="button"
                onClick={() => {
                  console.log("CLICKED QUESTION:", item);

                  if (onQuestionSelect) {
                    onQuestionSelect(item);
                  }
                }}
                className="w-full text-left rounded-2xl border border-gray-200 p-4 hover:border-blue-300 hover:bg-blue-50/40 transition cursor-pointer"
              >

                <div className="flex items-start gap-3">

                  <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-blue-50 flex items-center justify-center">
                    <MessageCircle
                      size={16}
                      className="text-blue-600"
                    />
                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="text-sm font-medium text-slate-900 line-clamp-3">
                      {item.question}
                    </p>

                    <div className="flex items-center gap-2 mt-2">

                      <Clock
                        size={13}
                        className="text-gray-400"
                      />

                      <span className="text-xs text-gray-400">
                        {formatDate(item.createdAt)}
                      </span>

                    </div>

                  </div>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

    </section>
  );
}