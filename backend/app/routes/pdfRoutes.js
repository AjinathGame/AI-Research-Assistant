import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  uploadPdf,
  deletePdf,
    getPdfList,
} from "../controllers/pdfController.js";

const router = express.Router();

router.post("/upload", upload.single("pdf"), uploadPdf);
router.delete("/:pdfId", deletePdf);


router.get(
  "/list",
  getPdfList
)
export default router;