import express from "express";
import { loginUser } from "../controllers/loginController.js";
import { protect } from "../middleware/authMiddleware.js";
import { registerUser } from "../controllers/authcontrollers.js";

const router = express.Router();

// Register
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected profile
router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    message: "Protected API accessed successfully",
    user: req.user,
  });
});

export default router;