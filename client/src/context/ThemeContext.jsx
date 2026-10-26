import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);
const sharedColors = { primary: "#7652c8", secondary: "#7652c8", secondaryText: "#7652c8", accent: "#7652c8", soft: "#9a83d5", danger: "#c85c6d" };

export const themes = {
  light: { name: "Light", colors: { ...sharedColors, bg: "#fbfaff", surface: "#ffffff", border: "#ebe7f2", text: "#302b3e", muted: "#77738a" } },
  dark: { name: "Dark", colors: { ...sharedColors, bg: "#201e29", surface: "#2a2735", border: "#403b4e", text: "#f4f1fa", muted: "#b2adbf" } },
};

const applyTheme = (themeName) => {
  const selected = themes[themeName] || themes.light;
  const root = document.documentElement;
  root.dataset.theme = themes[themeName] ? themeName : "light";
  root.style.colorScheme = root.dataset.theme;
  Object.entries(selected.colors).forEach(([key, value]) => root.style.setProperty(`--${key}`, value));
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem("studymate-theme") === "dark" ? "dark" : "light");
  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("studymate-theme", theme);
  }, [theme]);
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
};
