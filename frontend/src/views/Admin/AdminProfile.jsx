import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShieldCheck,
  Edit3,
  FileText,
  MessageSquare,
  Layers,
  Users,
  CheckCircle,
  Clock,
  RotateCcw,
  Activity as ActivityIcon,
} from "lucide-react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import {
  getAdminProfile,
  updateAdminProfile,
} from "../../api/adminApi";

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showAllActivity, setShowAllActivity] = useState(false);

  const [profile, setProfile] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    location: "",
    role: "Admin",
    isVerified: false,
    isActive: true,
    createdAt: null,
    lastLoginAt: null,
  });

  const [statistics, setStatistics] = useState({
    usersManaged: 0,
    documents: 0,
    questions: 0,
    technologies: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminProfile();

      const user = response?.data?.user || {};
      const stats = response?.data?.statistics || {};

      const activity = Array.isArray(
        response?.data?.recentActivity
      )
        ? response.data.recentActivity
        : [];

      setProfile({
        id: user._id || "",
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        role:
          user.role === "admin"
            ? "Super Admin"
            : user.role || "Admin",
        isVerified: user.isVerified === true,
        isActive: user.isActive !== false,
        createdAt: user.createdAt || null,
        lastLoginAt: user.lastLoginAt || null,
      });

      setStatistics({
        usersManaged: Number(stats.usersManaged || 0),
        documents: Number(stats.documents || 0),
        questions: Number(stats.questions || 0),
        technologies: Number(stats.technologies || 0),
      });

      setRecentActivity(activity);
    } catch (err) {
      console.error("Fetch Admin Profile Error:", err);

      setError(
        err.message || "Failed to fetch admin profile."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSuccess("");
    setError("");
  };

  const handleSave = async () => {
    try {
      if (!profile.name.trim()) {
        setError("Name is required.");
        return;
      }

      setSaving(true);
      setError("");
      setSuccess("");

      const response = await updateAdminProfile({
        name: profile.name.trim(),
        phone: profile.phone.trim(),
        location: profile.location.trim(),
      });

      const updatedUser =
        response?.data?.user ||
        response?.data ||
        {};

      setProfile((prev) => ({
        ...prev,
        id: updatedUser._id || prev.id,
        name: updatedUser.name || prev.name,
        email: updatedUser.email || prev.email,
        phone:
          updatedUser.phone !== undefined
            ? updatedUser.phone
            : prev.phone,
        location:
          updatedUser.location !== undefined
            ? updatedUser.location
            : prev.location,
        role:
          updatedUser.role === "admin"
            ? "Super Admin"
            : updatedUser.role || prev.role,
        isVerified:
          updatedUser.isVerified ?? prev.isVerified,
        isActive:
          updatedUser.isActive !== undefined
            ? updatedUser.isActive
            : prev.isActive,
        createdAt:
          updatedUser.createdAt || prev.createdAt,
        lastLoginAt:
          updatedUser.lastLoginAt || prev.lastLoginAt,
      }));

      setIsEditing(false);

      setSuccess(
        response?.message ||
          "Profile updated successfully."
      );

      await fetchProfile();

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      console.error("Update Admin Profile Error:", err);

      setError(
        err.message || "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError("");
    setSuccess("");
    fetchProfile();
  };

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "—";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "—";
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (dateValue) => {
    if (!dateValue) {
      return "—";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "—";
    }

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatActivityTime = (dateValue) => {
    if (!dateValue) {
      return "—";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "—";
    }

    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const minutes = Math.floor(
      diff / (1000 * 60)
    );

    const hours = Math.floor(
      diff / (1000 * 60 * 60)
    );

    const days = Math.floor(
      diff / (1000 * 60 * 60 * 24)
    );

    if (minutes < 1) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes} min ago`;
    }

    if (hours < 24) {
      return `${hours} hr ago`;
    }

    if (days === 1) {
      return "Yesterday";
    }

    if (days < 7) {
      return `${days} days ago`;
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getInitial = () => {
    if (!profile.name) {
      return "A";
    }

    return profile.name
      .trim()
      .charAt(0)
      .toUpperCase();
  };

  const getActivityDetails = (activity) => {
    const type = activity?.type || "";

    switch (type) {
      case "user_registered":
        return {
          icon: Users,
          iconClass: "text-blue-600",
          bgClass: "bg-blue-100",
        };

      case "user_login":
        return {
          icon: CheckCircle,
          iconClass: "text-emerald-600",
          bgClass: "bg-emerald-100",
        };

      case "document_uploaded":
        return {
          icon: FileText,
          iconClass: "text-orange-600",
          bgClass: "bg-orange-100",
        };

      case "question_asked":
        return {
          icon: MessageSquare,
          iconClass: "text-purple-600",
          bgClass: "bg-purple-100",
        };

      case "technology_added":
        return {
          icon: Layers,
          iconClass: "text-indigo-600",
          bgClass: "bg-indigo-100",
        };

      case "document_deleted":
        return {
          icon: FileText,
          iconClass: "text-red-600",
          bgClass: "bg-red-100",
        };

      case "profile_updated":
        return {
          icon: Edit3,
          iconClass: "text-blue-600",
          bgClass: "bg-blue-100",
        };

      default:
        return {
          icon: ActivityIcon,
          iconClass: "text-slate-600",
          bgClass: "bg-slate-100",
        };
    }
  };

  const displayedActivities = showAllActivity
    ? recentActivity
    : recentActivity.slice(0, 10);

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNavbar />

      <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
        <div className="mb-6">
          <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <span>Dashboard</span>
            <span>›</span>
            <span>Profile</span>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Admin Profile
              </h1>

              <p className="mt-1 text-sm text-slate-500 sm:text-base">
                View and manage your administrator account information.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                if (isEditing) {
                  handleCancel();
                } else {
                  setIsEditing(true);
                  setError("");
                  setSuccess("");
                }
              }}
              disabled={saving}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {isEditing ? (
                <RotateCcw size={18} />
              ) : (
                <Edit3 size={18} />
              )}

              {isEditing
                ? "Cancel Editing"
                : "Edit Profile"}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 flex flex-col gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between">
            <span>{error}</span>

            <button
              type="button"
              onClick={fetchProfile}
              className="inline-flex cursor-pointer items-center gap-2 font-semibold underline"
            >
              <RotateCcw size={15} />
              Retry
            </button>
          </div>
        )}

        {success && (
          <div className="mb-6 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            <CheckCircle size={18} />
            {success}
          </div>
        )}

        <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="h-28 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-500 sm:h-32"></div>

          <div className="px-5 pb-6 sm:px-7 lg:px-8">
            <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 md:flex-row md:items-end md:justify-between">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-indigo-100 text-3xl font-bold text-indigo-600 shadow-md sm:h-28 sm:w-28 sm:text-4xl">
                  {loading ? "A" : getInitial()}
                </div>

                <div className="pb-1">
                  <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                    {loading
                      ? "Loading..."
                      : profile.name || "Admin"}
                  </h2>

                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                      {profile.role}
                    </span>

                    <span className="flex items-center gap-1 text-sm text-slate-500">
                      <CheckCircle
                        size={15}
                        className={
                          profile.isActive
                            ? "text-emerald-500"
                            : "text-red-500"
                        }
                      />

                      {profile.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <ShieldCheck
                  className="text-emerald-600"
                  size={22}
                />

                <div>
                  <p className="text-xs text-slate-500">
                    Account Status
                  </p>

                  <p className="text-sm font-semibold text-emerald-600">
                    {profile.isVerified
                      ? "Verified & Active"
                      : profile.isActive
                      ? "Active"
                      : "Inactive"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4 sm:px-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                  <User size={20} />
                </div>

                <div>
                  <h2 className="text-base font-bold text-slate-900 sm:text-lg">
                    Personal Information
                  </h2>

                  <p className="text-xs text-slate-500 sm:text-sm">
                    Your basic account information
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Full Name
                  </label>

                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  ) : (
                    <div className="flex min-h-[46px] items-center gap-3 rounded-lg bg-slate-50 px-4">
                      <User
                        size={18}
                        className="text-slate-400"
                      />

                      <span className="text-sm text-slate-800">
                        {loading
                          ? "Loading..."
                          : profile.name || "—"}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email Address
                  </label>

                  <div className="flex min-h-[46px] items-center gap-3 rounded-lg bg-slate-50 px-4">
                    <Mail
                      size={18}
                      className="text-slate-400"
                    />

                    <span className="break-all text-sm text-slate-800">
                      {loading
                        ? "Loading..."
                        : profile.email || "—"}
                    </span>
                  </div>

                  {isEditing && (
                    <p className="mt-1 text-xs text-slate-400">
                      Email address cannot be changed here.
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Phone Number
                  </label>

                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  ) : (
                    <div className="flex min-h-[46px] items-center gap-3 rounded-lg bg-slate-50 px-4">
                      <Phone
                        size={18}
                        className="text-slate-400"
                      />

                      <span className="text-sm text-slate-800">
                        {loading
                          ? "Loading..."
                          : profile.phone || "—"}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Location
                  </label>

                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={profile.location}
                      onChange={handleChange}
                      placeholder="Enter location"
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  ) : (
                    <div className="flex min-h-[46px] items-center gap-3 rounded-lg bg-slate-50 px-4">
                      <MapPin
                        size={18}
                        className="text-slate-400"
                      />

                      <span className="text-sm text-slate-800">
                        {loading
                          ? "Loading..."
                          : profile.location || "—"}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Role
                  </label>

                  <div className="flex min-h-[46px] items-center gap-3 rounded-lg bg-slate-50 px-4">
                    <ShieldCheck
                      size={18}
                      className="text-indigo-500"
                    />

                    <span className="text-sm font-medium text-slate-800">
                      {profile.role}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Joined Date
                  </label>

                  <div className="flex min-h-[46px] items-center gap-3 rounded-lg bg-slate-50 px-4">
                    <Calendar
                      size={18}
                      className="text-slate-400"
                    />

                    <span className="text-sm text-slate-800">
                      {loading
                        ? "Loading..."
                        : formatDate(
                            profile.createdAt
                          )}
                    </span>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={saving}
                    className="cursor-pointer rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="cursor-pointer rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving
                      ? "Saving..."
                      : "Save Changes"}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                  <ShieldCheck size={20} />
                </div>

                <h2 className="text-base font-bold text-slate-900">
                  Account Information
                </h2>
              </div>

              <div className="space-y-4 p-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-slate-500">
                    Account ID
                  </span>

                  <span className="break-all text-right text-sm font-medium text-slate-800">
                    {loading
                      ? "Loading..."
                      : profile.id || "—"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-slate-500">
                    Account Type
                  </span>

                  <span className="text-sm font-medium text-slate-800">
                    Administrator
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-slate-500">
                    Created At
                  </span>

                  <span className="text-sm font-medium text-slate-800">
                    {loading
                      ? "Loading..."
                      : formatDate(
                          profile.createdAt
                        )}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-slate-500">
                    Last Login
                  </span>

                  <span className="text-right text-sm font-medium text-slate-800">
                    {loading
                      ? "Loading..."
                      : formatDateTime(
                          profile.lastLoginAt
                        )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
            <h2 className="text-lg font-bold text-slate-900">
              Activity Summary
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Overview of your activity in the AI Search Assistant.
            </p>
          </div>

          <div className="grid grid-cols-1 divide-y divide-slate-200 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            <div className="flex items-center gap-4 p-5 sm:p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <Users size={24} />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Users Managed
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {loading
                    ? "—"
                    : statistics.usersManaged}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 sm:p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                <FileText size={24} />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Documents
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {loading
                    ? "—"
                    : statistics.documents}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 sm:p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                <MessageSquare size={24} />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Questions
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {loading
                    ? "—"
                    : statistics.questions}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 sm:p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <Layers size={24} />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Technologies
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {loading
                    ? "—"
                    : statistics.technologies}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-2 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Recent Account Activity
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Latest activity performed on your administrator account.
              </p>
            </div>

            {recentActivity.length > 10 && (
              <button
                type="button"
                onClick={() =>
                  setShowAllActivity(
                    (prev) => !prev
                  )
                }
                className="cursor-pointer text-sm font-semibold text-indigo-600 hover:text-indigo-700"
              >
                {showAllActivity
                  ? "Show Less"
                  : "View All"}
              </button>
            )}
          </div>

          <div className="divide-y divide-slate-200">
            {loading ? (
              <div className="px-5 py-10 text-center text-sm text-slate-500">
                Loading activity...
              </div>
            ) : displayedActivities.length > 0 ? (
              displayedActivities.map(
                (activity, index) => {
                  const details =
                    getActivityDetails(
                      activity
                    );

                  const ActivityIconComponent =
                    details.icon;

                  return (
                    <div
                      key={
                        activity._id ||
                        activity.id ||
                        index
                      }
                      className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${details.bgClass}`}
                        >
                          <ActivityIconComponent
                            size={20}
                            className={
                              details.iconClass
                            }
                          />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {activity.title ||
                              "Account activity"}
                          </p>

                          <p className="max-w-xl text-xs text-slate-500">
                            {activity.description ||
                              "Activity performed on your account"}
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-2 text-xs text-slate-500">
                        <Clock size={15} />

                        {formatActivityTime(
                          activity.createdAt
                        )}
                      </div>
                    </div>
                  );
                }
              )
            ) : (
              <div className="px-5 py-10 text-center">
                <ActivityIcon
                  size={30}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-3 font-semibold text-slate-700">
                  No recent activity
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Your recent account activity will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;