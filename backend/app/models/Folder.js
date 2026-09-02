import mongoose from "mongoose";

const folderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    technologyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Technology",
      required: true,
      index: true,
    },

    parentFolderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      default: null,
      index: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

folderSchema.index(
  {
    technologyId: 1,
    parentFolderId: 1,
    slug: 1,
  },
  {
    unique: true,
  }
);

const Folder = mongoose.model("Folder", folderSchema);

export default Folder;