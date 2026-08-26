import express from "express";
import { config } from "dotenv";
import cors from "cors";

import connectDB from "./app/config/connectDB.js";
import pdfRoutes from "./app/routes/pdfRoutes.js";
import chatRoutes from "./app/routes/chatRoutes.js";
import technologyRoutes from "./app/routes/technologyRoutes.js";
import folderRoutes from "./app/routes/folderRoutes.js";



config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



app.use("/api/pdf", pdfRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/technologies", technologyRoutes);
app.use("/api/folders", folderRoutes);


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "RAG Backend API is running",
  });
});

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