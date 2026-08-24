import Folder from "../models/Folder.js";
import Pdf from "../models/Pdf.js";
import Technology from "../models/Technology.js";

export const createFolder = async (req, res) => {
  try {
    const { name, slug, description, technologyId } = req.body;

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

    const existingFolder = await Folder.findOne({
      technologyId,
      slug,
    });

    if (existingFolder) {
      return res.status(409).json({
        success: false,
        message: "Folder already exists in this technology",
      });
    }

    const folder = await Folder.create({
      name,
      slug,
      description: description || "",
      technologyId,
    });

    return res.status(201).json({
      success: true,
      message: "Folder created successfully",
      data: folder,
    });
  } catch (error) {
    console.error("Create Folder Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create folder",
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
    });
  }
};


export const deleteFolder = async (req, res) => {
  try {
    const { id } = req.params;

    const folder = await Folder.findOne({
      _id: id,
      isActive: true,
    });

    if (!folder) {
      return res.status(404).json({
        success: false,
        message: "Folder not found",
      });
    }

    const technology = await Technology.findOne({
      _id: folder.technologyId,
      isActive: true,
    });

    if (!technology) {
      return res.status(404).json({
        success: false,
        message: "Technology not found",
      });
    }

    const pdfCount = await Pdf.countDocuments({
      folderId: folder._id,
    });

    if (pdfCount > 0) {
      return res.status(409).json({
        success: false,
        message: "Folder cannot be deleted because it contains PDFs",
        data: {
          pdfCount,
        },
      });
    }

    folder.isActive = false;

    await folder.save();

    return res.status(200).json({
      success: true,
      message: "Folder deleted successfully",
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