import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
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
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model(
  "Question",
  questionSchema
);

export default Question;