import { useEffect, useState } from "react";
import {
  Eye,
  Trash2,
  FileText,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

import {
  getPdfList,
  deletePdf,
} from "../../api/pdfApi";

import API_BASE_URL from "../../api/api";

export default function RecentUploadsTable() {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingPdfId, setDeletingPdfId] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    loadUploads();
  }, []);

  const loadUploads = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getPdfList();

      setUploads(result.data || []);
    } catch (error) {
      console.error("Recent Uploads Error:", error);

      setError(
        error.message || "Failed to load recent uploads"
      );
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) {
      return "0 KB";
    }

    const units = ["Bytes", "KB", "MB", "GB"];

    const index = Math.floor(
      Math.log(bytes) / Math.log(1024)
    );

    const size =
      bytes / Math.pow(1024, index);

    return `${size.toFixed(
      index === 0 ? 0 : 2
    )} ${units[index]}`;
  };

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    const uploadDate = new Date(date);

    const today = new Date();

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (
      uploadDate.toDateString() ===
      today.toDateString()
    ) {
      return "Today";
    }

    if (
      uploadDate.toDateString() ===
      yesterday.toDateString()
    ) {
      return "Yesterday";
    }

    return uploadDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const getStatusContent = (status) => {
    switch (status) {
      case "processed":
        return {
          icon: CheckCircle2,
          text: "Completed",
          className: "text-green-600",
        };

      case "processing":
        return {
          icon: Clock3,
          text: "Processing",
          className: "text-yellow-600",
        };

      case "failed":
        return {
          icon: XCircle,
          text: "Failed",
          className: "text-red-600",
        };

      case "uploaded":
      default:
        return {
          icon: Clock3,
          text: "Uploaded",
          className: "text-blue-600",
        };
    }
  };

  const handleViewPdf = (pdf) => {
    if (!pdf?._id) {
      setError("PDF ID is not available.");
      return;
    }

    const fileUrl =
      `${API_BASE_URL}/pdf/${pdf._id}/view`;

    window.open(fileUrl, "_blank");
  };

  const handleDeletePdf = async (pdf) => {
    const fileName =
      pdf.originalName || pdf.filename;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${fileName}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingPdfId(pdf._id);
      setError("");

      await deletePdf(pdf._id);

      setUploads((currentUploads) =>
        currentUploads.filter(
          (item) => item._id !== pdf._id
        )
      );
    } catch (error) {
      console.error(
        "Delete PDF Error:",
        error
      );

      setError(
        error.message ||
          "Failed to delete PDF"
      );
    } finally {
      setDeletingPdfId(null);
    }
  };

  const visibleUploads = showAll
    ? uploads
    : uploads.slice(0, 5);

  if (loading) {
    return (
      <section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5 sm:p-6 lg:p-8">

        <div className="mb-8">

          <h2 className="text-2xl font-bold text-gray-900">
            Recent Uploads
          </h2>

          <p className="text-gray-500 mt-1">
            Your recently uploaded research documents.
          </p>

        </div>

        <div className="flex items-center justify-center py-16">

          <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>

        </div>

      </section>
    );
  }

  return (
    <section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5 sm:p-6 lg:p-8">

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-gray-900">
          Recent Uploads
        </h2>

        <p className="text-gray-500 mt-1">
          Your recently uploaded research documents.
        </p>

      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {uploads.length === 0 ? (
        <div className="border border-dashed border-gray-300 rounded-2xl p-10 text-center">

          <FileText
            size={48}
            className="mx-auto text-gray-400"
          />

          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            No uploads yet
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Your uploaded PDF documents will appear here.
          </p>

        </div>
      ) : (
        <>
          {/* Desktop */}

          <div className="hidden lg:block overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-gray-200">

                  <th className="text-left py-4 font-semibold text-gray-700">
                    Document
                  </th>

                  <th className="text-left py-4 font-semibold text-gray-700">
                    Technology
                  </th>

                  <th className="text-left py-4 font-semibold text-gray-700">
                    Pages
                  </th>

                  <th className="text-left py-4 font-semibold text-gray-700">
                    Size
                  </th>

                  <th className="text-left py-4 font-semibold text-gray-700">
                    Uploaded
                  </th>

                  <th className="text-left py-4 font-semibold text-gray-700">
                    Status
                  </th>

                  <th className="text-right py-4 font-semibold text-gray-700">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {visibleUploads.map((item) => {

                  const status =
                    getStatusContent(
                      item.status
                    );

                  const StatusIcon =
                    status.icon;

                  return (
                    <tr
                      key={item._id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >

                      <td className="py-4">

                        <div className="flex items-center gap-4">

                          <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">

                            <FileText
                              className="text-red-600"
                              size={22}
                            />

                          </div>

                          <div className="min-w-0">

                            <h4 className="font-semibold text-gray-900 truncate max-w-[260px]">
                              {item.originalName ||
                                item.filename}
                            </h4>

                            <p className="text-sm text-gray-500">
                              PDF Document
                            </p>

                          </div>

                        </div>

                      </td>

                      <td>

                        <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">

                          {item.technologyId?.name ||
                            "Unknown"}

                        </span>

                      </td>

                      <td>
                        {item.pages || "-"}
                      </td>

                      <td>
                        {formatFileSize(
                          item.fileSize
                        )}
                      </td>

                      <td>
                        {formatDate(
                          item.createdAt
                        )}
                      </td>

                      <td>

                        <span
                          className={`inline-flex items-center gap-2 ${status.className}`}
                        >

                          <StatusIcon
                            size={18}
                          />

                          {status.text}

                        </span>

                      </td>

                      <td>

                        <div className="flex justify-end gap-3">

                          <button
                            type="button"
                            onClick={() =>
                              handleViewPdf(item)
                            }
                            className="w-10 h-10 cursor-pointer rounded-lg hover:bg-indigo-100 flex items-center justify-center transition"
                            title="View PDF"
                          >

                            <Eye
                              size={18}
                              className="text-indigo-600"
                            />

                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDeletePdf(item)
                            }
                            disabled={
                              deletingPdfId ===
                              item._id
                            }
                            className="w-10 h-10 cursor-pointer rounded-lg hover:bg-red-100 flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete PDF"
                          >

                            {deletingPdfId ===
                            item._id ? (
                              <div className="w-4 h-4 border-2 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
                            ) : (
                              <Trash2
                                size={18}
                                className="text-red-500"
                              />
                            )}

                          </button>

                        </div>

                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>

          {/* Mobile */}

          <div className="lg:hidden space-y-5">

            {visibleUploads.map((item) => {

              const status =
                getStatusContent(
                  item.status
                );

              return (
                <div
                  key={item._id}
                  className="border border-gray-200 rounded-2xl p-5"
                >

                  <div className="flex justify-between gap-4">

                    <div className="flex gap-4 min-w-0">

                      <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">

                        <FileText
                          className="text-red-600"
                          size={22}
                        />

                      </div>

                      <div className="min-w-0">

                        <h4 className="font-semibold text-gray-900 truncate">
                          {item.originalName ||
                            item.filename}
                        </h4>

                        <p className="text-gray-500 text-sm mt-1">
                          {formatFileSize(
                            item.fileSize
                          )}
                        </p>

                      </div>

                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm h-fit whitespace-nowrap ${
                        item.status ===
                        "processed"
                          ? "bg-green-100 text-green-700"
                          : item.status ===
                            "processing"
                          ? "bg-yellow-100 text-yellow-700"
                          : item.status ===
                            "failed"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {status.text}
                    </span>

                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6 text-sm">

                    <div>

                      <p className="text-gray-500">
                        Technology
                      </p>

                      <p className="font-medium mt-1">
                        {item.technologyId?.name ||
                          "Unknown"}
                      </p>

                    </div>

                    <div>

                      <p className="text-gray-500">
                        Pages
                      </p>

                      <p className="font-medium mt-1">
                        {item.pages || "-"}
                      </p>

                    </div>

                    <div>

                      <p className="text-gray-500">
                        Uploaded
                      </p>

                      <p className="font-medium mt-1">
                        {formatDate(
                          item.createdAt
                        )}
                      </p>

                    </div>

                    <div>

                      <p className="text-gray-500">
                        Status
                      </p>

                      <p
                        className={`font-medium mt-1 ${status.className}`}
                      >
                        {status.text}
                      </p>

                    </div>

                  </div>

                  <div className="flex gap-3 mt-6">

                    <button
                      type="button"
                      onClick={() =>
                        handleViewPdf(item)
                      }
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-200 text-indigo-600 py-3 hover:bg-indigo-50 transition cursor-pointer"
                    >

                      <Eye size={17} />

                      View

                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDeletePdf(item)
                      }
                      disabled={
                        deletingPdfId ===
                        item._id
                      }
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-red-500 text-white py-3 hover:bg-red-600 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >

                      {deletingPdfId ===
                      item._id ? (
                        <>
                          <div className="w-4 h-4 border-2 border-red-200 border-t-white rounded-full animate-spin"></div>

                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 size={17} />

                          Delete
                        </>
                      )}

                    </button>

                  </div>

                </div>
              );
            })}

          </div>

          {/* View More / View Less */}

          {uploads.length > 5 && (
            <div className="flex justify-center mt-8">

              <button
                type="button"
                onClick={() =>
                  setShowAll((prev) => !prev)
                }
                className="px-6 py-2.5 rounded-xl border border-indigo-200 text-indigo-600 font-semibold hover:bg-indigo-50 transition cursor-pointer"
              >

                {showAll
                  ? "View Less"
                  : `View More (${uploads.length - 5})`}

              </button>

            </div>
          )}

        </>
      )}

    </section>
  );
}