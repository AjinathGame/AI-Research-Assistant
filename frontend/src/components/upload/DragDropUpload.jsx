import { UploadCloud, FileText } from "lucide-react";
import { useRef, useState } from "react";

export default function DragDropUpload() {
  const inputRef = useRef(null);

  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFiles = (files) => {
    const pdfFiles = [...files].filter(
      (file) => file.type === "application/pdf"
    );

    setSelectedFiles(pdfFiles);
  };

  return (
    <section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-2 sm:p-4 lg:p-4">

      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".pdf"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <div
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`cursor-pointer rounded-3xl border-2 border-dashed transition-all duration-300
        ${
          dragActive
            ? "border-indigo-600 bg-indigo-50"
            : "border-gray-300 hover:border-indigo-500 hover:bg-gray-50"
        }`}
      >
        <div className="py-5 flex flex-col items-center">

          <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center">

            <UploadCloud
              size={44}
              className="text-indigo-600"
            />

          </div>

          <h2 className="mt-8 text-3xl font-bold text-gray-900">
            Drag & Drop PDF Files
          </h2>

          <p className="mt-3 text-gray-500">
            Upload your research notes, books and study materials.
          </p>

          <button
            className="mt-5 bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition"
          >
            Browse Files
          </button>

          <div className="mt-8 flex gap-8 text-sm text-gray-500">

            <span>📄 PDF Only</span>

            <span>Maximum 50 MB</span>

            <span>Multiple Files Supported</span>

          </div>

        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-8">

          <h3 className="font-semibold text-lg mb-4">
            Selected Files
          </h3>

          <div className="space-y-4">

            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex justify-between items-center rounded-2xl border p-5"
              >
                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                    <FileText
                      className="text-red-500"
                      size={24}
                    />
                  </div>

                  <div>

                    <h4 className="font-semibold">
                      {file.name}
                    </h4>

                    <p className="text-sm text-gray-500">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>

                  </div>

                </div>

                <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                  Ready
                </span>

              </div>
            ))}

          </div>

        </div>
      )}

    </section>
  );
}