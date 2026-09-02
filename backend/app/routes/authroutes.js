import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

import { loginUser } from "../controllers/loginController.js";
import { protect } from "../middleware/authMiddleware.js";
import { registerUser } from "../controllers/authcontrollers.js";

import {
  forgotPassword,
  resetPassword,
  deleteAccount,
} from "../controllers/passwordController.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

router.delete(
  "/delete-account",
  protect,
  deleteAccount
);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

router.post(
  "/logout",
  protect,
  (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  }
);

router.get(
  "/profile",
  protect,
  (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Protected API accessed successfully",
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      },
    });
  }
);

export default router;