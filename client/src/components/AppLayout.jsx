import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import ContactFooter from "./ContactFooter";

const AppLayout = () => {
  return (
    <div
      className="app-shell
        min-h-screen
        bg-[var(--bg)]
        text-[var(--text)]
        transition-colors
        duration-200
      "
    >
      <Navbar />
      <main className="app-main"><Outlet /></main>
      <ContactFooter showContactForm={false} />
      <Sidebar />
    </div>
  );
};

export default AppLayout;
