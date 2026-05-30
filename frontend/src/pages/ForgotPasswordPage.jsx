// ForgotPasswordPage.jsx
// frontend/src/pages/ForgotPasswordPage.jsx
// Step 1 — enter email, receive OTP

import { useState } from "react";
import { useNavigate, Link } from "react-router";

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail]     = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res  = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message); setLoading(false); return; }
      // Go to OTP verification, carry email forward
      navigate("/verify-otp", { state: { email } });
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-card">
        <div className="auth-icon">🔑</div>
        <h1>Forgot Password</h1>
        <p className="section-text">
          Enter your registered email and we'll send you a 6-digit code.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            className="auth-input" type="email" placeholder="Email address"
            value={email} onChange={e => setEmail(e.target.value)} required
          />
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? "Sending…" : "Send Code"}
          </button>
        </form>

        <p className="section-text">
          <Link to="/login">← Back to Login</Link>
        </p>
      </div>
    </section>
  );
}

export default ForgotPasswordPage;