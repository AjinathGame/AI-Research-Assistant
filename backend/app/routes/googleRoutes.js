import express from "express";
import passport from "passport";

const router = express.Router();

// ==========================
// Google Login
// ==========================

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

// ==========================
// GitHub Login
// ==========================

router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

export default router;