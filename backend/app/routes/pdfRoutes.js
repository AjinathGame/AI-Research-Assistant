import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  uploadPdf,
  deletePdf,
} from "../controllers/pdfController.js";

const router = express.Router();

router.post("/upload", upload.single("pdf"), uploadPdf);
router.delete("/:pdfId", deletePdf);

export default router;