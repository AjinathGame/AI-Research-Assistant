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

export default function TechnologyDetails() {
  const { technologyId } = useParams();
  const navigate = useNavigate();

  const [technology, setTechnology] = useState(null);
  const [folders, setFolders] = useState([]);

  const [selectedFolder, setSelectedFolder] = useState(null);
  const [pdfs, setPdfs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [pdfLoading, setPdfLoading] = useState(false);

  const [error, setError] = useState("");

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [folderName, setFolderName] = useState("");
  const [folderDescription, setFolderDescription] = useState("");

  const [creating, setCreating] = useState(false);
  const [deletingPdfId, setDeletingPdfId] = useState(null);

  const [deletingFolderId, setDeletingFolderId] = useState(null);
  const [openFolderMenu, setOpenFolderMenu] = useState(null);

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
    if (!folderName.trim()) return;

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

      closeCreateModal();
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

    const units = ["Bytes", "KB", "MB", "GB"];

    const index = Math.floor(
      Math.log(bytes) / Math.log(1024)
    );

    const size = bytes / Math.pow(1024, index);

    return `${size.toFixed(index === 0 ? 0 : 2)} ${units[index]
      }`;
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

  const handleDeleteFolder = async (folder) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${folder.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingFolderId(folder._id);
      setOpenFolderMenu(null);
      setError("");

      await deleteFolder(folder._id);

      setFolders((currentFolders) =>
        currentFolders.filter(
          (item) => item._id !== folder._id
        )
      );
    } catch (error) {
      console.error("Delete Folder Error:", error);

      setError(
        error.message || "Failed to delete folder"
      );
    } finally {
      setDeletingFolderId(null);
    }
  };

  const handleViewPdf = (pdf) => {
    if (!pdf?._id) {
      setError("PDF ID is not available.");
      return;
    }

    const fileUrl = `http://localhost:5000/api/pdf/${pdf._id}/view`;

    window.open(fileUrl, "_blank");
  };

  const handleDeletePdf = async (pdf) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${pdf.originalName || pdf.filename}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingPdfId(pdf._id);
      setError("");

      await deletePdf(pdf._id);

      setPdfs((currentPdfs) =>
        currentPdfs.filter(
          (item) => item._id !== pdf._id
        )
      );
    } catch (error) {
      console.error("Delete PDF Error:", error);

      setError(
        error.message || "Failed to delete PDF"
      );
    } finally {
      setDeletingPdfId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!technology) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Technology Not Found
          </h1>

          <p className="mt-2 text-red-500">
            {error ||
              "The selected technology does not exist."}
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer"
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
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">

          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 flex-wrap">

            <button
              onClick={() => navigate("/dashboard")}
              className="hover:text-indigo-600 cursor-pointer"
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

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

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
                onClick={openCreateModal}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition cursor-pointer"
              >
                <Plus size={18} />
                Create Folder
              </button>
            )}

          </div>

        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        {!selectedFolder && (
          <div>

            <div className="flex items-center justify-between mb-5">

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
              <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-12 text-center">

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
                  onClick={openCreateModal}
                  className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer"
                >
                  <Plus size={17} />
                  Create Folder
                </button>

              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {folders.map((folder) => (
                  <div
                    key={folder._id}
                    className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition"
                  >

                    <div className="flex items-start justify-between">

                      <div className="w-14 h-14 rounded-xl bg-yellow-100 flex items-center justify-center">
                        <Folder
                          size={30}
                          className="text-yellow-600"
                        />
                      </div>

                      <div className="relative">
                        <button
                          onClick={() =>
                            setOpenFolderMenu(
                              openFolderMenu === folder._id
                                ? null
                                : folder._id
                            )
                          }
                          className="text-gray-400 hover:text-gray-700 cursor-pointer p-1 rounded-lg hover:bg-gray-100"
                        >
                          <MoreVertical size={20} />
                        </button>

                        {openFolderMenu === folder._id && (
                          <div className="absolute right-0 top-9 z-20 w-40 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                            <button
                              onClick={() =>
                                handleDeleteFolder(folder)
                              }
                              disabled={
                                deletingFolderId === folder._id
                              }
                              className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 cursor-pointer disabled:opacity-50"
                            >
                              {deletingFolderId === folder._id
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

                    <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                      {folder.description ||
                        "Study materials and documents."}
                    </p>

                    <div className="flex items-center justify-between mt-7">

                      <span className="text-sm text-gray-400">
                        Folder
                      </span>

                      <button
                        onClick={() => openFolder(folder)}
                        className="text-indigo-600 font-semibold hover:text-indigo-700 cursor-pointer"
                      >
                        Open →
                      </button>

                    </div>

                  </div>
                ))}

              </div>
            )}

          </div>
        )}

        {selectedFolder && (
          <div>

            <button
              onClick={goBack}
              className="flex items-center gap-2 mb-6 text-indigo-600 font-medium hover:text-indigo-700 cursor-pointer"
            >
              <ArrowLeft size={18} />
              Back to Folders
            </button>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

              <div>

                <h2 className="text-xl font-semibold text-gray-900">
                  PDF Documents
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {pdfLoading
                    ? "Loading documents..."
                    : `${pdfs.length} ${pdfs.length === 1
                      ? "document"
                      : "documents"
                    } available`}
                </p>

              </div>

            </div>

            {pdfLoading ? (
              <div className="bg-white border border-gray-200 rounded-2xl py-16 flex justify-center">

                <div className="w-9 h-9 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>

              </div>
            ) : pdfs.length === 0 ? (
              <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-12 text-center">

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
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

                {pdfs.map((pdf, index) => (
                  <div
                    key={pdf._id}
                    className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 hover:bg-gray-50 transition ${index !== pdfs.length - 1
                      ? "border-b border-gray-100"
                      : ""
                      }`}
                  >

                    <div className="flex items-center gap-4 min-w-0">

                      <div className="w-11 h-11 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">

                        <FileText
                          size={22}
                          className="text-red-600"
                        />

                      </div>

                      <div className="min-w-0">

                        <h3 className="font-medium text-gray-900 truncate">
                          {pdf.originalName ||
                            pdf.filename}
                        </h3>

                        <div className="flex items-center gap-3 mt-1 flex-wrap">

                          <span className="text-sm text-gray-500">
                            {formatFileSize(
                              pdf.fileSize
                            )}
                          </span>

                          <span className="text-gray-300">
                            •
                          </span>

                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusStyle(
                              pdf.status
                            )}`}
                          >
                            {pdf.status ||
                              "uploaded"}
                          </span>

                        </div>

                      </div>

                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <button
                        onClick={() => handleViewPdf(pdf)}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-indigo-600 border border-indigo-200 rounded-lg font-medium hover:bg-indigo-50 transition cursor-pointer"
                      >
                        <ExternalLink size={16} />
                        View
                      </button>
                      <button
                        onClick={() => handleDeletePdf(pdf)}
                        disabled={deletingPdfId === pdf._id}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-red-600 border border-red-200 rounded-lg font-medium hover:bg-red-50 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {deletingPdfId === pdf._id
                          ? "Deleting..."
                          : "Delete"}
                      </button>

                    </div>
                  </div>
                ))}

              </div>
            )}

          </div>
        )}

      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">

            <div className="flex items-center justify-between mb-5">

              <div>

                <h2 className="text-xl font-bold text-gray-900">
                  Create New Folder
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Create a folder inside{" "}
                  {technology.name}.
                </p>

              </div>

              <button
                onClick={closeCreateModal}
                disabled={creating}
                className="text-gray-400 hover:text-gray-700 cursor-pointer disabled:opacity-50"
              >
                <X size={22} />
              </button>

            </div>

            <div className="space-y-4">

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Folder Name
                </label>

                <input
                  type="text"
                  value={folderName}
                  onChange={(e) =>
                    setFolderName(e.target.value)
                  }
                  placeholder="Enter folder name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />

              </div>

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>

                <textarea
                  value={folderDescription}
                  onChange={(e) =>
                    setFolderDescription(
                      e.target.value
                    )
                  }
                  placeholder="Enter folder description"
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />

              </div>

            </div>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={closeCreateModal}
                disabled={creating}
                className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={createNewFolder}
                disabled={
                  !folderName.trim() || creating
                }
                className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {creating
                  ? "Creating..."
                  : "Create"}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}