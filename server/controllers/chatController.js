const ragService = require("../services/ragService");

const chat = async (req, res, next) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const result =
      await ragService.askQuestion(
        message.trim()
      );

    return res.status(200).json({
      success: true,
      answer:
        result.answer ||
        "I could not generate an answer.",
      sources: result.sources || [],
    });
  } catch (error) {
    console.error(
      "CHAT CONTROLLER ERROR:",
      error.response?.data ||
        error.message
    );

    return res.status(500).json({
      success: false,
      message:
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message ||
        "AI Tutor failed",
    });
  }
};

module.exports = {
  chat,
};