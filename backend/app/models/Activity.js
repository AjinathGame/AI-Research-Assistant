import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        "user_registered",
        "document_uploaded",
        "user_login",
        "question_asked",
        "technology_added",
        "document_deleted",
      ],
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },

    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    entityType: {
      type: String,
      enum: [
        "User",
        "Pdf",
        "Question",
        "Technology",
        null,
      ],
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

activitySchema.index({ createdAt: -1 });

const Activity = mongoose.model(
  "Activity",
  activitySchema
);

export default Activity;