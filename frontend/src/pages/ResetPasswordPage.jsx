// ResetPasswordPage.jsx
// frontend/src/pages/ResetPasswordPage.jsx
// Step 3 — enter new password (hidden, shown with toggle)

import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router";

function EyeIcon({ open }) {
  return open ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

function PasswordField({ placeholder, value, onChange }) {
  const [show, setShow] = useState(false);
  return (
    <div className="password-field-wrap">
      <input
        className="auth-input password-input"
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
      <button
        type="button"
        className="password-toggle"
        onClick={() => setShow(s => !s)}
        tabIndex={-1}
        aria-label={show ? "Hide password" : "Show password"}
      >
        <EyeIcon open={show} />
      </button>
    </div>
  );
}

function ResetPasswordPage() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const email     = location.state?.email || "";
  const resetToken = location.state?.resetToken || "";

  const [password, setPassword]     = useState("");
  const [confirm, setConfirm]       = useState("");
  const [error, setError]           = useState("");
  const [loading, setLoading]       = useState(false);

  if (!email || !resetToken) {
    return (
      <section className="auth-section">
        <div className="auth-card">
          <p className="error-text">Session expired. Please start again.</p>
          <Link to="/forgot-password" className="primary-btn" style={{ display: "block", textAlign: "center", marginTop: "1rem" }}>
            Start again
          </Link>
        </div>
      </section>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 6)    { setError("Password must be at least 6 characters."); return; }
    if (password !== confirm)   { setError("Passwords do not match."); return; }
    setLoading(true);
    try {
      const res  = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, resetToken, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message); setLoading(false); return; }
      navigate("/login", {
        state: { message: "Password changed! Please log in with your new password." },
        replace: true,
      });
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-card">
        <div className="auth-icon">🔒</div>
        <h1>New Password</h1>
        <p className="section-text">Choose a strong new password for your account.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <PasswordField
            placeholder="New password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <PasswordField
            placeholder="Re-enter new password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
          />

          {/* Live match indicator */}
          {confirm && (
            <p className={`pw-match-hint ${password === confirm ? "pw-match" : "pw-no-match"}`}>
              {password === confirm ? "✓ Passwords match" : "✗ Passwords do not match"}
            </p>
          )}

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? "Saving…" : "Set New Password"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default ResetPasswordPage;