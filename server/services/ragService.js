const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");


// ============================================================
// RAG BASE URL
// ============================================================

const getRagUrl = () => {

  const url =
    process.env.RAG_URL?.trim();


  if (!url) {

    throw new Error(
      "RAG_URL is not configured. Add RAG_URL to the server environment variables."
    );
  }


  return url.replace(
    /\/+$/,
    ""
  );
};


// ============================================================
// INDEX DOCUMENT
// ============================================================

const indexDocument = async (
  filePath,
  originalName,
  mimeType
) => {

  if (!filePath) {

    throw new Error(
      "RAG indexing failed: file path is missing."
    );
  }


  if (!fs.existsSync(filePath)) {

    throw new Error(
      `RAG indexing failed: file does not exist: ${filePath}`
    );
  }


  const ragUrl =
    getRagUrl();


  console.log(
    "======================================"
  );

  console.log(
    "RAG INDEXING"
  );

  console.log(
    "RAG URL:",
    ragUrl
  );

  console.log(
    "File:",
    originalName
  );

  console.log(
    "Path:",
    filePath
  );

  console.log(
    "======================================"
  );


  const formData =
    new FormData();


  formData.append(
    "file",
    fs.createReadStream(
      filePath
    ),
    {
      filename:
        originalName,

      contentType:
        mimeType ||
        "application/octet-stream",
    }
  );


  try {

    const response =
      await axios.post(
        `${ragUrl}/api/index-document`,

        formData,

        {
          headers: {
            ...formData.getHeaders(),
          },

          maxContentLength:
            Infinity,

          maxBodyLength:
            Infinity,

          timeout:
            300000,
        }
      );


    console.log(
      "RAG INDEX RESPONSE:",
      response.data
    );


    return response.data;

  } catch (error) {

    console.error(
      "======================================"
    );

    console.error(
      "RAG INDEXING ERROR"
    );

    console.error(
      "URL:",
      `${ragUrl}/api/index-document`
    );

    console.error(
      "STATUS:",
      error.response?.status
    );

    console.error(
      "RESPONSE:",
      error.response?.data
    );

    console.error(
      "MESSAGE:",
      error.message
    );

    console.error(
      "======================================"
    );


    throw error;
  }
};


// ============================================================
// CHAT
// ============================================================

const askQuestion = async (
  message
) => {

  const ragUrl =
    getRagUrl();


  try {

    const response =
      await axios.post(
        `${ragUrl}/api/chat`,

        {
          message,
          k: 4,
        },

        {
          timeout:
            300000,
        }
      );


    return response.data;

  } catch (error) {

    console.error(
      "RAG CHAT ERROR:",
      error.response?.data ||
      error.message
    );

    throw error;
  }
};


// ============================================================
// QUIZ
// ============================================================

const generateQuiz = async (
  count = 5
) => {

  const ragUrl =
    getRagUrl();


  try {

    const response =
      await axios.post(
        `${ragUrl}/api/generate-quiz`,

        {
          count,
        },

        {
          timeout:
            300000,
        }
      );


    return response.data.quiz;

  } catch (error) {

    console.error(
      "RAG QUIZ ERROR:",
      error.response?.data ||
      error.message
    );

    throw error;
  }
};


// ============================================================
// FLASHCARDS
// ============================================================

const generateFlashcards = async (
  count = 10
) => {

  const ragUrl =
    getRagUrl();


  try {

    const response =
      await axios.post(
        `${ragUrl}/api/generate-flashcards`,

        {
          count,
        },

        {
          timeout:
            300000,
        }
      );


    return response.data.flashcards;

  } catch (error) {

    console.error(
      "RAG FLASHCARD ERROR:",
      error.response?.data ||
      error.message
    );

    throw error;
  }
};


module.exports = {
  indexDocument,
  askQuestion,
  generateQuiz,
  generateFlashcards,
};