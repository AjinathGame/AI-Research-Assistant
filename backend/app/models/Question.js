import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    question: {
      type: String,
      required: true,
      trim: true,
    },

    technologyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Technology",
      required: false,
    },

    folderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      required: false,
    },
    answer: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Pending", "Answered"],
      default: "Pending",
    },

    responseTime: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;