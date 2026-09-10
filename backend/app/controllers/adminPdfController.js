import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import Pdf from "../models/Pdf.js";
import { deletePdf as deletePdfFromRag } from "../services/rag_Service.js";

const getUploadsDirectory = () => {
  return path.resolve(
    process.cwd(),
    "storage",
    "uploads"
  );
};

const normalizeFilename = (filename = "") => {
  return filename
    .toLowerCase()
    .trim()
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const findFileRecursively = (
  directory,
  targetFilename
) => {
  if (!fs.existsSync(directory)) {
    return null;
  }

  const items = fs.readdirSync(directory, {
    withFileTypes: true,
  });

  for (const item of items) {
    const currentPath = path.join(
      directory,
      item.name
    );

    if (item.isFile()) {
      if (
        item.name.toLowerCase() ===
        targetFilename.toLowerCase()
      ) {
        return currentPath;
      }
    }

    if (item.isDirectory()) {
      const found = findFileRecursively(
        currentPath,
        targetFilename
      );

      if (found) {
        return found;
      }
    }
  }

  return null;
};

const findFilesByOriginalName = (
  directory,
  originalName
) => {
  const matches = [];

  const normalizedOriginalName =
    normalizeFilename(originalName);

  if (!normalizedOriginalName) {
    return matches;
  }

  const searchDirectory = (currentDirectory) => {
    if (!fs.existsSync(currentDirectory)) {
      return;
    }

    const items = fs.readdirSync(
      currentDirectory,
      {
        withFileTypes: true,
      }
    );

    for (const item of items) {
      const currentPath = path.join(
        currentDirectory,
        item.name
      );

      if (item.isFile()) {
        const extension = path.extname(
          item.name
        ).toLowerCase();

        if (extension !== ".pdf") {
          continue;
        }

        const filenameWithoutExtension =
          path.basename(
            item.name,
            extension
          );

        const normalizedFilename =
          normalizeFilename(
            filenameWithoutExtension
          );

        if (
          normalizedFilename ===
            normalizedOriginalName ||
          normalizedFilename.endsWith(
            `-${normalizedOriginalName}`
          )
        ) {
          matches.push(currentPath);
        }
      }

      if (item.isDirectory()) {
        searchDirectory(currentPath);
      }
    }
  };

  searchDirectory(directory);

  return matches;
};

const resolvePdfFilePath = async (pdf) => {
  const uploadsDirectory =
    getUploadsDirectory();

  if (
    pdf.filePath &&
    fs.existsSync(pdf.filePath)
  ) {
    return path.resolve(pdf.filePath);
  }

  if (pdf.filename) {
    const exactMatch =
      findFileRecursively(
        uploadsDirectory,
        pdf.filename
      );

    if (exactMatch) {
      return path.resolve(exactMatch);
    }
  }

  if (pdf.originalName) {
    const matches =
      findFilesByOriginalName(
        uploadsDirectory,
        pdf.originalName
      );

    if (matches.length === 1) {
      return path.resolve(matches[0]);
    }

    if (matches.length > 1) {
      const pdfCreatedAt =
        pdf.createdAt
          ? new Date(pdf.createdAt).getTime()
          : 0;

      const candidates =
        matches
          .map((filePath) => {
            let modifiedAt = 0;

            try {
              modifiedAt =
                fs.statSync(
                  filePath
                ).mtimeMs;
            } catch {
              modifiedAt = 0;
            }

            return {
              filePath,
              modifiedAt,
              difference:
                pdfCreatedAt > 0
                  ? Math.abs(
                      modifiedAt -
                        pdfCreatedAt
                    )
                  : Number.MAX_SAFE_INTEGER,
            };
          })
          .sort(
            (a, b) =>
              a.difference -
              b.difference
          );

        if (
          candidates.length > 0 &&
          candidates[0].filePath
        ) {
          const best =
            candidates[0];

          const second =
            candidates[1];

          if (
            !second ||
            best.difference <
              second.difference
          ) {
            return path.resolve(
              best.filePath
            );
          }
        }
    }
  }

  return null;
};

export const getAllPdfs = async (
  req,
  res
) => {
  try {
    const now = new Date();

    const startOfMonth =
      new Date(
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
        .populate(
          "userId",
          "_id name email"
        )
        .populate(
          "technologyId",
          "_id name"
        )
        .populate(
          "folderId",
          "_id name"
        )
        .sort({
          createdAt: -1,
        })
        .lean(),

      Pdf.countDocuments(),

      Pdf.aggregate([
        {
          $group: {
            _id: null,
            total: {
              $sum: "$pages",
            },
          },
        },
      ]),

      Pdf.aggregate([
        {
          $group: {
            _id: null,
            total: {
              $sum: "$chunkCount",
            },
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
      message:
        "PDF documents fetched successfully",
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
    console.error(
      "Get All PDFs Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch PDF documents",
    });
  }
};

export const getPdfById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid PDF ID",
      });
    }

    const pdf =
      await Pdf.findById(id)
        .populate(
          "userId",
          "name email"
        )
        .populate(
          "technologyId",
          "name slug"
        )
        .populate(
          "folderId",
          "name slug"
        );

    if (!pdf) {
      return res.status(404).json({
        success: false,
        message: "PDF not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "PDF fetched successfully",
      data: pdf,
    });
  } catch (error) {
    console.error(
      "Get PDF By ID Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch PDF",
    });
  }
};

export const updatePdfStatus = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    const { status } =
      req.body || {};

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
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

    if (
      !allowedStatuses.includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Status must be uploaded, processing, processed, or failed",
      });
    }

    const pdf =
      await Pdf.findByIdAndUpdate(
        id,
        { status },
        {
          new: true,
          runValidators: true,
        }
      )
        .populate(
          "userId",
          "name email"
        )
        .populate(
          "technologyId",
          "name slug"
        )
        .populate(
          "folderId",
          "name slug"
        );

    if (!pdf) {
      return res.status(404).json({
        success: false,
        message: "PDF not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "PDF status updated successfully",
      data: pdf,
    });
  } catch (error) {
    console.error(
      "Update PDF Status Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update PDF status",
    });
  }
};

export const deletePdf = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid PDF ID",
      });
    }

    const pdf =
      await Pdf.findById(id);

    if (!pdf) {
      return res.status(404).json({
        success: false,
        message: "PDF not found",
      });
    }

    let deletedChunks = 0;

    try {
      const ragResult =
        await deletePdfFromRag({
          pdfId: id,
        });

      deletedChunks =
        ragResult?.deletedChunks || 0;
    } catch (ragError) {
      console.error(
        "Admin PDF RAG Delete Error:",
        ragError
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to delete PDF from RAG storage",
      });
    }

    const actualFilePath =
      await resolvePdfFilePath(pdf);

    if (
      actualFilePath &&
      fs.existsSync(actualFilePath)
    ) {
      fs.unlinkSync(actualFilePath);
    }

    await Pdf.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message:
        "PDF deleted successfully",
      data: {
        pdfId: id,
        filename: pdf.filename,
        originalName:
          pdf.originalName,
        deletedChunks,
      },
    });
  } catch (error) {
    console.error(
      "Admin PDF Delete Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete PDF",
    });
  }
};

export const viewPdf = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid PDF ID",
      });
    }

    const pdf =
      await Pdf.findById(id);

    if (!pdf) {
      return res.status(404).json({
        success: false,
        message: "PDF not found",
      });
    }

    console.log(
      "ADMIN VIEW PDF:",
      {
        id: pdf._id.toString(),
        filename: pdf.filename,
        originalName:
          pdf.originalName,
        storedPath: pdf.filePath,
      }
    );

    const actualFilePath =
      await resolvePdfFilePath(pdf);

    if (!actualFilePath) {
      console.error(
        "ADMIN PDF FILE NOT FOUND:",
        {
          id: pdf._id.toString(),
          filename: pdf.filename,
          originalName:
            pdf.originalName,
          storedPath: pdf.filePath,
          uploadsDirectory:
            getUploadsDirectory(),
        }
      );

      return res.status(404).json({
        success: false,
        message:
          "PDF file does not exist anywhere in storage",
        filename: pdf.filename,
        originalName:
          pdf.originalName,
      });
    }

    console.log(
      "ACTUAL PDF FOUND:",
      actualFilePath
    );

    if (
      pdf.filePath !==
      actualFilePath
    ) {
      pdf.filePath =
        actualFilePath;

      await pdf.save();

      console.log(
        "MongoDB filePath updated:",
        actualFilePath
      );
    }

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `inline; filename="${String(
        pdf.originalName ||
          pdf.filename ||
          "document.pdf"
      ).replace(/"/g, "")}"`
    );

    return res.sendFile(
      actualFilePath
    );
  } catch (error) {
    console.error(
      "ADMIN VIEW PDF ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to open PDF",
      error: error.message,
    });
  }
};