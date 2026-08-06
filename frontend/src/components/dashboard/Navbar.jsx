import {
  LayoutDashboard,
  Library,
  MessageSquare,
  LogOut,
} from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

       
        <div className="flex flex-wrap items-center gap-3">

          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 text-indigo-600 font-semibold">
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 transition">
            <Library size={18} />
            Library
          </button>

          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 transition">
            <MessageSquare size={18} />
            Ask
          </button>

        </div>

     
        <div className="flex items-center justify-between lg:justify-end gap-4">

          <div className="hidden sm:block text-right">
            <h3 className="font-semibold text-gray-900">
              Ajinath Game
            </h3>

            <p className="text-sm text-gray-500 truncate max-w-[180px]">
              gameajinath4@gmail.com
            </p>
          </div>

          <img
            src="https://i.pravatar.cc/100"
            alt="Profile"
            className="w-10 h-10 rounded-full border"
          />

          <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-100 transition">
            <LogOut size={18} />
            Sign Out
          </button>

        </div>

      </div>

    </header>
  );
}