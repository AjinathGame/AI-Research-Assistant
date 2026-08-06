import {
  Clock3,
  FileText,
  ChevronRight,
  Trash2,
} from "lucide-react";

const questions = [
  {
    question: "Explain the CAP theorem in distributed systems.",
    time: "2 min ago",
  },
  {
    question: "What is the difference between SQL and NoSQL?",
    time: "1 hour ago",
  },
  {
    question: "How does the transformer model work?",
    time: "3 hours ago",
  },
  {
    question: "Explain bias-variance tradeoff with example.",
    time: "5 hours ago",
  },
 
];

export default function RecentQuestions() {
  return (
    <aside className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 h-fit">

     
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
            <Clock3
              size={20}
              className="text-blue-600"
            />
          </div>

          <h2 className="text-xl font-bold text-slate-900">
            Recent Questions
          </h2>
        </div>

        <button className="text-blue-600 cursor-pointer font-medium hover:text-blue-700">
          View all
        </button>
      </div>

   
      <div className="space-y-1 cursor-pointer">

        {questions.map((item, index) => (
          <button
            key={index}
            className="w-full flex items-start justify-between gap-4 rounded-2xl p-2 hover:bg-slate-50 transition"
          >
            <div className="flex gap-4 text-left cursor-pointer">

              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                <FileText
                  size={18}
                  className="text-blue-600"
                />
              </div>

              <div>
                <h3 className="font-medium text-slate-800 leading-7">
                  {item.question}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  {item.time}
                </p>
                
              </div>
             

            </div>

            <ChevronRight
              size={20}
              className="text-slate-400 flex-shrink-0 mt-1"
            />
          </button>
        ))}

      </div>

     
      <div className="mt-8 border-t pt-6">

        <button className="w-full flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-200 py-3 text-red-500 hover:bg-red-50 transition">
          <Trash2 size={18} />
          Clear History
        </button>

      </div>

    </aside>
  );
}