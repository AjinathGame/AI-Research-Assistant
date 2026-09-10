import React, { useEffect, useState } from "react";
import {
    ArrowLeft,
    ChevronRight,
    Trash2,
    Eye,
    BookOpen,
    Layers,
    CircleHelp,
    Info,
    BarChart3,
    Folder,
    X,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import AdminNavbar from "../../components/admin/AdminNavbar";
import Footer from "../../components/Home/Footer";
import ConfirmModal from "../../components/common/ConfirmModal";
import { getTechnologyById } from "../../api/adminApi";

const AdminTechnologyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [technology, setTechnology] = useState(null);

    const [statistics, setStatistics] = useState({
        totalPdfs: 0,
        totalPages: 0,
        totalChunks: 0,
        totalQuestions: 0,
        totalItems: 0,
    });

    const [folders, setFolders] = useState([]);

    const [selectedFolder, setSelectedFolder] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        folder: null,
    });

    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        const fetchTechnologyDetails = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getTechnologyById(id);

                const data = response?.data || {};

                if (!data?.technology) {
                    setError(
                        "Technology information not found"
                    );
                    return;
                }

                setTechnology(data.technology);

                const stats = data.statistics || {};

                setStatistics({
                    totalPdfs: Number(
                        stats.totalPdfs ??
                            stats.pdfs ??
                            0
                    ),

                    totalPages: Number(
                        stats.totalPages ??
                            stats.pages ??
                            0
                    ),

                    totalChunks: Number(
                        stats.totalChunks ??
                            stats.chunks ??
                            0
                    ),

                    totalQuestions: Number(
                        stats.totalQuestions ??
                            stats.questions ??
                            0
                    ),

                    totalItems: Number(
                        stats.totalItems ?? 0
                    ),
                });

                setFolders(
                    Array.isArray(data.folders)
                        ? data.folders
                        : []
                );
            } catch (error) {
                console.error(
                    "Get Technology Details Error:",
                    error
                );

                setError(
                    error.message ||
                        "Failed to fetch technology details"
                );
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchTechnologyDetails();
        } else {
            setError("Invalid technology ID");
            setLoading(false);
        }
    }, [id]);

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

    const formatDateTime = (date) => {
        if (!date) return "—";

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "—";
        }

        return parsedDate.toLocaleString(
            "en-US",
            {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            }
        );
    };

    const formatNumber = (value) => {
        return Number(value || 0).toLocaleString(
            "en-US"
        );
    };

    const getStatusClass = (isActive) => {
        return isActive
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600";
    };

    const handleBack = () => {
        navigate("/admin/technologies");
    };

    const handleViewFolder = (folder) => {
        setSelectedFolder(folder);
    };

    const closeFolderModal = () => {
        setSelectedFolder(null);
    };

    const getFolderPdfCount = (folder) => {
        if (!folder) return 0;

        if (Array.isArray(folder.pdfs)) {
            return folder.pdfs.length;
        }

        if (Array.isArray(folder.documents)) {
            return folder.documents.length;
        }

        if (Array.isArray(folder.files)) {
            return folder.files.length;
        }

        if (Array.isArray(folder.pdfDocuments)) {
            return folder.pdfDocuments.length;
        }

        return Number(
            folder.pdfCount ??
                folder.totalPdfs ??
                folder.pdfs ??
                folder.documentsCount ??
                folder.documentCount ??
                folder.filesCount ??
                0
        );
    };

    const openDeleteFolderModal = (folder) => {
        setConfirmModal({
            isOpen: true,
            folder,
        });
    };

    const closeConfirmModal = () => {
        if (actionLoading) {
            return;
        }

        setConfirmModal({
            isOpen: false,
            folder: null,
        });
    };

    const handleDeleteFolder = async () => {
        const folder = confirmModal.folder;

        if (!folder) {
            return;
        }

        try {
            setActionLoading(true);

            setError(
                "Delete folder feature is not connected yet."
            );

            setConfirmModal({
                isOpen: false,
                folder: null,
            });
        } catch (error) {
            console.error(
                "Delete Folder Error:",
                error
            );

            setError(
                error.message ||
                    "Failed to delete folder"
            );
        } finally {
            setActionLoading(false);
        }
    };

    const stats = [
        {
            title: "Total PDFs",
            value: statistics.totalPdfs,
            change: "Uploaded documents",
            icon: BookOpen,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-600",
        },
        {
            title: "Total Pages",
            value: statistics.totalPages,
            change: "Across all PDFs",
            icon: BookOpen,
            iconBg: "bg-green-50",
            iconColor: "text-green-600",
        },
        {
            title: "Total Text Chunks",
            value: statistics.totalChunks,
            change: "Processed chunks",
            icon: Layers,
            iconBg: "bg-purple-50",
            iconColor: "text-purple-600",
        },
        {
            title: "Questions Asked",
            value: statistics.totalQuestions,
            change: "Questions for this technology",
            icon: CircleHelp,
            iconBg: "bg-orange-50",
            iconColor: "text-orange-500",
        },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f8fafc] text-[#111827]">
                <AdminNavbar />

                <main className="mx-auto flex min-h-[600px] w-full max-w-[1500px] items-center justify-center px-4 py-8 sm:px-6 lg:px-8 xl:px-10">
                    <div className="text-center">
                        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

                        <p className="mt-4 text-sm font-medium text-slate-600">
                            Loading technology details...
                        </p>
                    </div>
                </main>

                <Footer />
            </div>
        );
    }

    if (error && !technology) {
        return (
            <div className="min-h-screen bg-[#f8fafc] text-[#111827]">
                <AdminNavbar />

                <main className="mx-auto flex min-h-[600px] w-full max-w-[1500px] items-center justify-center px-4 py-8 sm:px-6 lg:px-8 xl:px-10">
                    <div className="rounded-xl border border-red-200 bg-white p-8 text-center shadow-sm">
                        <h2 className="text-lg font-bold text-red-600">
                            Unable to Load Technology
                        </h2>

                        <p className="mt-2 text-sm text-slate-600">
                            {error ||
                                "Technology information could not be found."}
                        </p>

                        <button
                            type="button"
                            onClick={handleBack}
                            className="mt-5 cursor-pointer rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                            Back to Technologies
                        </button>
                    </div>
                </main>

                <Footer />
            </div>
        );
    }

    const technologyStatus =
        technology.isActive === false
            ? "Inactive"
            : "Active";

    const createdBy =
        technology.userId?.name ||
        technology.userId?.email ||
        "Unknown";

    const createdByEmail =
        technology.userId?.email || "";

    return (
        <div className="min-h-screen bg-[#f8fafc] text-[#111827]">
            <AdminNavbar />

            <main className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 xl:px-10">
                <div className="mb-3 flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
                    <button
                        type="button"
                        onClick={() =>
                            navigate("/admin/dashboard")
                        }
                        className="cursor-pointer hover:text-blue-600"
                    >
                        Dashboard
                    </button>

                    <ChevronRight size={15} />

                    <button
                        type="button"
                        onClick={handleBack}
                        className="cursor-pointer hover:text-blue-600"
                    >
                        Technologies
                    </button>

                    <ChevronRight size={15} />

                    <span className="font-medium text-blue-600">
                        Technology Details
                    </span>
                </div>

                <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            Technology Details
                        </h2>

                        <p className="mt-2 text-sm text-gray-500 sm:text-base">
                            View and manage all information related to this technology.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleBack}
                        className="flex w-fit cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 shadow-sm transition hover:bg-gray-50"
                    >
                        <ArrowLeft size={18} />

                        <span>
                            Back to Technologies
                        </span>
                    </button>
                </div>

                {error && (
                    <div className="mb-5 rounded-xl border border-orange-200 bg-orange-50 px-5 py-4 text-sm font-medium text-orange-700">
                        {error}
                    </div>
                )}

                <section className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <div
                                key={stat.title}
                                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${stat.iconBg}`}
                                    >
                                        <Icon
                                            size={29}
                                            strokeWidth={2}
                                            className={
                                                stat.iconColor
                                            }
                                        />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-slate-600">
                                            {stat.title}
                                        </p>

                                        <h3 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                                            {formatNumber(
                                                stat.value
                                            )}
                                        </h3>
                                    </div>
                                </div>

                                <div className="mt-5 flex items-center gap-2 text-sm">
                                    <span className="text-blue-500">
                                        •
                                    </span>

                                    <span className="font-medium text-slate-500">
                                        {stat.change}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </section>

                <section className="mb-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                        <SectionHeader
                            icon={Info}
                            title="Technology Information"
                        />

                        <div className="p-5 sm:p-6">
                            <div className="grid grid-cols-[105px_15px_minmax(0,1fr)] gap-y-4 text-sm sm:grid-cols-[125px_15px_minmax(0,1fr)]">
                                <InfoRow
                                    label="Name"
                                    value={
                                        technology.name
                                    }
                                />

                                <InfoRow
                                    label="Slug"
                                    value={
                                        technology.slug
                                    }
                                    valueClass="text-gray-500"
                                />

                                <InfoRow
                                    label="Description"
                                    value={
                                        technology.description ||
                                        "No description available."
                                    }
                                />

                                <InfoRow
                                    label="Status"
                                    customValue={
                                        <span
                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                                                technology.isActive !==
                                                    false
                                            )}`}
                                        >
                                            {
                                                technologyStatus
                                            }
                                        </span>
                                    }
                                />

                                <InfoRow
                                    label="Created At"
                                    value={formatDateTime(
                                        technology.createdAt
                                    )}
                                />

                                <InfoRow
                                    label="Updated At"
                                    value={formatDateTime(
                                        technology.updatedAt
                                    )}
                                />

                                <InfoRow
                                    label="Created By"
                                    value={createdBy}
                                />

                                {createdByEmail && (
                                    <InfoRow
                                        label="Creator Email"
                                        value={
                                            createdByEmail
                                        }
                                        valueClass="break-all text-gray-500"
                                    />
                                )}

                                <InfoRow
                                    label="Technology ID"
                                    value={
                                        technology._id
                                    }
                                    valueClass="break-all text-gray-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                        <SectionHeader
                            icon={BarChart3}
                            title="Technology Overview"
                        />

                        <div className="flex min-h-[285px] flex-col items-center justify-center gap-8 p-5 sm:flex-row sm:p-6">
                            <div className="relative h-48 w-48 shrink-0 sm:h-52 sm:w-52">
                                <div
                                    className="h-full w-full rounded-full"
                                    style={{
                                        background:
                                            "conic-gradient(#2563eb 0deg 90deg, #10b981 90deg 180deg, #7c3aed 180deg 270deg, #f59e0b 270deg 360deg)",
                                    }}
                                />

                                <div className="absolute inset-[27%] flex items-center justify-center rounded-full bg-white">
                                    <span className="text-sm font-semibold text-gray-500">
                                        {formatNumber(
                                            statistics.totalItems
                                        )}
                                    </span>
                                </div>
                            </div>

                            <div className="w-full max-w-[270px] space-y-5">
                                <LegendItem
                                    color="bg-blue-600"
                                    label="PDFs"
                                    value={formatNumber(
                                        statistics.totalPdfs
                                    )}
                                />

                                <LegendItem
                                    color="bg-green-500"
                                    label="Pages"
                                    value={formatNumber(
                                        statistics.totalPages
                                    )}
                                />

                                <LegendItem
                                    color="bg-purple-600"
                                    label="Text Chunks"
                                    value={formatNumber(
                                        statistics.totalChunks
                                    )}
                                />

                                <LegendItem
                                    color="bg-orange-500"
                                    label="Questions"
                                    value={formatNumber(
                                        statistics.totalQuestions
                                    )}
                                />
                            </div>
                        </div>

                        <div className="border-t border-gray-100 px-5 py-4 sm:px-6">
                            <p className="text-sm font-semibold text-gray-800">
                                Total Items:

                                <span className="ml-4 text-blue-600">
                                    {formatNumber(
                                        statistics.totalItems
                                    )}
                                </span>
                            </p>
                        </div>
                    </div>
                </section>

                <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex items-center border-b border-gray-200 px-5 py-4 sm:px-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50">
                                <Folder
                                    size={19}
                                    className="text-indigo-600"
                                />
                            </div>

                            <h3 className="text-lg font-bold text-gray-900">
                                Folders in this Technology (
                                {folders.length}
                                )
                            </h3>
                        </div>
                    </div>

                    {folders.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1000px] border-collapse text-sm">
                                <thead>
                                    <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600">
                                        <th className="px-5 py-3">
                                            #
                                        </th>

                                        <th className="px-4 py-3">
                                            Folder Name
                                        </th>

                                        <th className="px-4 py-3">
                                            Slug
                                        </th>

                                        <th className="px-4 py-3 text-center">
                                            PDFs
                                        </th>

                                        <th className="px-4 py-3 text-center">
                                            Pages
                                        </th>

                                        <th className="px-4 py-3 text-center">
                                            Chunks
                                        </th>

                                        <th className="px-4 py-3 text-center">
                                            Questions
                                        </th>

                                        <th className="px-4 py-3 text-center">
                                            Status
                                        </th>

                                        <th className="px-5 py-3 text-center">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {folders.map(
                                        (
                                            folder,
                                            index
                                        ) => {
                                            const pdfCount =
                                                getFolderPdfCount(
                                                    folder
                                                );

                                            return (
                                                <tr
                                                    key={
                                                        folder._id ||
                                                        index
                                                    }
                                                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                                                >
                                                    <td className="px-5 py-3.5 text-gray-700">
                                                        {folder.id ??
                                                            index +
                                                                1}
                                                    </td>

                                                    <td className="px-4 py-3.5 font-medium text-gray-900">
                                                        {folder.name ||
                                                            "—"}
                                                    </td>

                                                    <td className="px-4 py-3.5 text-gray-500">
                                                        {folder.slug ||
                                                            "—"}
                                                    </td>

                                                    <td className="px-4 py-3.5 text-center">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleViewFolder(
                                                                    folder
                                                                )
                                                            }
                                                            className="cursor-pointer font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                                                        >
                                                            {formatNumber(
                                                                pdfCount
                                                            )}
                                                        </button>
                                                    </td>

                                                    <td className="px-4 py-3.5 text-center text-gray-700">
                                                        {formatNumber(
                                                            folder.pages
                                                        )}
                                                    </td>

                                                    <td className="px-4 py-3.5 text-center text-gray-700">
                                                        {formatNumber(
                                                            folder.chunks
                                                        )}
                                                    </td>

                                                    <td className="px-4 py-3.5 text-center text-gray-700">
                                                        {formatNumber(
                                                            folder.questions
                                                        )}
                                                    </td>

                                                    <td className="px-4 py-3.5 text-center">
                                                        <span
                                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                                folder.status ===
                                                                "Active"
                                                                    ? "bg-green-100 text-green-600"
                                                                    : "bg-red-100 text-red-600"
                                                            }`}
                                                        >
                                                            {folder.status ||
                                                                "Inactive"}
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-3.5">
                                                        <div className="flex justify-center gap-2">
                                                            <ActionButton
                                                                icon={
                                                                    Eye
                                                                }
                                                                title="View Folder"
                                                                className="cursor-pointer bg-blue-50 text-blue-600 hover:bg-blue-100"
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/admin/folders/${folder._id}`
                                                                    )
                                                                }
                                                            />

                                                            <ActionButton
                                                                icon={
                                                                    Trash2
                                                                }
                                                                title="Delete Folder"
                                                                className="bg-red-50 text-red-500 hover:bg-red-100"
                                                                onClick={() =>
                                                                    openDeleteFolderModal(
                                                                        folder
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="flex min-h-[220px] flex-col items-center justify-center px-5 py-10 text-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50">
                                <Folder
                                    size={26}
                                    className="text-indigo-600"
                                />
                            </div>

                            <h4 className="mt-4 text-base font-semibold text-gray-900">
                                No folders found
                            </h4>

                            <p className="mt-1 max-w-md text-sm text-gray-500">
                                There are no folders associated with this technology yet.
                            </p>
                        </div>
                    )}
                </section>
            </main>

            {selectedFolder && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
                                    <Folder
                                        size={21}
                                        className="text-indigo-600"
                                    />
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">
                                        Folder Details
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        {selectedFolder.name ||
                                            "Folder"}
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={
                                    closeFolderModal
                                }
                                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                            >
                                <X size={19} />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-sm">
                                        <BookOpen
                                            size={28}
                                            className="text-blue-600"
                                        />
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-slate-600">
                                            Total PDFs
                                        </p>

                                        <h2 className="mt-1 text-3xl font-bold text-blue-600">
                                            {formatNumber(
                                                getFolderPdfCount(
                                                    selectedFolder
                                                )
                                            )}
                                        </h2>

                                        <p className="mt-1 text-sm text-slate-500">
                                            PDFs in this folder
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 space-y-4">
                                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                                    <span className="text-sm text-gray-500">
                                        Folder Name
                                    </span>

                                    <span className="text-sm font-semibold text-gray-900">
                                        {selectedFolder.name ||
                                            "—"}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                                    <span className="text-sm text-gray-500">
                                        Slug
                                    </span>

                                    <span className="max-w-[220px] break-all text-right text-sm font-medium text-gray-700">
                                        {selectedFolder.slug ||
                                            "—"}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                                    <span className="text-sm text-gray-500">
                                        Pages
                                    </span>

                                    <span className="text-sm font-semibold text-gray-900">
                                        {formatNumber(
                                            selectedFolder.pages
                                        )}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                                    <span className="text-sm text-gray-500">
                                        Text Chunks
                                    </span>

                                    <span className="text-sm font-semibold text-gray-900">
                                        {formatNumber(
                                            selectedFolder.chunks
                                        )}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">
                                        Questions
                                    </span>

                                    <span className="text-sm font-semibold text-gray-900">
                                        {formatNumber(
                                            selectedFolder.questions
                                        )}
                                    </span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={
                                    closeFolderModal
                                }
                                className="mt-6 w-full cursor-pointer rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ConfirmModal
                isOpen={confirmModal.isOpen}
                onClose={closeConfirmModal}
                onConfirm={handleDeleteFolder}
                title="Delete Folder"
                message={`Are you sure you want to permanently delete ${
                    confirmModal.folder?.name ||
                    "this folder"
                }? This action cannot be undone.`}
                confirmText="Delete Folder"
                cancelText="Cancel"
                type="danger"
                loading={actionLoading}
                itemName={
                    confirmModal.folder?.name || ""
                }
            />

            <Footer />
        </div>
    );
};

const SectionHeader = ({
    icon: Icon,
    title,
}) => {
    return (
        <div className="flex items-center gap-3 border-b border-gray-200 px-5 py-4 sm:px-6">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50">
                <Icon
                    size={18}
                    className="text-indigo-600"
                />
            </div>

            <h3 className="text-base font-bold text-gray-900 sm:text-lg">
                {title}
            </h3>
        </div>
    );
};

const InfoRow = ({
    label,
    value,
    valueClass = "text-gray-800",
    customValue,
}) => {
    return (
        <>
            <span className="font-semibold text-gray-800">
                {label}
            </span>

            <span className="text-gray-500">
                :
            </span>

            <span
                className={`leading-6 ${valueClass}`}
            >
                {customValue || value}
            </span>
        </>
    );
};

const LegendItem = ({
    color,
    label,
    value,
}) => {
    return (
        <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <span
                    className={`h-3 w-3 rounded-full ${color}`}
                />

                <span className="text-sm font-medium text-gray-700">
                    {label}
                </span>
            </div>

            <div className="text-sm font-medium text-gray-700">
                {value}
            </div>
        </div>
    );
};

const ActionButton = ({
    icon: Icon,
    className,
    onClick,
    title,
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            title={title}
            className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-md transition ${className}`}
        >
            <Icon size={16} />
        </button>
    );
};

export default AdminTechnologyDetails;