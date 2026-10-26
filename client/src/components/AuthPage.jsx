import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, Eye, EyeOff, FileText, LockKeyhole, Mail, MessageCircle, Sparkles, Trophy, UserRound } from "lucide-react";
import toast from "react-hot-toast";
import useAuthStore from "../store/authStore";

const AuthPage = ({ mode }) => {
  const isRegister = mode === "register";
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const login = useAuthStore((state) => state.login);
  const register = useAuthStore((state) => state.register);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: searchParams.get("email") || "", password: "" });
  const [existingAccount, setExistingAccount] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isRegister && !form.name.trim()) return toast.error("Enter your name to continue.");
    if (!form.email.trim() || !form.password) return toast.error("Enter your email and password.");
    if (isRegister && form.password.length < 6) return toast.error("Your password must be at least 6 characters.");
    setLoading(true);
    setExistingAccount(false);
    const result = isRegister
      ? await register({ name: form.name, email: form.email, password: form.password })
      : await login({ email: form.email, password: form.password });
    setLoading(false);
    if (!result.success) {
      if (isRegister && result.status === 409) {
        setExistingAccount(true);
        toast.error("An account already uses this email. Sign in to continue.");
        return;
      }
      toast.error(result.message || (isRegister ? "Could not create your account." : "Could not sign you in."));
      return;
    }
    toast.success(isRegister ? "Your study space is ready!" : "Welcome back!");
    navigate("/dashboard", { replace: true });
  };

  return <main className="auth-screen">
    <Link to="/" className="auth-back"><ArrowLeft size={15}/> Back to StudyMate</Link>
    <div className="auth-layout">
      <section className="auth-story">
        <Link to="/" className="brand-lockup"><span className="brand-mark"><img src="/logo-symbol.png" alt="" /></span><span>StudyMate <b>AI</b></span></Link>
        <div className="auth-story-copy"><span className="eyebrow-pill"><Sparkles size={14}/> Learning, made personal</span><h1>Make room for<br/><span>understanding.</span></h1><p>Your notes, an AI tutor, and tools to help the things you learn stay with you.</p>
          <div className="auth-benefits"><span><FileText size={16}/> Learn from your materials</span><span><MessageCircle size={16}/> Ask questions as you go</span><span><Trophy size={16}/> Build confidence with practice</span></div>
          <div className="auth-note"><span className="auth-note-mark"><BookOpen size={17}/></span><div><b>A calmer way to study</b><p>Everything you need for your next learning session, together.</p></div></div>
        </div>
        <span className="auth-footnote">A personal study space that grows with you.</span>
      </section>

      <section className="auth-form-side">
        <div className="auth-card">
          <span className="auth-mobile-brand"><span className="brand-mark"><img src="/logo-symbol.png" alt="" /></span>StudyMate <b>AI</b></span>
          <span className="section-kicker">{isRegister ? "START LEARNING" : "WELCOME BACK"}</span>
          <h2>{isRegister ? "Create your account" : "Good to see you again"}</h2>
          <p className="auth-subtitle">{isRegister ? "Set up your personal study space in a moment." : "Sign in and pick up where your learning left off."}</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {isRegister && <label className="auth-field"><span>Your name</span><div><UserRound size={17}/><input autoComplete="name" name="name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} placeholder="How should we call you?" required/></div></label>}
            <label className="auth-field"><span>Email address</span><div><Mail size={17}/><input type="email" autoComplete="email" name="email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} placeholder="you@example.com" required/></div></label>
            {existingAccount && <div className="account-exists-message" role="alert"><span>This email already has a StudyMate account.</span><Link to={`/login?email=${encodeURIComponent(form.email.trim())}`}>Sign in with this email <ArrowRight size={14}/></Link></div>}
            <label className="auth-field"><span className="auth-field-heading">Password {isRegister && <small>At least 6 characters</small>}</span><div><LockKeyhole size={17}/><input type={showPassword?"text":"password"} autoComplete={isRegister?"new-password":"current-password"} name="password" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} placeholder={isRegister?"Create a password":"Your password"} minLength={isRegister?6:undefined} required/><button type="button" className="password-toggle" onClick={()=>setShowPassword((value)=>!value)} aria-label={showPassword?"Hide password":"Show password"}>{showPassword?<EyeOff size={17}/>:<Eye size={17}/>}</button></div></label>
            <button className="button-primary auth-submit" type="submit" disabled={loading}>{loading?(isRegister?"Creating your account…":"Signing you in…"):(isRegister?"Create my study space":"Sign in to StudyMate")} {!loading&&<ArrowRight size={17}/>}</button>
          </form>
          <div className="auth-switch">{isRegister?"Already have an account?":"New to StudyMate?"} <Link to={isRegister?"/login":"/register"}>{isRegister?"Sign in":"Create a free account"}</Link></div>
          <div className="auth-security"><span><Sparkles size={14}/></span>Your personal study materials stay in your account.</div>
        </div>
      </section>
    </div>
  </main>;
};

export default AuthPage;
