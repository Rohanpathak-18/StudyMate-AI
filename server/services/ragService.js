const axios = require("axios");

const RAG_URL =
  process.env.RAG_URL ||
  "https://studymate-rag-dycf.onrender.com";


const indexDocument = async (
  filePath
) => {
  const response =
    await axios.post(
      `${RAG_URL}/api/index-document`,
      null,
      {
        params: {
          file_path: filePath,
        },
        timeout: 300000,
      }
    );

  return response.data;
};


const askQuestion = async (
  message
) => {
  try {
    const response =
      await axios.post(
        `${RAG_URL}/api/chat`,
        {
          message,
          k: 4,
        },
        {
          timeout: 300000,
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


const generateQuiz = async (
  count = 5
) => {
  try {
    const response =
      await axios.post(
        `${RAG_URL}/api/generate-quiz`,
        {
          count,
        },
        {
          timeout: 300000,
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


const generateFlashcards =
  async (count = 10) => {
    try {
      const response =
        await axios.post(
          `${RAG_URL}/api/generate-flashcards`,
          {
            count,
          },
          {
            timeout: 300000,
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