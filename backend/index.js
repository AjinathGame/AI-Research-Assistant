import "dotenv/config";

import express from "express";
import dotenv from "dotenv";

dotenv.config();
import cors from "cors";
import connectDB from "./app/config/connectDB.js";
import pdfRoutes from "./app/routes/pdfRoutes.js";
import chatRoutes from "./app/routes/chatRoutes.js";
import technologyRoutes from "./app/routes/technologyRoutes.js";
import folderRoutes from "./app/routes/folderRoutes.js";
import authRoutes from "./app/routes/authroutes.js";
import loginRoutes from "./app/routes/loginRoutes.js";
import verificationRoutes from "./app/routes/verificationRoutes.js";
import googleRoutes from "./app/routes/googleRoutes.js";
import googleCallbackRoutes from "./app/routes/googlecallbackRoutes.js";
import githubCallbackRoutes from "./app/routes/githubcallBackRoutes.js";
import "./app/config/passport.js";
import passport from "passport";
import "./app/config/githubPassport.js";




const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/api/pdf", pdfRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/technologies", technologyRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/auth", loginRoutes);
app.use("/api/auth",googleRoutes);
app.use("/api/auth",googleCallbackRoutes);
app.use("/api/auth", githubCallbackRoutes);
app.use("/api/auth/verify-email",verificationRoutes);


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "RAG Backend API is running",
  });
});

console.log("EMAIL_USER =", process.env.EMAIL_USER);
console.log("EMAIL_PASS exists =", !!process.env.EMAIL_PASS);
console.log("GOOGLE_CLIENT_ID =", process.env.GOOGLE_CLIENT_ID);
console.log(
  "GOOGLE_CLIENT_SECRET exists =",
  !!process.env.GOOGLE_CLIENT_SECRET
);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();