import { Link, useParams } from "react-router";

const LEVEL_META = {
  A1: { title: "Starter",      emoji: "🌱", color: "#f59e0b" },
  A2: { title: "Elementary",   emoji: "🌿", color: "#34d399" },
  B1: { title: "Intermediate", emoji: "🌊", color: "#38bdf8" },
  B2: { title: "Advanced",     emoji: "✨", color: "#a78bfa" },
  C1: { title: "Mastery",      emoji: "🌌", color: "#f472b6" },
};

// SVG illustrations — colour passed as prop since it's level-specific
const LearnIllustration = ({ color }) => (
  <svg viewBox="0 0 220 120" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    <path d="M40,40 Q110,30 180,40 L180,95 Q110,86 40,95 Z" fill="rgba(255,255,255,0.08)" />
    <line x1="110" y1="30" x2="110" y2="95" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
    <line x1="52" y1="52" x2="100" y2="50" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
    <line x1="52" y1="62" x2="100" y2="60" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
    <line x1="52" y1="72" x2="100" y2="70" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
    <line x1="52" y1="82" x2="80"  y2="80" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
    <line x1="118" y1="50" x2="168" y2="52" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
    <line x1="118" y1="60" x2="168" y2="62" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
    <line x1="118" y1="70" x2="168" y2="72" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
    <line x1="118" y1="80" x2="148" y2="82" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
    <polygon points="170,28 178,28 178,52 174,47 170,52" fill={color} opacity="0.7"/>
    <text x="30"  y="28" fontSize="14" fill={color} opacity="0.6" fontWeight="bold">A</text>
    <text x="185" y="35" fontSize="11" fill="rgba(255,255,255,0.35)" fontWeight="bold">B</text>
    <text x="15"  y="75" fontSize="9"  fill="rgba(255,255,255,0.25)" fontWeight="bold">C</text>
  </svg>
);

const PracticeIllustration = ({ color }) => (
  <svg viewBox="0 0 220 120" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
    <rect x="30" y="15" width="120" height="90" rx="10" fill="rgba(255,255,255,0.07)" />
    <text x="90" y="78" fontSize="48" fill={color} opacity="0.45" fontWeight="900" textAnchor="middle">?</text>
    <circle cx="48" cy="35" r="5" fill="rgba(255,255,255,0.12)" stroke={color} strokeWidth="1.5" opacity="0.7"/>
    <circle cx="48" cy="53" r="5" fill={color} opacity="0.55"/>
    <circle cx="48" cy="71" r="5" fill="rgba(255,255,255,0.12)" stroke={color} strokeWidth="1.5" opacity="0.7"/>
    <circle cx="48" cy="89" r="5" fill="rgba(255,255,255,0.12)" stroke={color} strokeWidth="1.5" opacity="0.7"/>
    <line x1="60" y1="35" x2="135" y2="35" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
    <line x1="60" y1="53" x2="120" y2="53" stroke={color} strokeWidth="1.5" opacity="0.5"/>
    <line x1="60" y1="71" x2="130" y2="71" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
    <line x1="60" y1="89" x2="110" y2="89" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
    <text x="170" y="38" fontSize="16" fill={color} opacity="0.7">★</text>
    <text x="185" y="53" fontSize="12" fill={color} opacity="0.5">★</text>
    <text x="162" y="58" fontSize="10" fill={color} opacity="0.4">★</text>
    <rect x="168" y="70" width="8" height="35" rx="2" transform="rotate(-35 172 87)" fill="rgba(255,255,255,0.22)"/>
    <polygon points="160,100 168,94 164,106" fill={color} opacity="0.5"/>
  </svg>
);

function ModePage() {
  const { level } = useParams();
  const { color, emoji, title } = LEVEL_META[level] || { title: level, emoji: "📚", color: "#a78bfa" };

  // CSS variables that can't be done in a class (dynamic per level)
  const cardBorder     = `1.5px solid ${color}30`;
  const cardBorderHover = `${color}65`;
  const cardGlow       = `0 20px 50px ${color}1a`;
  const badgeBg        = `${color}18`;
  const badgeBorder    = `1px solid ${color}40`;

  return (
    <section className="content-section mode-page">

      {/* Topbar: hero left + back button right */}
      <div className="mode-topbar">
        <div className="mode-hero">
          <div className="mode-level-code" style={{ color, textShadow: `0 0 40px ${color}50` }}>
            {level}
          </div>
          <div className="mode-level-divider">
            <div className="mode-level-title">{emoji} {title}</div>
            <div className="mode-level-sub">Choose your mode</div>
          </div>
        </div>
        <Link to="/" className="back-pill">← All Levels</Link>
      </div>

      {/* Mode cards */}
      <div className="mode-cards-grid">

        {/* Learn */}
        <Link to={`/learn/${level}`} className="mode-card-link">
          <div
            className="mode-card-box"
            style={{ border: cardBorder }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = cardBorderHover; e.currentTarget.style.boxShadow = cardGlow; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = `${color}30`;    e.currentTarget.style.boxShadow = "none"; }}
          >
            <div>
              <div className="mode-card-badge" style={{ background: badgeBg, border: badgeBorder }}>
                <span>📖</span>
                <span className="mode-card-badge-text" style={{ color }}>LEARN</span>
              </div>
              <p className="mode-card-desc">Vocabulary, grammar lessons and structured content.</p>
            </div>
            <div className="mode-card-illus">
              <LearnIllustration color={color} />
            </div>
          </div>
        </Link>

        {/* Practice */}
        <Link to={`/practice/${level}`} className="mode-card-link">
          <div
            className="mode-card-box"
            style={{ border: cardBorder }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = cardBorderHover; e.currentTarget.style.boxShadow = cardGlow; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = `${color}30`;    e.currentTarget.style.boxShadow = "none"; }}
          >
            <div>
              <div className="mode-card-badge" style={{ background: badgeBg, border: badgeBorder }}>
                <span>🎯</span>
                <span className="mode-card-badge-text" style={{ color }}>PRACTICE</span>
              </div>
              <p className="mode-card-desc">Vocabulary drills, grammar quizzes and article practice.</p>
            </div>
            <div className="mode-card-illus">
              <PracticeIllustration color={color} />
            </div>
          </div>
        </Link>

      </div>
    </section>
  );
}

export default ModePage;