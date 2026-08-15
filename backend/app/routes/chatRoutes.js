import express from "express";
import { askChatQuestion } from "../controllers/chatController.js";

const router = express.Router();

router.post("/ask", askChatQuestion);

export default router;