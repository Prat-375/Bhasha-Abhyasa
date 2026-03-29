import { Link } from "react-router";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">
          Bhasha Abhyasa
        </Link>
        <span className="brand-subtitle">Practice. Learn. Speak.</span>
      </div>
    </header>
  );
}

export default Navbar;