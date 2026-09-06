import { Check, Palette } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import {
  themes,
  useTheme,
} from "../context/ThemeContext";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const [open, setOpen] = useState(false);

  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative"
    >
      <button
        type="button"
        onClick={() =>
          setOpen((current) => !current)
        }
        aria-label="Change theme"
        title="Change theme"
        className="
          flex h-10 w-10 items-center justify-center
          rounded-xl
          border border-[var(--border)]
          bg-[var(--surface)]
          text-[var(--muted)]
          transition
          hover:border-[var(--primary)]/40
          hover:text-[var(--text)]
        "
      >
        <Palette size={17} />
      </button>

      {open && (
        <div
          className="
            absolute right-0 top-12 z-[100]
            w-48
            rounded-xl
            border border-[var(--border)]
            bg-[var(--surface)]
            p-2
            shadow-2xl
          "
        >
          <p
            className="
              px-2 pb-2 pt-1
              text-[10px]
              font-semibold
              uppercase
              tracking-wider
              text-[var(--muted)]
            "
          >
            Theme
          </p>

          <div className="space-y-1">
            {Object.entries(themes).map(
              ([key, item]) => {
                const selected = theme === key;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setTheme(key);
                      setOpen(false);
                    }}
                    className={`
                      flex w-full items-center gap-3
                      rounded-lg
                      px-2.5 py-2
                      text-left text-sm
                      transition

                      ${
                        selected
                          ? "bg-[var(--primary)]/10 text-[var(--text)]"
                          : "text-[var(--muted)] hover:bg-[var(--bg)] hover:text-[var(--text)]"
                      }
                    `}
                  >
                    <span
                      className="
                        h-4 w-4 shrink-0
                        rounded-full
                        border border-black/10
                      "
                      style={{
                        backgroundColor:
                          item.colors.bg,
                      }}
                    />

                    <span className="flex-1">
                      {item.name}
                    </span>

                    {selected && (
                      <Check
                        size={14}
                        className="text-[var(--primary)]"
                      />
                    )}
                  </button>
                );
              }
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;