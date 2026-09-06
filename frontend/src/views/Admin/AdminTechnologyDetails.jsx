import React from "react";
import {
  ArrowLeft,
  ChevronRight,
  Pencil,
  Plus,
  Trash2,
  Eye,
  Users,
  BookOpen,
  Layers,
  CircleHelp,
  Info,
  BarChart3,
  Folder,
} from "lucide-react";

const AdminTechnologyDetails = () => {
  const folders = [
    {
      id: 1,
      name: "Introduction",
      slug: "introduction",
      pdfs: 3,
      pages: 156,
      chunks: 456,
      questions: 32,
      status: "Active",
    },
    {
      id: 2,
      name: "Frontend (Angular)",
      slug: "frontend-angular",
      pdfs: 5,
      pages: 286,
      chunks: 812,
      questions: 68,
      status: "Active",
    },
    {
      id: 3,
      name: "Backend (Node.js)",
      slug: "backend-nodejs",
      pdfs: 6,
      pages: 324,
      chunks: 965,
      questions: 85,
      status: "Active",
    },
    {
      id: 4,
      name: "Database (MongoDB)",
      slug: "database-mongodb",
      pdfs: 4,
      pages: 210,
      chunks: 654,
      questions: 45,
      status: "Active",
    },
    {
      id: 5,
      name: "Deployment",
      slug: "deployment",
      pdfs: 6,
      pages: 272,
      chunks: 770,
      questions: 52,
      status: "Active",
    },
  ];

  const stats = [
    {
      title: "Total PDFs",
      value: "24",
      change: "12 this month",
      icon: Users,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      title: "Total Pages",
      value: "1,248",
      change: "180 this week",
      icon: BookOpen,
      iconBg: "bg-green-50",
      iconColor: "text-green-500",
    },
    {
      title: "Total Text Chunks",
      value: "3,657",
      change: "320 this week",
      icon: Layers,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-500",
    },
    {
      title: "Questions Asked",
      value: "892",
      change: "45 this week",
      icon: CircleHelp,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#111827]">
      <main className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 xl:px-10">
        <div className="mb-3 flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
          <span className="cursor-pointer hover:text-blue-600">
            Dashboard
          </span>

          <ChevronRight size={15} />

          <span className="cursor-pointer hover:text-blue-600">
            Technologies
          </span>

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

          <div className="flex flex-wrap gap-3">
            <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 shadow-sm transition hover:bg-gray-50">
              <ArrowLeft size={18} />
              <span>Back to Technologies</span>
            </button>

            <button className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">
              <Pencil size={17} />
              <span>Edit Technology</span>
            </button>
          </div>
        </div>

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
                      className={stat.iconColor}
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-600">
                      {stat.title}
                    </p>

                    <h3 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                      {stat.value}
                    </h3>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 text-sm">
                  <span className="text-green-500">↑</span>

                  <span className="font-medium text-green-600">
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
                  value="MEAN full stack"
                />

                <InfoRow
                  label="Slug"
                  value="mean-full-stack"
                  valueClass="text-gray-500"
                />

                <InfoRow
                  label="Description"
                  value="MEAN stack is a JavaScript-based framework combining MongoDB, Express.js, Angular, and Node.js for building dynamic web applications."
                />

                <InfoRow
                  label="Status"
                  customValue={
                    <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
                      Active
                    </span>
                  }
                />

                <InfoRow
                  label="Created At"
                  value="May 20, 2025 11:30 AM"
                />

                <InfoRow
                  label="Updated At"
                  value="May 26, 2025 03:45 PM"
                />

                <InfoRow
                  label="Created By"
                  value="Admin (Super Admin)"
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
                      "conic-gradient(#2563eb 0deg 101deg, #10b981 101deg 213deg, #7c3aed 213deg 328deg, #f59e0b 328deg 360deg)",
                  }}
                />

                <div className="absolute inset-[27%] flex items-center justify-center rounded-full bg-white">
                  <span className="text-sm font-semibold text-gray-500">
                    5,821
                  </span>
                </div>
              </div>

              <div className="w-full max-w-[270px] space-y-5">
                <LegendItem
                  color="bg-blue-600"
                  label="PDFs"
                  value="24"
                  percent="28%"
                />

                <LegendItem
                  color="bg-green-500"
                  label="Pages"
                  value="1,248"
                  percent="31%"
                />

                <LegendItem
                  color="bg-purple-600"
                  label="Text Chunks"
                  value="3,657"
                  percent="32%"
                />

                <LegendItem
                  color="bg-orange-500"
                  label="Questions"
                  value="892"
                  percent="9%"
                />
              </div>
            </div>

            <div className="border-t border-gray-100 px-5 py-4 sm:px-6">
              <p className="text-sm font-semibold text-gray-800">
                Total Items:
                <span className="ml-4 text-blue-600">
                  5,821
                </span>
              </p>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50">
                <Folder
                  size={19}
                  className="text-indigo-600"
                />
              </div>

              <h3 className="text-lg font-bold text-gray-900">
                Folders in this Technology (5)
              </h3>
            </div>

            <button className="flex w-fit items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700">
              <Plus size={18} />
              Add Folder
            </button>
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[1050px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/60 text-left text-xs font-semibold text-gray-600">
                  <th className="px-5 py-3">#</th>
                  <th className="px-4 py-3">Folder Name</th>
                  <th className="px-4 py-3">Slug</th>
                  <th className="px-4 py-3 text-center">PDFs</th>
                  <th className="px-4 py-3 text-center">Pages</th>
                  <th className="px-4 py-3 text-center">
                    Text Chunks
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
                {folders.map((folder) => (
                  <tr
                    key={folder.id}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50"
                  >
                    <td className="px-5 py-3.5 text-gray-700">
                      {folder.id}
                    </td>

                    <td className="px-4 py-3.5 font-medium text-gray-900">
                      {folder.name}
                    </td>

                    <td className="px-4 py-3.5 text-gray-500">
                      {folder.slug}
                    </td>

                    <td className="px-4 py-3.5 text-center text-gray-700">
                      {folder.pdfs}
                    </td>

                    <td className="px-4 py-3.5 text-center text-gray-700">
                      {folder.pages}
                    </td>

                    <td className="px-4 py-3.5 text-center text-gray-700">
                      {folder.chunks}
                    </td>

                    <td className="px-4 py-3.5 text-center text-gray-700">
                      {folder.questions}
                    </td>

                    <td className="px-4 py-3.5 text-center">
                      <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
                        {folder.status}
                      </span>
                    </td>

                    <td className="px-5 py-3.5">
                      <div className="flex justify-center gap-2">
                        <ActionButton
                          icon={Eye}
                          className="bg-blue-50 text-blue-600 hover:bg-blue-100"
                        />

                        <ActionButton
                          icon={Pencil}
                          className="bg-purple-50 text-purple-600 hover:bg-purple-100"
                        />

                        <ActionButton
                          icon={Trash2}
                          className="bg-red-50 text-red-500 hover:bg-red-100"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-gray-100 md:hidden">
            {folders.map((folder) => (
              <div
                key={folder.id}
                className="p-4 sm:p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium text-gray-400">
                      #{folder.id}
                    </p>

                    <h4 className="mt-1 font-semibold text-gray-900">
                      {folder.name}
                    </h4>

                    <p className="mt-1 text-xs text-gray-500">
                      {folder.slug}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-600">
                    {folder.status}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                  <MobileStat
                    label="PDFs"
                    value={folder.pdfs}
                  />

                  <MobileStat
                    label="Pages"
                    value={folder.pages}
                  />

                  <MobileStat
                    label="Chunks"
                    value={folder.chunks}
                  />

                  <MobileStat
                    label="Questions"
                    value={folder.questions}
                  />
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <ActionButton
                    icon={Eye}
                    className="bg-blue-50 text-blue-600 hover:bg-blue-100"
                  />

                  <ActionButton
                    icon={Pencil}
                    className="bg-purple-50 text-purple-600 hover:bg-purple-100"
                  />

                  <ActionButton
                    icon={Trash2}
                    className="bg-red-50 text-red-500 hover:bg-red-100"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
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

      <span className="text-gray-500">:</span>

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
  percent,
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

      <div className="text-sm text-gray-700">
        <span className="font-medium">
          {value}
        </span>

        <span className="ml-2 text-gray-500">
          ({percent})
        </span>
      </div>
    </div>
  );
};

const ActionButton = ({
  icon: Icon,
  className,
}) => {
  return (
    <button
      className={`flex h-8 w-8 items-center justify-center rounded-md transition ${className}`}
    >
      <Icon size={16} />
    </button>
  );
};

const MobileStat = ({
  label,
  value,
}) => {
  return (
    <div className="rounded-lg bg-gray-50 p-3">
      <p className="text-xs text-gray-500">
        {label}
      </p>

      <p className="mt-1 font-semibold text-gray-900">
        {value}
      </p>
    </div>
  );
};

export default AdminTechnologyDetails;