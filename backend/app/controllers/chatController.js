import { askQuestion } from "../services/rag_Service.js";
import ChatHistory from "../models/chatHistory.js";
import Question from "../models/Question.js";
import { createActivity } from "../services/activityService.js";

export const askChatQuestion = async (req, res) => {
  try {
    const {
      question,
      technologyId,
      folderId,
      topK = 5,
    } = req.body;

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const userId = req.user._id;

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

    const startTime = Date.now();

    const result = await askQuestion({
      question: question.trim(),
      userId: String(userId),
      technologyId: String(technologyId),
      folderId: String(folderId),
      topK: Number(topK) || 5,
    });

    const responseTime =
      (Date.now() - startTime) / 1000;

    const answer =
      typeof result?.answer === "string"
        ? result.answer.trim()
        : "";

    const status = answer
      ? "Answered"
      : "Pending";

    const savedQuestion = await Question.create({
      userId,
      question: question.trim(),
      answer,
      status,
      responseTime,
      technologyId,
      folderId,
    });

    await ChatHistory.create({
      userId,
      question: question.trim(),
      answer,
      technologyId,
      folderId,
      sources: Array.isArray(result?.sources)
        ? result.sources
        : [],
    });

    await createActivity({
      type: "question_asked",
      title: "Question asked",
      description: question.trim(),
      userId,
      entityId: savedQuestion._id,
      entityType: "Question",
    });

    return res.status(200).json({
      success: true,
      message: "Answer generated successfully",
      data: {
        ...result,
        answer,
        questionId: savedQuestion._id,
        status: savedQuestion.status,
        responseTime: savedQuestion.responseTime,
      },
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
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const userId = req.user._id;

    const history = await ChatHistory.find({
      userId,
    })
      .sort({
        createdAt: -1,
      })
      .lean();

    return res.status(200).json({
      success: true,
      message: "Chat history fetched successfully",
      count: history.length,
      data: history,
    });
  } catch (error) {
    console.error(
      "Get Chat History Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch chat history",
      error: error.message,
    });
  }
};

export const deleteChatHistory = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const userId = req.user._id;

    const chatResult =
      await ChatHistory.deleteMany({
        userId,
      });

    const questionResult =
      await Question.deleteMany({
        userId,
      });

    return res.status(200).json({
      success: true,
      message: "Chat history deleted successfully",
      deletedCount: chatResult.deletedCount,
      deletedQuestions:
        questionResult.deletedCount,
    });
  } catch (error) {
    console.error(
      "Delete Chat History Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete chat history",
      error: error.message,
    });
  }
};