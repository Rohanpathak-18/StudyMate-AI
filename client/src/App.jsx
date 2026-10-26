import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Chat from "./pages/Chat";
import Quiz from "./pages/Quiz";
import Flashcards from "./pages/Flashcards";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";
import Landing from "./pages/Landing";

const App = () => {
  return (
    <Routes>

      {/* Public pages */}
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* Protected pages */}
      <Route element={<ProtectedRoute />}>

        <Route element={<AppLayout />}>

          <Route path="/dashboard" element={<Dashboard />} />

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

      </Route>

      <Route
        path="/"
        element={<Landing />}
      />

      {/* Unknown route */}
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
};

export default App;
