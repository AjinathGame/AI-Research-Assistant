import React, { useState } from "react";
import {
    ChevronRight,
    ChevronDown,
    ChevronLeft,
    Search,
    Code2,
    CircleCheck,
    Clock3,
    SquarePlus,
    SlidersHorizontal,
    Eye,
    Pencil,
    Trash2,
    Plus,
} from "lucide-react";
import AdminNavbar from "../../components/admin/AdminNavbar.jsx";
import Footer from "../../components/Home/Footer";

const AdminTechnologies = () => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All Categories");
    const [status, setStatus] = useState("All Statuses");
    const [sort, setSort] = useState("Sort By: Name (A-Z)");
    const [page, setPage] = useState(1);

    const technologies = [
        {
            id: "1",
            name: "React",
            description: "JavaScript library for building user interfaces",
            category: "Frontend",
            version: "18.2.0",
            status: "Active",
            usedIn: "24 Projects",
            addedDate: "May 10, 2024",
            icon: "⚛",
            iconColor: "text-blue-500",
        },
        {
            id: "2",
            name: "Node.js",
            description: "JavaScript runtime built on Chrome's V8 engine",
            category: "Backend",
            version: "20.11.1",
            status: "Active",
            usedIn: "18 Projects",
            addedDate: "May 8, 2024",
            icon: "JS",
            iconColor: "text-green-600",
        },
        {
            id: "3",
            name: "TypeScript",
            description: "Typed superset of JavaScript",
            category: "Language",
            version: "5.4.5",
            status: "Active",
            usedIn: "22 Projects",
            addedDate: "May 12, 2024",
            icon: "TS",
            iconColor: "text-blue-600",
        },
        {
            id: "4",
            name: "MongoDB",
            description: "NoSQL document database",
            category: "Database",
            version: "7.0.5",
            status: "Active",
            usedIn: "15 Projects",
            addedDate: "May 6, 2024",
            icon: "◆",
            iconColor: "text-green-600",
        },
        {
            id: "5",
            name: "Tailwind CSS",
            description: "Utility-first CSS framework",
            category: "CSS Framework",
            version: "3.4.1",
            status: "Active",
            usedIn: "20 Projects",
            addedDate: "May 11, 2024",
            icon: "≈",
            iconColor: "text-cyan-500",
        },
        {
            id: "6",
            name: "Express.js",
            description: "Fast, unopinionated web framework for Node.js",
            category: "Backend",
            version: "4.18.2",
            status: "Active",
            usedIn: "16 Projects",
            addedDate: "May 9, 2024",
            icon: "ex",
            iconColor: "text-slate-700",
        },
        {
            id: "7",
            name: "Firebase",
            description: "Backend platform for web and mobile apps",
            category: "Backend",
            version: "10.12.2",
            status: "Deprecated",
            usedIn: "3 Projects",
            addedDate: "Apr 28, 2024",
            icon: "◆",
            iconColor: "text-orange-500",
        },
        {
            id: "8",
            name: "jQuery",
            description: "Fast, small, and feature-rich JavaScript library",
            category: "Frontend",
            version: "3.7.1",
            status: "Deprecated",
            usedIn: "2 Projects",
            addedDate: "Apr 20, 2024",
            icon: "jQ",
            iconColor: "text-blue-500",
        },
    ];

    const filteredTechnologies = technologies
        .filter((technology) => {
            const searchText = search.toLowerCase();

            const matchesSearch =
                technology.name.toLowerCase().includes(searchText) ||
                technology.category.toLowerCase().includes(searchText) ||
                technology.description.toLowerCase().includes(searchText);

            const matchesCategory =
                category === "All Categories" ||
                technology.category === category;

            const matchesStatus =
                status === "All Statuses" ||
                technology.status === status;

            return matchesSearch && matchesCategory && matchesStatus;
        })
        .sort((a, b) => {
            if (sort === "Sort By: Name (A-Z)") {
                return a.name.localeCompare(b.name);
            }

            if (sort === "Sort By: Name (Z-A)") {
                return b.name.localeCompare(a.name);
            }

            return 0;
        });

    const getCategoryClass = (value) => {
        switch (value) {
            case "Frontend":
                return "bg-blue-50 text-blue-600";
            case "Backend":
                return "bg-green-50 text-green-600";
            case "Language":
                return "bg-purple-50 text-purple-600";
            case "Database":
                return "bg-orange-50 text-orange-600";
            case "CSS Framework":
                return "bg-pink-50 text-pink-600";
            default:
                return "bg-slate-50 text-slate-600";
        }
    };

    const getStatusClass = (value) => {
        return value === "Active"
            ? "bg-green-50 text-green-600"
            : "bg-orange-50 text-orange-600";
    };

    const handleView = (id) => {
        console.log("View technology:", id);
    };

    const handleEdit = (id) => {
        console.log("Edit technology:", id);
    };

    const handleDelete = (id) => {
        console.log("Delete technology:", id);
    };

    return (
        <>
            <AdminNavbar />
            <div className="min-h-screen bg-[#f8fafc] px-5 py-7 text-[#172033] sm:px-8 lg:px-10">
                <div className="mx-auto max-w-[1500px]">

                    <div className="mb-8 flex items-start justify-between">
                        <div>
                            <div className="mb-4 flex items-center gap-3 text-sm">
                                <span className="font-semibold text-blue-600">
                                    Technologies
                                </span>

                                <ChevronRight
                                    size={16}
                                    className="text-slate-400"
                                />

                                <span className="text-slate-600">
                                    All Technologies
                                </span>
                            </div>

                            <h1 className="text-[30px] font-bold tracking-tight text-[#111827]">
                                All Technologies
                            </h1>

                            <p className="mt-1 text-[16px] text-slate-600">
                                Manage all technologies used in the platform.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                        >
                            <Plus size={19} />
                            Add New Technology
                        </button>
                    </div>

                    <div className="mb-5 grid grid-cols-1 gap-15 md:grid-cols-2 xl:grid-cols-4">

                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-5">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                                    <Code2
                                        size={31}
                                        className="text-blue-600"
                                    />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-slate-600">
                                        Total Technologies
                                    </p>

                                    <h2 className="mt-1 text-[27px] font-bold text-slate-900">
                                        42
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
                                    <CircleCheck
                                        size={31}
                                        className="text-green-600"
                                    />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-slate-600">
                                        Active Technologies
                                    </p>

                                    <h2 className="mt-1 text-[27px] font-bold text-slate-900">
                                        38
                                    </h2>

                                    <p className="text-sm text-slate-600">
                                        <span className="font-semibold text-green-600">
                                            90.5%
                                        </span>{" "}
                                        of total
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-5">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-orange-50">
                                    <Clock3
                                        size={31}
                                        className="text-orange-500"
                                    />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-slate-600">
                                        Deprecated
                                    </p>

                                    <h2 className="mt-1 text-[27px] font-bold text-slate-900">
                                        2
                                    </h2>

                                    <p className="text-sm text-slate-600">
                                        <span className="font-semibold text-orange-500">
                                            4.8%
                                        </span>{" "}
                                        of total
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-5">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-purple-50">
                                    <SquarePlus
                                        size={31}
                                        className="text-purple-600"
                                    />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-slate-600">
                                        New This Month
                                    </p>

                                    <h2 className="mt-1 text-[27px] font-bold text-slate-900">
                                        5
                                    </h2>

                                    <p className="text-sm text-slate-600">
                                        <span className="font-semibold text-green-600">
                                            11.9%
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
                                    placeholder="Search technologies by name or category..."
                                    className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-12 pr-4 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div className="relative w-full xl:w-[238px]">
                                <select
                                    value={category}
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                        setPage(1);
                                    }}
                                    className="h-12 w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-800 outline-none focus:border-blue-500"
                                >
                                    <option>All Categories</option>
                                    <option>Frontend</option>
                                    <option>Backend</option>
                                    <option>Language</option>
                                    <option>Database</option>
                                    <option>CSS Framework</option>
                                </select>

                                <ChevronDown
                                    size={17}
                                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                                />
                            </div>

                            <div className="relative w-full xl:w-[238px]">
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
                                    <option>Deprecated</option>
                                </select>

                                <ChevronDown
                                    size={17}
                                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                                />
                            </div>

                            <div className="relative w-full xl:w-[255px]">
                                <select
                                    value={sort}
                                    onChange={(e) => {
                                        setSort(e.target.value);
                                        setPage(1);
                                    }}
                                    className="h-12 w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-800 outline-none focus:border-blue-500"
                                >
                                    <option>Sort By: Name (A-Z)</option>
                                    <option>Sort By: Name (Z-A)</option>
                                </select>

                                <ChevronDown
                                    size={17}
                                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                                />
                            </div>

                            <button
                                type="button"
                                className="flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                <SlidersHorizontal size={17} />
                                Filter
                            </button>

                        </div>

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[1200px] border-collapse">

                                <thead>
                                    <tr className="bg-[#f4f7fb] text-left">

                                        <th className="rounded-l-lg px-4 py-4 text-sm font-semibold text-slate-700">
                                            Technology
                                        </th>

                                        <th className="px-4 py-4 text-sm font-semibold text-slate-700">
                                            Category
                                        </th>

                                        <th className="px-4 py-4 text-sm font-semibold text-slate-700">
                                            Version
                                        </th>

                                        <th className="px-4 py-4 text-sm font-semibold text-slate-700">
                                            Status
                                        </th>

                                        <th className="px-4 py-4 text-sm font-semibold text-slate-700">
                                            Used In
                                        </th>

                                        <th className="px-4 py-4 text-sm font-semibold text-slate-700">
                                            Added Date
                                        </th>

                                        <th className="rounded-r-lg px-4 py-4 text-sm font-semibold text-slate-700">
                                            Actions
                                        </th>

                                    </tr>
                                </thead>

                                <tbody>

                                    {filteredTechnologies.map((technology) => (
                                        <tr
                                            key={technology.id}
                                            className="border-b border-slate-100 last:border-b-0"
                                        >

                                            <td className="px-4 py-4">

                                                <div className="flex items-center gap-4">

                                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white">
                                                        <span
                                                            className={`text-lg font-bold ${technology.iconColor}`}
                                                        >
                                                            {technology.icon}
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <p className="text-sm font-semibold text-slate-900">
                                                            {technology.name}
                                                        </p>

                                                        <p className="mt-1 text-sm text-slate-500">
                                                            {technology.description}
                                                        </p>
                                                    </div>

                                                </div>

                                            </td>

                                            <td className="px-4 py-4">
                                                <span
                                                    className={`rounded-md px-3 py-1.5 text-xs font-semibold ${getCategoryClass(
                                                        technology.category
                                                    )}`}
                                                >
                                                    {technology.category}
                                                </span>
                                            </td>

                                            <td className="px-4 py-4 text-sm font-medium text-slate-800">
                                                {technology.version}
                                            </td>

                                            <td className="px-4 py-4">
                                                <span
                                                    className={`rounded-md px-3 py-1.5 text-xs font-semibold ${getStatusClass(
                                                        technology.status
                                                    )}`}
                                                >
                                                    {technology.status}
                                                </span>
                                            </td>

                                            <td className="px-4 py-4">
                                                <button
                                                    type="button"
                                                    className="text-sm font-medium text-blue-600 hover:underline"
                                                >
                                                    {technology.usedIn}
                                                </button>
                                            </td>

                                            <td className="px-4 py-4 text-sm font-medium text-slate-800">
                                                {technology.addedDate}
                                            </td>

                                            <td className="px-4 py-4">

                                                <div className="flex items-center gap-3">

                                                    <button
                                                        type="button"
                                                        onClick={() => handleView(technology.id)}
                                                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-300 text-blue-600 transition hover:bg-blue-50"
                                                    >
                                                        <Eye size={18} />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleEdit(technology.id)}
                                                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-300 text-blue-600 transition hover:bg-blue-50"
                                                    >
                                                        <Pencil size={18} />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(technology.id)}
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
                                Showing 1 to 8 of 42 technologies
                            </p>

                            <div className="flex items-center gap-2">

                                <button
                                    type="button"
                                    onClick={() => setPage(Math.max(1, page - 1))}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50"
                                >
                                    <ChevronLeft size={17} />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setPage(1)}
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium ${page === 1
                                        ? "border-blue-600 bg-blue-600 text-white"
                                        : "border-slate-200 text-slate-700"
                                        }`}
                                >
                                    1
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setPage(2)}
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium ${page === 2
                                        ? "border-blue-600 bg-blue-600 text-white"
                                        : "border-slate-200 text-slate-700"
                                        }`}
                                >
                                    2
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setPage(3)}
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium ${page === 3
                                        ? "border-blue-600 bg-blue-600 text-white"
                                        : "border-slate-200 text-slate-700"
                                        }`}
                                >
                                    3
                                </button>

                                <button
                                    type="button"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-sm text-slate-700"
                                >
                                    ...
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setPage(6)}
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium ${page === 6
                                        ? "border-blue-600 bg-blue-600 text-white"
                                        : "border-slate-200 text-slate-700"
                                        }`}
                                >
                                    6
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setPage(page + 1)}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50"
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

export default AdminTechnologies;