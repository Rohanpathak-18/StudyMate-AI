import { BrainCircuit, BookOpen, FileText, LayoutDashboard, LogOut, MessageCircle, Trophy, UserRound } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import ThemeSwitcher from "./ThemeSwitcher";

const links = [
  { to: "/dashboard", label: "Home", icon: LayoutDashboard },
  { to: "/documents", label: "My materials", icon: FileText },
  { to: "/chat", label: "AI tutor", icon: MessageCircle },
  { to: "/quiz", label: "Practice", icon: Trophy },
  { to: "/flashcards", label: "Flashcards", icon: BookOpen },
];

const Navbar = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return <header className="app-header">
    <Link to="/dashboard" className="brand-lockup"><span className="brand-mark"><BrainCircuit size={20}/></span><span>StudyMate <b>AI</b></span></Link>
    <nav className="app-nav" aria-label="Study navigation">{links.map(({to,label})=><NavLink key={to} to={to} className={({isActive})=>`app-nav-link${isActive?" active":""}`}>{label}</NavLink>)}</nav>
    <div className="app-header-actions"><span className="app-greeting">Hi, {user?.name?.split(" ")[0] || "Learner"}</span><ThemeSwitcher/><button className="icon-button logout-button" type="button" aria-label="Log out" title="Log out" onClick={handleLogout}><LogOut size={17}/></button><Link to="/profile" className="profile-avatar" aria-label="Your profile">{user?.name?.trim()?.[0]?.toUpperCase() || <UserRound size={17}/>}</Link></div>
  </header>;
};

export default Navbar;
