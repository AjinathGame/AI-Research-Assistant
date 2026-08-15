import Pdf from "../models/pdf.js";
import { indexPdf } from "../services/rag_service.js";

export const uploadPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "PDF file is required",
      });
    }

    const { technology } = req.body;

    if (!technology) {
      return res.status(400).json({
        success: false,
        message: "Technology is required",
      });
    }

    const pdf = await Pdf.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      filePath: req.file.path,
      technology,
      fileSize: req.file.size,
      status: "uploaded",
    });

    console.log("PDF saved in MongoDB");

    const ragResult = await indexPdf({
      filePath: req.file.path,
      pdfId: pdf._id.toString(),
      userId: "user-001",
      filename: req.file.originalname,
      technology,
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

  } catch (error) {
    console.error("PDF Upload Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to upload and process PDF",
      error: error.message,
    });
  }
};