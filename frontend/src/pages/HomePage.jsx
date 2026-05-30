import { useState } from "react";
import { useNavigate } from "react-router";

const LEVELS = [
  { level: "A1", cls: "level-a1", title: "Starter",       emoji: "🌱" },
  { level: "A2", cls: "level-a2", title: "Elementary",    emoji: "🌿" },
  { level: "B1", cls: "level-b1", title: "Intermediate",  emoji: "🌊" },
  { level: "B2", cls: "level-b2", title: "Advanced",      emoji: "✨" },
  { level: "C1", cls: "level-c1", title: "Mastery",       emoji: "🌌" },
];

const N = LEVELS.length;

function visibleIndices(offset) {
  return [0, 1, 2].map(i => (offset + i) % N);
}

const ILLUSTRATIONS = {
  A1: (
    <svg viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <polygon points="80,18 110,42 50,42" fill="rgba(255,255,255,0.25)" />
      <rect x="55" y="42" width="50" height="35" rx="3" fill="rgba(255,255,255,0.18)" />
      <rect x="72" y="54" width="16" height="23" rx="2" fill="rgba(255,255,255,0.35)" />
      <circle cx="85" cy="66" r="1.5" fill="rgba(255,255,255,0.7)" />
      <rect x="59" y="48" width="10" height="10" rx="1.5" fill="rgba(255,255,255,0.3)" />
      <rect x="91" y="48" width="10" height="10" rx="1.5" fill="rgba(255,255,255,0.3)" />
      <circle cx="28" cy="48" r="7" fill="rgba(255,255,255,0.4)" />
      <line x1="28" y1="55" x2="28" y2="72" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="28" y1="60" x2="18" y2="55" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="28" y1="60" x2="38" y2="53" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="28" y1="72" x2="22" y2="82" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="28" y1="72" x2="34" y2="82" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round"/>
      <rect x="36" y="36" width="34" height="16" rx="8" fill="rgba(255,255,255,0.25)" />
      <polygon points="42,52 38,58 48,52" fill="rgba(255,255,255,0.25)" />
      <text x="53" y="48" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.9)" fontWeight="bold">Hallo!</text>
      <line x1="10" y1="82" x2="150" y2="82" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
      <rect x="128" y="64" width="4" height="18" fill="rgba(255,255,255,0.2)" />
      <circle cx="130" cy="58" r="10" fill="rgba(255,255,255,0.18)" />
    </svg>
  ),
  A2: (
    <svg viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <rect x="20" y="48" width="80" height="30" rx="6" fill="rgba(255,255,255,0.2)" />
      <rect x="20" y="44" width="80" height="10" rx="4" fill="rgba(255,255,255,0.28)" />
      <rect x="28" y="50" width="14" height="12" rx="2" fill="rgba(255,255,255,0.35)" />
      <rect x="48" y="50" width="14" height="12" rx="2" fill="rgba(255,255,255,0.35)" />
      <rect x="68" y="50" width="14" height="12" rx="2" fill="rgba(255,255,255,0.35)" />
      <circle cx="38" cy="79" r="6" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
      <circle cx="82" cy="79" r="6" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
      <line x1="8" y1="85" x2="152" y2="85" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
      <rect x="118" y="52" width="26" height="22" rx="3" fill="rgba(255,255,255,0.22)" />
      <rect x="125" y="48" width="12" height="6" rx="2" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
      <line x1="131" y1="52" x2="131" y2="74" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
      <circle cx="138" cy="28" r="14" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2"/>
      <circle cx="138" cy="28" r="2" fill="rgba(255,255,255,0.5)"/>
      <line x1="138" y1="28" x2="138" y2="18" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round"/>
      <line x1="138" y1="28" x2="145" y2="32" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
      <ellipse cx="35" cy="22" rx="18" ry="8" fill="rgba(255,255,255,0.12)"/>
      <ellipse cx="55" cy="20" rx="12" ry="7" fill="rgba(255,255,255,0.10)"/>
    </svg>
  ),
  B1: (
    <svg viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <rect x="15" y="25" width="58" height="55" rx="4" fill="rgba(255,255,255,0.18)" />
      <rect x="20" y="30" width="48" height="8" rx="2" fill="rgba(255,255,255,0.3)" />
      <rect x="20" y="42" width="22" height="32" rx="2" fill="rgba(255,255,255,0.15)" />
      <rect x="46" y="42" width="22" height="14" rx="2" fill="rgba(255,255,255,0.15)" />
      <rect x="46" y="60" width="22" height="6" rx="1" fill="rgba(255,255,255,0.1)" />
      <rect x="88" y="50" width="58" height="32" rx="2" fill="rgba(255,255,255,0.18)" />
      <rect x="93" y="44" width="4" height="38" fill="rgba(255,255,255,0.2)" />
      <rect x="101" y="46" width="4" height="36" fill="rgba(255,255,255,0.2)" />
      <rect x="109" y="46" width="4" height="36" fill="rgba(255,255,255,0.2)" />
      <rect x="117" y="46" width="4" height="36" fill="rgba(255,255,255,0.2)" />
      <rect x="125" y="44" width="4" height="38" fill="rgba(255,255,255,0.2)" />
      <rect x="133" y="46" width="4" height="36" fill="rgba(255,255,255,0.2)" />
      <polygon points="117,28 88,50 146,50" fill="rgba(255,255,255,0.25)" />
      <line x1="117" y1="10" x2="117" y2="30" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
      <rect x="117" y="10" width="16" height="10" rx="1" fill="rgba(255,255,255,0.3)"/>
      <line x1="10" y1="82" x2="150" y2="82" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"/>
    </svg>
  ),
  B2: (
    <svg viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <rect x="18" y="60" width="14" height="25" rx="2" fill="rgba(255,255,255,0.25)" />
      <rect x="36" y="45" width="14" height="40" rx="2" fill="rgba(255,255,255,0.30)" />
      <rect x="54" y="32" width="14" height="53" rx="2" fill="rgba(255,255,255,0.35)" />
      <rect x="72" y="50" width="14" height="35" rx="2" fill="rgba(255,255,255,0.28)" />
      <line x1="14" y1="85" x2="95" y2="85" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
      <line x1="14" y1="20" x2="14" y2="85" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
      <polyline points="25,65 43,50 61,37 79,55" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M108,15 Q120,28 108,42 Q96,56 108,70 Q120,84 108,95" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
      <path d="M132,15 Q120,28 132,42 Q144,56 132,70 Q120,84 132,95" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
      <line x1="108" y1="24" x2="132" y2="24" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
      <line x1="108" y1="36" x2="132" y2="36" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
      <line x1="108" y1="48" x2="132" y2="48" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
      <line x1="108" y1="60" x2="132" y2="60" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
      <line x1="108" y1="72" x2="132" y2="72" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
      <line x1="108" y1="84" x2="132" y2="84" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
    </svg>
  ),
  C1: (
    <svg viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <path d="M30,35 Q80,28 130,35 L130,80 Q80,74 30,80 Z" fill="rgba(255,255,255,0.12)" />
      <line x1="80" y1="28" x2="80" y2="80" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
      <line x1="38" y1="44" x2="72" y2="43" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
      <line x1="38" y1="51" x2="72" y2="50" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
      <line x1="38" y1="58" x2="72" y2="57" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
      <line x1="38" y1="65" x2="72" y2="64" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
      <line x1="88" y1="43" x2="122" y2="44" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
      <line x1="88" y1="50" x2="122" y2="51" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
      <line x1="88" y1="57" x2="122" y2="58" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
      <line x1="88" y1="64" x2="122" y2="65" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
      <circle cx="20"  cy="18" r="2"   fill="rgba(255,255,255,0.7)"/>
      <circle cx="140" cy="12" r="2.5" fill="rgba(255,255,255,0.7)"/>
      <circle cx="55"  cy="10" r="1.5" fill="rgba(255,255,255,0.5)"/>
      <circle cx="110" cy="8"  r="1.5" fill="rgba(255,255,255,0.5)"/>
      <circle cx="150" cy="30" r="1.5" fill="rgba(255,255,255,0.4)"/>
      <path d="M88,38 Q98,20 112,14 Q106,22 104,32 Q102,38 96,42 Z" fill="rgba(255,255,255,0.3)"/>
      <line x1="96" y1="42" x2="88" y2="56" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"/>
    </svg>
  ),
};

function LevelCard({ level, cls, title, emoji }) {
  const navigate = useNavigate();
  return (
    <div
      className={`card level-card ${cls} level-card-inner`}
      data-level={level}
      onClick={() => navigate(`/mode/${level}`)}
    >
      <div className="level-card-top">
        <span className="level-badge">{level}</span>
        <span className="level-card-emoji">{emoji}</span>
      </div>
      <h2 className="level-card-title">{title}</h2>
      <div className="level-card-illus">
        {ILLUSTRATIONS[level]}
      </div>
    </div>
  );
}

function ArrowBtn({ dir, onClick }) {
  return (
    <button className="slider-arrow" onClick={onClick} aria-label={dir === "left" ? "Previous" : "Next"}>
      {dir === "left" ? "‹" : "›"}
    </button>
  );
}

function HomePage() {
  const [offset, setOffset] = useState(0);
  const [animDir, setAnimDir] = useState(null);

  const go = (dir) => {
    setAnimDir(dir);
    setOffset(o => dir === "next" ? (o + 1) % N : (o - 1 + N) % N);
    setTimeout(() => setAnimDir(null), 400);
  };

  const shown = visibleIndices(offset);

  return (
    <section className="content-section hp-section">
      <div className="hp-hero">
        <h1>
          Learn German.<br />
          <span className="hp-hero-sub">The smart way.</span>
        </h1>
      </div>

      <div className="hp-slider-row">
        <ArrowBtn dir="left"  onClick={() => go("prev")} />
        <div className="hp-cards-grid">
          {shown.map((levelIdx, pos) => (
            <div
              key={`${offset}-${pos}`}
              className={animDir ? (animDir === "next" ? "slide-in-right" : "slide-in-left") : ""}
            >
              <LevelCard {...LEVELS[levelIdx]} />
            </div>
          ))}
        </div>
        <ArrowBtn dir="right" onClick={() => go("next")} />
      </div>

      <div className="hp-dots">
        {LEVELS.map((_, i) => (
          <button
            key={i}
            onClick={() => setOffset(i)}
            className={`hp-dot${offset === i ? " active" : ""}`}
          />
        ))}
      </div>
    </section>
  );
}

export default HomePage;