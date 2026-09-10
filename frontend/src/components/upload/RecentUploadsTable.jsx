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
import ConfirmModal from "../common/ConfirmModal";

export default function RecentUploadsTable() {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingPdfId, setDeletingPdfId] =
    useState(null);
  const [showAll, setShowAll] = useState(false);

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    pdf: null,
  });

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
      console.error(
        "Recent Uploads Error:",
        error
      );

      setError(
        error.message ||
          "Failed to load recent uploads"
      );
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) {
      return "0 KB";
    }

    const units = [
      "Bytes",
      "KB",
      "MB",
      "GB",
    ];

    const index = Math.floor(
      Math.log(bytes) / Math.log(1024)
    );

    const size =
      bytes /
      Math.pow(1024, index);

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
    yesterday.setDate(
      today.getDate() - 1
    );

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
      setError(
        "PDF ID is not available."
      );
      return;
    }

    const fileUrl =
      `${API_BASE_URL}/pdf/${pdf._id}/view`;

    window.open(
      fileUrl,
      "_blank"
    );
  };

  const openDeleteModal = (pdf) => {
    if (!pdf?._id) {
      setError(
        "PDF ID is not available."
      );
      return;
    }

    setError("");

    setConfirmModal({
      isOpen: true,
      pdf,
    });
  };

  const closeDeleteModal = () => {
    if (deletingPdfId) {
      return;
    }

    setConfirmModal({
      isOpen: false,
      pdf: null,
    });
  };

  const handleDeletePdf = async () => {
    const pdf = confirmModal.pdf;

    if (!pdf?._id) {
      setError(
        "PDF ID is not available."
      );

      setConfirmModal({
        isOpen: false,
        pdf: null,
      });

      return;
    }

    try {
      setDeletingPdfId(pdf._id);
      setError("");

      await deletePdf(pdf._id);

      setUploads((currentUploads) =>
        currentUploads.filter(
          (item) =>
            item._id !== pdf._id
        )
      );

      setConfirmModal({
        isOpen: false,
        pdf: null,
      });
    } catch (error) {
      console.error(
        "Delete PDF Error:",
        error
      );

      setError(
        error.message ||
          "Failed to delete PDF"
      );

      setConfirmModal({
        isOpen: false,
        pdf: null,
      });
    } finally {
      setDeletingPdfId(null);
    }
  };

  const visibleUploads = showAll
    ? uploads
    : uploads.slice(0, 5);

  if (loading) {
    return (
      <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Recent Uploads
          </h2>

          <p className="mt-1 text-gray-500">
            Your recently uploaded research
            documents.
          </p>
        </div>

        <div className="flex items-center justify-center py-16">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Recent Uploads
          </h2>

          <p className="mt-1 text-gray-500">
            Your recently uploaded research
            documents.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {uploads.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center">
            <FileText
              size={48}
              className="mx-auto text-gray-400"
            />

            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              No uploads yet
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Your uploaded PDF documents will
              appear here.
            </p>
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-4 text-left font-semibold text-gray-700">
                      Document
                    </th>

                    <th className="py-4 text-left font-semibold text-gray-700">
                      Technology
                    </th>

                    <th className="py-4 text-left font-semibold text-gray-700">
                      Pages
                    </th>

                    <th className="py-4 text-left font-semibold text-gray-700">
                      Size
                    </th>

                    <th className="py-4 text-left font-semibold text-gray-700">
                      Uploaded
                    </th>

                    <th className="py-4 text-left font-semibold text-gray-700">
                      Status
                    </th>

                    <th className="py-4 text-right font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {visibleUploads.map(
                    (item) => {
                      const status =
                        getStatusContent(
                          item.status
                        );

                      const StatusIcon =
                        status.icon;

                      return (
                        <tr
                          key={item._id}
                          className="border-b border-gray-100 transition hover:bg-gray-50"
                        >
                          <td className="py-4">
                            <div className="flex items-center gap-4">
                              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-red-100">
                                <FileText
                                  className="text-red-600"
                                  size={22}
                                />
                              </div>

                              <div className="min-w-0">
                                <h4 className="max-w-[260px] truncate font-semibold text-gray-900">
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
                            <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
                              {item
                                .technologyId
                                ?.name ||
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
                                  handleViewPdf(
                                    item
                                  )
                                }
                                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg transition hover:bg-indigo-100"
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
                                  openDeleteModal(
                                    item
                                  )
                                }
                                disabled={
                                  deletingPdfId ===
                                  item._id
                                }
                                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                                title="Delete PDF"
                              >
                                {deletingPdfId ===
                                item._id ? (
                                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-200 border-t-red-600"></div>
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
                    }
                  )}
                </tbody>
              </table>
            </div>

            <div className="space-y-5 lg:hidden">
              {visibleUploads.map(
                (item) => {
                  const status =
                    getStatusContent(
                      item.status
                    );

                  return (
                    <div
                      key={item._id}
                      className="rounded-2xl border border-gray-200 p-5"
                    >
                      <div className="flex justify-between gap-4">
                        <div className="flex min-w-0 gap-4">
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-red-100">
                            <FileText
                              className="text-red-600"
                              size={22}
                            />
                          </div>

                          <div className="min-w-0">
                            <h4 className="truncate font-semibold text-gray-900">
                              {item.originalName ||
                                item.filename}
                            </h4>

                            <p className="mt-1 text-sm text-gray-500">
                              {formatFileSize(
                                item.fileSize
                              )}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`h-fit whitespace-nowrap rounded-full px-3 py-1 text-sm ${
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

                      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">
                            Technology
                          </p>

                          <p className="mt-1 font-medium">
                            {item
                              .technologyId
                              ?.name ||
                              "Unknown"}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500">
                            Pages
                          </p>

                          <p className="mt-1 font-medium">
                            {item.pages ||
                              "-"}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500">
                            Uploaded
                          </p>

                          <p className="mt-1 font-medium">
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
                            className={`mt-1 font-medium ${status.className}`}
                          >
                            {status.text}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 flex gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            handleViewPdf(
                              item
                            )
                          }
                          className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-indigo-200 py-3 text-indigo-600 transition hover:bg-indigo-50"
                        >
                          <Eye size={17} />
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            openDeleteModal(
                              item
                            )
                          }
                          disabled={
                            deletingPdfId ===
                            item._id
                          }
                          className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-500 py-3 text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deletingPdfId ===
                          item._id ? (
                            <>
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-200 border-t-white"></div>
                              Deleting...
                            </>
                          ) : (
                            <>
                              <Trash2
                                size={17}
                              />
                              Delete
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                }
              )}
            </div>

            {uploads.length > 5 && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() =>
                    setShowAll(
                      (prev) => !prev
                    )
                  }
                  className="cursor-pointer rounded-xl border border-indigo-200 px-6 py-2.5 font-semibold text-indigo-600 transition hover:bg-indigo-50"
                >
                  {showAll
                    ? "View Less"
                    : `View More (${
                        uploads.length -
                        5
                      })`}
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <ConfirmModal
        isOpen={
          confirmModal.isOpen
        }
        onClose={closeDeleteModal}
        onConfirm={handleDeletePdf}
        title="Delete PDF"
        message={`Are you sure you want to permanently delete "${
          confirmModal.pdf
            ?.originalName ||
          confirmModal.pdf
            ?.filename ||
          "this PDF"
        }"? This action cannot be undone.`}
        confirmText="Delete PDF"
        cancelText="Cancel"
        type="danger"
        loading={
          deletingPdfId !== null
        }
        itemName={
          confirmModal.pdf
            ?.originalName ||
          confirmModal.pdf
            ?.filename ||
          ""
        }
      />
    </>
  );
}