import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // =========================
    // Basic User Information
    // =========================
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // =========================
    // Google Authentication
    // =========================
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },

    // =========================
    // GitHub Authentication
    // =========================
    githubId: {
      type: String,
      unique: true,
      sparse: true,
    },

    // =========================
    // Normal Email/Password
    // =========================
    password: {
      type: String,
      minlength: 6,
      default: null,
    },

    // =========================
    // Authentication Provider
    // =========================
    authProvider: {
      type: String,
      enum: ["local", "google", "github"],
      default: "local",
    },

    // Google / GitHub Provider ID
    providerId: {
      type: String,
      default: null,
    },

    // =========================
    // Email Verification
    // =========================
    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type: String,
      default: null,
    },

    verificationTokenExpires: {
      type: Date,
      default: null,
    },

    // =========================
    // Forgot Password
    // =========================
    resetPasswordToken: {
      type: String,
      default: null,
    },

    resetPasswordExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;