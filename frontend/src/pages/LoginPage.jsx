import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router";
import { saveAuth } from "../utils/auth";

function LoginPage({ setUser }) {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError]       = useState("");

  const successMessage = location.state?.message;
  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res  = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Login failed"); return; }
      saveAuth(data);
      setUser(data.user); // fixed typo
      navigate(from, { replace: true });
    } catch {
      setError("Something went wrong during login");
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-card">
        <h1>Login</h1>
        <p className="section-text">Welcome to Bhasha Abhyasa.</p>

        {successMessage && (
          <p className="auth-success-msg">{successMessage}</p>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            className="auth-input" type="email" name="email"
            placeholder="Email" value={formData.email} onChange={handleChange}
          />
          <input
            className="auth-input" type="password" name="password"
            placeholder="Password" value={formData.password} onChange={handleChange}
          />
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="primary-btn">Login</button>
        </form>

        <div className="auth-footer-row">
          <p className="section-text">
            New here? <Link to="/signup">Create an account</Link>
          </p>
          <p className="section-text">
            <Link to="/forgot-password">Forgot password?</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;