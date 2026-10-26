const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

const normalizeUrl = (url) => {
  const value = (url || "").trim();
  if (!value) return "";
  return (/^[a-z]+:\/\//i.test(value) ? value : `http://${value}`).replace(/\/+$/, "");
};

// Render internal URLs are preferred, with the public service URL as a fallback.
// A free Render web service cannot receive private-network requests, so try the
// alternate configured URL when the first endpoint is unavailable or rate limited.
const getRagUrls = () => {
  const urls = [...new Set([normalizeUrl(process.env.RAG_INTERNAL_URL), normalizeUrl(process.env.RAG_URL)].filter(Boolean))];
  if (!urls.length) throw new Error("Set RAG_URL to the address of your running RAG service.");
  return urls;
};

const shouldTryFallback = (error) => {
  const status = error.response?.status;
  return status === 429 || status >= 500 || ["ECONNREFUSED", "ENOTFOUND", "EHOSTUNREACH", "ECONNRESET", "ETIMEDOUT"].includes(error.code);
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const postRag = async (route, payload) => {
  const urls = getRagUrls();
  let lastError;
  for (const baseUrl of urls) {
    try {
      const response = await axios.post(`${baseUrl}${route}`, payload, { timeout: 300000 });
      return response.data;
    } catch (error) {
      lastError = error;
      if (!shouldTryFallback(error)) throw error;
      console.warn(`RAG request to ${baseUrl} failed (${error.response?.status || error.code}); trying the next configured URL when available.`);
    }
  }
  throw lastError;
};

const indexDocument = async (filePath, originalName, mimeType) => {
  if (!filePath) throw new Error("File path is missing.");
  if (!fs.existsSync(filePath)) throw new Error(`File does not exist: ${filePath}`);

  const urls = getRagUrls();
  let lastError;
  for (const baseUrl of urls) {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      const formData = new FormData();
      formData.append("file", fs.createReadStream(filePath), {
        filename: originalName,
        contentType: mimeType || "application/octet-stream",
      });

      try {
        const response = await axios.post(`${baseUrl}/api/index-document`, formData, {
          headers: formData.getHeaders(),
          timeout: 300000,
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
          validateStatus: () => true,
        });
        if (response.status >= 200 && response.status < 300) return response.data;
        const error = new Error(`RAG returned HTTP ${response.status}`);
        error.response = { status: response.status, statusText: response.statusText, data: response.data, headers: response.headers };
        throw error;
      } catch (error) {
        lastError = error;
        console.error(`RAG indexing request failed for ${baseUrl}:`, error.response?.status || error.code || error.message);
        if (!shouldTryFallback(error)) throw error;

        // A brief 429 can be transient. Retry twice, honoring Retry-After when
        // present, before moving to the alternate configured RAG URL.
        if (error.response?.status === 429 && attempt < 2) {
          const retryAfter = Number(error.response.headers?.["retry-after"]);
          const delay = Number.isFinite(retryAfter) && retryAfter > 0
            ? Math.min(retryAfter * 1000, 15000)
            : 1500 * (attempt + 1);
          await wait(delay);
          continue;
        }
        break;
      }
    }
  }
  throw lastError;
};

const askQuestion = async (message) => postRag("/api/chat", { message, k: 4 });
const generateQuiz = async (count = 5) => (await postRag("/api/generate-quiz", { count })).quiz;
const generateFlashcards = async (count = 10) => (await postRag("/api/generate-flashcards", { count })).flashcards;

module.exports = { indexDocument, askQuestion, generateQuiz, generateFlashcards };
