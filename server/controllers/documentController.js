const fs = require("fs");
const path = require("path");

const Document = require("../models/Document");
const ragService = require("../services/ragService");


// ============================================================
// UPLOAD DOCUMENT
// ============================================================

const uploadDocument = async (
  req,
  res,
  next
) => {

  let document = null;

  try {

    // ----------------------------------------------------------
    // CHECK FILE
    // ----------------------------------------------------------

    if (!req.file) {

      return res.status(400).json({
        success: false,
        message:
          "Please upload a document",
      });
    }


    const absoluteFilePath =
      path.resolve(
        req.file.path
      );


    console.log(
      "\n======================================"
    );

    console.log(
      "DOCUMENT UPLOAD"
    );

    console.log(
      "Original:",
      req.file.originalname
    );

    console.log(
      "Filename:",
      req.file.filename
    );

    console.log(
      "MIME:",
      req.file.mimetype
    );

    console.log(
      "Size:",
      req.file.size
    );

    console.log(
      "Path:",
      absoluteFilePath
    );

    console.log(
      "Exists:",
      fs.existsSync(
        absoluteFilePath
      )
    );

    console.log(
      "User:",
      req.user._id
    );

    console.log(
      "======================================\n"
    );


    // ----------------------------------------------------------
    // CHECK FILE EXISTS
    // ----------------------------------------------------------

    if (
      !fs.existsSync(
        absoluteFilePath
      )
    ) {

      return res.status(500).json({
        success: false,
        message:
          "Uploaded file was not found on server",
      });
    }


    // ----------------------------------------------------------
    // CREATE DATABASE RECORD
    // ----------------------------------------------------------

    document =
      await Document.create({

        user:
          req.user._id,

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
      // SUCCESS
      // --------------------------------------------------------

      document.status =
        "ready";

      await document.save();


      console.log(
        "RAG indexing completed successfully."
      );


      return res.status(201).json({

        success: true,

        message:
          "Document uploaded and indexed successfully",

        document,

        rag:
          ragResult,
      });


    } catch (ragError) {

      console.error(
        "\n======================================"
      );

      console.error(
        "RAG INDEXING FAILED"
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
        "Response:",
        ragError.response?.data
      );

      console.error(
        "======================================\n"
      );


      document.status =
        "failed";

      await document.save();


      const ragMessage =
        ragError.response?.data?.detail ||
        ragError.response?.data?.message ||
        ragError.response?.data?.error ||
        ragError.message ||
        "RAG indexing failed";


      return res.status(502).json({

        success: false,

        message:
          "Document uploaded but RAG indexing failed",

        error:
          ragMessage,

        document,

      });
    }


  } catch (error) {

    console.error(
      "DOCUMENT UPLOAD CONTROLLER ERROR:",
      error
    );


    // If a document record was created
    // but another unexpected error happened.
    if (document) {

      try {

        document.status =
          "failed";

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

const getDocuments = async (
  req,
  res,
  next
) => {

  try {

    const documents =
      await Document.find({
        user:
          req.user._id,
      }).sort({
        createdAt:
          -1,
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

const getDocument = async (
  req,
  res,
  next
) => {

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

const deleteDocument = async (
  req,
  res,
  next
) => {

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


    // Delete physical file if it exists.
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


module.exports = {
  uploadDocument,
  getDocuments,
  getDocument,
  deleteDocument,
};