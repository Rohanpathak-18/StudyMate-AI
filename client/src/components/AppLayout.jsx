import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-[#07111F] text-[#F1F7FF]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
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