import { askQuestion } from "../services/rag_service.js";

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