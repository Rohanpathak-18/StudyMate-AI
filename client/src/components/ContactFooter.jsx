import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CONTACT_EMAIL = "rohanpathak9813@gmail.com";
const CONTACT_PHONE = "6392129011";

const ContactFooter = () => {
  const handleContactSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`StudyMate contact from ${form.get("name")}`);
    const body = encodeURIComponent(
      `Name: ${form.get("name")}\nEmail: ${form.get("email")}\n\n${form.get("message")}`
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <footer className="landing-footer" id="contact">
      <div className="landing-footer-content">
        <div className="footer-contact-info">
          <div className="footer-brand">
            <Link to="/" className="brand-lockup">
              <span className="brand-mark"><img src="/logo-symbol.png" alt="" /></span>
              <span>StudyMate <b>AI</b></span>
            </Link>
            <span>Study with clarity. Grow with confidence.</span>
          </div>
          <div className="footer-contact-details">
            <h2>Contact us</h2>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <a href={`tel:${CONTACT_PHONE}`}>{CONTACT_PHONE}</a>
          </div>
          <nav aria-label="Footer navigation" className="footer-links">
            <a href="/#how-it-works">How it works</a>
            <a href="/#study-tools">Study tools</a>
            <Link to="/login">Log in</Link>
            <Link to="/register">Get started</Link>
          </nav>
        </div>
        <form className="footer-contact-form" onSubmit={handleContactSubmit}>
          <h2>Send us a message</h2>
          <label>
            Your name
            <input name="name" type="text" autoComplete="name" placeholder="Name" required />
          </label>
          <label>
            Your email
            <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
          </label>
          <label>
            Message
            <textarea name="message" rows="4" placeholder="How can we help?" required />
          </label>
          <button className="button-primary" type="submit">Send message <ArrowRight size={16} /></button>
          <p>Your email app will open with your message ready to send.</p>
        </form>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} StudyMate AI</span>
        <span className="footer-credit">Designed with love ❤️ by Rohan</span>
      </div>
    </footer>
  );
};

export default ContactFooter;
