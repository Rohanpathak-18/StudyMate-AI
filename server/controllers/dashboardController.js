const Document = require("../models/Document");
const Conversation = require("../models/Conversation");
const Quiz = require("../models/Quiz");
const Flashcard = require("../models/Flashcard");

const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const [
      documents,
      conversations,
      quizzes,
      flashcards,
    ] = await Promise.all([
      Document.countDocuments({
        user: userId,
      }),

      Conversation.countDocuments({
        user: userId,
      }),

      Quiz.countDocuments({
        user: userId,
      }),

      Flashcard.countDocuments({
        user: userId,
      }),
    ]);

    return res.json({
      success: true,
      stats: {
        documents,
        conversations,
        quizzes,
        flashcards,
      },
    });
  } catch (error) {
    console.error(
      "DASHBOARD STATS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to load dashboard stats",
    });
  }
};

module.exports = {
  getDashboardStats,
};