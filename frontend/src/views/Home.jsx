import React, { useState } from "react";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import {
  Upload,
  Brain,
  Bot,
  Wifi,
  Globe,
  ChartColumn,
  SquareCheckBig,
  SquarePen,
  FileText,
  UploadCloud,
  MessageSquareText,
  Target,
  Shield,
  UserPlus,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import LoginRequiredModal from "../components/auth/LoginRequiredModal";

const Home = () => {
  const navigate = useNavigate();

  const [showLoginModal, setShowLoginModal] =
    useState(false);

  const handleStartUploading = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/Uploads");
      return;
    }

    setShowLoginModal(true);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-[#f5f8fc] via-white to-[#EEF4FF]">
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-indigo-600 shadow-sm sm:mb-10 sm:px-5 sm:text-sm">
                ✨
                <span>
                  RAG • RETRIEVAL AUGMENTED GENERATION
                </span>
              </div>

              <h1 className="text-4xl font-bold leading-13 text-[#111827] sm:text-5xl lg:text-5xl">
                A search library <br />
                that answers{" "}
                <span className="text-indigo-600">
                  back.
                </span>
              </h1>

              <p className="mt-5 font-serif text-base leading-7 text-gray-600 sm:text-[18px]">
                Upload your chapter-wise PDF notes across
                Artificial Intelligence, Machine Learning,
                IoT, Networking, Statistics, Software Testing
                <br />
                and Design Theory. Ask questions in plain
                English. Get answers grounded strictly in your
                notes — with the exact PDF name and
                <br />
                page number.
              </p>

              <div className="mt-7 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:gap-6">
                <button
                  type="button"
                  onClick={handleStartUploading}
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-indigo-700 sm:text-lg"
                >
                  Start uploading notes
                  <Upload size={18} />
                </button>

                <Link to="/Login">
                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-8 py-3 text-base font-semibold shadow transition hover:bg-gray-50 sm:text-lg"
                  >
                    Sign in
                    <UserPlus size={18} />
                  </button>
                </Link>
              </div>

              <div className="mt-8">
                <h3 className="ml-1 font-semibold text-gray-500">
                  Popular domains
                </h3>
              </div>

              <div className="mt-4 flex flex-wrap gap-3 sm:gap-4">
                {[
                  { icon: Brain, label: "AI" },
                  {
                    icon: Bot,
                    label: "Machine Learning",
                  },
                  { icon: Wifi, label: "IoT" },
                  {
                    icon: Globe,
                    label: "Networking",
                  },
                  {
                    icon: ChartColumn,
                    label: "Statistics",
                  },
                  {
                    icon: SquareCheckBig,
                    label: "Software Testing",
                  },
                  {
                    icon: SquarePen,
                    label: "Design Theory",
                  },
                ].map((domain, idx) => {
                  const Icon = domain.icon;

                  return (
                    <div
                      key={idx}
                      className="flex cursor-pointer items-center gap-2 rounded-[17px] border border-gray-100 bg-white px-4 py-2 shadow-sm transition hover:border-indigo-200"
                    >
                      <Icon
                        size={18}
                        className="shrink-0 text-indigo-600"
                      />

                      <span className="text-sm font-medium text-gray-700">
                        {domain.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-xs font-bold tracking-widest text-indigo-600 sm:text-sm">
                  LIVE PREVIEW • CHAT
                </p>

                <div className="h-3 w-3 animate-pulse rounded-full bg-green-500"></div>
              </div>

              <div className="flex flex-col items-start gap-4 rounded-2xl bg-indigo-50 p-4 sm:flex-row sm:justify-between">
                <div className="flex gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xl">
                    👤
                  </div>

                  <p className="text-base font-medium leading-snug text-gray-900 sm:text-lg sm:leading-8">
                    What is the difference between supervised
                    and unsupervised learning?
                  </p>
                </div>

                <span className="self-end text-xs text-gray-400 sm:mt-1 sm:self-auto sm:text-sm">
                  10:24 AM
                </span>
              </div>

              <div className="mt-6 sm:mt-8">
                <h3 className="mb-2 text-xs font-bold tracking-wider text-indigo-600 sm:text-sm">
                  ANSWER
                </h3>

                <p className="font-serif text-sm leading-7 text-gray-600 sm:text-md">
                  Supervised learning uses labelled data to map
                  inputs to outputs, whereas unsupervised
                  learning discovers structure in unlabelled
                  data through clustering or dimensionality
                  reduction.

                  <span className="font-semibold text-indigo-600">
                    {" "}
                    [Source 1] [Source 2]
                  </span>
                </p>
              </div>

              <div className="mt-6 sm:mt-8">
                <h3 className="mb-4 text-sm font-semibold text-gray-700 sm:text-base">
                  Sources
                </h3>

                <div className="mb-3 flex flex-col items-start justify-between gap-2 rounded-xl border border-gray-100 bg-gray-50/50 p-3 shadow-sm sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white shadow">
                      <FileText size={18} />
                    </div>

                    <span className="text-sm font-medium text-gray-800">
                      ML_Chapter1.pdf
                    </span>
                  </div>

                  <span className="rounded-md border border-gray-200 bg-white px-2.5 py-1 text-xs font-semibold text-gray-500 sm:text-sm">
                    Page 12
                  </span>
                </div>

                <div className="mb-3 flex flex-col items-start justify-between gap-2 rounded-xl border border-gray-100 bg-gray-50/50 p-3 shadow-sm sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white shadow">
                      <FileText size={18} />
                    </div>

                    <span className="text-sm font-medium text-gray-800">
                      AI_Fundamentals_Notes.pdf
                    </span>
                  </div>

                  <span className="rounded-md border border-gray-200 bg-white px-2.5 py-1 text-xs font-semibold text-gray-500 sm:text-sm">
                    Page 12
                  </span>
                </div>
              </div>

              <div className="mt-8 text-center text-xs text-gray-400 sm:text-sm">
                Powered by RAG (Top-k Retrieval) • GPT-3.5-Turbo
                • Context-Aware
              </div>
            </div>
          </div>
        </section>

        <section className="w-full px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl sm:rounded-[15px]">
              <div className="grid grid-cols-1 divide-y divide-gray-100 md:grid-cols-2 md:divide-y-0 md:divide-x lg:grid-cols-4">
                <div className="flex cursor-pointer items-start gap-4 p-6 transition hover:bg-gray-50/50 sm:gap-5 sm:p-8">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 sm:h-14 sm:w-14">
                    <UploadCloud
                      size={26}
                      className="text-indigo-600"
                    />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#0E1B4D]">
                      Upload & Organize
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-gray-500">
                      Upload chapter-wise PDFs and organize
                      your notes effortlessly.
                    </p>
                  </div>
                </div>

                <div className="flex cursor-pointer items-start gap-4 p-6 transition hover:bg-gray-50/50 sm:gap-5 sm:p-8">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 sm:h-14 sm:w-14">
                    <MessageSquareText
                      size={26}
                      className="text-green-600"
                    />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#0E1B4D]">
                      Ask in Plain English
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-gray-500">
                      Ask any question in natural language and
                      get accurate answers from your notes.
                    </p>
                  </div>
                </div>

                <div className="flex cursor-pointer items-start gap-4 p-6 transition hover:bg-gray-50/50 sm:gap-5 sm:p-8">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 sm:h-14 sm:w-14">
                    <Target
                      size={26}
                      className="text-orange-600"
                    />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#0E1B4D]">
                      Accurate & Grounded
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-gray-500">
                      Answers are strictly based on your
                      documents with exact sources and page
                      numbers.
                    </p>
                  </div>
                </div>

                <div className="flex cursor-pointer items-start gap-4 p-6 transition hover:bg-gray-50/50 sm:gap-5 sm:p-8">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 sm:h-14 sm:w-14">
                    <Shield
                      size={26}
                      className="text-blue-600"
                    />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#0E1B4D]">
                      Private & Secure
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-gray-500">
                      Your data is private, secure and never
                      used for training public models.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />

      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

export default Home;