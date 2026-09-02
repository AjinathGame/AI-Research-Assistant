import express from "express";

import {
  createFolder,
  getFoldersByTechnology,
  getFolderById,
  getSubfolders,
  deleteFolder,
} from "../controllers/folderController.js";

const router = express.Router();

router.post("/", createFolder);

router.get(
  "/technology/:technologyId",
  getFoldersByTechnology
);

router.get(
  "/:parentFolderId/subfolders",
  getSubfolders
);

router.get("/:id", getFolderById);

router.delete("/:folderId", deleteFolder);

export default router;