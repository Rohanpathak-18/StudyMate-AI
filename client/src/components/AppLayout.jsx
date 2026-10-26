import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const AppLayout = () => {
  return (
    <div
      className="
        min-h-screen
        bg-[var(--bg)]
        text-[var(--text)]
        transition-colors
        duration-200
      "
    >
      <Navbar />
      <main className="app-main"><Outlet /></main>
      <Sidebar />
    </div>
  );
};

export default AppLayout;
