import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },

    originalName: {
      type: String,
      required: true,
    },

    filePath: {
      type: String,
      required: true,
    },

    technology: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["uploaded", "processing", "processed", "failed"],
      default: "uploaded"
    }
  },
  {
    timestamps: true,
  }
);

const Pdf = mongoose.model("Pdf", pdfSchema);

export default Pdf;