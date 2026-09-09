import express from "express";

import {
  createFolder,
  getFoldersByTechnology,
  getFolderById,
  getSubfolders,
  deleteFolder,
} from "../controllers/folderController.js";
import { protect } from "../middleware/authmiddleware.js";
const router = express.Router();

router.post("/", createFolder);

router.get(
  "/technology/:technologyId",
  protect,
  getFoldersByTechnology
);

router.get(
  "/:parentFolderId/subfolders",
  protect,
  getSubfolders
);

router.get("/:id", protect, getFolderById);

router.delete("/:folderId", protect, deleteFolder);

export default router;