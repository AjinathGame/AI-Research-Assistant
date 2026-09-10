import { useEffect, useState } from "react";
import {
  MessageCircle,
  Trash2,
  Loader2,
  Clock,
} from "lucide-react";

import API_BASE_URL from "../../api/api";
import ConfirmModal from "../common/ConfirmModal";

export default function RecentQuestions({
  onQuestionSelect,
}) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const [confirmModal, setConfirmModal] =
    useState(false);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error(
        "Authentication token not found"
      );
    }

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  useEffect(() => {
    loadChatHistory();
  }, []);

  const loadChatHistory = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/chat/history`,
        {
          method: "GET",
          headers: getAuthHeaders(),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch chat history"
        );
      }

      setQuestions(data.data || []);
    } catch (error) {
      console.error(
        "Chat History Error:",
        error
      );

      setError(
        error.message ||
          "Failed to load chat history"
      );
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = () => {
    setError("");
    setConfirmModal(true);
  };

  const closeDeleteModal = () => {
    if (deleting) return;

    setConfirmModal(false);
  };

  const deleteHistory = async () => {
    try {
      setDeleting(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/chat/history`,
        {
          method: "DELETE",
          headers: getAuthHeaders(),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete chat history"
        );
      }

      setQuestions([]);
      setConfirmModal(false);
    } catch (error) {
      console.error(
        "Delete Chat History Error:",
        error
      );

      setError(
        error.message ||
          "Failed to delete chat history"
      );

      setConfirmModal(false);
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "";

    const currentDate = new Date();
    const questionDate = new Date(date);

    const difference =
      currentDate - questionDate;

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
      return `${days} day${
        days > 1 ? "s" : ""
      } ago`;
    }

    return questionDate.toLocaleDateString();
  };

  return (
    <>
      <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                <MessageCircle
                  size={20}
                  className="text-blue-600"
                />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Recent Questions
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Your previous questions
                </p>
              </div>
            </div>

            {questions.length > 0 && (
              <button
                type="button"
                onClick={openDeleteModal}
                disabled={deleting}
                className="flex cursor-pointer items-center gap-1.5 text-xs text-red-500 transition hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
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
                Your recent questions will
                appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {questions.map((item) => (
                <button
                  key={item._id}
                  type="button"
                  onClick={() => {
                    console.log(
                      "CLICKED QUESTION:",
                      item
                    );

                    if (onQuestionSelect) {
                      onQuestionSelect(item);
                    }
                  }}
                  className="w-full cursor-pointer rounded-2xl border border-gray-200 p-4 text-left transition hover:border-blue-300 hover:bg-blue-50/40"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50">
                      <MessageCircle
                        size={16}
                        className="text-blue-600"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-3 text-sm font-medium text-slate-900">
                        {item.question}
                      </p>

                      <div className="mt-2 flex items-center gap-2">
                        <Clock
                          size={13}
                          className="text-gray-400"
                        />

                        <span className="text-xs text-gray-400">
                          {formatDate(
                            item.createdAt
                          )}
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

      <ConfirmModal
        isOpen={confirmModal}
        onClose={closeDeleteModal}
        onConfirm={deleteHistory}
        title="Clear Chat History"
        message="Are you sure you want to delete all your chat history? This action cannot be undone."
        confirmText="Clear History"
        cancelText="Cancel"
        type="danger"
        loading={deleting}
      />
    </>
  );
}