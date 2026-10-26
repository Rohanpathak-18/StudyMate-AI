import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Check, FileText, MessageCircle, Sparkles, Trophy } from "lucide-react";

const tools = [
  { icon: MessageCircle, title: "Your AI tutor", text: "Ask questions and get clear answers grounded in your own study material.", image: "/images/tutor-study.svg", alt: "A study document and a helpful tutor chat" },
  { icon: Trophy, title: "Smart practice", text: "Build quick quizzes from your notes and see what you already know.", image: "/images/quiz-study.svg", alt: "A sample quiz with a completed answer" },
  { icon: BookOpen, title: "Better revision", text: "Turn long documents into focused flashcards you can review anywhere.", image: "/images/flashcards-study.svg", alt: "A stack of illustrated revision cards" },
];

const Landing = () => (
  <div className="landing-page min-h-screen overflow-hidden bg-[var(--bg)] text-[var(--text)]">
    <header className="landing-nav">
      <Link to="/" className="brand-lockup">
        <span className="brand-mark"><img src="/logo-symbol.png" alt="" /></span>
        <span>StudyMate <b>AI</b></span>
      </Link>
      <nav aria-label="Main navigation" className="landing-links">
        <a href="#how-it-works">How it works</a>
        <a href="#study-tools">Study tools</a>
      </nav>
      <div className="landing-actions">
        <Link className="login-link" to="/login">Log in</Link>
        <Link className="button-primary" to="/register">Get started <ArrowRight size={16} /></Link>
      </div>
    </header>

    <main>
      <section className="landing-hero">
        <span className="eyebrow-pill"><Sparkles size={14} /> AI-powered study companion</span>
        <h1>Master any subject<br /><span>with AI guidance</span></h1>
        <p>Make your notes work harder. Get a personal tutor, smart quizzes, and focused revision, all built around the material you’re learning.</p>
        <div className="hero-actions">
          <Link className="button-primary button-large" to="/register">Start learning free <ArrowRight size={17} /></Link>
          <a className="button-secondary button-large" href="#how-it-works">Explore the platform</a>
        </div>

        <div className="study-preview" aria-label="StudyMate learning workspace preview">
          <div className="preview-sidebar">
            <span className="preview-logo"><img src="/logo-symbol.png" alt="" /></span>
            <span className="preview-nav active"><FileText size={15} /> My materials</span>
            <span className="preview-nav"><MessageCircle size={15} /> AI tutor</span>
            <span className="preview-nav"><Trophy size={15} /> Practice quiz</span>
            <span className="preview-nav"><BookOpen size={15} /> Flashcards</span>
          </div>
          <div className="preview-content">
            <div className="preview-topline"><span>YOUR STUDY SPACE</span><span className="preview-avatar">S</span></div>
            <div className="preview-welcome"><div><span className="preview-label">A little progress adds up</span><h2>What are we learning today?</h2><p>Pick up where you left off or add a new subject.</p></div><img className="study-preview-image" src="/images/hero-study.svg" alt="A student learning with StudyMate AI" /></div>
            <div className="preview-cards">
              <div className="preview-card"><span className="preview-icon purple"><FileText size={16}/></span><b>Your materials</b><small>Keep your notes in one place</small></div>
              <div className="preview-card"><span className="preview-icon peach"><Trophy size={16}/></span><b>Practice a topic</b><small>Learn it by testing yourself</small></div>
              <div className="preview-card"><span className="preview-icon blue"><MessageCircle size={16}/></span><b>Ask your tutor</b><small>Get help with tricky ideas</small></div>
            </div>
          </div>
        </div>
        <div className="preview-caption"><span className="caption-dot"/> One calm place for everything you study</div>
      </section>

      <section id="how-it-works" className="how-section">
        <div className="section-heading"><span className="section-kicker">A simpler way to study</span><h2>From your material to real understanding</h2><p>Bring your study resources together and use them to learn actively.</p></div>
        <div className="how-steps">
          <article><span className="step-number">01</span><h3>Add your material</h3><p>Upload class notes and documents to create a personal study library.</p></article>
          <article><span className="step-number">02</span><h3>Learn your way</h3><p>Ask your AI tutor to explain ideas using the material you shared.</p></article>
          <article><span className="step-number">03</span><h3>Practice and remember</h3><p>Check your understanding with generated quizzes and flashcards.</p></article>
        </div>
      </section>

      <section id="study-tools" className="tools-section">
        <div className="section-heading"><span className="section-kicker">Made for focused learning</span><h2>Your study toolkit, all together</h2></div>
        <div className="tool-cards">{tools.map(({icon: Icon, title, text, image, alt}) => <article className="tool-card" key={title}><img className="tool-art" src={image} alt={alt} loading="lazy"/><span className="tool-icon"><Icon size={20}/></span><h3>{title}</h3><p>{text}</p><span className="tool-check"><Check size={15}/> Built around your materials</span></article>)}</div>
      </section>

      <section className="landing-cta"><div><span className="section-kicker">Your next study session starts here</span><h2>Make learning feel more manageable.</h2><p>Bring your materials. We’ll help you take it from there.</p></div><Link className="button-primary button-large" to="/register">Create your free account <ArrowRight size={17}/></Link></section>
    </main>
    <footer className="landing-footer"><div className="footer-brand"><Link to="/" className="brand-lockup"><span className="brand-mark"><img src="/logo-symbol.png" alt="" /></span><span>StudyMate <b>AI</b></span></Link><span>Study with clarity. Grow with confidence.</span></div><div className="footer-links"><a href="#how-it-works">How it works</a><a href="#study-tools">Study tools</a><Link to="/login">Log in</Link><Link to="/register">Get started</Link></div><span className="footer-credit">Designed with love ❤️ by Rohan Pathak</span></footer>
  </div>
);

export default Landing;
