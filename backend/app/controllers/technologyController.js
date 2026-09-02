import Technology from "../models/Technology.js";
import Folder from "../models/Folder.js";
import Pdf from "../models/Pdf.js";

export const createTechnology = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Technology name is required",
      });
    }

    const cleanName = name.trim();

    const slug = cleanName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "Invalid technology name",
      });
    }

    const existingTechnology =
      await Technology.findOne({
        $or: [
          {
            name: {
              $regex: `^${cleanName}$`,
              $options: "i",
            },
          },
          {
            slug,
          },
        ],
      });

    if (existingTechnology) {
      return res.status(409).json({
        success: false,
        message: "Technology already exists",
      });
    }

    const technology =
      await Technology.create({
        name: cleanName,
        slug,
        description:
          description?.trim() || "",
        isActive: true,
      });

    return res.status(201).json({
      success: true,
      message:
        "Technology created successfully",
      data: technology,
    });
  } catch (error) {
    console.error(
      "Create Technology Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to create technology",
    });
  }
};

export const getTechnologies = async (
  req,
  res
) => {
  try {
    const technologies =
      await Technology.find({
        isActive: true,
      }).sort({
        name: 1,
      });

    return res.status(200).json({
      success: true,
      data: technologies,
    });
  } catch (error) {
    console.error(
      "Get Technologies Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch technologies",
    });
  }
};

export const getTechnologyById = async (
  req,
  res
) => {
  try {
    const technology =
      await Technology.findOne({
        _id: req.params.id,
        isActive: true,
      });

    if (!technology) {
      return res.status(404).json({
        success: false,
        message:
          "Technology not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: technology,
    });
  } catch (error) {
    console.error(
      "Get Technology Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch technology",
    });
  }
};

export const deleteTechnology = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const technology =
      await Technology.findOne({
        _id: id,
        isActive: true,
      });

    if (!technology) {
      return res.status(404).json({
        success: false,
        message:
          "Technology not found",
      });
    }

    const folderCount =
      await Folder.countDocuments({
        technologyId:
          technology._id,
        isActive: true,
      });

    const pdfCount =
      await Pdf.countDocuments({
        technologyId:
          technology._id,
      });

    if (
      folderCount > 0 ||
      pdfCount > 0
    ) {
      return res.status(409).json({
        success: false,
        message:
          "Technology cannot be deleted because it contains folders or PDFs",
        data: {
          folderCount,
          pdfCount,
        },
      });
    }

    technology.isActive = false;

    await technology.save();

    return res.status(200).json({
      success: true,
      message:
        "Technology deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Technology Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete technology",
    });
  }
};

export const getTechnologyBySlug = async (
  req,
  res
) => {
  try {
    const technology =
      await Technology.findOne({
        slug: req.params.slug,
        isActive: true,
      });

    if (!technology) {
      return res.status(404).json({
        success: false,
        message:
          "Technology not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: technology,
    });
  } catch (error) {
    console.error(
      "Get Technology By Slug Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch technology",
    });
  }
};