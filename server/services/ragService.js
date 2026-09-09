const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");


const getRagUrl = () => {

    const url = process.env.RAG_URL;

    if (!url) {
        throw new Error(
            "RAG_URL is missing in server/.env"
        );
    }

    return url.replace(/\/+$/, "");
};


const indexDocument = async (
    filePath,
    originalName,
    mimeType
) => {

    if (!fs.existsSync(filePath)) {
        throw new Error(
            `File does not exist: ${filePath}`
        );
    }

    const formData = new FormData();

    formData.append(
        "file",
        fs.createReadStream(filePath),
        {
            filename: originalName,
            contentType:
                mimeType ||
                "application/octet-stream"
        }
    );

    console.log(
        "Sending document to RAG:",
        originalName
    );

    const response = await axios.post(
        `${getRagUrl()}/api/index-document`,
        formData,
        {
            headers: {
                ...formData.getHeaders()
            },

            maxContentLength: Infinity,
            maxBodyLength: Infinity,

            timeout: 300000
        }
    );

    return response.data;
};


const askQuestion = async (message) => {

    try {

        const response = await axios.post(
            `${getRagUrl()}/api/chat`,
            {
                message,
                k: 4
            },
            {
                timeout: 300000
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


const generateQuiz = async (count = 5) => {

    try {

        const response = await axios.post(
            `${getRagUrl()}/api/generate-quiz`,
            {
                count
            },
            {
                timeout: 300000
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


const generateFlashcards = async (
    count = 10
) => {

    try {

        const response = await axios.post(
            `${getRagUrl()}/api/generate-flashcards`,
            {
                count
            },
            {
                timeout: 300000
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
    generateFlashcards
};