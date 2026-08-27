// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     session: false,
//     failureRedirect: `${process.env.FRONTEND_URL}/login`,
//   }),
//   (req, res) => {
//     const token = jwt.sign(
//       {
//         id: req.user._id,
//         email: req.user.email,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "1d",
//       }
//     );

//     res.redirect(
//       `${process.env.FRONTEND_URL}/google-success?token=${token}`
//     );
//   }
// );

import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  (req, res) => {
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

    res.json({
      message: "Google login successful",
      token,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      },
    });
  }
);