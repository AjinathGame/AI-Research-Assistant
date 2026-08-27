import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);