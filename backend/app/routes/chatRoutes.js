import express from "express";
import {
  askChatQuestion,
  getChatHistory,
  deleteChatHistory,
} from "../controllers/chatController.js";
import { protect } from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/ask", protect, askChatQuestion);
router.get("/history", protect, getChatHistory);
router.delete("/history", protect, deleteChatHistory);

export default router;