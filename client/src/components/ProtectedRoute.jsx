import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";

const ProtectedRoute = () => {
  const token = useAuthStore(
    (state) => state.token
  );

  const initialized = useAuthStore(
    (state) => state.initialized
  );

  // Wait until authentication restoration finishes.
  if (!initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07111F] text-[#F1F7FF]">
        <div className="text-sm text-[#7890A8]">
          Checking authentication...
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;