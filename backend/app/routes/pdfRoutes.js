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

const router = express.Router();

const upload = multer({
  dest: "storage/temp",
});

router.post(
  "/upload",
  upload.single("pdf"),
  uploadPdf
);

router.get(
  "/dashboard-stats",
  getDashboardStats
);

router.get(
  "/",
  getPdfList
);

router.get(
  "/folder/:folderId",
  getPdfsByFolder
);

router.get(
  "/:pdfId/view",
  viewPdf
);

router.delete(
  "/:pdfId",
  deletePdf
);

export default router;