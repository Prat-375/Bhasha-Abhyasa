// PracticePage.jsx
// All level data imported from a single file — allPracticeData.js
// Supports A1, A2, B1, B2 with quiz and fill-in-the-blank topics.
// Other levels fall back to the original API.

import { useState } from "react";
import { useParams } from "react-router";
import { getUser, getToken } from "../utils/auth";
import { PRACTICE_MODULES, PRACTICE_META } from "../data/allPracticeData";

// ─── Type labels ───────────────────────────────────────────────────────────────
const TYPE_LABELS = { learn: "📖 Learn", quiz: "❓ Quiz", fill: "✏️ Fill" };
const TYPE_COLORS = { learn: "tag-learn", quiz: "tag-quiz", fill: "tag-fill" };

// ─── Quiz Topic ────────────────────────────────────────────────────────────────
function QuizTopic({ topic, onComplete }) {
  const [selected, setSelected]   = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore]         = useState(null);

  const handleSelect = (qi, oi) => {
    if (submitted) return;
    setSelected((p) => ({ ...p, [qi]: oi }));
  };

  const handleSubmit = () => {
    if (Object.keys(selected).length < topic.questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }
    let correct = 0;
    topic.questions.forEach((q, i) => { if (selected[i] === q.answer) correct++; });
    setScore(correct);
    setSubmitted(true);
  };

  const handleRetry = () => { setSelected({}); setSubmitted(false); setScore(null); };

  const allAnswered = Object.keys(selected).length === topic.questions.length;
  const pct    = score !== null ? Math.round((score / topic.questions.length) * 100) : 0;
  const passed = pct >= 60;

  return (
    <div className="topic-container">
      {topic.questions.map((q, qi) => (
        <div key={qi} className="question-card">
          <h3 className="question-text">
            <span className="question-number">Q{qi + 1}.</span> {q.question}
          </h3>
          <div className="options-grid">
            {q.options.map((opt, oi) => {
              let cls = "option-btn";
              if (submitted) {
                if (oi === q.answer) cls += " correct";
                else if (selected[qi] === oi) cls += " wrong";
              } else if (selected[qi] === oi) cls += " selected";
              return (
                <button key={oi} className={cls} onClick={() => handleSelect(qi, oi)}>
                  <span className="option-letter">{["A","B","C","D"][oi]}</span>
                  {opt}
                </button>
              );
            })}
          </div>
          {submitted && (
            <p className={`answer-feedback ${selected[qi] === q.answer ? "feedback-correct" : "feedback-wrong"}`}>
              {selected[qi] === q.answer ? "✓ Correct!" : `✗ Correct answer: "${q.options[q.answer]}"`}
            </p>
          )}
        </div>
      ))}

      {!submitted ? (
        <button
          className={`primary-btn ${!allAnswered ? "btn-disabled" : ""}`}
          onClick={handleSubmit}
          disabled={!allAnswered}
        >
          Submit answers
        </button>
      ) : (
        <div className="result-box">
          <div className={`result-score ${passed ? "result-pass" : "result-fail"}`}>
            {score} / {topic.questions.length}
          </div>
          <p className="result-percent">{pct}% — {passed ? "Well done! 🎉" : "Keep practising! 💪"}</p>
          <div className="result-actions">
            <button className="secondary-btn" onClick={handleRetry}>Try again</button>
            {passed && (
              <button className="primary-btn" onClick={() => onComplete(score, topic.questions.length)}>
                Continue →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Fill Topic ────────────────────────────────────────────────────────────────
function FillTopic({ topic, onComplete }) {
  const [inputs, setInputs]       = useState(topic.sentences.reduce((a, _, i) => ({ ...a, [i]: "" }), {}));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore]         = useState(null);
  const [hints, setHints]         = useState({});

  const handleChange = (i, v) => { if (!submitted) setInputs((p) => ({ ...p, [i]: v })); };
  const toggleHint   = (i) => setHints((p) => ({ ...p, [i]: !p[i] }));

  const handleSubmit = () => {
    if (topic.sentences.some((_, i) => !inputs[i].trim())) {
      alert("Please fill in all blanks before submitting.");
      return;
    }
    let correct = 0;
    topic.sentences.forEach((s, i) => {
      if (inputs[i].trim().toLowerCase() === s.blank.toLowerCase()) correct++;
    });
    setScore(correct);
    setSubmitted(true);
  };

  const handleRetry = () => {
    setInputs(topic.sentences.reduce((a, _, i) => ({ ...a, [i]: "" }), {}));
    setSubmitted(false); setScore(null); setHints({});
  };

  const allFilled = topic.sentences.every((_, i) => inputs[i].trim());
  const pct    = score !== null ? Math.round((score / topic.sentences.length) * 100) : 0;
  const passed = pct >= 60;

  return (
    <div className="topic-container">
      <p className="topic-intro">Type the missing German word into each blank.</p>

      {topic.sentences.map((s, i) => {
        const isCorrect = submitted && inputs[i].trim().toLowerCase() === s.blank.toLowerCase();
        const isWrong   = submitted && !isCorrect;
        return (
          <div key={i} className={`fill-card ${submitted ? (isCorrect ? "fill-correct" : "fill-wrong") : ""}`}>
            <div className="fill-sentence">
              <span className="fill-text">{s.before}</span>
              <input
                type="text"
                className={`fill-input ${submitted ? (isCorrect ? "input-correct" : "input-wrong") : ""}`}
                value={inputs[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                placeholder="___"
                disabled={submitted}
              />
              <span className="fill-text">{s.after}</span>
            </div>
            <div className="fill-meta">
              {!submitted && (
                <button className="hint-btn" onClick={() => toggleHint(i)}>
                  {hints[i] ? "Hide hint" : "Show hint"}
                </button>
              )}
              {hints[i] && !submitted && <span className="hint-text">💡 {s.hint}</span>}
              {submitted && isWrong    && <span className="correct-answer">✗ Answer: <strong>{s.blank}</strong></span>}
              {submitted && isCorrect  && <span className="correct-label">✓ Correct!</span>}
            </div>
          </div>
        );
      })}

      {!submitted ? (
        <button
          className={`primary-btn ${!allFilled ? "btn-disabled" : ""}`}
          onClick={handleSubmit}
          disabled={!allFilled}
        >
          Check answers
        </button>
      ) : (
        <div className="result-box">
          <div className={`result-score ${passed ? "result-pass" : "result-fail"}`}>
            {score} / {topic.sentences.length}
          </div>
          <p className="result-percent">{pct}% — {passed ? "Great work! 🎉" : "Keep going! 💪"}</p>
          <div className="result-actions">
            <button className="secondary-btn" onClick={handleRetry}>Try again</button>
            {passed && (
              <button className="primary-btn" onClick={() => onComplete(score, topic.sentences.length)}>
                Continue →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Topic view ────────────────────────────────────────────────────────────────
function TopicView({ module, topic, onBack, onComplete }) {
  return (
    <div className="topic-view">
      <button className="back-btn" onClick={onBack}>← Back to {module.title}</button>
      <div className="topic-header">
        <span className={`topic-tag ${TYPE_COLORS[topic.type]}`}>{TYPE_LABELS[topic.type]}</span>
        <h2>{topic.title}</h2>
      </div>
      {topic.type === "quiz" && <QuizTopic topic={topic} onComplete={(c, t) => onComplete(topic.id, c, t)} />}
      {topic.type === "fill" && <FillTopic topic={topic} onComplete={(c, t) => onComplete(topic.id, c, t)} />}
    </div>
  );
}

// ─── Module view ───────────────────────────────────────────────────────────────
function ModuleView({ module, completedTopics, levelColor, onSelectTopic, onBack }) {
  const total = module.topics.length;
  const done  = module.topics.filter((t) => completedTopics[t.id]).length;
  const pct   = Math.round((done / total) * 100);

  return (
    <div className="module-view">
      <button className="back-btn" onClick={onBack}>← Back to modules</button>
      <div className="module-view-header">
        <span className="module-icon-large">{module.icon}</span>
        <div>
          <h2>{module.title}</h2>
          <p className="module-subtitle">{module.subtitle}</p>
        </div>
      </div>
      <div className="progress-bar-wrap">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${pct}%`, background: levelColor }} />
        </div>
        <span className="progress-label">{done} / {total} completed</span>
      </div>
      <div className="topics-list">
        {module.topics.map((topic) => {
          const isDone = !!completedTopics[topic.id];
          return (
            <button
              key={topic.id}
              className={`topic-row ${isDone ? "topic-done" : ""}`}
              onClick={() => onSelectTopic(topic)}
            >
              <span className={`topic-tag ${TYPE_COLORS[topic.type]}`}>{TYPE_LABELS[topic.type]}</span>
              <span className="topic-row-title">{topic.title}</span>
              {isDone && <span className="done-badge">✓</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Practice grid ─────────────────────────────────────────────────────────────
function PracticeGrid({ modules, completedTopics, meta, onSelectModule }) {
  const totalTopics = modules.reduce((s, m) => s + m.topics.length, 0);
  const doneTopics  = modules.reduce((s, m) => s + m.topics.filter((t) => completedTopics[t.id]).length, 0);
  const pct = Math.round((doneTopics / totalTopics) * 100);

  return (
    <div className="a1-grid-view">
      <div className="level-header">
        <p className="eyebrow">Practice Mode</p>
        <h1 style={{ color: meta.color }}>{meta.label}</h1>
        <p>{meta.sub}</p>
      </div>

      <div className="practice-overview-bar">
        <div className="pob-stat">
          <span className="pob-val">{doneTopics}</span>
          <span className="pob-label">Completed</span>
        </div>
        <div className="pob-progress">
          <div className="pob-track">
            <div className="pob-fill" style={{ width: `${pct}%`, background: meta.color }} />
          </div>
          <span className="pob-pct">{pct}% done</span>
        </div>
        <div className="pob-stat">
          <span className="pob-val">{totalTopics - doneTopics}</span>
          <span className="pob-label">Remaining</span>
        </div>
      </div>

      <div className="modules-grid">
        {modules.map((mod) => {
          const total  = mod.topics.length;
          const done   = mod.topics.filter((t) => completedTopics[t.id]).length;
          const modPct = Math.round((done / total) * 100);
          return (
            <button key={mod.id} className="module-card" onClick={() => onSelectModule(mod)}>
              <span className="module-icon">{mod.icon}</span>
              <div className="module-card-body">
                <h3>{mod.title}</h3>
                <p>{mod.subtitle}</p>
                <div className="card-progress-bar">
                  <div className="card-progress-fill" style={{ width: `${modPct}%`, background: meta.color }} />
                </div>
                <span className="card-progress-label">{done}/{total} topics</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Legacy API (unrecognised levels) ──────────────────────────────────────────
function LegacyPractice({ level }) {
  const [questions, setQuestions] = useState([]);
  const [answers,   setAnswers]   = useState({});
  const [loading,   setLoading]   = useState(true);
  const [result,    setResult]    = useState(null);
  const [error,     setError]     = useState("");
  const user  = getUser();
  const token = getToken();

  useState(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/practice-questions?level=${level}&type=multiple-choice`)
      .then((r) => r.json())
      .then((d) => { setQuestions(d); setLoading(false); })
      .catch(() => { setError("Failed to load practice questions."); setLoading(false); });
  }, [level]);

  const handleSelect = (qId, text) => setAnswers((p) => ({ ...p, [qId]: text }));

  const handleSubmit = async () => {
    if (!user) { alert("Please login first"); return; }
    if (!questions.length) return;
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q._id] === q.options.find((o) => o.isCorrect)?.text) correct++;
    });
    const total = questions.length;
    const score = total ? Math.round((correct / total) * 100) : 0;
    setResult({ correct, total, score });
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/progress/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ level, theme: questions[0]?.theme?._id, type: "multiple-choice", totalQuestions: total, correctAnswers: correct }),
      });
    } catch (e) { console.error(e); }
  };

  if (loading) return <p>Loading questions...</p>;
  if (error)   return <p>{error}</p>;

  return (
    <section className="content-section">
      <h1>{level} Practice</h1>
      {questions.length === 0 ? <p>No practice questions found for this level yet.</p> : (
        <>
          {questions.map((q) => (
            <div key={q._id} className="question-card">
              <h3>{q.questionText}</h3>
              {q.options.map((opt) => (
                <button
                  key={opt.text}
                  className={`option-btn ${answers[q._id] === opt.text ? "selected" : ""}`}
                  onClick={() => handleSelect(q._id, opt.text)}
                >{opt.text}</button>
              ))}
            </div>
          ))}
          <button className="submit-btn" onClick={handleSubmit}>Submit</button>
        </>
      )}
      {result && (
        <div className="result-box">
          <h2>Result</h2>
          <p>{result.correct} / {result.total}</p>
          <p>Score: {result.score}%</p>
        </div>
      )}
    </section>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
function PracticePage() {
  const { level } = useParams();
  const storageKey = `bhasha_practice_${level}`;

  const modules = PRACTICE_MODULES[level];
  const meta    = PRACTICE_META[level];

  const [completedTopics, setCompletedTopics] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || "{}"); } catch { return {}; }
  });
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedTopic,  setSelectedTopic]  = useState(null);

  const markComplete = (topicId, correct, total) => {
    const updated = { ...completedTopics, [topicId]: { correct, total, completedAt: Date.now() } };
    setCompletedTopics(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    if (selectedModule) {
      const idx  = selectedModule.topics.findIndex((t) => t.id === topicId);
      const next = selectedModule.topics[idx + 1];
      setSelectedTopic(next || null);
    }
  };

  if (!modules) return <LegacyPractice level={level} />;

  return (
    <section className="content-section">
      {!selectedModule && (
        <PracticeGrid
          modules={modules}
          completedTopics={completedTopics}
          meta={meta}
          onSelectModule={setSelectedModule}
        />
      )}
      {selectedModule && !selectedTopic && (
        <ModuleView
          module={selectedModule}
          completedTopics={completedTopics}
          levelColor={meta.color}
          onSelectTopic={setSelectedTopic}
          onBack={() => setSelectedModule(null)}
        />
      )}
      {selectedModule && selectedTopic && (
        <TopicView
          module={selectedModule}
          topic={selectedTopic}
          onBack={() => setSelectedTopic(null)}
          onComplete={markComplete}
        />
      )}
    </section>
  );
}

export default PracticePage;