import { useState } from "react";
import { useNavigate, Link } from "react-router";

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", currentLevel: "A1",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res  = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Signup failed"); return; }

      // ── On success: go to login with a success message ──────
      // Do NOT call saveAuth here — user must log in manually
      navigate("/login", {
        state: { message: "Account created! Please log in." },
        replace: true,
      });
    } catch {
      setError("Something went wrong during signup");
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-card">
        <h1>Sign Up</h1>
        <p className="section-text">Create your Bhasha Abhyasa account.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            className="auth-input" type="text" name="name"
            placeholder="Name" value={formData.name} onChange={handleChange}
          />
          <input
            className="auth-input" type="email" name="email"
            placeholder="Email" value={formData.email} onChange={handleChange}
          />
          <input
            className="auth-input" type="password" name="password"
            placeholder="Password" value={formData.password} onChange={handleChange}
          />
          <select
            className="auth-input" name="currentLevel"
            value={formData.currentLevel} onChange={handleChange}
          >
            <option value="A1">A1 — Beginner</option>
            <option value="A2">A2 — Elementary</option>
            <option value="B1">B1 — Intermediate</option>
            <option value="B2">B2 — Upper Intermediate</option>
            <option value="C1">C1 — Advanced</option>
          </select>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="primary-btn">Create Account</button>
        </form>

        <p className="section-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
}

export default SignupPage;