import User from "../models/auth.js";
import Technology from "../models/Technology.js";
import Pdf from "../models/Pdf.js";
import Question from "../models/Question.js";
import Activity from "../models/Activity.js";
import { createActivity } from "../services/activityService.js";

export const getAdminDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalAdmins,
      totalTechnologies,
      totalPdfs,
      totalQuestions,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: "admin" }),
      Technology.countDocuments(),
      Pdf.countDocuments(),
      Question.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      message: "Admin dashboard statistics fetched successfully",
      data: {
        totalUsers,
        totalAdmins,
        totalTechnologies,
        totalPdfs,
        totalQuestions,
      },
    });
  } catch (error) {
    console.error("Admin Dashboard Stats Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch admin dashboard statistics",
    });
  }
};

export const getRecentActivities = async (req, res) => {
  try {
    const activities = await Activity.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const formattedActivities = activities.map((activity) => {
      let icon = "default";
      let bg = "bg-gray-50";
      let color = "text-gray-600";

      switch (activity.type) {
        case "user_registered":
          icon = "user";
          bg = "bg-blue-50";
          color = "text-blue-600";
          break;

        case "user_login":
          icon = "user";
          bg = "bg-blue-50";
          color = "text-blue-600";
          break;

        case "document_uploaded":
          icon = "document";
          bg = "bg-green-50";
          color = "text-green-600";
          break;

        case "question_asked":
          icon = "question";
          bg = "bg-purple-50";
          color = "text-purple-600";
          break;

        case "technology_added":
          icon = "technology";
          bg = "bg-orange-50";
          color = "text-orange-500";
          break;

        case "document_deleted":
          icon = "delete";
          bg = "bg-red-50";
          color = "text-red-500";
          break;
      }

      const createdAt = new Date(activity.createdAt);
      const now = new Date();

      const differenceInSeconds = Math.floor(
        (now - createdAt) / 1000
      );

      let time = "";

      if (differenceInSeconds < 60) {
        time = "Just now";
      } else if (differenceInSeconds < 3600) {
        const minutes = Math.floor(
          differenceInSeconds / 60
        );

        time = `${minutes} min ago`;
      } else if (differenceInSeconds < 86400) {
        const hours = Math.floor(
          differenceInSeconds / 3600
        );

        time = `${hours} hr ago`;
      } else {
        const days = Math.floor(
          differenceInSeconds / 86400
        );

        time = `${days} day${days > 1 ? "s" : ""} ago`;
      }

      return {
        id: activity._id,
        type: activity.type,
        title: activity.title,
        subtitle: activity.description,
        time,
        icon,
        bg,
        color,
        createdAt: activity.createdAt,
      };
    });

    return res.status(200).json({
      success: true,
      message: "Recent activities fetched successfully",
      data: formattedActivities,
    });
  } catch (error) {
    console.error("Recent Activities Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch recent activities",
    });
  }
};

export const getUsersOverview = async (req, res) => {
  try {
    const { period = "month" } = req.query;

    const now = new Date();

    let startDate;
    let endDate;

    if (period === "month") {
      startDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      );

      endDate = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        1
      );
    } else if (period === "lastMonth") {
      startDate = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        1
      );

      endDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      );
    } else if (period === "3months") {
      startDate = new Date(
        now.getFullYear(),
        now.getMonth() - 2,
        1
      );

      endDate = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        1
      );
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid period",
      });
    }

    const users = await User.find({
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    }).select("createdAt");

    const loginActivities = await Activity.find({
      type: "user_login",
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    }).select("userId createdAt");

    const daysInPeriod = Math.ceil(
      (endDate - startDate) /
        (1000 * 60 * 60 * 24)
    );

    const newUsers = Array(daysInPeriod).fill(0);
    const activeUsers = Array(daysInPeriod).fill(0);

    users.forEach((user) => {
      if (!user.createdAt) {
        return;
      }

      const createdDate = new Date(user.createdAt);

      const dayIndex = Math.floor(
        (createdDate - startDate) /
          (1000 * 60 * 60 * 24)
      );

      if (
        dayIndex >= 0 &&
        dayIndex < newUsers.length
      ) {
        newUsers[dayIndex]++;
      }
    });

    const dailyActiveUsers = {};

    loginActivities.forEach((activity) => {
      if (!activity.userId || !activity.createdAt) {
        return;
      }

      const loginDate = new Date(activity.createdAt);

      const dayIndex = Math.floor(
        (loginDate - startDate) /
          (1000 * 60 * 60 * 24)
      );

      if (
        dayIndex >= 0 &&
        dayIndex < activeUsers.length
      ) {
        if (!dailyActiveUsers[dayIndex]) {
          dailyActiveUsers[dayIndex] = new Set();
        }

        dailyActiveUsers[dayIndex].add(
          String(activity.userId)
        );
      }
    });

    Object.keys(dailyActiveUsers).forEach(
      (dayIndex) => {
        activeUsers[Number(dayIndex)] =
          dailyActiveUsers[dayIndex].size;
      }
    );

    return res.status(200).json({
      success: true,
      message: "Users overview fetched successfully",
      data: {
        period,
        newUsers,
        activeUsers,
      },
    });
  } catch (error) {
    console.error("Users Overview Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch users overview",
    });
  }
};

export const getAdminProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const user = await User.findById(req.user._id).select(
      "_id name email phone location role isVerified isActive createdAt lastLoginAt"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Admin profile not found",
      });
    }

    const [
      usersManaged,
      documents,
      questions,
      technologies,
    ] = await Promise.all([
      User.countDocuments(),
      Pdf.countDocuments(),
      Question.countDocuments(),
      Technology.countDocuments(),
    ]);

    const recentActivity = await Activity.find({
      userId: req.user._id,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      message: "Admin profile fetched successfully",
      data: {
        user,
        statistics: {
          usersManaged,
          documents,
          questions,
          technologies,
        },
        recentActivity,
      },
    });
  } catch (error) {
    console.error("Get Admin Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch admin profile",
    });
  }
};

export const updateAdminProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const { name, phone, location } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name.trim(),
        phone: phone?.trim() || "",
        location: location?.trim() || "",
      },
      {
        new: true,
        runValidators: true,
      }
    ).select(
      "_id name email phone location role isVerified isActive createdAt lastLoginAt"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Admin profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    console.error("Update Admin Profile Error:", error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Failed to update admin profile",
    });
  }
};