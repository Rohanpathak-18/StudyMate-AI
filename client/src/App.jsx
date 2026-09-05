import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Chat from "./pages/Chat";
import Quiz from "./pages/Quiz";
import Flashcards from "./pages/Flashcards";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";

import { useEffect } from "react";
import useAuthStore from "./store/authStore";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const token = useAuthStore((state) => state.token);
  const initialized = useAuthStore(
    (state) => state.initialized
  );
  const getMe = useAuthStore(
    (state) => state.getMe
  );

  useEffect(() => {
    if (token) {
      getMe();
    } else {
      useAuthStore.setState({
        initialized: true,
      });
    }
  }, [token, getMe]);

  if (!initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07111F] text-[#00E5FF]">
        Loading StudyMate AI...
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/documents"
          element={<Documents />}
        />

        <Route
          path="/chat"
          element={<Chat />}
        />

        <Route
          path="/quiz"
          element={<Quiz />}
        />

        <Route
          path="/flashcards"
          element={<Flashcards />}
        />

        <Route
          path="/progress"
          element={<Progress />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />
      </Route>

      <Route
        path="/"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />

      <Route
        path="*"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />
    </Routes>
  );
}

export default App;