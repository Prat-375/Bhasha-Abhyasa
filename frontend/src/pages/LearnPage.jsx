// LearnPage.jsx — fetches vocab and grammar from API, with lesson locking
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { getToken, getUser } from "../utils/auth";

const API = import.meta.env.VITE_API_URL;

const LEVEL_COLORS  = { A1: "#a78bfa", A2: "#34d399", B1: "#f472b6", B2: "#fbbf24", C1: "#38bdf8" };
const LEVEL_LABELS  = { A1: "Beginner", A2: "Elementary", B1: "Intermediate", B2: "Upper Intermediate", C1: "Advanced" };
const LEVEL_TITLES  = { A1: "Starter", A2: "Elementary", B1: "Intermediate", B2: "Advanced", C1: "Mastery" };

function useFetch(url) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  useEffect(() => {
    if (!url) return;
    setLoading(true); setError(null);
    fetch(url)
      .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then((d) => { setData(d); setLoading(false); })
      .catch((e) => { setError(e.message); setLoading(false); });
  }, [url]);
  return { data, loading, error };
}

function Skeleton({ height = "200px" }) {
  return (
    <div style={{ height, borderRadius: "var(--radius)", background: "rgba(255,255,255,0.05)", animation: "pulse 1.5s ease infinite" }} />
  );
}

// ── Save lesson progress helper ───────────────────────────────────────────────
async function saveLessonProgress({ level, sectionType, sectionIndex, sectionId, score }) {
  const token = getToken();
  if (!token) return;
  try {
    await fetch(`${API}/api/progress/lesson`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ level, sectionType, sectionIndex, sectionId, score }),
    });
  } catch (e) {
    console.error("Failed to save lesson progress", e);
  }
}

// ─── Flashcard ─────────────────────────────────────────────────────────────────
function VocabFlashcard({ word, color, onNext, onPrev, index, total, showBack, onFlip }) {
  return (
    <div className="vfc-wrap">
      <div className="vfc-progress-row">
        <button className="vfc-nav-btn" onClick={onPrev} disabled={index === 0}>←</button>
        <div className="vfc-progress-track">
          <div className="vfc-progress-fill" style={{ width: `${((index + 1) / total) * 100}%`, background: color }} />
        </div>
        <span className="vfc-counter">{index + 1} / {total}</span>
        <button className="vfc-nav-btn" onClick={onNext} disabled={index === total - 1}>→</button>
      </div>
      <p className="vfc-hint">{showBack ? "Click to see German" : "Click to see English"}</p>
      <div className={`vfc-card ${showBack ? "vfc-flipped" : ""}`} onClick={onFlip} style={{ "--card-color": color }}>
        <div className="vfc-card-inner">
          <div className="vfc-face vfc-front">
            <div className="vfc-tag">German</div>
            <div className="vfc-word">{word.de}</div>
            {word.plural && word.plural !== "-" && word.plural !== "(no plural)" && (
              <div className="vfc-plural">Pl: {word.plural}</div>
            )}
            {word.tip && <div className="vfc-tip">💡 {word.tip}</div>}
          </div>
          <div className="vfc-face vfc-back">
            <div className="vfc-tag">English</div>
            <div className="vfc-word vfc-word-en" style={{ color }}>{word.en}</div>
            <div className="vfc-example">"{word.example}"</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Vocabulary Section ────────────────────────────────────────────────────────
function VocabularySection({ level, lessonProgress, onProgressUpdate }) {
  const color = LEVEL_COLORS[level];
  const { data: topics, loading, error } = useFetch(`${API}/api/vocab/${level}`);
  const [activeTopic, setActiveTopic] = useState(0);
  const [cardIndex, setCardIndex]     = useState(0);
  const [showBack, setShowBack]       = useState(false);
  const [viewMode, setViewMode]       = useState("cards");
  const [known, setKnown]             = useState(new Set());

  if (loading) return <><Skeleton height="60px" /><Skeleton height="240px" /></>;
  if (error)   return <p style={{ color: "var(--danger)" }}>Failed to load vocabulary: {error}</p>;
  if (!topics?.length) return <p style={{ color: "var(--muted)" }}>No vocabulary for this level yet.</p>;

  // Check if a topic is unlocked
  const isTopicUnlocked = (i) => {
    if (i === 0) return true;
    const prev = lessonProgress.find(
      (p) => p.sectionType === "vocabulary" && p.sectionIndex === i - 1 && p.level === level
    );
    return prev?.completed === true;
  };

  // Check if a topic is completed
  const isTopicCompleted = (i) => {
    return lessonProgress.some(
      (p) => p.sectionType === "vocabulary" && p.sectionIndex === i && p.level === level && p.completed
    );
  };

  const topic = topics[activeTopic];
  const word  = topic?.words[cardIndex];

  const handleNext = () => { setShowBack(false); if (cardIndex < topic.words.length - 1) setCardIndex(cardIndex + 1); };
  const handlePrev = () => { setShowBack(false); if (cardIndex > 0) setCardIndex(cardIndex - 1); };

  const switchTopic = (i) => {
    if (!isTopicUnlocked(i)) return;
    setActiveTopic(i); setCardIndex(0); setShowBack(false);
  };

  const markKnown = async () => {
    const key = `${activeTopic}-${cardIndex}`;
    const newKnown = new Set([...known, key]);
    setKnown(newKnown);

    // If all cards marked known → complete this topic
    const allKnown = topic.words.every((_, wi) => newKnown.has(`${activeTopic}-${wi}`) || wi === cardIndex);
    if (allKnown) {
      const score = Math.round((newKnown.size / topic.words.length) * 100);
      await saveLessonProgress({
        level, sectionType: "vocabulary", sectionIndex: activeTopic,
        sectionId: topic.topic, score,
      });
      onProgressUpdate();
    }
    handleNext();
  };

  const isKnown = known.has(`${activeTopic}-${cardIndex}`);
  const totalWords = topics.reduce((s, t) => s + t.words.length, 0);

  return (
    <div className="learn-section">
      <div className="learn-section-header">
        <div>
          <h2 className="learn-section-title">Vocabulary</h2>
          <p className="learn-section-sub">Goethe-aligned · {totalWords} words · {known.size} marked known</p>
        </div>
        <div className="view-toggle">
          <button className={`vt-btn ${viewMode === "cards" ? "vt-active" : ""}`} onClick={() => setViewMode("cards")}>Cards</button>
          <button className={`vt-btn ${viewMode === "list"  ? "vt-active" : ""}`} onClick={() => setViewMode("list")}>List</button>
        </div>
      </div>

      <div className="topic-tabs">
        {topics.map((t, i) => {
          const unlocked  = isTopicUnlocked(i);
          const completed = isTopicCompleted(i);
          return (
            <button key={i}
              className={`topic-tab ${activeTopic === i ? "topic-tab-active" : ""} ${!unlocked ? "topic-tab-locked" : ""}`}
              style={activeTopic === i ? { borderColor: color, color } : {}}
              onClick={() => switchTopic(i)}
              title={!unlocked ? "Complete the previous topic to unlock" : ""}
            >
              {completed ? "✅" : !unlocked ? "🔒" : ""} {t.icon} {t.topic}
            </button>
          );
        })}
      </div>

      {viewMode === "cards" ? (
        <>
          <VocabFlashcard word={word} color={color} index={cardIndex} total={topic.words.length}
            showBack={showBack} onFlip={() => setShowBack(!showBack)} onNext={handleNext} onPrev={handlePrev} />
          {showBack && (
            <div className="vfc-action-row">
              <button className="vfc-btn vfc-btn-again" onClick={() => { setShowBack(false); handleNext(); }}>🔁 Keep reviewing</button>
              <button className={`vfc-btn vfc-btn-known ${isKnown ? "vfc-btn-known-done" : ""}`} onClick={markKnown}>
                {isKnown ? "✓ Known" : "✓ Mark as known"}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="vocab-list-table">
          <div className="vlt-header"><span>German</span><span>English</span><span>Example</span><span>Plural</span></div>
          {topic.words.map((w, i) => (
            <div key={i} className="vlt-row">
              <span className="vlt-de">{w.de}</span>
              <span className="vlt-en">{w.en}</span>
              <span className="vlt-ex">{w.example}</span>
              <span className="vlt-pl">{w.plural}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Grammar Exercise ──────────────────────────────────────────────────────────
function GrammarExercise({ exercises, color, lessonIndex, lessonId, level, onComplete }) {
  const [inputs, setInputs]       = useState(exercises.reduce((a, _, i) => ({ ...a, [i]: "" }), {}));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore]         = useState(0);
  const [hints, setHints]         = useState({});

  const handleCheck = async () => {
    let correct = 0;
    exercises.forEach((ex, i) => {
      const userParts   = inputs[i].trim().toLowerCase().split(/\s*[/,]\s*/);
      const answerParts = ex.answer.toLowerCase().split(/\s*[/,]\s*/);
      const ok = answerParts.every((part, pi) => userParts[pi] && (userParts[pi].includes(part) || part.includes(userParts[pi])));
      if (ok) correct++;
    });
    const pct = Math.round((correct / exercises.length) * 100);
    setScore(correct);
    setSubmitted(true);

    // Save progress
    await saveLessonProgress({
      level, sectionType: "grammar", sectionIndex: lessonIndex,
      sectionId: lessonId, score: pct,
    });
    onComplete(pct);
  };

  const reset = () => {
    setInputs(exercises.reduce((a, _, i) => ({ ...a, [i]: "" }), {}));
    setSubmitted(false); setScore(0); setHints({});
  };

  const pct = submitted ? Math.round((score / exercises.length) * 100) : 0;

  return (
    <div className="grammar-exercises">
      <h4 className="ge-title">Practice Exercises</h4>
      {exercises.map((ex, i) => {
        const ans     = inputs[i]?.trim().toLowerCase() || "";
        const expected = ex.answer.toLowerCase();
        const correct  = submitted && (ans.includes(expected) || expected.includes(ans) || ans === expected);
        const wrong    = submitted && !correct;
        return (
          <div key={i} className={`ge-item ${submitted ? (correct ? "ge-correct" : "ge-wrong") : ""}`}>
            <div className="ge-sentence">{ex.sentence}</div>
            <div className="ge-input-row">
              <input className={`ge-input ${submitted ? (correct ? "ge-inp-correct" : "ge-inp-wrong") : ""}`}
                value={inputs[i]} onChange={(e) => !submitted && setInputs((p) => ({ ...p, [i]: e.target.value }))}
                placeholder="type answer..." disabled={submitted} />
              {!submitted && (
                <button className="ge-hint-btn" onClick={() => setHints((p) => ({ ...p, [i]: !p[i] }))}>hint</button>
              )}
              {submitted && correct && <span className="ge-feedback ge-fb-ok">✓</span>}
              {submitted && wrong   && <span className="ge-feedback ge-fb-bad">✗ {ex.answer}</span>}
            </div>
            {hints[i] && !submitted && <div className="ge-hint-text">💡 {ex.hint}</div>}
          </div>
        );
      })}
      {!submitted ? (
        <button className="ge-check-btn" style={{ background: color }} onClick={handleCheck}>Check answers</button>
      ) : (
        <div className="ge-result">
          <span className={`ge-score ${pct >= 60 ? "ge-score-pass" : "ge-score-fail"}`}>{score}/{exercises.length} — {pct}%</span>
          <span className="ge-result-msg">{pct === 100 ? "Perfect! 🎉" : pct >= 60 ? "Well done! 👍" : "Keep practising! 💪"}</span>
          <button className="ge-retry-btn" onClick={reset}>Try again</button>
        </div>
      )}
    </div>
  );
}

// ─── Grammar Lesson ────────────────────────────────────────────────────────────
function GrammarLesson({ lesson, lessonIndex, color, level, onBack, onComplete }) {
  const [activeTab, setActiveTab] = useState("rules");
  const tabs = ["rules", lesson.table ? "table" : null, "examples", "practice"].filter(Boolean);

  return (
    <div className="grammar-lesson">
      <button className="back-btn" onClick={onBack}>← Back to lessons</button>
      <div className="gl-header">
        <span className="gl-icon">{lesson.icon}</span>
        <h2 className="gl-title">{lesson.title}</h2>
      </div>
      <div className="gl-explanation">{lesson.explanation}</div>
      <div className="gl-tabs">
        {tabs.map((tab) => (
          <button key={tab} className={`gl-tab ${activeTab === tab ? "gl-tab-active" : ""}`}
            style={activeTab === tab ? { borderColor: color, color } : {}}
            onClick={() => setActiveTab(tab)}>
            {{ rules: "📋 Rules", table: "📊 Table", examples: "💬 Examples", practice: "✏️ Practice" }[tab]}
          </button>
        ))}
      </div>
      {activeTab === "rules" && (
        <div className="gl-rules">
          {lesson.rules.map((rule, i) => (
            <div key={i} className={`gl-rule ${rule.startsWith("⚠️") ? "gl-rule-warn" : ""}`}>{rule}</div>
          ))}
        </div>
      )}
      {activeTab === "table" && lesson.table && (
        <div className="gl-table-wrap">
          <table className="gl-table">
            <thead><tr>{lesson.table.headers.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
            <tbody>
              {lesson.table.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => ci === 0
                    ? <td key={ci} className="gl-td-head">{cell}</td>
                    : <td key={ci} style={cell.includes("→") ? { color } : {}}>{cell}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {activeTab === "examples" && (
        <div className="gl-examples">
          {lesson.examples.map((ex, i) => (
            <div key={i} className="gl-example-card">
              <div className="gl-ex-de" style={{ borderLeftColor: color }}>{ex.de}</div>
              <div className="gl-ex-en">{ex.en}</div>
            </div>
          ))}
        </div>
      )}
      {activeTab === "practice" && (
        <GrammarExercise
          exercises={lesson.exercises} color={color}
          lessonIndex={lessonIndex} lessonId={lesson.id}
          level={level} onComplete={onComplete}
        />
      )}
    </div>
  );
}

// ─── Grammar Section ───────────────────────────────────────────────────────────
function GrammarSection({ level, color, lessonProgress, onProgressUpdate }) {
  const { data: lessons, loading, error } = useFetch(`${API}/api/grammar/${level}`);
  const [activeLesson, setActiveLesson]   = useState(null);

  if (loading) return <><Skeleton height="80px" /><Skeleton height="80px" /><Skeleton height="80px" /></>;
  if (error)   return <p style={{ color: "var(--danger)" }}>Failed to load grammar: {error}</p>;
  if (!lessons?.length) return <p style={{ color: "var(--muted)" }}>No grammar lessons for this level yet.</p>;

  const isLessonUnlocked = (i) => {
    if (i === 0) return true;
    const prev = lessonProgress.find(
      (p) => p.sectionType === "grammar" && p.sectionIndex === i - 1 && p.level === level
    );
    return prev?.completed === true;
  };

  const isLessonCompleted = (i) => {
    return lessonProgress.some(
      (p) => p.sectionType === "grammar" && p.sectionIndex === i && p.level === level && p.completed
    );
  };

  if (activeLesson !== null) {
    return (
      <GrammarLesson
        lesson={lessons[activeLesson]} lessonIndex={activeLesson}
        color={color} level={level}
        onBack={() => setActiveLesson(null)}
        onComplete={() => { onProgressUpdate(); setActiveLesson(null); }}
      />
    );
  }

  return (
    <div className="learn-section">
      <div className="learn-section-header">
        <div>
          <h2 className="learn-section-title">Grammar</h2>
          <p className="learn-section-sub">{level} grammar lessons · rules, tables, examples & exercises</p>
        </div>
      </div>
      <div className="grammar-lessons-list">
        {lessons.map((lesson, i) => {
          const unlocked  = isLessonUnlocked(i);
          const completed = isLessonCompleted(i);
          return (
            <button key={lesson.id}
              className={`gl-card ${!unlocked ? "gl-card-locked" : ""}`}
              onClick={() => unlocked && setActiveLesson(i)}
              disabled={!unlocked}
              title={!unlocked ? "Complete the previous lesson to unlock" : ""}
            >
              <div className="gl-card-left">
                <span className="gl-card-icon">
                  {completed ? "✅" : !unlocked ? "🔒" : lesson.icon}
                </span>
                <div>
                  <div className="gl-card-title">{lesson.title}</div>
                  <div className="gl-card-meta">
                    {completed ? "Completed ✓" : !unlocked ? "Locked — complete previous lesson first" :
                      `${lesson.rules?.length} rules · ${lesson.examples?.length} examples · ${lesson.exercises?.length} exercises`}
                  </div>
                </div>
              </div>
              <span className="gl-card-arrow" style={{ color: unlocked ? color : "var(--muted)" }}>
                {unlocked ? "→" : "🔒"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Sub nav ───────────────────────────────────────────────────────────────────
function SubNav({ active, onChange, color }) {
  return (
    <div className="sub-nav">
      {[["vocabulary", "📚 Vocabulary"], ["grammar", "📐 Grammar"]].map(([key, label]) => (
        <button key={key} className={`sub-nav-btn ${active === key ? "sub-nav-active" : ""}`}
          style={active === key ? { background: color + "22", borderColor: color, color } : {}}
          onClick={() => onChange(key)}>
          {label}
        </button>
      ))}
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
function LearnPage() {
  const { level }     = useParams();
  const [sub, setSub] = useState("vocabulary");
  const color = LEVEL_COLORS[level] || "#a78bfa";
  const label = LEVEL_LABELS[level] || level;
  const title = LEVEL_TITLES[level] || label;
  const user  = getUser();

  const [lessonProgress, setLessonProgress] = useState([]);

  // Fetch lesson progress on mount
  useEffect(() => {
    if (!user) return;
    fetch(`${API}/api/progress/lesson/${user._id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((r) => r.json())
      .then((d) => setLessonProgress(Array.isArray(d) ? d : []))
      .catch(() => {});
  }, [user?._id]);

  // Refresh progress after any lesson completion
  const handleProgressUpdate = () => {
    if (!user) return;
    fetch(`${API}/api/progress/lesson/${user._id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((r) => r.json())
      .then((d) => setLessonProgress(Array.isArray(d) ? d : []))
      .catch(() => {});
  };

  return (
    <section className="content-section">
      <div className="page-hero-row">
        <div className="page-hero">
          <div className="page-hero-level" style={{ color, textShadow: `0 0 60px ${color}50` }}>{level}</div>
          <div className="page-hero-right">
            <h1 className="page-hero-title"><span style={{ color }}>{title}</span></h1>
            <p className="page-hero-sub">Choose a section to start learning.</p>
          </div>
        </div>
        <Link to={`/mode/${level}`} className="back-pill">← Back</Link>
      </div>

      <SubNav active={sub} onChange={setSub} color={color} />

      {sub === "vocabulary" && (
        <VocabularySection
          level={level}
          lessonProgress={lessonProgress}
          onProgressUpdate={handleProgressUpdate}
        />
      )}
      {sub === "grammar" && (
        <GrammarSection
          level={level} color={color}
          lessonProgress={lessonProgress}
          onProgressUpdate={handleProgressUpdate}
        />
      )}
    </section>
  );
}

export default LearnPage;