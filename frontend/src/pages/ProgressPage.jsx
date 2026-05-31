import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getToken, getUser } from "../utils/auth";

const API = import.meta.env.VITE_API_URL;

const LEVEL_COLORS = {
  A1: "#a78bfa", A2: "#34d399", B1: "#f472b6", B2: "#fbbf24", C1: "#38bdf8",
};
const LEVEL_TITLES = {
  A1: "Starter", A2: "Elementary", B1: "Intermediate", B2: "Advanced", C1: "Mastery",
};
const LEVEL_ORDER = ["A1", "A2", "B1", "B2", "C1"];

function CircleProgress({ pct, color, size = 80 }) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="8" />
      <circle cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={color} strokeWidth="8"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        style={{ transition: "stroke-dasharray 0.6s ease" }}
      />
    </svg>
  );
}

function ProgressBar({ pct, color }) {
  return (
    <div className="pr-bar-track">
      <div className="pr-bar-fill" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

function LevelProgressView({ data, level }) {
  const color = LEVEL_COLORS[level];
  const vocabPct = data.vocabulary.total > 0
    ? Math.round((data.vocabulary.completed / data.vocabulary.total) * 100) : 0;
  const grammarPct = data.grammar.total > 0
    ? Math.round((data.grammar.completed / data.grammar.total) * 100) : 0;

  return (
    <div className="pr-level-view">
      {/* Hero */}
      <div className="pr-hero" style={{ borderColor: color + "33" }}>
        <div className="pr-hero-left">
          <div className="pr-circle-wrap">
            <CircleProgress pct={data.overallPct} color={color} size={100} />
            <div className="pr-circle-center">
              <span className="pr-circle-pct" style={{ color }}>{data.overallPct}%</span>
              <span className="pr-circle-label">done</span>
            </div>
          </div>
          <div className="pr-hero-info">
            <div className="pr-level-badge" style={{ background: color + "22", color, borderColor: color + "55" }}>
              {level}
            </div>
            <h2 className="pr-level-title">{LEVEL_TITLES[level]}</h2>
            <p className="pr-level-sub">
              {data.vocabulary.completed + data.grammar.completed} of{" "}
              {data.vocabulary.total + data.grammar.total} sections complete
            </p>
          </div>
        </div>
      </div>

      {/* Vocab card */}
      <div className="pr-section-card">
        <div className="pr-section-header">
          <span className="pr-section-icon">📚</span>
          <div className="pr-section-info">
            <span className="pr-section-title">Vocabulary</span>
            <span className="pr-section-sub">{data.vocabulary.completed} of {data.vocabulary.total} topics completed</span>
          </div>
          <span className="pr-section-pct" style={{ color }}>{vocabPct}%</span>
        </div>
        <ProgressBar pct={vocabPct} color={color} />

        <div className="pr-lessons-grid">
          {Array.from({ length: data.vocabulary.total }, (_, i) => {
            const done = i < data.vocabulary.completed;
            const current = i === data.vocabulary.completed;
            return (
              <div key={i} className={`pr-lesson-pill ${done ? "pr-pill-done" : current ? "pr-pill-current" : "pr-pill-locked"}`}
                style={done ? { borderColor: color + "66", background: color + "18" } : {}}>
                {done ? "✅" : current ? "▶️" : "🔒"} Topic {i + 1}
              </div>
            );
          })}
        </div>
      </div>

      {/* Grammar card */}
      <div className="pr-section-card">
        <div className="pr-section-header">
          <span className="pr-section-icon">📐</span>
          <div className="pr-section-info">
            <span className="pr-section-title">Grammar</span>
            <span className="pr-section-sub">{data.grammar.completed} of {data.grammar.total} lessons completed</span>
          </div>
          <span className="pr-section-pct" style={{ color }}>{grammarPct}%</span>
        </div>
        <ProgressBar pct={grammarPct} color={color} />

        <div className="pr-lessons-grid">
          {Array.from({ length: data.grammar.total }, (_, i) => {
            const done = i < data.grammar.completed;
            const current = i === data.grammar.completed;
            return (
              <div key={i} className={`pr-lesson-pill ${done ? "pr-pill-done" : current ? "pr-pill-current" : "pr-pill-locked"}`}
                style={done ? { borderColor: color + "66", background: color + "18" } : {}}>
                {done ? "✅" : current ? "▶️" : "🔒"} Lesson {i + 1}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function ProgressPage() {
  const user = getUser();
  const navigate = useNavigate();
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeLevel, setActiveLevel] = useState("A1");

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    fetch(`${API}/api/progress/dashboard/${user._id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((r) => r.json())
      .then((d) => {
        const data = Array.isArray(d) ? d : [];
        setSummary(data);
        // Default to first started level sorted by order
        if (data.length > 0) {
          const first = LEVEL_ORDER.find((l) => data.some((s) => s.level === l));
          if (first) setActiveLevel(first);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const activeData = summary.find((s) => s.level === activeLevel);

  return (
    <section className="content-section">
      {/* Page header */}
      <div className="page-hero-row">
        <div className="page-hero">
          <div className="page-hero-right" style={{ borderLeft: "none", paddingLeft: 0 }}>
            <h1 className="page-hero-title">Progress Report</h1>
            <p className="page-hero-sub">Track your learning across all levels.</p>
          </div>
        </div>
        <button className="back-pill" onClick={() => navigate(-1)}>← Back</button>
      </div>

      {loading && (
        <div style={{ display: "flex", justifyContent: "center", padding: "3rem", color: "var(--muted)" }}>
          Loading...
        </div>
      )}

      {!loading && summary.length === 0 && (
        <div className="pr-empty">
          <span>🌱</span>
          <h2>No progress yet</h2>
          <p>Start learning to see your progress here.</p>
          <button className="primary-btn" onClick={() => navigate("/")}>Start Learning</button>
        </div>
      )}

      {!loading && summary.length > 0 && (
        <>
          {/* Level tabs navbar */}
          <div className="pr-level-nav">
            {LEVEL_ORDER.filter((l) => summary.some((s) => s.level === l)).map((level) => {
              const color = LEVEL_COLORS[level];
              const isActive = activeLevel === level;
              return (
                <button key={level}
                  className={`pr-level-tab ${isActive ? "pr-level-tab-active" : ""}`}
                  style={isActive ? { borderBottomColor: color, color } : {}}
                  onClick={() => setActiveLevel(level)}
                >
                  <span className="pr-tab-level">{level}</span>
                  <span className="pr-tab-title">{LEVEL_TITLES[level]}</span>
                </button>
              );
            })}
          </div>

          {/* Level content */}
          {activeData && <LevelProgressView data={activeData} level={activeLevel} />}
        </>
      )}
    </section>
  );
}