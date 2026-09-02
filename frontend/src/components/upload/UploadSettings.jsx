import { useEffect, useState } from "react";
import {
  Cpu,
  FolderOpen,
} from "lucide-react";

import { getTechnologies } from "../../api/technologyApi";
import { getFoldersByTechnology } from "../../api/folderApi";
import { uploadPdf } from "../../api/pdfApi";

export default function UploadSettings({
  selectedFiles,
  setSelectedFiles,
}) {
  const [technologies, setTechnologies] = useState([]);
  const [folders, setFolders] = useState([]);

  const [technologyId, setTechnologyId] = useState("");
  const [folderId, setFolderId] = useState("");

  const [visibility, setVisibility] = useState("Private");

  const [loadingTechnologies, setLoadingTechnologies] =
    useState(false);

  const [loadingFolders, setLoadingFolders] =
    useState(false);

  const [uploading, setUploading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadTechnologies();
  }, []);

  const loadTechnologies = async () => {
    try {
      setLoadingTechnologies(true);
      setError("");

      const result = await getTechnologies();

      setTechnologies(result.data || []);
    } catch (error) {
      console.error(
        "Technology Loading Error:",
        error
      );

      setError(
        error.message ||
          "Failed to load technologies"
      );
    } finally {
      setLoadingTechnologies(false);
    }
  };

  const handleTechnologyChange = async (e) => {
    const selectedTechnologyId = e.target.value;

    setTechnologyId(selectedTechnologyId);
    setFolderId("");
    setFolders([]);
    setMessage("");
    setError("");

    if (!selectedTechnologyId) {
      return;
    }

    try {
      setLoadingFolders(true);

      const result =
        await getFoldersByTechnology(
          selectedTechnologyId
        );

      setFolders(result.data || []);
    } catch (error) {
      console.error(
        "Folder Loading Error:",
        error
      );

      setError(
        error.message ||
          "Failed to load folders"
      );
    } finally {
      setLoadingFolders(false);
    }
  };

  const handleUpload = async () => {
    setMessage("");
    setError("");

    if (selectedFiles.length === 0) {
      setError("Please select at least one PDF file.");
      return;
    }

    if (!technologyId) {
      setError("Please select a technology.");
      return;
    }

    if (!folderId) {
      setError("Please select a folder.");
      return;
    }

    try {
      setUploading(true);

      let successCount = 0;

      for (const file of selectedFiles) {
        await uploadPdf({
          file,
          technologyId,
          folderId,
          visibility,
        });

        successCount++;
      }

      setMessage(
        `${successCount} PDF${
          successCount > 1 ? "s" : ""
        } uploaded and processing started successfully.`
      );

      setSelectedFiles([]);
      setTechnologyId("");
      setFolderId("");
      setFolders([]);
      setVisibility("Private");

    } catch (error) {
      console.error(
        "PDF Upload Error:",
        error
      );

      setError(
        error.message ||
          "Failed to upload PDF"
      );
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    if (uploading) return;

    setSelectedFiles([]);
    setTechnologyId("");
    setFolderId("");
    setFolders([]);
    setVisibility("Private");
    setMessage("");
    setError("");
  };

  return (
    <section className="mt-5 bg-white rounded-2xl lg:rounded-3xl border border-gray-200 shadow-sm p-4 sm:p-6 lg:p-7">

      <div className="flex items-center gap-3 mb-5">

        <FolderOpen className="text-indigo-600 w-6 h-6" />

        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Upload Settings
        </h2>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>

          <label className="block text-sm cursor-pointer font-semibold text-gray-700 mb-2">
            Technology Category
          </label>

          <select
            value={technologyId}
            onChange={handleTechnologyChange}
            disabled={loadingTechnologies || uploading}
            className="w-full rounded-xl border cursor-pointer border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-gray-100"
          >

            <option value="">
              {loadingTechnologies
                ? "Loading technologies..."
                : "Select Technology"}
            </option>

            {technologies.map(
              (technology) => (
                <option
                  key={technology._id}
                  value={technology._id}
                >
                  {technology.name}
                </option>
              )
            )}

          </select>

        </div>

        <div>

          <label className="block text-sm cursor-pointer font-semibold text-gray-700 mb-2">
            Document Visibility
          </label>

          <select
            value={visibility}
            onChange={(e) =>
              setVisibility(e.target.value)
            }
            disabled={uploading}
            className="w-full rounded-xl border cursor-pointer border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-gray-100"
          >

            <option value="Private">
              🔒 Private
            </option>

            <option value="Public">
              🌍 Public
            </option>

            <option value="Team">
              👥 Team
            </option>

          </select>

          <p className="mt-2 text-sm text-gray-500">
            Control who can access this uploaded document.
          </p>

        </div>

      </div>

      <div className="mt-6">

        <label className="block text-sm cursor-pointer font-semibold text-gray-700 mb-2">
          Folder
        </label>

        <select
          value={folderId}
          onChange={(e) =>
            setFolderId(e.target.value)
          }
          disabled={
            !technologyId ||
            loadingFolders ||
            uploading
          }
          className="w-full rounded-xl border cursor-pointer border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-gray-100"
        >

          <option value="">
            {!technologyId
              ? "Select technology first"
              : loadingFolders
              ? "Loading folders..."
              : folders.length === 0
              ? "No folders available"
              : "Select Folder"}
          </option>

          {folders.map((folder) => (
            <option
              key={folder._id}
              value={folder._id}
            >
              {folder.name}
            </option>
          ))}

        </select>

      </div>

      {error && (
        <div className="mt-5 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {message && (
        <div className="mt-5 bg-green-50 border border-green-200 text-green-600 rounded-xl px-4 py-3 text-sm">
          {message}
        </div>
      )}

      <div className="mt-10 flex flex-col-reverse sm:flex-row justify-end gap-4">

        <button
          type="button"
          onClick={handleCancel}
          disabled={uploading}
          className="w-full cursor-pointer sm:w-auto px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleUpload}
          disabled={
            uploading ||
            selectedFiles.length === 0 ||
            !technologyId ||
            !folderId
          }
          className="w-full cursor-pointer sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >

          <Cpu size={18} />

          {uploading
            ? "Uploading & Processing..."
            : "Upload & Process"}

        </button>

      </div>

    </section>
  );
}