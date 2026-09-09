import React, { useEffect, useMemo, useState } from "react";
import {
    ChevronRight,
    ChevronDown,
    ChevronLeft,
    Search,
    Code2,
    CircleCheck,
    Clock3,
    Eye,
    Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import AdminNavbar from "../../components/admin/AdminNavbar.jsx";
import Footer from "../../components/Home/Footer";
import {
    getAllTechnologies,
    deleteTechnology,
} from "../../api/adminApi";

const ITEMS_PER_PAGE = 8;

const AdminTechnologies = () => {
    const [technologies, setTechnologies] = useState([]);

    const [statistics, setStatistics] = useState({
        total: 0,
        active: 0,
        inactive: 0,
        newThisMonth: 0,
    });

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All Statuses");
    const [sort, setSort] = useState("Sort By: Name (A-Z)");
    const [page, setPage] = useState(1);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchTechnologies = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getAllTechnologies();

            const technologyData = Array.isArray(response?.data)
                ? response.data
                : Array.isArray(response?.data?.technologies)
                ? response.data.technologies
                : [];

            const stats =
                response?.statistics ||
                response?.data?.statistics ||
                {};

            const normalizedTechnologies = technologyData.map(
                (technology) => ({
                    ...technology,

                    usedIn: Number(
                        technology.usedIn ??
                            technology.documentCount ??
                            technology.documentsCount ??
                            technology.pdfCount ??
                            0
                    ),
                })
            );

            setTechnologies(normalizedTechnologies);

            setStatistics({
                total: Number(
                    stats.total ?? normalizedTechnologies.length
                ),

                active: Number(
                    stats.active ??
                        normalizedTechnologies.filter(
                            (technology) =>
                                technology.isActive !== false
                        ).length
                ),

                inactive: Number(
                    stats.inactive ??
                        normalizedTechnologies.filter(
                            (technology) =>
                                technology.isActive === false
                        ).length
                ),

                newThisMonth: Number(
                    stats.newThisMonth ?? 0
                ),
            });
        } catch (error) {
            console.error(
                "Get Technologies Error:",
                error
            );

            setError(
                error.message ||
                    "Failed to fetch technologies"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTechnologies();
    }, []);

    const getStatusClass = (value) => {
        return value === "Active"
            ? "bg-green-50 text-green-600"
            : "bg-orange-50 text-orange-600";
    };

    const filteredTechnologies = useMemo(() => {
        const searchText = search
            .trim()
            .toLowerCase();

        const filtered = technologies.filter(
            (technology) => {
                const name =
                    technology.name?.toLowerCase() || "";

                const description =
                    technology.description?.toLowerCase() || "";

                const matchesSearch =
                    !searchText ||
                    name.includes(searchText) ||
                    description.includes(searchText);

                const technologyStatus =
                    technology.isActive !== false
                        ? "Active"
                        : "Inactive";

                const matchesStatus =
                    status === "All Statuses" ||
                    technologyStatus === status;

                return (
                    matchesSearch &&
                    matchesStatus
                );
            }
        );

        return [...filtered].sort((a, b) => {
            const nameA =
                a.name?.toLowerCase() || "";

            const nameB =
                b.name?.toLowerCase() || "";

            if (sort === "Sort By: Name (A-Z)") {
                return nameA.localeCompare(nameB);
            }

            if (sort === "Sort By: Name (Z-A)") {
                return nameB.localeCompare(nameA);
            }

            if (sort === "Sort By: Newest") {
                return (
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
                );
            }

            if (sort === "Sort By: Oldest") {
                return (
                    new Date(a.createdAt) -
                    new Date(b.createdAt)
                );
            }

            return 0;
        });
    }, [
        technologies,
        search,
        status,
        sort,
    ]);

    const totalPages = Math.max(
        1,
        Math.ceil(
            filteredTechnologies.length /
                ITEMS_PER_PAGE
        )
    );

    useEffect(() => {
        if (page > totalPages) {
            setPage(totalPages);
        }
    }, [page, totalPages]);

    const paginatedTechnologies =
        filteredTechnologies.slice(
            (page - 1) * ITEMS_PER_PAGE,
            page * ITEMS_PER_PAGE
        );

    const showingFrom =
        filteredTechnologies.length === 0
            ? 0
            : (page - 1) * ITEMS_PER_PAGE + 1;

    const showingTo = Math.min(
        page * ITEMS_PER_PAGE,
        filteredTechnologies.length
    );

    const formatDate = (date) => {
        if (!date) return "—";

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "—";
        }

        return parsedDate.toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "numeric",
                year: "numeric",
            }
        );
    };

    const handleDelete = async (technology) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete ${technology.name}?`
        );

        if (!confirmed) return;

        try {
            await deleteTechnology(
                technology._id
            );

            setTechnologies((prev) =>
                prev.filter(
                    (item) =>
                        item._id !==
                        technology._id
                )
            );

            setStatistics((prev) => ({
                ...prev,

                total: Math.max(
                    0,
                    prev.total - 1
                ),

                active:
                    technology.isActive !== false
                        ? Math.max(
                              0,
                              prev.active - 1
                          )
                        : prev.active,

                inactive:
                    technology.isActive === false
                        ? Math.max(
                              0,
                              prev.inactive - 1
                          )
                        : prev.inactive,
            }));
        } catch (error) {
            console.error(
                "Delete Technology Error:",
                error
            );

            window.alert(
                error.message ||
                    "Failed to delete technology"
            );
        }
    };

    const handleSearchChange = (value) => {
        setSearch(value);
        setPage(1);
    };

    const handleStatusChange = (value) => {
        setStatus(value);
        setPage(1);
    };

    const handleSortChange = (value) => {
        setSort(value);
        setPage(1);
    };

    const goToPage = (pageNumber) => {
        if (
            pageNumber >= 1 &&
            pageNumber <= totalPages
        ) {
            setPage(pageNumber);
        }
    };

    const renderPagination = () => {
        if (totalPages <= 1) {
            return null;
        }

        const pages = [];

        if (totalPages <= 5) {
            for (
                let i = 1;
                i <= totalPages;
                i++
            ) {
                pages.push(i);
            }
        } else if (page <= 3) {
            pages.push(
                1,
                2,
                3,
                "...",
                totalPages
            );
        } else if (page >= totalPages - 2) {
            pages.push(
                1,
                "...",
                totalPages - 2,
                totalPages - 1,
                totalPages
            );
        } else {
            pages.push(
                1,
                "...",
                page,
                "...",
                totalPages
            );
        }

        return pages.map((item, index) => {
            if (item === "...") {
                return (
                    <span
                        key={`dots-${index}`}
                        className="flex h-9 w-9 items-center justify-center text-sm text-slate-500"
                    >
                        ...
                    </span>
                );
            }

            return (
                <button
                    key={item}
                    type="button"
                    onClick={() =>
                        goToPage(item)
                    }
                    className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border text-sm font-medium transition ${
                        page === item
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                >
                    {item}
                </button>
            );
        });
    };

    if (loading) {
        return (
            <>
                <AdminNavbar />

                <div className="min-h-screen bg-[#f8fafc] px-5 py-7 text-[#172033] sm:px-8 lg:px-10">
                    <div className="mx-auto max-w-[1500px]">
                        <div className="flex min-h-[600px] items-center justify-center">
                            <div className="text-center">
                                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

                                <p className="mt-4 text-sm font-medium text-slate-600">
                                    Loading technologies...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <AdminNavbar />

                <div className="min-h-screen bg-[#f8fafc] px-5 py-7 text-[#172033] sm:px-8 lg:px-10">
                    <div className="mx-auto max-w-[1500px]">
                        <div className="flex min-h-[600px] items-center justify-center">
                            <div className="rounded-xl border border-red-200 bg-white p-8 text-center shadow-sm">
                                <h2 className="text-lg font-bold text-red-600">
                                    Unable to Load Technologies
                                </h2>

                                <p className="mt-2 text-sm text-slate-600">
                                    {error}
                                </p>

                                <button
                                    type="button"
                                    onClick={
                                        fetchTechnologies
                                    }
                                    className="mt-5 cursor-pointer rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </>
        );
    }

    return (
        <>
            <AdminNavbar />

            <div className="min-h-screen bg-[#f8fafc] px-5 py-7 text-[#172033] sm:px-8 lg:px-10">
                <div className="mx-auto max-w-[1500px]">

                    <div className="mb-8">
                        <div>
                            <div className="mb-4 flex items-center gap-3 text-sm">
                                <span className="cursor-pointer font-semibold text-blue-600">
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
                    </div>

                    <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

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
                                        {statistics.total}
                                    </h2>

                                    <p className="text-sm text-slate-600">
                                        All technologies
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
                                        {statistics.active}
                                    </h2>

                                    <p className="text-sm text-slate-600">
                                        {statistics.total > 0
                                            ? `${(
                                                  (statistics.active /
                                                      statistics.total) *
                                                  100
                                              ).toFixed(1)}% of total`
                                            : "0% of total"}
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
                                        Inactive
                                    </p>

                                    <h2 className="mt-1 text-[27px] font-bold text-slate-900">
                                        {statistics.inactive}
                                    </h2>

                                    <p className="text-sm text-slate-600">
                                        {statistics.total > 0
                                            ? `${(
                                                  (statistics.inactive /
                                                      statistics.total) *
                                                  100
                                              ).toFixed(1)}% of total`
                                            : "0% of total"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-5">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-purple-50">
                                    <CircleCheck
                                        size={31}
                                        className="text-purple-600"
                                    />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-slate-600">
                                        New This Month
                                    </p>

                                    <h2 className="mt-1 text-[27px] font-bold text-slate-900">
                                        {statistics.newThisMonth}
                                    </h2>

                                    <p className="text-sm text-slate-600">
                                        Added this month
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
                                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                                />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) =>
                                        handleSearchChange(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Search technologies by name or description..."
                                    className="h-12 w-full cursor-text rounded-lg border border-slate-200 bg-white pl-12 pr-4 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div className="relative w-full xl:w-[238px]">
                                <select
                                    value={status}
                                    onChange={(e) =>
                                        handleStatusChange(
                                            e.target.value
                                        )
                                    }
                                    className="h-12 w-full cursor-pointer appearance-none rounded-lg border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-800 outline-none focus:border-blue-500"
                                >
                                    <option>
                                        All Statuses
                                    </option>

                                    <option>
                                        Active
                                    </option>

                                    <option>
                                        Inactive
                                    </option>
                                </select>

                                <ChevronDown
                                    size={17}
                                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                                />
                            </div>

                            <div className="relative w-full xl:w-[255px]">
                                <select
                                    value={sort}
                                    onChange={(e) =>
                                        handleSortChange(
                                            e.target.value
                                        )
                                    }
                                    className="h-12 w-full cursor-pointer appearance-none rounded-lg border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-800 outline-none focus:border-blue-500"
                                >
                                    <option>
                                        Sort By: Name (A-Z)
                                    </option>

                                    <option>
                                        Sort By: Name (Z-A)
                                    </option>

                                    <option>
                                        Sort By: Newest
                                    </option>

                                    <option>
                                        Sort By: Oldest
                                    </option>
                                </select>

                                <ChevronDown
                                    size={17}
                                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                                />
                            </div>

                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1100px] border-collapse">

                                <thead>
                                    <tr className="bg-[#f4f7fb] text-left">

                                        <th className="rounded-l-lg px-4 py-4 text-sm font-semibold text-slate-700">
                                            Technology
                                        </th>

                                        <th className="px-4 py-4 text-sm font-semibold text-slate-700">
                                            Created By
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
                                    {paginatedTechnologies.length > 0 ? (
                                        paginatedTechnologies.map(
                                            (technology) => {
                                                const technologyStatus =
                                                    technology.isActive !== false
                                                        ? "Active"
                                                        : "Inactive";

                                                const documentCount =
                                                    Number(
                                                        technology.usedIn ??
                                                            technology.documentCount ??
                                                            technology.documentsCount ??
                                                            technology.pdfCount ??
                                                            0
                                                    );

                                                return (
                                                    <tr
                                                        key={
                                                            technology._id
                                                        }
                                                        className="border-b border-slate-100 last:border-b-0"
                                                    >

                                                        <td className="px-4 py-4">
                                                            <div className="flex items-center gap-4">

                                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white">
                                                                    <Code2
                                                                        size={21}
                                                                        className="text-blue-600"
                                                                    />
                                                                </div>

                                                                <div className="max-w-[430px]">
                                                                    <p className="text-sm font-semibold text-slate-900">
                                                                        {
                                                                            technology.name
                                                                        }
                                                                    </p>

                                                                    <p className="mt-1 truncate text-sm text-slate-500">
                                                                        {technology.description ||
                                                                            "No description available"}
                                                                    </p>
                                                                </div>

                                                            </div>
                                                        </td>

                                                        <td className="px-4 py-4">
                                                            <p className="text-sm font-medium text-slate-800">
                                                                {technology.userId?.name ||
                                                                    "Unknown"}
                                                            </p>

                                                            <p className="mt-1 text-xs text-slate-500">
                                                                {technology.userId?.email ||
                                                                    "—"}
                                                            </p>
                                                        </td>

                                                        <td className="px-4 py-4">
                                                            <span
                                                                className={`rounded-md px-3 py-1.5 text-xs font-semibold ${getStatusClass(
                                                                    technologyStatus
                                                                )}`}
                                                            >
                                                                {
                                                                    technologyStatus
                                                                }
                                                            </span>
                                                        </td>

                                                        <td className="px-4 py-4">
                                                            <Link
                                                                to={`/admin/technologies/${technology._id}`}
                                                                className="cursor-pointer text-sm font-medium text-blue-600 hover:underline"
                                                            >
                                                                {documentCount}{" "}
                                                                {documentCount ===
                                                                1
                                                                    ? "Document"
                                                                    : "Documents"}
                                                            </Link>
                                                        </td>

                                                        <td className="px-4 py-4 text-sm font-medium text-slate-800">
                                                            {formatDate(
                                                                technology.createdAt
                                                            )}
                                                        </td>

                                                        <td className="px-4 py-4">
                                                            <div className="flex items-center gap-3">

                                                                <Link
                                                                    to={`/admin/technologies/${technology._id}`}
                                                                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-blue-300 text-blue-600 transition hover:bg-blue-50"
                                                                    title="View Technology"
                                                                >
                                                                    <Eye
                                                                        size={18}
                                                                    />
                                                                </Link>

                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            technology
                                                                        )
                                                                    }
                                                                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-red-300 text-red-500 transition hover:bg-red-50"
                                                                    title="Delete Technology"
                                                                >
                                                                    <Trash2
                                                                        size={18}
                                                                    />
                                                                </button>

                                                            </div>
                                                        </td>

                                                    </tr>
                                                );
                                            }
                                        )
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="px-4 py-16 text-center"
                                            >
                                                <div className="flex flex-col items-center justify-center">

                                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                                                        <Code2
                                                            size={26}
                                                            className="text-slate-400"
                                                        />
                                                    </div>

                                                    <h3 className="mt-4 text-base font-semibold text-slate-900">
                                                        No technologies found
                                                    </h3>

                                                    <p className="mt-1 text-sm text-slate-500">
                                                        Try changing your search or filter.
                                                    </p>

                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>
                        </div>

                        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-5 sm:flex-row">

                            <p className="text-sm text-slate-600">
                                Showing{" "}
                                {showingFrom} to{" "}
                                {showingTo} of{" "}
                                {filteredTechnologies.length}{" "}
                                technologies
                            </p>

                            {filteredTechnologies.length > 0 && (
                                <div className="flex items-center gap-2">

                                    <button
                                        type="button"
                                        disabled={page === 1}
                                        onClick={() =>
                                            goToPage(
                                                page - 1
                                            )
                                        }
                                        className={`flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition ${
                                            page === 1
                                                ? "cursor-not-allowed opacity-40"
                                                : "cursor-pointer hover:bg-slate-50"
                                        }`}
                                        title="Previous Page"
                                    >
                                        <ChevronLeft
                                            size={17}
                                        />
                                    </button>

                                    {renderPagination()}

                                    <button
                                        type="button"
                                        disabled={
                                            page ===
                                            totalPages
                                        }
                                        onClick={() =>
                                            goToPage(
                                                page + 1
                                            )
                                        }
                                        className={`flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition ${
                                            page ===
                                            totalPages
                                                ? "cursor-not-allowed opacity-40"
                                                : "cursor-pointer hover:bg-slate-50"
                                        }`}
                                        title="Next Page"
                                    >
                                        <ChevronRight
                                            size={17}
                                        />
                                    </button>

                                </div>
                            )}

                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default AdminTechnologies;