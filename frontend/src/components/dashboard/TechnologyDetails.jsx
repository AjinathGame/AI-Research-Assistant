import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Folder,
  ChevronRight,
  FileText,
  ArrowLeft,
  MoreVertical,
  Plus,
  X,
  ExternalLink,
  Loader2,
} from "lucide-react";

import { getTechnologyById } from "../../api/technologyApi";

import {
  getFoldersByTechnology,
  createFolder,
  deleteFolder,
} from "../../api/folderApi";

import {
  getPdfsByFolder,
  deletePdf,
} from "../../api/pdfApi";

import ConfirmModal from "../common/ConfirmModal";

export default function TechnologyDetails() {
  const { technologyId } = useParams();
  const navigate = useNavigate();

  const [technology, setTechnology] = useState(null);
  const [folders, setFolders] = useState([]);

  const [selectedFolder, setSelectedFolder] = useState(null);
  const [pdfs, setPdfs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [viewingPdfId, setViewingPdfId] = useState(null);

  const [error, setError] = useState("");

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [folderName, setFolderName] = useState("");
  const [folderDescription, setFolderDescription] = useState("");

  const [creating, setCreating] = useState(false);

  const [deletingPdfId, setDeletingPdfId] = useState(null);
  const [deletingFolderId, setDeletingFolderId] = useState(null);

  const [openFolderMenu, setOpenFolderMenu] = useState(null);

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    type: null,
    item: null,
  });

  useEffect(() => {
    loadTechnology();
  }, [technologyId]);

  const loadTechnology = async () => {
    try {
      setLoading(true);
      setError("");

      const technologyResult =
        await getTechnologyById(technologyId);

      setTechnology(technologyResult.data);

      const folderResult =
        await getFoldersByTechnology(technologyId);

      setFolders(folderResult.data || []);
    } catch (error) {
      console.error("Technology Details Error:", error);

      setError(
        error.message || "Failed to load technology"
      );
    } finally {
      setLoading(false);
    }
  };

  const openFolder = async (folder) => {
    try {
      setSelectedFolder(folder);
      setPdfs([]);
      setPdfLoading(true);
      setError("");

      const result = await getPdfsByFolder(folder._id);

      setPdfs(result.data || []);
    } catch (error) {
      console.error("Get PDFs Error:", error);

      setError(
        error.message || "Failed to load PDF documents"
      );
    } finally {
      setPdfLoading(false);
    }
  };

  const goBack = () => {
    setSelectedFolder(null);
    setPdfs([]);
    setError("");
  };

  const openCreateModal = () => {
    setFolderName("");
    setFolderDescription("");
    setError("");
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    if (creating) return;

    setShowCreateModal(false);
    setFolderName("");
    setFolderDescription("");
  };

  const createNewFolder = async () => {
    if (!folderName.trim()) {
      return;
    }

    try {
      setCreating(true);
      setError("");

      const slug = folderName
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      const result = await createFolder({
        name: folderName.trim(),
        slug,
        description: folderDescription.trim(),
        technologyId,
      });

      const newFolder = result.data;

      setFolders((currentFolders) => [
        ...currentFolders,
        newFolder,
      ]);

      setShowCreateModal(false);
      setFolderName("");
      setFolderDescription("");
    } catch (error) {
      console.error("Create Folder Error:", error);

      setError(
        error.message || "Failed to create folder"
      );
    } finally {
      setCreating(false);
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
      bytes / Math.pow(1024, index);

    return `${size.toFixed(
      index === 0 ? 0 : 2
    )} ${units[index]}`;
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "processed":
        return "bg-green-100 text-green-700";

      case "processing":
        return "bg-yellow-100 text-yellow-700";

      case "failed":
        return "bg-red-100 text-red-700";

      case "uploaded":
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  const openDeleteFolderModal = (folder) => {
    if (!folder?._id) {
      setError("Folder ID is not available.");
      return;
    }

    setOpenFolderMenu(null);
    setError("");

    setConfirmModal({
      isOpen: true,
      type: "folder",
      item: folder,
    });
  };

  const openDeletePdfModal = (pdf) => {
    if (!pdf?._id) {
      setError("PDF ID is not available.");
      return;
    }

    setError("");

    setConfirmModal({
      isOpen: true,
      type: "pdf",
      item: pdf,
    });
  };

  const closeConfirmModal = () => {
    if (
      deletingFolderId ||
      deletingPdfId
    ) {
      return;
    }

    setConfirmModal({
      isOpen: false,
      type: null,
      item: null,
    });
  };

  const handleConfirmDelete = async () => {
    const { type, item } = confirmModal;

    if (!item?._id) {
      setError(
        type === "folder"
          ? "Folder ID is not available."
          : "PDF ID is not available."
      );

      setConfirmModal({
        isOpen: false,
        type: null,
        item: null,
      });

      return;
    }

    try {
      setError("");

      if (type === "folder") {
        setDeletingFolderId(item._id);

        await deleteFolder(item._id);

        setFolders((currentFolders) =>
          currentFolders.filter(
            (folder) =>
              folder._id !== item._id
          )
        );

        if (
          selectedFolder?._id ===
          item._id
        ) {
          setSelectedFolder(null);
          setPdfs([]);
        }
      }

      if (type === "pdf") {
        setDeletingPdfId(item._id);

        await deletePdf(item._id);

        setPdfs((currentPdfs) =>
          currentPdfs.filter(
            (pdf) =>
              pdf._id !== item._id
          )
        );
      }

      setConfirmModal({
        isOpen: false,
        type: null,
        item: null,
      });
    } catch (error) {
      console.error(
        `Delete ${
          type === "folder"
            ? "Folder"
            : "PDF"
        } Error:`,
        error
      );

      setError(
        error.message ||
          `Failed to delete ${
            type === "folder"
              ? "folder"
              : "PDF"
          }`
      );

      setConfirmModal({
        isOpen: false,
        type: null,
        item: null,
      });
    } finally {
      setDeletingFolderId(null);
      setDeletingPdfId(null);
    }
  };

  const handleViewPdf = async (pdf) => {
    if (!pdf?._id) {
      setError("PDF ID is not available.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setError(
        "Authentication token not found. Please login again."
      );
      return;
    }

    const newWindow = window.open(
      "",
      "_blank"
    );

    if (!newWindow) {
      setError(
        "Unable to open PDF. Please try again."
      );
      return;
    }

    try {
      setViewingPdfId(pdf._id);
      setError("");

      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Opening PDF...</title>
          </head>
          <body style="
            margin:0;
            display:flex;
            align-items:center;
            justify-content:center;
            height:100vh;
            font-family:Arial,sans-serif;
            background:#f8fafc;
          ">
            <div style="text-align:center;">
              <div style="
                font-size:18px;
                font-weight:600;
                color:#374151;
              ">
                Opening PDF...
              </div>

              <div style="
                margin-top:8px;
                font-size:14px;
                color:#6b7280;
              ">
                Please wait
              </div>
            </div>
          </body>
        </html>
      `);

      const response = await fetch(
        `http://localhost:5000/api/pdf/${pdf._id}/view`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        let message = "Failed to open PDF";

        try {
          const data = await response.json();
          message =
            data.message || message;
        } catch {
          message = "Failed to open PDF";
        }

        throw new Error(message);
      }

      const blob = await response.blob();

      const blobUrl =
        URL.createObjectURL(blob);

      newWindow.location.href = blobUrl;

      setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
      }, 60000);
    } catch (error) {
      console.error(
        "View PDF Error:",
        error
      );

      newWindow.close();

      setError(
        error.message ||
          "Unable to open this PDF."
      );
    } finally {
      setViewingPdfId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
      </div>
    );
  }

  if (!technology) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Technology Not Found
          </h1>

          <p className="mt-2 text-red-500">
            {error ||
              "The selected technology does not exist."}
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/dashboard")
            }
            className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-6 py-8 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <button
              type="button"
              onClick={() =>
                navigate("/dashboard")
              }
              className="cursor-pointer hover:text-indigo-600"
            >
              Dashboard
            </button>

            <ChevronRight size={16} />

            <span>Technologies</span>

            <ChevronRight size={16} />

            <span>
              {technology.name}
            </span>

            {selectedFolder && (
              <>
                <ChevronRight size={16} />

                <span>
                  {selectedFolder.name}
                </span>
              </>
            )}
          </div>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {selectedFolder
                  ? selectedFolder.name
                  : technology.name}
              </h1>

              <p className="mt-2 text-gray-500">
                {selectedFolder
                  ? "PDF documents available in this folder."
                  : technology.description ||
                    "Manage your study materials and documents."}
              </p>
            </div>

            {!selectedFolder && (
              <button
                type="button"
                onClick={
                  openCreateModal
                }
                className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-700"
              >
                <Plus size={18} />
                Create Folder
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="mb-6 flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            <span>{error}</span>

            <button
              type="button"
              onClick={() =>
                setError("")
              }
              className="cursor-pointer rounded-md p-1 hover:bg-red-100"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {!selectedFolder && (
          <div>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Folders
              </h2>

              {folders.length > 0 && (
                <span className="text-sm text-gray-500">
                  {folders.length}{" "}
                  {folders.length === 1
                    ? "folder"
                    : "folders"}
                </span>
              )}
            </div>

            {folders.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
                <Folder
                  size={50}
                  className="mx-auto text-gray-400"
                />

                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  No folders yet
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Create a folder to organize your study materials.
                </p>

                <button
                  type="button"
                  onClick={
                    openCreateModal
                  }
                  className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                >
                  <Plus size={17} />
                  Create Folder
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {folders.map(
                  (folder) => (
                    <div
                      key={folder._id}
                      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-100">
                          <Folder
                            size={30}
                            className="text-yellow-600"
                          />
                        </div>

                        <div className="relative">
                          <button
                            type="button"
                            onClick={() =>
                              setOpenFolderMenu(
                                openFolderMenu ===
                                  folder._id
                                  ? null
                                  : folder._id
                              )
                            }
                            className="cursor-pointer rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                          >
                            <MoreVertical
                              size={20}
                            />
                          </button>

                          {openFolderMenu ===
                            folder._id && (
                            <div className="absolute right-0 top-9 z-20 w-40 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                              <button
                                type="button"
                                onClick={() =>
                                  openDeleteFolderModal(
                                    folder
                                  )
                                }
                                disabled={
                                  deletingFolderId ===
                                  folder._id
                                }
                                className="w-full cursor-pointer px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {deletingFolderId ===
                                folder._id
                                  ? "Deleting..."
                                  : "Delete Folder"}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <h2 className="mt-6 text-xl font-semibold text-gray-900">
                        {folder.name}
                      </h2>

                      <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                        {folder.description ||
                          "Study materials and documents."}
                      </p>

                      <div className="mt-7 flex items-center justify-between">
                        <span className="text-sm text-gray-400">
                          Folder
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            openFolder(
                              folder
                            )
                          }
                          className="cursor-pointer font-semibold text-indigo-600 hover:text-indigo-700"
                        >
                          Open →
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        )}

        {selectedFolder && (
          <div>
            <button
              type="button"
              onClick={goBack}
              className="mb-6 flex cursor-pointer items-center gap-2 font-medium text-indigo-600 hover:text-indigo-700"
            >
              <ArrowLeft size={18} />
              Back to Folders
            </button>

            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  PDF Documents
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {pdfLoading
                    ? "Loading documents..."
                    : `${pdfs.length} ${
                        pdfs.length === 1
                          ? "document"
                          : "documents"
                      } available`}
                </p>
              </div>
            </div>

            {pdfLoading ? (
              <div className="flex justify-center rounded-2xl border border-gray-200 bg-white py-16">
                <div className="h-9 w-9 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
              </div>
            ) : pdfs.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
                <FileText
                  size={50}
                  className="mx-auto text-gray-400"
                />

                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  No PDF documents
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  No PDFs have been uploaded to this folder yet.
                </p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                {pdfs.map(
                  (pdf, index) => (
                    <div
                      key={pdf._id}
                      className={`flex flex-col gap-4 p-5 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between ${
                        index !==
                        pdfs.length - 1
                          ? "border-b border-gray-100"
                          : ""
                      }`}
                    >
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-red-100">
                          <FileText
                            size={22}
                            className="text-red-600"
                          />
                        </div>

                        <div className="min-w-0">
                          <h3 className="truncate font-medium text-gray-900">
                            {pdf.originalName ||
                              pdf.filename}
                          </h3>

                          <div className="mt-1 flex flex-wrap items-center gap-3">
                            <span className="text-sm text-gray-500">
                              {formatFileSize(
                                pdf.fileSize
                              )}
                            </span>

                            <span className="text-gray-300">
                              •
                            </span>

                            <span
                              className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${getStatusStyle(
                                pdf.status
                              )}`}
                            >
                              {pdf.status ||
                                "uploaded"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-shrink-0 items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            handleViewPdf(
                              pdf
                            )
                          }
                          disabled={
                            viewingPdfId ===
                            pdf._id
                          }
                          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-indigo-200 px-4 py-2 font-medium text-indigo-600 transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {viewingPdfId ===
                          pdf._id ? (
                            <>
                              <Loader2
                                size={16}
                                className="animate-spin"
                              />
                              Opening...
                            </>
                          ) : (
                            <>
                              <ExternalLink
                                size={16}
                              />
                              View
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            openDeletePdfModal(
                              pdf
                            )
                          }
                          disabled={
                            deletingPdfId ===
                            pdf._id
                          }
                          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2 font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deletingPdfId ===
                          pdf._id ? (
                            <>
                              <Loader2
                                size={16}
                                className="animate-spin"
                              />
                              Deleting...
                            </>
                          ) : (
                            "Delete"
                          )}
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Create New Folder
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Create a folder inside{" "}
                  {technology.name}.
                </p>
              </div>

              <button
                type="button"
                onClick={
                  closeCreateModal
                }
                disabled={creating}
                className="cursor-pointer text-gray-400 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={22} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Folder Name
                </label>

                <input
                  type="text"
                  value={folderName}
                  onChange={(e) =>
                    setFolderName(
                      e.target.value
                    )
                  }
                  placeholder="Enter folder name"
                  disabled={creating}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description
                </label>

                <textarea
                  value={
                    folderDescription
                  }
                  onChange={(e) =>
                    setFolderDescription(
                      e.target.value
                    )
                  }
                  placeholder="Enter folder description"
                  rows={3}
                  disabled={creating}
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={
                  closeCreateModal
                }
                disabled={creating}
                className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2.5 font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  createNewFolder
                }
                disabled={
                  !folderName.trim() ||
                  creating
                }
                className="cursor-pointer rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {creating
                  ? "Creating..."
                  : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={
          confirmModal.isOpen
        }
        onClose={
          closeConfirmModal
        }
        onConfirm={
          handleConfirmDelete
        }
        title={
          confirmModal.type ===
          "folder"
            ? "Delete Folder"
            : "Delete PDF"
        }
        message={
          confirmModal.type ===
          "folder"
            ? `Are you sure you want to permanently delete "${
                confirmModal.item?.name ||
                "this folder"
              }"? This action cannot be undone.`
            : `Are you sure you want to permanently delete "${
                confirmModal.item
                  ?.originalName ||
                confirmModal.item
                  ?.filename ||
                "this PDF"
              }"? This action cannot be undone.`
        }
        confirmText={
          confirmModal.type ===
          "folder"
            ? "Delete Folder"
            : "Delete PDF"
        }
        cancelText="Cancel"
        type="danger"
        loading={
          deletingFolderId !== null ||
          deletingPdfId !== null
        }
        itemName={
          confirmModal.type ===
          "folder"
            ? confirmModal.item
                ?.name || ""
            : confirmModal.item
                ?.originalName ||
              confirmModal.item
                ?.filename ||
              ""
        }
      />
    </div>
  );
}