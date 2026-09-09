import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Folder,
  FileText,
  Layers3,
  Database,
  Eye,
  ExternalLink,
  HardDrive,
  CalendarDays,
  AlertCircle,
  Loader2,
} from "lucide-react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import AdminNavbar from "../../components/admin/AdminNavbar";
import Footer from "../../components/Home/Footer";
import { getFolderById } from "../../api/adminApi";

const AdminFolderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [folder, setFolder] = useState(null);
  const [pdfs, setPdfs] = useState([]);

  const [statistics, setStatistics] = useState({
    totalPdfs: 0,
    totalPages: 0,
    totalChunks: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFolderDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getFolderById(id);

        const responseData = response?.data || {};

        setFolder(responseData.folder || null);

        setPdfs(
          Array.isArray(responseData.pdfs)
            ? responseData.pdfs
            : []
        );

        setStatistics({
          totalPdfs:
            responseData.statistics?.totalPdfs ??
            responseData.pdfs?.length ??
            0,

          totalPages:
            responseData.statistics?.totalPages ?? 0,

          totalChunks:
            responseData.statistics?.totalChunks ?? 0,
        });
      } catch (err) {
        console.error(
          "Get Folder Details Error:",
          err
        );

        setError(
          err?.message ||
            "Failed to fetch folder details"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFolderDetails();
    }
  }, [id]);

  const formatFileSize = (bytes) => {
    if (!bytes || bytes <= 0) {
      return "0 KB";
    }

    const units = [
      "Bytes",
      "KB",
      "MB",
      "GB",
    ];

    const index = Math.min(
      Math.floor(
        Math.log(bytes) / Math.log(1024)
      ),
      units.length - 1
    );

    const size =
      bytes / Math.pow(1024, index);

    return `${size.toFixed(
      index === 0 ? 0 : 2
    )} ${units[index]}`;
  };

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "—";
    }

    return parsedDate.toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  const getFileUrl = (filePath) => {
    if (!filePath) {
      return null;
    }

    if (
      filePath.startsWith("http://") ||
      filePath.startsWith("https://")
    ) {
      return filePath;
    }

    const normalizedPath =
      filePath.replace(/\\/g, "/");

    const storageIndex =
      normalizedPath.indexOf("/storage/");

    if (storageIndex !== -1) {
      const relativePath =
        normalizedPath.substring(
          storageIndex + "/storage/".length
        );

      return `http://localhost:5000/storage/${relativePath}`;
    }

    const uploadsIndex =
      normalizedPath.indexOf("/uploads/");

    if (uploadsIndex !== -1) {
      const relativePath =
        normalizedPath.substring(
          uploadsIndex + "/uploads/".length
        );

      return `http://localhost:5000/uploads/${relativePath}`;
    }

    if (
      normalizedPath.startsWith("storage/")
    ) {
      return `http://localhost:5000/${normalizedPath}`;
    }

    if (
      normalizedPath.startsWith("uploads/")
    ) {
      return `http://localhost:5000/${normalizedPath}`;
    }

    return null;
  };

  const handleOpenPdf = (pdf) => {
    if (!pdf?.filePath) {
      window.alert(
        "Document file is not available."
      );
      return;
    }

    const fileUrl = getFileUrl(
      pdf.filePath
    );

    if (!fileUrl) {
      window.alert(
        "Unable to open this document."
      );
      return;
    }

    window.open(
      fileUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const getStatusClass = (status) => {
    if (status === "processed") {
      return "bg-emerald-100 text-emerald-700";
    }

    if (status === "processing") {
      return "bg-orange-100 text-orange-700";
    }

    if (status === "failed") {
      return "bg-red-100 text-red-700";
    }

    return "bg-blue-100 text-blue-700";
  };

  const getStatusLabel = (status) => {
    if (!status) {
      return "Uploaded";
    }

    return (
      status.charAt(0).toUpperCase() +
      status.slice(1)
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc]">
        <AdminNavbar />

        <main className="flex min-h-[650px] items-center justify-center px-6">
          <div className="text-center">
            <Loader2 className="mx-auto h-10 w-10 animate-spin text-blue-600" />

            <p className="mt-4 text-sm font-medium text-slate-600">
              Loading folder details...
            </p>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f8fafc]">
        <AdminNavbar />

        <main className="px-4 py-8 sm:px-6 md:px-8 lg:px-10">
          <div className="mx-auto flex min-h-[600px] max-w-7xl items-center justify-center">
            <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
              <AlertCircle className="mx-auto h-12 w-12 text-red-500" />

              <h2 className="mt-4 text-xl font-bold text-slate-900">
                Unable to Load Folder
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {error}
              </p>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="mt-6 cursor-pointer rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Go Back
              </button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a]">
      <AdminNavbar />

      <main className="w-full px-4 py-6 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="mx-auto w-full max-w-[1600px]">

          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <button
              type="button"
              onClick={() =>
                navigate("/admin/technologies")
              }
              className="cursor-pointer transition hover:text-blue-600"
            >
              Technologies
            </button>

            <span>/</span>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="cursor-pointer transition hover:text-blue-600"
            >
              Technology Details
            </button>

            <span>/</span>

            <span className="font-medium text-blue-600">
              Folder Details
            </span>
          </div>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-6 flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <section className="mb-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="p-6 md:p-8">

              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                <div className="flex items-start gap-4">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <Folder className="h-7 w-7" />
                  </div>

                  <div className="min-w-0">

                    <p className="text-sm font-medium text-blue-600">
                      Folder
                    </p>

                    <h1 className="mt-1 break-words text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                      {folder?.name ||
                        "Unnamed Folder"}
                    </h1>

                    {folder?.description && (
                      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                        {folder.description}
                      </p>
                    )}

                  </div>

                </div>

                <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">

                  <CalendarDays className="h-5 w-5 text-slate-500" />

                  <div>
                    <p className="text-xs text-slate-400">
                      Created
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {formatDate(
                        folder?.createdAt
                      )}
                    </p>
                  </div>

                </div>

              </div>

            </div>
          </section>

          <section className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <StatCard
              title="Total PDFs"
              value={statistics.totalPdfs}
              icon={FileText}
              iconClass="bg-blue-50 text-blue-600"
            />

            <StatCard
              title="Total Pages"
              value={statistics.totalPages}
              icon={BookOpenIcon}
              iconClass="bg-emerald-50 text-emerald-600"
            />

            <StatCard
              title="Total Chunks"
              value={statistics.totalChunks}
              icon={Layers3}
              iconClass="bg-purple-50 text-purple-600"
            />

          </section>

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 px-5 py-5 sm:px-6">

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    PDFs in this Folder
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    View all PDF documents stored inside this folder.
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">
                  <FileText className="h-4 w-4" />

                  {pdfs.length} PDF
                  {pdfs.length !== 1
                    ? "s"
                    : ""}
                </div>

              </div>

            </div>

            {pdfs.length === 0 ? (
              <div className="flex min-h-[300px] flex-col items-center justify-center px-6 py-12 text-center">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                  <FileText className="h-7 w-7 text-slate-400" />
                </div>

                <h3 className="mt-4 text-lg font-semibold text-slate-800">
                  No PDFs Found
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  There are no PDF documents in this folder.
                </p>

              </div>
            ) : (
              <>

                <div className="hidden overflow-x-auto lg:block">

                  <table className="w-full min-w-[1000px]">

                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-left">

                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Document
                        </th>

                        <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Pages
                        </th>

                        <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Chunks
                        </th>

                        <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          File Size
                        </th>

                        <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Status
                        </th>

                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Action
                        </th>

                      </tr>
                    </thead>

                    <tbody>

                      {pdfs.map((pdf) => (
                        <tr
                          key={pdf._id}
                          className="border-b border-slate-100 transition hover:bg-slate-50"
                        >

                          <td className="px-6 py-4">

                            <div className="flex min-w-[280px] items-center gap-3">

                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50">
                                <FileText className="h-5 w-5 text-red-500" />
                              </div>

                              <div className="min-w-0">

                                <p
                                  className="truncate text-sm font-semibold text-slate-900"
                                  title={
                                    pdf.originalName ||
                                    pdf.filename
                                  }
                                >
                                  {pdf.originalName ||
                                    pdf.filename ||
                                    "Untitled Document"}
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                  Added{" "}
                                  {formatDate(
                                    pdf.createdAt
                                  )}
                                </p>

                              </div>

                            </div>

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

                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <HardDrive className="h-4 w-4" />

                              {formatFileSize(
                                pdf.fileSize
                              )}
                            </div>

                          </td>

                          <td className="px-4 py-4">

                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                                pdf.status
                              )}`}
                            >
                              {getStatusLabel(
                                pdf.status
                              )}
                            </span>

                          </td>

                          <td className="px-6 py-4">

                            <div className="flex justify-end">

                              <button
                                type="button"
                                title="Open PDF"
                                onClick={() =>
                                  handleOpenPdf(
                                    pdf
                                  )
                                }
                                className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
                              >
                                <Eye className="h-4 w-4" />

                                Open PDF

                                <ExternalLink className="h-3.5 w-3.5" />
                              </button>

                            </div>

                          </td>

                        </tr>
                      ))}

                    </tbody>

                  </table>

                </div>

                <div className="grid grid-cols-1 gap-4 p-4 lg:hidden">

                  {pdfs.map((pdf) => (
                    <div
                      key={pdf._id}
                      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                    >

                      <div className="flex items-start gap-3">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50">
                          <FileText className="h-5 w-5 text-red-500" />
                        </div>

                        <div className="min-w-0 flex-1">

                          <h3
                            className="break-words text-sm font-semibold text-slate-900"
                            title={
                              pdf.originalName ||
                              pdf.filename
                            }
                          >
                            {pdf.originalName ||
                              pdf.filename ||
                              "Untitled Document"}
                          </h3>

                          <p className="mt-1 text-xs text-slate-500">
                            Added{" "}
                            {formatDate(
                              pdf.createdAt
                            )}
                          </p>

                        </div>

                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3">

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

                        <InfoBox
                          label="File Size"
                          value={formatFileSize(
                            pdf.fileSize
                          )}
                        />

                        <InfoBox
                          label="Status"
                          value={getStatusLabel(
                            pdf.status
                          )}
                        />

                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          handleOpenPdf(pdf)
                        }
                        className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        <Eye className="h-4 w-4" />

                        Open PDF

                        <ExternalLink className="h-4 w-4" />
                      </button>

                    </div>
                  ))}

                </div>

              </>
            )}

          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

const StatCard = ({
  title,
  value,
  icon: Icon,
  iconClass,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {Number(
              value || 0
            ).toLocaleString()}
          </p>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconClass}`}
        >
          <Icon className="h-7 w-7" />
        </div>

      </div>

    </div>
  );
};

const InfoBox = ({
  label,
  value,
}) => {
  return (
    <div className="rounded-xl bg-slate-50 p-3">

      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-1 truncate text-sm font-semibold text-slate-800">
        {value}
      </p>

    </div>
  );
};

const BookOpenIcon = (props) => {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 4h7a4 4 0 0 1 4 4v12a4 4 0 0 0-4-4H2z" />
      <path d="M22 4h-7a4 4 0 0 0-4 4v12a4 4 0 0 1 4-4h7z" />
    </svg>
  );
};

export default AdminFolderDetails;