import { create } from "zustand";
import api from "../services/api";

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  initialized: false,

  register: async (userData) => {
    set({ loading: true });

    try {
      const response = await api.post(
        "/auth/register",
        userData
      );

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

      localStorage.setItem("token", token);

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

      throw error;
    }
  },

  getMe: async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      set({
        user: null,
        token: null,
        initialized: true,
      });

      return false;
    }

    try {
      const response = await api.get("/auth/me");

      set({
        user: response.data.user,
        token,
        initialized: true,
      });

      return true;
    } catch (error) {
      localStorage.removeItem("token");

      set({
        user: null,
        token: null,
        initialized: true,
      });

      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");

    set({
      user: null,
      token: null,
      initialized: true,
    });
  },
}));

export default useAuthStore;