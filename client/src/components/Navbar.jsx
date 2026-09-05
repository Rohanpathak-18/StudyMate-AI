import {
  BrainCircuit,
  LogOut,
  UserCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Navbar = () => {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="relative z-20 border-b border-[#16324A]/70 bg-[#07111F]/85 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-8">

        {/* Brand */}
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-3"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#00E5FF]/20 bg-[#00E5FF]/[0.07]">
            <BrainCircuit
              size={21}
              className="text-[#00E5FF]"
              strokeWidth={1.8}
            />

            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#A3FF12] shadow-[0_0_10px_#A3FF12]" />
          </div>

          <div className="text-left">
            <h1 className="text-sm font-bold tracking-tight md:text-base">
              StudyMate
              <span className="text-[#00E5FF]"> AI</span>
            </h1>

            <p className="text-[10px] uppercase tracking-[0.2em] text-[#7890A8]">
              Knowledge system
            </p>
          </div>
        </button>

        {/* Right side */}
        <div className="flex items-center gap-3">

          {/* AI Online */}
          <div className="hidden items-center gap-2 rounded-full border border-[#16324A] bg-[#0B1728]/80 px-3 py-1.5 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A3FF12] shadow-[0_0_8px_#A3FF12]" />

            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#7890A8]">
              AI Online
            </span>
          </div>

          {/* User */}
          <div className="hidden items-center gap-2 md:flex">
            <UserCircle
              size={17}
              className="text-[#7890A8]"
            />

            <span className="max-w-[160px] truncate text-sm text-[#F1F7FF]">
              {user?.name || "Learner"}
            </span>
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-[#16324A] bg-[#0B1728]/70 px-3 py-2 text-xs font-medium text-[#7890A8] transition hover:border-red-400/30 hover:bg-red-400/5 hover:text-red-300 md:px-4 md:text-sm"
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