const fs = require("fs");
const path = require("path");

const Document = require("../models/Document");
const ragService = require("../services/ragService");


// ============================================================
// UPLOAD DOCUMENT
// ============================================================

const uploadDocument = async (req, res, next) => {
  let document = null;

  try {
    // ----------------------------------------------------------
    // CHECK FILE
    // ----------------------------------------------------------

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a document",
      });
    }

    const absoluteFilePath = path.resolve(req.file.path);

    console.log("");
    console.log("======================================");
    console.log("DOCUMENT UPLOAD");
    console.log("======================================");
    console.log("Original:", req.file.originalname);
    console.log("Filename:", req.file.filename);
    console.log("MIME:", req.file.mimetype);
    console.log("Size:", req.file.size);
    console.log("Path:", absoluteFilePath);
    console.log(
      "Exists:",
      fs.existsSync(absoluteFilePath)
    );
    console.log("User:", req.user._id);
    console.log("======================================");
    console.log("");


    // ----------------------------------------------------------
    // CHECK FILE EXISTS
    // ----------------------------------------------------------

    if (!fs.existsSync(absoluteFilePath)) {
      return res.status(500).json({
        success: false,
        message: "Uploaded file was not found on server",
      });
    }


    // ----------------------------------------------------------
    // CREATE DATABASE RECORD
    // ----------------------------------------------------------

    document = await Document.create({
      user: req.user._id,

      originalName:
        req.file.originalname,

      filename:
        req.file.filename,

      mimeType:
        req.file.mimetype,

      size:
        req.file.size,

      filePath:
        absoluteFilePath,

      status:
        "processing",
    });


    console.log(
      "Document DB record created:",
      document._id
    );


    // ----------------------------------------------------------
    // SEND FILE TO RAG
    // ----------------------------------------------------------

    try {
      console.log(
        "Starting RAG indexing..."
      );

      const ragResult =
        await ragService.indexDocument(
          absoluteFilePath,
          req.file.originalname,
          req.file.mimetype
        );


      // --------------------------------------------------------
      // RAG SUCCESS
      // --------------------------------------------------------

      document.status = "ready";

      await document.save();

      console.log(
        "RAG indexing completed successfully."
      );


      return res.status(201).json({
        success: true,

        message:
          "Document uploaded and indexed successfully",

        document,

        rag: ragResult,
      });


    } catch (ragError) {

      // --------------------------------------------------------
      // RAG ERROR
      // --------------------------------------------------------

      console.error("");
      console.error(
        "======================================"
      );
      console.error(
        "RAG INDEXING FAILED"
      );
      console.error(
        "======================================"
      );

      console.error(
        "Message:",
        ragError.message
      );

      console.error(
        "Status:",
        ragError.response?.status
      );

      console.error(
        "Status Text:",
        ragError.response?.statusText
      );

      console.error(
        "Response:",
        ragError.response?.data
      );

      console.error(
        "Headers:",
        ragError.response?.headers
      );

      console.error(
        "======================================"
      );
      console.error("");


      // --------------------------------------------------------
      // UPDATE DOCUMENT STATUS
      // --------------------------------------------------------

      document.status = "failed";

      await document.save();


      // --------------------------------------------------------
      // GET ACTUAL RAG ERROR
      // --------------------------------------------------------

      const ragStatus =
        ragError.response?.status || 500;


      const ragResponse =
        ragError.response?.data;


      let ragMessage =
        "RAG indexing failed";


      if (
        typeof ragResponse === "string"
      ) {
        ragMessage =
          ragResponse;
      } else if (
        ragResponse?.detail
      ) {
        ragMessage =
          ragResponse.detail;
      } else if (
        ragResponse?.message
      ) {
        ragMessage =
          ragResponse.message;
      } else if (
        ragResponse?.error
      ) {
        ragMessage =
          ragResponse.error;
      } else if (
        ragError.message
      ) {
        ragMessage =
          ragError.message;
      }


      // --------------------------------------------------------
      // RETURN ACTUAL STATUS
      // --------------------------------------------------------

      return res.status(ragStatus).json({

        success: false,

        message:
          "Document uploaded but RAG indexing failed",

        error:
          ragMessage,

        ragStatus:

          ragStatus,

        ragResponse:

          ragResponse || null,

        document,
      });
    }


  } catch (error) {

    console.error("");
    console.error(
      "======================================"
    );
    console.error(
      "DOCUMENT UPLOAD CONTROLLER ERROR"
    );
    console.error(
      "======================================"
    );
    console.error(error);
    console.error(
      "======================================"
    );
    console.error("");


    // ----------------------------------------------------------
    // MARK DOCUMENT FAILED
    // ----------------------------------------------------------

    if (document) {
      try {

        document.status = "failed";

        await document.save();

      } catch (saveError) {

        console.error(
          "Failed to update document status:",
          saveError
        );
      }
    }


    next(error);
  }
};


// ============================================================
// GET ALL DOCUMENTS
// ============================================================

const getDocuments = async (req, res, next) => {
  try {

    const documents =
      await Document.find({
        user: req.user._id,
      }).sort({
        createdAt: -1,
      });


    return res.status(200).json({

      success: true,

      count:
        documents.length,

      documents,
    });

  } catch (error) {

    next(error);
  }
};


// ============================================================
// GET SINGLE DOCUMENT
// ============================================================

const getDocument = async (req, res, next) => {
  try {

    const document =
      await Document.findOne({
        _id: req.params.id,

        user: req.user._id,
      });


    if (!document) {

      return res.status(404).json({

        success: false,

        message:
          "Document not found",
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


// ============================================================
// DELETE DOCUMENT
// ============================================================

const deleteDocument = async (req, res, next) => {
  try {

    const document =
      await Document.findOne({

        _id:
          req.params.id,

        user:
          req.user._id,
      });


    if (!document) {

      return res.status(404).json({

        success: false,

        message:
          "Document not found",
      });
    }


    // ----------------------------------------------------------
    // DELETE PHYSICAL FILE
    // ----------------------------------------------------------

    if (
      document.filePath &&
      fs.existsSync(
        document.filePath
      )
    ) {

      fs.unlinkSync(
        document.filePath
      );
    }


    // ----------------------------------------------------------
    // DELETE DATABASE RECORD
    // ----------------------------------------------------------

    await document.deleteOne();


    return res.status(200).json({

      success: true,

      message:
        "Document deleted successfully",
    });

  } catch (error) {

    next(error);
  }
};


// ============================================================
// EXPORTS
// ============================================================

module.exports = {
  uploadDocument,
  getDocuments,
  getDocument,
  deleteDocument,
};