import { askQuestion } from "../services/rag_service.js";

export const askChatQuestion = async (req, res) => {
  try {
    const {
      question,
      technology,
      topK = 5,
    } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const result = await askQuestion({
      question,
      userId: "user-001",
      technology: technology || "all",
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