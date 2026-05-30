// VerifyOtpPage.jsx
// frontend/src/pages/VerifyOtpPage.jsx
// Step 2 — enter the 6-digit code from email

import { useState, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router";

function VerifyOtpPage() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const email     = location.state?.email || "";

  // 6 individual digit inputs
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  // Redirect if accessed directly without email
  if (!email) {
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

  const handleDigit = (i, val) => {
    // Accept only digits
    if (!/^\d?$/.test(val)) return;
    const updated = [...digits];
    updated[i] = val;
    setDigits(updated);
    // Auto-advance to next box
    if (val && i < 5) inputRefs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setDigits(pasted.split(""));
      inputRefs.current[5]?.focus();
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = digits.join("");
    if (code.length < 6) { setError("Please enter all 6 digits."); return; }
    setError(""); setLoading(true);
    try {
      const res  = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message); setLoading(false); return; }
      navigate("/reset-password", { state: { email, resetToken: data.resetToken } });
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-card">
        <div className="auth-icon">📬</div>
        <h1>Enter Code</h1>
        <p className="section-text">
          We sent a 6-digit code to <strong>{email}</strong>. It expires in 15 minutes.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="otp-row" onPaste={handlePaste}>
            {digits.map((d, i) => (
              <input
                key={i}
                ref={el => inputRefs.current[i] = el}
                className="otp-box"
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={e => handleDigit(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                autoFocus={i === 0}
              />
            ))}
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? "Verifying…" : "Verify Code"}
          </button>
        </form>

        <p className="section-text">
          Didn't receive it?{" "}
          <Link to="/forgot-password">Resend code</Link>
        </p>
      </div>
    </section>
  );
}

export default VerifyOtpPage;