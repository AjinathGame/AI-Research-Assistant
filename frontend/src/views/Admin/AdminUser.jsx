import React from "react";
import {
    ChevronRight,
    Pencil,
    FileText,
    CircleHelp,
    Search,
    Clock3,
    FileX2,
    Layers3,
} from "lucide-react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import Footer from "../../components/Home/Footer";

const AdminUsers = () => {
    const activities = [
        {
            title: "Uploaded document",
            subtitle: "React Hooks Guide.pdf",
            time: "2 hours ago",
            icon: FileText,
            bg: "bg-blue-50",
            color: "text-blue-600",
        },
        {
            title: "Asked question",
            subtitle: "How to implement authentication?",
            time: "4 hours ago",
            icon: CircleHelp,
            bg: "bg-purple-50",
            color: "text-purple-600",
        },
        {
            title: "Searched",
            subtitle: "React hooks best practices",
            time: "1 day ago",
            icon: Search,
            bg: "bg-orange-50",
            color: "text-orange-500",
        },
        {
            title: "Technology added",
            subtitle: "Next.js",
            time: "2 days ago",
            icon: Layers3,
            bg: "bg-green-50",
            color: "text-green-600",
        },
        {
            title: "Deleted document",
            subtitle: "Old Guide.pdf",
            time: "3 days ago",
            icon: FileX2,
            bg: "bg-red-50",
            color: "text-red-500",
        },
    ];

    return (

        <>
            <AdminNavbar />
            <div className="min-h-screen bg-[#f8fafc] px-5 py-7 text-[#172033] sm:px-8 lg:px-10">

                <div className="mx-auto max-w-[1400px]">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <div className="mb-3 flex items-center gap-3 text-sm">
                                <span className="font-medium text-blue-600 cursor-pointer">Users</span>
                                <ChevronRight size={16} className="text-slate-400" />
                                <span className="text-slate-600 cursor-pointer">User Details</span>
                            </div>

                            <h1 className="text-[28px] font-bold tracking-tight text-[#111827] ">
                                User Details
                            </h1>
                        </div>

                        <button className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
                            <Pencil size={16} />
                            Edit User
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.15fr_0.85fr]">
                        <div className="rounded-xl border border-slate-200 p-6 shadow-sm">
                            <h2 className="mb-6 text-[17px] font-bold text-[#172033]">
                                User Information
                            </h2>

                            <div className="grid grid-cols-1 gap-7 md:grid-cols-[160px_1fr]">
                                <div className="flex flex-col items-center">
                                    <div className="h-[138px] w-[138px] overflow-hidden rounded-full bg-slate-100">
                                        <img
                                            src="https://i.pravatar.cc/300?img=12"
                                            alt="User"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    <span className="mt-4 rounded-md bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                                        Active
                                    </span>
                                </div>

                                <div className="border-l border-slate-200 pl-7">
                                    <div className="grid grid-cols-[115px_1fr] gap-y-5 text-sm">
                                        <span className="text-slate-500">Full Name</span>
                                        <span className="font-medium text-slate-900">John Doe</span>

                                        <span className="text-slate-500">Email</span>
                                        <span className="font-medium text-slate-900">
                                            john@example.com
                                        </span>

                                        <span className="text-slate-500">Role</span>
                                        <span>
                                            <span className="rounded-md bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                                                User
                                            </span>
                                        </span>

                                        <span className="text-slate-500">Joined Date</span>
                                        <span className="font-medium text-slate-900">
                                            May 31, 2024
                                        </span>

                                        <span className="text-slate-500">Last Login</span>
                                        <span className="font-medium text-slate-900">
                                            June 1, 2024 10:30 AM
                                        </span>

                                        <span className="text-slate-500">Status</span>
                                        <span>
                                            <span className="rounded-md bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                                                Active
                                            </span>
                                        </span>

                                        <span className="text-slate-500">Phone</span>
                                        <span className="font-medium text-slate-900">
                                            +91 98765 43210
                                        </span>

                                        <span className="text-slate-500">Location</span>
                                        <span className="font-medium text-slate-900">
                                            Pune, Maharashtra, India
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h2 className="mb-6 text-[17px] font-bold text-[#172033]">
                                User Statistics
                            </h2>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div className="rounded-xl border border-slate-200 p-5">
                                    <div className="flex items-start gap-5">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                                            <FileText size={29} className="text-blue-600" />
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-slate-600">
                                                Documents
                                            </p>
                                            <h3 className="mt-1 text-[28px] font-bold text-slate-900">
                                                24
                                            </h3>
                                            <p className="mt-1 text-sm text-slate-500">
                                                Total uploaded
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-xl border border-slate-200 p-5">
                                    <div className="flex items-start gap-5">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-purple-50">
                                            <CircleHelp size={29} className="text-purple-600" />
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-slate-600">
                                                Questions
                                            </p>
                                            <h3 className="mt-1 text-[28px] font-bold text-slate-900">
                                                156
                                            </h3>
                                            <p className="mt-1 text-sm text-slate-500">
                                                Total asked
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-xl border border-slate-200 p-5">
                                    <div className="flex items-start gap-5">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-orange-50">
                                            <Search size={29} className="text-orange-500" />
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-slate-600">
                                                Searches
                                            </p>
                                            <h3 className="mt-1 text-[28px] font-bold text-slate-900">
                                                342
                                            </h3>
                                            <p className="mt-1 text-sm text-slate-500">
                                                Total searches
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-xl border border-slate-200 p-5">
                                    <div className="flex items-start gap-5">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-50">
                                            <Clock3 size={29} className="text-green-600" />
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-slate-600">
                                                Joined
                                            </p>
                                            <h3 className="mt-1 text-[20px] font-bold text-slate-900">
                                                May 31, 2024
                                            </h3>
                                            <p className="mt-1 text-sm text-slate-500">
                                                Registration date
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-[17px] font-bold text-[#172033]">
                                Recent Activity
                            </h2>

                            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                                View All Activity
                            </button>
                        </div>

                        <div>
                            {activities.map((activity, index) => {
                                const Icon = activity.icon;

                                return (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4 border-b border-slate-100 py-3 last:border-b-0"
                                    >
                                        <div
                                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${activity.bg}`}
                                        >
                                            <Icon size={21} className={activity.color} />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-semibold text-slate-900">
                                                {activity.title}
                                            </p>
                                            <p className="mt-1 truncate text-sm text-slate-600">
                                                {activity.subtitle}
                                            </p>
                                        </div>

                                        <div className="shrink-0 text-sm text-slate-500">
                                            {activity.time}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default AdminUsers;