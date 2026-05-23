// LearnPage.jsx
// All level data imported from a single file — allLevelModules.js
// Supports A1, A2, B1, B2 with the same gamified flashcard + quiz engine.

import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { LEVEL_MODULES, LEVEL_META } from "../data/allLevelModules";

// ─── Confetti burst ───────────────────────────────────────────────────────────
function Confetti({ active }) {
  if (!active) return null;
  const pieces = Array.from({ length: 22 }, (_, i) => i);
  return (
    <div className="confetti-wrap" aria-hidden="true">
      {pieces.map((i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 0.5}s`,
            background: ["#a78bfa","#34d399","#fbbf24","#f472b6","#38bdf8","#fb923c"][i % 6],
            width: `${6 + Math.random() * 8}px`,
            height: `${6 + Math.random() * 8}px`,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          }}
        />
      ))}
    </div>
  );
}

// ─── XP Toast ─────────────────────────────────────────────────────────────────
function XPToast({ xp, visible }) {
  return (
    <div className={`xp-toast ${visible ? "xp-toast-show" : ""}`}>
      +{xp} XP 🎉
    </div>
  );
}

// ─── Flashcard Lesson ─────────────────────────────────────────────────────────
function FlashcardLesson({ lesson, color, glow, onComplete }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [seen, setSeen] = useState(new Set());
  const [done, setDone] = useState(false);
  const [direction, setDirection] = useState(null);
  const cardRef = useRef(null);

  const card = lesson.cards[index];
  const progress = ((index) / lesson.cards.length) * 100;

  const advance = (dir) => {
    setDirection(dir);
    setSeen((s) => new Set([...s, index]));
    setTimeout(() => {
      setDirection(null);
      setFlipped(false);
      if (index + 1 >= lesson.cards.length) {
        setDone(true);
      } else {
        setIndex(index + 1);
      }
    }, 300);
  };

  if (done) {
    return (
      <div className="fc-complete">
        <div className="fc-complete-emoji">🎊</div>
        <h2>Lesson complete!</h2>
        <p>{lesson.cards.length} cards reviewed</p>
        <button className="fc-next-btn" style={{ background: color }} onClick={onComplete}>
          Continue →
        </button>
      </div>
    );
  }

  return (
    <div className="fc-wrap">
      <div className="fc-progress-row">
        <span className="fc-counter">{index + 1} / {lesson.cards.length}</span>
        <div className="fc-progress-track">
          <div className="fc-progress-fill" style={{ width: `${progress}%`, background: color }} />
        </div>
      </div>

      <div className="fc-hint">Tap the card to reveal</div>

      <div
        ref={cardRef}
        className={`fc-card ${flipped ? "fc-flipped" : ""} ${direction === "right" ? "fc-exit-right" : direction === "left" ? "fc-exit-left" : ""}`}
        style={{ "--card-glow": glow, "--card-color": color }}
        onClick={() => setFlipped(!flipped)}
      >
        <div className="fc-card-inner">
          <div className="fc-card-front">
            <div className="fc-card-tag">German</div>
            <div className="fc-word">{card.front}</div>
            {card.tip && <div className="fc-tip">💡 {card.tip}</div>}
          </div>
          <div className="fc-card-back">
            <div className="fc-card-tag">English</div>
            <div className="fc-word fc-word-back">{card.back}</div>
            <div className="fc-example">"{card.example}"</div>
          </div>
        </div>
      </div>

      <div className={`fc-actions ${!flipped ? "fc-actions-hidden" : ""}`}>
        <button className="fc-btn fc-btn-again" onClick={() => advance("left")}>
          <span>🔁</span> Again
        </button>
        <button className="fc-btn fc-btn-got-it" onClick={() => advance("right")}>
          <span>✓</span> Got it!
        </button>
      </div>
    </div>
  );
}

// ─── Quiz Lesson ──────────────────────────────────────────────────────────────
function QuizLesson({ lesson, color, onComplete }) {
  const [qi, setQi] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [xpVisible, setXpVisible] = useState(false);
  const [finished, setFinished] = useState(false);

  const q = lesson.questions[qi];
  const isCorrect = confirmed && chosen === q.answer;
  const isWrong = confirmed && chosen !== q.answer;

  const handleConfirm = () => {
    if (chosen === null) return;
    setConfirmed(true);
    if (chosen === q.answer) {
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
      setXpVisible(true);
      if (streak + 1 >= 2) setShowConfetti(true);
      setTimeout(() => { setXpVisible(false); setShowConfetti(false); }, 1800);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    setChosen(null);
    setConfirmed(false);
    if (qi + 1 >= lesson.questions.length) {
      setFinished(true);
    } else {
      setQi(qi + 1);
    }
  };

  const pct = Math.round((score / lesson.questions.length) * 100);

  if (finished) {
    return (
      <div className="fc-complete">
        <Confetti active={pct >= 80} />
        <div className="fc-complete-emoji">{pct === 100 ? "🏆" : pct >= 60 ? "🎯" : "💪"}</div>
        <h2>{pct === 100 ? "Perfect score!" : pct >= 60 ? "Well done!" : "Keep practising!"}</h2>
        <div className="quiz-final-score" style={{ color }}>
          {score}/{lesson.questions.length}
        </div>
        <p className="quiz-final-pct">{pct}% correct</p>
        {pct < 60 ? (
          <button className="fc-next-btn" style={{ background: "#6366f1" }} onClick={() => { setQi(0); setChosen(null); setConfirmed(false); setScore(0); setStreak(0); setFinished(false); }}>
            Try Again
          </button>
        ) : (
          <button className="fc-next-btn" style={{ background: color }} onClick={onComplete}>
            Continue →
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="quiz-wrap">
      <Confetti active={showConfetti} />
      <XPToast xp={10} visible={xpVisible} />

      <div className="fc-progress-row">
        <div className="quiz-streak">
          {streak >= 2 && <span className="streak-badge">🔥 {streak} streak!</span>}
        </div>
        <div className="fc-progress-track">
          <div className="fc-progress-fill" style={{ width: `${(qi / lesson.questions.length) * 100}%`, background: color }} />
        </div>
        <span className="fc-counter">{qi + 1}/{lesson.questions.length}</span>
      </div>

      <div className={`quiz-card ${confirmed ? (isCorrect ? "quiz-card-correct" : "quiz-card-wrong") : ""}`}>
        <div className="quiz-q">{q.q}</div>
        <div className="quiz-options">
          {q.options.map((opt, oi) => {
            let cls = "quiz-opt";
            if (confirmed) {
              if (oi === q.answer) cls += " quiz-opt-correct";
              else if (chosen === oi && oi !== q.answer) cls += " quiz-opt-wrong";
              else cls += " quiz-opt-dim";
            } else if (chosen === oi) {
              cls += " quiz-opt-chosen";
            }
            return (
              <button key={oi} className={cls} onClick={() => !confirmed && setChosen(oi)}>
                <span className="quiz-opt-letter">{["A","B","C","D"][oi]}</span>
                {opt}
              </button>
            );
          })}
        </div>

        {confirmed && (
          <div className={`quiz-explain ${isCorrect ? "quiz-explain-correct" : "quiz-explain-wrong"}`}>
            <span>{isCorrect ? "✓ Correct! " : "✗ Not quite. "}</span>
            {q.explain}
          </div>
        )}
      </div>

      {!confirmed ? (
        <button
          className="quiz-confirm-btn"
          style={{ background: chosen !== null ? color : undefined, opacity: chosen !== null ? 1 : 0.4 }}
          onClick={handleConfirm}
          disabled={chosen === null}
        >
          Check answer
        </button>
      ) : (
        <button className="quiz-confirm-btn" style={{ background: color }} onClick={handleNext}>
          {qi + 1 >= lesson.questions.length ? "See results →" : "Next question →"}
        </button>
      )}
    </div>
  );
}

// ─── Lesson Router ────────────────────────────────────────────────────────────
// onBack = just navigate away, NO completion recorded
// onComplete = called only from the finish screen "Continue →" button
function LessonView({ module, lesson, onBack, onComplete }) {
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  return (
    <div className="lesson-view">
      <div className="lesson-topbar">
        <button className="lesson-back-btn" onClick={() => setShowExitConfirm(true)}>✕</button>
        <span className="lesson-title-bar">{module.emoji} {lesson.title}</span>
        <div style={{ width: 36 }} />
      </div>

      {/* Exit confirmation — leaving does NOT mark complete */}
      {showExitConfirm && (
        <div className="exit-modal-overlay" onClick={() => setShowExitConfirm(false)}>
          <div className="exit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="exit-modal-emoji">🚪</div>
            <h3>Leave this lesson?</h3>
            <p>Your progress in this lesson won't be saved. Complete it to earn XP.</p>
            <div className="exit-modal-actions">
              <button className="exit-stay-btn" onClick={() => setShowExitConfirm(false)}>
                Keep going
              </button>
              <button className="exit-leave-btn" onClick={onBack}>
                Leave anyway
              </button>
            </div>
          </div>
        </div>
      )}

      {lesson.type === "flashcard" ? (
        <FlashcardLesson lesson={lesson} color={module.color} glow={module.glow} onComplete={onComplete} />
      ) : (
        <QuizLesson lesson={lesson} color={module.color} onComplete={onComplete} />
      )}
    </div>
  );
}

// ─── Module Screen ────────────────────────────────────────────────────────────
function ModuleScreen({ module, completed, onSelectLesson, onBack }) {
  const total = module.lessons.length;
  const done = module.lessons.filter((l) => completed[l.id]).length;
  const pct = Math.round((done / total) * 100);
  const nextLesson = module.lessons.find((l) => !completed[l.id]) || module.lessons[module.lessons.length - 1];

  return (
    <div className="module-screen">
      <button className="back-btn" onClick={onBack}>← All modules</button>

      <div className="ms-hero" style={{ "--mod-color": module.color, "--mod-glow": module.glow }}>
        <div className="ms-emoji">{module.emoji}</div>
        <div className="ms-info">
          <h1 className="ms-title">{module.title}</h1>
          <p className="ms-subtitle">{module.subtitle}</p>
          <div className="ms-xp-badge" style={{ color: module.color, borderColor: module.color, background: module.glow }}>
            {module.xp} XP available
          </div>
        </div>
      </div>

      <div className="ms-progress-row">
        <div className="ms-progress-bar">
          <div className="ms-progress-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${module.color}, ${module.color}aa)` }} />
        </div>
        <span className="ms-progress-label">{done}/{total} lessons</span>
      </div>

      <div className="ms-lessons">
        {module.lessons.map((lesson, i) => {
          const isDone = !!completed[lesson.id];
          const isNext = lesson.id === nextLesson.id && !isDone;
          const isLocked = !isDone && !isNext && i > 0 && !completed[module.lessons[i - 1]?.id];
          return (
            <button
              key={lesson.id}
              className={`ms-lesson-card ${isDone ? "ms-done" : ""} ${isNext ? "ms-next" : ""} ${isLocked ? "ms-locked" : ""}`}
              style={isNext ? { "--mod-color": module.color, "--mod-glow": module.glow } : {}}
              onClick={() => !isLocked && onSelectLesson(lesson)}
              disabled={isLocked}
            >
              <div className="ms-lesson-status">
                {isDone ? "✅" : isNext ? "▶" : isLocked ? "🔒" : "○"}
              </div>
              <div className="ms-lesson-info">
                <span className="ms-lesson-name">{lesson.title}</span>
                <span className="ms-lesson-meta">
                  {lesson.type === "flashcard"
                    ? `${lesson.cards.length} flashcards`
                    : `${lesson.questions.length} questions`}
                  {" · "}
                  <span className={`ms-type-badge ms-type-${lesson.type}`}>
                    {lesson.type === "flashcard" ? "📇 Flashcards" : "❓ Quiz"}
                  </span>
                </span>
              </div>
              {isNext && <div className="ms-start-label" style={{ color: module.color }}>Start →</div>}
              {isDone && <div className="ms-done-xp" style={{ color: module.color }}>+XP</div>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Module Grid (Home) ───────────────────────────────────────────────────────
function ModuleGrid({ modules, completed, totalXP, levelLabel, levelSub, onSelectModule }) {
  const totalPossibleXP = modules.reduce((s, m) => s + m.xp, 0);
  const totalLessons = modules.reduce((s, m) => s + m.lessons.length, 0);
  const doneLessons = modules.reduce((s, m) => s + m.lessons.filter((l) => completed[l.id]).length, 0);
  const streakDays = 3;

  return (
    <div className="module-grid-view">
      <div className="mg-header">
        <div>
          <p className="eyebrow">Learn Mode</p>
          <h1 className="mg-title">{levelLabel || "Dein Lernpfad"}</h1>
          <p className="mg-subtitle">{levelSub || "Your learning path — tap a module to begin"}</p>
        </div>
      </div>

      <div className="mg-stats">
        <div className="mg-stat">
          <div className="mg-stat-icon">🔥</div>
          <div className="mg-stat-val">{streakDays}</div>
          <div className="mg-stat-label">Day streak</div>
        </div>
        <div className="mg-stat">
          <div className="mg-stat-icon">⭐</div>
          <div className="mg-stat-val">{totalXP}</div>
          <div className="mg-stat-label">Total XP</div>
        </div>
        <div className="mg-stat">
          <div className="mg-stat-icon">📚</div>
          <div className="mg-stat-val">{doneLessons}/{totalLessons}</div>
          <div className="mg-stat-label">Lessons</div>
        </div>
        <div className="mg-stat">
          <div className="mg-stat-icon">🎯</div>
          <div className="mg-stat-val">{totalPossibleXP}</div>
          <div className="mg-stat-label">XP to earn</div>
        </div>
      </div>

      <div className="mg-modules">
        {modules.map((mod, i) => {
          const total = mod.lessons.length;
          const done = mod.lessons.filter((l) => completed[l.id]).length;
          const pct = Math.round((done / total) * 100);
          const isComplete = done === total;

          return (
            <button
              key={mod.id}
              className={`mg-module-card ${isComplete ? "mg-module-complete" : ""}`}
              style={{ "--mod-color": mod.color, "--mod-glow": mod.glow }}
              onClick={() => onSelectModule(mod)}
            >
              {isComplete && <div className="mg-complete-ribbon">✓ Done</div>}
              <div className="mg-mod-top">
                <div className="mg-mod-emoji">{mod.emoji}</div>
                <div className="mg-mod-xp" style={{ color: mod.color }}>{mod.xp} XP</div>
              </div>
              <div className="mg-mod-title">{mod.title}</div>
              <div className="mg-mod-sub">{mod.subtitle}</div>
              <div className="mg-mod-progress">
                <div className="mg-mod-prog-track">
                  <div className="mg-mod-prog-fill" style={{ width: `${pct}%`, background: mod.color }} />
                </div>
                <span className="mg-mod-prog-label">{done}/{total}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Legacy view ──────────────────────────────────────────────────────────────
function LegacyLearnView({ level }) {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/themes?level=${level}`)
      .then((r) => r.json())
      .then((d) => { setThemes(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [level]);

  return (
    <section className="content-section">
      <p className="eyebrow">Learn Mode</p>
      <h1>{level} Themes</h1>
      {loading ? <p>Loading…</p> : themes.length === 0 ? <p>No themes yet.</p> : (
        <div className="list-block">
          {themes.map((t) => (
            <div key={t._id} className="list-item">
              <div><h3>{t.title}</h3><p>{t.description}</p></div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function LearnPage() {
  const { level } = useParams();
  const storageKey = `bhasha_learn_${level}`;
  const modules = LEVEL_MODULES[level];

  const [completed, setCompleted] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || "{}"); } catch { return {}; }
  });
  const [totalXP, setTotalXP] = useState(() => {
    try { return parseInt(localStorage.getItem(storageKey + "_xp") || "0"); } catch { return 0; }
  });
  const [activeModule, setActiveModule] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);

  const markDone = (lessonId, xpGain) => {
    const updated = { ...completed, [lessonId]: true };
    setCompleted(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    const newXP = totalXP + xpGain;
    setTotalXP(newXP);
    localStorage.setItem(storageKey + "_xp", String(newXP));
    setActiveLesson(null);
  };

  if (!modules) return <LegacyLearnView level={level} />;

  if (activeLesson && activeModule) {
    return (
      <div className="page-container">
        <LessonView
          module={activeModule}
          lesson={activeLesson}
          onBack={() => setActiveLesson(null)}
          onComplete={() => markDone(activeLesson.id, Math.floor(activeModule.xp / activeModule.lessons.length))}
        />
      </div>
    );
  }

  if (activeModule) {
    return (
      <div className="page-container">
        <ModuleScreen
          module={activeModule}
          completed={completed}
          onSelectLesson={(lesson) => setActiveLesson(lesson)}
          onBack={() => setActiveModule(null)}
        />
      </div>
    );
  }

  const meta = LEVEL_META[level] || { label: `${level} Learn`, sub: "" };

  return (
    <div className="page-container">
      <ModuleGrid
        modules={modules}
        completed={completed}
        totalXP={totalXP}
        levelLabel={meta.label}
        levelSub={meta.sub}
        onSelectModule={setActiveModule}
      />
    </div>
  );
}

export default LearnPage;