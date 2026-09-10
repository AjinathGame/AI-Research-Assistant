import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  MessageCircleQuestion,
  CheckCircle2,
  Clock3,
  Users,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
} from "lucide-react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import ConfirmModal from "../../components/common/ConfirmModal";
import {
  getAllQuestions,
  getQuestionById,
  deleteQuestion,
} from "../../api/adminApi";

const AdminQuestions = () => {
  const [search, setSearch] = useState("");
  const [technology, setTechnology] = useState("All Technologies");
  const [status, setStatus] = useState("All Status");
  const [dateFilter, setDateFilter] = useState("All Time");
  const [currentPage, setCurrentPage] = useState(1);

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [viewingQuestionId, setViewingQuestionId] = useState(null);

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    question: null,
  });

  const [actionLoading, setActionLoading] = useState(false);

  const itemsPerPage = 7;

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllQuestions();

      const questionData = Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response?.data?.questions)
        ? response.data.questions
        : Array.isArray(response?.questions)
        ? response.questions
        : [];

      setQuestions(questionData);
    } catch (err) {
      console.error("Fetch Questions Error:", err);
      setError(err.message || "Failed to fetch questions");
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const getUserName = (item) => {
    if (item?.userId?.name) return item.userId.name;
    if (item?.user?.name) return item.user.name;
    if (item?.userName) return item.userName;
    if (item?.name) return item.name;

    return "Unknown User";
  };

  const getUserEmail = (item) => {
    if (item?.userId?.email) return item.userId.email;
    if (item?.user?.email) return item.user.email;
    if (item?.userEmail) return item.userEmail;
    if (item?.email) return item.email;

    return "—";
  };

  const getTechnologyName = (item) => {
    if (item?.technologyId?.name) return item.technologyId.name;
    if (item?.technology?.name) return item.technology.name;
    if (item?.technologyName) return item.technologyName;
    if (typeof item?.technology === "string") return item.technology;

    return "General";
  };

  const getFolderName = (item) => {
    if (item?.folderId?.name) return item.folderId.name;
    if (item?.folder?.name) return item.folder.name;
    if (item?.folderName) return item.folderName;

    return "—";
  };

  const getQuestionText = (item) => {
    return (
      item?.question ||
      item?.questionText ||
      item?.query ||
      item?.text ||
      item?.prompt ||
      item?.questionContent ||
      "No question available"
    );
  };

  const getAnswerText = (item) => {
    return (
      item?.answer ||
      item?.response ||
      item?.aiResponse ||
      item?.aiAnswer ||
      item?.responseText ||
      item?.generatedAnswer ||
      item?.answerText ||
      ""
    );
  };

  const getQuestionStatus = (item) => {
    if (item?.status) {
      const normalizedStatus = String(item.status).toLowerCase();

      if (
        normalizedStatus === "answered" ||
        normalizedStatus === "completed" ||
        normalizedStatus === "success"
      ) {
        return "Answered";
      }

      if (
        normalizedStatus === "pending" ||
        normalizedStatus === "processing"
      ) {
        return "Pending";
      }
    }

    const answer = getAnswerText(item);

    if (answer && String(answer).trim()) {
      return "Answered";
    }

    return "Pending";
  };

  const getResponseTime = (item) => {
    if (
      item?.responseTime !== undefined &&
      item?.responseTime !== null &&
      item?.responseTime !== ""
    ) {
      if (typeof item.responseTime === "number") {
        return `${item.responseTime.toFixed(1)} sec`;
      }

      if (typeof item.responseTime === "string") {
        if (item.responseTime.toLowerCase().includes("sec")) {
          return item.responseTime;
        }

        const value = Number(item.responseTime);

        if (Number.isFinite(value)) {
          return `${value.toFixed(1)} sec`;
        }
      }

      return item.responseTime;
    }

    if (
      item?.responseTimeMs !== undefined &&
      item?.responseTimeMs !== null
    ) {
      const value = Number(item.responseTimeMs);

      if (Number.isFinite(value)) {
        return `${(value / 1000).toFixed(1)} sec`;
      }
    }

    if (
      item?.processingTime !== undefined &&
      item?.processingTime !== null
    ) {
      const value = Number(item.processingTime);

      if (Number.isFinite(value)) {
        return `${value.toFixed(1)} sec`;
      }
    }

    return "—";
  };

  const getResponseTimeNumber = (item) => {
    if (
      item?.responseTime !== undefined &&
      item?.responseTime !== null &&
      item?.responseTime !== ""
    ) {
      if (typeof item.responseTime === "number") {
        return item.responseTime;
      }

      if (typeof item.responseTime === "string") {
        const match = item.responseTime.match(/[\d.]+/);

        if (match) {
          const value = Number(match[0]);

          if (Number.isFinite(value)) {
            return value;
          }
        }
      }
    }

    if (
      item?.responseTimeMs !== undefined &&
      item?.responseTimeMs !== null
    ) {
      const value = Number(item.responseTimeMs);

      if (Number.isFinite(value)) {
        return value / 1000;
      }
    }

    if (
      item?.processingTime !== undefined &&
      item?.processingTime !== null
    ) {
      const value = Number(item.processingTime);

      if (Number.isFinite(value)) {
        return value;
      }
    }

    return null;
  };

  const getAskedAt = (item) => {
    const rawDate =
      item?.createdAt ||
      item?.askedAt ||
      item?.created_at ||
      item?.updatedAt;

    if (!rawDate) return "—";

    const date = new Date(rawDate);

    if (Number.isNaN(date.getTime())) return "—";

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getQuestionDate = (item) => {
    const rawDate =
      item?.createdAt ||
      item?.askedAt ||
      item?.created_at ||
      item?.updatedAt;

    if (!rawDate) return null;

    const date = new Date(rawDate);

    if (Number.isNaN(date.getTime())) return null;

    return date;
  };

  const technologyOptions = useMemo(() => {
    const values = questions
      .map((item) => getTechnologyName(item))
      .filter(
        (value) =>
          value &&
          value !== "General" &&
          value !== "—"
      );

    return ["All Technologies", ...new Set(values)];
  }, [questions]);

  const normalizedQuestions = useMemo(() => {
    return questions.map((item) => ({
      ...item,
      displayId: item?._id || item?.id,
      displayQuestion: getQuestionText(item),
      displayUser: getUserName(item),
      displayEmail: getUserEmail(item),
      displayTechnology: getTechnologyName(item),
      displayFolder: getFolderName(item),
      displayStatus: getQuestionStatus(item),
      displayResponseTime: getResponseTime(item),
      displayAskedAt: getAskedAt(item),
      questionDate: getQuestionDate(item),
      displayAnswer: getAnswerText(item),
    }));
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    const now = new Date();

    return normalizedQuestions.filter((item) => {
      const searchValue = search.trim().toLowerCase();

      const matchesSearch =
        !searchValue ||
        String(item.displayQuestion)
          .toLowerCase()
          .includes(searchValue) ||
        String(item.displayUser)
          .toLowerCase()
          .includes(searchValue) ||
        String(item.displayEmail)
          .toLowerCase()
          .includes(searchValue) ||
        String(item.displayTechnology)
          .toLowerCase()
          .includes(searchValue);

      const matchesTechnology =
        technology === "All Technologies" ||
        item.displayTechnology === technology;

      const matchesStatus =
        status === "All Status" ||
        item.displayStatus === status;

      let matchesDate = true;

      if (item.questionDate) {
        if (dateFilter === "Today") {
          matchesDate =
            item.questionDate.toDateString() ===
            now.toDateString();
        }

        if (dateFilter === "This Week") {
          const weekStart = new Date(now);
          const day = weekStart.getDay();

          weekStart.setDate(
            weekStart.getDate() -
              (day === 0 ? 6 : day - 1)
          );

          weekStart.setHours(0, 0, 0, 0);

          matchesDate =
            item.questionDate >= weekStart;
        }

        if (dateFilter === "This Month") {
          matchesDate =
            item.questionDate.getMonth() ===
              now.getMonth() &&
            item.questionDate.getFullYear() ===
              now.getFullYear();
        }
      }

      return (
        matchesSearch &&
        matchesTechnology &&
        matchesStatus &&
        matchesDate
      );
    });
  }, [
    normalizedQuestions,
    search,
    technology,
    status,
    dateFilter,
  ]);

  const totalPages = Math.ceil(
    filteredQuestions.length / itemsPerPage
  );

  const safeTotalPages = Math.max(totalPages, 1);

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const paginatedQuestions =
    filteredQuestions.slice(
      startIndex,
      startIndex + itemsPerPage
    );

  useEffect(() => {
    if (currentPage > safeTotalPages) {
      setCurrentPage(safeTotalPages);
    }
  }, [currentPage, safeTotalPages]);

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleTechnology = (value) => {
    setTechnology(value);
    setCurrentPage(1);
  };

  const handleStatus = (value) => {
    setStatus(value);
    setCurrentPage(1);
  };

  const handleDateFilter = (value) => {
    setDateFilter(value);
    setCurrentPage(1);
  };

  const answeredCount = questions.filter(
    (item) =>
      getQuestionStatus(item) === "Answered"
  ).length;

  const pendingCount = questions.filter(
    (item) =>
      getQuestionStatus(item) === "Pending"
  ).length;

  const responseTimes = questions
    .map((item) => getResponseTimeNumber(item))
    .filter(
      (value) =>
        value !== null &&
        Number.isFinite(value)
    );

  const averageResponse =
    responseTimes.length > 0
      ? `${(
          responseTimes.reduce(
            (sum, value) => sum + value,
            0
          ) / responseTimes.length
        ).toFixed(1)} sec`
      : "—";

  const handleViewQuestion = async (id) => {
    if (!id) {
      setError("Question ID is not available.");
      return;
    }

    try {
      setViewingQuestionId(id);
      setLoadingQuestion(true);
      setShowQuestionModal(true);
      setSelectedQuestion(null);

      const response = await getQuestionById(id);

      console.log(
        "QUESTION DETAILS RESPONSE:",
        response
      );

      let questionData = null;

      if (response?.data?.question) {
        questionData = response.data.question;
      } else if (response?.data?.data) {
        questionData = response.data.data;
      } else if (
        response?.data &&
        typeof response.data === "object" &&
        !Array.isArray(response.data)
      ) {
        questionData = response.data;
      } else if (response?.question) {
        questionData = response.question;
      }

      if (!questionData) {
        throw new Error(
          "Question details are empty."
        );
      }

      console.log(
        "QUESTION DATA:",
        questionData
      );

      setSelectedQuestion(questionData);
    } catch (err) {
      console.error(
        "View Question Error:",
        err
      );

      setError(
        err.message ||
          "Failed to load question details."
      );

      setShowQuestionModal(false);
      setSelectedQuestion(null);
    } finally {
      setLoadingQuestion(false);
      setViewingQuestionId(null);
    }
  };

  const closeQuestionModal = () => {
    setShowQuestionModal(false);
    setSelectedQuestion(null);
    setViewingQuestionId(null);
    setLoadingQuestion(false);
  };

  const handleDeleteQuestion = (item) => {
    const id = item?._id || item?.id;

    if (!id) {
      setError("Question ID is not available.");
      return;
    }

    setConfirmModal({
      isOpen: true,
      question: item,
    });
  };

  const closeConfirmModal = () => {
    if (actionLoading) return;

    setConfirmModal({
      isOpen: false,
      question: null,
    });
  };

  const handleConfirmDelete = async () => {
    const item = confirmModal.question;
    const id = item?._id || item?.id;

    if (!id) {
      setError("Question ID is not available.");
      closeConfirmModal();
      return;
    }

    try {
      setActionLoading(true);
      setError("");

      await deleteQuestion(id);

      setQuestions((prev) =>
        prev.filter(
          (question) =>
            (question?._id || question?.id) !== id
        )
      );

      if (
        paginatedQuestions.length === 1 &&
        currentPage > 1
      ) {
        setCurrentPage((prev) =>
          Math.max(prev - 1, 1)
        );
      }

      setConfirmModal({
        isOpen: false,
        question: null,
      });
    } catch (err) {
      console.error(
        "Delete Question Error:",
        err
      );

      setError(
        err.message ||
          "Failed to delete question."
      );

      setConfirmModal({
        isOpen: false,
        question: null,
      });
    } finally {
      setActionLoading(false);
    }
  };

  const goToPage = (pageNumber) => {
    if (
      pageNumber >= 1 &&
      pageNumber <= safeTotalPages
    ) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-900">
      <AdminNavbar />

      <main className="w-full px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <span>Dashboard</span>
          <span>›</span>
          <span className="font-medium text-blue-600">
            Questions
          </span>
        </div>

        <div className="mb-7">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Questions
          </h1>

          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            Manage and monitor questions asked by users.
          </p>
        </div>

        {error && (
          <div className="mb-6 flex items-center justify-between gap-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
              className="cursor-pointer rounded-md p-1 text-red-400 transition hover:bg-red-100 hover:text-red-700"
            >
              <X size={17} />
            </button>
          </div>
        )}

        <section className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Questions
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {loading ? "—" : questions.length}
                </h2>

                <p className="mt-3 text-sm text-emerald-600">
                  All user questions
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50">
                <MessageCircleQuestion
                  size={29}
                  className="text-blue-600"
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Answered
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {loading ? "—" : answeredCount}
                </h2>

                <p className="mt-3 text-sm text-emerald-600">
                  Questions with responses
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50">
                <CheckCircle2
                  size={29}
                  className="text-emerald-600"
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Pending
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {loading ? "—" : pendingCount}
                </h2>

                <p className="mt-3 text-sm text-orange-600">
                  Needs attention
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-50">
                <Clock3
                  size={29}
                  className="text-orange-500"
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Avg. Response Time
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {loading ? "—" : averageResponse}
                </h2>

                <p className="mt-3 text-sm text-emerald-600">
                  Based on available response data
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-50">
                <Users
                  size={29}
                  className="text-purple-600"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex items-center gap-2">
            <Filter
              size={18}
              className="text-blue-600"
            />

            <h2 className="font-semibold">
              Search & Filters
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
            <div className="relative xl:col-span-2">
              <Search
                size={19}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  handleSearch(e.target.value)
                }
                placeholder="Search questions, users..."
                className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-10 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {search && (
                <button
                  type="button"
                  onClick={() =>
                    handleSearch("")
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-700"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            <select
              value={technology}
              onChange={(e) =>
                handleTechnology(e.target.value)
              }
              className="h-11 cursor-pointer rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {technologyOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={status}
              onChange={(e) =>
                handleStatus(e.target.value)
              }
              className="h-11 cursor-pointer rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option>All Status</option>
              <option>Answered</option>
              <option>Pending</option>
            </select>

            <select
              value={dateFilter}
              onChange={(e) =>
                handleDateFilter(e.target.value)
              }
              className="h-11 cursor-pointer rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option>All Time</option>
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-2 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <MessageCircleQuestion
                size={20}
                className="text-blue-600"
              />

              <h2 className="font-semibold">
                Questions ({filteredQuestions.length})
              </h2>
            </div>

            <p className="text-sm text-slate-500">
              User questions and AI responses
            </p>
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[1050px] border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-4">#</th>
                  <th className="px-5 py-4">Question</th>
                  <th className="px-5 py-4">User</th>
                  <th className="px-5 py-4">
                    Technology
                  </th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Response</th>
                  <th className="px-5 py-4">
                    Asked At
                  </th>
                  <th className="px-5 py-4 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-5 py-14 text-center text-sm text-slate-500"
                    >
                      Loading questions...
                    </td>
                  </tr>
                ) : paginatedQuestions.length > 0 ? (
                  paginatedQuestions.map(
                    (item, index) => (
                      <tr
                        key={
                          item.displayId ||
                          `${item.displayQuestion}-${index}`
                        }
                        className="border-b border-slate-100 transition hover:bg-slate-50/70"
                      >
                        <td className="px-5 py-4 text-sm text-slate-500">
                          {startIndex + index + 1}
                        </td>

                        <td className="max-w-[330px] px-5 py-4">
                          <p
                            className="truncate text-sm font-semibold text-slate-800"
                            title={item.displayQuestion}
                          >
                            {item.displayQuestion}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <div>
                            <p className="text-sm font-medium text-slate-800">
                              {item.displayUser}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-400">
                              {item.displayEmail}
                            </p>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span className="inline-flex rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                            {item.displayTechnology}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          {item.displayStatus ===
                          "Answered" ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                              Answered
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                              Pending
                            </span>
                          )}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {item.displayResponseTime}
                        </td>

                        <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">
                          {item.displayAskedAt}
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              title="View Question"
                              disabled={
                                viewingQuestionId ===
                                item.displayId
                              }
                              onClick={() =>
                                handleViewQuestion(
                                  item.displayId
                                )
                              }
                              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100 disabled:cursor-wait disabled:opacity-50"
                            >
                              <Eye size={17} />
                            </button>

                            <button
                              type="button"
                              title="Delete Question"
                              onClick={() =>
                                handleDeleteQuestion(
                                  item
                                )
                              }
                              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100"
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-5 py-14 text-center"
                    >
                      <div className="flex flex-col items-center">
                        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                          <MessageCircleQuestion
                            size={27}
                            className="text-slate-400"
                          />
                        </div>

                        <h3 className="font-semibold text-slate-700">
                          No questions found
                        </h3>

                        <p className="mt-1 text-sm text-slate-400">
                          Try changing your search or
                          filters.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-slate-100 md:hidden">
            {loading ? (
              <div className="px-5 py-14 text-center text-sm text-slate-500">
                Loading questions...
              </div>
            ) : paginatedQuestions.length > 0 ? (
              paginatedQuestions.map(
                (item, index) => (
                  <div
                    key={
                      item.displayId ||
                      `${item.displayQuestion}-${index}`
                    }
                    className="p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-slate-400">
                          #{startIndex + index + 1}
                        </p>

                        <h3 className="mt-1 text-sm font-semibold leading-5 text-slate-800">
                          {item.displayQuestion}
                        </h3>
                      </div>

                      {item.displayStatus ===
                      "Answered" ? (
                        <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                          Answered
                        </span>
                      ) : (
                        <span className="shrink-0 rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-semibold text-orange-700">
                          Pending
                        </span>
                      )}
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-slate-400">
                          User
                        </p>

                        <p className="mt-1 font-medium text-slate-700">
                          {item.displayUser}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">
                          Technology
                        </p>

                        <span className="mt-1 inline-flex rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                          {item.displayTechnology}
                        </span>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">
                          Response
                        </p>

                        <p className="mt-1 font-medium text-slate-700">
                          {item.displayResponseTime}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">
                          Asked At
                        </p>

                        <p className="mt-1 text-xs text-slate-600">
                          {item.displayAskedAt}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        disabled={
                          viewingQuestionId ===
                          item.displayId
                        }
                        onClick={() =>
                          handleViewQuestion(
                            item.displayId
                          )
                        }
                        className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100 disabled:cursor-wait disabled:opacity-50"
                      >
                        <Eye size={16} />
                        View
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteQuestion(item)
                        }
                        className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-100"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                )
              )
            ) : (
              <div className="px-5 py-14 text-center">
                <MessageCircleQuestion
                  size={30}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-3 font-semibold text-slate-700">
                  No questions found
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Try changing your search or filters.
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-medium text-slate-700">
                {filteredQuestions.length === 0
                  ? 0
                  : startIndex + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium text-slate-700">
                {Math.min(
                  startIndex + itemsPerPage,
                  filteredQuestions.length
                )}
              </span>{" "}
              of{" "}
              <span className="font-medium text-slate-700">
                {filteredQuestions.length}
              </span>{" "}
              questions
            </p>

            <div className="flex items-center justify-end gap-1">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() =>
                  goToPage(currentPage - 1)
                }
                className={`flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition ${
                  currentPage === 1
                    ? "cursor-not-allowed opacity-40"
                    : "cursor-pointer hover:bg-slate-50"
                }`}
                title="Previous Page"
              >
                <ChevronLeft size={17} />
              </button>

              {Array.from(
                {
                  length: safeTotalPages,
                },
                (_, index) => index + 1
              ).map((pageNumber) => (
                <button
                  type="button"
                  key={pageNumber}
                  onClick={() =>
                    goToPage(pageNumber)
                  }
                  className={`hidden h-9 min-w-9 cursor-pointer items-center justify-center rounded-lg px-2 text-sm font-medium sm:flex ${
                    currentPage === pageNumber
                      ? "bg-blue-600 text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {pageNumber}
                </button>
              ))}

              <span className="px-2 text-sm text-slate-500 sm:hidden">
                {currentPage} / {safeTotalPages}
              </span>

              <button
                type="button"
                disabled={
                  currentPage >= safeTotalPages
                }
                onClick={() =>
                  goToPage(currentPage + 1)
                }
                className={`flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition ${
                  currentPage >= safeTotalPages
                    ? "cursor-not-allowed opacity-40"
                    : "cursor-pointer hover:bg-slate-50"
                }`}
                title="Next Page"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </section>
      </main>

      {showQuestionModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          onClick={closeQuestionModal}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            {loadingQuestion ? (
              <div className="flex min-h-[300px] items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="h-9 w-9 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

                  <p className="mt-4 text-sm font-medium text-slate-500">
                    Loading question details...
                  </p>
                </div>
              </div>
            ) : selectedQuestion ? (
              <>
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">
                      Question Details
                    </h2>

                    <p className="mt-0.5 text-xs text-slate-400">
                      {getAskedAt(selectedQuestion)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={closeQuestionModal}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  >
                    <X size={19} />
                  </button>
                </div>

                <div className="space-y-5 p-5">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      User
                    </p>

                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="font-semibold text-slate-800">
                        {getUserName(selectedQuestion)}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {getUserEmail(selectedQuestion)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Technology
                    </p>

                    <span className="inline-flex rounded-md bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">
                      {getTechnologyName(selectedQuestion)}
                    </span>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Question
                    </p>

                    <div className="rounded-lg border border-slate-200 bg-white p-4">
                      <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                        {getQuestionText(selectedQuestion)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      AI Response
                    </p>

                    <div className="rounded-lg border border-emerald-100 bg-emerald-50/50 p-4">
                      <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                        {getAnswerText(selectedQuestion) ||
                          "No response available"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-400">
                        Status
                      </p>

                      <p
                        className={`mt-1 text-sm font-semibold ${
                          getQuestionStatus(
                            selectedQuestion
                          ) === "Answered"
                            ? "text-emerald-600"
                            : "text-orange-600"
                        }`}
                      >
                        {getQuestionStatus(selectedQuestion)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Response Time
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {getResponseTime(selectedQuestion)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Folder
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {getFolderName(selectedQuestion)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Asked At
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {getAskedAt(selectedQuestion)}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex min-h-[300px] flex-col items-center justify-center px-5 text-center">
                <MessageCircleQuestion
                  size={40}
                  className="text-slate-300"
                />

                <p className="mt-3 font-semibold text-slate-700">
                  Question details not available
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Unable to load the selected question.
                </p>

                <button
                  type="button"
                  onClick={closeQuestionModal}
                  className="mt-5 cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={closeConfirmModal}
        onConfirm={handleConfirmDelete}
        title="Delete Question"
        message={`Are you sure you want to permanently delete this question? This action cannot be undone.`}
        confirmText="Delete Question"
        cancelText="Cancel"
        type="danger"
        loading={actionLoading}
        itemName={
          confirmModal.question
            ? getUserName(confirmModal.question)
            : ""
        }
        itemEmail={
          confirmModal.question
            ? getUserEmail(confirmModal.question)
            : ""
        }
      />
    </div>
  );
};

export default AdminQuestions;