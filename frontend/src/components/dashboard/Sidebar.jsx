import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Library,
  MessageSquare,
  Upload,
  User,
  Brain,
  Menu,
  X,
} from "lucide-react";

const menuItems = [
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: MessageSquare,
    title: "Ask a Question",
    path: "/ask",
  },
  {
    icon: Upload,
    title: "Upload PDF",
    path: "/uploads",
  },
];

const bottomItems = [
  {
    icon: User,
    title: "Profile",
    path: "/profile",
  },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between bg-white border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
            <Brain className="text-white" size={20} />
          </div>

          <h1 className="font-bold text-lg">Scholar RAG</h1>
        </div>

        <button onClick={() => setOpen(true)}>
          <Menu size={28} />
        </button>
      </header>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity lg:hidden ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

   
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-64 bg-white border-r
          flex flex-col justify-between
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
       
        <div>
          <div className="px-6 py-6 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center shadow">
                  <Brain className="text-white" size={22} />
                </div>

                <div>
                  <h1 className="font-bold text-xl">
                    Scholar RAG
                  </h1>

                  <p className="text-[11px] uppercase tracking-widest text-gray-500">
                    Research Platform
                  </p>
                </div>
              </div>

              <button
                className="lg:hidden"
                onClick={() => setOpen(false)}
              >
                <X size={24} />
              </button>
            </div>
          </div>

 
          <div className="p-5 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.title}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600 font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <Icon size={20} />
                  <span>{item.title}</span>
                </NavLink>
              );
            })}
          </div>
        </div>

     
        <div className="p-5 border-t">
          {bottomItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-4 rounded-xl border px-4 py-3 transition ${
                    isActive
                      ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                      : "hover:bg-gray-100"
                  }`
                }
              >
                <Icon size={20} />
                {item.title}
              </NavLink>
            );
          })}
        </div>
      </aside>
    </>
  );
}