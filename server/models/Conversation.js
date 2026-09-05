const mongoose = require("mongoose");

const conversationSchema =
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      question: {
        type: String,
        required: true,
      },

      answer: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.models.Conversation ||
  mongoose.model(
    "Conversation",
    conversationSchema
  );