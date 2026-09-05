const Flashcard =
  require("../models/Flashcard");

const Document =
  require("../models/Document");

const ragService =
  require("../services/ragService");

const generateFlashcards =
  async (req, res, next) => {
    try {
      const {
        documentId,
        count = 10,
      } = req.body;

      if (!documentId) {
        return res.status(400).json({
          success: false,
          message: "Document is required",
        });
      }

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

      if (document.status !== "ready") {
        return res.status(400).json({
          success: false,
          message: "Document is not ready",
        });
      }

      const cards =
        await ragService.generateFlashcards(
          Math.min(
            Math.max(Number(count), 5),
            15
          )
        );

      if (
        !cards?.cards ||
        !Array.isArray(cards.cards)
      ) {
        throw new Error(
          "Invalid flashcards returned by AI"
        );
      }

      const saved =
        await Flashcard.create({
          user: req.user._id,
          document: document._id,
          title:
            cards.title ||
            "Study Flashcards",
          cards: cards.cards,
        });

      return res.status(201).json({
        success: true,
        flashcards: saved,
      });
    } catch (error) {
      next(error);
    }
  };

const getFlashcards = async (
  req,
  res,
  next
) => {
  try {
    const flashcards =
      await Flashcard.find({
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
      flashcards,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateFlashcards,
  getFlashcards,
};