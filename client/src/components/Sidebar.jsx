import {
  LayoutDashboard,
  FileText,
  MessageCircle,
  Trophy,
  BookOpen,
  BarChart3,
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

  const items = [
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
      icon: BarChart3,
    },
    {
      label: "Profile",
      path: "/profile",
      icon: UserCircle,
    },
  ];

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(
        `${path}/`
      )
    );
  };

  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-64 border-r border-[#16324A]/70 bg-[#07111F] lg:flex lg:flex-col">

      {/* Logo */}
      <div className="flex h-16 items-center border-b border-[#16324A]/70 px-5">
        <button
          type="button"
          onClick={() =>
            navigate("/dashboard")
          }
          className="flex items-center gap-3"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[#00E5FF]/20 bg-[#00E5FF]/[0.07]">
            <BrainCircuit
              size={20}
              className="text-[#00E5FF]"
              strokeWidth={1.8}
            />

            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#A3FF12] shadow-[0_0_10px_#A3FF12]" />
          </div>

          <div className="text-left">
            <p className="text-sm font-bold">
              StudyMate
              <span className="text-[#00E5FF]">
                {" "}AI
              </span>
            </p>

            <p className="text-[9px] uppercase tracking-[0.18em] text-[#7890A8]">
              Workspace
            </p>
          </div>
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-5">

        <p className="mb-3 px-3 text-[9px] font-bold uppercase tracking-[0.2em] text-[#7890A8]/60">
          Navigation
        </p>

        <nav className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const active = isActive(
              item.path
            );

            return (
              <button
                key={item.path}
                type="button"
                onClick={() =>
                  navigate(item.path)
                }
                className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                  active
                    ? "border border-[#00E5FF]/15 bg-[#00E5FF]/10 text-[#00E5FF]"
                    : "text-[#7890A8] hover:bg-[#0B1728] hover:text-[#F1F7FF]"
                }`}
              >
                <Icon
                  size={18}
                  strokeWidth={
                    active ? 2 : 1.7
                  }
                />

                <span>{item.label}</span>

                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#A3FF12] shadow-[0_0_8px_#A3FF12]" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom status */}
      <div className="border-t border-[#16324A]/70 p-4">
        <div className="rounded-2xl border border-[#16324A] bg-[#0B1728]/60 p-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#A3FF12] shadow-[0_0_8px_#A3FF12]" />

            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#7890A8]">
              System online
            </span>
          </div>

          <p className="mt-2 text-xs leading-5 text-[#7890A8]">
            Your AI learning workspace is ready.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;