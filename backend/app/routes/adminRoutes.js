import express from "express";

import {
  getAdminDashboardStats,
   getRecentActivities,
   getUsersOverview,
   getAdminProfile,
updateAdminProfile,
} from "../controllers/adminController.js";

import {
  getAllUsers,
  getUserById,
  updateUserRole,
  updateUserStatus,
  deleteUser,
} from "../controllers/adminUserController.js";

import {
  getAllTechnologies,
  getTechnologyById,
  updateTechnologyStatus,
  deleteTechnology,
} from "../controllers/adminTechnologyController.js";

import {
  getAllPdfs,
  getPdfById,
  updatePdfStatus,
  deletePdf,
} from "../controllers/adminPdfController.js";

import {
  getAllFolders,
  getFolderById,
  updateFolderStatus,
  deleteFolder,
} from "../controllers/adminFolderController.js";

import {
  getAllQuestions,
  getQuestionById,
  deleteQuestion,
} from "../controllers/adminQuestionController.js";

import {
  getAllChatHistory,
  getChatHistoryById,
  deleteChatHistory,
} from "../controllers/adminChatHistoryController.js";

import { protect } from "../middleware/authmiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get(
  "/dashboard",
  protect,
  adminOnly,
  getAdminDashboardStats
);

router.get(
  "/dashboard/recent-activity",
  protect,
  adminOnly,
  getRecentActivities
);

router.get(
  "/dashboard/users-overview",
  protect,
  adminOnly,
  getUsersOverview
);

router.get(
  "/users",
  protect,
  adminOnly,
  getAllUsers
);

router.get(
  "/users/:id",
  protect,
  adminOnly,
  getUserById
);

router.patch(
  "/users/:id/role",
  protect,
  adminOnly,
  updateUserRole
);

router.patch(
  "/users/:id/status",
  protect,
  adminOnly,
  updateUserStatus
);

router.delete(
  "/users/:id",
  protect,
  adminOnly,
  deleteUser
);

router.get(
  "/technologies",
  protect,
  adminOnly,
  getAllTechnologies
);

router.get(
  "/technologies/:id",
  protect,
  adminOnly,
  getTechnologyById
);

router.patch(
  "/technologies/:id/status",
  protect,
  adminOnly,
  updateTechnologyStatus
);

router.delete(
  "/technologies/:id",
  protect,
  adminOnly,
  deleteTechnology
);

router.get("/pdfs", protect, adminOnly, getAllPdfs);
router.get("/pdfs/:id", protect, adminOnly, getPdfById);
router.patch("/pdfs/:id/status", protect, adminOnly, updatePdfStatus);
router.delete("/pdfs/:id", protect, adminOnly, deletePdf);

router.get("/folders", protect, adminOnly, getAllFolders);
router.get("/folders/:id", protect, adminOnly, getFolderById);
router.patch("/folders/:id/status", protect, adminOnly, updateFolderStatus);
router.delete("/folders/:id", protect, adminOnly, deleteFolder);

router.get(
  "/questions",
  protect,
  adminOnly,
  getAllQuestions
);

router.get(
  "/questions/:id",
  protect,
  adminOnly,
  getQuestionById
);

router.get(
  "/profile",
  protect,
  adminOnly,
  getAdminProfile
);

router.patch(
  "/profile",
  protect,
  adminOnly,
  updateAdminProfile
);
router.delete(
  "/questions/:id",
  protect,
  adminOnly,
  deleteQuestion
);

router.get(
  "/chat-history",
  protect,
  adminOnly,
  getAllChatHistory
);

router.get(
  "/chat-history/:id",
  protect,
  adminOnly,
  getChatHistoryById
);

router.delete(
  "/chat-history/:id",
  protect,
  adminOnly,
  deleteChatHistory
);

export default router;