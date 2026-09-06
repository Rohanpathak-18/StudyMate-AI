const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const errorMiddleware =
  require("./middleware/errorMiddleware");

const authRoutes =
  require("./routes/authRoutes");

const documentRoutes =
  require("./routes/documentRoutes");

const chatRoutes =
  require("./routes/chatRoutes");

const quizRoutes =
  require("./routes/quizRoutes");

const flashcardRoutes =
  require("./routes/flashcardRoutes");

const dashboardRoutes =
  require("./routes/dashboardRoutes");


dotenv.config();


const app = express();


connectDB();


app.use(
  cors({
    origin: "https://studymate-ai-4ne6.onrender.com",
    credentials: true,
  })
);


app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);


app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "StudyMate AI server is running",
  });
});


app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/documents",
  documentRoutes
);

app.use(
  "/api/chat",
  chatRoutes
);

app.use(
  "/api/quizzes",
  quizRoutes
);

app.use(
  "/api/flashcards",
  flashcardRoutes
);


app.use(
  "/api/dashboard",
  dashboardRoutes
);


app.use(errorMiddleware);


const PORT =
  process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(
    `StudyMate AI server running on port ${PORT}`
  );
});