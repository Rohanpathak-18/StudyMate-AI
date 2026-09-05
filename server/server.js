const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const errorMiddleware = require("./middleware/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
const documentRoutes = require("./routes/documentRoutes");
const chatRoutes = require("./routes/chatRoutes");
const quizRoutes = require("./routes/quizRoutes");
const flashcardRoutes = require("./routes/flashcardRoutes");

dotenv.config();

const app = express();

// Database
connectDB();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "StudyMate AI server is running",
  });
});

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/documents", documentRoutes);
app.use("/api/chat", chatRoutes);

app.use("/api/quizzes", quizRoutes);
app.use("/api/flashcards", flashcardRoutes);

// Error handler
app.use(errorMiddleware);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`StudyMate AI server running on port ${PORT}`);
});