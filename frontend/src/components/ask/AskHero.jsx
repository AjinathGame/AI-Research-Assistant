import { Sparkles } from "lucide-react";

export default function AskHero() {
  return (
    <section className="space-y-1">
      
      <div className="inline-flex items-center gap-2 cursor-pointer rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
        <Sparkles size={16} />
        ASK
      </div>

     
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
          Question the corpus
        </h1>

        <p className="mt-2 max-w-2xl text-base sm:text-lg leading-8 text-slate-500">
          Retrieval-augmented answers grounded in your uploaded notes,
          books and PDFs with page-level citations.
        </p>
      </div>
    </section>
  );
}