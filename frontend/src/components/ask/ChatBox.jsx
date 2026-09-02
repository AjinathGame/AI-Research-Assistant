import { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  Send,
  ChevronDown,
  FileText,
  ExternalLink,
  Loader2,
} from "lucide-react";

import API_BASE_URL from "../../api/api";

export default function ChatBox({
  technologyId,
  folderId,
  selectedChat,
  onQuestionAsked,
}) {
  const [model, setModel] = useState("GPT-5.2");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const chatContainerRef = useRef(null);

  useEffect(() => {
  if (!selectedChat) return;

  console.log("ChatBox Selected Chat:", selectedChat);

  const restoredMessage = {
    id: selectedChat._id || Date.now().toString(),

    question: selectedChat.question || "",

    answer: selectedChat.answer || "",

    sources: selectedChat.sources || [],

    loading: false,

    error: "",

    technologyId:
      selectedChat.technologyId?._id ||
      selectedChat.technologyId ||
      "",

    folderId:
      selectedChat.folderId?._id ||
      selectedChat.folderId ||
      "",

    createdAt: selectedChat.createdAt,
  };

  setMessages([restoredMessage]);

  setQuestion("");

  setError("");
}, [selectedChat]);

  useEffect(() => {
  console.log("CHATBOX RECEIVED:", selectedChat);

  if (!selectedChat) return;

  const restoredMessage = {
    id: selectedChat._id || Date.now().toString(),
    question: selectedChat.question || "",
    answer: selectedChat.answer || "",
    sources: selectedChat.sources || [],
    loading: false,
    error: "",
    technologyId:
      selectedChat.technologyId?._id ||
      selectedChat.technologyId ||
      "",
    folderId:
      selectedChat.folderId?._id ||
      selectedChat.folderId ||
      "",
    createdAt: selectedChat.createdAt,
  };

  setMessages([restoredMessage]);
  setQuestion("");
  setError("");
}, [selectedChat]);

  const handleAsk = async () => {
    const currentQuestion = question.trim();

    if (!currentQuestion) return;

    if (!technologyId) {
      setError("Please select a technology.");
      return;
    }

    if (!folderId) {
      setError("Please select a folder.");
      return;
    }

    const messageId = Date.now().toString();

    const newMessage = {
      id: messageId,
      question: currentQuestion,
      answer: "",
      sources: [],
      loading: true,
      error: "",
      technologyId,
      folderId,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);

    setQuestion("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/chat/ask`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: currentQuestion,
            technologyId,
            folderId,
            topK: 5,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to generate answer"
        );
      }

      const generatedAnswer =
        data.data?.answer || "";

      const generatedSources =
        data.data?.sources || [];

      setMessages((prev) =>
        prev.map((message) =>
          message.id === messageId
            ? {
                ...message,
                answer: generatedAnswer,
                sources: generatedSources,
                loading: false,
              }
            : message
        )
      );

      if (onQuestionAsked) {
        onQuestionAsked();
      }
    } catch (error) {
      console.error(
        "Ask Question Error:",
        error
      );

      const errorMessage =
        error.message ||
        "Failed to generate answer";

      setMessages((prev) =>
        prev.map((message) =>
          message.id === messageId
            ? {
                ...message,
                loading: false,
                error: errorMessage,
              }
            : message
        )
      );

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();
      handleAsk();
    }
  };

  const formatAnswer = (text) => {
    if (!text) return null;

    const normalizedText =
      text.replace(/\r\n/g, "\n");

    const lines = normalizedText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    return (
      <div className="space-y-3">
        {lines.map((line, index) => {
          if (line.startsWith("###")) {
            return (
              <h3
                key={index}
                className="text-lg font-bold text-slate-900"
              >
                {line.replace(/^###\s*/, "")}
              </h3>
            );
          }

          if (line.startsWith("##")) {
            return (
              <h3
                key={index}
                className="text-xl font-bold text-slate-900"
              >
                {line.replace(/^##\s*/, "")}
              </h3>
            );
          }

          if (line.startsWith("#")) {
            return (
              <h3
                key={index}
                className="text-xl font-bold text-slate-900"
              >
                {line.replace(/^#\s*/, "")}
              </h3>
            );
          }

          if (
            line.startsWith("- ") ||
            line.startsWith("* ")
          ) {
            return (
              <div
                key={index}
                className="flex gap-2 text-gray-700 leading-7"
              >
                <span className="text-blue-600 font-bold mt-1">
                  •
                </span>

                <span>
                  {line.slice(2)}
                </span>
              </div>
            );
          }

          const numberedMatch =
            line.match(/^(\d+)\.\s+(.*)$/);

          if (numberedMatch) {
            return (
              <div
                key={index}
                className="flex gap-3 text-gray-700 leading-7"
              >
                <span className="font-semibold text-blue-600">
                  {numberedMatch[1]}.
                </span>

                <span>
                  {numberedMatch[2]}
                </span>
              </div>
            );
          }

          return (
            <p
              key={index}
              className="text-gray-700 leading-7"
            >
              {line}
            </p>
          );
        })}
      </div>
    );
  };

  const getSourceFileName = (source) => {
    return (
      source?.filename ||
      source?.fileName ||
      source?.originalName ||
      "PDF Document"
    );
  };

  const getSourcePage = (source) => {
    return (
      source?.page ||
      source?.pageNumber ||
      "N/A"
    );
  };

  const handleViewSource = (source) => {
    if (!source?.filePath) {
      setError(
        "Source PDF path is not available."
      );
      return;
    }

    const fileUrl =
      source.filePath.startsWith("http")
        ? source.filePath
        : `http://localhost:5000/${source.filePath
            .replace(/\\/g, "/")
            .replace(/^\/+/, "")}`;

    window.open(fileUrl, "_blank");
  };

  const renderSources = (sources) => {
    if (
      !sources ||
      sources.length === 0
    ) {
      return null;
    }

    return (
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold text-slate-900">
              Sources
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              Information retrieved from your documents
            </p>
          </div>

          <span className="text-xs text-gray-500">
            {sources.length}{" "}
            {sources.length === 1
              ? "source"
              : "sources"}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {sources.map((source, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white p-3 hover:border-blue-300 hover:shadow-sm transition"
            >
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-red-50 flex items-center justify-center">
                  <FileText
                    size={17}
                    className="text-red-500"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h4
                    className="text-xs font-semibold text-slate-900 truncate"
                    title={getSourceFileName(source)}
                  >
                    {getSourceFileName(source)}
                  </h4>

                  <p className="text-xs text-gray-500 mt-1">
                    Page {getSourcePage(source)}
                  </p>
                </div>

                {source.filePath && (
                  <button
                    onClick={() =>
                      handleViewSource(source)
                    }
                    className="flex-shrink-0 text-gray-400 hover:text-blue-600 cursor-pointer"
                    title="View PDF"
                  >
                    <ExternalLink size={15} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div
        ref={chatContainerRef}
        className="h-[620px] overflow-y-auto px-5 sm:px-7 py-6"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
              <Sparkles
                className="text-blue-600"
                size={42}
              />
            </div>

            <h2 className="mt-8 text-2xl sm:text-3xl font-bold text-slate-900">
              Ask anything about your notes
            </h2>

            <p className="mt-4 max-w-xl text-gray-500 leading-7">
              Try:
              <span className="font-mono ml-2 text-slate-700">
                "Explain the CAP theorem with an example."
              </span>
            </p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className="mb-10"
              >
                <div className="flex justify-end mb-5">
                  <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-blue-600 px-5 py-3 text-white shadow-sm">
                    <p className="text-xs font-medium mb-1 opacity-80">
                      You
                    </p>

                    <p className="text-[15px] leading-6">
                      {message.question}
                    </p>
                  </div>
                </div>

                {message.loading ? (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-3 rounded-2xl bg-gray-100 px-5 py-3">
                      <Loader2
                        size={20}
                        className="animate-spin text-blue-600"
                      />

                      <span className="text-gray-600">
                        Generating answer...
                      </span>
                    </div>
                  </div>
                ) : message.error ? (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-600">
                    {message.error}
                  </div>
                ) : (
                  <div className="flex justify-start">
                    <div className="w-full max-w-[95%]">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                          <Sparkles
                            size={17}
                            className="text-blue-600"
                          />
                        </div>

                        <span className="font-semibold text-slate-900">
                          AI Search Assistant
                        </span>
                      </div>

                      <div className="rounded-2xl rounded-tl-md bg-slate-50 border border-gray-200 px-5 py-5">
                        <div className="text-[15px]">
                          {formatAnswer(
                            message.answer
                          )}
                        </div>
                      </div>

                      {renderSources(
                        message.sources
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>

      <div className="border-t bg-white p-5">
       

        <div className="mt-4 flex gap-3">
          <input
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            onKeyDown={handleKeyDown}
            disabled={loading}
            placeholder="Ask a question about your notes..."
            className="flex-1 rounded-xl border border-gray-300 px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />

          <button
            onClick={handleAsk}
            disabled={
              loading ||
              !question.trim()
            }
            className="w-16 rounded-xl cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white flex items-center justify-center transition"
          >
            {loading ? (
              <Loader2
                size={22}
                className="animate-spin"
              />
            ) : (
              <Send size={22} />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}