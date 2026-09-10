import React from "react";
import {
    AlertTriangle,
    CheckCircle2,
    Trash2,
    UserCheck,
    UserX,
    X,
    Loader2,
    Info,
} from "lucide-react";

const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirm Action",
    message = "Are you sure you want to continue?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    type = "danger",
    loading = false,
    itemName = "",
    itemEmail = "",
}) => {
    if (!isOpen) {
        return null;
    }

    const config = {
        danger: {
            icon: <Trash2 size={25} />,
            iconWrapper: "bg-red-50 text-red-500",
            button:
                "bg-red-600 hover:bg-red-700 focus:ring-red-200",
        },
        warning: {
            icon: <AlertTriangle size={25} />,
            iconWrapper:
                "bg-orange-50 text-orange-500",
            button:
                "bg-orange-500 hover:bg-orange-600 focus:ring-orange-200",
        },
        success: {
            icon: <CheckCircle2 size={25} />,
            iconWrapper:
                "bg-green-50 text-green-600",
            button:
                "bg-green-600 hover:bg-green-700 focus:ring-green-200",
        },
        activate: {
            icon: <UserCheck size={25} />,
            iconWrapper:
                "bg-green-50 text-green-600",
            button:
                "bg-green-600 hover:bg-green-700 focus:ring-green-200",
        },
        deactivate: {
            icon: <UserX size={25} />,
            iconWrapper:
                "bg-orange-50 text-orange-500",
            button:
                "bg-orange-500 hover:bg-orange-600 focus:ring-orange-200",
        },
        info: {
            icon: <Info size={25} />,
            iconWrapper:
                "bg-blue-50 text-blue-600",
            button:
                "bg-blue-600 hover:bg-blue-700 focus:ring-blue-200",
        },
    };

    const currentConfig =
        config[type] || config.danger;

    const handleOverlayClick = (event) => {
        if (
            event.target === event.currentTarget &&
            !loading
        ) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/50 px-4 py-6 backdrop-blur-sm"
            onMouseDown={handleOverlayClick}
        >
            <div
                className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >
                <div className="relative px-6 pb-7 pt-7 sm:px-8">

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        aria-label="Close"
                        className="absolute right-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <X size={19} />
                    </button>

                    <div
                        className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${currentConfig.iconWrapper}`}
                    >
                        {currentConfig.icon}
                    </div>

                    <div className="mt-5 text-center">
                        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                            {title}
                        </h2>

                        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
                            {message}
                        </p>
                    </div>

                    {(itemName || itemEmail) && (
                        <div className="mt-7 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                                    {itemName
                                        ? itemName
                                              .split(" ")
                                              .map(
                                                  (word) =>
                                                      word[0]
                                              )
                                              .join("")
                                              .slice(
                                                  0,
                                                  2
                                              )
                                              .toUpperCase()
                                        : "?"}
                                </div>

                                <div className="min-w-0 text-left">
                                    {itemName && (
                                        <p className="truncate text-sm font-semibold text-slate-900">
                                            {itemName}
                                        </p>
                                    )}

                                    {itemEmail && (
                                        <p className="truncate text-xs text-slate-500">
                                            {itemEmail}
                                        </p>
                                    )}
                                </div>

                            </div>
                        </div>
                    )}

                    <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 cursor-pointer rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {cancelText}
                        </button>

                        <button
                            type="button"
                            onClick={onConfirm}
                            disabled={loading}
                            className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60 ${currentConfig.button}`}
                        >
                            {loading ? (
                                <>
                                    <Loader2
                                        size={17}
                                        className="animate-spin"
                                    />
                                    Processing...
                                </>
                            ) : (
                                confirmText
                            )}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;