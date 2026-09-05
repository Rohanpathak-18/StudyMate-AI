const express = require("express");

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  generateQuiz,
  submitQuiz,
  getQuizzes,
} =
  require("../controllers/quizController");


const router =
  express.Router();


router.use(
  authMiddleware
);


router.post(
  "/generate",
  generateQuiz
);


router.post(
  "/submit",
  submitQuiz
);


router.get(
  "/",
  getQuizzes
);


module.exports = router;