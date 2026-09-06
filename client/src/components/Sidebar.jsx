import {
  LayoutDashboard,
  FileText,
  MessageCircle,
  Trophy,
  BookOpen,
  TrendingUp,
  UserCircle,
  BrainCircuit,
} from "lucide-react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Documents",
      path: "/documents",
      icon: FileText,
    },
    {
      label: "AI Tutor",
      path: "/chat",
      icon: MessageCircle,
    },
    {
      label: "Smart Quiz",
      path: "/quiz",
      icon: Trophy,
    },
    {
      label: "Flashcards",
      path: "/flashcards",
      icon: BookOpen,
    },
    {
      label: "Progress",
      path: "/progress",
      icon: TrendingUp,
    },
    {
      label: "Profile",
      path: "/profile",
      icon: UserCircle,
    },
  ];

  return (
    <aside
      className="
        fixed left-0 top-0 z-30
        hidden h-screen w-64
        border-r border-[var(--border)]/70
        bg-[var(--bg)]
        lg:flex lg:flex-col
      "
    >
      {/* Brand */}

      <div
        className="
          flex h-16 items-center
          border-b border-[var(--border)]/70
          px-5
        "
      >
        <button
          type="button"
          onClick={() =>
            navigate("/dashboard")
          }
          className="flex items-center gap-3"
        >
          <div
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-xl
              border border-[var(--primary)]/20
              bg-[var(--primary)]/[0.07]
            "
          >
            <BrainCircuit
              size={19}
              className="text-[var(--primary)]"
            />
          </div>

          <div className="text-left">
            <p
              className="
                text-sm font-bold
                text-[var(--text)]
              "
            >
              StudyMate
              <span className="text-[var(--primary)]">
                {" "}AI
              </span>
            </p>

            <p
              className="
                text-[9px]
                uppercase
                tracking-[0.18em]
                text-[var(--muted)]
              "
            >
              Learning platform
            </p>
          </div>
        </button>
      </div>

      {/* Navigation */}

      <nav className="flex-1 p-4">
        <p
          className="
            mb-3 px-3
            text-[9px]
            font-bold
            uppercase
            tracking-[0.2em]
            text-[var(--muted)]/60
          "
        >
          Menu
        </p>

        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            const active =
              location.pathname === item.path;

            return (
              <button
                key={item.path}
                type="button"
                onClick={() =>
                  navigate(item.path)
                }
                className={`
                  group flex w-full
                  items-center gap-3
                  rounded-xl px-3 py-3
                  text-left text-sm
                  font-medium
                  transition
                  ${
                    active
                      ? "border border-[var(--primary)]/15 bg-[var(--primary)]/10 text-[var(--primary)]"
                      : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--text)]"
                  }
                `}
              >
                <Icon
                  size={17}
                  strokeWidth={1.8}
                />

                <span>
                  {item.label}
                </span>

                {active && (
                  <span
                    className="
                      ml-auto
                      h-1.5 w-1.5
                      rounded-full
                      bg-[var(--accent)]
                    "
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Status */}

      <div
        className="
          border-t border-[var(--border)]/70
          p-4
        "
      >
        <div
          className="
            rounded-2xl
            border border-[var(--border)]
            bg-[var(--surface)]
            p-4
          "
        >
          <div className="flex items-center gap-2">
            <span
              className="
                h-2 w-2
                rounded-full
                bg-[var(--accent)]
              "
            />

            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-[var(--muted)]
              "
            >
              System online
            </span>
          </div>

          <p
            className="
              mt-2
              text-xs
              leading-5
              text-[var(--muted)]
            "
          >
            Your learning workspace
            is ready.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;