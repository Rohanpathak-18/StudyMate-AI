const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    front: {
      type: String,
      required: true,
    },

    back: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);


const flashcardSchema =
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      document: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Document",
        required: true,
      },

      title: {
        type: String,
        default: "Study Flashcards",
      },

      cards: {
        type: [cardSchema],
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );


module.exports =
  mongoose.model(
    "Flashcard",
    flashcardSchema
  );