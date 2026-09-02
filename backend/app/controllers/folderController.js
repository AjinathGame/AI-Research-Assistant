import Folder from "../models/Folder.js";
import Pdf from "../models/Pdf.js";
import Technology from "../models/Technology.js";

export const createFolder = async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      technologyId,
      parentFolderId,
    } = req.body;

    if (!name || !slug || !technologyId) {
      return res.status(400).json({
        success: false,
        message: "Name, slug and technologyId are required",
      });
    }

    const technology = await Technology.findOne({
      _id: technologyId,
      isActive: true,
    });

    if (!technology) {
      return res.status(404).json({
        success: false,
        message: "Technology not found",
      });
    }

    if (parentFolderId) {
      const parentFolder = await Folder.findOne({
        _id: parentFolderId,
        technologyId,
        isActive: true,
      });

      if (!parentFolder) {
        return res.status(404).json({
          success: false,
          message: "Parent folder not found",
        });
      }
    }

    const existingFolder = await Folder.findOne({
      technologyId,
      parentFolderId: parentFolderId || null,
      slug,
      isActive: true,
    });

    if (existingFolder) {
      return res.status(409).json({
        success: false,
        message: "Folder already exists",
      });
    }

    const folder = await Folder.create({
      name,
      slug,
      description: description || "",
      technologyId,
      parentFolderId: parentFolderId || null,
    });

    return res.status(201).json({
      success: true,
      message: parentFolderId
        ? "Subfolder created successfully"
        : "Folder created successfully",
      data: folder,
    });
  } catch (error) {
    console.error("Create Folder Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create folder",
      error: error.message,
    });
  }
};

export const getFoldersByTechnology = async (req, res) => {
  try {
    const { technologyId } = req.params;

    const technology = await Technology.findOne({
      _id: technologyId,
      isActive: true,
    });

    if (!technology) {
      return res.status(404).json({
        success: false,
        message: "Technology not found",
      });
    }

    const folders = await Folder.find({
      technologyId,
      parentFolderId: null,
      isActive: true,
    }).sort({ name: 1 });

    return res.status(200).json({
      success: true,
      data: folders,
    });
  } catch (error) {
    console.error("Get Folders Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch folders",
      error: error.message,
    });
  }
};

export const getSubfolders = async (req, res) => {
  try {
    const { folderId } = req.params;

    const parentFolder = await Folder.findOne({
      _id: folderId,
      isActive: true,
    });

    if (!parentFolder) {
      return res.status(404).json({
        success: false,
        message: "Parent folder not found",
      });
    }

    const subfolders = await Folder.find({
      parentFolderId: folderId,
      technologyId: parentFolder.technologyId,
      isActive: true,
    }).sort({ name: 1 });

    return res.status(200).json({
      success: true,
      data: subfolders,
    });
  } catch (error) {
    console.error("Get Subfolders Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch subfolders",
      error: error.message,
    });
  }
};

export const getFolderById = async (req, res) => {
  try {
    const folder = await Folder.findOne({
      _id: req.params.id,
      isActive: true,
    });

    if (!folder) {
      return res.status(404).json({
        success: false,
        message: "Folder not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: folder,
    });
  } catch (error) {
    console.error("Get Folder Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch folder",
      error: error.message,
    });
  }
};

export const deleteFolder = async (req, res) => {
  try {
    const { folderId } = req.params;

    if (!folderId) {
      return res.status(400).json({
        success: false,
        message: "Folder ID is required",
      });
    }

    const folder = await Folder.findById(folderId);

    if (!folder) {
      return res.status(404).json({
        success: false,
        message: "Folder not found",
      });
    }

    const pdfCount = await Pdf.countDocuments({
      folderId: folder._id,
    });

    if (pdfCount > 0) {
      return res.status(400).json({
        success: false,
        message:
          "This folder contains PDFs. Please delete all PDFs from this folder before deleting the folder.",
        pdfCount,
      });
    }

    await Folder.findByIdAndDelete(folderId);

    return res.status(200).json({
      success: true,
      message: "Folder deleted successfully",
      data: {
        folderId,
      },
    });
  } catch (error) {
    console.error("Delete Folder Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete folder",
      error: error.message,
    });
  }
};