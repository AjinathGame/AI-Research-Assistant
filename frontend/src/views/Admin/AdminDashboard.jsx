import React, { useEffect, useState } from "react";
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
  X,
  LogIn,
  UserCheck,
  Clock,
} from "lucide-react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import Footer from "../../components/Home/Footer";
import {
  getAdminDashboardStats,
  getRecentActivities,
  getUsersOverview,
} from "../../api/adminApi";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalTechnologies: 0,
    totalPdfs: 0,
    totalQuestions: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [showPeriodMenu, setShowPeriodMenu] = useState(false);
  const [activity, setActivity] = useState([]);
  const [showAllActivity, setShowAllActivity] = useState(false);

  const [usersOverview, setUsersOverview] = useState({
    newUsers: [],
    activeUsers: [],
  });

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const [statsResponse, activityResponse] =
          await Promise.all([
            getAdminDashboardStats(),
            getRecentActivities(),
          ]);

        if (statsResponse.success) {
          setDashboardData(
            statsResponse.data || {
              totalUsers: 0,
              totalAdmins: 0,
              totalTechnologies: 0,
              totalPdfs: 0,
              totalQuestions: 0,
            }
          );
        }

        if (activityResponse.success) {
          setActivity(activityResponse.data || []);
        }
      } catch (error) {
        console.error("Admin Dashboard Error:", error);

        setError(
          error.message ||
            "Unable to connect to the server"
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  useEffect(() => {
    const loadUsersOverview = async () => {
      try {
        const response = await getUsersOverview(
          selectedPeriod
        );

        if (response.success) {
          setUsersOverview(
            response.data || {
              newUsers: [],
              activeUsers: [],
            }
          );
        }
      } catch (error) {
        console.error(
          "Users Overview Error:",
          error
        );

        setError(
          error.message ||
            "Failed to load users overview"
        );
      }
    };

    loadUsersOverview();
  }, [selectedPeriod]);

  const stats = [
    {
      title: "Total Users",
      value: loading
        ? "..."
        : Number(
            dashboardData.totalUsers || 0
          ).toLocaleString(),
      text: "12.5% from last month",
      icon: Users,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Technologies",
      value: loading
        ? "..."
        : Number(
            dashboardData.totalTechnologies || 0
          ).toLocaleString(),
      text: "2 new this week",
      icon: Layers3,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Total Documents",
      value: loading
        ? "..."
        : Number(
            dashboardData.totalPdfs || 0
          ).toLocaleString(),
      text: "180 this week",
      icon: FileText,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
    },
    {
      title: "Total Questions",
      value: loading
        ? "..."
        : Number(
            dashboardData.totalQuestions || 0
          ).toLocaleString(),
      text: "320 this week",
      icon: CircleHelp,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  const newUsers = Array.isArray(
    usersOverview.newUsers
  )
    ? usersOverview.newUsers.map(Number)
    : [];

  const activeUsers = Array.isArray(
    usersOverview.activeUsers
  )
    ? usersOverview.activeUsers.map(Number)
    : [];

  const maxDataValue = Math.max(
    ...newUsers,
    ...activeUsers,
    0
  );

  const getChartMax = (value) => {
    if (value <= 5) return 5;
    if (value <= 10) return 10;
    if (value <= 20) return 20;
    if (value <= 30) return 30;
    if (value <= 50) return 50;
    if (value <= 100) return 100;
    if (value <= 200) return 200;
    if (value <= 500) return 500;
    if (value <= 1000) return 1000;

    const magnitude = Math.pow(
      10,
      Math.floor(Math.log10(value))
    );

    return (
      Math.ceil(value / magnitude) *
      magnitude
    );
  };

  const chartMax = getChartMax(
    maxDataValue
  );

  const chartWidth = 760;
  const chartHeight = 330;

  const getPoint = (value, index, data) => {
    const denominator = Math.max(
      data.length - 1,
      1
    );

    const x =
      (index / denominator) * chartWidth;

    const y =
      chartHeight -
      (value / chartMax) *
        chartHeight;

    return {
      x,
      y,
    };
  };

  const createPoints = (data) => {
    if (!data.length) {
      return "";
    }

    if (data.length === 1) {
      const point = getPoint(
        data[0],
        0,
        data
      );

      return `${point.x},${point.y}`;
    }

    return data
      .map((value, index) => {
        const point = getPoint(
          value,
          index,
          data
        );

        return `${point.x},${point.y}`;
      })
      .join(" ");
  };

  const getChartLabels = () => {
    const now = new Date();

    if (selectedPeriod === "3months") {
      const labels = [];

      for (let i = 0; i < 3; i++) {
        const date = new Date(
          now.getFullYear(),
          now.getMonth() - 2 + i,
          1
        );

        const daysInMonth = new Date(
          date.getFullYear(),
          date.getMonth() + 1,
          0
        ).getDate();

        const labelIndexes = [
          0,
          Math.floor(
            (daysInMonth - 1) / 2
          ),
          daysInMonth - 1,
        ];

        labelIndexes.forEach((index) => {
          const labelDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            index + 1
          );

          labels.push(
            labelDate.toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
              }
            )
          );
        });
      }

      return labels;
    }

    let year = now.getFullYear();
    let month = now.getMonth();

    if (selectedPeriod === "lastMonth") {
      month--;

      if (month < 0) {
        month = 11;
        year--;
      }
    }

    const daysInMonth = new Date(
      year,
      month + 1,
      0
    ).getDate();

    const labelIndexes = [
      0,
      5,
      10,
      15,
      20,
      25,
      daysInMonth - 1,
    ];

    return labelIndexes.map((index) => {
      const date = new Date(
        year,
        month,
        index + 1
      );

      return date.toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
        }
      );
    });
  };

  const chartLabels = getChartLabels();

  const getActivityIcon = (type) => {
    const normalizedType = String(type || "")
      .toLowerCase()
      .replace(/[-\s]/g, "_");

    if (
      normalizedType.includes("login")
    ) {
      return {
        icon: LogIn,
        bg: "bg-blue-50",
        color: "text-blue-600",
      };
    }

    if (
      normalizedType.includes("register") ||
      normalizedType.includes("signup") ||
      normalizedType.includes("user_created")
    ) {
      return {
        icon: UserPlus,
        bg: "bg-green-50",
        color: "text-green-600",
      };
    }

    if (
      normalizedType.includes("pdf") ||
      normalizedType.includes("upload") ||
      normalizedType.includes("document")
    ) {
      return {
        icon: FilePlus2,
        bg: "bg-orange-50",
        color: "text-orange-500",
      };
    }

    if (
      normalizedType.includes("question") ||
      normalizedType.includes("ask")
    ) {
      return {
        icon: HelpCircle,
        bg: "bg-purple-50",
        color: "text-purple-600",
      };
    }

    if (
      normalizedType.includes("technology")
    ) {
      return {
        icon: Layers,
        bg: "bg-emerald-50",
        color: "text-emerald-600",
      };
    }

    if (
      normalizedType.includes("delete") ||
      normalizedType.includes("remove")
    ) {
      return {
        icon: Trash2,
        bg: "bg-red-50",
        color: "text-red-600",
      };
    }

    if (
      normalizedType.includes("active")
    ) {
      return {
        icon: UserCheck,
        bg: "bg-teal-50",
        color: "text-teal-600",
      };
    }

    return {
      icon: Clock,
      bg: "bg-gray-100",
      color: "text-gray-600",
    };
  };

  const getActivityData = (item) => {
    const fallback =
      getActivityIcon(item?.type);

    return {
      ...item,
      icon: fallback.icon,
      bg:
        item?.bg ||
        fallback.bg,
      color:
        item?.color ||
        fallback.color,
    };
  };

  const displayedActivities =
    activity.map(getActivityData);

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

            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm text-red-600">
                  {error}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.title}
                    className="w-full rounded-xl border border-gray-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.04)]"
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

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setShowPeriodMenu(
                          !showPeriodMenu
                        )
                      }
                      className="flex h-11 cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 text-sm text-[#263650] transition hover:bg-gray-50"
                    >
                      <span>
                        {selectedPeriod ===
                        "month"
                          ? "This Month"
                          : selectedPeriod ===
                            "lastMonth"
                          ? "Last Month"
                          : "Last 3 Months"}
                      </span>

                      <ChevronDown
                        size={17}
                      />
                    </button>

                    {showPeriodMenu && (
                      <div className="absolute right-0 z-20 mt-2 w-40 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg">

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedPeriod(
                              "month"
                            );
                            setShowPeriodMenu(
                              false
                            );
                          }}
                          className="w-full cursor-pointer px-4 py-2 text-left text-sm text-[#263650] transition hover:bg-gray-50"
                        >
                          This Month
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedPeriod(
                              "lastMonth"
                            );
                            setShowPeriodMenu(
                              false
                            );
                          }}
                          className="w-full cursor-pointer px-4 py-2 text-left text-sm text-[#263650] transition hover:bg-gray-50"
                        >
                          Last Month
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedPeriod(
                              "3months"
                            );
                            setShowPeriodMenu(
                              false
                            );
                          }}
                          className="w-full cursor-pointer px-4 py-2 text-left text-sm text-[#263650] transition hover:bg-gray-50"
                        >
                          Last 3 Months
                        </button>

                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-7 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-blue-600" />

                    <span className="text-[#263650]">
                      New Users
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-emerald-500" />

                    <span className="text-[#263650]">
                      Active Users
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto px-4 pb-7 sm:px-7">
                  <div className="relative min-w-[760px]">

                    <div className="flex h-[390px]">

                      <div className="flex w-[45px] shrink-0 flex-col justify-between pb-[42px] pt-[12px] text-xs text-gray-500">
                        <span>
                          {chartMax}
                        </span>

                        <span>
                          {Math.round(
                            chartMax * 0.75
                          )}
                        </span>

                        <span>
                          {Math.round(
                            chartMax * 0.5
                          )}
                        </span>

                        <span>
                          {Math.round(
                            chartMax * 0.25
                          )}
                        </span>

                        <span>0</span>
                      </div>

                      <div className="relative flex-1">

                        <div className="absolute bottom-[42px] left-0 right-0 top-[12px]">

                          {[0, 1, 2, 3, 4].map(
                            (line) => (
                              <div
                                key={`horizontal-${line}`}
                                className="absolute left-0 right-0 border-t border-dashed border-gray-200"
                                style={{
                                  top: `${line * 25}%`,
                                }}
                              />
                            )
                          )}

                          {[0, 1, 2, 3, 4, 5, 6].map(
                            (line) => (
                              <div
                                key={`vertical-${line}`}
                                className="absolute bottom-0 top-0 border-l border-dashed border-gray-200"
                                style={{
                                  left: `${line * 16.6667}%`,
                                }}
                              />
                            )
                          )}

                          {newUsers.length > 0 ||
                          activeUsers.length > 0 ? (
                            <svg
                              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                              className="absolute inset-0 h-full w-full overflow-visible"
                              preserveAspectRatio="none"
                            >
                              {newUsers.length >
                                0 && (
                                <polyline
                                  points={createPoints(
                                    newUsers
                                  )}
                                  fill="none"
                                  stroke="#1677ff"
                                  strokeWidth="3"
                                  vectorEffect="non-scaling-stroke"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              )}

                              {activeUsers.length >
                                0 && (
                                <polyline
                                  points={createPoints(
                                    activeUsers
                                  )}
                                  fill="none"
                                  stroke="#16a765"
                                  strokeWidth="3"
                                  vectorEffect="non-scaling-stroke"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              )}

                              {newUsers.map(
                                (
                                  value,
                                  index
                                ) => {
                                  const point =
                                    getPoint(
                                      value,
                                      index,
                                      newUsers
                                    );

                                  return (
                                    <circle
                                      key={`new-${index}`}
                                      cx={point.x}
                                      cy={point.y}
                                      r="4"
                                      fill="#1677ff"
                                    />
                                  );
                                }
                              )}

                              {activeUsers.map(
                                (
                                  value,
                                  index
                                ) => {
                                  const point =
                                    getPoint(
                                      value,
                                      index,
                                      activeUsers
                                    );

                                  return (
                                    <circle
                                      key={`active-${index}`}
                                      cx={point.x}
                                      cy={point.y}
                                      r="4"
                                      fill="#16a765"
                                    />
                                  );
                                }
                              )}
                            </svg>
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <p className="text-sm text-gray-400">
                                No user activity available
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
                          {chartLabels.map(
                            (
                              label,
                              index
                            ) => (
                              <span
                                key={index}
                              >
                                {label}
                              </span>
                            )
                          )}
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

                  <button
                    type="button"
                    onClick={() =>
                      setShowAllActivity(
                        true
                      )
                    }
                    className="cursor-pointer text-[15px] font-medium text-blue-600 transition hover:text-blue-700"
                  >
                    View All
                  </button>
                </div>

                <div className="px-6">

                  {displayedActivities.length ===
                  0 ? (
                    <div className="flex min-h-[300px] items-center justify-center">
                      <p className="text-sm text-gray-400">
                        No recent activity
                      </p>
                    </div>
                  ) : (
                    displayedActivities
                      .slice(0, 5)
                      .map(
                        (
                          item,
                          index
                        ) => {
                          const Icon =
                            item.icon;

                          return (
                            <div
                              key={
                                item._id ||
                                item.id ||
                                `${item.title}-${index}`
                              }
                              className={`flex items-center gap-4 py-5 ${
                                index !==
                                Math.min(
                                  displayedActivities.length,
                                  5
                                ) -
                                  1
                                  ? "border-b border-gray-100"
                                  : ""
                              }`}
                            >
                              <div
                                className={`flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full ${item.bg}`}
                              >
                                <Icon
                                  size={23}
                                  strokeWidth={
                                    1.8
                                  }
                                  className={
                                    item.color
                                  }
                                />
                              </div>

                              <div className="min-w-0 flex-1">
                                <p className="truncate text-[15px] font-semibold text-[#111827]">
                                  {item.title ||
                                    "Activity"}
                                </p>

                                <p className="mt-1 truncate text-[14px] text-gray-500">
                                  {item.subtitle ||
                                    item.description ||
                                    ""}
                                </p>
                              </div>

                              <span className="shrink-0 text-[13px] text-gray-500">
                                {item.time ||
                                  ""}
                              </span>
                            </div>
                          );
                        }
                      )
                  )}

                </div>
              </section>

            </div>
          </div>
        </main>
      </div>

      {showAllActivity && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-sm"
          onClick={() =>
            setShowAllActivity(false)
          }
        >
          <div
            className="max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-semibold text-[#111827]">
                  Recent Activity
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Latest activity across the platform
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowAllActivity(
                    false
                  )
                }
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[65vh] overflow-y-auto px-6">

              {displayedActivities.length ===
              0 ? (
                <div className="flex h-60 items-center justify-center">
                  <p className="text-sm text-gray-400">
                    No recent activity available
                  </p>
                </div>
              ) : (
                displayedActivities.map(
                  (
                    item,
                    index
                  ) => {
                    const Icon =
                      item.icon;

                    return (
                      <div
                        key={
                          item._id ||
                          item.id ||
                          `modal-${index}`
                        }
                        className={`flex items-center gap-4 py-5 ${
                          index !==
                          displayedActivities.length -
                            1
                            ? "border-b border-gray-100"
                            : ""
                        }`}
                      >
                        <div
                          className={`flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full ${item.bg}`}
                        >
                          <Icon
                            size={22}
                            strokeWidth={1.8}
                            className={
                              item.color
                            }
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-[15px] font-semibold text-[#111827]">
                            {item.title ||
                              "Activity"}
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            {item.subtitle ||
                              item.description ||
                              ""}
                          </p>
                        </div>

                        <span className="shrink-0 text-xs text-gray-500">
                          {item.time ||
                            ""}
                        </span>
                      </div>
                    );
                  }
                )
              )}

            </div>

            <div className="border-t border-gray-200 px-6 py-4">
              <button
                type="button"
                onClick={() =>
                  setShowAllActivity(
                    false
                  )
                }
                className="w-full cursor-pointer rounded-lg bg-gray-100 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default AdminDashboard;