import { useState, useEffect, useRef } from "react";
import { getToken, getUser } from "../utils/auth";

const API = import.meta.env.VITE_API_URL;

const LEVEL_COLORS = {
  A1: "#a78bfa", A2: "#34d399", B1: "#f472b6", B2: "#fbbf24", C1: "#38bdf8",
};

const LEVEL_TITLES = {
  A1: "Starter", A2: "Elementary", B1: "Intermediate", B2: "Advanced", C1: "Mastery",
};

export default function UserDashboard({ user }) {
  const [open, setOpen]       = useState(false);
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Fetch on open
  useEffect(() => {
    if (!open || !user) return;
    setLoading(true);
    fetch(`${API}/api/progress/dashboard/${user._id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((r) => r.json())
      .then((d) => { setSummary(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [open, user]);

  return (
    <div className="ud-wrap" ref={ref}>
      <button className="ud-trigger nav-btn" onClick={() => setOpen((o) => !o)}>
        Hi, {user?.name?.split(" ")[0]} {open ? "▲" : "▼"}
      </button>

      {open && (
        <div className="ud-dropdown">
          <div className="ud-header">
            <span className="ud-title">My Progress</span>
            <span className="ud-sub">{user?.name}</span>
          </div>

          {loading && (
            <div className="ud-loading">
              <div className="ud-spinner" />
              <span>Loading...</span>
            </div>
          )}

          {!loading && summary.length === 0 && (
            <div className="ud-empty">
              <span>🌱</span>
              <p>No progress yet. Start learning!</p>
            </div>
          )}

          {!loading && summary.map((item) => {
            const color = LEVEL_COLORS[item.level];
            const vocabPct = item.vocabulary.total
              ? Math.round((item.vocabulary.completed / item.vocabulary.total) * 100) : 0;
            const grammarPct = item.grammar.total
              ? Math.round((item.grammar.completed / item.grammar.total) * 100) : 0;
            const overallPct = Math.round((vocabPct + grammarPct) / 2);

            return (
              <div key={item.level} className="ud-level-card">
                <div className="ud-level-top">
                  <div className="ud-level-badge" style={{ background: color + "22", color, borderColor: color + "55" }}>
                    {item.level}
                  </div>
                  <div className="ud-level-info">
                    <span className="ud-level-title">{LEVEL_TITLES[item.level]}</span>
                    <span className="ud-level-pct" style={{ color }}>{overallPct}% complete</span>
                  </div>
                </div>

                {/* Vocab bar */}
                <div className="ud-bar-row">
                  <span className="ud-bar-label">📚 Vocab</span>
                  <div className="ud-bar-track">
                    <div className="ud-bar-fill" style={{ width: `${vocabPct}%`, background: color }} />
                  </div>
                  <span className="ud-bar-count">
                    {item.vocabulary.completed}/{item.vocabulary.total}
                  </span>
                </div>

                {/* Grammar bar */}
                <div className="ud-bar-row">
                  <span className="ud-bar-label">📐 Grammar</span>
                  <div className="ud-bar-track">
                    <div className="ud-bar-fill" style={{ width: `${grammarPct}%`, background: color }} />
                  </div>
                  <span className="ud-bar-count">
                    {item.grammar.completed}/{item.grammar.total}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}