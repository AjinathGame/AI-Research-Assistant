import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

// =====================================================
// GitHub Callback
// =====================================================

router.get(
  "/github/callback",

  passport.authenticate("github", {
    session: false,
    failureRedirect:
      "http://localhost:5173/Login",
  }),

  (req, res) => {
    try {
      console.log(
        "GitHub callback successful"
      );

      console.log(
        "GitHub User:",
        req.user.email
      );

      const token = jwt.sign(
        {
          id: req.user._id,
          email: req.user.email,
        },

        process.env.JWT_SECRET,

        {
          expiresIn: "1d",
        }
      );

      console.log(
        "GitHub JWT generated successfully"
      );

      res.redirect(
        `http://localhost:5173/oauth-success?token=${token}`
      );
    } catch (error) {
      console.error(
        "GitHub JWT Error:",
        error
      );

      res.redirect(
        "http://localhost:5173/Login?error=github_failed"
      );
    }
  }
);

export default router;