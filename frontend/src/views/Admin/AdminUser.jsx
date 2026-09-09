import React, { useState, useEffect } from "react";
import {
    ChevronRight,
    FileText,
    CircleHelp,
    Clock3,
    FileX2,
    Layers3,
    User,
} from "lucide-react";
import { useParams } from "react-router-dom";
import AdminNavbar from "../../components/admin/AdminNavbar";
import Footer from "../../components/Home/Footer";
import { getUserById } from "../../api/adminApi";

const AdminUsers = () => {
    const { id } = useParams();

    const [user, setUser] = useState(null);

    const [statistics, setStatistics] = useState({
        documents: 0,
        questions: 0,
        joinedDate: null,
    });

    const [activities, setActivities] = useState([]);
    const [showAllActivity, setShowAllActivity] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getUserById(id);

                if (response?.data?.user) {
                    setUser(response.data.user);

                    setStatistics({
                        documents:
                            response.data.statistics?.documents ?? 0,

                        questions:
                            response.data.statistics?.questions ?? 0,

                        joinedDate:
                            response.data.statistics?.joinedDate ??
                            response.data.user.createdAt,
                    });

                    setActivities(
                        response.data.recentActivity || []
                    );
                } else {
                    setError("User information not found");
                }
            } catch (error) {
                console.error(
                    "Get User Details Error:",
                    error
                );

                setError(
                    error.message ||
                        "Failed to fetch user details"
                );
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchUser();
        } else {
            setError("Invalid user ID");
            setLoading(false);
        }
    }, [id]);

    const formatDate = (date) => {
        if (!date) {
            return "—";
        }

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "—";
        }

        return parsedDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const formatDateTime = (date) => {
        if (!date) {
            return "Never";
        }

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "Never";
        }

        return parsedDate.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    };

    const getRelativeTime = (date) => {
        if (!date) {
            return "—";
        }

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "—";
        }

        const difference =
            Date.now() - parsedDate.getTime();

        if (difference < 0) {
            return "Just now";
        }

        const minutes = Math.floor(
            difference / (1000 * 60)
        );

        const hours = Math.floor(
            difference / (1000 * 60 * 60)
        );

        const days = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        if (minutes < 1) {
            return "Just now";
        }

        if (minutes < 60) {
            return `${minutes} min${
                minutes === 1 ? "" : "s"
            } ago`;
        }

        if (hours < 24) {
            return `${hours} hour${
                hours === 1 ? "" : "s"
            } ago`;
        }

        if (days < 7) {
            return `${days} day${
                days === 1 ? "" : "s"
            } ago`;
        }

        return formatDate(date);
    };

    const getInitials = (name, email) => {
        const value = name || email || "U";

        const parts = value
            .trim()
            .split(/\s+/)
            .filter(Boolean);

        if (parts.length >= 2) {
            return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
        }

        return value
            .substring(0, 2)
            .toUpperCase();
    };

    const getActivityIcon = (type) => {
        switch (type) {
            case "document_uploaded":
                return FileText;

            case "question_asked":
                return CircleHelp;

            case "technology_added":
                return Layers3;

            case "document_deleted":
                return FileX2;

            case "user_login":
                return User;

            case "user_registered":
                return User;

            default:
                return User;
        }
    };

    const getActivityBackground = (type) => {
        switch (type) {
            case "document_uploaded":
                return "bg-green-50";

            case "question_asked":
                return "bg-purple-50";

            case "technology_added":
                return "bg-orange-50";

            case "document_deleted":
                return "bg-red-50";

            case "user_login":
                return "bg-blue-50";

            case "user_registered":
                return "bg-blue-50";

            default:
                return "bg-gray-50";
        }
    };

    const getActivityColor = (type) => {
        switch (type) {
            case "document_uploaded":
                return "text-green-600";

            case "question_asked":
                return "text-purple-600";

            case "technology_added":
                return "text-orange-500";

            case "document_deleted":
                return "text-red-500";

            case "user_login":
                return "text-blue-600";

            case "user_registered":
                return "text-blue-600";

            default:
                return "text-gray-600";
        }
    };

    const visibleActivities = showAllActivity
        ? activities
        : activities.slice(0, 10);

    if (loading) {
        return (
            <>
                <AdminNavbar />

                <div className="min-h-screen bg-[#f8fafc] px-5 py-7 text-[#172033] sm:px-8 lg:px-10">
                    <div className="mx-auto max-w-[1400px]">
                        <div className="flex min-h-[500px] items-center justify-center">
                            <div className="text-center">
                                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600"></div>

                                <p className="mt-4 text-sm font-medium text-slate-600">
                                    Loading user details...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </>
        );
    }

    if (error || !user) {
        return (
            <>
                <AdminNavbar />

                <div className="min-h-screen bg-[#f8fafc] px-5 py-7 text-[#172033] sm:px-8 lg:px-10">
                    <div className="mx-auto max-w-[1400px]">
                        <div className="flex min-h-[500px] items-center justify-center">
                            <div className="rounded-xl border border-red-200 bg-white p-8 text-center shadow-sm">
                                <h2 className="text-lg font-bold text-red-600">
                                    Unable to Load User
                                </h2>

                                <p className="mt-2 text-sm text-slate-600">
                                    {error ||
                                        "User information could not be found."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </>
        );
    }

    const userStatus =
        user.isActive === false
            ? "Inactive"
            : "Active";

    const userRole =
        user.role === "admin"
            ? "Admin"
            : "User";

    const initials = getInitials(
        user.name,
        user.email
    );

    const statusClass =
        user.isActive === false
            ? "bg-red-50 text-red-600"
            : "bg-green-50 text-green-600";

    const roleClass =
        user.role === "admin"
            ? "bg-purple-50 text-purple-600"
            : "bg-blue-50 text-blue-600";

    return (
        <>
            <AdminNavbar />

            <div className="min-h-screen bg-[#f8fafc] px-5 py-7 text-[#172033] sm:px-8 lg:px-10">
                <div className="mx-auto max-w-[1400px]">

                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <div className="mb-3 flex items-center gap-3 text-sm">
                                <span className="cursor-pointer font-medium text-blue-600 hover:text-blue-700">
                                    Users
                                </span>

                                <ChevronRight
                                    size={16}
                                    className="text-slate-400"
                                />

                                <span className="cursor-pointer text-slate-600 hover:text-slate-800">
                                    User Details
                                </span>
                            </div>

                            <h1 className="text-[28px] font-bold tracking-tight text-[#111827]">
                                User Details
                            </h1>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.15fr_0.85fr]">

                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

                            <h2 className="mb-6 text-[17px] font-bold text-[#172033]">
                                User Information
                            </h2>

                            <div className="grid grid-cols-1 gap-7 md:grid-cols-[160px_1fr]">

                                <div className="flex flex-col items-center">

                                    <div className="flex h-[138px] w-[138px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-blue-50 text-3xl font-bold text-blue-600">
                                        {initials}
                                    </div>

                                    <span
                                        className={`mt-4 cursor-default rounded-md px-3 py-1 text-xs font-semibold ${statusClass}`}
                                    >
                                        {userStatus}
                                    </span>

                                </div>

                                <div className="border-l border-slate-200 pl-7">

                                    <div className="grid grid-cols-[115px_1fr] gap-y-5 text-sm">

                                        <span className="text-slate-500">
                                            Full Name
                                        </span>

                                        <span className="font-medium text-slate-900">
                                            {user.name || "—"}
                                        </span>

                                        <span className="text-slate-500">
                                            Email
                                        </span>

                                        <span className="break-all font-medium text-slate-900">
                                            {user.email || "—"}
                                        </span>

                                        <span className="text-slate-500">
                                            Role
                                        </span>

                                        <span>
                                            <span
                                                className={`cursor-default rounded-md px-3 py-1 text-xs font-semibold ${roleClass}`}
                                            >
                                                {userRole}
                                            </span>
                                        </span>

                                        <span className="text-slate-500">
                                            Joined Date
                                        </span>

                                        <span className="font-medium text-slate-900">
                                            {formatDate(
                                                user.createdAt
                                            )}
                                        </span>

                                        <span className="text-slate-500">
                                            Last Login
                                        </span>

                                        <span className="font-medium text-slate-900">
                                            {formatDateTime(
                                                user.lastLoginAt
                                            )}
                                        </span>

                                        <span className="text-slate-500">
                                            Status
                                        </span>

                                        <span>
                                            <span
                                                className={`cursor-default rounded-md px-3 py-1 text-xs font-semibold ${statusClass}`}
                                            >
                                                {userStatus}
                                            </span>
                                        </span>

                                        <span className="text-slate-500">
                                            Auth Provider
                                        </span>

                                        <span className="font-medium capitalize text-slate-900">
                                            {user.authProvider ||
                                                "Local"}
                                        </span>

                                        <span className="text-slate-500">
                                            User ID
                                        </span>

                                        <span className="break-all font-medium text-slate-900">
                                            {user._id || "—"}
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
                                            <FileText
                                                size={29}
                                                className="text-blue-600"
                                            />
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-slate-600">
                                                Documents
                                            </p>

                                            <h3 className="mt-1 text-[28px] font-bold text-slate-900">
                                                {
                                                    statistics.documents
                                                }
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
                                            <CircleHelp
                                                size={29}
                                                className="text-purple-600"
                                            />
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-slate-600">
                                                Questions
                                            </p>

                                            <h3 className="mt-1 text-[28px] font-bold text-slate-900">
                                                {
                                                    statistics.questions
                                                }
                                            </h3>

                                            <p className="mt-1 text-sm text-slate-500">
                                                Total asked
                                            </p>
                                        </div>

                                    </div>
                                </div>

                                <div className="rounded-xl border border-slate-200 p-5 sm:col-span-2">

                                    <div className="flex items-center gap-5">

                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-50">
                                            <Clock3
                                                size={29}
                                                className="text-green-600"
                                            />
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-slate-600">
                                                Joined
                                            </p>

                                            <h3 className="mt-1 text-[20px] font-bold text-slate-900">
                                                {formatDate(
                                                    statistics.joinedDate
                                                )}
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

                            {activities.length > 10 && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowAllActivity(
                                            (prev) => !prev
                                        )
                                    }
                                    className="cursor-pointer text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                                >
                                    {showAllActivity
                                        ? "Show Less Activity"
                                        : "View All Activity"}
                                </button>
                            )}

                        </div>

                        <div>

                            {visibleActivities.length > 0 ? (

                                visibleActivities.map(
                                    (activity, index) => {

                                        const Icon =
                                            getActivityIcon(
                                                activity.type
                                            );

                                        const background =
                                            activity.bg ||
                                            getActivityBackground(
                                                activity.type
                                            );

                                        const iconColor =
                                            activity.color ||
                                            getActivityColor(
                                                activity.type
                                            );

                                        return (
                                            <div
                                                key={
                                                    activity.id ||
                                                    activity._id ||
                                                    index
                                                }
                                                className="flex cursor-default items-center gap-4 border-b border-slate-100 py-3 last:border-b-0"
                                            >

                                                <div
                                                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${background}`}
                                                >
                                                    <Icon
                                                        size={21}
                                                        className={
                                                            iconColor
                                                        }
                                                    />
                                                </div>

                                                <div className="min-w-0 flex-1">

                                                    <p className="text-sm font-semibold text-slate-900">
                                                        {activity.title ||
                                                            "Activity"}
                                                    </p>

                                                    <p className="mt-1 truncate text-sm text-slate-600">
                                                        {activity.subtitle ||
                                                            activity.description ||
                                                            "—"}
                                                    </p>

                                                </div>

                                                <div className="shrink-0 text-sm text-slate-500">
                                                    {activity.time ||
                                                        getRelativeTime(
                                                            activity.createdAt
                                                        )}
                                                </div>

                                            </div>
                                        );
                                    }
                                )

                            ) : (

                                <div className="py-8 text-center">

                                    <p className="text-sm text-slate-500">
                                        No recent activity available.
                                    </p>

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

export default AdminUsers;