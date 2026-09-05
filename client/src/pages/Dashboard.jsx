import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  FileText,
  LogOut,
  MessageCircle,
  Sparkles,
  Trophy,
  Zap,
  ChevronRight,
  Activity,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Dashboard = () => {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const features = [
    {
      title: "AI Tutor",
      description:
        "Ask questions and understand concepts directly from your study material.",
      icon: MessageCircle,
      tag: "INTELLIGENT",
      action: () => navigate("/chat"),
      accent: "cyan",
    },
    {
      title: "Knowledge Base",
      description:
        "Upload, organize and build your personal AI-powered knowledge library.",
      icon: FileText,
      tag: "YOUR DATA",
      action: () => navigate("/documents"),
      accent: "purple",
    },
    {
      title: "Smart Quiz",
      description:
        "Challenge yourself with AI-generated questions based on what you study.",
      icon: Trophy,
      tag: "PRACTICE",
      action: () => navigate("/quiz"),
      accent: "lime",
    },
    {
      title: "Flashcards",
      description:
        "Turn difficult concepts into quick revision cards and remember more.",
      icon: BookOpen,
      tag: "REVISION",
      action: () => navigate("/flashcards"),
      accent: "cyan",
    },
  ];

  const accentStyles = {
    cyan: {
      icon: "bg-[#00E5FF]/10 text-[#00E5FF] border-[#00E5FF]/20",
      glow: "group-hover:border-[#00E5FF]/30",
      text: "text-[#00E5FF]",
    },
    purple: {
      icon: "bg-[#7C3AED]/10 text-[#A78BFA] border-[#7C3AED]/20",
      glow: "group-hover:border-[#7C3AED]/30",
      text: "text-[#A78BFA]",
    },
    lime: {
      icon: "bg-[#A3FF12]/10 text-[#A3FF12] border-[#A3FF12]/20",
      glow: "group-hover:border-[#A3FF12]/30",
      text: "text-[#A3FF12]",
    },
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#07111F] text-[#F1F7FF]">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#00E5FF]/[0.035] blur-[120px]" />
        <div className="absolute right-[-200px] top-[15%] h-[500px] w-[500px] rounded-full bg-[#7C3AED]/[0.045] blur-[140px]" />
        <div className="absolute bottom-[-200px] left-[35%] h-[450px] w-[450px] rounded-full bg-[#A3FF12]/[0.018] blur-[130px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-20 border-b border-[#16324A]/70 bg-[#07111F]/85 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#00E5FF]/20 bg-[#00E5FF]/[0.07]">
              <BrainCircuit
                size={21}
                className="text-[#00E5FF]"
                strokeWidth={1.8}
              />

              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#A3FF12] shadow-[0_0_10px_#A3FF12]" />
            </div>

            <div>
              <h1 className="text-sm font-bold tracking-tight md:text-base">
                StudyMate
                <span className="text-[#00E5FF]"> AI</span>
              </h1>

              <p className="text-[10px] uppercase tracking-[0.2em] text-[#7890A8]">
                Knowledge system
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* AI Status */}
            <div className="hidden items-center gap-2 rounded-full border border-[#16324A] bg-[#0B1728]/80 px-3 py-1.5 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A3FF12] shadow-[0_0_8px_#A3FF12]" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#7890A8]">
                AI Online
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl border border-[#16324A] bg-[#0B1728]/70 px-3 py-2 text-xs font-medium text-[#7890A8] transition hover:border-red-400/30 hover:bg-red-400/5 hover:text-red-300 md:px-4 md:text-sm"
            >
              <LogOut size={15} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 mx-auto max-w-[1400px] px-5 py-8 md:px-8 md:py-12">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[28px] border border-[#16324A] bg-[#0B1728]/75"
        >
          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(#00E5FF 1px, transparent 1px), linear-gradient(90deg, #00E5FF 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Glows */}
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#00E5FF]/10 blur-[100px]" />
          <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-[#7C3AED]/10 blur-[100px]" />

          <div className="relative p-7 md:p-10 lg:p-12">
            <div className="mb-6 flex items-center gap-2">
              <span className="flex h-7 items-center gap-2 rounded-full border border-[#A3FF12]/20 bg-[#A3FF12]/5 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#A3FF12]">
                <Activity size={11} />
                Learning system active
              </span>
            </div>

            <div className="max-w-3xl">
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-[#7890A8]">
                Your learning workspace
              </p>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Welcome back,
                <br />
                <span className="bg-gradient-to-r from-[#00E5FF] via-[#8BE9FF] to-[#A3FF12] bg-clip-text text-transparent">
                  {user?.name || "Learner"}
                </span>
                <span className="ml-2">.</span>
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#7890A8] md:text-base">
                Your personal AI learning environment is ready. Continue
                exploring your knowledge, test yourself and turn information
                into understanding.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/chat")}
                className="group flex items-center gap-2 rounded-xl bg-[#00E5FF] px-5 py-3 text-sm font-bold text-[#07111F] transition hover:shadow-[0_0_30px_rgba(0,229,255,0.2)]"
              >
                <MessageCircle size={17} />
                Start learning
                <ArrowUpRight
                  size={16}
                  className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>

              <button
                onClick={() => navigate("/documents")}
                className="flex items-center gap-2 rounded-xl border border-[#16324A] bg-[#07111F]/60 px-5 py-3 text-sm font-medium text-[#F1F7FF] transition hover:border-[#00E5FF]/30 hover:bg-[#00E5FF]/5"
              >
                <FileText size={17} className="text-[#00E5FF]" />
                Open knowledge base
              </button>
            </div>
          </div>
        </motion.section>

        {/* Stats */}
        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            {
              label: "Documents",
              value: "0",
              icon: FileText,
              accent: "cyan",
            },
            {
              label: "AI conversations",
              value: "0",
              icon: MessageCircle,
              accent: "purple",
            },
            {
              label: "Learning status",
              value: "READY",
              icon: Zap,
              accent: "lime",
            },
          ].map((stat, index) => {
            const Icon = stat.icon;
            const style = accentStyles[stat.accent];

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-[#16324A] bg-[#0B1728]/70 p-5 transition hover:-translate-y-0.5 hover:bg-[#0B1728]"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border ${style.icon}`}
                  >
                    <Icon size={19} />
                  </div>

                  <span
                    className={`text-[9px] font-bold uppercase tracking-[0.2em] ${style.text}`}
                  >
                    00{index + 1}
                  </span>
                </div>

                <div className="mt-5">
                  <p className="text-2xl font-bold tracking-tight">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-xs text-[#7890A8]">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </section>

        {/* Learning tools */}
        <section className="mt-12">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#00E5FF]" />

                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#00E5FF]">
                  Workspace
                </p>
              </div>

              <h3 className="mt-2 text-2xl font-bold tracking-tight">
                Learning tools
              </h3>

              <p className="mt-1 text-sm text-[#7890A8]">
                Everything you need to study smarter.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const style = accentStyles[feature.accent];

              return (
                <motion.button
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.08 }}
                  onClick={feature.action}
                  className={`group text-left`}
                >
                  <div
                    className={`relative h-full overflow-hidden rounded-2xl border border-[#16324A] bg-[#0B1728]/65 p-6 transition duration-300 group-hover:-translate-y-1 ${style.glow} group-hover:bg-[#0B1728]`}
                  >
                    {/* Number */}
                    <span className="absolute right-5 top-5 text-[10px] font-bold tracking-widest text-[#7890A8]/40">
                      0{index + 1}
                    </span>

                    {/* Icon */}
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl border ${style.icon}`}
                    >
                      <Icon size={22} strokeWidth={1.7} />
                    </div>

                    <div className="mt-6">
                      <p
                        className={`text-[9px] font-bold uppercase tracking-[0.2em] ${style.text}`}
                      >
                        {feature.tag}
                      </p>

                      <h4 className="mt-2 text-lg font-bold">
                        {feature.title}
                      </h4>

                      <p className="mt-2 text-sm leading-6 text-[#7890A8]">
                        {feature.description}
                      </p>
                    </div>

                    <div
                      className={`mt-6 flex items-center gap-1 text-xs font-bold ${style.text}`}
                    >
                      Open workspace
                      <ChevronRight
                        size={14}
                        className="transition group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* Bottom status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#16324A]/70 bg-[#0B1728]/40 px-5 py-4"
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#A3FF12] opacity-40" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#A3FF12]" />
            </span>

            <span className="text-xs text-[#7890A8]">
              StudyMate AI is ready for your next session.
            </span>
          </div>

          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#7890A8]/60">
            SYSTEM // ONLINE
          </span>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;