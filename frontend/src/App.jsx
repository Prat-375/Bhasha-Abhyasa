import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import HomePage            from "./pages/HomePage";
import ModePage            from "./pages/ModePage";
import LearnPage           from "./pages/LearnPage";
import PracticePage        from "./pages/PracticePage";
import LoginPage           from "./pages/LoginPage";
import SignupPage          from "./pages/SignupPage";
import ForgotPasswordPage  from "./pages/ForgotPasswordPage";
import VerifyOtpPage       from "./pages/VerifyOtpPage";
import ResetPasswordPage   from "./pages/ResetPasswordPage";
import Navbar              from "./components/Navbar";
import ProtectedRoute      from "./components/ProtectedRoute";
import { useRouteBackground } from "./hooks/useRouteBackground";
import { getUser } from "./utils/auth";
import "./routeBackgrounds.css";

function App() {
  useRouteBackground();
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/health`).catch(() => {});
  }, []);

  return (
    <div className="app-shell">
      <Navbar user={user} setUser={setUser} />
      <main className="page-container">
        <Routes>
          {/* Public */}
          <Route path="/"                 element={<HomePage />} />
          <Route path="/login"            element={<LoginPage setUser={setUser} />} />
          <Route path="/signup"           element={<SignupPage />} />
          <Route path="/forgot-password"  element={<ForgotPasswordPage />} />
          <Route path="/verify-otp"       element={<VerifyOtpPage />} />
          <Route path="/reset-password"   element={<ResetPasswordPage />} />

          {/* Protected */}
          <Route path="/mode/:level"      element={<ProtectedRoute><ModePage /></ProtectedRoute>} />
          <Route path="/learn/:level"     element={<ProtectedRoute><LearnPage /></ProtectedRoute>} />
          <Route path="/practice/:level"  element={<ProtectedRoute><PracticePage /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;