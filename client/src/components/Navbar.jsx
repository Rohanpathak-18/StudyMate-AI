import {
  BrainCircuit,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import useAuthStore from "../store/authStore";

import ThemeSwitcher from "./ThemeSwitcher";

const Navbar = () => {
  const navigate = useNavigate();

  const user = useAuthStore(
    (state) => state.user
  );

  const logout = useAuthStore(
    (state) => state.logout
  );

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <nav
      className="
        relative z-20
        border-b border-[var(--border)]/70
        bg-[var(--bg)]/85
        backdrop-blur-2xl
      "
    >
      <div
        className="
          mx-auto flex max-w-[1400px]
          items-center justify-between
          px-5 py-4
          md:px-8
        "
      >
        {/* Brand */}

        <button
          type="button"
          onClick={() =>
            navigate("/dashboard")
          }
          className="flex items-center gap-3"
        >
          <div
            className="
              relative flex h-10 w-10
              items-center justify-center
              rounded-xl
              border border-[var(--primary)]/20
              bg-[var(--primary)]/[0.07]
            "
          >
            <BrainCircuit
              size={21}
              className="text-[var(--primary)]"
              strokeWidth={1.8}
            />

            <span
              className="
                absolute
                -right-0.5
                -top-0.5
                h-2 w-2
                rounded-full
                bg-[var(--accent)]
              "
            />
          </div>

          <div className="text-left">
            <h1
              className="
                text-sm font-bold
                tracking-tight
                md:text-base
              "
            >
              StudyMate
              <span className="text-[var(--primary)]">
                {" "}AI
              </span>
            </h1>

            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-[var(--muted)]
              "
            >
              Knowledge system
            </p>
          </div>
        </button>

        {/* Right side */}

        <div className="flex items-center gap-3">

          <ThemeSwitcher />

          <div
            className="
              hidden sm:flex
              items-center gap-2
              rounded-full
              border border-[var(--border)]
              bg-[var(--surface)]/80
              px-3 py-1.5
            "
          >
            <span
              className="
                h-1.5 w-1.5
                rounded-full
                bg-[var(--accent)]
              "
            />

            <span
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-widest
                text-[var(--muted)]
              "
            >
              AI Online
            </span>
          </div>

          <div
            className="
              hidden md:block
              max-w-[160px]
              truncate
              text-sm
              text-[var(--text)]
            "
          >
            {user?.name || "Learner"}
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="
              flex items-center gap-2
              rounded-xl
              border border-[var(--border)]
              bg-[var(--surface)]/70
              px-3 py-2
              text-xs font-medium
              text-[var(--muted)]
              transition
              hover:border-red-400/30
              hover:bg-red-400/5
              hover:text-red-300
              md:px-4 md:text-sm
            "
          >
            <LogOut size={15} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;