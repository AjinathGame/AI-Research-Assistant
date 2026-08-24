import Pdf from "../models/Pdf.js";
import Technology from "../models/Technology.js";
import Folder from "../models/Folder.js";
import {
  indexPdf,
  deletePdf as deletePdfFromRag,
} from "../services/rag_service.js";

import fs from "fs";
import path from "path";

const createSafeName = (value) => {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const uploadPdf = async (req, res) => {
  let temporaryFilePath = null;

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "PDF file is required",
      });
    }

    temporaryFilePath = req.file.path;

    const { technologyId, folderId } = req.body;

    if (!technologyId) {
      fs.unlinkSync(temporaryFilePath);

      return res.status(400).json({
        success: false,
        message: "Technology is required",
      });
    }

    if (!folderId) {
      fs.unlinkSync(temporaryFilePath);

      return res.status(400).json({
        success: false,
        message: "Folder is required",
      });
    }

    const technology = await Technology.findOne({
      _id: technologyId,
      isActive: true,
    });

    if (!technology) {
      fs.unlinkSync(temporaryFilePath);

      return res.status(404).json({
        success: false,
        message: "Technology not found or inactive",
      });
    }

    const folder = await Folder.findOne({
      _id: folderId,
      technologyId,
      isActive: true,
    });

    if (!folder) {
      fs.unlinkSync(temporaryFilePath);

      return res.status(400).json({
        success: false,
        message: "Selected folder does not belong to selected technology",
      });
    }

    const technologyFolder = createSafeName(technology.slug);
    const folderName = createSafeName(folder.slug);

    const finalDirectory = path.join(
      process.cwd(),
      "storage",
      "uploads",
      technologyFolder,
      folderName
    );

    fs.mkdirSync(finalDirectory, {
      recursive: true,
    });

    const extension = path.extname(req.file.originalname).toLowerCase();

    const baseName = path
      .basename(req.file.originalname, extension)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const uniqueName = `${Date.now()}-${baseName}${extension}`;

    const finalFilePath = path.join(
      finalDirectory,
      uniqueName
    );

    fs.renameSync(
      temporaryFilePath,
      finalFilePath
    );

    temporaryFilePath = null;

    const pdf = await Pdf.create({
      filename: uniqueName,
      originalName: req.file.originalname,
      filePath: finalFilePath,
      technologyId: technology._id,
      folderId: folder._id,
      fileSize: req.file.size,
      status: "processing",
    });

    console.log(
      `PDF saved in folder: ${technology.slug}/${folder.slug}`
    );

    try {
      const ragResult = await indexPdf({
        filePath: finalFilePath,
        pdfId: pdf._id.toString(),
        userId: "user-001",
        filename: req.file.originalname,
        technologyId: technology._id.toString(),
        folderId: folder._id.toString(),
      });

      pdf.status = "processed";

      await pdf.save();

      return res.status(201).json({
        success: true,
        message: "PDF uploaded and indexed successfully",
        data: {
          pdf,
          rag: ragResult,
        },
      });
    } catch (ragError) {
      pdf.status = "failed";

      await pdf.save();

      console.error("RAG Processing Error:", ragError);

      return res.status(500).json({
        success: false,
        message: "PDF uploaded but processing failed",
        error: ragError.message,
      });
    }
  } catch (error) {
    if (
      temporaryFilePath &&
      fs.existsSync(temporaryFilePath)
    ) {
      fs.unlinkSync(temporaryFilePath);
    }

    console.error("PDF Upload Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to upload PDF",
      error: error.message,
    });
  }
};

export const deletePdf = async (req, res) => {
  try {
    const { pdfId } = req.params;

    if (!pdfId) {
      return res.status(400).json({
        success: false,
        message: "PDF ID is required",
      });
    }

    const pdf = await Pdf.findById(pdfId);

    if (!pdf) {
      return res.status(404).json({
        success: false,
        message: "PDF not found",
      });
    }

    const ragResult = await deletePdfFromRag({
      pdfId,
    });

    if (pdf.filePath && fs.existsSync(pdf.filePath)) {
      fs.unlinkSync(pdf.filePath);
    }

    await Pdf.findByIdAndDelete(pdfId);

    return res.status(200).json({
      success: true,
      message: "PDF deleted successfully",
      data: {
        pdfId,
        deletedChunks: ragResult.deletedChunks,
      },
    });

  } catch (error) {
    console.error("PDF Delete Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete PDF",
      error: error.message,
    });
  }
};