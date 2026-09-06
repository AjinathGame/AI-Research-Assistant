import React, { useMemo, useState } from "react";
import {
  FileText,
  BookOpen,
  Layers3,
  Search,
  Filter,
  Eye,
  Download,
  Trash2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

const AdminDocuments = () => {
  const [search, setSearch] = useState("");
  const [technology, setTechnology] = useState("All Technologies");
  const [status, setStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);

  const documents = [
    {
      id: 1,
      name: "React Hooks Guide.pdf",
      technology: "React",
      folder: "Frontend",
      pages: 156,
      chunks: 456,
      uploadedBy: "John Doe",
      uploadedAt: "May 26, 2025",
      status: "Active",
    },
    {
      id: 2,
      name: "JavaScript ES6.pdf",
      technology: "JavaScript",
      folder: "Frontend",
      pages: 124,
      chunks: 378,
      uploadedBy: "Jane Smith",
      uploadedAt: "May 25, 2025",
      status: "Active",
    },
    {
      id: 3,
      name: "Node.js Backend Guide.pdf",
      technology: "Node.js",
      folder: "Backend",
      pages: 210,
      chunks: 654,
      uploadedBy: "Admin",
      uploadedAt: "May 24, 2025",
      status: "Active",
    },
    {
      id: 4,
      name: "MongoDB Fundamentals.pdf",
      technology: "MongoDB",
      folder: "Database",
      pages: 185,
      chunks: 521,
      uploadedBy: "Admin",
      uploadedAt: "May 23, 2025",
      status: "Active",
    },
    {
      id: 5,
      name: "Python Programming.pdf",
      technology: "Python",
      folder: "Programming",
      pages: 242,
      chunks: 712,
      uploadedBy: "John Doe",
      uploadedAt: "May 22, 2025",
      status: "Inactive",
    },
    {
      id: 6,
      name: "Machine Learning Introduction.pdf",
      technology: "Machine Learning",
      folder: "AI / ML",
      pages: 198,
      chunks: 589,
      uploadedBy: "Admin",
      uploadedAt: "May 21, 2025",
      status: "Active",
    },
  ];

  const technologies = [
    "All Technologies",
    ...new Set(documents.map((doc) => doc.technology)),
  ];

  const statuses = ["All Status", "Active", "Inactive"];

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        doc.name.toLowerCase().includes(searchText) ||
        doc.technology.toLowerCase().includes(searchText) ||
        doc.folder.toLowerCase().includes(searchText) ||
        doc.uploadedBy.toLowerCase().includes(searchText);

      const matchesTechnology =
        technology === "All Technologies" ||
        doc.technology === technology;

      const matchesStatus =
        status === "All Status" || doc.status === status;

      return matchesSearch && matchesTechnology && matchesStatus;
    });
  }, [search, technology, status]);

  const totalDocuments = documents.length;

  const totalPages = documents.reduce(
    (total, document) => total + document.pages,
    0
  );

  const totalChunks = documents.reduce(
    (total, document) => total + document.chunks,
    0
  );

  const clearFilters = () => {
    setSearch("");
    setTechnology("All Technologies");
    setStatus("All Status");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a]">
     
      <main className="w-full px-4 py-6 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14">
        <div className="mx-auto w-full max-w-[1600px]">

         
          <section className="mb-7">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                  <span>Dashboard</span>
                  <span>/</span>
                  <span className="text-blue-600">Documents</span>
                </div>

                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Documents
                </h1>

                <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
                  View and manage all documents uploaded to the AI Search
                  Assistant.
                </p>
              </div>
            </div>
          </section>

         
          <section className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

         
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Documents
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {totalDocuments}
                  </h2>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                  <FileText className="h-7 w-7 text-blue-600" />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm">
                <span className="font-medium text-emerald-600">
                  ↑ 12
                </span>
                <span className="text-slate-500">
                  this month
                </span>
              </div>
            </div>

           
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Pages
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {totalPages.toLocaleString()}
                  </h2>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50">
                  <BookOpen className="h-7 w-7 text-emerald-600" />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm">
                <span className="font-medium text-emerald-600">
                  ↑ 180
                </span>
                <span className="text-slate-500">
                  this week
                </span>
              </div>
            </div>

           
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Text Chunks
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {totalChunks.toLocaleString()}
                  </h2>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50">
                  <Layers3 className="h-7 w-7 text-purple-600" />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm">
                <span className="font-medium text-emerald-600">
                  ↑ 320
                </span>
                <span className="text-slate-500">
                  this week
                </span>
              </div>
            </div>

            
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Active Documents
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {documents.filter(
                      (doc) => doc.status === "Active"
                    ).length}
                  </h2>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50">
                  <FileText className="h-7 w-7 text-orange-500" />
                </div>
              </div>

              <div className="mt-4 text-sm text-slate-500">
                Currently available
              </div>
            </div>
          </section>

          
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>
                  <h2 className="text-xl font-semibold">
                    All Documents
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Manage uploaded PDF documents and their indexing
                    information.
                  </p>
                </div>

                <div className="text-sm text-slate-500">
                  {filteredDocuments.length} documents found
                </div>
              </div>
            </div>

            
            <div className="border-b border-slate-200 bg-slate-50/70 p-4 sm:p-5">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-[minmax(250px,1fr)_220px_180px_auto]">

                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search documents..."
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <select
                    value={technology}
                    onChange={(e) => {
                      setTechnology(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-9 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    {technologies.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>

               
                <div className="relative">
                  <select
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-9 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    {statuses.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>

                
                <button
                  onClick={clearFilters}
                  className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                >
                  <X className="h-4 w-4" />
                  Clear
                </button>
              </div>
            </div>

            
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[1050px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-white text-left">
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Document
                    </th>

                    <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Technology
                    </th>

                    <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Folder
                    </th>

                    <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Pages
                    </th>

                    <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Chunks
                    </th>

                    <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Uploaded By
                    </th>

                    <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredDocuments.map((doc) => (
                    <tr
                      key={doc.id}
                      className="border-b border-slate-100 transition hover:bg-slate-50"
                    >
                     
                      <td className="px-5 py-4">
                        <div className="flex min-w-[240px] items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50">
                            <FileText className="h-5 w-5 text-red-500" />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-900">
                              {doc.name}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {doc.uploadedAt}
                            </p>
                          </div>
                        </div>
                      </td>

                     
                      <td className="px-4 py-4">
                        <span className="text-sm text-slate-700">
                          {doc.technology}
                        </span>
                      </td>

                     
                      <td className="px-4 py-4">
                        <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                          {doc.folder}
                        </span>
                      </td>

                     
                      <td className="px-4 py-4 text-sm font-medium text-slate-700">
                        {doc.pages}
                      </td>

                      
                      <td className="px-4 py-4 text-sm font-medium text-slate-700">
                        {doc.chunks}
                      </td>

                      
                      <td className="px-4 py-4">
                        <span className="text-sm text-slate-700">
                          {doc.uploadedBy}
                        </span>
                      </td>

                      
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            doc.status === "Active"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {doc.status}
                        </span>
                      </td>

                      
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            title="View document"
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100"
                          >
                            <Eye className="h-4 w-4" />
                          </button>

                          <button
                            title="Download document"
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600 transition hover:bg-purple-100"
                          >
                            <Download className="h-4 w-4" />
                          </button>

                          <button
                            title="Delete document"
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredDocuments.length === 0 && (
                <div className="px-6 py-16 text-center">
                  <FileText className="mx-auto h-12 w-12 text-slate-300" />

                  <h3 className="mt-4 text-lg font-semibold text-slate-800">
                    No documents found
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Try changing your search or filters.
                  </p>
                </div>
              )}
            </div>

           
            <div className="grid grid-cols-1 gap-4 p-4 lg:hidden">
              {filteredDocuments.map((doc) => (
                <article
                  key={doc.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                 
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50">
                        <FileText className="h-5 w-5 text-red-500" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold">
                          {doc.name}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          {doc.uploadedAt}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                        doc.status === "Active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </div>

                 
                  <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">
                        Technology
                      </p>

                      <p className="mt-1 truncate text-sm font-medium">
                        {doc.technology}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">
                        Folder
                      </p>

                      <p className="mt-1 truncate text-sm font-medium">
                        {doc.folder}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">
                        Pages
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        {doc.pages}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">
                        Chunks
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        {doc.chunks}
                      </p>
                    </div>
                  </div>

                
                  <div className="mt-3 rounded-xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">
                      Uploaded By
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {doc.uploadedBy}
                    </p>
                  </div>

                  
                  <div className="mt-4 flex gap-2">
                    <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-50 py-2.5 text-sm font-medium text-blue-600 transition hover:bg-blue-100">
                      <Eye className="h-4 w-4" />
                      View
                    </button>

                    <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-purple-50 py-2.5 text-sm font-medium text-purple-600 transition hover:bg-purple-100">
                      <Download className="h-4 w-4" />
                      Download
                    </button>

                    <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500 transition hover:bg-red-100">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              ))}

              {filteredDocuments.length === 0 && (
                <div className="px-4 py-12 text-center">
                  <FileText className="mx-auto h-12 w-12 text-slate-300" />

                  <h3 className="mt-4 text-lg font-semibold">
                    No documents found
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Try changing your search or filters.
                  </p>
                </div>
              )}
            </div>

            
            <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-medium text-slate-700">
                  {filteredDocuments.length}
                </span>{" "}
                of{" "}
                <span className="font-medium text-slate-700">
                  {documents.length}
                </span>{" "}
                documents
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  disabled={currentPage === 1}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <button
                  className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-blue-600 px-3 text-sm font-medium text-white"
                >
                  {currentPage}
                </button>

                <button
                  onClick={() => setCurrentPage((page) => page + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminDocuments;