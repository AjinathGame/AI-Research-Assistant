import React, { useState } from "react";
import {
  Home, LayoutDashboard, MessageSquare, Upload, Info, LogIn, UserPlus, Menu, X,
} from "lucide-react";
import { Link } from "react-router-dom";
import Logo from '../../assets/main_logo.png'

const Navbar = () => {

  const [open, setOpen] = useState(false);

  return (

    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">

      <div className="max-w-8xl mx-auto h-[80px] flex items-center justify-between px-5 lg:px-10 ">

        <div className="flex items-center gap-4 cursor-pointer">

          <div className="w-16 h-12 rounded-xl  flex items-center justify-center text-white text-xl font-bold">
            <img
              src={Logo}
              alt="Hero"
              className="w-full"
            />
          </div>

          <div>
            <Link to="/">
              <h2 className="text-[22px] font-bold text-gray-900">
                AI Research Assistant
              </h2>

              <p className="text-sm font-serif font-serif text-black">
                Ask. Learn. Discover.
              </p>
            </Link>
          </div>

        </div>

        <div className="hidden lg:flex items-center gap-10">

          <Link to="/" className="flex items-center gap-2 font-semibold hover:text-indigo-600 transition">
            <Home size={18} />
            Home
          </Link>

          <Link to="/Dashboard" className="flex items-center gap-2 font-semibold hover:text-indigo-600 transition">
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link to="/Ask" className="flex items-center gap-2 font-semibold hover:text-indigo-600 transition">
            <MessageSquare size={18} />
            Ask
          </Link>

          <Link to="/Uploads" className="flex items-center gap-2 font-semibold hover:text-indigo-600 transition">
            <Upload size={18} />
            Upload
          </Link>

          <Link to="/About" className="flex items-center gap-2 font-semibold hover:text-indigo-600 transition">
            <Info size={18} />
            About US
          </Link>

        </div>

        <div className="hidden lg:flex items-center gap-4 mr-10 lg:mr-0">

          <Link to="/Login">
            <button className="px-4 py-2 flex items-center gap-2 rounded-md border border-gray-300 shadow bg-white font-bold hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white transition cursor-pointer">
              <LogIn size={17} />
              Sign In
            </button>
          </Link>

          <Link to="/CreateAccount">
            <button className="px-4 py-2 flex items-center gap-2 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition cursor-pointer">
              <UserPlus size={18} />
              Create Account
            </button>
          </Link>

        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden cursor-pointer" >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>

      </div>

      {open && (
        <div className="lg:hidden bg-white border-t shadow-md">

          <div className="flex flex-col px-6 py-5 gap-5">

            <Link to="/" className="flex items-center gap-3 font-semibold">
              <Home size={18} />
              Home
            </Link>

            <Link to="/Dashboard" className="flex items-center gap-3 font-semibold">
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            <Link to="/Ask" className="flex items-center gap-3 font-semibold">
              <MessageSquare size={18} />
              Ask
            </Link>

            <Link to="/Upload" className="flex items-center gap-3 font-semibold">
              <Upload size={18} />
              Upload
            </Link>

            <Link to="/About" className="flex items-center gap-3 font-semibold">
              <Info size={18} />
              About Us
            </Link>

            <Link to="/Login">
              <button className="mt-3 px-4 py-3 rounded-lg border border-gray-300 font-bold flex items-center justify-center gap-2">
                <LogIn size={18} />
                Sign In
              </button>
            </Link>

            <Link to="/CreateAccount">
              <button className="px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center gap-2">
                <UserPlus size={18} />
                Create Account
              </button>
            </Link>

          </div>

        </div>

      )}

    </nav>

  );
};

export default Navbar;