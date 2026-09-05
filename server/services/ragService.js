const axios = require("axios");

const RAG_URL =
  process.env.RAG_URL ||
  "http://127.0.0.1:8000";

const indexDocument = async (
  filePath
) => {
  console.log(
    "Sending document to RAG:",
    filePath
  );

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
};

module.exports = {
  indexDocument,
  askQuestion,
};