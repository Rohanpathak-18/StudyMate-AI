const axios = require("axios");

const RAG_URL =
  process.env.RAG_URL || "http://127.0.0.1:8000";


const indexDocument = async (
  filePath,
  documentId
) => {
  const response = await axios.post(
    `${RAG_URL}/api/index-document`,
    null,
    {
      params: {
        file_path: filePath,
        document_id: documentId,
      },
      timeout: 300000,
    }
  );

  return response.data;
};


const askQuestion = async (
  message,
  documentId
) => {
  const response = await axios.post(
    `${RAG_URL}/api/chat`,
    {
      message,
      document_id: documentId,
      k: 4,
    },
    {
      timeout: 300000,
    }
  );

  return response.data;
};


const generateQuiz = async (
  documentId,
  count = 5
) => {
  const response = await axios.post(
    `${RAG_URL}/api/generate-quiz`,
    {
      document_id: documentId,
      count,
    },
    {
      timeout: 300000,
    }
  );

  return response.data.quiz;
};


const generateFlashcards = async (
  documentId,
  count = 10
) => {
  const response = await axios.post(
    `${RAG_URL}/api/generate-flashcards`,
    {
      document_id: documentId,
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