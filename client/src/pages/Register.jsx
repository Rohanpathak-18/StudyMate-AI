import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BrainCircuit,
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Sparkles,
  User,
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import useAuthStore from "../store/authStore";
import ThemeSwitcher from "../components/ThemeSwitcher";

const Register = () => {
  const navigate = useNavigate();

  const register = useAuthStore((state) => state.register);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);

    if (result.success) {
      toast.success("Account created successfully!");

      navigate("/dashboard", {
        replace: true,
      });
    } else {
      toast.error(result.message || "Registration failed");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07111F] text-[#F1F7FF]">
     <div className="relative min-h-screen"></div>

        <div className="absolute top-5 right-5 z-50">
        <ThemeSwitcher />
      </div>

      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-180px] top-[-150px] h-[500px] w-[500px] rounded-full bg-[#00E5FF]/[0.04] blur-[130px]" />

        <div className="absolute bottom-[-180px] right-[-100px] h-[550px] w-[550px] rounded-full bg-[#7C3AED]/[0.055] blur-[140px]" />

        <div className="absolute left-[40%] top-[25%] h-80 w-80 rounded-full bg-[#A3FF12]/[0.018] blur-[130px]" />
      </div>

      {/* Grid */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#00E5FF 1px, transparent 1px), linear-gradient(90deg, #00E5FF 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 flex min-h-screen">
        {/* Left */}
        <div className="hidden w-1/2 flex-col justify-between p-10 lg:flex xl:p-14">
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[#00E5FF]/20 bg-[#00E5FF]/[0.07]">
              <BrainCircuit className="text-[#00E5FF]" size={23} />

              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[#A3FF12] shadow-[0_0_12px_#A3FF12]" />
            </div>

            <div>
              <p className="font-bold">
                StudyMate<span className="text-[#00E5FF]"> AI</span>
              </p>

              <p className="text-[9px] uppercase tracking-[0.25em] text-[#7890A8]">
                Intelligent learning
              </p>
            </div>
          </div>

          <div className="max-w-xl">
            <div className="mb-5 flex items-center gap-2">
              <Sparkles size={15} className="text-[#A3FF12]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#A3FF12]">
                Build your knowledge system
              </span>
            </div>

            <h1 className="text-5xl font-bold leading-[1.08] tracking-tight xl:text-6xl">
              Your study.
              <br />
              <span className="bg-gradient-to-r from-[#00E5FF] via-[#8BE9FF] to-[#A3FF12] bg-clip-text text-transparent">
                Your intelligence.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-[#7890A8]">
              Create your StudyMate AI workspace and transform your study
              material into an intelligent, interactive learning experience.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Chat with your own documents",
                "Generate AI-powered quizzes",
                "Create smart revision flashcards",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#A3FF12]/10 text-[#A3FF12]">
                    <Check size={12} />
                  </span>

                  <span className="text-sm text-[#7890A8]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[10px] uppercase tracking-[0.2em] text-[#7890A8]/60">
            STUDYMATE AI // BUILD YOUR KNOWLEDGE
          </p>
        </div>

        {/* Form */}
        <div className="flex w-full items-center justify-center px-5 py-10 lg:w-1/2 lg:border-l lg:border-[#16324A]/60">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="w-full max-w-md"
          >
            {/* Mobile logo */}
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#00E5FF]/20 bg-[#00E5FF]/[0.07]">
                <BrainCircuit className="text-[#00E5FF]" size={21} />

                <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#A3FF12]" />
              </div>

              <p className="font-bold">
                StudyMate<span className="text-[#00E5FF]"> AI</span>
              </p>
            </div>

            <div className="mb-8">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#00E5FF]">
                Create workspace
              </p>

              <h2 className="text-3xl font-bold tracking-tight">
                Start learning differently.
              </h2>

              <p className="mt-2 text-sm text-[#7890A8]">
                Create your account and build your personal AI study space.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="mb-2 block text-xs font-semibold text-[#7890A8]">
                  Full name
                </label>

                <div className="group relative">
                  <User
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7890A8] transition group-focus-within:text-[#00E5FF]"
                  />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    autoComplete="name"
                    className="w-full rounded-xl border border-[#16324A] bg-[#0B1728]/80 py-3.5 pl-11 pr-4 text-sm text-[#F1F7FF] outline-none transition placeholder:text-[#7890A8]/50 focus:border-[#00E5FF]/50 focus:bg-[#0B1728] focus:shadow-[0_0_25px_rgba(0,229,255,0.05)]"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-xs font-semibold text-[#7890A8]">
                  Email address
                </label>

                <div className="group relative">
                  <Mail
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7890A8] transition group-focus-within:text-[#00E5FF]"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full rounded-xl border border-[#16324A] bg-[#0B1728]/80 py-3.5 pl-11 pr-4 text-sm text-[#F1F7FF] outline-none transition placeholder:text-[#7890A8]/50 focus:border-[#00E5FF]/50 focus:bg-[#0B1728] focus:shadow-[0_0_25px_rgba(0,229,255,0.05)]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#7890A8]">
                    Password
                  </label>

                  <span className="text-[10px] text-[#7890A8]/60">
                    6+ characters
                  </span>
                </div>

                <div className="group relative">
                  <Lock
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7890A8] transition group-focus-within:text-[#00E5FF]"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-[#16324A] bg-[#0B1728]/80 py-3.5 pl-11 pr-12 text-sm text-[#F1F7FF] outline-none transition placeholder:text-[#7890A8]/50 focus:border-[#00E5FF]/50 focus:bg-[#0B1728] focus:shadow-[0_0_25px_rgba(0,229,255,0.05)]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7890A8] transition hover:text-[#F1F7FF]"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#00E5FF] py-3.5 text-sm font-bold text-[#07111F] transition hover:shadow-[0_0_35px_rgba(0,229,255,0.2)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#07111F]/30 border-t-[#07111F]" />
                    Creating workspace...
                  </>
                ) : (
                  <>
                    Create my workspace
                    <ArrowRight
                      size={17}
                      className="transition group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 rounded-xl border border-[#16324A]/70 bg-[#0B1728]/40 px-4 py-3">
              <p className="text-[10px] leading-5 text-[#7890A8]">
                By creating your account, you get your own personalized learning
                workspace powered by StudyMate AI.
              </p>
            </div>

            <p className="mt-7 text-center text-sm text-[#7890A8]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#00E5FF] transition hover:text-[#8BE9FF]"
              >
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
