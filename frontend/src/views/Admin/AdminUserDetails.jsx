import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    getAllUsers,
    deleteUser,
    updateUserStatus,
} from "../../api/adminApi";
import {
    ChevronRight,
    ChevronDown,
    ChevronLeft,
    Search,
    Users,
    UserCheck,
    UserX,
    UserRoundPlus,
    Eye,
    Trash2,
} from "lucide-react";
import AdminNavbar from "../../components/admin/AdminNavbar.jsx";
import Footer from "../../components/Home/Footer";

const AdminUserDetails = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [role, setRole] = useState("All Roles");
    const [status, setStatus] = useState("All Statuses");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const USERS_PER_PAGE = 10;

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getAllUsers();

            setUsers(response.data || []);
        } catch (error) {
            console.error("Fetch Users Error:", error);
            setError(
                error.message || "Failed to fetch users"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const formatDate = (date) => {
        if (!date) {
            return "—";
        }

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const formatLastLogin = (date) => {
        if (!date) {
            return "Never";
        }

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const getInitials = (name) => {
        if (!name) {
            return "U";
        }

        return name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
    };

    const filteredUsers = users.filter((user) => {
        const searchText = search
            .toLowerCase()
            .trim();

        const name =
            user.name?.toLowerCase() || "";

        const email =
            user.email?.toLowerCase() || "";

        const matchesSearch =
            name.includes(searchText) ||
            email.includes(searchText);

        const matchesRole =
            role === "All Roles" ||
            user.role?.toLowerCase() ===
                role.toLowerCase();

        const userStatus = user.isActive
            ? "Active"
            : "Inactive";

        const matchesStatus =
            status === "All Statuses" ||
            userStatus === status;

        return (
            matchesSearch &&
            matchesRole &&
            matchesStatus
        );
    });

    const totalUsers = users.length;

    const activeUsers = users.filter(
        (user) => user.isActive === true
    ).length;

    const inactiveUsers = users.filter(
        (user) => user.isActive === false
    ).length;

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const newThisMonth = users.filter((user) => {
        if (!user.createdAt) {
            return false;
        }

        const createdDate = new Date(
            user.createdAt
        );

        return (
            createdDate.getMonth() === currentMonth &&
            createdDate.getFullYear() === currentYear
        );
    }).length;

    const activePercentage =
        totalUsers > 0
            ? (
                  (activeUsers / totalUsers) *
                  100
              ).toFixed(1)
            : "0.0";

    const inactivePercentage =
        totalUsers > 0
            ? (
                  (inactiveUsers / totalUsers) *
                  100
              ).toFixed(1)
            : "0.0";

    const totalPages = Math.max(
        1,
        Math.ceil(
            filteredUsers.length / USERS_PER_PAGE
        )
    );

    const currentPage =
        Math.min(page, totalPages);

    const startIndex =
        (currentPage - 1) * USERS_PER_PAGE;

    const endIndex =
        startIndex + USERS_PER_PAGE;

    const currentUsers =
        filteredUsers.slice(
            startIndex,
            endIndex
        );

    const showingFrom =
        filteredUsers.length === 0
            ? 0
            : startIndex + 1;

    const showingTo =
        filteredUsers.length === 0
            ? 0
            : Math.min(
                  endIndex,
                  filteredUsers.length
              );

    const getPaginationItems = () => {
        const items = [];

        if (totalPages <= 5) {
            for (
                let i = 1;
                i <= totalPages;
                i++
            ) {
                items.push(i);
            }

            return items;
        }

        items.push(1);

        if (currentPage > 3) {
            items.push("left-ellipsis");
        }

        const start = Math.max(
            2,
            currentPage - 1
        );

        const end = Math.min(
            totalPages - 1,
            currentPage + 1
        );

        for (
            let i = start;
            i <= end;
            i++
        ) {
            if (!items.includes(i)) {
                items.push(i);
            }
        }

        if (currentPage < totalPages - 2) {
            items.push("right-ellipsis");
        }

        if (!items.includes(totalPages)) {
            items.push(totalPages);
        }

        return items;
    };

    const paginationItems =
        getPaginationItems();

    const handleSearchChange = (value) => {
        setSearch(value);
        setPage(1);
    };

    const handleRoleChange = (value) => {
        setRole(value);
        setPage(1);
    };

    const handleStatusChange = (value) => {
        setStatus(value);
        setPage(1);
    };

    const handlePreviousPage = () => {
        setPage((prevPage) =>
            Math.max(1, prevPage - 1)
        );
    };

    const handleNextPage = () => {
        setPage((prevPage) =>
            Math.min(
                totalPages,
                prevPage + 1
            )
        );
    };

    const handlePageChange = (pageNumber) => {
        if (
            pageNumber >= 1 &&
            pageNumber <= totalPages
        ) {
            setPage(pageNumber);
        }
    };

    const handleToggleUserStatus = async (
        user
    ) => {
        const newStatus = !user.isActive;

        const action = newStatus
            ? "activate"
            : "deactivate";

        const confirmAction =
            window.confirm(
                `Are you sure you want to ${action} ${user.name}?`
            );

        if (!confirmAction) {
            return;
        }

        try {
            await updateUserStatus(
                user._id,
                newStatus
            );

            setUsers((prevUsers) =>
                prevUsers.map((item) =>
                    item._id === user._id
                        ? {
                              ...item,
                              isActive:
                                  newStatus,
                          }
                        : item
                )
            );
        } catch (error) {
            console.error(
                "Update User Status Error:",
                error
            );

            window.alert(
                error.message ||
                    "Failed to update user status"
            );
        }
    };

    const handleDeleteUser = async (user) => {
        const confirmDelete =
            window.confirm(
                `Are you sure you want to delete ${user.name}?`
            );

        if (!confirmDelete) {
            return;
        }

        try {
            await deleteUser(user._id);

            setUsers((prevUsers) =>
                prevUsers.filter(
                    (item) =>
                        item._id !== user._id
                )
            );

            if (
                currentUsers.length === 1 &&
                currentPage > 1
            ) {
                setPage((prevPage) =>
                    Math.max(
                        1,
                        prevPage - 1
                    )
                );
            }
        } catch (error) {
            console.error(
                "Delete User Error:",
                error
            );

            window.alert(
                error.message ||
                    "Failed to delete user"
            );
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
                    </div>

                    <div className="mb-5 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

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
                                        {totalUsers.toLocaleString()}
                                    </h2>

                                    <p className="text-sm text-slate-600">
                                        Registered users
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
                                        {activeUsers.toLocaleString()}
                                    </h2>

                                    <p className="text-sm text-slate-600">
                                        <span className="font-semibold text-green-600">
                                            {
                                                activePercentage
                                            }
                                            %
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
                                        {inactiveUsers.toLocaleString()}
                                    </h2>

                                    <p className="text-sm text-slate-600">
                                        <span className="font-semibold text-orange-500">
                                            {
                                                inactivePercentage
                                            }
                                            %
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
                                        {newThisMonth.toLocaleString()}
                                    </h2>

                                    <p className="text-sm text-slate-600">
                                        New registrations
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

                        <div className="mb-5 flex flex-col gap-3 md:flex-row">

                            <div className="relative flex-1">
                                <Search
                                    size={20}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                                />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) =>
                                        handleSearchChange(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Search users by name or email..."
                                    className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-12 pr-4 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div className="relative w-full md:w-[218px]">
                                <select
                                    value={role}
                                    onChange={(e) =>
                                        handleRoleChange(
                                            e.target.value
                                        )
                                    }
                                    className="h-12 w-full cursor-pointer appearance-none rounded-lg border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option>
                                        All Roles
                                    </option>

                                    <option>
                                        User
                                    </option>

                                    <option>
                                        Admin
                                    </option>
                                </select>

                                <ChevronDown
                                    size={17}
                                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                                />
                            </div>

                            <div className="relative w-full md:w-[218px]">
                                <select
                                    value={status}
                                    onChange={(e) =>
                                        handleStatusChange(
                                            e.target.value
                                        )
                                    }
                                    className="h-12 w-full cursor-pointer appearance-none rounded-lg border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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

                        </div>

                        {loading && (
                            <div className="py-12 text-center text-sm font-medium text-slate-500">
                                Loading users...
                            </div>
                        )}

                        {!loading && error && (
                            <div className="py-12 text-center">
                                <p className="text-sm font-medium text-red-500">
                                    {error}
                                </p>

                                <button
                                    type="button"
                                    onClick={fetchUsers}
                                    className="mt-4 cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                                >
                                    Try Again
                                </button>
                            </div>
                        )}

                        {!loading && !error && (
                            <div className="overflow-x-auto">

                                <table className="w-full min-w-[1050px] border-collapse">

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

                                        {currentUsers.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan="7"
                                                    className="px-4 py-12 text-center text-sm text-slate-500"
                                                >
                                                    No users found.
                                                </td>
                                            </tr>
                                        ) : (
                                            currentUsers.map(
                                                (user) => {
                                                    const userStatus =
                                                        user.isActive
                                                            ? "Active"
                                                            : "Inactive";

                                                    return (
                                                        <tr
                                                            key={
                                                                user._id
                                                            }
                                                            className="border-b border-slate-100 last:border-b-0"
                                                        >

                                                            <td className="px-4 py-4">
                                                                <div className="flex items-center gap-4">

                                                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                                                                        {getInitials(
                                                                            user.name
                                                                        )}
                                                                    </div>

                                                                    <div>
                                                                        <p className="text-sm font-semibold text-slate-900">
                                                                            {user.name ||
                                                                                "Unknown User"}
                                                                        </p>

                                                                        <p className="mt-1 text-sm text-slate-500">
                                                                            {user.authProvider ||
                                                                                "local"}
                                                                        </p>
                                                                    </div>

                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-4 text-sm font-medium text-slate-800">
                                                                {user.email}
                                                            </td>

                                                            <td className="px-4 py-4">
                                                                <span
                                                                    className={`rounded-md px-3 py-1.5 text-xs font-semibold ${
                                                                        user.role?.toLowerCase() ===
                                                                        "admin"
                                                                            ? "bg-purple-50 text-purple-600"
                                                                            : "bg-blue-50 text-blue-600"
                                                                    }`}
                                                                >
                                                                    {user.role
                                                                        ? user.role
                                                                              .charAt(
                                                                                  0
                                                                              )
                                                                              .toUpperCase() +
                                                                          user.role.slice(
                                                                              1
                                                                          )
                                                                        : "User"}
                                                                </span>
                                                            </td>

                                                            <td className="px-4 py-4">
                                                                <span
                                                                    className={`rounded-md px-3 py-1.5 text-xs font-semibold ${
                                                                        userStatus ===
                                                                        "Active"
                                                                            ? "bg-green-50 text-green-600"
                                                                            : "bg-red-50 text-red-500"
                                                                    }`}
                                                                >
                                                                    {
                                                                        userStatus
                                                                    }
                                                                </span>
                                                            </td>

                                                            <td className="px-4 py-4 text-sm font-medium text-slate-800">
                                                                {formatDate(
                                                                    user.createdAt
                                                                )}
                                                            </td>

                                                            <td className="px-4 py-4 text-sm font-medium text-slate-800">
                                                                {formatLastLogin(
                                                                    user.lastLoginAt
                                                                )}
                                                            </td>

                                                            <td className="px-4 py-4">
                                                                <div className="flex items-center gap-3">

                                                                    <Link
                                                                        to={`/admin/users/${user._id}`}
                                                                        title="View User"
                                                                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-blue-300 text-blue-600 transition hover:bg-blue-50"
                                                                    >
                                                                        <Eye
                                                                            size={
                                                                                18
                                                                            }
                                                                        />
                                                                    </Link>

                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            handleToggleUserStatus(
                                                                                user
                                                                            )
                                                                        }
                                                                        title={
                                                                            user.isActive
                                                                                ? "Deactivate User"
                                                                                : "Activate User"
                                                                        }
                                                                        className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border transition ${
                                                                            user.isActive
                                                                                ? "border-orange-300 text-orange-500 hover:bg-orange-50"
                                                                                : "border-green-300 text-green-600 hover:bg-green-50"
                                                                        }`}
                                                                    >
                                                                        {user.isActive ? (
                                                                            <UserX
                                                                                size={
                                                                                    18
                                                                                }
                                                                            />
                                                                        ) : (
                                                                            <UserCheck
                                                                                size={
                                                                                    18
                                                                                }
                                                                            />
                                                                        )}
                                                                    </button>

                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            handleDeleteUser(
                                                                                user
                                                                            )
                                                                        }
                                                                        title="Delete User"
                                                                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-red-300 text-red-500 transition hover:bg-red-50"
                                                                    >
                                                                        <Trash2
                                                                            size={
                                                                                18
                                                                            }
                                                                        />
                                                                    </button>

                                                                </div>
                                                            </td>

                                                        </tr>
                                                    );
                                                }
                                            )
                                        )}

                                    </tbody>

                                </table>

                            </div>
                        )}

                        {!loading && !error && (
                            <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-5 sm:flex-row">

                                <p className="text-sm text-slate-600">
                                    Showing{" "}
                                    <span className="font-medium">
                                        {showingFrom}
                                    </span>{" "}
                                    to{" "}
                                    <span className="font-medium">
                                        {showingTo}
                                    </span>{" "}
                                    of{" "}
                                    <span className="font-medium">
                                        {filteredUsers.length.toLocaleString()}
                                    </span>{" "}
                                    users
                                </p>

                                <div className="flex items-center gap-2">

                                    <button
                                        type="button"
                                        onClick={
                                            handlePreviousPage
                                        }
                                        disabled={
                                            currentPage ===
                                            1
                                        }
                                        title="Previous Page"
                                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <ChevronLeft
                                            size={17}
                                        />
                                    </button>

                                    {paginationItems.map(
                                        (item, index) => {
                                            if (
                                                item ===
                                                    "left-ellipsis" ||
                                                item ===
                                                    "right-ellipsis"
                                            ) {
                                                return (
                                                    <span
                                                        key={`${item}-${index}`}
                                                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-sm text-slate-700"
                                                    >
                                                        ...
                                                    </span>
                                                );
                                            }

                                            return (
                                                <button
                                                    key={
                                                        item
                                                    }
                                                    type="button"
                                                    onClick={() =>
                                                        handlePageChange(
                                                            item
                                                        )
                                                    }
                                                    className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border text-sm font-medium transition ${
                                                        currentPage ===
                                                        item
                                                            ? "border-blue-600 bg-blue-600 text-white"
                                                            : "border-slate-200 text-slate-700 hover:bg-slate-50"
                                                    }`}
                                                >
                                                    {item}
                                                </button>
                                            );
                                        }
                                    )}

                                    <button
                                        type="button"
                                        onClick={
                                            handleNextPage
                                        }
                                        disabled={
                                            currentPage ===
                                            totalPages
                                        }
                                        title="Next Page"
                                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <ChevronRight
                                            size={17}
                                        />
                                    </button>

                                </div>

                            </div>
                        )}

                    </div>

                </div>
            </div>

            <Footer />
        </>
    );
};

export default AdminUserDetails;