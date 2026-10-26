import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export const themes = {
  dark: {
    name: "Dark",
    colors: {
      bg: "#1d1b27",
      surface: "#262333",
      border: "#393547",
      text: "#f3effb",
      muted: "#aaa4bc",
      primary: "#ad91f2",
      secondary: "#8d7be0",
      secondaryText: "#c3adff",
      accent: "#e7b68a",
      soft: "#c0b1f3",
      danger: "#e58e9a",
    },
  },
  black: {
  name: "Black",
  colors: {
    bg: "#000000",
    surface: "#0A0A0A",
    border: "#1F1F1F",
    text: "#F5F5F5",
    muted: "#8A8A8A",
    primary: "#E5E5E5",
    secondary: "#525252",
    secondaryText: "#A3A3A3",
    accent: "#FFFFFF",
    soft: "#D4D4D4",
    danger: "#EF4444",
  },
},

  midnight: {
    name: "Midnight",
    colors: {
      bg: "#111827",
      surface: "#1A2436",
      border: "#2A3950",
      text: "#F4F7FB",
      muted: "#93A4B8",
      primary: "#60A5FA",
      secondary: "#818CF8",
      secondaryText: "#A5B4FC",
      accent: "#FBBF24",
      soft: "#93C5FD",
      danger: "#FB7185",
    },
  },

  forest: {
    name: "Forest",
    colors: {
      bg: "#0E1915",
      surface: "#16261F",
      border: "#294238",
      text: "#F1F7F3",
      muted: "#94A99F",
      primary: "#34D399",
      secondary: "#10B981",
      secondaryText: "#6EE7B7",
      accent: "#FACC15",
      soft: "#86EFAC",
      danger: "#FB7185",
    },
  },

  plum: {
    name: "Plum",
    colors: {
      bg: "#17131F",
      surface: "#231C2D",
      border: "#3B3049",
      text: "#F8F3FB",
      muted: "#A99CAF",
      primary: "#C084FC",
      secondary: "#8B5CF6",
      secondaryText: "#C4B5FD",
      accent: "#F9A8D4",
      soft: "#DDD6FE",
      danger: "#FB7185",
    },
  },

  light: {
    name: "Light",
    colors: {
      bg: "#F5F7FA",
      surface: "#FFFFFF",
      border: "#D9E0E8",
      text: "#17202A",
      muted: "#667085",
      primary: "#2563EB",
      secondary: "#7C3AED",
      secondaryText: "#6D28D9",
      accent: "#16A34A",
      soft: "#3B82F6",
      danger: "#DC2626",
    },
  },
};

const applyTheme = (themeName) => {
  const selectedTheme = themes[themeName] || themes.dark;
  const root = document.documentElement;

  root.dataset.theme = themeName;
  root.style.colorScheme = themeName === "light" ? "light" : "dark";

  Object.entries(selectedTheme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("studymate-theme");

    return savedTheme && themes[savedTheme]
      ? savedTheme
      : "light";
  });

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("studymate-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
};
