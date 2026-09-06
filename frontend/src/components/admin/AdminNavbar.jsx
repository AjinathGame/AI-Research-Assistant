import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Layers3,
  FileText,
  CircleHelp,
  UserRound,
  Bell,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import Logo from "../../assets/main_logo.png";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 h-[82px] border-b border-gray-200 bg-white">
        <div className="flex h-full items-center justify-between px-5 sm:px-8 lg:px-10">

          <div className="flex items-center gap-3">

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
            >
              {mobileMenu ? <X size={22} /> : <Menu size={22} />}
            </button>

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-16 items-center justify-center rounded-xl">
                <img
                  src={Logo}
                  alt="AI Search Assistant"
                  className="w-full"
                />
              </div>

              <div>
                <h2 className="text-[22px] font-bold text-gray-900">
                  AI Search Assistant
                </h2>

                <p className="font-serif text-sm text-black">
                  Ask. Learn. Discover.
                </p>
              </div>

            </div>
          </div>

          <nav className="hidden h-full items-center lg:flex">

            <Link
              to="/admin/dashboard"
              className="flex h-full items-center gap-2 px-5 text-[15px] font-medium text-[#172033] transition hover:text-blue-600"
            >
              <LayoutDashboard size={21} strokeWidth={1.8} />
              Dashboard
            </Link>

            <Link
              to="/admin/userdetails"
              className="flex h-full items-center gap-2 px-5 text-[15px] font-medium text-[#172033] transition hover:text-blue-600"
            >
              <Users size={21} strokeWidth={1.8} />
              Users
            </Link>

            <Link
              to="/admin/technologies"
              className="flex h-full items-center gap-2 px-5 text-[15px] font-medium text-[#172033] transition hover:text-blue-600"
            >
              <Layers3 size={21} strokeWidth={1.8} />
              Technologies
            </Link>

            <Link
              to="/admin/documents"
              className="flex h-full items-center gap-2 px-5 text-[15px] font-medium text-[#172033] transition hover:text-blue-600"
            >
              <FileText size={21} strokeWidth={1.8} />
              Documents
            </Link>

            <Link
              to="/admin/questions"
              className="flex h-full items-center gap-2 px-5 text-[15px] font-medium text-[#172033] transition hover:text-blue-600"
            >
              <CircleHelp size={21} strokeWidth={1.8} />
              Questions
            </Link>

            <Link
              to="/admin/profile"
              className="flex h-full items-center gap-2 px-5 text-[15px] font-medium text-[#172033] transition hover:text-blue-600"
            >
              <UserRound size={21} strokeWidth={1.8} />
              Profile
            </Link>

          </nav>

          <div className="flex items-center gap-5">

            <button className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#172033] hover:bg-gray-100">
              <Bell size={22} strokeWidth={1.8} />

              <span className="absolute right-1 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                3
              </span>
            </button>

            <button className="hidden items-center gap-3 sm:flex">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#183a61] text-white">
                <span className="text-lg font-medium">
                  A
                </span>
              </div>

              <div className="hidden text-left md:block">
                <p className="text-[15px] font-semibold text-[#172033]">
                  Admin
                </p>

                <p className="text-xs text-gray-500">
                  Super Admin
                </p>
              </div>

              <ChevronDown
                size={18}
                className="text-gray-600"
              />

            </button>

          </div>
        </div>
      </header>

      {mobileMenu && (
        <div className="fixed inset-x-0 top-[82px] z-40 border-b border-gray-200 bg-white shadow-lg lg:hidden">

          <nav className="flex flex-col p-4">

            <Link
              to="/admin/dashboard"
              onClick={() => setMobileMenu(false)}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <LayoutDashboard size={20} />
              Dashboard
            </Link>

            <Link
              to="/admin/users"
              onClick={() => setMobileMenu(false)}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Users size={20} />
              Users
            </Link>

            <Link
              to="/admin/technologies"
              onClick={() => setMobileMenu(false)}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Layers3 size={20} />
              Technologies
            </Link>

            <Link
              to="/admin/documents"
              onClick={() => setMobileMenu(false)}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <FileText size={20} />
              Documents
            </Link>

            <Link
              to="/admin/questions"
              onClick={() => setMobileMenu(false)}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <CircleHelp size={20} />
              Questions
            </Link>

            <Link
              to="/admin/profile"
              onClick={() => setMobileMenu(false)}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <UserRound size={20} />
              Profile
            </Link>

          </nav>
        </div>
      )}
    </>
  );
};

export default AdminNavbar;