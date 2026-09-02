import User from "../models/auth.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendVerificationEmail } from "../utils/sendEmail.js";
import {
  forgotPassword,
  resetPassword,
} from "../controllers/passwordController.js";


export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check required fields

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required",
            });
        }

        if (!name) {
            return res.status(400).json({
                message: "Name is required",
            });
        }

        if (!email) {
            return res.status(400).json({
                message: "Email is required",
            });
        }

        if (!password) {
            return res.status(400).json({
                message: "Password is required",
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format",
            });
        }
        // Password validation
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message:
                    "Password must be at least 5 characters and contain uppercase, lowercase, number and special character",
            });
        }
        // Check existing user
        console.log("1. Checking existing user...");

        const existingUser = await User.findOne({ email });

        console.log("2. User check completed");



        if (existingUser) {
            return res.status(409).json({
                message: "User already exists with this email",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const verificationToken = crypto.randomBytes(32).toString("hex");

        const verificationTokenExpires = new Date(
            Date.now() + 15 * 60 * 1000
        );
        console.log("TOKEN =", verificationToken);
        console.log("TOKEN EXPIRES =", verificationTokenExpires);
        // Create user
        console.log("3. Creating user...");

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            isVerified: false,
            verificationToken,
            verificationTokenExpires,
            
        });

        console.log("SAVED TOKEN =", user.verificationToken);
        console.log("SAVED EXPIRES =", user.verificationTokenExpires);

        console.log("4. User created");

        console.log("5. Sending verification email...");

        await sendVerificationEmail(email, verificationToken);

        console.log("6. Verification email sent");

        res.status(201).json({
            message:
                "Registration successful. Please check your email to verify your account.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Register error:", error.message);

        res.status(500).json({
            message: "Server error",
        });
    }
};

// =====================================================
// DELETE ACCOUNT
// =====================================================

export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find logged-in user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete complete user document
    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      success: true,
      message: "Account and user data deleted successfully",
    });

  } catch (error) {
    console.error("Delete account error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete account",
    });
  }
};
