// PracticePage.jsx
import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router";
import { getToken, getUser } from "../utils/auth";

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

function Skeleton({ height = "80px", count = 3 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          height, borderRadius: "var(--radius)",
          background: "rgba(255,255,255,0.05)",
          animation: "pulse 1.5s ease infinite",
          animationDelay: `${i * 0.1}s`,
        }} />
      ))}
    </div>
  );
}

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
    "vocab-meaning":   { label: "📚 Vokabeln",  bg: "#a78bfa22", col: "#a78bfa" },
    "vocab-reverse":   { label: "📚 Vokabeln",  bg: "#a78bfa22", col: "#a78bfa" },
    "vocab-context":   { label: "📝 Kontext",   bg: "#38bdf822", col: "#38bdf8" },
    "vocab-plural":    { label: "🔢 Plural",    bg: "#34d39922", col: "#34d399" },
    "grammar-exercise":{ label: "📐 Grammatik", bg: "#f472b622", col: "#f472b6" },
    "grammar-rule":    { label: "📋 Regel",     bg: "#fbbf2422", col: "#fbbf24" },
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

function ResultScreen({ score, total, color, onRetry, onNewQuiz }) {
  const pct = Math.round((score / total) * 100);
  const grade =
    pct >= 90 ? { label: "Ausgezeichnet! 🏆", sub: "Fantastische Leistung!" } :
    pct >= 75 ? { label: "Sehr gut! 🎉",       sub: "Gut gemacht!" } :
    pct >= 60 ? { label: "Gut! 👍",             sub: "Du lernst gut." } :
    pct >= 40 ? { label: "Weiter üben 💪",      sub: "Du schaffst das!" } :
                { label: "Noch üben 📚",         sub: "Lerne nochmal die Inhalte." };

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
            style={{ transition: "stroke-dasharray 1s ease" }} />
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
        <button className="rs-btn rs-btn-secondary" onClick={onRetry}>🔁 Nochmal versuchen</button>
        <button className="rs-btn rs-btn-primary" style={{ background: color }} onClick={onNewQuiz}>✨ Neues Quiz</button>
      </div>
    </div>
  );
}

function QuizRunner({ questions, color, quizType, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore]               = useState(0);
  const [finished, setFinished]         = useState(false);

  const handleAnswer = (isCorrect) => {
    const newScore = isCorrect ? score + 1 : score;
    if (currentIndex === questions.length - 1) {
      setScore(newScore); setFinished(true);
    } else {
      setScore(newScore); setCurrentIndex(i => i + 1);
    }
  };

  if (finished) {
    return (
      <ResultScreen score={score} total={questions.length} color={color} quizType={quizType}
        onRetry={() => { setCurrentIndex(0); setScore(0); setFinished(false); }}
        onNewQuiz={onBack} />
    );
  }

  return (
    <div>
      <button className="back-btn" onClick={onBack}>← Zurück zur Auswahl</button>
      <QuestionCard question={questions[currentIndex]} index={currentIndex}
        total={questions.length} color={color} onAnswer={handleAnswer} />
    </div>
  );
}

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
      {(activeTab === "vocab" || activeTab === "article") && (
        <div className="qs-section">
          <p className="qs-label">Thema wählen:</p>
          <div className="qs-options">
            <button className={`qs-chip ${selected === "all" ? "qs-chip-active" : ""}`}
              style={selected === "all" ? { borderColor: color, color, background: color + "18" } : {}}
              onClick={() => setSelected("all")}>🌐 Alle Themen</button>
            {topics?.map(t => (
              <button key={t.topic}
                className={`qs-chip ${selected === t.topic ? "qs-chip-active" : ""}`}
                style={selected === t.topic ? { borderColor: color, color, background: color + "18" } : {}}
                onClick={() => setSelected(t.topic)}>{t.icon} {t.topic}</button>
            ))}
          </div>
        </div>
      )}
      {activeTab === "grammar" && (
        <div className="qs-section">
          <p className="qs-label">Grammatikthema wählen:</p>
          <div className="qs-options">
            <button className={`qs-chip ${selected === "all" ? "qs-chip-active" : ""}`}
              style={selected === "all" ? { borderColor: color, color, background: color + "18" } : {}}
              onClick={() => setSelected("all")}>🌐 Alle Themen</button>
            {lessons?.map(l => (
              <button key={l.id}
                className={`qs-chip ${selected === l.id ? "qs-chip-active" : ""}`}
                style={selected === l.id ? { borderColor: color, color, background: color + "18" } : {}}
                onClick={() => setSelected(l.id)}>{l.icon} {l.title}</button>
            ))}
          </div>
        </div>
      )}
      <div className="qs-section">
        <p className="qs-label">Anzahl der Fragen:</p>
        <div className="qs-count-row">
          {countOptions.map(n => (
            <button key={n}
              className={`qs-count-btn ${count === n ? "qs-count-active" : ""}`}
              style={count === n ? { borderColor: color, color, background: color + "18" } : {}}
              onClick={() => setCount(n)}>{n}</button>
          ))}
        </div>
      </div>
      <button className="qs-start-btn" style={{ background: color }} onClick={handleStart}>
        Quiz starten →
      </button>
    </div>
  );
}

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
        onClick={() => onStart(`${API}/api/quiz/${window.location.pathname.split("/")[2]}/mixed?count=${count}`, "mixed")}>
        Quiz starten →
      </button>
    </>
  );
}

// ─── Sentence Check Component ──────────────────────────────────────────────────
function SentenceCheck({ level, color }) {
  const user = getUser();
  const [phase, setPhase]           = useState("idle"); // idle | loading | writing | checking | result | error | locked | ratelimit
  const [sentence, setSentence]     = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult]         = useState(null);
  const [message, setMessage]       = useState("");
  const [checksInfo, setChecksInfo] = useState(null); // { allowed, used, minsLeft }

  const generateNew = async () => {
    setPhase("loading");
    setResult(null);
    setUserAnswer("");
    setSentence(null);

    try {
      const res = await fetch(`${API}/api/sentence/generate/${level}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();

      if (res.status === 403) {
        setMessage(data.message);
        setPhase("locked");
        return;
      }
      if (res.status === 429) {
        setChecksInfo({ allowed: data.allowed, used: data.used, minsLeft: data.minsLeft });
        setMessage(data.message);
        setPhase("ratelimit");
        return;
      }
      if (!res.ok) throw new Error(data.message);

      setSentence({ english: data.english, hint: data.hint });
      setChecksInfo({ allowed: data.allowed, used: data.used });
      setPhase("writing");
    } catch (e) {
      setMessage(e.message || "Something went wrong.");
      setPhase("error");
    }
  };

  const checkAnswer = async () => {
    if (!userAnswer.trim()) return;
    setPhase("checking");

    try {
      const res = await fetch(`${API}/api/sentence/check/${level}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ english: sentence.english, userAnswer }),
      });
      const data = await res.json();

      if (res.status === 429) {
        setChecksInfo({ allowed: data.allowed, used: data.used, minsLeft: data.minsLeft });
        setMessage(data.message);
        setPhase("ratelimit");
        return;
      }
      if (!res.ok) throw new Error(data.message);

      setResult(data);
      setChecksInfo({ allowed: data.allowed, used: data.used });
      setPhase("result");
    } catch (e) {
      setMessage(e.message || "Something went wrong.");
      setPhase("error");
    }
  };

  // ── Idle / start screen ────────────────────────────────────────────────────
  if (phase === "idle") {
    return (
      <div className="sc-wrap">
        <div className="sc-intro">
          <span className="sc-intro-icon">✍️</span>
          <h2 className="sc-intro-title">Sentence Writing Practice</h2>
          <p className="sc-intro-sub">
            An English sentence will be generated based on vocabulary you've learned.
            Write the German translation and get detailed AI feedback on your grammar,
            word order, and Tekamolo structure.
          </p>
          <div className="sc-rules">
            <div className="sc-rule-item">🎯 Checks available = 1 per 10% of level completed</div>
            <div className="sc-rule-item">⏱️ Resets every hour</div>
            <div className="sc-rule-item">📚 Uses vocabulary from levels you've completed</div>
          </div>
          <button className="sc-start-btn" style={{ background: color }} onClick={generateNew}>
            Generate Sentence →
          </button>
        </div>
      </div>
    );
  }

  // ── Loading ────────────────────────────────────────────────────────────────
  if (phase === "loading" || phase === "checking") {
    return (
      <div className="sc-wrap">
        <div className="sc-loading">
          <div className="ql-spinner" style={{ borderTopColor: color, width: "36px", height: "36px", borderWidth: "3px" }} />
          <p>{phase === "loading" ? "Generating your sentence…" : "Checking your answer…"}</p>
        </div>
      </div>
    );
  }

  // ── Locked ─────────────────────────────────────────────────────────────────
  if (phase === "locked") {
    return (
      <div className="sc-wrap">
        <div className="sc-blocked">
          <span className="sc-blocked-icon">🔒</span>
          <h3>Locked</h3>
          <p>{message}</p>
          <div className="sc-progress-hint">
            <div className="sc-hint-bar-track">
              <div className="sc-hint-bar-fill" style={{ width: "0%", background: color }} />
            </div>
            <p>Complete vocabulary and grammar lessons to unlock sentence practice.</p>
          </div>
        </div>
      </div>
    );
  }

  // ── Rate limited ───────────────────────────────────────────────────────────
  if (phase === "ratelimit") {
    return (
      <div className="sc-wrap">
        <div className="sc-blocked">
          <span className="sc-blocked-icon">⏱️</span>
          <h3>Hourly limit reached</h3>
          <p>{message}</p>
          {checksInfo && (
            <div className="sc-checks-info">
              <span style={{ color }}>Used: {checksInfo.used}/{checksInfo.allowed}</span>
              <span>Resets in {checksInfo.minsLeft} min</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────────
  if (phase === "error") {
    return (
      <div className="sc-wrap">
        <div className="sc-blocked">
          <span className="sc-blocked-icon">❌</span>
          <h3>Something went wrong</h3>
          <p>{message}</p>
          <button className="back-btn" onClick={() => setPhase("idle")}>← Try again</button>
        </div>
      </div>
    );
  }

  // ── Writing phase ──────────────────────────────────────────────────────────
  if (phase === "writing") {
    return (
      <div className="sc-wrap">
        {checksInfo && (
          <div className="sc-checks-bar">
            <span>Checks used: </span>
            <div className="sc-checks-dots">
              {Array.from({ length: checksInfo.allowed }, (_, i) => (
                <div key={i} className={`sc-check-dot ${i < checksInfo.used ? "sc-dot-used" : "sc-dot-free"}`}
                  style={i < checksInfo.used ? { background: color } : {}} />
              ))}
            </div>
            <span style={{ color: "var(--muted)", fontSize: "0.8rem" }}>
              {checksInfo.allowed - checksInfo.used} remaining
            </span>
          </div>
        )}

        <div className="sc-sentence-card">
          <div className="sc-sentence-label">Translate to German:</div>
          <div className="sc-sentence-english">{sentence.english}</div>
          {sentence.hint && (
            <div className="sc-hint">💡 Hint: {sentence.hint}</div>
          )}
        </div>

        <div className="sc-answer-wrap">
          <textarea
            className="sc-textarea"
            placeholder="Type your German translation here…"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            rows={3}
          />
          <div className="sc-answer-actions">
            <button className="sc-check-btn" style={{ background: color }}
              onClick={checkAnswer} disabled={!userAnswer.trim()}>
              Check Answer →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Result phase ───────────────────────────────────────────────────────────
  if (phase === "result" && result) {
    const scoreColor = result.score >= 80 ? "#34d399" : result.score >= 50 ? "#fbbf24" : "#f87171";
    return (
      <div className="sc-wrap">
        {/* Score header */}
        <div className="sc-result-header" style={{ borderColor: scoreColor + "44" }}>
          <div className="sc-score-circle" style={{ borderColor: scoreColor }}>
            <span className="sc-score-num" style={{ color: scoreColor }}>{result.score}</span>
            <span className="sc-score-label">/ 100</span>
          </div>
          <div className="sc-result-title-wrap">
            <h3 className="sc-result-title" style={{ color: scoreColor }}>
              {result.correct ? "✅ Correct!" : result.score >= 50 ? "🟡 Close!" : "❌ Needs work"}
            </h3>
            <p className="sc-result-sub">Here's your detailed feedback</p>
          </div>
        </div>

        {/* Your answer vs correct */}
        <div className="sc-comparison">
          <div className="sc-comp-row">
            <span className="sc-comp-label">Your answer:</span>
            <span className="sc-comp-text sc-comp-user">{userAnswer}</span>
          </div>
          <div className="sc-comp-row">
            <span className="sc-comp-label">Suggested answer:</span>
            <span className="sc-comp-text sc-comp-correct" style={{ color: scoreColor }}>{result.correctAnswer}</span>
          </div>
        </div>

        {/* Feedback */}
        <div className="sc-feedback-card">
          <div className="sc-fb-title">📝 Feedback</div>
          <p className="sc-fb-text">{result.feedback}</p>
        </div>

        {/* Word order note */}
        {result.wordOrderNote && (
          <div className="sc-note-card sc-note-order">
            <div className="sc-note-title">📊 Word Order (Tekamolo)</div>
            <p className="sc-note-text">{result.wordOrderNote}</p>
          </div>
        )}

        {/* Grammar note */}
        {result.grammarNote && (
          <div className="sc-note-card sc-note-grammar">
            <div className="sc-note-title">📐 Grammar Note</div>
            <p className="sc-note-text">{result.grammarNote}</p>
          </div>
        )}

        {/* Actions */}
        <div className="sc-result-actions">
          <button className="rs-btn rs-btn-secondary" onClick={() => setPhase("idle")}>
            ← Back
          </button>
          {checksInfo && checksInfo.used < checksInfo.allowed && (
            <button className="rs-btn rs-btn-primary" style={{ background: color }} onClick={generateNew}>
              Next Sentence →
            </button>
          )}
          {checksInfo && checksInfo.used >= checksInfo.allowed && (
            <span className="sc-limit-msg">Hourly limit reached — come back later!</span>
          )}
        </div>
      </div>
    );
  }

  return null;
}

// ─── Tab content ───────────────────────────────────────────────────────────────
function TabContent({ level, color, activeTab }) {
  const [quizUrl, setQuizUrl]         = useState(null);
  const [quizType, setQuizType]       = useState(null);
  const [questions, setQuestions]     = useState(null);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [quizError, setQuizError]     = useState(null);

  const descriptions = {
    vocab:     { icon: "📚", title: "Vokabelquiz",     sub: "Teste dein Wissen der gelernten Wörter — Bedeutungen, Kontext und Pluralformen." },
    grammar:   { icon: "📐", title: "Grammatikquiz",   sub: "Übe die Grammatikregeln und Strukturen aus dem Lernbereich." },
    mixed:     { icon: "🎯", title: "Gemischter Test", sub: "Kombiniertes Quiz aus Vokabeln und Grammatik — der komplette Test." },
    article:   { icon: "🏷️", title: "Artikel-Quiz",    sub: "Welcher Artikel passt — der, die oder das? Übe alle Nomen aus diesem Level." },
    schreiben: { icon: "✍️", title: "Schreiben",        sub: "Practice writing German sentences with AI feedback on grammar and word order." },
  };

  const desc = descriptions[activeTab];

  // Schreiben tab handled separately
  if (activeTab === "schreiben") {
    return <SentenceCheck level={level} color={color} />;
  }

  const startQuiz = async (url, type) => {
    setLoadingQuiz(true); setQuizError(null); setQuestions(null);
    try {
      const r = await fetch(url);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const data = await r.json();
      setQuestions(data.questions); setQuizType(type); setQuizUrl(url);
    } catch (e) {
      setQuizError(e.message);
    } finally {
      setLoadingQuiz(false);
    }
  };

  const resetQuiz = () => { setQuestions(null); setQuizUrl(null); setQuizType(null); setQuizError(null); };

  if (loadingQuiz) return (
    <div className="quiz-loading">
      <div className="ql-spinner" style={{ borderTopColor: color }} />
      <p>Quiz wird geladen…</p>
    </div>
  );

  if (quizError) return (
    <div className="quiz-error">
      <p>❌ Fehler beim Laden: {quizError}</p>
      <button className="back-btn" onClick={resetQuiz}>← Zurück</button>
    </div>
  );

  if (questions) return (
    <QuizRunner questions={questions} color={color} quizType={quizType} onFinish={resetQuiz} onBack={resetQuiz} />
  );

  return (
    <div className="tab-content">
      <div className="tc-header">
        <span className="tc-icon">{desc.icon}</span>
        <div>
          <h2 className="tc-title">{desc.title}</h2>
          <p className="tc-sub">{desc.sub}</p>
        </div>
      </div>
      {activeTab === "mixed" ? (
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

// ─── Practice sub nav ──────────────────────────────────────────────────────────
function PracticeSubNav({ active, onChange, color }) {
  const tabs = [
    { key: "vocab",     icon: "📚", label: "Vokabeln"  },
    { key: "grammar",   icon: "📐", label: "Grammatik" },
    { key: "mixed",     icon: "🎯", label: "Gemischt"  },
    { key: "article",   icon: "🏷️", label: "Artikel"   },
    { key: "schreiben", icon: "✍️", label: "Schreiben" },
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
  const { level }     = useParams();
  const [tab, setTab] = useState("vocab");
  const color = LEVEL_COLORS[level] || "#a78bfa";
  const label = LEVEL_LABELS[level] || level;
  const title = LEVEL_TITLES[level] || label;

  return (
    <section className="content-section">
      <div className="page-hero-row">
        <div className="page-hero">
          <div className="page-hero-level" style={{ color, textShadow: `0 0 60px ${color}50` }}>{level}</div>
          <div className="page-hero-right">
            <h1 className="page-hero-title"><span style={{ color }}>{title}</span></h1>
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