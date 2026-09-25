import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import useAuthStore from "../store/authStore";

const ProtectedRoute = () => {
  const token = useAuthStore(
    (state) => state.token
  );

  const initialized = useAuthStore(
    (state) => state.initialized
  );

  const getMe = useAuthStore(
    (state) => state.getMe
  );


  useEffect(() => {
    if (token && !initialized) {
      getMe();
    }
  }, [token, initialized, getMe]);


  // ----------------------------------------------------------
  // No token -> login
  // ----------------------------------------------------------

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }


  // ----------------------------------------------------------
  // Token exists but we haven't verified it yet
  // ----------------------------------------------------------

  if (!initialized) {
    return (
      <div className="min-h-screen bg-[#07111F] flex items-center justify-center">
        <div className="text-[#00E5FF] text-lg">
          Checking authentication...
        </div>
      </div>
    );
  }


  // ----------------------------------------------------------
  // Authenticated
  // ----------------------------------------------------------

  return <Outlet />;
};

export default ProtectedRoute;