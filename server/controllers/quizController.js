const Quiz = require("../models/Quiz");
const Document = require("../models/Document");
const ragService = require("../services/ragService");


const generateQuiz = async (
  req,
  res,
  next
) => {
  try {
    const {
      documentId,
      count = 5,
    } = req.body;

    const document =
      await Document.findOne({
        _id: documentId,
        user: req.user._id,
      });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    const quiz =
      await ragService.generateQuiz(
        documentId,
        Math.min(Math.max(count, 3), 15)
      );

    const savedQuiz =
      await Quiz.create({
        user: req.user._id,
        document: document._id,
        title:
          quiz.title || "Study Quiz",
        questions: quiz.questions,
        total: quiz.questions.length,
      });

    return res.status(201).json({
      success: true,
      quiz: savedQuiz,
    });
  } catch (error) {
    next(error);
  }
};


const submitQuiz = async (
  req,
  res,
  next
) => {
  try {
    const {
      quizId,
      answers,
    } = req.body;

    const quiz =
      await Quiz.findOne({
        _id: quizId,
        user: req.user._id,
      });

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    if (!Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: "Answers must be an array",
      });
    }

    let score = 0;

    quiz.questions.forEach(
      (question, index) => {
        if (
          Number(answers[index]) ===
          question.answer
        ) {
          score += 1;
        }
      }
    );

    quiz.score = score;
    quiz.completed = true;

    await quiz.save();

    return res.status(200).json({
      success: true,
      score,
      total: quiz.total,
      percentage:
        quiz.total === 0
          ? 0
          : Math.round(
              (score / quiz.total) * 100
            ),
      quiz,
    });
  } catch (error) {
    next(error);
  }
};


const getQuizzes = async (
  req,
  res,
  next
) => {
  try {
    const quizzes =
      await Quiz.find({
        user: req.user._id,
      })
        .populate(
          "document",
          "originalName"
        )
        .sort({
          createdAt: -1,
        });

    return res.status(200).json({
      success: true,
      quizzes,
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  generateQuiz,
  submitQuiz,
  getQuizzes,
};