import React from "react";
import { Brain, Bot, Wifi, Globe, ChartColumn, Home, LayoutDashboard, MessageSquare, Upload, Info, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import LOGO from "../../assets/main_logo.png";

const Footer = () => {

    return (

        <>
            <footer className="w-full bg-[#020815] text-white border-t-4 border-indigo-700 rounded-tl-md rounded-tr-md">

                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-10 lg:py-12">

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">

                        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                            
                            <img src={LOGO} alt="AI Research Assistant" className="w-30 h-30 object-contain rounded-2xl mb-5" />

                            <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                                AI-Research Assistant
                            </h2>

                            <p className="mt-4 text-sm sm:text-[15px] leading-6 text-gray-300 max-w-xs">
                                "Access your research library, upload notes, and asking AI-powered questions."
                            </p>

                            <div className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-green-50 text-green-700 text-sm font-semibold">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                System Operational
                            </div>
                        </div>

                        <div className="flex flex-col items-center sm:items-start sm:text-left">
                            <h3 className="text-xl sm:text-2xl font-bold mb-4">
                                Navigation
                            </h3>

                            <div className="flex flex-col gap-3">

                                <Link to="/" className="flex items-center sm:justify-start gap-3 text-gray-300 hover:text-indigo-400 transition">
                                    <Home size={16} className="text-indigo-500" />
                                    Home
                                </Link>

                                <Link to="/Dashboard" className="flex items-center sm:justify-start gap-3 text-gray-300 hover:text-indigo-400 transition">
                                    <LayoutDashboard size={16} className="text-indigo-500" />
                                    Dashboard
                                </Link>

                                <Link to="/Ask" className="flex items-center sm:justify-start gap-3 text-gray-300 hover:text-indigo-400 transition">
                                    <MessageSquare size={16} className="text-indigo-500" />
                                    Ask AI
                                </Link>

                                <Link to="/Uploads" className="flex items-center sm:justify-start gap-3 text-gray-300 hover:text-indigo-400 transition">
                                    <Upload size={16} className="text-indigo-500" />
                                    Upload
                                </Link>

                                <Link to="/About" className="flex items-center sm:justify-start gap-3 text-gray-300 hover:text-indigo-400 transition">
                                    <Info size={16} className="text-indigo-500" />
                                    About Us
                                </Link>

                            </div>
                        </div>

                        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                            <h3 className="text-xl sm:text-2xl font-bold mb-4">
                                Domains
                            </h3>

                            <div className="flex flex-col gap-3 text-gray-300">

                                <div className="flex items-center justify-center sm:justify-start gap-3">
                                    <Wifi size={16} className="text-indigo-500" />
                                    Internet of Things (IoT)
                                </div>

                                <div className="flex items-center justify-center sm:justify-start gap-3">
                                    <Brain size={16} className="text-indigo-500" />
                                    Artificial Intelligence
                                </div>

                                <div className="flex items-center justify-center sm:justify-start gap-3">
                                    <Bot size={16} className="text-indigo-500" />
                                    Machine Learning
                                </div>

                                <div className="flex items-center justify-center sm:justify-start gap-3">
                                    <Globe size={16} className="text-indigo-500" />
                                    Networking
                                </div>

                                <div className="flex items-center justify-center sm:justify-start gap-3">
                                    <ChartColumn size={16} className="text-indigo-500" />
                                    Statistics
                                </div>

                            </div>
                        </div>

                        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                            <h3 className="text-xl sm:text-2xl font-bold mb-4">
                                Resources
                            </h3>

                            <div className="flex flex-col gap-3 text-gray-300">

                                <a href="#" className="hover:text-indigo-400 transition">
                                    Documentation
                                </a>

                                <a href="#" className="hover:text-indigo-400 transition">
                                    API Reference
                                </a>

                                <a href="#" className="hover:text-indigo-400 transition">
                                    Privacy Policy
                                </a>

                                <a href="#" className="hover:text-indigo-400 transition">
                                    Terms of Service
                                </a>

                            </div>
                        </div>

                    </div>

                    <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-5">

                        <p className="text-sm text-gray-200 text-center md:text-left">
                            © {new Date().getFullYear()} AI Research Assistant. All rights reserved.
                        </p>

                        <div className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-cyan-400/20 bg-white shadow-md">
                            <Lock size={17} className="text-emerald-700" />

                            <span className="text-emerald-700 text-sm font-bold whitespace-nowrap">
                                Secure • Private • Trusted
                            </span>
                        </div>

                    </div>

                </div>
                
            </footer>
        </>
    );
};

export default Footer;