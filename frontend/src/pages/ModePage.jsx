import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { getToken, getUser } from "../utils/auth";

const API = import.meta.env.VITE_API_URL;

const LEVEL_META = {
  A1: { rank: "Novice",       emoji: "🌱", color: "#f59e0b", glow: "rgba(245,158,11,0.2)" },
  A2: { rank: "Apprentice",   emoji: "🌿", color: "#34d399", glow: "rgba(52,211,153,0.2)"  },
  B1: { rank: "Warrior",      emoji: "🌊", color: "#38bdf8", glow: "rgba(56,189,248,0.2)"  },
  B2: { rank: "Knight",       emoji: "✨", color: "#a78bfa", glow: "rgba(167,139,250,0.2)" },
  C1: { rank: "Grand Master", emoji: "🌌", color: "#f472b6", glow: "rgba(244,114,182,0.2)" },
};

const LearnIllustration = ({ color }) => (
  <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    <path d="M30,35 Q100,25 170,35 L170,85 Q100,76 30,85 Z" fill={color} opacity="0.07" />
    <line x1="100" y1="25" x2="100" y2="85" stroke={color} strokeWidth="1.5" opacity="0.2"/>
    <line x1="42" y1="48" x2="88" y2="46" stroke={color} strokeWidth="1" opacity="0.3"/>
    <line x1="42" y1="57" x2="88" y2="55" stroke={color} strokeWidth="1" opacity="0.3"/>
    <line x1="42" y1="66" x2="88" y2="64" stroke={color} strokeWidth="1" opacity="0.3"/>
    <line x1="42" y1="75" x2="72" y2="73" stroke={color} strokeWidth="1" opacity="0.3"/>
    <line x1="112" y1="46" x2="158" y2="48" stroke={color} strokeWidth="1" opacity="0.3"/>
    <line x1="112" y1="55" x2="158" y2="57" stroke={color} strokeWidth="1" opacity="0.3"/>
    <line x1="112" y1="64" x2="158" y2="66" stroke={color} strokeWidth="1" opacity="0.3"/>
    <line x1="112" y1="73" x2="142" y2="75" stroke={color} strokeWidth="1" opacity="0.3"/>
    <polygon points="162,22 168,22 168,42 165,38 162,42" fill={color} opacity="0.6"/>
    <text x="22" y="28" fontSize="16" fill={color} opacity="0.5" fontWeight="900">A</text>
  </svg>
);

const PracticeIllustration = ({ color }) => (
  <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    <rect x="40" y="15" width="110" height="75" rx="10" fill={color} opacity="0.06" stroke={color} strokeWidth="1" strokeOpacity="0.15"/>
    <text x="95" y="70" fontSize="48" fill={color} opacity="0.25" fontWeight="900" textAnchor="middle">?</text>
    <circle cx="58" cy="32" r="5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5"/>
    <circle cx="58" cy="50" r="5" fill={color} opacity="0.5"/>
    <circle cx="58" cy="68" r="5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5"/>
    <line x1="70" y1="32" x2="135" y2="32" stroke={color} strokeWidth="1.2" opacity="0.25"/>
    <line x1="70" y1="50" x2="128" y2="50" stroke={color} strokeWidth="1.5" opacity="0.45"/>
    <line x1="70" y1="68" x2="132" y2="68" stroke={color} strokeWidth="1.2" opacity="0.25"/>
    <text x="155" y="35" fontSize="16" fill={color} opacity="0.55">★</text>
    <text x="165" y="50" fontSize="11" fill={color} opacity="0.4">★</text>
  </svg>
);

function XpBar({ pct, color }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), 100);
    return () => clearTimeout(t);
  }, [pct]);
  return (
    <div className="rpg-xp-track">
      <div className="rpg-xp-fill" style={{ width: `${width}%`, background: `linear-gradient(90deg, ${color}99, ${color})` }} />
      <div className="rpg-xp-glow" style={{ left: `${width}%`, background: color }} />
    </div>
  );
}

export default function ModePage() {
  const { level }  = useParams();
  const meta       = LEVEL_META[level] || LEVEL_META.A1;
  const { rank, emoji, color, glow } = meta;
  const user       = getUser();

  const [progress, setProgress] = useState(null);

  useEffect(() => {
    if (!user) return;
    fetch(`${API}/api/progress/dashboard/${user._id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then(r => r.json())
      .then(d => {
        const levelData = Array.isArray(d) ? d.find(l => l.level === level) : null;
        setProgress(levelData || null);
      })
      .catch(() => {});
  }, [level, user?._id]);

  const overallPct   = progress?.overallPct || 0;
  const vocabDone    = progress?.vocabulary?.completed || 0;
  const vocabTotal   = progress?.vocabulary?.total || 0;
  const grammarDone  = progress?.grammar?.completed || 0;
  const grammarTotal = progress?.grammar?.total || 0;

  return (
    <section className="rpg-page">

      <div className="rpg-top-border" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />

      {/* ── Header ── */}
      <div className="rpg-header">
        <div className="rpg-title-block">
          <div className="rpg-crest" style={{ borderColor: color + "60", boxShadow: `0 0 40px ${color}30` }}>
            <div className="rpg-crest-inner" style={{ background: `radial-gradient(circle, ${color}20, transparent)` }}>
              <span className="rpg-crest-level" style={{ color, textShadow: `0 0 30px ${color}` }}>{level}</span>
              <span className="rpg-crest-emoji">{emoji}</span>
            </div>
          </div>
          <span className="rpg-rank-solo" style={{ color }}>{rank}</span>
          <Link to="/" className="rpg-back">← Return to Levels</Link>
        </div>
      </div>

      {/* ── XP Progress ── */}
      <div className="rpg-progress-block" style={{ borderColor: color + "25" }}>
        <div className="rpg-progress-top">
          <span className="rpg-progress-label" style={{ color }}>⚡ Quest Progress</span>
          <span className="rpg-progress-pct" style={{ color }}>{overallPct}%</span>
        </div>
        <XpBar pct={overallPct} color={color} />
        <div className="rpg-progress-stats">
          <div className="rpg-stat" style={{ borderColor: color + "30" }}>
            <span className="rpg-stat-icon">📚</span>
            <div className="rpg-stat-info">
              <span className="rpg-stat-value" style={{ color }}>{vocabDone}/{vocabTotal}</span>
              <span className="rpg-stat-label">Vocab</span>
            </div>
          </div>
          <div className="rpg-stat" style={{ borderColor: color + "30" }}>
            <span className="rpg-stat-icon">📐</span>
            <div className="rpg-stat-info">
              <span className="rpg-stat-value" style={{ color }}>{grammarDone}/{grammarTotal}</span>
              <span className="rpg-stat-label">Grammar</span>
            </div>
          </div>
          <div className="rpg-stat" style={{ borderColor: color + "30" }}>
            <span className="rpg-stat-icon">🏆</span>
            <div className="rpg-stat-info">
              <span className="rpg-stat-value" style={{ color }}>{overallPct}%</span>
              <span className="rpg-stat-label">Mastery</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mode cards ── */}
      <div className="rpg-quests-grid">

        <Link to={`/learn/${level}`} className="rpg-quest-link">
          <div className="rpg-mode-card" style={{
            background: `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`,
            borderColor: color + "40",
            boxShadow: `0 8px 32px ${color}20`,
            "--q-color": color,
            "--q-glow": glow,
          }}>
            <div className="rpg-mode-card-ambient" style={{ background: `radial-gradient(ellipse at 85% 15%, ${color}25, transparent 60%)` }} />

            {/* Top row: icon + title side by side */}
            <div className="rpg-mode-top">
              <div className="rpg-mode-icon-wrap" style={{ background: color + "20", borderColor: color + "50" }}>
                <span>📖</span>
              </div>
              <div className="rpg-mode-tag" style={{ background: color + "20", borderColor: color + "50", color }}>LEARN</div>
            </div>

            {/* Illustration */}
            <div className="rpg-mode-illus" style={{ borderColor: color + "15" }}>
              <LearnIllustration color={color} />
            </div>
          </div>
        </Link>

        <Link to={`/practice/${level}`} className="rpg-quest-link">
          <div className="rpg-mode-card" style={{
            background: `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`,
            borderColor: color + "40",
            boxShadow: `0 8px 32px ${color}20`,
            "--q-color": color,
            "--q-glow": glow,
          }}>
            <div className="rpg-mode-card-ambient" style={{ background: `radial-gradient(ellipse at 85% 15%, ${color}25, transparent 60%)` }} />

            <div className="rpg-mode-top">
              <div className="rpg-mode-icon-wrap" style={{ background: color + "20", borderColor: color + "50" }}>
                <span>🎯</span>
              </div>
              <div className="rpg-mode-tag" style={{ background: color + "20", borderColor: color + "50", color }}>PRACTICE</div>
            </div>

            <div className="rpg-mode-illus" style={{ borderColor: color + "15" }}>
              <PracticeIllustration color={color} />
            </div>
          </div>
        </Link>

      </div>

      <div className="rpg-top-border" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />

    </section>
  );
}