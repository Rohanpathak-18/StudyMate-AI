const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

const getRagUrl = () => {
  const url = process.env.RAG_URL?.trim();

  if (!url) {
    throw new Error(
      "RAG_URL is missing from the server environment variables."
    );
  }

  return url.replace(/\/+$/, "");
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
    throw new Error("File path is missing.");
  }

  if (!fs.existsSync(filePath)) {
    throw new Error(
      `File does not exist: ${filePath}`
    );
  }

  const ragUrl = getRagUrl();

  const endpoint =
    `${ragUrl}/api/index-document`;

  console.log("");
  console.log("========================================");
  console.log("STUDYMATE RAG DEBUG");
  console.log("========================================");
  console.log("RAG_URL:", ragUrl);
  console.log("Endpoint:", endpoint);
  console.log("File:", originalName);
  console.log("MIME:", mimeType);
  console.log("File path:", filePath);
  console.log(
    "File exists:",
    fs.existsSync(filePath)
  );
  console.log("========================================");
  console.log("");


  const formData = new FormData();

  formData.append(
    "file",
    fs.createReadStream(filePath),
    {
      filename: originalName,
      contentType:
        mimeType ||
        "application/octet-stream",
    }
  );


  try {
    const response = await axios.post(
      endpoint,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },

        timeout: 300000,

        maxContentLength: Infinity,

        maxBodyLength: Infinity,

        validateStatus: () => true,
      }
    );


    console.log("");
    console.log("========================================");
    console.log("RAG RESPONSE");
    console.log("========================================");
    console.log(
      "Status:",
      response.status
    );
    console.log(
      "Status text:",
      response.statusText
    );
    console.log(
      "Response data:",
      response.data
    );
    console.log(
      "Response headers:",
      response.headers
    );
    console.log("========================================");
    console.log("");


    // --------------------------------------------------------
    // SUCCESS
    // --------------------------------------------------------

    if (
      response.status >= 200 &&
      response.status < 300
    ) {
      return response.data;
    }


    // --------------------------------------------------------
    // RAG RETURNED AN ERROR
    // --------------------------------------------------------

    const error = new Error(
      `RAG returned HTTP ${response.status}`
    );

    error.response = {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
      headers: response.headers,
    };

    throw error;

  } catch (error) {

    console.error("");
    console.error(
      "========================================"
    );
    console.error(
      "RAG INDEXING FAILED"
    );
    console.error(
      "========================================"
    );
    console.error(
      "Endpoint:",
      endpoint
    );
    console.error(
      "Error message:",
      error.message
    );
    console.error(
      "Error code:",
      error.code
    );
    console.error(
      "HTTP status:",
      error.response?.status
    );
    console.error(
      "Response body:",
      error.response?.data
    );
    console.error(
      "Response headers:",
      error.response?.headers
    );
    console.error(
      "========================================"
    );
    console.error("");

    throw error;
  }
};


// ============================================================
// CHAT
// ============================================================

const askQuestion = async (message) => {
  const ragUrl = getRagUrl();

  const response = await axios.post(
    `${ragUrl}/api/chat`,
    {
      message,
      k: 4,
    },
    {
      timeout: 300000,
    }
  );

  return response.data;
};


// ============================================================
// QUIZ
// ============================================================

const generateQuiz = async (count = 5) => {
  const ragUrl = getRagUrl();

  const response = await axios.post(
    `${ragUrl}/api/generate-quiz`,
    {
      count,
    },
    {
      timeout: 300000,
    }
  );

  return response.data.quiz;
};


// ============================================================
// FLASHCARDS
// ============================================================

const generateFlashcards = async (count = 10) => {
  const ragUrl = getRagUrl();

  const response = await axios.post(
    `${ragUrl}/api/generate-flashcards`,
    {
      count,
    },
    {
      timeout: 300000,
    }
  );

  return response.data.flashcards;
};


module.exports = {
  indexDocument,
  askQuestion,
  generateQuiz,
  generateFlashcards,
};