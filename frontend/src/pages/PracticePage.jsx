// PracticePage.jsx
// Quiz-based practice — questions generated from vocab + grammar learned in LearnPage.
// Three modes: Vocabulary Quiz | Grammar Quiz | Mixed Challenge

import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router";

const API = import.meta.env.VITE_API_URL;

const LEVEL_COLORS = {
  A1: "#a78bfa", A2: "#34d399", B1: "#f472b6", B2: "#fbbf24", C1: "#38bdf8",
};
const LEVEL_LABELS = {
  A1: "Beginner", A2: "Elementary", B1: "Intermediate", B2: "Upper Intermediate", C1: "Advanced",
};
const LEVEL_TITLES = {
  A1: "Starter", A2: "Elementary", B1: "Intermediate", B2: "Advanced", C1: "Mastery",
};

// ─── Fetch hook ────────────────────────────────────────────────────────────────
function useFetch(url) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const load = useCallback(() => {
    if (!url) return;
    setLoading(true); setData(null); setError(null);
    fetch(url)
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(d => { setData(d); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, [url]);

  useEffect(() => { load(); }, [load]);

  return { data, loading, error, reload: load };
}

// ─── Skeleton ──────────────────────────────────────────────────────────────────
function Skeleton({ height = "80px", count = 3 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          height,
          borderRadius: "var(--radius)",
          background: "rgba(255,255,255,0.05)",
          animation: "pulse 1.5s ease infinite",
          animationDelay: `${i * 0.1}s`,
        }} />
      ))}
    </div>
  );
}

// ─── Progress bar ──────────────────────────────────────────────────────────────
function ProgressBar({ current, total, color }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="quiz-progress">
      <div className="qp-track">
        <div className="qp-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="qp-label">{current} / {total}</span>
    </div>
  );
}

// ─── Single question card ──────────────────────────────────────────────────────
function QuestionCard({ question, index, total, color, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (optIndex) => {
    if (revealed) return;
    setSelected(optIndex);
    setRevealed(true);
  };

  const isCorrect = selected === question.answer;

  const handleNext = () => {
    onAnswer(isCorrect);
    setSelected(null);
    setRevealed(false);
  };

  const typeBadge = {
    "vocab-meaning":  { label: "📚 Vokabeln",  bg: "#a78bfa22", col: "#a78bfa" },
    "vocab-reverse":  { label: "📚 Vokabeln",  bg: "#a78bfa22", col: "#a78bfa" },
    "vocab-context":  { label: "📝 Kontext",   bg: "#38bdf822", col: "#38bdf8" },
    "vocab-plural":   { label: "🔢 Plural",    bg: "#34d39922", col: "#34d399" },
    "grammar-exercise":{ label: "📐 Grammatik",bg: "#f472b622", col: "#f472b6" },
    "grammar-rule":   { label: "📋 Regel",     bg: "#fbbf2422", col: "#fbbf24" },
    "article":         { label: "🏷️ Artikel",   bg: "#34d39922", col: "#34d399" },
  }[question.type] || { label: "❓ Quiz", bg: color + "22", col: color };

  return (
    <div className="question-card-wrap">
      <ProgressBar current={index + 1} total={total} color={color} />

      <div className="qcard">
        <div className="qcard-top">
          <span className="qcard-badge" style={{ background: typeBadge.bg, color: typeBadge.col }}>
            {typeBadge.label}
          </span>
          <span className="qcard-count">Frage {index + 1}</span>
        </div>

        <p className="qcard-question">{question.question}</p>

        <div className={`qcard-options${question.type === "article" ? " article-opts" : ""}`}>
          {question.options.map((opt, oi) => {
            let cls = "qcard-opt";
            if (revealed) {
              if (oi === question.answer) cls += " qopt-correct";
              else if (oi === selected)   cls += " qopt-wrong";
              else                        cls += " qopt-dim";
            } else if (selected === oi)  cls += " qopt-selected";

            return (
              <button key={oi} className={cls} onClick={() => handleSelect(oi)}>
                <span className="qopt-letter"
                  style={revealed && oi === question.answer ? { background: "#34d399", color: "#fff" } : {}}>
                  {["A","B","C","D"][oi]}
                </span>
                <span className="qopt-text">{opt}</span>
                {revealed && oi === question.answer && <span className="qopt-tick">✓</span>}
                {revealed && oi === selected && oi !== question.answer && <span className="qopt-cross">✗</span>}
              </button>
            );
          })}
        </div>

        {revealed && (
          <div className={`qcard-explanation ${isCorrect ? "exp-correct" : "exp-wrong"}`}>
            <span className="exp-icon">{isCorrect ? "🎉" : "💡"}</span>
            <span className="exp-text">{question.explanation}</span>
          </div>
        )}

        {revealed && (
          <button className="qcard-next-btn" style={{ background: color }} onClick={handleNext}>
            {index === total - 1 ? "Ergebnis anzeigen →" : "Weiter →"}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Results screen ────────────────────────────────────────────────────────────
function ResultScreen({ score, total, color, quizType, onRetry, onNewQuiz }) {
  const pct = Math.round((score / total) * 100);
  const grade =
    pct >= 90 ? { label: "Ausgezeichnet! 🏆", sub: "Fantastische Leistung!" } :
    pct >= 75 ? { label: "Sehr gut! 🎉",       sub: "Gut gemacht!" } :
    pct >= 60 ? { label: "Gut! 👍",             sub: "Du lernst gut." } :
    pct >= 40 ? { label: "Weiter üben 💪",      sub: "Du schaffst das!" } :
                { label: "Noch üben 📚",         sub: "Lerne nochmal die Inhalte." };

  // Circular progress
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const dash = (pct / 100) * circumference;

  return (
    <div className="result-screen">
      <div className="rs-circle-wrap">
        <svg width="140" height="140" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r={radius} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="12" />
          <circle cx="70" cy="70" r={radius} fill="none" stroke={color} strokeWidth="12"
            strokeDasharray={`${dash} ${circumference}`}
            strokeDashoffset={circumference / 4}
            strokeLinecap="round"
            style={{ transition: "stroke-dasharray 1s ease" }}
          />
        </svg>
        <div className="rs-circle-text">
          <div className="rs-pct" style={{ color }}>{pct}%</div>
          <div className="rs-fraction">{score}/{total}</div>
        </div>
      </div>

      <h2 className="rs-grade">{grade.label}</h2>
      <p className="rs-sub">{grade.sub}</p>

      <div className="rs-breakdown">
        <div className="rs-stat rs-stat-correct">
          <span className="rs-stat-num">{score}</span>
          <span className="rs-stat-label">Richtig</span>
        </div>
        <div className="rs-stat rs-stat-wrong">
          <span className="rs-stat-num">{total - score}</span>
          <span className="rs-stat-label">Falsch</span>
        </div>
        <div className="rs-stat">
          <span className="rs-stat-num">{total}</span>
          <span className="rs-stat-label">Gesamt</span>
        </div>
      </div>

      <div className="rs-actions">
        <button className="rs-btn rs-btn-secondary" onClick={onRetry}>
          🔁 Nochmal versuchen
        </button>
        <button className="rs-btn rs-btn-primary" style={{ background: color }} onClick={onNewQuiz}>
          ✨ Neues Quiz
        </button>
      </div>
    </div>
  );
}

// ─── Quiz runner ───────────────────────────────────────────────────────────────
function QuizRunner({ questions, color, quizType, onFinish, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (isCorrect) => {
    const newScore = isCorrect ? score + 1 : score;
    if (currentIndex === questions.length - 1) {
      setScore(newScore);
      setFinished(true);
    } else {
      setScore(newScore);
      setCurrentIndex(i => i + 1);
    }
  };

  if (finished) {
    return (
      <ResultScreen
        score={score}
        total={questions.length}
        color={color}
        quizType={quizType}
        onRetry={() => { setCurrentIndex(0); setScore(0); setFinished(false); }}
        onNewQuiz={onBack}
      />
    );
  }

  return (
    <div>
      <button className="back-btn" onClick={onBack}>← Zurück zur Auswahl</button>
      <QuestionCard
        question={questions[currentIndex]}
        index={currentIndex}
        total={questions.length}
        color={color}
        onAnswer={handleAnswer}
      />
    </div>
  );
}

// ─── Quiz config selector ──────────────────────────────────────────────────────
function QuizSetup({ level, color, activeTab, onStartQuiz }) {
  const topicsUrl  = activeTab === "vocab"   ? `${API}/api/quiz/${level}/topics`  : null;
  const lessonsUrl = activeTab === "grammar" ? `${API}/api/quiz/${level}/lessons` : null;

  const { data: topics  } = useFetch(topicsUrl);
  const { data: lessons } = useFetch(lessonsUrl);

  const [selected, setSelected] = useState("all");
  const [count, setCount]       = useState(10);

  const countOptions = [5, 10, 15, 20];

  const handleStart = () => {
    let url = "";
    if (activeTab === "vocab") {
      url = `${API}/api/quiz/${level}/vocab?topic=${encodeURIComponent(selected)}&count=${count}`;
    } else if (activeTab === "grammar") {
      url = `${API}/api/quiz/${level}/grammar?lesson=${encodeURIComponent(selected)}&count=${count}`;
    } else if (activeTab === "article") {
      url = `${API}/api/quiz/${level}/article?topic=${encodeURIComponent(selected)}&count=${count}`;
    } else {
      url = `${API}/api/quiz/${level}/mixed?count=${count}`;
    }
    onStartQuiz(url, activeTab);
  };

  return (
    <div className="quiz-setup">
      <h3 className="qs-title">Quiz konfigurieren</h3>

      {/* Topic / Lesson selector */}
      {(activeTab === "vocab" || activeTab === "article") && (
        <div className="qs-section">
          <p className="qs-label">Thema wählen:</p>
          <div className="qs-options">
            <button
              className={`qs-chip ${selected === "all" ? "qs-chip-active" : ""}`}
              style={selected === "all" ? { borderColor: color, color, background: color + "18" } : {}}
              onClick={() => setSelected("all")}>
              🌐 Alle Themen
            </button>
            {topics?.map(t => (
              <button
                key={t.topic}
                className={`qs-chip ${selected === t.topic ? "qs-chip-active" : ""}`}
                style={selected === t.topic ? { borderColor: color, color, background: color + "18" } : {}}
                onClick={() => setSelected(t.topic)}>
                {t.icon} {t.topic}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab === "grammar" && (
        <div className="qs-section">
          <p className="qs-label">Grammatikthema wählen:</p>
          <div className="qs-options">
            <button
              className={`qs-chip ${selected === "all" ? "qs-chip-active" : ""}`}
              style={selected === "all" ? { borderColor: color, color, background: color + "18" } : {}}
              onClick={() => setSelected("all")}>
              🌐 Alle Themen
            </button>
            {lessons?.map(l => (
              <button
                key={l.id}
                className={`qs-chip ${selected === l.id ? "qs-chip-active" : ""}`}
                style={selected === l.id ? { borderColor: color, color, background: color + "18" } : {}}
                onClick={() => setSelected(l.id)}>
                {l.icon} {l.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Question count */}
      <div className="qs-section">
        <p className="qs-label">Anzahl der Fragen:</p>
        <div className="qs-count-row">
          {countOptions.map(n => (
            <button
              key={n}
              className={`qs-count-btn ${count === n ? "qs-count-active" : ""}`}
              style={count === n ? { borderColor: color, color, background: color + "18" } : {}}
              onClick={() => setCount(n)}>
              {n}
            </button>
          ))}
        </div>
      </div>

      <button className="qs-start-btn" style={{ background: color }} onClick={handleStart}>
        Quiz starten →
      </button>
    </div>
  );
}

// ─── Tab content ───────────────────────────────────────────────────────────────
function TabContent({ level, color, activeTab }) {
  const [quizUrl, setQuizUrl]     = useState(null);
  const [quizType, setQuizType]   = useState(null);
  const [questions, setQuestions] = useState(null);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [quizError, setQuizError] = useState(null);

  const descriptions = {
    vocab:   { icon: "📚", title: "Vokabelquiz", sub: "Teste dein Wissen der gelernten Wörter — Bedeutungen, Kontext und Pluralformen." },
    grammar: { icon: "📐", title: "Grammatikquiz", sub: "Übe die Grammatikregeln und Strukturen aus dem Lernbereich." },
    mixed:   { icon: "🎯", title: "Gemischter Test", sub: "Kombiniertes Quiz aus Vokabeln und Grammatik — der komplette Test." },
    article: { icon: "🏷️", title: "Artikel-Quiz",    sub: "Welcher Artikel passt — der, die oder das? Übe alle Nomen aus diesem Level." },
  };

  const desc = descriptions[activeTab];

  const startQuiz = async (url, type) => {
    setLoadingQuiz(true);
    setQuizError(null);
    setQuestions(null);
    try {
      const r = await fetch(url);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const data = await r.json();
      setQuestions(data.questions);
      setQuizType(type);
      setQuizUrl(url);
    } catch (e) {
      setQuizError(e.message);
    } finally {
      setLoadingQuiz(false);
    }
  };

  const resetQuiz = () => {
    setQuestions(null);
    setQuizUrl(null);
    setQuizType(null);
    setQuizError(null);
  };

  if (loadingQuiz) {
    return (
      <div className="quiz-loading">
        <div className="ql-spinner" style={{ borderTopColor: color }} />
        <p>Quiz wird geladen…</p>
      </div>
    );
  }

  if (quizError) {
    return (
      <div className="quiz-error">
        <p>❌ Fehler beim Laden: {quizError}</p>
        <button className="back-btn" onClick={resetQuiz}>← Zurück</button>
      </div>
    );
  }

  if (questions) {
    return (
      <QuizRunner
        questions={questions}
        color={color}
        quizType={quizType}
        onFinish={resetQuiz}
        onBack={resetQuiz}
      />
    );
  }

  return (
    <div className="tab-content">
      <div className="tc-header">
        <span className="tc-icon">{desc.icon}</span>
        <div>
          <h2 className="tc-title">{desc.title}</h2>
          <p className="tc-sub">{desc.sub}</p>
        </div>
      </div>

      {activeTab === "article" ? (
        <QuizSetup level={level} color={color} activeTab={activeTab} onStartQuiz={startQuiz} />
      ) : activeTab === "mixed" ? (
        <div className="quiz-setup">
          <h3 className="qs-title">Quiz konfigurieren</h3>
          <div className="qs-section">
            <p className="qs-label">Anzahl der Fragen:</p>
            <MixedCountPicker color={color} onStart={startQuiz} />
          </div>
        </div>
      ) : (
        <QuizSetup level={level} color={color} activeTab={activeTab} onStartQuiz={startQuiz} />
      )}
    </div>
  );
}

// Small helper for mixed quiz count picker
function MixedCountPicker({ color, onStart }) {
  const [count, setCount] = useState(15);
  return (
    <>
      <div className="qs-count-row">
        {[10, 15, 20, 25].map(n => (
          <button key={n}
            className={`qs-count-btn ${count === n ? "qs-count-active" : ""}`}
            style={count === n ? { borderColor: color, color, background: color + "18" } : {}}
            onClick={() => setCount(n)}>{n}</button>
        ))}
      </div>
      <button className="qs-start-btn" style={{ background: color }}
        onClick={() => onStart(`${import.meta.env.VITE_API_URL}/api/quiz/${window.location.pathname.split("/")[2]}/mixed?count=${count}`, "mixed")}>
        Quiz starten →
      </button>
    </>
  );
}

// ─── Practice sub nav ──────────────────────────────────────────────────────────
function PracticeSubNav({ active, onChange, color }) {
  const tabs = [
    { key: "vocab",   icon: "📚", label: "Vokabeln" },
    { key: "grammar", icon: "📐", label: "Grammatik" },
    { key: "mixed",   icon: "🎯", label: "Gemischt" },
    { key: "article", icon: "🏷️", label: "Artikel" },
  ];
  return (
    <div className="sub-nav">
      {tabs.map(t => (
        <button key={t.key}
          className={`sub-nav-btn ${active === t.key ? "sub-nav-active" : ""}`}
          style={active === t.key ? { background: color + "22", borderColor: color, color } : {}}
          onClick={() => onChange(t.key)}>
          {t.icon} {t.label}
        </button>
      ))}
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
function PracticePage() {
  const { level }       = useParams();
  const [tab, setTab]   = useState("vocab");
  const color = LEVEL_COLORS[level] || "#a78bfa";
  const label = LEVEL_LABELS[level] || level;
  const title = LEVEL_TITLES[level] || label;

  return (
    <section className="content-section">

      <div className="page-hero-row">
        <div className="page-hero">
          <div className="page-hero-level" style={{ color, textShadow: `0 0 60px ${color}50` }}>{level}</div>
          <div className="page-hero-right">
            <h1 className="page-hero-title">
              <span style={{ color }}>{title}</span>
            </h1>
            <p className="page-hero-sub">Choose a quiz to test your knowledge.</p>
          </div>
        </div>
        <Link to={`/mode/${level}`} className="back-pill">← Back</Link>
      </div>

      <PracticeSubNav active={tab} onChange={(t) => setTab(t)} color={color} />

      <TabContent key={tab} level={level} color={color} activeTab={tab} />
    </section>
  );
}

export default PracticePage;