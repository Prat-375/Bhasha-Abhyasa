import { useState, useEffect, useRef } from "react";
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

  // Build visible indices in circular manner
  const visibleIndices = Array.from({ length: visible }, (_, i) => (startIndex + i) % total);

  return (
    <div className="gs-topic-screen">
      <div className="gs-topic-header">
        <h2 className="gs-topic-heading" style={{ color }}>📚 Choose a Topic</h2>
        <p className="gs-topic-sub">Complete each topic to unlock the next</p>
      </div>

      <div className="gs-topic-slider-row">

        {/* Left arrow */}
        <button className="gs-slider-arrow" onClick={goPrev}>←</button>

        {/* Cards */}
        <div className="gs-topic-cards-wrap" style={{ gridTemplateColumns: `repeat(${visible}, 1fr)` }}>
          {visibleIndices.map((topicIdx) => {
            const t         = topics[topicIdx];
            const unlocked  = isUnlocked(topicIdx);
            const completed = isCompleted(topicIdx);
            const active    = unlocked && !completed;

            return (
              <div
                key={topicIdx}
                className={`gs-topic-card ${!unlocked ? "gs-locked" : ""} ${completed ? "gs-completed" : ""} ${active ? "gs-active" : ""}`}
                style={unlocked ? {
                  "--tc": color,
                  "--tg": glow,
                  borderColor: completed ? "#34d39950" : active ? color + "60" : "transparent",
                  boxShadow: active ? `0 0 30px ${color}30` : "none",
                } : {}}
                onClick={() => unlocked && onSelect(topicIdx)}
              >
                {!unlocked && (
                  <div className="gs-lock-overlay">
                    <span className="gs-lock-icon">🔒</span>
                  </div>
                )}

                <div className="gs-topic-num"
                  style={completed
                    ? { background: "#34d39925", borderColor: "#34d39960", color: "#34d399" }
                    : active
                    ? { background: color + "20", borderColor: color + "50", color }
                    : {}}>
                  {completed ? "✓" : topicIdx + 1}
                </div>

                <div className="gs-topic-emoji">{t.icon}</div>
                <div className="gs-topic-name">{t.topic}</div>
                <div className="gs-topic-count" style={{ color: unlocked ? color : "var(--muted)" }}>
                  {t.words?.length} words
                </div>

                {completed && <div className="gs-topic-done-bar"   style={{ background: "#34d399" }} />}
                {active    && <div className="gs-topic-active-indicator" style={{ background: color }} />}
              </div>
            );
          })}
        </div>

        {/* Right arrow */}
        <button className="gs-slider-arrow" onClick={goNext}>→</button>

      </div>

      {/* Dots */}
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

// ─── Immersive Flashcard Screen ────────────────────────────────────────────────
function FlashcardScreen({ topic, topicIndex, color, glow, level, lessonProgress, onProgressUpdate, onBack }) {
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped]     = useState(false);
  const [known, setKnown]         = useState(new Set());
  const [exiting, setExiting]     = useState(null); // "left" | "right"
  const [completed, setCompleted] = useState(false);

  const word  = topic.words[cardIndex];
  const total = topic.words.length;
  const pct   = Math.round(((cardIndex) / total) * 100);

  const goNext = (dir) => {
    if (cardIndex >= total - 1) return;
    setExiting(dir);
    setTimeout(() => {
      setCardIndex(i => i + 1);
      setFlipped(false);
      setExiting(null);
    }, 280);
  };

  const goPrev = () => {
    if (cardIndex === 0) return;
    setExiting("right");
    setTimeout(() => {
      setCardIndex(i => i - 1);
      setFlipped(false);
      setExiting(null);
    }, 280);
  };

  const markKnown = async () => {
    const newKnown = new Set([...known, cardIndex]);
    setKnown(newKnown);
    if (cardIndex === total - 1) {
      // Last card — complete topic
      const score = Math.round((newKnown.size / total) * 100);
      await saveLessonProgress({ level, sectionType: "vocabulary", sectionIndex: topicIndex, sectionId: topic.topic, score });
      onProgressUpdate();
      setCompleted(true);
    } else {
      goNext("left");
    }
  };

  const keepReviewing = () => {
    if (cardIndex === total - 1) {
      setCardIndex(0); setFlipped(false);
    } else {
      goNext("left");
    }
  };

  // Completed screen
  if (completed) {
    return (
      <div className="gs-complete-screen">
        <div className="gs-complete-inner" style={{ "--cc": color, "--cg": glow }}>
          <div className="gs-complete-glow" style={{ background: `radial-gradient(circle, ${glow}, transparent 65%)` }} />
          <span className="gs-complete-emoji">🎉</span>
          <h2 className="gs-complete-title" style={{ color }}>Topic Complete!</h2>
          <p className="gs-complete-sub">{topic.topic} — {known.size}/{total} words learned</p>
          <div className="gs-complete-actions">
            <button className="gs-complete-btn gs-btn-secondary" onClick={onBack}>← Back to Topics</button>
            <button className="gs-complete-btn gs-btn-primary" style={{ background: color, boxShadow: `0 8px 30px ${color}50` }} onClick={onBack}>
              Next Topic →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="gs-card-screen">

      {/* Top bar */}
      <div className="gs-card-topbar">
        <button className="gs-back-btn" onClick={onBack}>
          ← {topic.topic}
        </button>
        <div className="gs-card-progress">
          <div className="gs-card-prog-track">
            <div className="gs-card-prog-fill" style={{ width: `${pct}%`, background: color }} />
          </div>
          <span className="gs-card-counter" style={{ color }}>{cardIndex + 1} / {total}</span>
        </div>
        <span className="gs-known-count" style={{ color }}>
          ✓ {known.size} known
        </span>
      </div>

      {/* Giant flashcard */}
      <div className="gs-card-stage">
        <div
          className={`gs-flashcard ${flipped ? "gs-flipped" : ""} ${exiting === "left" ? "gs-exit-left" : exiting === "right" ? "gs-exit-right" : ""}`}
          style={{ "--fc": color, "--fg": glow }}
          onClick={() => !exiting && setFlipped(f => !f)}
        >
          <div className="gs-card-inner">

            {/* Front */}
            <div className="gs-card-face gs-card-front">
              <div className="gs-card-bg-glow" style={{ background: `radial-gradient(ellipse at 50% 0%, ${color}12, transparent 60%)` }} />

              {/* Garland top-left */}
              <svg className="gs-card-garland-tl" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8"  cy="8"  r="5" fill="#f472b6" opacity="0.7"/>
                <circle cx="20" cy="6"  r="3.5" fill="#34d399" opacity="0.7"/>
                <circle cx="30" cy="10" r="4" fill="#fbbf24" opacity="0.7"/>
                <circle cx="42" cy="7"  r="3" fill="#a78bfa" opacity="0.7"/>
                <circle cx="52" cy="12" r="4.5" fill="#f472b6" opacity="0.6"/>
                <circle cx="6"  cy="20" r="3.5" fill="#38bdf8" opacity="0.7"/>
                <circle cx="10" cy="32" r="4" fill="#fbbf24" opacity="0.6"/>
                <circle cx="7"  cy="44" r="3" fill="#34d399" opacity="0.7"/>
                <circle cx="12" cy="54" r="4.5" fill="#f472b6" opacity="0.6"/>
                <path d="M8,8 Q14,7 20,6 Q25,8 30,10 Q36,8 42,7 Q47,9 52,12" stroke="#d1a8c4" strokeWidth="1.2" fill="none" opacity="0.4"/>
                <path d="M8,8 Q7,14 6,20 Q8,26 10,32 Q8,38 7,44 Q9,49 12,54" stroke="#d1a8c4" strokeWidth="1.2" fill="none" opacity="0.4"/>
                {/* Tiny leaves */}
                <ellipse cx="15" cy="7"  rx="3" ry="1.5" fill="#86efac" opacity="0.6" transform="rotate(-20 15 7)"/>
                <ellipse cx="36" cy="8"  rx="3" ry="1.5" fill="#86efac" opacity="0.6" transform="rotate(15 36 8)"/>
                <ellipse cx="8"  cy="26" rx="1.5" ry="3" fill="#86efac" opacity="0.6" transform="rotate(-10 8 26)"/>
                <ellipse cx="9"  cy="49" rx="3" ry="1.5" fill="#86efac" opacity="0.6" transform="rotate(25 9 49)"/>
              </svg>

              {/* Garland bottom-right */}
              <svg className="gs-card-garland-br" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8"  cy="8"  r="5" fill="#f472b6" opacity="0.7"/>
                <circle cx="20" cy="6"  r="3.5" fill="#34d399" opacity="0.7"/>
                <circle cx="30" cy="10" r="4" fill="#fbbf24" opacity="0.7"/>
                <circle cx="42" cy="7"  r="3" fill="#a78bfa" opacity="0.7"/>
                <circle cx="52" cy="12" r="4.5" fill="#f472b6" opacity="0.6"/>
                <circle cx="6"  cy="20" r="3.5" fill="#38bdf8" opacity="0.7"/>
                <circle cx="10" cy="32" r="4" fill="#fbbf24" opacity="0.6"/>
                <circle cx="7"  cy="44" r="3" fill="#34d399" opacity="0.7"/>
                <circle cx="12" cy="54" r="4.5" fill="#f472b6" opacity="0.6"/>
                <path d="M8,8 Q14,7 20,6 Q25,8 30,10 Q36,8 42,7 Q47,9 52,12" stroke="#d1a8c4" strokeWidth="1.2" fill="none" opacity="0.4"/>
                <path d="M8,8 Q7,14 6,20 Q8,26 10,32 Q8,38 7,44 Q9,49 12,54" stroke="#d1a8c4" strokeWidth="1.2" fill="none" opacity="0.4"/>
                <ellipse cx="15" cy="7"  rx="3" ry="1.5" fill="#86efac" opacity="0.6" transform="rotate(-20 15 7)"/>
                <ellipse cx="36" cy="8"  rx="3" ry="1.5" fill="#86efac" opacity="0.6" transform="rotate(15 36 8)"/>
                <ellipse cx="8"  cy="26" rx="1.5" ry="3" fill="#86efac" opacity="0.6" transform="rotate(-10 8 26)"/>
                <ellipse cx="9"  cy="49" rx="3" ry="1.5" fill="#86efac" opacity="0.6" transform="rotate(25 9 49)"/>
              </svg>

              <div className="gs-fc-corner gs-fc-tl" />
              <div className="gs-fc-corner gs-fc-tr" />
              <div className="gs-fc-corner gs-fc-bl" />
              <div className="gs-fc-corner gs-fc-br" />

              <div className="gs-card-lang-tag">🇩🇪 German</div>
              <div className="gs-card-word">{word.de}</div>
              {word.plural && word.plural !== "-" && word.plural !== "(no plural)" && (
                <div className="gs-card-plural">Plural: {word.plural}</div>
              )}
              {word.tip && (
                <div className="gs-card-tip">💡 {word.tip}</div>
              )}
              <div className="gs-card-hint">tap to flip ↺</div>
            </div>

            {/* Back */}
            <div className="gs-card-face gs-card-back">
              <div className="gs-card-bg-glow" style={{ background: `radial-gradient(ellipse at 50% 100%, ${color}12, transparent 60%)` }} />

              <svg className="gs-card-garland-tl" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8"  cy="8"  r="5" fill="#f472b6" opacity="0.7"/>
                <circle cx="20" cy="6"  r="3.5" fill="#34d399" opacity="0.7"/>
                <circle cx="30" cy="10" r="4" fill="#fbbf24" opacity="0.7"/>
                <circle cx="42" cy="7"  r="3" fill="#a78bfa" opacity="0.7"/>
                <circle cx="52" cy="12" r="4.5" fill="#f472b6" opacity="0.6"/>
                <circle cx="6"  cy="20" r="3.5" fill="#38bdf8" opacity="0.7"/>
                <circle cx="10" cy="32" r="4" fill="#fbbf24" opacity="0.6"/>
                <circle cx="7"  cy="44" r="3" fill="#34d399" opacity="0.7"/>
                <circle cx="12" cy="54" r="4.5" fill="#f472b6" opacity="0.6"/>
                <path d="M8,8 Q14,7 20,6 Q25,8 30,10 Q36,8 42,7 Q47,9 52,12" stroke="#d1a8c4" strokeWidth="1.2" fill="none" opacity="0.4"/>
                <path d="M8,8 Q7,14 6,20 Q8,26 10,32 Q8,38 7,44 Q9,49 12,54" stroke="#d1a8c4" strokeWidth="1.2" fill="none" opacity="0.4"/>
                <ellipse cx="15" cy="7"  rx="3" ry="1.5" fill="#86efac" opacity="0.6" transform="rotate(-20 15 7)"/>
                <ellipse cx="36" cy="8"  rx="3" ry="1.5" fill="#86efac" opacity="0.6" transform="rotate(15 36 8)"/>
                <ellipse cx="8"  cy="26" rx="1.5" ry="3" fill="#86efac" opacity="0.6" transform="rotate(-10 8 26)"/>
                <ellipse cx="9"  cy="49" rx="3" ry="1.5" fill="#86efac" opacity="0.6" transform="rotate(25 9 49)"/>
              </svg>

              <svg className="gs-card-garland-br" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8"  cy="8"  r="5" fill="#f472b6" opacity="0.7"/>
                <circle cx="20" cy="6"  r="3.5" fill="#34d399" opacity="0.7"/>
                <circle cx="30" cy="10" r="4" fill="#fbbf24" opacity="0.7"/>
                <circle cx="42" cy="7"  r="3" fill="#a78bfa" opacity="0.7"/>
                <circle cx="52" cy="12" r="4.5" fill="#f472b6" opacity="0.6"/>
                <circle cx="6"  cy="20" r="3.5" fill="#38bdf8" opacity="0.7"/>
                <circle cx="10" cy="32" r="4" fill="#fbbf24" opacity="0.6"/>
                <circle cx="7"  cy="44" r="3" fill="#34d399" opacity="0.7"/>
                <circle cx="12" cy="54" r="4.5" fill="#f472b6" opacity="0.6"/>
                <path d="M8,8 Q14,7 20,6 Q25,8 30,10 Q36,8 42,7 Q47,9 52,12" stroke="#d1a8c4" strokeWidth="1.2" fill="none" opacity="0.4"/>
                <path d="M8,8 Q7,14 6,20 Q8,26 10,32 Q8,38 7,44 Q9,49 12,54" stroke="#d1a8c4" strokeWidth="1.2" fill="none" opacity="0.4"/>
                <ellipse cx="15" cy="7"  rx="3" ry="1.5" fill="#86efac" opacity="0.6" transform="rotate(-20 15 7)"/>
                <ellipse cx="36" cy="8"  rx="3" ry="1.5" fill="#86efac" opacity="0.6" transform="rotate(15 36 8)"/>
                <ellipse cx="8"  cy="26" rx="1.5" ry="3" fill="#86efac" opacity="0.6" transform="rotate(-10 8 26)"/>
                <ellipse cx="9"  cy="49" rx="3" ry="1.5" fill="#86efac" opacity="0.6" transform="rotate(25 9 49)"/>
              </svg>

              <div className="gs-fc-corner gs-fc-tl" />
              <div className="gs-fc-corner gs-fc-tr" />
              <div className="gs-fc-corner gs-fc-bl" />
              <div className="gs-fc-corner gs-fc-br" />

              <div className="gs-card-lang-tag">🇬🇧 English</div>
              <div className="gs-card-word gs-word-en" style={{ color }}>{word.en}</div>
              {word.example && (
                <div className="gs-card-example" style={{ borderLeftColor: color + "80" }}>
                  "{word.example}"
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      {flipped && (
        <div className="gs-card-actions">
          <button className="gs-action-btn gs-btn-review" onClick={keepReviewing}>
            🔁 Keep Reviewing
          </button>
          <button className="gs-action-btn gs-btn-known"
            style={{ borderColor: color + "60", background: color + "18", color }}
            onClick={markKnown}>
            ✓ Mark as Known
          </button>
        </div>
      )}

      {/* Nav arrows */}
      <div className="gs-card-nav">
        <button className="gs-nav-arrow" onClick={goPrev} disabled={cardIndex === 0}>←</button>
        <div className="gs-nav-dots">
          {Array.from({ length: Math.min(total, 7) }, (_, i) => {
            const dotIdx = total <= 7 ? i : Math.floor((i / 6) * (total - 1));
            return (
              <div key={i} className="gs-nav-dot"
                style={{ background: dotIdx <= cardIndex ? color : "rgba(255,255,255,0.15)", width: dotIdx === cardIndex ? "20px" : "6px" }} />
            );
          })}
        </div>
        <button className="gs-nav-arrow" onClick={() => goNext("left")} disabled={cardIndex === total - 1}>→</button>
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
  if (error)        return <p style={{ color: "var(--danger)" }}>Failed to load vocabulary.</p>;
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
              <input className={`ge-input ${submitted ? (correct ? "ge-inp-correct" : "ge-inp-wrong") : ""}`}
                value={inputs[i]} onChange={(e) => !submitted && setInputs(p => ({ ...p, [i]: e.target.value }))}
                placeholder="type answer..." disabled={submitted} />
              {!submitted && <button className="ge-hint-btn" onClick={() => setHints(p => ({ ...p, [i]: !p[i] }))}>hint</button>}
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
      <button className="gs-back-btn" style={{ marginBottom: "1.5rem" }} onClick={onBack}>← Back to lessons</button>
      <div className="gl-header">
        <span className="gl-icon">{lesson.icon}</span>
        <h2 className="gl-title">{lesson.title}</h2>
      </div>
      <div className="gl-explanation">{lesson.explanation}</div>
      <div className="gl-tabs">
        {tabs.map(tab => (
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
                    : <td key={ci} style={cell.includes("→") ? { color } : {}}>{cell}</td>)}
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
        <GrammarExercise exercises={lesson.exercises} color={color}
          lessonIndex={lessonIndex} lessonId={lesson.id}
          level={level} onComplete={onComplete} />
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
  if (error)         return <p style={{ color: "var(--danger)" }}>Failed to load grammar.</p>;
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
              {/* Left glow bar */}
              {unlocked && !completed && <div className="gs-row-bar" style={{ background: color }} />}
              {completed          && <div className="gs-row-bar" style={{ background: "#34d399" }} />}

              {/* Number */}
              <div className="gs-grammar-num"
                style={completed ? { background: "#34d39925", borderColor: "#34d39960", color: "#34d399" }
                  : unlocked ? { background: color + "20", borderColor: color + "50", color }
                  : {}}>
                {completed ? "✓" : !unlocked ? "🔒" : i + 1}
              </div>

              {/* Icon */}
              <div className="gs-grammar-icon">{unlocked ? lesson.icon : "📖"}</div>

              {/* Info */}
              <div className="gs-grammar-info">
                <span className="gs-grammar-title">{lesson.title}</span>
                <span className="gs-grammar-meta">
                  {completed ? "✅ Completed"
                    : !unlocked ? "🔒 Complete previous lesson first"
                    : `${lesson.rules?.length} rules · ${lesson.examples?.length} examples · ${lesson.exercises?.length} exercises`}
                </span>
              </div>

              {/* Arrow */}
              {unlocked && (
                <div className="gs-grammar-arrow" style={{ color }}>→</div>
              )}
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
        <VocabularySection level={level} lessonProgress={lessonProgress} onProgressUpdate={handleProgressUpdate} />
      )}
      {sub === "grammar" && (
        <GrammarSection level={level} color={color} glow={glow} lessonProgress={lessonProgress} onProgressUpdate={handleProgressUpdate} />
      )}

    </section>
  );
}

export default LearnPage;