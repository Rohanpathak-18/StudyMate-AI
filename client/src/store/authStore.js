import { create } from "zustand";
import api from "../services/api";

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token"),
  loading: false,

  register: async (userData) => {
    set({ loading: true });

    try {
      const response = await api.post("/auth/register", userData);

      const { token, user } = response.data;

      localStorage.setItem("token", token);

      set({
        user,
        token,
        loading: false,
      });

      return {
        success: true,
      };
    } catch (error) {
      set({ loading: false });

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Registration failed",
      };
    }
  },

  login: async (credentials) => {
    set({ loading: true });

    try {
      const response = await api.post(
        "/auth/login",
        credentials
      );

      const { token, user } = response.data;

      // Save token
      localStorage.setItem("token", token);

      // Update Zustand
      set({
        user,
        token,
        loading: false,
      });

      return {
        success: true,
        user,
        token,
      };
    } catch (error) {
      set({ loading: false });

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Login failed",
      };
    }
  },

  getMe: async () => {
    try {
      const response = await api.get("/auth/me");

      set({
        user: response.data.user,
      });

      return true;
    } catch (error) {
      localStorage.removeItem("token");

      set({
        user: null,
        token: null,
      });

      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");

    set({
      user: null,
      token: null,
    });
  },
}));

export default useAuthStore;