import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    ChevronRight,
    ChevronDown,
    ChevronLeft,
    Search,
    Users,
    UserCheck,
    UserX,
    UserRoundPlus,
    UserPlus,
    CalendarDays,
    SlidersHorizontal,
    Eye,
    Pencil,
    Trash2,
} from "lucide-react";
import AdminNavbar from "../../components/admin/AdminNavbar.jsx";
import Footer from "../../components/Home/Footer";

const AdminUserDetails = () => {
    const [search, setSearch] = useState("");
    const [role, setRole] = useState("All Roles");
    const [status, setStatus] = useState("All Statuses");
    const [page, setPage] = useState(1);

    const users = [
        {
            id: "1",
            name: "John Doe",
            username: "@johndoe",
            email: "john@example.com",
            role: "User",
            status: "Active",
            joinedDate: "May 31, 2024",
            lastLogin: "June 1, 2024 10:30 AM",
            image: "https://i.pravatar.cc/100?img=12",
        },
        {
            id: "2",
            name: "Jane Smith",
            username: "@janesmith",
            email: "jane@example.com",
            role: "User",
            status: "Active",
            joinedDate: "May 29, 2024",
            lastLogin: "May 31, 2024 03:15 PM",
            image: "https://i.pravatar.cc/100?img=47",
        },
        {
            id: "3",
            name: "Michael Johnson",
            username: "@michaelj",
            email: "michael@example.com",
            role: "Admin",
            status: "Active",
            joinedDate: "May 25, 2024",
            lastLogin: "June 1, 2024 09:45 AM",
            image: "https://i.pravatar.cc/100?img=11",
        },
        {
            id: "4",
            name: "Emily Davis",
            username: "@emilyd",
            email: "emily@example.com",
            role: "User",
            status: "Inactive",
            joinedDate: "May 20, 2024",
            lastLogin: "May 25, 2024 11:20 AM",
            image: "https://i.pravatar.cc/100?img=44",
        },
        {
            id: "5",
            name: "David Wilson",
            username: "@davidw",
            email: "david@example.com",
            role: "User",
            status: "Active",
            joinedDate: "May 18, 2024",
            lastLogin: "June 1, 2024 08:30 AM",
            image: "https://i.pravatar.cc/100?img=14",
        },
        {
            id: "6",
            name: "Sarah Brown",
            username: "@sarahb",
            email: "sarah@example.com",
            role: "User",
            status: "Active",
            joinedDate: "May 15, 2024",
            lastLogin: "May 31, 2024 07:10 PM",
            image: "https://i.pravatar.cc/100?img=45",
        },
        {
            id: "7",
            name: "James Taylor",
            username: "@jamest",
            email: "james@example.com",
            role: "User",
            status: "Inactive",
            joinedDate: "May 10, 2024",
            lastLogin: "May 20, 2024 02:30 PM",
            image: "https://i.pravatar.cc/100?img=13",
        },
    ];

    const filteredUsers = users.filter((user) => {
        const searchText = search.toLowerCase();

        const matchesSearch =
            user.name.toLowerCase().includes(searchText) ||
            user.username.toLowerCase().includes(searchText) ||
            user.email.toLowerCase().includes(searchText);

        const matchesRole =
            role === "All Roles" || user.role === role;

        const matchesStatus =
            status === "All Statuses" || user.status === status;

        return matchesSearch && matchesRole && matchesStatus;
    });

    const handleViewUser = (id) => {
        window.location.href = `/admin/users/${id}`;
    };

    const handleEditUser = (user) => {
        console.log("Edit user:", user);
    };

    const handleDeleteUser = (user) => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${user.name}?`
        );

        if (confirmDelete) {
            console.log("Delete user:", user);
        }
    };

    return (
        <>
            <AdminNavbar />
            <div className="min-h-screen bg-[#f8fafc] px-5 py-7 text-[#172033] sm:px-8 lg:px-10">
                <div className="mx-auto max-w-[1500px]">

                    <div className="mb-8 flex items-start justify-between gap-5">
                        <div>
                            <div className="mb-4 flex items-center gap-3 text-sm">
                                <span className="font-semibold text-blue-600">
                                    Users
                                </span>

                                <ChevronRight
                                    size={16}
                                    className="text-slate-400"
                                />

                                <span className="text-slate-600">
                                    All Users
                                </span>
                            </div>

                            <h1 className="text-[30px] font-bold tracking-tight text-[#111827]">
                                All Users
                            </h1>

                            <p className="mt-1 text-[16px] text-slate-600">
                                Manage all registered users and their activities.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                        >
                            <UserPlus size={18} />
                            Add New User
                        </button>
                    </div>

                    <div className="mb-5 grid grid-cols-1 gap-15 md:grid-cols-2 xl:grid-cols-4">

                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-5">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                                    <Users
                                        size={30}
                                        className="text-blue-600"
                                    />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-slate-600">
                                        Total Users
                                    </p>

                                    <h2 className="mt-1 text-[27px] font-bold text-slate-900">
                                        1,248
                                    </h2>

                                    <p className="text-sm text-slate-600">
                                        <span className="font-semibold text-green-600">
                                            12.5%
                                        </span>{" "}
                                        from last month
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-5">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-50">
                                    <UserCheck
                                        size={30}
                                        className="text-green-600"
                                    />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-slate-600">
                                        Active Users
                                    </p>

                                    <h2 className="mt-1 text-[27px] font-bold text-slate-900">
                                        1,102
                                    </h2>

                                    <p className="text-sm text-slate-600">
                                        <span className="font-semibold text-green-600">
                                            88.3%
                                        </span>{" "}
                                        of total
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-5">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-orange-50">
                                    <UserX
                                        size={30}
                                        className="text-orange-500"
                                    />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-slate-600">
                                        Inactive Users
                                    </p>

                                    <h2 className="mt-1 text-[27px] font-bold text-slate-900">
                                        146
                                    </h2>

                                    <p className="text-sm text-slate-600">
                                        <span className="font-semibold text-orange-500">
                                            11.7%
                                        </span>{" "}
                                        of total
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-5">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-purple-50">
                                    <UserRoundPlus
                                        size={30}
                                        className="text-purple-600"
                                    />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-slate-600">
                                        New This Month
                                    </p>

                                    <h2 className="mt-1 text-[27px] font-bold text-slate-900">
                                        156
                                    </h2>

                                    <p className="text-sm text-slate-600">
                                        <span className="font-semibold text-green-600">
                                            8.2%
                                        </span>{" "}
                                        from last month
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

                        <div className="mb-5 flex flex-col gap-3 xl:flex-row">

                            <div className="relative flex-1">
                                <Search
                                    size={20}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                                />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        setPage(1);
                                    }}
                                    placeholder="Search users by name or email..."
                                    className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-12 pr-4 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div className="relative w-full xl:w-[218px]">
                                <select
                                    value={role}
                                    onChange={(e) => {
                                        setRole(e.target.value);
                                        setPage(1);
                                    }}
                                    className="h-12 w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-800 outline-none focus:border-blue-500"
                                >
                                    <option>All Roles</option>
                                    <option>User</option>
                                    <option>Admin</option>
                                </select>

                                <ChevronDown
                                    size={17}
                                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                                />
                            </div>

                            <div className="relative w-full xl:w-[218px]">
                                <select
                                    value={status}
                                    onChange={(e) => {
                                        setStatus(e.target.value);
                                        setPage(1);
                                    }}
                                    className="h-12 w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-800 outline-none focus:border-blue-500"
                                >
                                    <option>All Statuses</option>
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>

                                <ChevronDown
                                    size={17}
                                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                                />
                            </div>

                            <button
                                type="button"
                                className="flex h-12 w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-800 xl:w-[218px]"
                            >
                                <span className="flex items-center gap-2">
                                    <CalendarDays
                                        size={17}
                                        className="text-slate-500"
                                    />
                                    Joined Date
                                </span>

                                <ChevronDown
                                    size={17}
                                    className="text-slate-500"
                                />
                            </button>

                            <button
                                type="button"
                                className="flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                <SlidersHorizontal size={17} />
                                Filter
                            </button>

                        </div>

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[1150px] border-collapse">

                                <thead>
                                    <tr className="bg-[#f4f7fb] text-left">

                                        <th className="rounded-l-lg px-4 py-4 text-sm font-semibold text-slate-700">
                                            User
                                        </th>

                                        <th className="px-4 py-4 text-sm font-semibold text-slate-700">
                                            Email
                                        </th>

                                        <th className="px-4 py-4 text-sm font-semibold text-slate-700">
                                            Role
                                        </th>

                                        <th className="px-4 py-4 text-sm font-semibold text-slate-700">
                                            Status
                                        </th>

                                        <th className="px-4 py-4 text-sm font-semibold text-slate-700">
                                            Joined Date
                                        </th>

                                        <th className="px-4 py-4 text-sm font-semibold text-slate-700">
                                            Last Login
                                        </th>

                                        <th className="rounded-r-lg px-4 py-4 text-sm font-semibold text-slate-700">
                                            Actions
                                        </th>

                                    </tr>
                                </thead>

                                <tbody>

                                    {filteredUsers.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="border-b border-slate-100 last:border-b-0"
                                        >

                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-4">

                                                    <img
                                                        src={user.image}
                                                        alt={user.name}
                                                        className="h-12 w-12 rounded-full object-cover"
                                                    />

                                                    <div>
                                                        <p className="text-sm font-semibold text-slate-900">
                                                            {user.name}
                                                        </p>

                                                        <p className="mt-1 text-sm text-slate-500">
                                                            {user.username}
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>

                                            <td className="px-4 py-4 text-sm font-medium text-slate-800">
                                                {user.email}
                                            </td>

                                            <td className="px-4 py-4">
                                                <span
                                                    className={`rounded-md px-3 py-1.5 text-xs font-semibold ${user.role === "Admin"
                                                        ? "bg-purple-50 text-purple-600"
                                                        : "bg-blue-50 text-blue-600"
                                                        }`}
                                                >
                                                    {user.role}
                                                </span>
                                            </td>

                                            <td className="px-4 py-4">
                                                <span
                                                    className={`rounded-md px-3 py-1.5 text-xs font-semibold ${user.status === "Active"
                                                        ? "bg-green-50 text-green-600"
                                                        : "bg-red-50 text-red-500"
                                                        }`}
                                                >
                                                    {user.status}
                                                </span>
                                            </td>

                                            <td className="px-4 py-4 text-sm font-medium text-slate-800">
                                                {user.joinedDate}
                                            </td>

                                            <td className="px-4 py-4 text-sm font-medium text-slate-800">
                                                {user.lastLogin}
                                            </td>

                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-3">

                                                    <Link
                                                        to="/admin/user"
                                                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-300 text-blue-600 hover:bg-blue-50"
                                                    >
                                                        <Eye size={18} />
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleEditUser(user)}
                                                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-300 text-blue-600 transition hover:bg-blue-50"
                                                    >
                                                        <Pencil size={18} />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteUser(user)}
                                                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-red-300 text-red-500 transition hover:bg-red-50"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>

                                                </div>
                                            </td>

                                        </tr>
                                    ))}

                                </tbody>

                            </table>

                        </div>

                        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-5 sm:flex-row">

                            <p className="text-sm text-slate-600">
                                Showing 1 to {filteredUsers.length} of 1,248 users
                            </p>

                            <div className="flex items-center gap-2">

                                <button
                                    type="button"
                                    onClick={() => setPage(Math.max(1, page - 1))}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
                                >
                                    <ChevronLeft size={17} />
                                </button>

                                {[1, 2, 3].map((number) => (
                                    <button
                                        key={number}
                                        type="button"
                                        onClick={() => setPage(number)}
                                        className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium ${page === number
                                            ? "border-blue-600 bg-blue-600 text-white"
                                            : "border-slate-200 text-slate-700"
                                            }`}
                                    >
                                        {number}
                                    </button>
                                ))}

                                <button
                                    type="button"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-sm text-slate-700"
                                >
                                    ...
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setPage(178)}
                                    className={`flex h-9 w-10 items-center justify-center rounded-lg border text-sm font-medium ${page === 178
                                        ? "border-blue-600 bg-blue-600 text-white"
                                        : "border-slate-200 text-slate-700"
                                        }`}
                                >
                                    178
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setPage(Math.min(178, page + 1))}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
                                >
                                    <ChevronRight size={17} />
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            </div>

            <Footer />
            
        </>
    );
};

export default AdminUserDetails;