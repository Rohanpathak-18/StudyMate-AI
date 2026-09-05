const Document = require("../models/Document");
const ragService = require("../services/ragService");

const chat = async (req, res, next) => {
  try {
    const {
      message,
      documentId,
    } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    if (!documentId) {
      return res.status(400).json({
        success: false,
        message: "Document is required",
      });
    }

    const document = await Document.findOne({
      _id: documentId,
      user: req.user._id,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    if (document.status !== "ready") {
      return res.status(400).json({
        success: false,
        message: "Document is not ready yet",
      });
    }

    const result =
      await ragService.askQuestion(
        message,
        documentId
      );

    return res.status(200).json({
      success: true,
      answer: result.answer,
      sources: result.sources || [],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  chat,
};