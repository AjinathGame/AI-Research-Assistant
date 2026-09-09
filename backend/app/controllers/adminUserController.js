import mongoose from "mongoose";
import User from "../models/auth.js";
import Pdf from "../models/Pdf.js";
import Question from "../models/Question.js";
import Activity from "../models/Activity.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("_id name email role authProvider isVerified isActive lastLoginAt createdAt updatedAt")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Get All Users Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await User.findById(id).select(
      "_id name email role authProvider isVerified isActive lastLoginAt createdAt updatedAt"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const [
      totalDocuments,
      totalQuestions,
      recentActivities,
    ] = await Promise.all([
      Pdf.countDocuments({
        userId: user._id,
      }),

      Question.countDocuments({
        userId: user._id,
      }),

      Activity.find({
        userId: user._id,
      })
        .sort({ createdAt: -1 })
        .limit(5)
        .lean(),
    ]);

    const formattedActivities = recentActivities.map(
      (activity) => {
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
        } else if (differenceInSeconds < 604800) {
          const days = Math.floor(
            differenceInSeconds / 86400
          );

          time = `${days} day${days > 1 ? "s" : ""} ago`;
        } else {
          time = createdAt.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });
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
      }
    );

    return res.status(200).json({
      success: true,
      message: "User details fetched successfully",

      data: {
        user: user,

        statistics: {
          documents: totalDocuments,
          questions: totalQuestions,
          searches: null,
          joinedDate: user.createdAt,
        },

        recentActivity: formattedActivities,
      },
    });
  } catch (error) {
    console.error(
      "Get User By ID Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch user details",
    });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role must be either user or admin",
      });
    }

    if (req.user._id.toString() === id && role !== "admin") {
      return res.status(400).json({
        success: false,
        message: "You cannot remove your own administrator privileges",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.role = role;
    await user.save();

    return res.status(200).json({
      success: true,
      message: `User role updated to ${role} successfully`,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Update User Role Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update user role",
    });
  }
};

export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body || {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isActive must be true or false",
      });
    }

    if (req.user._id.toString() === id && !isActive) {
      return res.status(400).json({
        success: false,
        message: "You cannot deactivate your own account",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.isActive = isActive;
    await user.save();

    return res.status(200).json({
      success: true,
      message: isActive
        ? "User activated successfully"
        : "User deactivated successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.error("Update User Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update user status",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    if (req.user._id.toString() === id) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own administrator account",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Delete User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};