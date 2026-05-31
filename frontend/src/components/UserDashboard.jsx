import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { getToken } from "../utils/auth";

const API = import.meta.env.VITE_API_URL;

export default function UserDashboard({ user }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const goToProgress = () => {
    setOpen(false);
    navigate("/progress");
  };

  return (
    <div className="ud-wrap" ref={ref}>
      <button className="ud-trigger nav-btn" onClick={() => setOpen((o) => !o)}>
        Hi, {user?.name?.split(" ")[0]} {open ? "▲" : "▼"}
      </button>

      {open && (
        <div className="ud-dropdown">
          <div className="ud-header">
            <span className="ud-title">{user?.name}</span>
            <span className="ud-sub">{user?.email}</span>
          </div>

          <div className="ud-menu">
            <button className="ud-menu-item" onClick={goToProgress}>
              <span className="ud-menu-icon">📊</span>
              <span>Progress Report</span>
              <span className="ud-menu-arrow">→</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}