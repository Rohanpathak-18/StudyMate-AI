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
  TrendingUp,
  Target,
  Upload,
  MessageSquareText,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../store/authStore";
import api from "../services/api";

const Dashboard = () => {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const getMe = useAuthStore((state) => state.getMe);

  const [stats, setStats] = useState({
    documents: 0,
    conversations: 0,
  });

  const [statsLoading, setStatsLoading] = useState(true);

  // Restore user if Zustand does not currently have it
  useEffect(() => {
    if (!user && getMe) {
      getMe();
    }
  }, [user, getMe]);

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  const loadStats = async () => {
    try {
      setStatsLoading(true);

      const response = await api.get(
        "/dashboard/stats"
      );

      if (response.data?.success) {
        setStats({
          documents: Number(
            response.data.stats?.documents || 0
          ),
          conversations: Number(
            response.data.stats?.conversations || 0
          ),
        });
      }
    } catch (error) {
      console.error(
        "DASHBOARD STATS ERROR:",
        error.response?.data || error.message
      );
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const features = [
    {
      title: "AI Tutor",
      description:
        "Ask questions and understand concepts directly from your study material.",
      icon: MessageCircle,
      tag: "INTELLIGENT",
      action: () => navigate("/chat"),
      accent: "cyan",
      command: "ASK",
    },
    {
      title: "Knowledge Base",
      description:
        "Upload, organize and build your personal AI-powered knowledge library.",
      icon: FileText,
      tag: "YOUR DATA",
      action: () => navigate("/documents"),
      accent: "purple",
      command: "BUILD",
    },
    {
      title: "Smart Quiz",
      description:
        "Challenge yourself with AI-generated questions based on what you study.",
      icon: Trophy,
      tag: "PRACTICE",
      action: () => navigate("/quiz"),
      accent: "lime",
      command: "TEST",
    },
    {
      title: "Flashcards",
      description:
        "Turn difficult concepts into quick revision cards and remember more.",
      icon: BookOpen,
      tag: "REVISION",
      action: () => navigate("/flashcards"),
      accent: "cyan",
      command: "RECALL",
    },
  ];

  const accentStyles = {
    cyan: {
      icon:
        "bg-[#00E5FF]/10 text-[#00E5FF] border-[#00E5FF]/20",
      glow:
        "group-hover:border-[#00E5FF]/35",
      text: "text-[#00E5FF]",
    },

    purple: {
      icon:
        "bg-[#7C3AED]/10 text-[#A78BFA] border-[#7C3AED]/20",
      glow:
        "group-hover:border-[#7C3AED]/35",
      text: "text-[#A78BFA]",
    },

    lime: {
      icon:
        "bg-[#A3FF12]/10 text-[#A3FF12] border-[#A3FF12]/20",
      glow:
        "group-hover:border-[#A3FF12]/35",
      text: "text-[#A3FF12]",
    },
  };

  const totalActivity =
    stats.documents + stats.conversations;

  const learningStatus =
    stats.documents > 0
      ? "ACTIVE"
      : "READY";

  return (
    <div className="min-h-screen overflow-hidden bg-[#07111F] text-[#F1F7FF]">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#00E5FF]/[0.035] blur-[130px]" />

        <div className="absolute right-[-220px] top-[12%] h-[520px] w-[520px] rounded-full bg-[#7C3AED]/[0.045] blur-[145px]" />

        <div className="absolute bottom-[-220px] left-[32%] h-[500px] w-[500px] rounded-full bg-[#A3FF12]/[0.02] blur-[140px]" />

        <div className="absolute left-1/2 top-[42%] h-[250px] w-[250px] -translate-x-1/2 rounded-full bg-[#00E5FF]/[0.012] blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-20 border-b border-[#16324A]/70 bg-[#07111F]/85 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-8">

          <button
            type="button"
            onClick={() =>
              navigate("/dashboard")
            }
            className="flex items-center gap-3"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#00E5FF]/20 bg-[#00E5FF]/[0.07] shadow-[0_0_25px_rgba(0,229,255,0.04)]">

              <BrainCircuit
                size={21}
                className="text-[#00E5FF]"
                strokeWidth={1.8}
              />

              <motion.span
                animate={{
                  opacity: [0.4, 1, 0.4],
                  scale: [0.9, 1.15, 0.9],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                }}
                className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#A3FF12] shadow-[0_0_10px_#A3FF12]"
              />
            </div>

            <div className="text-left">
              <h1 className="text-sm font-bold tracking-tight md:text-base">
                StudyMate
                <span className="text-[#00E5FF]">
                  {" "}AI
                </span>
              </h1>

              <p className="text-[10px] uppercase tracking-[0.2em] text-[#7890A8]">
                Knowledge system
              </p>
            </div>
          </button>

          <div className="flex items-center gap-3">

            <div className="hidden items-center gap-2 rounded-full border border-[#16324A] bg-[#0B1728]/80 px-3 py-1.5 sm:flex">
              <motion.span
                animate={{
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="h-1.5 w-1.5 rounded-full bg-[#A3FF12] shadow-[0_0_8px_#A3FF12]"
              />

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
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.55,
          }}
          className="relative overflow-hidden rounded-[28px] border border-[#16324A] bg-[#0B1728]/75 shadow-[0_20px_80px_rgba(0,0,0,0.15)]"
        >
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(#00E5FF 1px, transparent 1px), linear-gradient(90deg, #00E5FF 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#00E5FF]/10 blur-[110px]" />

          <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-[#7C3AED]/10 blur-[110px]" />

          <div className="relative grid lg:grid-cols-[1.4fr_0.6fr]">

            <div className="p-7 md:p-10 lg:p-12">

              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="flex h-7 items-center gap-2 rounded-full border border-[#A3FF12]/20 bg-[#A3FF12]/5 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#A3FF12]">
                  <Activity size={11} />
                  Learning system active
                </span>

                <span className="rounded-full border border-[#16324A] bg-[#07111F]/60 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#7890A8]">
                  {statsLoading
                    ? "SYNCING"
                    : `${totalActivity} ACTIVITY EVENTS`}
                </span>
              </div>

              <div className="max-w-3xl">

                <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-[#7890A8]">
                  Your learning workspace
                </p>

                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Welcome back,
                  <br />

                  {user?.name ? (
                    <>
                      <span className="bg-gradient-to-r from-[#00E5FF] via-[#8BE9FF] to-[#A3FF12] bg-clip-text text-transparent">
                        {user.name}
                      </span>

                      <span className="ml-2">
                        .
                      </span>
                    </>
                  ) : (
                    <span className="mt-2 inline-block h-12 w-64 animate-pulse rounded-lg bg-[#16324A] md:h-14 md:w-80" />
                  )}
                </h2>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-[#7890A8] md:text-base">
                  Your personal AI learning environment
                  is ready. Continue exploring your
                  knowledge, test yourself and turn
                  information into understanding.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">

                <button
                  onClick={() =>
                    navigate("/chat")
                  }
                  className="group flex items-center gap-2 rounded-xl bg-[#00E5FF] px-5 py-3 text-sm font-bold text-[#07111F] transition hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(0,229,255,0.22)]"
                >
                  <MessageCircle size={17} />

                  Start learning

                  <ArrowUpRight
                    size={16}
                    className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>

                <button
                  onClick={() =>
                    navigate("/documents")
                  }
                  className="flex items-center gap-2 rounded-xl border border-[#16324A] bg-[#07111F]/60 px-5 py-3 text-sm font-medium text-[#F1F7FF] transition hover:-translate-y-0.5 hover:border-[#00E5FF]/30 hover:bg-[#00E5FF]/5"
                >
                  <FileText
                    size={17}
                    className="text-[#00E5FF]"
                  />

                  Open knowledge base
                </button>
              </div>
            </div>

            {/* AI Core */}
            <div className="relative hidden min-h-[360px] overflow-hidden border-l border-[#16324A] lg:block">

              <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00E5FF]/10 blur-[70px]" />

              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 24,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#00E5FF]/20"
              >
                <span className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#00E5FF] shadow-[0_0_15px_#00E5FF]" />
              </motion.div>

              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 16,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#7C3AED]/25"
              >
                <span className="absolute bottom-[-4px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#7C3AED] shadow-[0_0_12px_#7C3AED]" />
              </motion.div>

              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(0,229,255,0.08)",
                    "0 0 55px rgba(0,229,255,0.18)",
                    "0 0 20px rgba(0,229,255,0.08)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#00E5FF]/30 bg-[#07111F]/90"
              >
                <div className="absolute inset-3 rounded-full border border-[#A3FF12]/15" />

                <BrainCircuit
                  size={42}
                  strokeWidth={1.3}
                  className="text-[#00E5FF]"
                />
              </motion.div>

              <div className="absolute left-7 top-7">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#7890A8]">
                  Neural workspace
                </p>

                <p className="mt-1 text-xs font-semibold text-[#F1F7FF]">
                  AI Learning Core
                </p>
              </div>

              <div className="absolute bottom-7 right-7 text-right">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#7890A8]">
                  System state
                </p>

                <div className="mt-1 flex items-center justify-end gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#A3FF12] shadow-[0_0_8px_#A3FF12]" />

                  <span className="text-xs font-bold text-[#A3FF12]">
                    {learningStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Stats */}
        <section className="mt-6 grid gap-4 sm:grid-cols-3">

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.12,
            }}
            className="group relative overflow-hidden rounded-2xl border border-[#16324A] bg-[#0B1728]/70 p-5 transition duration-300 hover:-translate-y-1 hover:bg-[#0B1728]"
          >
            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[#00E5FF]/5 blur-[35px]" />

            <div className="relative flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#00E5FF]/20 bg-[#00E5FF]/10 text-[#00E5FF]">
                <FileText size={19} />
              </div>

              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#00E5FF]">
                001
              </span>
            </div>

            <div className="relative mt-5">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-2xl font-bold tracking-tight">
                    {statsLoading
                      ? "..."
                      : stats.documents}
                  </p>

                  <p className="mt-1 text-xs text-[#7890A8]">
                    Documents
                  </p>
                </div>

                <div className="mb-1 flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-[#00E5FF]">
                  <Upload size={11} />
                  Knowledge
                </div>
              </div>

              <div className="mt-4 h-1 overflow-hidden rounded-full bg-[#07111F]">
                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width:
                      stats.documents > 0
                        ? "72%"
                        : "10%",
                  }}
                  transition={{
                    duration: 1,
                  }}
                  className="h-full rounded-full bg-[#00E5FF]"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
            }}
            className="group relative overflow-hidden rounded-2xl border border-[#16324A] bg-[#0B1728]/70 p-5 transition duration-300 hover:-translate-y-1 hover:bg-[#0B1728]"
          >
            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[#7C3AED]/5 blur-[35px]" />

            <div className="relative flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#7C3AED]/20 bg-[#7C3AED]/10 text-[#A78BFA]">
                <MessageCircle size={19} />
              </div>

              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A78BFA]">
                002
              </span>
            </div>

            <div className="relative mt-5">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-2xl font-bold tracking-tight">
                    {statsLoading
                      ? "..."
                      : stats.conversations}
                  </p>

                  <p className="mt-1 text-xs text-[#7890A8]">
                    AI conversations
                  </p>
                </div>

                <div className="mb-1 flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-[#A78BFA]">
                  <MessageSquareText size={11} />
                  Interaction
                </div>
              </div>

              <div className="mt-4 h-1 overflow-hidden rounded-full bg-[#07111F]">
                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width:
                      stats.conversations > 0
                        ? "64%"
                        : "10%",
                  }}
                  transition={{
                    duration: 1,
                  }}
                  className="h-full rounded-full bg-[#7C3AED]"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.28,
            }}
            className="group relative overflow-hidden rounded-2xl border border-[#16324A] bg-[#0B1728]/70 p-5 transition duration-300 hover:-translate-y-1 hover:bg-[#0B1728]"
          >
            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[#A3FF12]/5 blur-[35px]" />

            <div className="relative flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#A3FF12]/20 bg-[#A3FF12]/10 text-[#A3FF12]">
                <Zap size={19} />
              </div>

              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A3FF12]">
                003
              </span>
            </div>

            <div className="relative mt-5">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-2xl font-bold tracking-tight">
                    {learningStatus}
                  </p>

                  <p className="mt-1 text-xs text-[#7890A8]">
                    Learning status
                  </p>
                </div>

                <div className="mb-1 flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-[#A3FF12]">
                  <TrendingUp size={11} />
                  Live
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A3FF12] shadow-[0_0_8px_#A3FF12]" />

                <span className="text-[10px] text-[#7890A8]">
                  {stats.documents > 0
                    ? "Knowledge base connected"
                    : "Upload material to activate"}
                </span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Learning Pulse */}
        <motion.section
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.34,
          }}
          className="mt-8 grid gap-4 lg:grid-cols-[1.5fr_0.5fr]"
        >
          <div className="relative overflow-hidden rounded-2xl border border-[#16324A] bg-[#0B1728]/65 p-6">
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#00E5FF]/5 blur-[50px]" />

            <div className="relative">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Activity
                      size={15}
                      className="text-[#00E5FF]"
                    />

                    <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#00E5FF]">
                      Workspace pulse
                    </p>
                  </div>

                  <h3 className="mt-2 text-xl font-bold">
                    Your learning system
                  </h3>

                  <p className="mt-1 text-sm text-[#7890A8]">
                    A quick snapshot of your current
                    learning environment.
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-[#16324A] bg-[#07111F]/70 px-3 py-2">
                  <Target
                    size={14}
                    className="text-[#A3FF12]"
                  />

                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7890A8]">
                    Focus mode
                  </span>

                  <span className="text-[10px] font-bold text-[#A3FF12]">
                    READY
                  </span>
                </div>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">

                <button
                  type="button"
                  onClick={() =>
                    navigate("/documents")
                  }
                  className="group rounded-xl border border-[#16324A] bg-[#07111F]/60 p-4 text-left transition hover:border-[#00E5FF]/25 hover:bg-[#00E5FF]/[0.03]"
                >
                  <div className="flex items-center justify-between">
                    <FileText
                      size={17}
                      className="text-[#00E5FF]"
                    />

                    <ArrowUpRight
                      size={14}
                      className="text-[#7890A8] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>

                  <p className="mt-4 text-sm font-semibold">
                    Knowledge
                  </p>

                  <p className="mt-1 text-xs text-[#7890A8]">
                    {stats.documents}{" "}
                    {stats.documents === 1
                      ? "document"
                      : "documents"}{" "}
                    loaded
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/chat")
                  }
                  className="group rounded-xl border border-[#16324A] bg-[#07111F]/60 p-4 text-left transition hover:border-[#7C3AED]/25 hover:bg-[#7C3AED]/[0.03]"
                >
                  <div className="flex items-center justify-between">
                    <MessageCircle
                      size={17}
                      className="text-[#A78BFA]"
                    />

                    <ArrowUpRight
                      size={14}
                      className="text-[#7890A8] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>

                  <p className="mt-4 text-sm font-semibold">
                    AI Tutor
                  </p>

                  <p className="mt-1 text-xs text-[#7890A8]">
                    {stats.conversations}{" "}
                    {stats.conversations === 1
                      ? "conversation"
                      : "conversations"}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/quiz")
                  }
                  className="group rounded-xl border border-[#16324A] bg-[#07111F]/60 p-4 text-left transition hover:border-[#A3FF12]/25 hover:bg-[#A3FF12]/[0.03]"
                >
                  <div className="flex items-center justify-between">
                    <Trophy
                      size={17}
                      className="text-[#A3FF12]"
                    />

                    <ArrowUpRight
                      size={14}
                      className="text-[#7890A8] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>

                  <p className="mt-4 text-sm font-semibold">
                    Practice
                  </p>

                  <p className="mt-1 text-xs text-[#7890A8]">
                    Test your understanding
                  </p>
                </button>

              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-[#16324A] bg-[#0B1728]/65 p-6">
            <div className="absolute bottom-[-50px] right-[-50px] h-40 w-40 rounded-full bg-[#7C3AED]/5 blur-[50px]" />

            <div className="relative">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#7890A8]">
                    Activity index
                  </p>

                  <p className="mt-2 text-4xl font-bold">
                    {statsLoading
                      ? "..."
                      : totalActivity}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#00E5FF]/20 bg-[#00E5FF]/10">
                  <TrendingUp
                    size={19}
                    className="text-[#00E5FF]"
                  />
                </div>
              </div>

              <p className="mt-4 text-xs leading-5 text-[#7890A8]">
                Combined documents and AI
                conversations in your workspace.
              </p>

              <div className="mt-6 space-y-3">

                <div>
                  <div className="mb-1.5 flex justify-between text-[10px]">
                    <span className="text-[#7890A8]">
                      Knowledge
                    </span>

                    <span className="text-[#00E5FF]">
                      {stats.documents}
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-[#07111F]">
                    <div
                      className="h-full rounded-full bg-[#00E5FF]"
                      style={{
                        width:
                          stats.documents > 0
                            ? "75%"
                            : "8%",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1.5 flex justify-between text-[10px]">
                    <span className="text-[#7890A8]">
                      Interaction
                    </span>

                    <span className="text-[#A78BFA]">
                      {stats.conversations}
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-[#07111F]">
                    <div
                      className="h-full rounded-full bg-[#7C3AED]"
                      style={{
                        width:
                          stats.conversations > 0
                            ? "62%"
                            : "8%",
                      }}
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </motion.section>

        {/* Learning Tools */}
        <section className="mt-12">
          <div className="mb-6 flex items-end justify-between">
            <div>

              <div className="flex items-center gap-2">
                <Sparkles
                  size={16}
                  className="text-[#00E5FF]"
                />

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

            {features.map(
              (feature, index) => {
                const Icon = feature.icon;
                const style =
                  accentStyles[
                    feature.accent
                  ];

                return (
                  <motion.button
                    key={feature.title}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay:
                        0.42 +
                        index * 0.08,
                    }}
                    onClick={
                      feature.action
                    }
                    className="group text-left"
                  >
                    <div
                      className={`relative h-full overflow-hidden rounded-2xl border border-[#16324A] bg-[#0B1728]/65 p-6 transition duration-300 group-hover:-translate-y-1 ${style.glow} group-hover:bg-[#0B1728]`}
                    >
                      <div className="absolute left-0 top-0 h-px w-0 bg-[#00E5FF] transition-all duration-500 group-hover:w-full" />

                      <span className="absolute right-5 top-5 text-[10px] font-bold tracking-widest text-[#7890A8]/40">
                        0{index + 1}
                      </span>

                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl border ${style.icon}`}
                      >
                        <Icon
                          size={22}
                          strokeWidth={1.7}
                        />
                      </div>

                      <div className="mt-6">
                        <div className="flex items-center justify-between gap-3">

                          <p
                            className={`text-[9px] font-bold uppercase tracking-[0.2em] ${style.text}`}
                          >
                            {feature.tag}
                          </p>

                          <span className="rounded-md border border-[#16324A] px-2 py-1 text-[8px] font-bold uppercase tracking-[0.15em] text-[#7890A8]">
                            {feature.command}
                          </span>
                        </div>

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
              }
            )}

          </div>
        </section>

        {/* Bottom Status */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.72,
          }}
          className="relative mt-8 flex flex-wrap items-center justify-between gap-4 overflow-hidden rounded-2xl border border-[#16324A]/70 bg-[#0B1728]/40 px-5 py-4"
        >
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#00E5FF]/5 to-transparent" />

          <div className="relative flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#A3FF12] opacity-40" />

              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#A3FF12]" />
            </span>

            <span className="text-xs text-[#7890A8]">
              StudyMate AI is ready for your next session.
            </span>
          </div>

          <div className="relative flex items-center gap-4">
            <span className="hidden text-[9px] font-bold uppercase tracking-[0.2em] text-[#7890A8]/60 sm:block">
              CORE // STABLE
            </span>

            <span className="h-1 w-1 rounded-full bg-[#16324A]" />

            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#7890A8]/60">
              SYSTEM // ONLINE
            </span>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;