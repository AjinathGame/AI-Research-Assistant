import express from "express";
import {
    askChatQuestion,
    getChatHistory,
    deleteChatHistory,
} from "../controllers/chatController.js";

const router = express.Router();

router.post("/ask", askChatQuestion);
router.get("/history", getChatHistory);
router.delete("/history", deleteChatHistory);

export default router;