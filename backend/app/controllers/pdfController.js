import Pdf from "../models/Pdf.js";
import Technology from "../models/Technology.js";
import Folder from "../models/Folder.js";
import Question from "../models/Question.js";

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
  let pdf = null;

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "PDF file is required",
      });
    }

    temporaryFilePath = req.file.path;

    const {
      technologyId,
      folderId,
      visibility,
    } = req.body;

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

    const allowedVisibility = [
      "Private",
      "Team",
      "Public",
    ];

    if (!visibility) {
      fs.unlinkSync(temporaryFilePath);

      return res.status(400).json({
        success: false,
        message: "Document visibility is required",
      });
    }

    if (!allowedVisibility.includes(visibility)) {
      fs.unlinkSync(temporaryFilePath);

      return res.status(400).json({
        success: false,
        message: "Invalid document visibility",
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
        message:
          "Selected folder does not belong to selected technology",
      });
    }

    const technologyFolder =
      createSafeName(technology.slug);

    const folderName =
      createSafeName(folder.slug);

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

    const extension = path
      .extname(req.file.originalname)
      .toLowerCase();

    const baseName = path
      .basename(
        req.file.originalname,
        extension
      )
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const uniqueName =
      `${Date.now()}-${baseName}${extension}`;

    const finalFilePath = path.join(
      finalDirectory,
      uniqueName
    );

    fs.renameSync(
      temporaryFilePath,
      finalFilePath
    );

    temporaryFilePath = null;

    pdf = await Pdf.create({
      filename: uniqueName,
      originalName: req.file.originalname,
      filePath: finalFilePath,
      technologyId: technology._id,
      folderId: folder._id,
      fileSize: req.file.size,
      visibility,
      status: "processing",
      pages: 0,
      chunkCount: 0,
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

      pdf.pages =
        Number(ragResult.pages) || 0;

      pdf.chunkCount =
        Number(ragResult.chunkCount) || 0;

      await pdf.save();

      return res.status(201).json({
        success: true,
        message:
          "PDF uploaded and indexed successfully",

        data: {
          pdf,
          rag: ragResult,
        },
      });

    } catch (ragError) {
      pdf.status = "failed";

      await pdf.save();

      console.error(
        "RAG Processing Error:",
        ragError
      );

      return res.status(500).json({
        success: false,
        message:
          "PDF uploaded but processing failed",
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

    console.error(
      "PDF Upload Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to upload PDF",
      error: error.message,
    });
  }
};

export const viewPdf = async (req, res) => {
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

    if (!pdf.filePath) {
      return res.status(404).json({
        success: false,
        message: "PDF file path not found",
      });
    }

    if (!fs.existsSync(pdf.filePath)) {
      return res.status(404).json({
        success: false,
        message:
          "PDF file does not exist on server",
      });
    }

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `inline; filename="${pdf.originalName}"`
    );

    return res.sendFile(
      path.resolve(pdf.filePath)
    );

  } catch (error) {
    console.error(
      "View PDF Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to view PDF",
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

    const ragResult =
      await deletePdfFromRag({
        pdfId,
      });

    if (
      pdf.filePath &&
      fs.existsSync(pdf.filePath)
    ) {
      fs.unlinkSync(pdf.filePath);
    }

    await Pdf.findByIdAndDelete(pdfId);

    return res.status(200).json({
      success: true,
      message: "PDF deleted successfully",

      data: {
        pdfId,
        deletedChunks:
          ragResult.deletedChunks,
      },
    });

  } catch (error) {
    console.error(
      "PDF Delete Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete PDF",
      error: error.message,
    });
  }
};

export const getPdfList = async (req, res) => {
  try {

     const userId = "6a80b25c6e489cf2c83167b2";

    // const userId= "6a80b2916e489cf2c83167b3";

    const pdfs = await Pdf.find({userId: userId})
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message:
        "PDF list fetched successfully",
      data: pdfs,
    });

  } catch (error) {
    console.error(
      "PDF List Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch PDF list",
      error: error.message,
    });
  }
};

export const getPdfsByFolder = async (
  req,
  res
) => {
  try {
    const { folderId } = req.params;

    if (!folderId) {
      return res.status(400).json({
        success: false,
        message: "Folder ID is required",
      });
    }

    const folder = await Folder.findOne({
      _id: folderId,
      isActive: true,
    });

    if (!folder) {
      return res.status(404).json({
        success: false,
        message: "Folder not found",
      });
    }

    const pdfs = await Pdf.find({
      folderId,
    })
      .populate(
        "technologyId",
        "name slug"
      )
      .populate(
        "folderId",
        "name slug"
      )
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      message:
        "PDFs fetched successfully",
      data: pdfs,
    });

  } catch (error) {
    console.error(
      "Get PDFs By Folder Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch PDFs",
      error: error.message,
    });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const stats = await Pdf.aggregate([
      {
        $group: {
          _id: null,
          totalPdfs: {
            $sum: 1,
          },
          totalPages: {
            $sum: "$pages",
          },
          textChunks: {
            $sum: "$chunkCount",
          },
        },
      },
    ]);

    const questionsAsked =
      await Question.countDocuments();

    const result = stats[0] || {
      totalPdfs: 0,
      totalPages: 0,
      textChunks: 0,
    };

    return res.status(200).json({
      success: true,
      data: {
        totalPdfs: result.totalPdfs,
        totalPages: result.totalPages,
        textChunks: result.textChunks,
        questionsAsked,
      },
    });

  } catch (error) {
    console.error(
      "Dashboard Stats Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to load dashboard statistics",
    });
  }
};