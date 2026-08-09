import React from "react";
import { Brain, FileText, Search, Database, Sparkles, ShieldCheck, Zap, Users, SearchCheck, Quote, FileQuestion, Lightbulb
} from "lucide-react";
import Navbar from "../components/Home/Navbar";
import AboutViewImg from "../assets/About_view.png"
import Footer from "../components/Home/Footer"

const About = () => {

    return (

        <div className="min-h-screen bg-[#f8f7ff] text-gray-900">

            <Navbar />

            <div className="mt-5">
                
                <section 
                    className="relative min-h-[500px] overflow-hidden bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${AboutViewImg})` }}>

                    <div className="absolute inset-0 bg-black/35"></div>

                    <div className="relative z-10 flex min-h-[500px] items-center px-8 sm:px-12 lg:px-20">
                        <div className="max-w-2xl text-left">
                            <h1 className="text-3xl font-bold leading-16 text-white sm:text-5xl lg:text-6xl">
                                About AI-Research Assistant <span className="text-[40px]">🤖</span>
                            </h1>

                            <p className="mt-6 max-w-xl text-base leading-7 text-white/90 sm:text-lg">
                                An intelligent research platform designed to help students and
                                researchers upload, organize, search, and understand their
                                research documents using Artificial Intelligence.
                            </p>
                        </div>
                    </div>

                </section>

            </div>

            <section className="px-6 py-16 sm:px-10 lg:px-20">

                <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">

                    <div>

                        <p className="mb-3 text-sm font-bold uppercase tracking-widest text-purple-600">
                            Our Project
                        </p>

                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                            Making Research Faster and Smarter
                        </h2>

                        <p className="mt-5 text-[16px] leading-7 text-gray-600">
                            AI Research Assistant is a web-based system that helps users
                            work with research papers, notes, and other study materials.
                            Instead of manually searching through lengthy documents, users
                            can upload their documents<br/> and use an AI-powered interface to
                            work with their research content.
                        </p>

                        <p className="mt-4 text-[16px] leading-7 text-gray-600">
                            The system uses document processing, text chunking, embeddings,
                            and vector database technology to prepare research documents for
                            intelligent retrieval.
                        </p>

                    </div>

                    <div className="rounded-3xl border border-purple-100 bg-white p-8 shadow-lg">

                        <div className="grid grid-cols-2 gap-5">

                            <div className="rounded-2xl bg-purple-50 p-5">
                                <FileText size={28} className="text-purple-600" />
                                <h3 className="mt-4 font-semibold">PDF Processing</h3>
                                <p className="mt-2 text-sm text-gray-500">
                                    Process and organize research documents.
                                </p>
                            </div>

                            <div className="rounded-2xl bg-indigo-50 p-5">
                                <Search size={28} className="text-indigo-600" />
                                <h3 className="mt-4 font-semibold">Smart Search</h3>
                                <p className="mt-2 text-sm text-gray-500">
                                    Find relevant information efficiently.
                                </p>
                            </div>

                            <div className="rounded-2xl bg-violet-50 p-5">
                                <Database size={28} className="text-violet-600" />
                                <h3 className="mt-4 font-semibold">Vector Database</h3>
                                <p className="mt-2 text-sm text-gray-500">
                                    Store document embeddings for retrieval.
                                </p>
                            </div>

                            <div className="rounded-2xl bg-blue-50 p-5">
                                <Sparkles size={28} className="text-blue-600" />
                                <h3 className="mt-4 font-semibold">AI Assistance</h3>
                                <p className="mt-2 text-sm text-gray-500">
                                    Support intelligent research workflows.
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

            </section>

            <section className="bg-white px-6 py-16 sm:px-10 lg:px-20">

                <div className="mx-auto max-w-6xl text-center">

                    <p className="text-sm font-bold uppercase tracking-widest text-purple-600">
                        Key Features
                    </p>

                    <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                        What Our System Provides
                    </h2>

                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                icon: FileText,
                                title: "Document Upload",
                                text: "Upload research papers, PDFs, and study materials for quick and organized document analysis",
                            },
                            {
                                icon: Zap,
                                title: "Fast Processing",
                                text: "Process and prepare document content efficiently for faster searching and AI-powered responses",
                            },
                            {
                                icon: Search,
                                title: "Semantic Retrieval",
                                text: "Find the most relevant information from documents based on the meaning of your query.",
                            },
                            {
                                icon: ShieldCheck,
                                title: "Reliable Sources",
                                text: "Get grounded answers with relevant document and page-level references for better trust and accuracy.",
                            },
                            {
                                icon: Quote,
                                title: "Source Citations",
                                text: "View document and page-level references so you can easily verify where the answer comes from",
                            },
                            {
                                icon: FileQuestion,
                                title: "AI-Powered Question Answering",
                                text: "Ask questions about your uploaded research documents and get contextual answers from the available content.",
                            },
                            {
                                icon:  Lightbulb,
                                title: "Research Insights",
                                text: "Quickly understand important concepts, key points, and relevant information from large research documents.",
                            },
                            {
                                icon: SearchCheck,
                                title: "Smart Document Search",
                                text: "Search across uploaded documents using natural-language queries instead of exact keywords.",
                            },
                        ].map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={index}
                                    className="rounded-2xl border-2 shadow-xl border-b-indigo-600 border-t-0 border-l-0 border-r-0 bg-[#faf9ff] p-6 text-left transition hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                                        <Icon size={24} className="text-purple-600" />
                                    </div>

                                    <h3 className="mt-5 text-lg font-bold">{item.title}</h3>

                                    <p className="mt-2 text-sm leading-6 text-gray-500">
                                        {item.text}
                                    </p>
                                </div>
                            );
                        })}

                    </div>

                </div>

            </section>

            <section className="px-6 py-16 sm:px-10 lg:px-20">

                <div className="mx-auto max-w-6xl rounded-md bg-gradient-to-r from-[#3b25cc] to-[#5637f5] p-8 sm:p-12">

                    <div className="grid items-center gap-10 lg:grid-cols-2">

                        <div>
                            <p className="text-sm font-semibold uppercase tracking-widest text-[#f4f4f5]">
                                Our Goal
                            </p>

                            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                                Simplify the Research Experience
                            </h2>

                            <p className="mt-5 leading-7 text-gray-200">
                                Our goal is to reduce the time and effort required to search
                                through large amounts of research material and provide users
                                with an intelligent platform for managing and understanding
                                their documents.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">

                            <div className="rounded-md bg-white/10 p-5">
                                <Users size={25} className="text-[#c9b6ff]" />
                                <h3 className="mt-3 font-semibold text-white text-bold">
                                    For Students
                                </h3>
                                <p className="mt-2 text-sm text-white/80">
                                    Useful for notes, papers, assignments, and academic study.
                                </p>
                            </div>

                            <div className="rounded-md bg-white/10 p-5">
                                <Brain size={25} className="text-[#c9b6ff]" />
                                <h3 className="mt-3 font-semibold text-white">
                                    For Researchers
                                </h3>
                                <p className="mt-2 text-sm text-white/80">
                                    Helps organize and explore research documents efficiently.
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

            </section>

            <section className="border-t border-gray-200 bg-white px-6 py-10 text-center">

                <h2 className="text-2xl font-bold">
                    AI Research Assistant System
                </h2>

                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500">
                    An AI-powered platform for intelligent research document processing,
                    semantic search, and efficient knowledge retrieval.
                </p>

            </section>
            
            <Footer/>

        </div>
    );
};

export default About;