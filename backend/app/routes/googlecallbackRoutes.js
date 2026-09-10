import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect:
      "http://localhost:5173/Login",
  }),
  (req, res) => {
    try {
      console.log(
        "Google Login Successful"
      );

      console.log(
        "Google User:",
        req.user.email
      );

      console.log(
        "Google Role:",
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
        "Google JWT generated successfully"
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
        "Google JWT Error:",
        error
      );

      res.redirect(
        "http://localhost:5173/Login?error=oauth_failed"
      );
    }
  }
);

export default router;