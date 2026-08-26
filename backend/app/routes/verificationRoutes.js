import express from "express";

import {
  verifyEmail,
  resendVerificationEmail,
} from "../controllers/verificationController.js";

const router = express.Router();

router.post("/resend", resendVerificationEmail);

router.get("/:token", verifyEmail);

export default router;