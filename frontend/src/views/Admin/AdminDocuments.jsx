import React, { useEffect, useMemo, useState } from "react";
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
} from "lucide-react";

import AdminNavbar from "../../components/admin/AdminNavbar";
import Footer from "../../components/Home/Footer";
import ConfirmModal from "../../components/common/ConfirmModal";

import {
  getAllPdfs,
  deletePdf,
  viewAdminPdf,
} from "../../api/adminApi";

const ITEMS_PER_PAGE = 8;

const AdminDocuments = () => {
  const [documents, setDocuments] = useState([]);

  const [statistics, setStatistics] = useState({
    totalDocuments: 0,
    totalPages: 0,
    totalChunks: 0,
    activeDocuments: 0,
  });

  const [search, setSearch] = useState("");
  const [technology, setTechnology] = useState("All Technologies");
  const [status, setStatus] = useState("All Status");

  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [deletingId, setDeletingId] = useState(null);
  const [viewingId, setViewingId] = useState(null);

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    document: null,
  });

  const [actionLoading, setActionLoading] = useState(false);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllPdfs();
      const responseData = response?.data;

      let pdfList = [];

      if (Array.isArray(responseData)) {
        pdfList = responseData;
      } else if (Array.isArray(responseData?.documents)) {
        pdfList = responseData.documents;
      } else if (Array.isArray(responseData?.pdfs)) {
        pdfList = responseData.pdfs;
      } else if (Array.isArray(response?.documents)) {
        pdfList = response.documents;
      } else if (Array.isArray(response?.pdfs)) {
        pdfList = response.pdfs;
      }

      setDocuments(pdfList);

      const backendStatistics =
        response?.statistics ||
        responseData?.statistics ||
        {};

      const totalDocuments =
        backendStatistics.totalDocuments ?? pdfList.length;

      const totalPages =
        backendStatistics.totalPages ??
        pdfList.reduce(
          (total, pdf) => total + Number(pdf.pages || 0),
          0
        );

      const totalChunks =
        backendStatistics.totalChunks ??
        pdfList.reduce(
          (total, pdf) => total + Number(pdf.chunkCount || 0),
          0
        );

      const activeDocuments =
        backendStatistics.activeDocuments ??
        pdfList.filter(
          (pdf) =>
            pdf.status === "processed" ||
            pdf.status === "uploaded" ||
            pdf.status === "processing"
        ).length;

      setStatistics({
        totalDocuments,
        totalPages,
        totalChunks,
        activeDocuments,
      });
    } catch (error) {
      console.error("Get Documents Error:", error);

      setError(
        error.message || "Failed to fetch documents"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const getTechnologyName = (pdf) => {
    if (
      pdf.technologyId &&
      typeof pdf.technologyId === "object"
    ) {
      return pdf.technologyId.name || "Unknown";
    }

    return (
      pdf.technology ||
      pdf.technologyName ||
      "Unknown"
    );
  };

  const getFolderName = (pdf) => {
    if (
      pdf.folderId &&
      typeof pdf.folderId === "object"
    ) {
      return pdf.folderId.name || "No Folder";
    }

    return (
      pdf.folder ||
      pdf.folderName ||
      "No Folder"
    );
  };

  const getUploaderName = (pdf) => {
    if (
      pdf.userId &&
      typeof pdf.userId === "object"
    ) {
      return (
        pdf.userId.name ||
        pdf.userId.email ||
        "Unknown"
      );
    }

    return (
      pdf.uploadedBy ||
      pdf.userName ||
      "Unknown"
    );
  };

  const getUploaderEmail = (pdf) => {
    if (
      pdf.userId &&
      typeof pdf.userId === "object"
    ) {
      return pdf.userId.email || "";
    }

    return "";
  };

  const getDocumentName = (pdf) => {
    return (
      pdf.originalName ||
      pdf.filename ||
      pdf.name ||
      "Untitled Document"
    );
  };

  const getDocumentStatus = (pdf) => {
    if (pdf.status === "processed") {
      return "Active";
    }

    if (pdf.status === "uploaded") {
      return "Active";
    }

    if (pdf.status === "processing") {
      return "Processing";
    }

    if (pdf.status === "failed") {
      return "Inactive";
    }

    return pdf.isActive === false
      ? "Inactive"
      : "Active";
  };

  const formatDate = (date) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "—";
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const technologies = useMemo(() => {
    const uniqueTechnologies = [
      ...new Set(
        documents
          .map((pdf) => getTechnologyName(pdf))
          .filter(
            (technologyName) =>
              technologyName &&
              technologyName !== "Unknown"
          )
      ),
    ];

    return [
      "All Technologies",
      ...uniqueTechnologies.sort((a, b) =>
        a.localeCompare(b)
      ),
    ];
  }, [documents]);

  const statuses = [
    "All Status",
    "Active",
    "Processing",
    "Inactive",
  ];

  const filteredDocuments = useMemo(() => {
    const searchText =
      search.trim().toLowerCase();

    return documents.filter((pdf) => {
      const documentName =
        getDocumentName(pdf).toLowerCase();

      const technologyName =
        getTechnologyName(pdf).toLowerCase();

      const folderName =
        getFolderName(pdf).toLowerCase();

      const uploaderName =
        getUploaderName(pdf).toLowerCase();

      const uploaderEmail =
        getUploaderEmail(pdf).toLowerCase();

      const documentStatus =
        getDocumentStatus(pdf);

      const matchesSearch =
        !searchText ||
        documentName.includes(searchText) ||
        technologyName.includes(searchText) ||
        folderName.includes(searchText) ||
        uploaderName.includes(searchText) ||
        uploaderEmail.includes(searchText);

      const matchesTechnology =
        technology === "All Technologies" ||
        technologyName ===
          technology.toLowerCase();

      const matchesStatus =
        status === "All Status" ||
        documentStatus === status;

      return (
        matchesSearch &&
        matchesTechnology &&
        matchesStatus
      );
    });
  }, [
    documents,
    search,
    technology,
    status,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, technology, status]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredDocuments.length /
        ITEMS_PER_PAGE
    )
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedDocuments =
    filteredDocuments.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

  const showingFrom =
    filteredDocuments.length === 0
      ? 0
      : (currentPage - 1) *
          ITEMS_PER_PAGE +
        1;

  const showingTo = Math.min(
    currentPage * ITEMS_PER_PAGE,
    filteredDocuments.length
  );

  const getStatusClass = (value) => {
    if (value === "Active") {
      return "bg-emerald-100 text-emerald-700";
    }

    if (value === "Processing") {
      return "bg-orange-100 text-orange-700";
    }

    return "bg-slate-100 text-slate-600";
  };

  const handleView = async (pdf) => {
    if (!pdf?._id) {
      window.alert("Document is not available.");
      return;
    }

    try {
      setViewingId(pdf._id);

      const blob = await viewAdminPdf(pdf._id);

      const blobUrl = URL.createObjectURL(blob);

      const newWindow = window.open(
        blobUrl,
        "_blank",
        "noopener,noreferrer"
      );

      if (!newWindow) {
        URL.revokeObjectURL(blobUrl);

        window.alert(
          "Please allow pop-ups in your browser to open the PDF."
        );

        return;
      }

      setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
      }, 60000);
    } catch (error) {
      console.error(
        "Admin View PDF Error:",
        error
      );

      window.alert(
        error.message ||
          "Unable to open this PDF."
      );
    } finally {
      setViewingId(null);
    }
  };

  const handleDownload = async (pdf) => {
    if (!pdf?._id) {
      window.alert(
        "PDF file is not available."
      );
      return;
    }

    try {
      setViewingId(pdf._id);

      const blob = await viewAdminPdf(pdf._id);

      const blobUrl = URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = blobUrl;
      link.download =
        pdf.originalName ||
        pdf.filename ||
        "document.pdf";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
      }, 1000);
    } catch (error) {
      console.error(
        "Admin Download PDF Error:",
        error
      );

      window.alert(
        error.message ||
          "Unable to download this document."
      );
    } finally {
      setViewingId(null);
    }
  };

  const openDeleteModal = (pdf) => {
    if (!pdf?._id || deletingId || viewingId) {
      return;
    }

    setConfirmModal({
      isOpen: true,
      document: pdf,
    });
  };

  const closeConfirmModal = () => {
    if (actionLoading) {
      return;
    }

    setConfirmModal({
      isOpen: false,
      document: null,
    });
  };

  const handleConfirmDelete = async () => {
    const pdf = confirmModal.document;

    if (!pdf?._id || actionLoading) {
      return;
    }

    try {
      setActionLoading(true);
      setDeletingId(pdf._id);

      await deletePdf(pdf._id);

      setDocuments((previousDocuments) =>
        previousDocuments.filter(
          (document) =>
            document._id !== pdf._id
        )
      );

      setStatistics((previousStatistics) => ({
        ...previousStatistics,
        totalDocuments: Math.max(
          0,
          previousStatistics.totalDocuments - 1
        ),
      }));

      setConfirmModal({
        isOpen: false,
        document: null,
      });
    } catch (error) {
      console.error(
        "Delete PDF Error:",
        error
      );

      setError(
        error.message ||
          "Failed to delete document."
      );

      setConfirmModal({
        isOpen: false,
        document: null,
      });
    } finally {
      setDeletingId(null);
      setActionLoading(false);
    }
  };

  const goToPage = (page) => {
    if (
      page < 1 ||
      page > totalPages ||
      page === currentPage
    ) {
      return;
    }

    setCurrentPage(page);
  };

  const renderPagination = () => {
    if (totalPages <= 1) {
      return null;
    }

    const pages = [];

    if (totalPages <= 5) {
      for (
        let i = 1;
        i <= totalPages;
        i++
      ) {
        pages.push(i);
      }
    } else if (currentPage <= 3) {
      pages.push(
        1,
        2,
        3,
        "...",
        totalPages
      );
    } else if (
      currentPage >= totalPages - 2
    ) {
      pages.push(
        1,
        "...",
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      pages.push(
        1,
        "...",
        currentPage,
        "...",
        totalPages
      );
    }

    return pages.map((page, index) => {
      if (page === "...") {
        const previousPage =
          pages[index - 1];

        const nextPage =
          pages[index + 1];

        return (
          <button
            key={`dots-${index}`}
            type="button"
            onClick={() => {
              if (
                typeof previousPage ===
                  "number" &&
                typeof nextPage ===
                  "number"
              ) {
                const middlePage = Math.floor(
                  (previousPage + nextPage) /
                    2
                );

                goToPage(middlePage);
              }
            }}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-sm text-slate-500 transition hover:bg-slate-100"
            title="Jump to page"
          >
            ...
          </button>
        );
      }

      return (
        <button
          key={page}
          type="button"
          onClick={() => goToPage(page)}
          className={`flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-lg border px-2 text-sm font-medium transition ${
            currentPage === page
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          }`}
        >
          {page}
        </button>
      );
    });
  };

  if (loading) {
    return (
      <>
        <AdminNavbar />

        <main className="min-h-screen bg-[#f8fafc] px-4 py-8 text-[#0f172a] sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="mx-auto flex min-h-[600px] max-w-[1600px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

              <p className="mt-4 text-sm font-medium text-slate-600">
                Loading documents...
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <AdminNavbar />

        <main className="min-h-screen bg-[#f8fafc] px-4 py-8 text-[#0f172a] sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="mx-auto flex min-h-[600px] max-w-[1600px] items-center justify-center">
            <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
              <FileText className="mx-auto h-12 w-12 text-red-400" />

              <h2 className="mt-4 text-lg font-bold text-red-600">
                Unable to Load Documents
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                {error}
              </p>

              <button
                type="button"
                onClick={fetchDocuments}
                className="mt-5 cursor-pointer rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a]">
      <AdminNavbar />

      <main className="w-full px-4 py-6 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14">
        <div className="mx-auto w-full max-w-[1600px]">

          <section className="mb-7">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                  <span>Dashboard</span>
                  <span>/</span>
                  <span className="text-blue-600">
                    Documents
                  </span>
                </div>

                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Documents
                </h1>

                <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
                  View and manage all documents uploaded to the AI Search Assistant.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <StatCard
              title="Total Documents"
              value={statistics.totalDocuments}
              icon={FileText}
              iconClass="bg-blue-50 text-blue-600"
              footer="All uploaded documents"
            />

            <StatCard
              title="Total Pages"
              value={statistics.totalPages}
              icon={BookOpen}
              iconClass="bg-emerald-50 text-emerald-600"
              footer="Across all documents"
            />

            <StatCard
              title="Total Text Chunks"
              value={statistics.totalChunks}
              icon={Layers3}
              iconClass="bg-purple-50 text-purple-600"
              footer="Indexed text chunks"
            />

            <StatCard
              title="Active Documents"
              value={statistics.activeDocuments}
              icon={FileText}
              iconClass="bg-orange-50 text-orange-500"
              footer="Currently available"
            />

          </section>

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>
                  <h2 className="text-xl font-semibold">
                    All Documents
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Manage uploaded PDF documents and their indexing information.
                  </p>
                </div>

                <div className="text-sm text-slate-500">
                  {filteredDocuments.length} documents found
                </div>

              </div>
            </div>

            <div className="border-b border-slate-200 bg-slate-50/70 p-4 sm:p-5">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-[minmax(250px,1fr)_220px_180px]">

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Search documents..."
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <select
                    value={technology}
                    onChange={(e) =>
                      setTechnology(e.target.value)
                    }
                    className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-9 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    {technologies.map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>

                <div className="relative">
                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value)
                    }
                    className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-9 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    {statuses.map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>

              </div>
            </div>

            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[1150px]">
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
                  {paginatedDocuments.length > 0 ? (
                    paginatedDocuments.map((pdf) => {
                      const documentName =
                        getDocumentName(pdf);

                      const technologyName =
                        getTechnologyName(pdf);

                      const folderName =
                        getFolderName(pdf);

                      const uploaderName =
                        getUploaderName(pdf);

                      const documentStatus =
                        getDocumentStatus(pdf);

                      const isViewing =
                        viewingId === pdf._id;

                      return (
                        <tr
                          key={pdf._id}
                          className="border-b border-slate-100 transition hover:bg-slate-50"
                        >
                          <td className="px-5 py-4">
                            <div className="flex min-w-[250px] items-center gap-3">

                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50">
                                <FileText className="h-5 w-5 text-red-500" />
                              </div>

                              <div className="min-w-0">
                                <p
                                  className="truncate text-sm font-semibold text-slate-900"
                                  title={documentName}
                                >
                                  {documentName}
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                  {formatDate(
                                    pdf.createdAt
                                  )}
                                </p>
                              </div>

                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <span className="text-sm text-slate-700">
                              {technologyName}
                            </span>
                          </td>

                          <td className="px-4 py-4">
                            <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                              {folderName}
                            </span>
                          </td>

                          <td className="px-4 py-4 text-sm font-medium text-slate-700">
                            {Number(
                              pdf.pages || 0
                            ).toLocaleString()}
                          </td>

                          <td className="px-4 py-4 text-sm font-medium text-slate-700">
                            {Number(
                              pdf.chunkCount || 0
                            ).toLocaleString()}
                          </td>

                          <td className="px-4 py-4">
                            <div>
                              <p className="text-sm text-slate-700">
                                {uploaderName}
                              </p>

                              {getUploaderEmail(
                                pdf
                              ) && (
                                <p className="mt-1 text-xs text-slate-500">
                                  {getUploaderEmail(
                                    pdf
                                  )}
                                </p>
                              )}
                            </div>
                          </td>

                          <td className="px-4 py-4">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                                documentStatus
                              )}`}
                            >
                              {documentStatus}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex justify-end gap-2">

                              <button
                                type="button"
                                title="View document"
                                onClick={() =>
                                  handleView(pdf)
                                }
                                disabled={
                                  deletingId ===
                                    pdf._id ||
                                  isViewing
                                }
                                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {isViewing ? (
                                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>

                              <button
                                type="button"
                                title="Download document"
                                onClick={() =>
                                  handleDownload(pdf)
                                }
                                disabled={
                                  deletingId ===
                                    pdf._id ||
                                  isViewing
                                }
                                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-purple-50 text-purple-600 transition hover:bg-purple-100 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <Download className="h-4 w-4" />
                              </button>

                              <button
                                type="button"
                                title="Delete document"
                                onClick={() =>
                                  openDeleteModal(pdf)
                                }
                                disabled={
                                  deletingId ===
                                    pdf._id ||
                                  isViewing
                                }
                                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {deletingId ===
                                pdf._id ? (
                                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-200 border-t-red-500" />
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
                              </button>

                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="px-6 py-16 text-center"
                      >
                        <FileText className="mx-auto h-12 w-12 text-slate-300" />

                        <h3 className="mt-4 text-lg font-semibold text-slate-800">
                          No documents found
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          Try changing your search or filters.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 gap-4 p-4 lg:hidden">

              {paginatedDocuments.length > 0 ? (
                paginatedDocuments.map((pdf) => {
                  const documentName =
                    getDocumentName(pdf);

                  const technologyName =
                    getTechnologyName(pdf);

                  const folderName =
                    getFolderName(pdf);

                  const uploaderName =
                    getUploaderName(pdf);

                  const documentStatus =
                    getDocumentStatus(pdf);

                  const isViewing =
                    viewingId === pdf._id;

                  return (
                    <article
                      key={pdf._id}
                      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3">

                        <div className="flex min-w-0 items-center gap-3">

                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50">
                            <FileText className="h-5 w-5 text-red-500" />
                          </div>

                          <div className="min-w-0">
                            <h3 className="truncate text-sm font-semibold">
                              {documentName}
                            </h3>

                            <p className="mt-1 text-xs text-slate-500">
                              {formatDate(
                                pdf.createdAt
                              )}
                            </p>
                          </div>

                        </div>

                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                            documentStatus
                          )}`}
                        >
                          {documentStatus}
                        </span>

                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">

                        <InfoBox
                          label="Technology"
                          value={technologyName}
                        />

                        <InfoBox
                          label="Folder"
                          value={folderName}
                        />

                        <InfoBox
                          label="Pages"
                          value={Number(
                            pdf.pages || 0
                          ).toLocaleString()}
                        />

                        <InfoBox
                          label="Chunks"
                          value={Number(
                            pdf.chunkCount || 0
                          ).toLocaleString()}
                        />

                      </div>

                      <div className="mt-3 rounded-xl bg-slate-50 p-3">
                        <p className="text-xs text-slate-500">
                          Uploaded By
                        </p>

                        <p className="mt-1 text-sm font-medium">
                          {uploaderName}
                        </p>

                        {getUploaderEmail(pdf) && (
                          <p className="mt-1 text-xs text-slate-500">
                            {getUploaderEmail(pdf)}
                          </p>
                        )}
                      </div>

                      <div className="mt-4 flex gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            handleView(pdf)
                          }
                          disabled={
                            deletingId ===
                              pdf._id ||
                            isViewing
                          }
                          className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-50 py-2.5 text-sm font-medium text-blue-600 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isViewing ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}

                          View
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDownload(pdf)
                          }
                          disabled={
                            deletingId ===
                              pdf._id ||
                            isViewing
                          }
                          className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-purple-50 py-2.5 text-sm font-medium text-purple-600 transition hover:bg-purple-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            openDeleteModal(pdf)
                          }
                          disabled={
                            deletingId ===
                              pdf._id ||
                            isViewing
                          }
                          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-red-50 text-red-500 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deletingId ===
                          pdf._id ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-200 border-t-red-500" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>

                      </div>
                    </article>
                  );
                })
              ) : (
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
                  {showingFrom}
                </span>{" "}
                to{" "}
                <span className="font-medium text-slate-700">
                  {showingTo}
                </span>{" "}
                of{" "}
                <span className="font-medium text-slate-700">
                  {filteredDocuments.length}
                </span>{" "}
                documents
              </p>

              {filteredDocuments.length > 0 && (
                <div className="flex items-center gap-2">

                  <button
                    type="button"
                    onClick={() =>
                      goToPage(
                        currentPage - 1
                      )
                    }
                    disabled={
                      currentPage === 1
                    }
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  {renderPagination()}

                  <button
                    type="button"
                    onClick={() =>
                      goToPage(
                        currentPage + 1
                      )
                    }
                    disabled={
                      currentPage ===
                      totalPages
                    }
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>

                </div>
              )}

            </div>

          </section>
        </div>
      </main>

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={closeConfirmModal}
        onConfirm={handleConfirmDelete}
        title="Delete Document"
        message={`Are you sure you want to permanently delete ${
          confirmModal.document
            ? getDocumentName(confirmModal.document)
            : "this document"
        }? This action cannot be undone.`}
        confirmText="Delete Document"
        cancelText="Cancel"
        type="danger"
        loading={actionLoading}
        itemName={
          confirmModal.document
            ? getDocumentName(confirmModal.document)
            : ""
        }
        itemEmail=""
      />

      <Footer />
    </div>
  );
};

const StatCard = ({
  title,
  value,
  icon: Icon,
  iconClass,
  footer,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {Number(value || 0).toLocaleString()}
          </h2>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconClass}`}
        >
          <Icon className="h-7 w-7" />
        </div>

      </div>

      <div className="mt-4 text-sm text-slate-500">
        {footer}
      </div>
    </div>
  );
};

const InfoBox = ({ label, value }) => {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-1 truncate text-sm font-medium">
        {value}
      </p>
    </div>
  );
};

export default AdminDocuments;