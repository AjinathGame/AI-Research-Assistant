import { useState } from "react";
import {
  Sparkles,
  Send,
  ChevronDown,
} from "lucide-react";

export default function ChatBox() {
  const [technology, setTechnology] = useState("All technologies");
  const [model, setModel] = useState("GPT-5.2");
  const [question, setQuestion] = useState("");

  return (
    <section className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">

      <div className="min-h-[320px] flex flex-col items-center justify-center px-6 py-12 text-center">

        <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
          <Sparkles className="text-blue-600" size={42} />
        </div>

        <h2 className="mt-8 text-2xl sm:text-3xl font-bold text-slate-900">
          Ask anything about your notes
        </h2>

        <p className="mt-4 max-w-xl text-gray-500 leading-7">
          Try:
          <span className="font-mono ml-2 text-slate-700">
            "Explain the CAP theorem with an example."
          </span>
        </p>

      </div>

      
      <div className="border-t bg-white p-5">

        <div className="flex flex-col sm:flex-row gap-4">

          <div className="relative w-full sm:w-60">

            <select
              value={technology}
              onChange={(e) => setTechnology(e.target.value)}
              className="appearance-none w-full rounded-xl cursor-pointer border border-gray-300 px-4 py-3 pr-1 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option>All technologies</option>
              <option>Artificial Intelligence</option>
              <option>Machine Learning</option>
              <option>Networking</option>
              <option>Database</option>
              <option>AWS Cloud</option>
            </select>

            <ChevronDown
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            />

          </div>

          <div className="relative w-full sm:w-48">

            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="appearance-none w-full rounded-xl cursor-pointer border border-gray-300 px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option>GPT-5.2</option>
              <option>GPT-4.1</option>
              <option>GPT-4o</option>
            </select>

            <ChevronDown
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            />

          </div>

        </div>

        
        <div className="mt-4 flex gap-3">

          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about your notes..."
            className="flex-1 rounded-xl border border-gray-300 px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button className="w-16 rounded-xl cursor-pointer bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition">
            <Send size={22} />
          </button>

        </div>

      </div>

    </section>
  );
}