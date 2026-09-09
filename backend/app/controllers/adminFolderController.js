import mongoose from "mongoose";
import Folder from "../models/Folder.js";
import Pdf from "../models/Pdf.js";

export const getAllFolders = async (req, res) => {
  try {
    const folders = await Folder.find()
      .populate("technologyId", "name slug")
      .populate("parentFolderId", "name slug")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Folders fetched successfully",
      data: folders,
    });
  } catch (error) {
    console.error("Get All Folders Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch folders",
    });
  }
};


export const getFolderById = async (req, res) => {
  try {
    const folder = await Folder.findById(req.params.id)
      .populate("technologyId", "name slug");

    if (!folder) {
      return res.status(404).json({
        success: false,
        message: "Folder not found",
      });
    }

    const pdfs = await Pdf.find({
      folderId: folder._id,
    }).sort({
      createdAt: -1,
    });

    const formattedPdfs = pdfs.map((pdf) => ({
      _id: pdf._id,
      filename: pdf.filename,
      originalName: pdf.originalName,
      filePath: pdf.filePath,
      fileSize: pdf.fileSize,
      pages: pdf.pages,
      chunkCount: pdf.chunkCount,
      visibility: pdf.visibility,
      status: pdf.status,
      createdAt: pdf.createdAt,
    }));

    return res.status(200).json({
      success: true,
      data: {
        folder,
        pdfs: formattedPdfs,
        statistics: {
          totalPdfs: pdfs.length,
          totalPages: pdfs.reduce(
            (total, pdf) => total + Number(pdf.pages || 0),
            0
          ),
          totalChunks: pdfs.reduce(
            (total, pdf) => total + Number(pdf.chunkCount || 0),
            0
          ),
        },
      },
    });
  } catch (error) {
    console.error("Get Folder Details Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch folder details",
    });
  }
};
export const updateFolderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body || {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid folder ID",
      });
    }

    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isActive must be true or false",
      });
    }

    const folder = await Folder.findByIdAndUpdate(
      id,
      { isActive },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("technologyId", "name slug")
      .populate("parentFolderId", "name slug");

    if (!folder) {
      return res.status(404).json({
        success: false,
        message: "Folder not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: isActive
        ? "Folder activated successfully"
        : "Folder deactivated successfully",
      data: folder,
    });
  } catch (error) {
    console.error("Update Folder Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update folder status",
    });
  }
};

export const deleteFolder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid folder ID",
      });
    }

    const folder = await Folder.findById(id);

    if (!folder) {
      return res.status(404).json({
        success: false,
        message: "Folder not found",
      });
    }

    const childFolderCount = await Folder.countDocuments({
      parentFolderId: id,
    });

    if (childFolderCount > 0) {
      return res.status(400).json({
        success: false,
        message:
          "Folder cannot be deleted because it contains subfolders",
      });
    }

    const pdfCount = await Pdf.countDocuments({
      folderId: id,
    });

    if (pdfCount > 0) {
      return res.status(400).json({
        success: false,
        message:
          "Folder cannot be deleted because it contains PDFs",
        data: {
          pdfCount,
        },
      });
    }

    await Folder.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Folder deleted successfully",
      data: {
        folderId: id,
        name: folder.name,
      },
    });
  } catch (error) {
    console.error("Admin Delete Folder Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete folder",
    });
  }
};