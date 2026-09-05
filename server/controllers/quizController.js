const Quiz =
  require("../models/Quiz");

const Document =
  require("../models/Document");

const ragService =
  require("../services/ragService");


const generateQuiz = async (req, res) => {
  try {
    const { documentId, count = 5 } = req.body;

    if (!documentId) {
      return res.status(400).json({
        success: false,
        message: "documentId is required",
      });
    }

    const document = await Document.findOne({
      _id: documentId,
      user: req.user._id,
      status: "ready",
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found or not ready",
      });
    }

    console.log(
      "Generating quiz for:",
      document.originalName
    );

    const generatedQuiz =
      await ragService.generateQuiz(count);

    console.log(
      "RAG GENERATED QUIZ:",
      generatedQuiz
    );

    if (!generatedQuiz) {
      return res.status(500).json({
        success: false,
        message: "AI returned empty quiz",
      });
    }

    // Make sure questions exist
    const questions =
      Array.isArray(generatedQuiz.questions)
        ? generatedQuiz.questions
        : Array.isArray(generatedQuiz)
        ? generatedQuiz
        : [];

    if (questions.length === 0) {
      return res.status(500).json({
        success: false,
        message: "AI returned no quiz questions",
      });
    }

    const quiz = await Quiz.create({
      user: req.user._id,
      document: document._id,
      title: "Study Quiz",
      questions: questions.map((question) => ({
        question: question.question || "",
        options: Array.isArray(question.options)
          ? question.options
          : [],
        answer:
          question.answer !== undefined
            ? question.answer
            : null,
        explanation:
          question.explanation || "",
      })),
      score: 0,
      total: questions.length,
      completed: false,
    });

    return res.status(201).json({
      success: true,
      quiz,
    });

  } catch (error) {
    console.error(
      "QUIZ CONTROLLER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.response?.data?.detail ||
        error.message ||
        "Failed to generate quiz",
    });
  }
};


const submitQuiz =
  async (req, res, next) => {
    try {
      const {
        quizId,
        answers,
      } = req.body;

      if (!quizId) {
        return res.status(400).json({
          success: false,
          message:
            "Quiz ID is required",
        });
      }

      if (!Array.isArray(answers)) {
        return res.status(400).json({
          success: false,
          message:
            "Answers must be an array",
        });
      }

      const quiz =
        await Quiz.findOne({
          _id: quizId,
          user: req.user._id,
        });

      if (!quiz) {
        return res.status(404).json({
          success: false,
          message:
            "Quiz not found",
        });
      }

      let score = 0;

      quiz.questions.forEach(
        (question, index) => {
          if (
            Number(answers[index]) ===
            question.answer
          ) {
            score++;
          }
        }
      );

      quiz.score = score;
      quiz.completed = true;

      await quiz.save();

      const percentage =
        quiz.total > 0
          ? Math.round(
              (score /
                quiz.total) *
                100
            )
          : 0;

      return res.status(200).json({
        success: true,
        score,
        total: quiz.total,
        percentage,
        quiz,
      });

    } catch (error) {
      next(error);
    }
  };


const getQuizzes =
  async (req, res, next) => {
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