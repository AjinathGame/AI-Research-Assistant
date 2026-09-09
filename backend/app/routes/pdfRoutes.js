import express from "express";
import multer from "multer";

import {
  uploadPdf,
  deletePdf,
  getPdfList,
  getPdfsByFolder,
  viewPdf,
  getDashboardStats,
} from "../controllers/pdfController.js";

import { protect } from "../middleware/authmiddleware.js";

const router = express.Router();

const upload = multer({
  dest: "storage/temp",
});

router.post(
  "/upload",
  protect,
  upload.single("pdf"),
  uploadPdf
);

router.get(
  "/dashboard-stats",
  protect,
  getDashboardStats
);

router.get(
  "/",
  protect,
  getPdfList
);

router.get(
  "/folder/:folderId",
  protect,
  getPdfsByFolder
);

router.get(
  "/:pdfId/view",
  protect,
  viewPdf
);

router.delete(
  "/:pdfId",
  protect,
  deletePdf
);

export default router;