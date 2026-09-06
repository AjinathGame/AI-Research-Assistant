import React from "react";
import {
  Users,
  Layers3,
  FileText,
  CircleHelp,
  UserPlus,
  FilePlus2,
  HelpCircle,
  Layers,
  Trash2,
  ChevronDown,
} from "lucide-react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import Footer from "../../components/Home/Footer";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "1,248",
      text: "12.5% from last month",
      icon: Users,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Technologies",
      value: "36",
      text: "2 new this week",
      icon: Layers3,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Total Documents",
      value: "2,534",
      text: "180 this week",
      icon: FileText,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
    },
    {
      title: "Total Questions",
      value: "4,892",
      text: "320 this week",
      icon: CircleHelp,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  const activity = [
    {
      title: "New user registered",
      subtitle: "John Doe",
      time: "2 min ago",
      icon: UserPlus,
      bg: "bg-blue-50",
      color: "text-blue-600",
    },
    {
      title: "Document uploaded",
      subtitle: "React Hooks Guide.pdf",
      time: "10 min ago",
      icon: FilePlus2,
      bg: "bg-green-50",
      color: "text-green-600",
    },
    {
      title: "New question asked",
      subtitle: "How does AI work?",
      time: "15 min ago",
      icon: HelpCircle,
      bg: "bg-purple-50",
      color: "text-purple-600",
    },
    {
      title: "Technology added",
      subtitle: "Next.js",
      time: "30 min ago",
      icon: Layers,
      bg: "bg-orange-50",
      color: "text-orange-500",
    },
    {
      title: "Document deleted",
      subtitle: "Old Guide.pdf",
      time: "45 min ago",
      icon: Trash2,
      bg: "bg-red-50",
      color: "text-red-500",
    },
  ];

  const newUsers = [
    220, 260, 340, 365, 450, 550, 530, 570, 555, 620, 650, 770, 690, 690,
    690, 720, 800, 880, 820, 770, 920, 860, 900, 950,
  ];

  const activeUsers = [
    80, 120, 105, 150, 180, 210, 215, 250, 230, 275, 290, 330, 310, 300, 340,
    370, 400, 440, 410, 480, 500, 430, 460, 490,
  ];

  const createPoints = (data) => {
    const width = 760;
    const height = 330;
    const max = 1000;

    return data
      .map((value, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - (value / max) * height;

        return `${x},${y}`;
      })
      .join(" ");
  };

  return (
    <>
      <div className="min-h-screen bg-[#f8fafc] text-[#172033]">
        <AdminNavbar />

        <main className="px-5 py-8 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[1500px]">
            <div className="mb-9">
              <h1 className="text-[24px] font-bold tracking-tight text-[#111827] sm:text-[28px]">
                Admin Dashboard
              </h1>

              <p className="mt-2 text-[16px] text-gray-500">
                Welcome back, Admin! Here's what's happening.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-15 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.title}
                    className="rounded-xl border border-gray-200  p-4 w-full shadow-[0_2px_8px_rgba(15,23,42,0.04)]"
                  >
                    <div className="flex items-start gap-5">
                      <div
                        className={`flex h-[60px] w-[74px] shrink-0 items-center justify-center rounded-xl ${stat.iconBg}`}
                      >
                        <Icon
                          size={38}
                          strokeWidth={1.8}
                          className={stat.iconColor}
                        />
                      </div>

                      <div>
                        <p className="text-[16px] font-medium text-[#263650]">
                          {stat.title}
                        </p>

                        <h2 className="mt-2 text-[31px] font-bold leading-none text-[#111827]">
                          {stat.value}
                        </h2>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center gap-2">
                      <span className="text-[25px] leading-none text-emerald-500">
                        ↑
                      </span>

                      <span className="text-[15px] text-[#40516b]">
                        {stat.text}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-7 grid grid-cols-1 gap-6 xl:grid-cols-[1.55fr_1fr]">
              <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
                <div className="flex flex-col gap-5 px-6 pb-2 pt-7 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-[20px] font-semibold text-[#111827]">
                    Users Overview
                  </h2>

                  <button className="flex h-11 items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 text-sm text-[#263650]">
                    <span>This Month</span>
                    <ChevronDown size={17} />
                  </button>
                </div>

                <div className="flex items-center justify-center gap-7 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-blue-600" />
                    <span className="text-[#263650]">New Users</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-emerald-500" />
                    <span className="text-[#263650]">Active Users</span>
                  </div>
                </div>

                <div className="overflow-x-auto px-4 pb-7 sm:px-7">
                  <div className="relative min-w-[760px]">
                    <div className="absolute bottom-[42px] left-[45px] right-0 top-[12px]">
                      {[0, 1, 2, 3, 4, 5].map((line) => (
                        <div
                          key={line}
                          className="absolute left-0 right-0 border-t border-dashed border-gray-200"
                          style={{ top: `${line * 20}%` }}
                        />
                      ))}

                      {[0, 1, 2, 3, 4, 5].map((line) => (
                        <div
                          key={line}
                          className="absolute bottom-0 top-0 border-l border-dashed border-gray-200"
                          style={{ left: `${line * 20}%` }}
                        />
                      ))}

                      <svg
                        viewBox="0 0 760 330"
                        className="absolute inset-0 h-full w-full overflow-visible"
                        preserveAspectRatio="none"
                      >
                        <polyline
                          points={createPoints(newUsers)}
                          fill="none"
                          stroke="#1677ff"
                          strokeWidth="3"
                          vectorEffect="non-scaling-stroke"
                        />

                        <polyline
                          points={createPoints(activeUsers)}
                          fill="none"
                          stroke="#16a765"
                          strokeWidth="3"
                          vectorEffect="non-scaling-stroke"
                        />

                        {newUsers.map((value, index) => {
                          const x =
                            (index / (newUsers.length - 1)) * 760;
                          const y = 330 - (value / 1000) * 330;

                          return (
                            <circle
                              key={`new-${index}`}
                              cx={x}
                              cy={y}
                              r="4"
                              fill="#1677ff"
                            />
                          );
                        })}

                        {activeUsers.map((value, index) => {
                          const x =
                            (index / (activeUsers.length - 1)) * 760;
                          const y = 330 - (value / 1000) * 330;

                          return (
                            <circle
                              key={`active-${index}`}
                              cx={x}
                              cy={y}
                              r="4"
                              fill="#16a765"
                            />
                          );
                        })}
                      </svg>
                    </div>

                    <div className="flex h-[390px]">
                      <div className="flex w-[45px] shrink-0 flex-col justify-between pb-[42px] pt-[12px] text-xs text-gray-500">
                        <span>1200</span>
                        <span>1000</span>
                        <span>800</span>
                        <span>600</span>
                        <span>400</span>
                        <span>200</span>
                        <span>0</span>
                      </div>

                      <div className="relative flex-1">
                        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
                          <span>May 1</span>
                          <span>May 6</span>
                          <span>May 11</span>
                          <span>May 16</span>
                          <span>May 21</span>
                          <span>May 26</span>
                          <span>May 31</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-xl border border-gray-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
                <div className="flex items-center justify-between px-6 pb-2 pt-7">
                  <h2 className="text-[20px] font-semibold text-[#111827]">
                    Recent Activity
                  </h2>

                  <button className="text-[15px] font-medium text-blue-600 hover:text-blue-700">
                    View All
                  </button>
                </div>

                <div className="px-6">
                  {activity.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.title}
                        className={`flex items-center gap-4 py-5 ${index !== activity.length - 1
                            ? "border-b border-gray-100"
                            : ""
                          }`}
                      >
                        <div
                          className={`flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full ${item.bg}`}
                        >
                          <Icon
                            size={23}
                            strokeWidth={1.8}
                            className={item.color}
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[15px] font-semibold text-[#111827]">
                            {item.title}
                          </p>

                          <p className="mt-1 truncate text-[14px] text-gray-500">
                            {item.subtitle}
                          </p>
                        </div>

                        <span className="shrink-0 text-[13px] text-gray-500">
                          {item.time}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          </div>

        </main>

      </div>

      <Footer />

    </>

  );
};

export default AdminDashboard;