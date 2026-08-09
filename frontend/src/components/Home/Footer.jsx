import React from 'react'
import LOGO from '../../assets/main_logo.png'
import {
    Brain, Bot, Wifi, Globe, ChartColumn, SquareCheckBig, SquarePen, Heart, ArrowUpRight, Home, LayoutDashboard, MessageSquare, Upload, Info, LogIn, Lock,
} from "lucide-react";
import { Link, BrowserRouter } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <div className='h-auto w-full bg-black border-t-4 border-indigo-600 rounded-tr-md rounded-tl-md flex flex-col md:flex-row items-start justify-center  md:gap-2 lg:gap-20  mt-10 p-8 md:h-[350px]'>
                <div className='h-[150px] w-[150px] bg-transparent rounded-full overflow-hidden mt-6'>
                    <img src={LOGO} alt='logo' className='h-[100%] w-[100%] rounded-full '></img>
                </div>
                <div className='h-auto w-full md:w-[350px] text-center md:text-left leading-8 mt-6'>
                    <h1 className='font-bold text-white text-[30px] '>AI-Research Assistant</h1>
                    <p className='text-gray-200 leading-5 mt-4 text-[14px]'>"Your intelligent research library. Upload chapter<br /> wise PDFs, ask questions in plain English, and<br /> get grounded answers with exact source<br /> page numbers."</p>
                    <div className="flex items-center gap-2 pt-2 mt-4 lg:flex">
                        <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-green-50 border border-green-200 text-green-700 text-xs font-semibold">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            System Operational
                        </span>
                    </div>
                </div>

                <div className='h-auto w-auto flex flex-col justify-center gap-1 md:w-auto mt-6'>
                    <h1 className='font-bold text-white text-[25px]'>Navigation</h1>
                    <Link to="/" className='text-white text-[15px]  hover:text-purple-700 transition-all duration-500 mt-3 flex gap-3  items-center cursor-pointer'><Home size={14} className="text-indigo-600" />Home</Link>
                    <Link to="/build-resume" className='text-white text-[15px]  hover:text-indigo-700 transition-all duration-500 mt-3 flex gap-3  items-center cursor-pointer'><LayoutDashboard size={14} className="text-indigo-600" />Dashboard</Link>
                    <Link to="/Login" className='text-white text-[15px]  hover:text-indigo-700 transition-all duration-500 mt-3 flex gap-3  items-center cursor-pointer'><MessageSquare size={14} className="text-indigo-600" />Ask AI</Link>
                    <Link to="/Contact" className='text-white text-[15px]  hover:text-indigo-700 transition-all duration-500 mt-3 flex gap-3  items-center cursor-pointer'> <Upload size={14} className="text-indigo-600" /> Upload</Link>
                    <Link to="/Contact" className='text-white text-[15px]  hover:text-indigo-700 transition-all duration-500 mt-3 flex gap-3  items-center cursor-pointer'><Info size={14} className="text-indigo-600" /> Chat With</Link>
                </div>

                <div className='h-auto w-auto md:w-auto mt-6'>
                    <h1 className='font-bold text-white text-[25px]'> Domains</h1>
                    <div className='text-white text-[15px] hover:text-indigo-700 transition-all duration-500 mt-3 flex gap-3 items-center'><Wifi size={14} className="text-indigo-600" /> Internet of Things (IoT)</div>
                    <div className='text-white text-[15px] hover:text-indigo-700 transition-all duration-500 mt-3 flex gap-3 items-center'> <Brain size={14} className="text-indigo-600" />Artificial Intelligence</div>
                    <div className='text-white text-[15px] hover:text-indigo-700 transition-all duration-500 mt-3 flex gap-3 items-center'><Bot size={14} className="text-indigo-600" />Machine Learning</div>
                    <div className='text-white text-[15px] hover:text-indigo-700 transition-all duration-500 mt-3 flex gap-3 items-center'><Globe size={14} className="text-indigo-600" /> NetworkingNetworking</div>
                    <div className='text-white text-[15px] hover:text-indigo-700 transition-all duration-500 mt-3 flex gap-3 items-center'><ChartColumn size={14} className="text-indigo-600" /> StatisticsStatistics</div>
                </div>

                <div className='h-auto w-auto md:w-auto mt-6'>
                    <h1 className='font-bold text-white text-[25px]'>Resources</h1>
                    <div className='text-white text-[15px] hover:text-indigo-700 transition-all duration-500 mt-3 flex gap-2 items-center'>Documentation</div>
                    <div className='text-white text-[15px] hover:text-indigo-700 transition-all duration-500 mt-3 flex gap-2 items-center'>API Reference</div>
                    <div className='text-white text-[15px] hover:text-indigo-700 transition-all duration-500 mt-3 flex gap-2 items-center'> Privacy Policy</div>
                    <div className='text-white text-[15px] hover:text-indigo-700 transition-all duration-500 mt-3 flex gap-2 items-center'>Terms of Service</div>
                </div>

            </div>

            <div className='h-auto w-full bg-black flex flex-col md:flex-row justify-center md:justify-around items-center gap-4 p-4 border-t-[1px] border-gray-600'>
                <h1 className='font-bold text-sm md:text-[12px] text-white text-center'>© {new Date().getFullYear()} AI Research Assistant. All rights reserved.</h1>
                <div className="flex items-center gap-2 px-5 py-3 rounded-xl border border-cyan-400/20 bg-white shadow-md cursor-pointer">
                    <Lock
                        size={18} className="text-emerald-700"
                    />
                    <span className="text-emerald-700  text-sm font-bold">            
                        Secure • Private • Trusted
                    </span>
                </div>
            </div>

        </>
    )
}

export default Footer;
