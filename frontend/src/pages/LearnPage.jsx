// LearnPage.jsx
// Structure: Level → Learn → [Vocabulary | Grammar]
// Vocabulary: flashcard-style word lists per topic
// Grammar: lessons with rules, tables, examples, fill-in exercises

import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { VOCAB_BY_LEVEL } from "../data/vocabData";
import { GRAMMAR_BY_LEVEL } from "../data/grammarData";

// ─── Level config ──────────────────────────────────────────────────────────────
const LEVEL_COLORS = {
  A1: "#a78bfa", A2: "#34d399", B1: "#f472b6", B2: "#fbbf24", C1: "#38bdf8",
};

const LEVEL_LABELS = {
  A1: "Beginner", A2: "Elementary", B1: "Intermediate", B2: "Upper Intermediate", C1: "Advanced",
};

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

      <div className={`vfc-card ${showBack ? "vfc-flipped" : ""}`} onClick={onFlip}
        style={{ "--card-color": color }}>
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
function VocabularySection({ level }) {
  const topics = VOCAB_BY_LEVEL[level] || [];
  const color = LEVEL_COLORS[level];
  const [activeTopic, setActiveTopic] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [viewMode, setViewMode] = useState("cards"); // "cards" | "list"
  const [known, setKnown] = useState(new Set());

  const topic = topics[activeTopic];
  const word = topic?.words[cardIndex];
  const totalWords = topics.reduce((s, t) => s + t.words.length, 0);
  const knownCount = known.size;

  const handleNext = () => {
    setShowBack(false);
    if (cardIndex < topic.words.length - 1) setCardIndex(cardIndex + 1);
  };

  const handlePrev = () => {
    setShowBack(false);
    if (cardIndex > 0) setCardIndex(cardIndex - 1);
  };

  const handleTopicChange = (i) => {
    setActiveTopic(i);
    setCardIndex(0);
    setShowBack(false);
  };

  const markKnown = () => {
    setKnown((prev) => new Set([...prev, `${activeTopic}-${cardIndex}`]));
    handleNext();
  };

  const isKnown = known.has(`${activeTopic}-${cardIndex}`);

  if (!topic) return <p>No vocabulary available for this level.</p>;

  return (
    <div className="learn-section">
      <div className="learn-section-header">
        <div>
          <h2 className="learn-section-title">Vocabulary</h2>
          <p className="learn-section-sub">
            Goethe-aligned word lists · {totalWords} words · {knownCount} marked known
          </p>
        </div>
        <div className="view-toggle">
          <button className={`vt-btn ${viewMode === "cards" ? "vt-active" : ""}`}
            onClick={() => setViewMode("cards")}>Cards</button>
          <button className={`vt-btn ${viewMode === "list" ? "vt-active" : ""}`}
            onClick={() => setViewMode("list")}>List</button>
        </div>
      </div>

      {/* Topic tabs */}
      <div className="topic-tabs">
        {topics.map((t, i) => (
          <button key={i}
            className={`topic-tab ${activeTopic === i ? "topic-tab-active" : ""}`}
            style={activeTopic === i ? { borderColor: color, color } : {}}
            onClick={() => handleTopicChange(i)}>
            {t.icon} {t.topic}
          </button>
        ))}
      </div>

      {viewMode === "cards" ? (
        <>
          <VocabFlashcard
            word={word}
            color={color}
            index={cardIndex}
            total={topic.words.length}
            showBack={showBack}
            onFlip={() => setShowBack(!showBack)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
          {showBack && (
            <div className="vfc-action-row">
              <button className="vfc-btn vfc-btn-again" onClick={() => { setShowBack(false); handleNext(); }}>
                🔁 Keep reviewing
              </button>
              <button
                className={`vfc-btn vfc-btn-known ${isKnown ? "vfc-btn-known-done" : ""}`}
                onClick={markKnown}>
                {isKnown ? "✓ Known" : "✓ Mark as known"}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="vocab-list-table">
          <div className="vlt-header">
            <span>German</span><span>English</span><span>Example</span><span>Plural</span>
          </div>
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
function GrammarExercise({ exercises, color }) {
  const [inputs, setInputs] = useState(exercises.reduce((a, _, i) => ({ ...a, [i]: "" }), {}));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [hints, setHints] = useState({});

  const handleCheck = () => {
    let correct = 0;
    exercises.forEach((ex, i) => {
      // Handle multi-part answers like "stehe / auf"
      const userParts = inputs[i].trim().toLowerCase().split(/\s*[/,]\s*/);
      const answerParts = ex.answer.toLowerCase().split(/\s*[/,]\s*/);
      const isCorrect = answerParts.every((part, pi) =>
        userParts[pi] && (userParts[pi].includes(part) || part.includes(userParts[pi]))
      );
      if (isCorrect) correct++;
    });
    setScore(correct);
    setSubmitted(true);
  };

  const reset = () => {
    setInputs(exercises.reduce((a, _, i) => ({ ...a, [i]: "" }), {}));
    setSubmitted(false);
    setScore(0);
    setHints({});
  };

  const pct = submitted ? Math.round((score / exercises.length) * 100) : 0;

  return (
    <div className="grammar-exercises">
      <h4 className="ge-title">Practice Exercises</h4>
      {exercises.map((ex, i) => {
        const ans = inputs[i]?.trim().toLowerCase() || "";
        const expected = ex.answer.toLowerCase();
        const correct = submitted && (ans.includes(expected) || expected.includes(ans) || ans === expected);
        const wrong = submitted && !correct;
        return (
          <div key={i} className={`ge-item ${submitted ? (correct ? "ge-correct" : "ge-wrong") : ""}`}>
            <div className="ge-sentence">{ex.sentence}</div>
            <div className="ge-input-row">
              <input
                className={`ge-input ${submitted ? (correct ? "ge-inp-correct" : "ge-inp-wrong") : ""}`}
                value={inputs[i]}
                onChange={(e) => !submitted && setInputs((p) => ({ ...p, [i]: e.target.value }))}
                placeholder="type answer..."
                disabled={submitted}
              />
              {!submitted && (
                <button className="ge-hint-btn" onClick={() => setHints((p) => ({ ...p, [i]: !p[i] }))}>
                  hint
                </button>
              )}
              {submitted && correct && <span className="ge-feedback ge-fb-ok">✓</span>}
              {submitted && wrong && <span className="ge-feedback ge-fb-bad">✗ {ex.answer}</span>}
            </div>
            {hints[i] && !submitted && <div className="ge-hint-text">💡 {ex.hint}</div>}
          </div>
        );
      })}

      {!submitted ? (
        <button className="ge-check-btn" style={{ background: color }} onClick={handleCheck}>
          Check answers
        </button>
      ) : (
        <div className="ge-result">
          <span className={`ge-score ${pct >= 60 ? "ge-score-pass" : "ge-score-fail"}`}>
            {score}/{exercises.length} — {pct}%
          </span>
          <span className="ge-result-msg">
            {pct === 100 ? "Perfect! 🎉" : pct >= 60 ? "Well done! 👍" : "Keep practising! 💪"}
          </span>
          <button className="ge-retry-btn" onClick={reset}>Try again</button>
        </div>
      )}
    </div>
  );
}

// ─── Grammar Lesson ────────────────────────────────────────────────────────────
function GrammarLesson({ lesson, color, onBack }) {
  const [activeTab, setActiveTab] = useState("rules");

  return (
    <div className="grammar-lesson">
      <button className="back-btn" onClick={onBack}>← Back to lessons</button>

      <div className="gl-header">
        <span className="gl-icon">{lesson.icon}</span>
        <h2 className="gl-title">{lesson.title}</h2>
      </div>

      <div className="gl-explanation">{lesson.explanation}</div>

      <div className="gl-tabs">
        {["rules", "table", "examples", "practice"].filter(t => t !== "table" || lesson.table).map((tab) => (
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
            <div key={i} className={`gl-rule ${rule.startsWith("⚠️") ? "gl-rule-warn" : ""}`}>
              {rule}
            </div>
          ))}
        </div>
      )}

      {activeTab === "table" && lesson.table && (
        <div className="gl-table-wrap">
          <table className="gl-table">
            <thead>
              <tr>{lesson.table.headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {lesson.table.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    ci === 0
                      ? <td key={ci} className="gl-td-head">{cell}</td>
                      : <td key={ci} style={cell.includes("→") ? { color } : {}}>{cell}</td>
                  ))}
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
        <GrammarExercise exercises={lesson.exercises} color={color} />
      )}
    </div>
  );
}

// ─── Grammar Section ───────────────────────────────────────────────────────────
function GrammarSection({ level, color }) {
  const lessons = GRAMMAR_BY_LEVEL[level] || [];
  const [activeLesson, setActiveLesson] = useState(null);

  if (activeLesson !== null) {
    return (
      <GrammarLesson
        lesson={lessons[activeLesson]}
        color={color}
        onBack={() => setActiveLesson(null)}
      />
    );
  }

  return (
    <div className="learn-section">
      <div className="learn-section-header">
        <div>
          <h2 className="learn-section-title">Grammar</h2>
          <p className="learn-section-sub">
            {level} grammar lessons · rules, tables, examples & exercises
          </p>
        </div>
      </div>

      <div className="grammar-lessons-list">
        {lessons.map((lesson, i) => (
          <button key={lesson.id} className="gl-card" onClick={() => setActiveLesson(i)}>
            <div className="gl-card-left">
              <span className="gl-card-icon">{lesson.icon}</span>
              <div>
                <div className="gl-card-title">{lesson.title}</div>
                <div className="gl-card-meta">
                  {lesson.rules.length} rules · {lesson.examples.length} examples · {lesson.exercises.length} exercises
                </div>
              </div>
            </div>
            <span className="gl-card-arrow" style={{ color }}>→</span>
          </button>
        ))}
        {lessons.length === 0 && (
          <p style={{ color: "var(--muted)" }}>Grammar content coming soon for {level}.</p>
        )}
      </div>
    </div>
  );
}

// ─── Sub-section selector ──────────────────────────────────────────────────────
function LearnSubNav({ active, onChange, color }) {
  return (
    <div className="sub-nav">
      {["vocabulary", "grammar"].map((s) => (
        <button
          key={s}
          className={`sub-nav-btn ${active === s ? "sub-nav-active" : ""}`}
          style={active === s ? { background: color + "22", borderColor: color, color } : {}}
          onClick={() => onChange(s)}>
          {s === "vocabulary" ? "📚 Vocabulary" : "📐 Grammar"}
        </button>
      ))}
    </div>
  );
}

// ─── Main LearnPage ────────────────────────────────────────────────────────────
function LearnPage() {
  const { level } = useParams();
  const [subSection, setSubSection] = useState("vocabulary");
  const color = LEVEL_COLORS[level] || "#a78bfa";
  const label = LEVEL_LABELS[level] || level;

  const hasContent = VOCAB_BY_LEVEL[level] || GRAMMAR_BY_LEVEL[level];

  if (!hasContent) {
    return (
      <section className="content-section">
        <p className="eyebrow">Learn Mode</p>
        <h1>{level} — {label}</h1>
        <p className="section-text">Content for this level is coming soon.</p>
      </section>
    );
  }

  return (
    <section className="content-section">
      <div className="learn-page-header">
        <div>
          <p className="eyebrow">Learn Mode</p>
          <h1 style={{ color }}>
            {level} <span style={{ color: "var(--text)", fontWeight: 400 }}>— {label}</span>
          </h1>
          <p className="section-text">
            Choose a section below to start learning.
          </p>
        </div>
      </div>

      <LearnSubNav active={subSection} onChange={setSubSection} color={color} />

      {subSection === "vocabulary" && (
        <VocabularySection level={level} />
      )}
      {subSection === "grammar" && (
        <GrammarSection level={level} color={color} />
      )}
    </section>
  );
}

export default LearnPage;