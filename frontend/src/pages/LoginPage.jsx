import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { saveAuth } from "../utils/auth";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      saveAuth(data);
      navigate("/");
    } catch (err) {
      setError("Something went wrong during login");
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-card">
        <h1>Login</h1>
        <p className="section-text">Welcome to Bhasha Abhyasa.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            className="auth-input"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            className="auth-input"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="primary-btn">
            Login
          </button>
        </form>

        <p className="section-text">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;