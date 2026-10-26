import { BookOpen, FileText, LayoutDashboard, MessageCircle, Trophy } from "lucide-react";
import { NavLink } from "react-router-dom";

const mobileLinks = [
  { to: "/dashboard", label: "Home", icon: LayoutDashboard },
  { to: "/documents", label: "Materials", icon: FileText },
  { to: "/chat", label: "Tutor", icon: MessageCircle },
  { to: "/quiz", label: "Quiz", icon: Trophy },
  { to: "/flashcards", label: "Cards", icon: BookOpen },
];

const Sidebar = () => <nav className="mobile-nav" aria-label="Study navigation">{mobileLinks.map(({to,label,icon:Icon})=><NavLink key={to} to={to} className={({isActive})=>`mobile-nav-link${isActive?" active":""}`}><Icon size={19}/><span>{label}</span></NavLink>)}</nav>;

export default Sidebar;
