import mongoose from "mongoose";
import ChatHistory from "../models/chatHistory.js";

export const getAllChatHistory = async (req, res) => {
  try {
    const history = await ChatHistory.find()
      .populate("technologyId", "name slug")
      .populate("folderId", "name slug")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Chat history fetched successfully",
      data: history,
    });
  } catch (error) {
    console.error("Get All Chat History Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch chat history",
    });
  }
};

export const getChatHistoryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid chat history ID",
      });
    }

    const history = await ChatHistory.findById(id)
      .populate("technologyId", "name slug")
      .populate("folderId", "name slug");

    if (!history) {
      return res.status(404).json({
        success: false,
        message: "Chat history not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Chat history fetched successfully",
      data: history,
    });
  } catch (error) {
    console.error("Get Chat History By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch chat history",
    });
  }
};

export const deleteChatHistory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid chat history ID",
      });
    }

    const history = await ChatHistory.findById(id);

    if (!history) {
      return res.status(404).json({
        success: false,
        message: "Chat history not found",
      });
    }

    await ChatHistory.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Chat history deleted successfully",
      data: {
        chatHistoryId: id,
      },
    });
  } catch (error) {
    console.error("Delete Chat History Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete chat history",
    });
  }
};