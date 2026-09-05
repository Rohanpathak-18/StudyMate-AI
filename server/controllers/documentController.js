const fs = require("fs");
const path = require("path");

const Document = require("../models/Document");
const ragService = require("../services/ragService");

const uploadDocument = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a document",
      });
    }

    const absoluteFilePath = path.resolve(req.file.path);

    console.log("=================================");
    console.log("DOCUMENT UPLOAD");
    console.log("Original:", req.file.originalname);
    console.log("Path:", absoluteFilePath);
    console.log("Exists:", fs.existsSync(absoluteFilePath));
    console.log("=================================");

    if (!fs.existsSync(absoluteFilePath)) {
      return res.status(500).json({
        success: false,
        message: "Uploaded file was not found on server",
      });
    }

    const document = await Document.create({
      user: req.user._id,
      originalName: req.file.originalname,
      filename: req.file.filename,
      mimeType: req.file.mimetype,
      size: req.file.size,
      filePath: absoluteFilePath,
      status: "processing",
    });

    try {
      console.log("Starting RAG indexing...");

      await ragService.indexDocument(absoluteFilePath, document._id.toString());

      document.status = "ready";
      await document.save();

      console.log("Document indexing completed");

      return res.status(201).json({
        success: true,
        message: "Document uploaded and indexed successfully",
        document,
      });
    } catch (ragError) {
      console.error(
        "Document indexing failed:",
        ragError.response?.data || ragError.message,
      );

      document.status = "failed";
      await document.save();

      return res.status(500).json({
        success: false,
        message: "Document uploaded but indexing failed",
        error:
          ragError.response?.data?.detail ||
          ragError.response?.data?.message ||
          ragError.message,
        document,
      });
    }
  } catch (error) {
    next(error);
  }
};

const getDocuments = async (req, res, next) => {
  try {
    const documents = await Document.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: documents.length,
      documents,
    });
  } catch (error) {
    next(error);
  }
};

const getDocument = async (req, res, next) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    return res.status(200).json({
      success: true,
      document,
    });
  } catch (error) {
    next(error);
  }
};

const deleteDocument = async (req, res, next) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    if (document.filePath && fs.existsSync(document.filePath)) {
      fs.unlinkSync(document.filePath);
    }

    await Document.findByIdAndDelete(document._id);

    return res.status(200).json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadDocument,
  getDocuments,
  getDocument,
  deleteDocument,
};
