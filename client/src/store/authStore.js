import { create } from "zustand";
import api from "../services/api";

const useAuthStore = create((set) => ({
  user: null,

  token: localStorage.getItem("token"),

  loading: false,

  initialized: false,


  // ============================================================
  // REGISTER
  // ============================================================

  register: async (userData) => {
    set({
      loading: true,
    });

    try {
      const response = await api.post(
        "/auth/register",
        userData
      );

      const {
        token,
        user,
      } = response.data;

      if (!token) {
        throw new Error(
          "Registration succeeded but no token was returned."
        );
      }

      localStorage.setItem(
        "token",
        token
      );

      set({
        user,
        token,
        loading: false,
        initialized: true,
      });

      return {
        success: true,
        user,
        token,
      };

    } catch (error) {

      set({
        loading: false,
      });

      return {
        success: false,

        message:
          error.response?.data?.message ||
          "Registration failed",
      };
    }
  },


  // ============================================================
  // LOGIN
  // ============================================================

  login: async (credentials) => {
    set({
      loading: true,
    });

    try {
      const response = await api.post(
        "/auth/login",
        credentials
      );

      const {
        token,
        user,
      } = response.data;

      if (!token) {
        throw new Error(
          "Login succeeded but no token was returned."
        );
      }

      localStorage.setItem(
        "token",
        token
      );

      set({
        user,
        token,
        loading: false,
        initialized: true,
      });

      return {
        success: true,
        user,
        token,
      };

    } catch (error) {

      set({
        loading: false,
      });

      return {
        success: false,

        message:
          error.response?.data?.message ||
          "Login failed",
      };
    }
  },


  // ============================================================
  // GET CURRENT USER
  // ============================================================

  getMe: async () => {

    const token =
      localStorage.getItem("token");

    if (!token) {

      set({
        user: null,
        token: null,
        initialized: true,
      });

      return false;
    }

    try {

      const response =
        await api.get("/auth/me");

      const user =
        response.data?.user;

      if (!user) {
        throw new Error(
          "Invalid user response"
        );
      }

      set({
        user,
        token,
        initialized: true,
      });

      return true;

    } catch (error) {

      console.error(
        "GET ME ERROR:",
        error.response?.data ||
        error.message
      );

      localStorage.removeItem(
        "token"
      );

      set({
        user: null,
        token: null,
        initialized: true,
      });

      return false;
    }
  },


  // ============================================================
  // LOGOUT
  // ============================================================

  logout: () => {

    localStorage.removeItem(
      "token"
    );

    set({
      user: null,
      token: null,
      loading: false,
      initialized: true,
    });
  },
}));


export default useAuthStore;