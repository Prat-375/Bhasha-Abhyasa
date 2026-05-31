import { Link, useNavigate } from "react-router";
import { logout } from "../utils/auth";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUser(null);
    document.body.setAttribute("data-section", "auth");
    navigate("/login", { replace: true });
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">
          Bhasha Abhyasa
        </Link>

        <div className="nav-right">
          {user ? (
            <>
              <span className="brand-subtitle">Hi, {user.name}</span>
              <button className="nav-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-link">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;