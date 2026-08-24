import express from "express";

import {
  createFolder,
  getFoldersByTechnology,
  getFolderById,
  deleteFolder,
} from "../controllers/folderController.js";

const router = express.Router();

router.post("/", createFolder);

router.get(
  "/technology/:technologyId",
  getFoldersByTechnology
);

router.get("/:id", getFolderById);
router.delete("/:id", deleteFolder);

export default router;