import mongoose from "mongoose";
import Technology from "../models/Technology.js";
import Pdf from "../models/Pdf.js";
import Question from "../models/Question.js";
import Folder from "../models/Folder.js";

export const getAllTechnologies = async (req, res) => {
  try {
    const technologies = await Technology.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .lean();

    const technologyIds = technologies.map(
      (technology) => technology._id
    );

    const [
      totalPdfs,
      totalPages,
      totalChunks,
      totalQuestions,
    ] = await Promise.all([
      Pdf.countDocuments({
        technologyId: { $in: technologyIds },
      }),

      Pdf.aggregate([
        {
          $match: {
            technologyId: { $in: technologyIds },
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: {
                $ifNull: ["$pages", 0],
              },
            },
          },
        },
      ]),

      Pdf.aggregate([
        {
          $match: {
            technologyId: { $in: technologyIds },
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: {
                $ifNull: ["$chunkCount", 0],
              },
            },
          },
        },
      ]),

      Question.countDocuments({
        technologyId: { $in: technologyIds },
      }),
    ]);

    const pagesCount =
      totalPages.length > 0
        ? totalPages[0].total
        : 0;

    const chunksCount =
      totalChunks.length > 0
        ? totalChunks[0].total
        : 0;

    const now = new Date();

    const monthStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    const newThisMonth = await Technology.countDocuments({
      createdAt: {
        $gte: monthStart,
      },
    });

    const activeTechnologies =
      technologies.filter(
        (technology) =>
          technology.isActive !== false
      ).length;

    const inactiveTechnologies =
      technologies.filter(
        (technology) =>
          technology.isActive === false
      ).length;

    return res.status(200).json({
      success: true,
      message: "Technologies fetched successfully",

      count: technologies.length,

      statistics: {
        totalTechnologies: technologies.length,
        activeTechnologies,
        inactiveTechnologies,
        newThisMonth,
        totalPdfs,
        totalPages: pagesCount,
        totalChunks: chunksCount,
        totalQuestions,
      },

      data: technologies,
    });
  } catch (error) {
    console.error(
      "Get All Technologies Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch technologies",
    });
  }
};

export const getTechnologyById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid technology ID",
      });
    }

    const technology = await Technology.findById(id)
      .populate("userId", "name email")
      .lean();

    if (!technology) {
      return res.status(404).json({
        success: false,
        message: "Technology not found",
      });
    }

    const [
      totalPdfs,
      totalPages,
      totalChunks,
      totalQuestions,
    ] = await Promise.all([
      Pdf.countDocuments({
        technologyId: technology._id,
      }),

      Pdf.aggregate([
        {
          $match: {
            technologyId: technology._id,
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: {
                $ifNull: ["$pages", 0],
              },
            },
          },
        },
      ]),

      Pdf.aggregate([
        {
          $match: {
            technologyId: technology._id,
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: {
                $ifNull: ["$chunkCount", 0],
              },
            },
          },
        },
      ]),

      Question.countDocuments({
        technologyId: technology._id,
      }),
    ]);

    const pagesCount =
      totalPages.length > 0
        ? totalPages[0].total
        : 0;

    const chunksCount =
      totalChunks.length > 0
        ? totalChunks[0].total
        : 0;

    const totalItems =
      totalPdfs +
      pagesCount +
      chunksCount +
      totalQuestions;

    let folders = [];

    if (Folder) {
      folders = await Folder.find({
        technologyId: technology._id,
      })
        .sort({ createdAt: 1 })
        .lean();

      folders = await Promise.all(
        folders.map(async (folder, index) => {
          const [
            pdfs,
            pages,
            chunks,
            questions,
          ] = await Promise.all([
            Pdf.countDocuments({
              folderId: folder._id,
            }),

            Pdf.aggregate([
              {
                $match: {
                  folderId: folder._id,
                },
              },
              {
                $group: {
                  _id: null,
                  total: {
                    $sum: {
                      $ifNull: ["$pages", 0],
                    },
                  },
                },
              },
            ]),

            Pdf.aggregate([
              {
                $match: {
                  folderId: folder._id,
                },
              },
              {
                $group: {
                  _id: null,
                  total: {
                    $sum: {
                      $ifNull: ["$chunkCount", 0],
                    },
                  },
                },
              },
            ]),

            Question.countDocuments({
              folderId: folder._id,
            }),
          ]);

          return {
            ...folder,
            id: index + 1,
            pdfs,
            pages:
              pages.length > 0
                ? pages[0].total
                : 0,
            chunks:
              chunks.length > 0
                ? chunks[0].total
                : 0,
            questions,
            status:
              folder.isActive === false
                ? "Inactive"
                : "Active",
          };
        })
      );
    }

    return res.status(200).json({
      success: true,
      message:
        "Technology details fetched successfully",

      data: {
        technology,

        statistics: {
          totalPdfs,
          totalPages: pagesCount,
          totalChunks: chunksCount,
          totalQuestions,
          totalItems,
        },

        folders,
      },
    });
  } catch (error) {
    console.error(
      "Get Technology By ID Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch technology details",
    });
  }
};

export const updateTechnologyStatus = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body || {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid technology ID",
      });
    }

    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        success: false,
        message:
          "isActive must be true or false",
      });
    }

    const technology =
      await Technology.findById(id);

    if (!technology) {
      return res.status(404).json({
        success: false,
        message: "Technology not found",
      });
    }

    technology.isActive = isActive;

    await technology.save();

    return res.status(200).json({
      success: true,
      message: isActive
        ? "Technology activated successfully"
        : "Technology deactivated successfully",

      data: {
        _id: technology._id,
        name: technology.name,
        slug: technology.slug,
        isActive: technology.isActive,
      },
    });
  } catch (error) {
    console.error(
      "Update Technology Status Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update technology status",
    });
  }
};

export const deleteTechnology = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid technology ID",
      });
    }

    const technology =
      await Technology.findById(id);

    if (!technology) {
      return res.status(404).json({
        success: false,
        message: "Technology not found",
      });
    }

    await Technology.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Technology deleted successfully",

      data: {
        _id: technology._id,
        name: technology.name,
        slug: technology.slug,
      },
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