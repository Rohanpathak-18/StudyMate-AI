import { useState } from "react";
import { Moon, Palette, Sun, X } from "lucide-react";
import { themes, useTheme } from "../context/ThemeContext";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative z-[9999]">
      {/* Main button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-200 hover:scale-105"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
          color: "var(--text)",
        }}
        aria-label="Change theme"
      >
        {open ? (
          <X size={20} />
        ) : theme === "light" ? (
          <Sun size={20} />
        ) : (
          <Moon size={20} />
        )}
      </button>

      {/* Theme menu */}
      {open && (
        <div
          className="absolute right-0 top-14 w-52 rounded-xl border p-2 shadow-2xl"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div
            className="px-3 py-2 text-sm font-semibold"
            style={{ color: "var(--text)" }}
          >
            Choose Theme
          </div>

          {Object.entries(themes).map(([key, value]) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                setTheme(key);
                setOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition"
              style={{
                backgroundColor:
                  theme === key ? "var(--bg)" : "transparent",
                color: "var(--text)",
              }}
            >
              <span
                className="h-3 w-3 rounded-full border"
                style={{
                  backgroundColor: value.colors.primary,
                  borderColor: value.colors.border,
                }}
              />

              <span className="text-sm">{value.name}</span>

              {theme === key && (
                <span
                  className="ml-auto text-xs font-medium"
                  style={{ color: "var(--primary)" }}
                >
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;