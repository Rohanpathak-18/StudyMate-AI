const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    originalName: {
      type: String,
      required: true,
      trim: true,
    },

    filename: {
      type: String,
      required: true,
    },

    mimeType: {
      type: String,
      required: true,
    },

    size: {
      type: Number,
      required: true,
    },

    filePath: {
      type: String,
      default: "",
    },

    fileData: {
      type: Buffer,
      select: false,
    },

    status: {
      type: String,
      enum: ["uploaded", "processing", "ready", "failed"],
      default: "uploaded",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (document, result) => {
        delete result.fileData;
        return result;
      },
    },
  }
);

module.exports = mongoose.model("Document", documentSchema);
