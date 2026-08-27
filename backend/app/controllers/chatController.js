import { askQuestion } from "../services/rag_service.js";
import ChatHistory from "../models/chatHistory.js";

export const askChatQuestion = async (req, res) => {
  try {
    const {
      question,
      technologyId,
      folderId,
      topK = 5,
    } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    if (!technologyId) {
      return res.status(400).json({
        success: false,
        message: "Technology is required",
      });
    }

    if (!folderId) {
      return res.status(400).json({
        success: false,
        message: "Folder is required",
      });
    }

    const result = await askQuestion({
      question,
      userId: "user-001",
      technologyId,
      folderId,
      topK,
    });

    await ChatHistory.create({
      userId: "user-001",
      question,
      answer: result.answer,
      technologyId,
      folderId,
      sources: result.sources || [],
    });

    return res.status(200).json({
      success: true,
      message: "Answer generated successfully",
      data: result,
    });

  } catch (error) {
    console.error("Chat Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate answer",
      error: error.message,
    });
  }
};

export const getChatHistory = async (req, res) => {
  try {
    const userId = "user-001";

    const history = await ChatHistory.find({ userId })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Chat history fetched successfully",
      count: history.length,
      data: history,
    });

  } catch (error) {
    console.error("Get Chat History Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch chat history",
      error: error.message,
    });
  }
};

export const deleteChatHistory = async (req, res) => {
  try {
    const userId = "user-001";

    const result = await ChatHistory.deleteMany({ userId });

    return res.status(200).json({
      success: true,
      message: "Chat history deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Delete Chat History Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete chat history",
      error: error.message,
    });
  }
};