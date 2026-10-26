import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, FileText, MessageCircle, Sparkles, Trophy, Upload, WandSparkles } from "lucide-react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";
import api from "../services/api";

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);
  const [stats, setStats] = useState({ documents: 0, conversations: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/dashboard/stats").then(({ data }) => {
      if (data?.success) setStats({ documents: Number(data.stats?.documents || 0), conversations: Number(data.stats?.conversations || 0) });
    }).catch((error) => console.error("DASHBOARD STATS ERROR:", error.response?.data || error.message)).finally(() => setLoading(false));
  }, []);

  const actions = [
    { icon: FileText, title: "My materials", text: "Add notes and build your personal study library.", to: "/documents", tint: "lavender", action: "Open library" },
    { icon: MessageCircle, title: "Ask the AI tutor", text: "Talk through a tough concept with your material as context.", to: "/chat", tint: "blue", action: "Ask a question" },
    { icon: Trophy, title: "Practice quiz", text: "Check what you know with questions made for your course.", to: "/quiz", tint: "peach", action: "Start practicing" },
    { icon: BookOpen, title: "Flashcards", text: "Review key ideas in a quick, focused session.", to: "/flashcards", tint: "mint", action: "Review cards" },
  ];

  return <div className="study-page dashboard-page">
    <section className="dashboard-hero">
      <div className="dashboard-hero-copy">
        <span className="eyebrow-pill"><Sparkles size={14}/> Your personal study companion</span>
        <h1>Master any subject<br/><span>with AI guidance.</span></h1>
        <p>Hi{user?.name ? `, ${user.name}` : " there"}. Turn your study materials into clear explanations, focused practice, and progress you can see.</p>
        <div className="hero-actions"><Link className="button-primary button-large" to="/documents"><Upload size={17}/> Add study material</Link><Link className="button-secondary button-large" to="/chat">Talk to your tutor <ArrowRight size={16}/></Link></div>
        <div className="dashboard-proof"><span><span className="proof-dot"/> Your workspace is ready</span><span>Study at your own pace</span></div>
      </div>
      <div className="dashboard-art" aria-hidden="true"><div className="art-glow"/><div className="art-orbit art-orbit-a"/><div className="art-orbit art-orbit-b"/><div className="art-core"><WandSparkles size={46}/></div><div className="art-note note-top"><span className="mini-icon"><FileText size={15}/></span><span><b>Your notes</b><small>Ready to explore</small></span></div><div className="art-note note-bottom"><span className="mini-icon mini-icon-warm"><Sparkles size={15}/></span><span><b>Keep learning</b><small>One step at a time</small></span></div></div>
    </section>

    <section className="dashboard-summary" aria-label="Study overview">
      <div className="summary-intro"><span className="section-kicker">Your study space</span><h2>A good place to begin</h2><p>Your learning tools are ready whenever you are.</p></div>
      <div className="summary-stats"><div><span className="stat-icon lavender"><FileText size={18}/></span><span><small>Study materials</small><b>{loading ? "—" : stats.documents}</b></span></div><div><span className="stat-icon blue"><MessageCircle size={18}/></span><span><small>Tutor conversations</small><b>{loading ? "—" : stats.conversations}</b></span></div></div>
    </section>

    <section className="dashboard-tools"><div className="section-title-row"><div><span className="section-kicker">Your learning toolkit</span><h2>Choose what helps today</h2></div><Link to="/progress" className="text-link">View your progress <ArrowRight size={15}/></Link></div><div className="dashboard-tool-grid">{actions.map(({icon: Icon,title,text,to,tint,action})=><Link className="dashboard-tool-card" to={to} key={title}><span className={`tool-icon ${tint}`}><Icon size={20}/></span><h3>{title}</h3><p>{text}</p><span className="tool-card-link">{action}<ArrowRight size={15}/></span></Link>)}</div></section>
    <section className="dashboard-bottom"><span className="bottom-sparkle"><Sparkles size={18}/></span><div><b>Small steps make strong progress.</b><p>Pick one topic, spend a few minutes, and build from there.</p></div><Link className="text-link" to="/progress">See progress <ArrowRight size={15}/></Link></section>
  </div>;
};

export default Dashboard;
