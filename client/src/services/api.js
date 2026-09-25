import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:5000/api",

  timeout: 120000,
});

// ============================================================
// REQUEST INTERCEPTOR
// ============================================================

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Let the browser/Axios set multipart boundary automatically.
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// ============================================================
// RESPONSE INTERCEPTOR
// ============================================================

api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    const status = error.response?.status;

    // JWT is invalid/expired.
    if (status === 401) {
      console.warn(
        "Authentication expired or invalid. Clearing token."
      );

      localStorage.removeItem("token");

      // Avoid forcing navigation while already on login/register.
      const currentPath = window.location.pathname;

      if (
        currentPath !== "/login" &&
        currentPath !== "/register"
      ) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);


// ============================================================
// CHAT HELPER
// ============================================================

export const sendMessage = async (message) => {
  const response = await api.post("/chat", {
    message,
  });

  return response.data;
};


export default api;