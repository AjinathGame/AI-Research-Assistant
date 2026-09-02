import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
      index: true,
    },

    filename: {
      type: String,
      required: true,
      trim: true,
    },

    originalName: {
      type: String,
      required: true,
      trim: true,
    },

    filePath: {
      type: String,
      required: true,
      trim: true,
    },

    technologyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Technology",
      required: true,
      index: true,
    },

    folderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      required: true,
      index: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },

    pages: {
      type: Number,
      default: 0,
    },

    chunkCount: {
      type: Number,
      default: 0,
    },

    visibility: {
      type: String,
      enum: ["Private", "Team", "Public"],
      default: "Private",
      index: true,
    },

    status: {
      type: String,
      enum: [
        "uploaded",
        "processing",
        "processed",
        "failed",
      ],
      default: "uploaded",
    },
  },
  {
    timestamps: true,
  }
);

pdfSchema.index({
  technologyId: 1,
  folderId: 1,
});

const Pdf = mongoose.model("Pdf", pdfSchema);

export default Pdf;