import crypto from "crypto";
import bcrypt from "bcryptjs";
import User from "../models/auth.js";
import { sendResetPasswordEmail } from "../utils/sendEmail.js";

// ========================================
// FORGOT PASSWORD
// ========================================

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate reset token
    const resetToken = crypto
      .randomBytes(32)
      .toString("hex");

    // Token expires in 15 minutes
    const resetTokenExpires = new Date(
      Date.now() + 15 * 60 * 1000
    );

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpires;

    await user.save();

    console.log("RESET TOKEN =", resetToken);
    console.log(
      "RESET TOKEN EXPIRES =",
      resetTokenExpires
    );

    // Send reset email
    await sendResetPasswordEmail(
      user.email,
      resetToken
    );

    return res.status(200).json({
      success: true,
      message:
        "Password reset email sent successfully",
    });

  } catch (error) {
    console.error(
      "Forgot password error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ========================================
// RESET PASSWORD
// ========================================

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Reset token is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "New password is required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters",
      });
    }

    // Find user using valid token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: {
        $gt: new Date(),
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid or expired reset token",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    user.password = hashedPassword;

    // Remove reset token after successful reset
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "Password reset successfully",
    });

  } catch (error) {
    console.error(
      "Reset password error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const pdfs = await Pdf.find({ userId });

    for (const pdf of pdfs) {
      try {
        if (
          pdf.filePath &&
          fs.existsSync(pdf.filePath)
        ) {
          fs.unlinkSync(pdf.filePath);
        }
      } catch (fileError) {
        console.error(
          "PDF file delete error:",
          fileError.message
        );
      }
    }

    await Pdf.deleteMany({ userId });

    await ChatHistory.deleteMany({ userId });

    await Folder.deleteMany({ userId });

    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      success: true,
      message:
        "Account and all associated data deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Account Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete account and associated data",
      error: error.message,
    });
  }
};