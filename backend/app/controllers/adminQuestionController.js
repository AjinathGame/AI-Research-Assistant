import mongoose from "mongoose";
import Question from "../models/Question.js";

export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate("userId", "_id name email")
      .populate("technologyId", "name slug")
      .populate("folderId", "name slug")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Questions fetched successfully",
      data: questions,
    });
  } catch (error) {
    console.error("Get All Questions Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch questions",
    });
  }
};

export const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid question ID",
      });
    }

    const question = await Question.findById(id)
      .populate("userId", "_id name email")
      .populate("technologyId", "_id name slug")
      .populate("folderId", "_id name slug")
      .lean();

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Question fetched successfully",
      data: {
        question,
      },
    });
  } catch (error) {
    console.error("Get Question By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch question",
      error: error.message,
    });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid question ID",
      });
    }

    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    await Question.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Question deleted successfully",
      data: {
        questionId: id,
      },
    });
  } catch (error) {
    console.error("Delete Question Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete question",
    });
  }
};