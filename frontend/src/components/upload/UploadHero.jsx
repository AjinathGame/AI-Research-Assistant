import { UploadCloud } from "lucide-react";

export default function UploadHero() {
  return (
    <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-1 py-1">
      
      <div className="max-w-3xl">
        <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-indigo-600">
          Upload PDF
        </p>

        <h1 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
          Upload Your PDFs
        </h1>

        <p className="mt-3 text-base sm:text-lg text-gray-500 leading-7 sm:leading-8">
          Upload chapter-wise PDFs for your research knowledge platform.
          Every document is automatically processed through
          <span className="font-semibold text-gray-700">
            {" "}text extraction
          </span>,
          <span className="font-semibold text-gray-700">
            {" "}cleaning
          </span>,
          <span className="font-semibold text-gray-700">
            {" "}chunking
          </span>,
          <span className="font-semibold text-gray-700">
            {" "}embedding
          </span>
          {" "}and stored for semantic search.
        </p>
      </div>

      
    </section>
  );
}