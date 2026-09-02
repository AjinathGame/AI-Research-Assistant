import User from "../models/auth.js";
import crypto from "crypto";
import { sendVerificationEmail } from "../utils/sendEmail.js";

// ==========================================
// VERIFY EMAIL
// ==========================================
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    console.log("VERIFY TOKEN =", token);

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: {
        $gt: new Date(),
      },
    });

    if (!user) {
      console.log("Invalid or expired verification token");

      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification link",
      });
    }

    // Verify user
    user.isVerified = true;

    // Remove verification token
    user.verificationToken = null;
    user.verificationTokenExpires = null;

    await user.save();

    console.log("EMAIL VERIFIED =", user.email);

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });

  } catch (error) {
    console.error(
      "Email verification error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// ==========================================
// RESEND VERIFICATION EMAIL
// ==========================================
export const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    // Check email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Find user
    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Already verified
    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    // Generate new token
    const verificationToken = crypto
      .randomBytes(32)
      .toString("hex");

    // Token expires after 15 minutes
    const verificationTokenExpires = new Date(
      Date.now() + 15 * 60 * 1000
    );

    // Save token
    user.verificationToken = verificationToken;
    user.verificationTokenExpires =
      verificationTokenExpires;

    await user.save();

    console.log(
      "NEW VERIFICATION TOKEN =",
      verificationToken
    );

    console.log(
      "TOKEN EXPIRES =",
      verificationTokenExpires
    );

    // Send email
    await sendVerificationEmail(
      user.email,
      verificationToken
    );

    return res.status(200).json({
      success: true,
      message: "Verification email sent successfully",
    });

  } catch (error) {
    console.error(
      "Resend verification error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};