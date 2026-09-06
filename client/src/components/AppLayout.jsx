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
      <Sidebar />

      <div className="lg:pl-64">
        <Navbar />

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;