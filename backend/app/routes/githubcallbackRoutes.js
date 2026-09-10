import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect:
      "http://localhost:5173/Login",
  }),
  (req, res) => {
    try {
      console.log("GitHub callback successful");

      console.log(
        "GitHub User:",
        req.user.email
      );

      console.log(
        "GitHub Role:",
        req.user.role
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

      const role =
        req.user.role === "admin"
          ? "admin"
          : "user";

      res.redirect(
        `http://localhost:5173/oauth-success?token=${token}&role=${role}`
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