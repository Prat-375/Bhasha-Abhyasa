import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { getToken, getUser } from "../utils/auth";

const API = import.meta.env.VITE_API_URL;

const LEVEL_META = {
  A1: { rank: "Novice",       emoji: "🌱", color: "#a78bfa", glow: "rgba(167,139,250,0.25)" },
  A2: { rank: "Apprentice",   emoji: "🌿", color: "#34d399", glow: "rgba(52,211,153,0.25)"  },
  B1: { rank: "Warrior",      emoji: "🌊", color: "#f472b6", glow: "rgba(244,114,182,0.25)" },
  B2: { rank: "Knight",       emoji: "✨", color: "#fbbf24", glow: "rgba(251,191,36,0.25)"  },
  C1: { rank: "Grand Master", emoji: "🌌", color: "#38bdf8", glow: "rgba(56,189,248,0.25)"  },
};

const CARD_COLORS = [
  { bg: "#FDE047", line: "#FACC15", text: "#1a1a1a", tag: "#854d0e" },
  { bg: "#F9A8D4", line: "#F472B6", text: "#1a1a1a", tag: "#9d174d" },
  { bg: "#6EE7B7", line: "#34D399", text: "#1a1a1a", tag: "#065f46" },
  { bg: "#C4B5FD", line: "#A78BFA", text: "#1a1a1a", tag: "#4c1d95" },
  { bg: "#FDB975", line: "#FB923C", text: "#1a1a1a", tag: "#9a3412" },
  { bg: "#93C5FD", line: "#60A5FA", text: "#1a1a1a", tag: "#1e3a8a" },
  { bg: "#86EFAC", line: "#4ADE80", text: "#1a1a1a", tag: "#14532d" },
  { bg: "#FCA5A5", line: "#F87171", text: "#1a1a1a", tag: "#991b1b" },
];

function getCardColor(index) {
  return CARD_COLORS[index % CARD_COLORS.length];
}

function useFetch(url) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  useEffect(() => {
    if (!url) return;
    setLoading(true); setError(null);
    fetch(url)
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(d => { setData(d); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, [url]);
  return { data, loading, error };
}

async function saveLessonProgress({ level, sectionType, sectionIndex, sectionId, score }) {
  const token = getToken();
  if (!token) return;
  try {
    await fetch(`${API}/api/progress/lesson`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ level, sectionType, sectionIndex, sectionId, score }),
    });
  } catch (e) { console.error("Failed to save lesson progress", e); }
}

// ─── Topic Select Screen ───────────────────────────────────────────────────────
function TopicSelect({ topics, lessonProgress, level, color, glow, onSelect }) {
  const [startIndex, setStartIndex] = useState(0);

  const getVisible = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 600)  return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [visible, setVisible] = useState(getVisible);

  useEffect(() => {
    const handle = () => setVisible(getVisible());
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  const isUnlocked  = (i) => {
    if (i === 0) return true;
    return lessonProgress.some(p => p.sectionType === "vocabulary" && p.sectionIndex === i - 1 && p.level === level && p.completed);
  };
  const isCompleted = (i) => lessonProgress.some(p => p.sectionType === "vocabulary" && p.sectionIndex === i && p.level === level && p.completed);

  const total = topics.length;
  const goNext = () => setStartIndex(i => (i + 1) % total);
  const goPrev = () => setStartIndex(i => (i - 1 + total) % total);
  const visibleIndices = Array.from({ length: visible }, (_, i) => (startIndex + i) % total);

  return (
    <div className="gs-topic-screen">
      <div className="gs-topic-header">
        <h2 className="gs-topic-heading" style={{ color }}>📚 Choose a Topic</h2>
        <p className="gs-topic-sub">Complete each topic to unlock the next</p>
      </div>

      <div className="gs-topic-slider-row">
        <button className="gs-slider-arrow" onClick={goPrev}>←</button>

        <div className="gs-topic-cards-wrap" style={{ gridTemplateColumns: `repeat(${visible}, 1fr)` }}>
          {visibleIndices.map((topicIdx) => {
            const t         = topics[topicIdx];
            const unlocked  = isUnlocked(topicIdx);
            const completed = isCompleted(topicIdx);
            const active    = unlocked && !completed;
            return (
              <div key={topicIdx}
                className={`gs-topic-card ${!unlocked ? "gs-locked" : ""} ${completed ? "gs-completed" : ""} ${active ? "gs-active" : ""}`}
                style={unlocked ? {
                  "--tc": color, "--tg": glow,
                  borderColor: completed ? "#34d39950" : active ? color + "60" : "transparent",
                  boxShadow: active ? `0 0 30px ${color}30` : "none",
                } : {}}
                onClick={() => unlocked && onSelect(topicIdx)}
              >
                {!unlocked && <div className="gs-lock-overlay"><span>🔒</span></div>}
                <div className="gs-topic-num"
                  style={completed
                    ? { background: "#34d39925", borderColor: "#34d39960", color: "#34d399" }
                    : active ? { background: color + "20", borderColor: color + "50", color } : {}}>
                  {completed ? "✓" : topicIdx + 1}
                </div>
                <div className="gs-topic-emoji">{t.icon}</div>
                <div className="gs-topic-name">{t.topic}</div>
                <div className="gs-topic-count" style={{ color: unlocked ? color : "var(--muted)" }}>
                  {t.words?.length} words
                </div>
                {completed && <div className="gs-topic-done-bar"         style={{ background: "#34d399" }} />}
                {active    && <div className="gs-topic-active-indicator" style={{ background: color }} />}
              </div>
            );
          })}
        </div>

        <button className="gs-slider-arrow" onClick={goNext}>→</button>
      </div>

      <div className="gs-topic-dots">
        {topics.map((_, i) => (
          <div key={i} className="gs-topic-dot"
            style={{
              background: visibleIndices.includes(i) ? color : "rgba(255,255,255,0.2)",
              width: visibleIndices.includes(i) ? "20px" : "7px",
            }}
            onClick={() => setStartIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Stacked Flashcard Screen ──────────────────────────────────────────────────
function FlashcardScreen({ topic, topicIndex, color, glow, level, lessonProgress, onProgressUpdate, onBack }) {
  const [queue, setQueue]         = useState(() => topic.words.map((_, i) => i));
  const [flipped, setFlipped]     = useState(false);
  const [flyDir, setFlyDir]       = useState(null);
  const [known, setKnown]         = useState(new Set());
  const [completed, setCompleted] = useState(false);
  const [animating, setAnimating] = useState(false);

  const total     = topic.words.length;
  const remaining = queue.length;
  const topIdx    = queue[0];
  const word      = topic.words[topIdx];

  const flyAway = (dir, callback) => {
    if (animating) return;
    setAnimating(true);
    setFlyDir(dir);
    setTimeout(() => {
      setFlyDir(null);
      setFlipped(false);
      setAnimating(false);
      callback();
    }, 420);
  };

  const markKnown = () => {
    flyAway("left", async () => {
      const newKnown = new Set([...known, topIdx]);
      setKnown(newKnown);
      const newQueue = queue.slice(1);
      setQueue(newQueue);
      if (newQueue.length === 0) {
        const score = Math.round((newKnown.size / total) * 100);
        await saveLessonProgress({ level, sectionType: "vocabulary", sectionIndex: topicIndex, sectionId: topic.topic, score });
        onProgressUpdate();
        setCompleted(true);
      }
    });
  };

  const keepReviewing = () => {
    flyAway("right", () => {
      setQueue(q => [...q.slice(1), q[0]]);
    });
  };

  if (completed) {
    return (
      <div className="gs-complete-screen">
        <div className="gs-complete-inner">
          <div className="gs-complete-glow" style={{ background: `radial-gradient(circle, ${glow}, transparent 65%)` }} />
          <span className="gs-complete-emoji">🎉</span>
          <h2 className="gs-complete-title" style={{ color }}>Topic Complete!</h2>
          <p className="gs-complete-sub">{topic.topic} · {known.size}/{total} words learned</p>
          <div className="gs-complete-actions">
            <button className="gs-complete-btn gs-btn-secondary" onClick={onBack}>← Back to Topics</button>
            <button className="gs-complete-btn gs-btn-primary"
              style={{ background: color, boxShadow: `0 8px 30px ${color}50` }}
              onClick={onBack}>Next Topic →</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="gs-card-screen">

      {/* Top bar */}
      <div className="gs-card-topbar">
        <button className="gs-back-btn" onClick={onBack}>← {topic.topic}</button>
        <div className="gs-card-progress">
          <div className="gs-card-prog-track">
            <div className="gs-card-prog-fill" style={{ width: `${Math.round((known.size / total) * 100)}%`, background: color }} />
          </div>
          <span className="gs-card-counter" style={{ color }}>{known.size} / {total} known</span>
        </div>
        <span className="gs-known-count" style={{ color }}>📚 {remaining} left</span>
      </div>

      {/* Stacked deck */}
      <div className="gs-deck-stage">
        {queue.slice(0, 4).reverse().map((wordIdx, stackPos) => {
          const isTop  = stackPos === queue.slice(0, 4).length - 1;
          const depth  = queue.slice(0, 4).length - 1 - stackPos;
          const col    = getCardColor(wordIdx);
          const w      = topic.words[wordIdx];

          return (
            <div
              key={wordIdx}
              className={`gs-stacked-card
                ${isTop && flipped      ? "gs-stacked-flipped" : ""}
                ${isTop && flyDir === "left"  ? "gs-fly-left"  : ""}
                ${isTop && flyDir === "right" ? "gs-fly-right" : ""}
              `}
              style={{
                zIndex: isTop ? 10 : 10 - depth,
                transform: isTop
                  ? "translateY(0) rotate(0deg)"
                  : `translateY(${depth * 10}px) rotate(${depth % 2 === 0 ? depth * 2 : -(depth * 2)}deg)`,
                pointerEvents: isTop ? "auto" : "none",
                cursor: isTop ? "pointer" : "default",
              }}
              onClick={() => isTop && !animating && setFlipped(f => !f)}
            >
              <div className="gs-stacked-inner">

                {/* ── Front ── */}
                <div className="gs-stacked-face gs-stacked-front" style={{ background: col.bg }}>
                  <div className="gs-card-lines">
                    {Array.from({ length: 8 }, (_, i) => (
                      <div key={i} className="gs-card-line" style={{ borderColor: col.line + "55" }} />
                    ))}
                  </div>
                  <div className="gs-card-margin" />
                  <div className="gs-stacked-tag" style={{ background: col.tag + "22", borderColor: col.tag + "60", color: col.tag }}>
                    🇩🇪 German
                  </div>
                  <div className="gs-stacked-word" style={{ color: col.text }}>{w.de}</div>
                  {w.plural && w.plural !== "-" && w.plural !== "(no plural)" && (
                    <div className="gs-stacked-plural" style={{ color: col.tag }}>Plural: {w.plural}</div>
                  )}
                  {w.tip && (
                    <div className="gs-stacked-tip" style={{ background: col.tag + "18", borderColor: col.tag + "40", color: col.tag }}>
                      💡 {w.tip}
                    </div>
                  )}
                  {isTop && <div className="gs-stacked-hint" style={{ color: col.tag + "99" }}>tap to flip ↺</div>}
                </div>

                {/* ── Back ── */}
                <div className="gs-stacked-face gs-stacked-back" style={{ background: col.bg }}>
                  <div className="gs-card-lines">
                    {Array.from({ length: 8 }, (_, i) => (
                      <div key={i} className="gs-card-line" style={{ borderColor: col.line + "55" }} />
                    ))}
                  </div>
                  <div className="gs-card-margin" />
                  <div className="gs-stacked-tag" style={{ background: col.tag + "22", borderColor: col.tag + "60", color: col.tag }}>
                    🇬🇧 English
                  </div>
                  <div className="gs-stacked-word" style={{ color: col.text }}>{w.en}</div>
                  {w.example && (
                    <div className="gs-stacked-example" style={{ borderLeftColor: col.tag, color: col.tag + "cc" }}>
                      "{w.example}"
                    </div>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Action buttons */}
      <div className={`gs-card-actions ${!flipped ? "gs-actions-hidden" : ""}`}>
        <button className="gs-action-btn gs-btn-review" onClick={keepReviewing}>
          🔁 Keep Reviewing
        </button>
        <button className="gs-action-btn gs-btn-known" onClick={markKnown}
          style={{ background: "#22c55e18", borderColor: "#22c55e60", color: "#22c55e" }}>
          ✓ Got it!
        </button>
      </div>

      {/* Progress dots */}
      <div className="gs-deck-footer">
        {Array.from({ length: Math.min(total, 10) }, (_, i) => (
          <div key={i} className="gs-deck-dot"
            style={{
              background: i < known.size
                ? "#22c55e"
                : i < (total - remaining)
                ? color
                : "rgba(255,255,255,0.18)",
              width: i < known.size ? "10px" : "8px",
              height: i < known.size ? "10px" : "8px",
            }} />
        ))}
      </div>

    </div>
  );
}

// ─── Vocabulary Section ────────────────────────────────────────────────────────
function VocabularySection({ level, lessonProgress, onProgressUpdate }) {
  const meta  = LEVEL_META[level] || LEVEL_META.A1;
  const { color, glow } = meta;
  const { data: topics, loading, error } = useFetch(`${API}/api/vocab/${level}`);
  const [activeTopic, setActiveTopic] = useState(null);

  if (loading) return (
    <div className="gs-loading">
      <div className="gs-spinner" style={{ borderTopColor: color }} />
      <p>Loading vocabulary...</p>
    </div>
  );
  if (error)           return <p style={{ color: "var(--danger)" }}>Failed to load vocabulary.</p>;
  if (!topics?.length) return <p style={{ color: "var(--muted)" }}>No vocabulary yet.</p>;

  if (activeTopic !== null) {
    return (
      <FlashcardScreen
        topic={topics[activeTopic]}
        topicIndex={activeTopic}
        color={color} glow={glow} level={level}
        lessonProgress={lessonProgress}
        onProgressUpdate={onProgressUpdate}
        onBack={() => setActiveTopic(null)}
      />
    );
  }

  return (
    <TopicSelect
      topics={topics}
      lessonProgress={lessonProgress}
      level={level} color={color} glow={glow}
      onSelect={setActiveTopic}
    />
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
    setScore(correct); setSubmitted(true);
    await saveLessonProgress({ level, sectionType: "grammar", sectionIndex: lessonIndex, sectionId: lessonId, score: pct });
    onComplete(pct);
  };

  const reset = () => {
    setInputs(exercises.reduce((a, _, i) => ({ ...a, [i]: "" }), {}));
    setSubmitted(false); setScore(0); setHints({});
  };

  const pct = submitted ? Math.round((score / exercises.length) * 100) : 0;

  return (
    <div className="grammar-exercises">
      <h4 className="ge-title">✏️ Practice Exercises</h4>
      {exercises.map((ex, i) => {
        const ans      = inputs[i]?.trim().toLowerCase() || "";
        const expected = ex.answer.toLowerCase();
        const correct  = submitted && (ans.includes(expected) || expected.includes(ans) || ans === expected);
        const wrong    = submitted && !correct;
        return (
          <div key={i} className={`ge-item ${submitted ? (correct ? "ge-correct" : "ge-wrong") : ""}`}>
            <div className="ge-sentence">{ex.sentence}</div>
            <div className="ge-input-row">
              <input
                className={`ge-input ${submitted ? (correct ? "ge-inp-correct" : "ge-inp-wrong") : ""}`}
                value={inputs[i]}
                onChange={(e) => !submitted && setInputs(p => ({ ...p, [i]: e.target.value }))}
                placeholder="type answer..."
                disabled={submitted}
              />
              {!submitted && (
                <button className="ge-hint-btn" onClick={() => setHints(p => ({ ...p, [i]: !p[i] }))}>hint</button>
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
      <button className="gs-back-btn" style={{ marginBottom: "1.5rem" }} onClick={onBack}>
        ← Back to lessons
      </button>
      <div className="gl-header">
        <span className="gl-icon">{lesson.icon}</span>
        <h2 className="gl-title">{lesson.title}</h2>
      </div>
      <div className="gl-explanation">{lesson.explanation}</div>
      <div className="gl-tabs">
        {tabs.map(tab => (
          <button key={tab}
            className={`gl-tab ${activeTab === tab ? "gl-tab-active" : ""}`}
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
function GrammarSection({ level, color, glow, lessonProgress, onProgressUpdate }) {
  const { data: lessons, loading, error } = useFetch(`${API}/api/grammar/${level}`);
  const [activeLesson, setActiveLesson]   = useState(null);

  if (loading) return (
    <div className="gs-loading">
      <div className="gs-spinner" style={{ borderTopColor: color }} />
      <p>Loading grammar...</p>
    </div>
  );
  if (error)            return <p style={{ color: "var(--danger)" }}>Failed to load grammar.</p>;
  if (!lessons?.length) return <p style={{ color: "var(--muted)" }}>No grammar yet.</p>;

  const isUnlocked  = (i) => {
    if (i === 0) return true;
    return lessonProgress.some(p => p.sectionType === "grammar" && p.sectionIndex === i - 1 && p.level === level && p.completed);
  };
  const isCompleted = (i) => lessonProgress.some(p => p.sectionType === "grammar" && p.sectionIndex === i && p.level === level && p.completed);

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
    <div className="gs-grammar-screen">
      <div className="gs-topic-header">
        <h2 className="gs-topic-heading" style={{ color }}>📐 Grammar Quests</h2>
        <p className="gs-topic-sub">Complete each lesson to unlock the next</p>
      </div>

      <div className="gs-grammar-list">
        {lessons.map((lesson, i) => {
          const unlocked  = isUnlocked(i);
          const completed = isCompleted(i);
          return (
            <button key={lesson.id}
              className={`gs-grammar-row ${!unlocked ? "gs-grammar-locked" : ""} ${completed ? "gs-grammar-done" : ""}`}
              onClick={() => unlocked && setActiveLesson(i)}
              disabled={!unlocked}
              style={unlocked ? { "--rc": color, "--rg": glow } : {}}
            >
              {unlocked && !completed && <div className="gs-row-bar" style={{ background: color }} />}
              {completed             && <div className="gs-row-bar" style={{ background: "#34d399" }} />}

              <div className="gs-grammar-num"
                style={completed
                  ? { background: "#34d39925", borderColor: "#34d39960", color: "#34d399" }
                  : unlocked
                  ? { background: color + "20", borderColor: color + "50", color }
                  : {}}>
                {completed ? "✓" : !unlocked ? "🔒" : i + 1}
              </div>

              <div className="gs-grammar-icon">{unlocked ? lesson.icon : "📖"}</div>

              <div className="gs-grammar-info">
                <span className="gs-grammar-title">{lesson.title}</span>
                <span className="gs-grammar-meta">
                  {completed
                    ? "✅ Completed"
                    : !unlocked
                    ? "🔒 Complete previous lesson first"
                    : `${lesson.rules?.length} rules · ${lesson.examples?.length} examples · ${lesson.exercises?.length} exercises`}
                </span>
              </div>

              {unlocked && <div className="gs-grammar-arrow" style={{ color }}>→</div>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Sub nav ───────────────────────────────────────────────────────────────────
function SubNav({ active, onChange, color, glow }) {
  return (
    <div className="gs-subnav">
      {[
        { key: "vocabulary", icon: "📚", label: "Vocabulary" },
        { key: "grammar",    icon: "📐", label: "Grammar"    },
      ].map(({ key, icon, label }) => (
        <button key={key}
          className={`gs-subnav-btn ${active === key ? "gs-subnav-active" : ""}`}
          style={active === key ? {
            background: color + "18",
            borderColor: color,
            color,
            boxShadow: `0 0 24px ${color}30`,
          } : {}}
          onClick={() => onChange(key)}
        >
          <span className="gs-subnav-icon">{icon}</span>
          <span>{label}</span>
          {active === key && <div className="gs-subnav-dot" style={{ background: color }} />}
        </button>
      ))}
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
function LearnPage() {
  const { level }     = useParams();
  const [sub, setSub] = useState("vocabulary");
  const meta  = LEVEL_META[level] || LEVEL_META.A1;
  const { rank, emoji, color, glow } = meta;
  const user  = getUser();

  const [lessonProgress, setLessonProgress] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetch(`${API}/api/progress/lesson/${user._id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then(r => r.json())
      .then(d => setLessonProgress(Array.isArray(d) ? d : []))
      .catch(() => {});
  }, [user?._id]);

  const handleProgressUpdate = () => {
    if (!user) return;
    fetch(`${API}/api/progress/lesson/${user._id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then(r => r.json())
      .then(d => setLessonProgress(Array.isArray(d) ? d : []))
      .catch(() => {});
  };

  return (
    <section className="gs-page">

      {/* ── RPG Header ── */}
      <div className="gs-header">
        <div className="rpg-title-block">
          <div className="rpg-crest" style={{ borderColor: color + "60", boxShadow: `0 0 40px ${color}30` }}>
            <div className="rpg-crest-inner" style={{ background: `radial-gradient(circle, ${color}20, transparent)` }}>
              <span className="rpg-crest-level" style={{ color, textShadow: `0 0 30px ${color}` }}>{level}</span>
              <span className="rpg-crest-emoji">{emoji}</span>
            </div>
          </div>
          <span className="rpg-rank-solo" style={{ color }}>{rank}</span>
          <Link to={`/mode/${level}`} className="rpg-back" style={{ marginLeft: "auto" }}>← Back</Link>
        </div>
      </div>

      {/* ── Sub nav ── */}
      <SubNav active={sub} onChange={setSub} color={color} glow={glow} />

      {/* ── Content ── */}
      {sub === "vocabulary" && (
        <VocabularySection
          level={level}
          lessonProgress={lessonProgress}
          onProgressUpdate={handleProgressUpdate}
        />
      )}
      {sub === "grammar" && (
        <GrammarSection
          level={level} color={color} glow={glow}
          lessonProgress={lessonProgress}
          onProgressUpdate={handleProgressUpdate}
        />
      )}

    </section>
  );
}

export default LearnPage;