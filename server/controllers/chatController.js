const ragService = require("../services/ragService");
const Conversation = require("../models/Conversation");

const askQuestion = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const result = await ragService.askQuestion(
      message.trim()
    );

    const conversation =
      await Conversation.create({
        user: req.user._id,
        question: message.trim(),
        answer: result.answer,
      });

    return res.status(200).json({
      success: true,
      answer: result.answer,
      sources: result.sources || [],
      conversation,
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
        error.message ||
        "Failed to process AI request",
    });
  }
};

module.exports = {
  askQuestion,
};