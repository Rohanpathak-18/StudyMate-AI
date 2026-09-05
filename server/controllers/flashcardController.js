const Flashcard =
  require("../models/Flashcard");

const Document =
  require("../models/Document");

const ragService =
  require("../services/ragService");


const generateFlashcards = async (
  req,
  res,
  next
) => {
  try {
    const {
      documentId,
      count = 10,
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

    const cards =
      await ragService.generateFlashcards(
        documentId,
        Math.min(
          Math.max(count, 3),
          20
        )
      );

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