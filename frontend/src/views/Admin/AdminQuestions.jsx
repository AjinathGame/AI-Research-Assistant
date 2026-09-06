import React, { useMemo, useState } from "react";
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
  RotateCcw,
  Filter,
  X,
} from "lucide-react";

const AdminQuestions = () => {
  const [search, setSearch] = useState("");
  const [technology, setTechnology] = useState("All Technologies");
  const [status, setStatus] = useState("All Status");
  const [dateFilter, setDateFilter] = useState("All Time");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 7;

  const questions = [
    {
      id: 1,
      question: "What is React and why is it used?",
      user: "John Doe",
      email: "john@example.com",
      technology: "React",
      status: "Answered",
      responseTime: "1.2 sec",
      askedAt: "May 26, 2025 10:30 AM",
    },
    {
      id: 2,
      question: "What is the difference between Node.js and Express.js?",
      user: "Sarah Smith",
      email: "sarah@example.com",
      technology: "Node.js",
      status: "Answered",
      responseTime: "1.5 sec",
      askedAt: "May 26, 2025 09:45 AM",
    },
    {
      id: 3,
      question: "Explain MongoDB aggregation pipeline.",
      user: "Michael Brown",
      email: "michael@example.com",
      technology: "MongoDB",
      status: "Answered",
      responseTime: "2.1 sec",
      askedAt: "May 25, 2025 04:20 PM",
    },
    {
      id: 4,
      question: "What are Angular components?",
      user: "Emily Wilson",
      email: "emily@example.com",
      technology: "Angular",
      status: "Pending",
      responseTime: "-",
      askedAt: "May 25, 2025 02:15 PM",
    },
    {
      id: 5,
      question: "Explain Java inheritance with an example.",
      user: "David Miller",
      email: "david@example.com",
      technology: "Java",
      status: "Answered",
      responseTime: "1.8 sec",
      askedAt: "May 24, 2025 11:10 AM",
    },
    {
      id: 6,
      question: "What is the purpose of middleware in Express?",
      user: "Robert Taylor",
      email: "robert@example.com",
      technology: "Express.js",
      status: "Answered",
      responseTime: "1.4 sec",
      askedAt: "May 24, 2025 09:35 AM",
    },
    {
      id: 7,
      question: "What is the difference between SQL and NoSQL?",
      user: "Jessica Anderson",
      email: "jessica@example.com",
      technology: "Database",
      status: "Answered",
      responseTime: "2.0 sec",
      askedAt: "May 23, 2025 06:40 PM",
    },
    {
      id: 8,
      question: "Explain Python decorators.",
      user: "Daniel Thomas",
      email: "daniel@example.com",
      technology: "Python",
      status: "Pending",
      responseTime: "-",
      askedAt: "May 23, 2025 04:20 PM",
    },
    {
      id: 9,
      question: "What is machine learning?",
      user: "Olivia Martin",
      email: "olivia@example.com",
      technology: "Machine Learning",
      status: "Answered",
      responseTime: "1.7 sec",
      askedAt: "May 22, 2025 01:25 PM",
    },
    {
      id: 10,
      question: "What is RAG in Generative AI?",
      user: "James White",
      email: "james@example.com",
      technology: "AI",
      status: "Answered",
      responseTime: "2.3 sec",
      askedAt: "May 22, 2025 10:15 AM",
    },
    {
      id: 11,
      question: "Explain vector embeddings.",
      user: "Sophia Harris",
      email: "sophia@example.com",
      technology: "AI",
      status: "Answered",
      responseTime: "2.4 sec",
      askedAt: "May 21, 2025 03:45 PM",
    },
    {
      id: 12,
      question: "What is the difference between AI and ML?",
      user: "William Clark",
      email: "william@example.com",
      technology: "Machine Learning",
      status: "Pending",
      responseTime: "-",
      askedAt: "May 21, 2025 11:30 AM",
    },
  ];

  const filteredQuestions = useMemo(() => {
    return questions.filter((item) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        item.question.toLowerCase().includes(searchValue) ||
        item.user.toLowerCase().includes(searchValue) ||
        item.technology.toLowerCase().includes(searchValue);

      const matchesTechnology =
        technology === "All Technologies" ||
        item.technology === technology;

      const matchesStatus =
        status === "All Status" || item.status === status;

      return matchesSearch && matchesTechnology && matchesStatus;
    });
  }, [search, technology, status]);

  const totalPages = Math.ceil(
    filteredQuestions.length / itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedQuestions = filteredQuestions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const resetFilters = () => {
    setSearch("");
    setTechnology("All Technologies");
    setStatus("All Status");
    setDateFilter("All Time");
    setCurrentPage(1);
  };

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

  const answeredCount = questions.filter(
    (item) => item.status === "Answered"
  ).length;

  const pendingCount = questions.filter(
    (item) => item.status === "Pending"
  ).length;

  const averageResponse = "1.8 sec";

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-900">
      <main className="w-full px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <span>Dashboard</span>
          <span>›</span>
          <span className="font-medium text-blue-600">
            Questions
          </span>
        </div>

        <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Questions
            </h1>

            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Manage and monitor questions asked by users.
            </p>
          </div>

          <button
            onClick={resetFilters}
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <RotateCcw size={17} />
            Reset Filters
          </button>
        </div>

        <section className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Questions
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {questions.length}
                </h2>

                <p className="mt-3 text-sm text-emerald-600">
                  ↑ 186 this month
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
                  {answeredCount}
                </h2>

                <p className="mt-3 text-sm text-emerald-600">
                  ↑ 12% this month
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
                  {pendingCount}
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
                  {averageResponse}
                </h2>

                <p className="mt-3 text-sm text-emerald-600">
                  ↓ 0.3 sec faster
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
            <Filter size={18} className="text-blue-600" />

            <h2 className="font-semibold">
              Search & Filters
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
            <div className="relative xl:col-span-2">
              <Search
                size={19}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search questions, users..."
                className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-10 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {search && (
                <button
                  onClick={() => handleSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
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
              className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option>All Technologies</option>
              <option>React</option>
              <option>Node.js</option>
              <option>MongoDB</option>
              <option>Angular</option>
              <option>Java</option>
              <option>Express.js</option>
              <option>Python</option>
              <option>AI</option>
              <option>Machine Learning</option>
              <option>Database</option>
            </select>

            <select
              value={status}
              onChange={(e) =>
                handleStatus(e.target.value)
              }
              className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option>All Status</option>
              <option>Answered</option>
              <option>Pending</option>
            </select>

            <select
              value={dateFilter}
              onChange={(e) =>
                setDateFilter(e.target.value)
              }
              className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                  <th className="px-5 py-4">
                    #
                  </th>

                  <th className="px-5 py-4">
                    Question
                  </th>

                  <th className="px-5 py-4">
                    User
                  </th>

                  <th className="px-5 py-4">
                    Technology
                  </th>

                  <th className="px-5 py-4">
                    Status
                  </th>

                  <th className="px-5 py-4">
                    Response
                  </th>

                  <th className="px-5 py-4">
                    Asked At
                  </th>

                  <th className="px-5 py-4 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedQuestions.length > 0 ? (
                  paginatedQuestions.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b border-slate-100 transition hover:bg-slate-50/70"
                    >
                      <td className="px-5 py-4 text-sm text-slate-500">
                        {startIndex + index + 1}
                      </td>

                      <td className="max-w-[330px] px-5 py-4">
                        <p
                          className="truncate text-sm font-semibold text-slate-800"
                          title={item.question}
                        >
                          {item.question}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <div>
                          <p className="text-sm font-medium text-slate-800">
                            {item.user}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-400">
                            {item.email}
                          </p>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                          {item.technology}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        {item.status === "Answered" ? (
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
                        {item.responseTime}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">
                        {item.askedAt}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            title="View Question"
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100"
                          >
                            <Eye size={17} />
                          </button>

                          <button
                            title="Delete Question"
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
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
                          Try changing your search or filters.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-slate-100 md:hidden">
            {paginatedQuestions.length > 0 ? (
              paginatedQuestions.map((item, index) => (
                <div
                  key={item.id}
                  className="p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-slate-400">
                        #{startIndex + index + 1}
                      </p>

                      <h3 className="mt-1 text-sm font-semibold leading-5 text-slate-800">
                        {item.question}
                      </h3>
                    </div>

                    {item.status === "Answered" ? (
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
                        {item.user}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Technology
                      </p>

                      <span className="mt-1 inline-flex rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                        {item.technology}
                      </span>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Response
                      </p>

                      <p className="mt-1 font-medium text-slate-700">
                        {item.responseTime}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Asked At
                      </p>

                      <p className="mt-1 text-xs text-slate-600">
                        {item.askedAt}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100">
                      <Eye size={16} />
                      View
                    </button>

                    <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-100">
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              ))
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
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.max(prev - 1, 1)
                  )
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={17} />
              </button>

              {Array.from(
                { length: Math.max(totalPages, 1) },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`hidden h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm font-medium sm:flex ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {page}
                </button>
              ))}

              <span className="px-2 text-sm text-slate-500 sm:hidden">
                {currentPage} / {Math.max(totalPages, 1)}
              </span>

              <button
                disabled={
                  currentPage >= Math.max(totalPages, 1)
                }
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(
                      prev + 1,
                      Math.max(totalPages, 1)
                    )
                  )
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminQuestions;