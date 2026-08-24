import React from "react";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import {
  Upload, Brain, Bot, Wifi, Globe, ChartColumn, SquareCheckBig, SquarePen, FileText, UploadCloud, MessageSquareText, Target, Shield, UserPlus,
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  
  return (

    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-[#f5f8fc] via-white to-[#EEF4FF]">

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            <div>
              <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full border border-gray-200 shadow-sm bg-white text-xs sm:text-sm text-indigo-600 font-semibold mb-6 sm:mb-10">
                ✨
                <span>RAG • RETRIEVAL AUGMENTED GENERATION</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-[#111827] leading-13">
                A search library <br />
                that answers{" "}
                <span className="text-indigo-600">
                  back.
                </span>
              </h1>

              <p className="mt-5 text-base sm:text-[18px] leading-7 text-gray-600 font-serif">
                Upload your chapter-wise PDF notes across Artificial Intelligence,
                Machine Learning, IoT, Networking, Statistics, Software Testing<br /> and
                Design Theory.
                Ask questions in plain English.
                Get answers grounded strictly in your notes — with the exact PDF
                name and<br /> page number.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-7 sm:mt-10">
                <Link to="/Upload" className="inline-block">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-3 rounded-xl text-base sm:text-lg font-semibold shadow-lg transition cursor-pointer flex items-center justify-center gap-2">
                    Start uploading notes
                    <Upload size={18} />
                  </button>
                </Link>

                <Link to="/Login">
                  <button className="border border-gray-300 bg-white px-8 py-3 rounded-xl text-base sm:text-lg font-semibold shadow hover:bg-gray-50 transition cursor-pointer flex items-center justify-center gap-2">
                    Sign in
                    <UserPlus size={18} />
                  </button>
                </Link>
              </div>

              <div className="mt-8">
                <h3 className="text-gray-500 font-semibold ml-1">Popular domains</h3>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4 mt-4">
                {[
                  { icon: Brain, label: "AI" },
                  { icon: Bot, label: "Machine Learning" },
                  { icon: Wifi, label: "IoT" },
                  { icon: Globe, label: "Networking" },
                  { icon: ChartColumn, label: "Statistics" },
                  { icon: SquareCheckBig, label: "Software Testing" },
                  { icon: SquarePen, label: "Design Theory" },
                ].map((domain, idx) => {
                  const Icon = domain.icon;
                  return (
                    <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-white rounded-[17px] shadow-sm border border-gray-100 cursor-pointer hover:border-indigo-200 transition">
                      <Icon size={18} className="text-indigo-600 shrink-0" />
                      <span className="text-sm font-medium text-gray-700">{domain.label}</span>
                    </div>
                  );
                })}
              </div>

            </div>

            <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-6 sm:p-8">

              <div className="flex justify-between items-center mb-6">
                <p className="text-xs sm:text-sm tracking-widest font-bold text-indigo-600">
                  LIVE PREVIEW • CHAT
                </p>
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              </div>

              <div className="bg-indigo-50 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex gap-3 sm:gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-xl shrink-0">👤</div>
                  <p className="text-base sm:text-lg text-gray-900 font-medium leading-snug sm:leading-8">
                    What is the difference between supervised and
                    unsupervised learning?
                  </p>
                </div>
                <span className="text-gray-400 text-xs sm:text-sm self-end sm:self-auto sm:mt-1">
                  10:24 AM
                </span>
              </div>

              <div className="mt-6 sm:mt-8">
                <h3 className="text-indigo-600 font-bold tracking-wider text-xs sm:text-sm mb-2">
                  ANSWER
                </h3>
                <p className="text-gray-600 leading-7 text-sm sm:text-md font-serif">
                  Supervised learning uses labelled data to map inputs to
                  outputs, whereas unsupervised learning discovers structure
                  in unlabelled data through clustering or dimensionality
                  reduction.
                  <span className="text-indigo-600 font-semibold">
                    {" "} [Source 1] [Source 2]
                  </span>
                </p>
              </div>

              <div className="mt-6 sm:mt-8">

                <h3 className="font-semibold text-gray-700 mb-4 text-sm sm:text-base">
                  Sources
                </h3>

                <div className="rounded-xl p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 shadow-sm border border-gray-100 bg-gray-50/50 gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow">
                      <FileText size={18} />
                    </div>
                    <span className="font-medium text-sm text-gray-800">
                      ML_Chapter1.pdf
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-500 bg-white px-2.5 py-1 rounded-md border border-gray-200">
                    Page 12
                  </span>
                </div>

                <div className="rounded-xl p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 shadow-sm border border-gray-100 bg-gray-50/50 gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow">
                      <FileText size={18} />
                    </div>
                    <span className="font-medium text-sm text-gray-800">
                      AI_Fundamentals_Notes.pdf
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-500 bg-white px-2.5 py-1 rounded-md border border-gray-200">
                    Page 12
                  </span>
                </div>

              </div>

              <div className="text-center mt-8 text-gray-400 text-xs sm:text-sm">
                Powered by RAG (Top-k Retrieval) • GPT-3.5-Turbo • Context-Aware
              </div>

            </div>

          </div>

        </section>

        <section className="w-full pb-16 px-4 sm:px-6 lg:px-8">

          <div className="max-w-7xl mx-auto">

            <div className="bg-white rounded-2xl sm:rounded-[15px] border border-gray-100 shadow-xl overflow-hidden">

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">

                <div className="flex items-start gap-4 sm:gap-5 p-6 sm:p-8 cursor-pointer hover:bg-gray-50/50 transition">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                    <UploadCloud size={26} className="text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0E1B4D]">
                      Upload & Organize
                    </h3>
                    <p className="mt-2 text-gray-500 leading-relaxed text-sm">
                      Upload chapter-wise PDFs and organize your notes effortlessly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 sm:gap-5 p-6 sm:p-8 cursor-pointer hover:bg-gray-50/50 transition">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                    <MessageSquareText size={26} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0E1B4D]">
                      Ask in Plain English
                    </h3>
                    <p className="mt-2 text-gray-500 leading-relaxed text-sm">
                      Ask any question in natural language and get accurate answers from your notes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 sm:gap-5 p-6 sm:p-8 cursor-pointer hover:bg-gray-50/50 transition">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                    <Target size={26} className="text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0E1B4D]">
                      Accurate & Grounded
                    </h3>
                    <p className="mt-2 text-gray-500 leading-relaxed text-sm">
                      Answers are strictly based on your documents with exact sources and page numbers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 sm:gap-5 p-6 sm:p-8 cursor-pointer hover:bg-gray-50/50 transition">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                    <Shield size={26} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0E1B4D]">
                      Private & Secure
                    </h3>
                    <p className="mt-2 text-gray-500 leading-relaxed text-sm">
                      Your data is private, secure and never used for training public models.
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </section>

      </div>

      <Footer />

    </>

  );
};

export default Home;