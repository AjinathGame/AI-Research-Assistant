import fs from "fs";
import Pdf from "../models/Pdf.js";
import mongoose from "mongoose";
import { createActivity } from "../services/activityService.js";
import { deletePdf as deletePdfFromRag } from "../services/rag_Service.js";

export const getAllPdfs = async (req, res) => {
  try {
    const now = new Date();

    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    const [
      pdfs,
      totalDocuments,
      totalPagesResult,
      totalChunksResult,
      activeDocuments,
      newThisMonth,
    ] = await Promise.all([
      Pdf.find()
        .populate("userId", "_id name email")
        .populate("technologyId", "_id name")
        .populate("folderId", "_id name")
        .sort({ createdAt: -1 })
        .lean(),

      Pdf.countDocuments(),

      Pdf.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: "$pages" },
          },
        },
      ]),

      Pdf.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: "$chunkCount" },
          },
        },
      ]),

      Pdf.countDocuments({
        status: "processed",
      }),

      Pdf.countDocuments({
        createdAt: {
          $gte: startOfMonth,
        },
      }),
    ]);

    const totalPages =
      totalPagesResult.length > 0
        ? totalPagesResult[0].total
        : 0;

    const totalChunks =
      totalChunksResult.length > 0
        ? totalChunksResult[0].total
        : 0;

    return res.status(200).json({
      success: true,
      message: "PDF documents fetched successfully",

      statistics: {
        totalDocuments,
        totalPages,
        totalChunks,
        activeDocuments,
        newThisMonth,
      },

      count: pdfs.length,

      data: pdfs,
    });
  } catch (error) {
    console.error("Get All PDFs Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch PDF documents",
    });
  }
};

export const getPdfById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid PDF ID",
      });
    }

    const pdf = await Pdf.findById(id)
      .populate("userId", "name email")
      .populate("technologyId", "name slug")
      .populate("folderId", "name slug");

    if (!pdf) {
      return res.status(404).json({
        success: false,
        message: "PDF not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "PDF fetched successfully",
      data: pdf,
    });
  } catch (error) {
    console.error("Get PDF By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch PDF",
    });
  }
};

export const updatePdfStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body || {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid PDF ID",
      });
    }

    const allowedStatuses = [
      "uploaded",
      "processing",
      "processed",
      "failed",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Status must be uploaded, processing, processed, or failed",
      });
    }

    const pdf = await Pdf.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    )
      .populate("userId", "name email")
      .populate("technologyId", "name slug")
      .populate("folderId", "name slug");

    if (!pdf) {
      return res.status(404).json({
        success: false,
        message: "PDF not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "PDF status updated successfully",
      data: pdf,
    });
  } catch (error) {
    console.error("Update PDF Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update PDF status",
    });
  }
};



export const deletePdf = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid PDF ID",
      });
    }

    const pdf = await Pdf.findById(id);

    if (!pdf) {
      return res.status(404).json({
        success: false,
        message: "PDF not found",
      });
    }

    let deletedChunks = 0;

    try {
      const ragResult = await deletePdfFromRag({
        pdfId: id,
      });

      deletedChunks = ragResult?.deletedChunks || 0;
    } catch (ragError) {
      console.error("Admin PDF RAG Delete Error:", ragError);

      return res.status(500).json({
        success: false,
        message: "Failed to delete PDF from RAG storage",
      });
    }

    if (pdf.filePath && fs.existsSync(pdf.filePath)) {
      fs.unlinkSync(pdf.filePath);
    }

    await Pdf.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "PDF deleted successfully",
      data: {
        pdfId: id,
        filename: pdf.filename,
        originalName: pdf.originalName,
        deletedChunks,
      },
    });
  } catch (error) {
    console.error("Admin PDF Delete Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete PDF",
    });
  }
};