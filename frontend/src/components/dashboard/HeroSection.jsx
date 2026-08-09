import {
  Upload,
  MessageSquare,
  FileText,
  BookOpen,
  Boxes,
  Sparkles,
} from "lucide-react";

import {Link} from 'react-router-dom';

const stats = [
  {
    title: "Total PDFs",
    value: "150",
    icon: FileText,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Total Pages",
    value: "18,540",
    icon: BookOpen,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Text Chunks",
    value: "62,400",
    icon: Boxes,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Questions Asked",
    value: "1,286",
    icon: Sparkles,
    color: "bg-orange-100 text-orange-600",
  },
];

export default function HeroSection() {
  return (
    <div className="space-y-8">


      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">

        <div className="max-w-3xl">
          <p className="text-indigo-600 font-semibold">
            Welcome Back 👋
          </p>

          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-4xl font-bold text-gray-900">
            Your Research Library
          </h1>

          <p className="mt-3 text-gray-500 text-sm sm:text-base">
            Upload chapter-wise PDFs and ask questions in natural language.
            Every answer is generated from your uploaded documents.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

          <Link to="/Uploads"><button className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow w-full cursor-pointer sm:w-auto">
            <Upload size={18} />
            Upload PDF
          </button></Link>

          <Link to="/Ask"><button className="flex items-center cursor-pointer justify-center gap-2 border border-gray-300 hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold w-full sm:w-auto">
            <MessageSquare size={18} />
            Ask Question
          </button></Link>

        </div>

      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-white cursor-pointer rounded-2xl p-5 border shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-gray-500 text-sm">
                    {item.title}
                  </p>

                  <h2 className="text-2xl font-bold mt-2">
                    {item.value}
                  </h2>
                </div>

                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center ${item.color}`}
                >
                  <Icon size={26} />
                </div>

              </div>
            </div>
          );
        })}

      </div>

    </div>
  );
}