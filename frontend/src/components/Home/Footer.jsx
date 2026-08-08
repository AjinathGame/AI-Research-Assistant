import React from "react";
import {
    Brain, Bot, Wifi, Globe, ChartColumn, SquareCheckBig, SquarePen, Heart, ArrowUpRight, Home, LayoutDashboard, MessageSquare, Upload, Info, LogIn, Lock,
} from "lucide-react";
import { Link } from "react-router-dom";
import Logo from '../../assets/main_logo.png'

const Footer = () => {

    return (
        <footer className="bg-white border-t border-gray-200 pt-16 pb-12 rounded-t-md ">

            <div className="max-w-7xl mx-auto px-4 sm:px-8 ">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-gray-100">

                    <div className="lg:col-span-2 space-y-4">

                        <div className="flex items-center gap-3 cursor-pointer">
                            <div className="w-16 h-12 rounded-xl  flex items-center justify-center text-white text-xl font-bold">
                                <img
                                    src={Logo}
                                    alt="Hero"
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-black tracking-tight">
                                    AI Research Assistant
                                </h2>
                                <p className="text-[15px] font-bold font-bold">
                                    Ask. Learn. Discover.
                                </p>
                            </div>
                        </div>

                        <p className="text-gray-600 text-sm leading-relaxed font-serif max-w-sm ml-3 ">
                            Your intelligent research library. Upload chapter-wise<br /> PDFs, ask questions in plain English, and get grounded answers with exact source page numbers.
                        </p>

                        <div className="flex items-center gap-2 pt-2 ml-3">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-semibold">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                System Operational
                            </span>
                        </div>

                    </div>

                    <div>
                        <h3 className="text-[17px] font-bold text-gray-900 tracking-wider uppercase mb-4">
                            Navigation
                        </h3>
                        <ul className="space-y-3 text-[15px]">
                            <li>
                                <Link to="/" className="text-gray-600 hover:text-indigo-600 transition flex items-center gap-1">
                                    <Home size={14} className="text-indigo-600" />
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/Dashboard" className="text-gray-600 hover:text-indigo-600 transition flex items-center gap-1">
                                    <LayoutDashboard size={14} className="text-indigo-600" />
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/Ask" className="text-gray-600 hover:text-indigo-600 transition flex items-center gap-1">
                                    <MessageSquare size={14} className="text-indigo-600" />
                                    Ask AI
                                </Link>
                            </li>
                            <li>
                                <Link to="/Upload" className="text-gray-600 hover:text-indigo-600 transition flex items-center gap-1">
                                    <Upload size={14} className="text-indigo-600" />
                                    Upload Notes
                                </Link>
                            </li>
                            <li>
                                <Link to="/Ask" className="text-gray-600 hover:text-indigo-600 transition flex items-center gap-1">
                                    <Info size={14} className="text-indigo-600" />
                                    Chat With
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[17px] font-bold text-gray-900 tracking-wider uppercase mb-4">
                            Domains
                        </h3>
                        <ul className="space-y-2.5 text-[15px] text-gray-600">
                            <li className="flex items-center gap-2">
                                <Brain size={14} className="text-indigo-600" /> Artificial Intelligence
                            </li>
                            <li className="flex items-center gap-2">
                                <Bot size={14} className="text-indigo-600" /> Machine Learning
                            </li>
                            <li className="flex items-center gap-2">
                                <Wifi size={14} className="text-indigo-600" /> Internet of Things (IoT)
                            </li>
                            <li className="flex items-center gap-2">
                                <Globe size={14} className="text-indigo-600" /> Networking
                            </li>
                            <li className="flex items-center gap-2">
                                <ChartColumn size={14} className="text-indigo-600" /> Statistics
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[17px] font-bold text-gray-900 tracking-wider uppercase mb-4">
                            Resources
                        </h3>
                        <ul className="space-y-3 text-[15px]">
                            <li>
                                <a href="/" className="text-gray-600 hover:text-indigo-600 transition flex items-center gap-1">
                                    Documentation <ArrowUpRight size={14} className="text-gray-400" />
                                </a>
                            </li>
                            <li>
                                <a href="/" className="text-gray-600 hover:text-indigo-600 transition">
                                    API Reference
                                </a>
                            </li>
                            <li>
                                <a href="/" className="text-gray-600 hover:text-indigo-600 transition">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="/" className="text-gray-600 hover:text-indigo-600 transition">
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[14px] text-gray-600 font-bold">

                    <p>© {new Date().getFullYear()} AI Research Assistant. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Built with <Heart size={14} className="text-red-500 fill-red-500" /> for researchers & students.
                    </p>

                    <div className="flex items-center gap-2 px-5 py-3 rounded-xl border border-cyan-400/20 bg-white shadow-md cursor-pointer">

                        <Lock
                            size={18}
                            className="text-emerald-700"
                        />

                        <span className="text-emerald-700  text-sm font-bold">
                            Secure • Private • Trusted
                        </span>

                    </div>

                </div>

            </div>

        </footer>
    );
};

export default Footer;