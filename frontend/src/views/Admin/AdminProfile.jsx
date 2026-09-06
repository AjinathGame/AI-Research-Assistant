import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShieldCheck,
  Edit3,
  Lock,
  FileText,
  MessageSquare,
  Layers,
  Users,
  CheckCircle,
  Clock,
  KeyRound,
} from "lucide-react";

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Admin",
    email: "admin@aisearchassistant.com",
    phone: "+91 98765 43210",
    location: "Pune, Maharashtra, India",
    role: "Super Admin",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
      <div className="mx-auto w-full max-w-[1600px]">

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
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 sm:w-auto"
            >
              <Edit3 size={18} />
              {isEditing ? "Cancel Editing" : "Edit Profile"}
            </button>
          </div>
        </div>

        <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="h-28 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-500 sm:h-32"></div>

          <div className="px-5 pb-6 sm:px-7 lg:px-8">
            <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 md:flex-row md:items-end md:justify-between">

              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-indigo-100 text-3xl font-bold text-indigo-600 shadow-md sm:h-28 sm:w-28 sm:text-4xl">
                  A
                </div>

                <div className="pb-1">
                  <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                    {profile.name}
                  </h2>

                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                      {profile.role}
                    </span>

                    <span className="flex items-center gap-1 text-sm text-slate-500">
                      <CheckCircle size={15} className="text-emerald-500" />
                      Active
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <ShieldCheck className="text-emerald-600" size={22} />

                <div>
                  <p className="text-xs text-slate-500">Account Status</p>
                  <p className="text-sm font-semibold text-emerald-600">
                    Verified & Active
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
                      <User size={18} className="text-slate-400" />
                      <span className="text-sm text-slate-800">
                        {profile.name}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email Address
                  </label>

                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  ) : (
                    <div className="flex min-h-[46px] items-center gap-3 rounded-lg bg-slate-50 px-4">
                      <Mail size={18} className="text-slate-400" />
                      <span className="break-all text-sm text-slate-800">
                        {profile.email}
                      </span>
                    </div>
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
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  ) : (
                    <div className="flex min-h-[46px] items-center gap-3 rounded-lg bg-slate-50 px-4">
                      <Phone size={18} className="text-slate-400" />
                      <span className="text-sm text-slate-800">
                        {profile.phone}
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
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  ) : (
                    <div className="flex min-h-[46px] items-center gap-3 rounded-lg bg-slate-50 px-4">
                      <MapPin size={18} className="text-slate-400" />
                      <span className="text-sm text-slate-800">
                        {profile.location}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Role
                  </label>

                  <div className="flex min-h-[46px] items-center gap-3 rounded-lg bg-slate-50 px-4">
                    <ShieldCheck size={18} className="text-indigo-500" />

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
                    <Calendar size={18} className="text-slate-400" />

                    <span className="text-sm text-slate-800">
                      May 20, 2025
                    </span>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSave}
                    className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">

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
                    ADM-001
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
                    May 20, 2025
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-slate-500">
                    Last Login
                  </span>

                  <span className="text-right text-sm font-medium text-slate-800">
                    Today, 10:24 AM
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                  <Lock size={20} />
                </div>

                <h2 className="text-base font-bold text-slate-900">
                  Security
                </h2>
              </div>

              <div className="space-y-3 p-5">

                <button className="flex w-full items-center justify-between rounded-lg border border-slate-200 p-3 text-left transition hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <KeyRound size={18} className="text-slate-500" />

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Change Password
                      </p>

                      <p className="text-xs text-slate-500">
                        Update your account password
                      </p>
                    </div>
                  </div>

                  <span className="text-slate-400">›</span>
                </button>

                <div className="flex items-center justify-between rounded-lg bg-emerald-50 p-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle
                      size={18}
                      className="text-emerald-600"
                    />

                    <div>
                      <p className="text-sm font-semibold text-emerald-700">
                        Two-Factor Authentication
                      </p>

                      <p className="text-xs text-emerald-600">
                        Enabled
                      </p>
                    </div>
                  </div>
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
                  1,248
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
                  2,534
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
                  4,892
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
                  36
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

            <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
              View All
            </button>
          </div>

          <div className="divide-y divide-slate-200">

            <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle
                    size={20}
                    className="text-emerald-600"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Successful login
                  </p>

                  <p className="text-xs text-slate-500">
                    Chrome • Windows
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Clock size={15} />
                Today, 10:24 AM
              </div>
            </div>

            <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <Edit3 size={19} className="text-blue-600" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Profile information updated
                  </p>

                  <p className="text-xs text-slate-500">
                    Personal information
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Clock size={15} />
                Yesterday, 04:35 PM
              </div>
            </div>

            <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                  <Lock size={19} className="text-orange-600" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Password changed
                  </p>

                  <p className="text-xs text-slate-500">
                    Account security
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Clock size={15} />
                May 26, 2025
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminProfile;