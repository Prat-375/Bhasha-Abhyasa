// PracticePage.jsx
// Replaces the original PracticePage.
//
// Flow for A1:
//   /practice/A1  →  Module grid  →  Topic list  →  Learn / Quiz / Fill
//
// All other levels (A2, B1 …) still hit the original API as before.

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getUser, getToken } from "../utils/auth";
import { a1Modules } from "../data/a1Modules";
import LearnTopic from "../components/a1/LearnTopic";
import QuizTopic from "../components/a1/QuizTopic";
import FillTopic from "../components/a1/FillTopic";

// ─── helpers ────────────────────────────────────────────────────────────────

const TYPE_LABELS = { learn: "📖 Learn", quiz: "❓ Quiz", fill: "✏️ Fill" };
const TYPE_COLORS = { learn: "tag-learn", quiz: "tag-quiz", fill: "tag-fill" };

// ─── sub-views ──────────────────────────────────────────────────────────────

function TopicView({ module, topic, onBack, onComplete }) {
  const handleComplete = (correct, total) => {
    onComplete(topic.id, correct, total);
  };

  return (
    <div className="topic-view">
      <button className="back-btn" onClick={onBack}>
        ← Back to {module.title}
      </button>

      <div className="topic-header">
        <span className={`topic-tag ${TYPE_COLORS[topic.type]}`}>
          {TYPE_LABELS[topic.type]}
        </span>
        <h2>{topic.title}</h2>
      </div>

      {topic.type === "learn" && (
        <LearnTopic topic={topic} onComplete={() => handleComplete(1, 1)} />
      )}
      {topic.type === "quiz" && (
        <QuizTopic topic={topic} onComplete={handleComplete} />
      )}
      {topic.type === "fill" && (
        <FillTopic topic={topic} onComplete={handleComplete} />
      )}
    </div>
  );
}

function ModuleView({ module, completedTopics, onSelectTopic, onBack }) {
  const total = module.topics.length;
  const done = module.topics.filter((t) => completedTopics[t.id]).length;
  const progress = Math.round((done / total) * 100);

  return (
    <div className="module-view">
      <button className="back-btn" onClick={onBack}>
        ← Back to modules
      </button>

      <div className="module-view-header">
        <span className="module-icon-large">{module.icon}</span>
        <div>
          <h2>{module.title}</h2>
          <p className="module-subtitle">{module.subtitle}</p>
        </div>
      </div>

      <div className="progress-bar-wrap">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
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
              <span className={`topic-tag ${TYPE_COLORS[topic.type]}`}>
                {TYPE_LABELS[topic.type]}
              </span>
              <span className="topic-row-title">{topic.title}</span>
              {isDone && <span className="done-badge">✓</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function A1ModuleGrid({ completedTopics, onSelectModule }) {
  return (
    <div className="a1-grid-view">
      <div className="level-header">
        <h1>A1 — Beginner German</h1>
        <p>Choose a module to start learning.</p>
      </div>

      <div className="modules-grid">
        {a1Modules.map((mod) => {
          const total = mod.topics.length;
          const done = mod.topics.filter((t) => completedTopics[t.id]).length;
          const pct = Math.round((done / total) * 100);

          return (
            <button
              key={mod.id}
              className="module-card"
              onClick={() => onSelectModule(mod)}
            >
              <span className="module-icon">{mod.icon}</span>
              <div className="module-card-body">
                <h3>{mod.title}</h3>
                <p>{mod.subtitle}</p>
                <div className="card-progress-bar">
                  <div className="card-progress-fill" style={{ width: `${pct}%` }} />
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

// ─── legacy API-backed view (A2, B1, …) ─────────────────────────────────────

function LegacyPractice({ level }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const user = getUser();
  const token = getToken();

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/api/practice-questions?level=${level}&type=multiple-choice`
    )
      .then((res) => res.json())
      .then((data) => { setQuestions(data); setLoading(false); })
      .catch((err) => { console.error(err); setError("Failed to load practice questions."); setLoading(false); });
  }, [level]);

  const handleSelect = (questionId, optionText) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionText }));
  };

  const handleSubmit = async () => {
    if (!user) { alert("Please login first"); return; }
    if (questions.length === 0) return;

    let correct = 0;
    questions.forEach((q) => {
      const correctOption = q.options.find((opt) => opt.isCorrect);
      if (answers[q._id] === correctOption?.text) correct++;
    });

    const total = questions.length;
    const score = total > 0 ? Math.round((correct / total) * 100) : 0;
    setResult({ correct, total, score });

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/progress/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          level,
          theme: questions[0]?.theme?._id,
          type: "multiple-choice",
          totalQuestions: total,
          correctAnswers: correct,
        }),
      });
    } catch (err) {
      console.error("Failed to save progress:", err);
    }
  };

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="content-section">
      <h1>{level} Practice</h1>
      {questions.length === 0 ? (
        <p>No practice questions found for this level yet.</p>
      ) : (
        <>
          {questions.map((q) => (
            <div key={q._id} className="question-card">
              <h3>{q.questionText}</h3>
              {q.options.map((opt) => (
                <button
                  key={opt.text}
                  className={`option-btn ${answers[q._id] === opt.text ? "selected" : ""}`}
                  onClick={() => handleSelect(q._id, opt.text)}
                >
                  {opt.text}
                </button>
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

// ─── main component ──────────────────────────────────────────────────────────

function PracticePage() {
  const { level } = useParams();

  // Navigation state for A1 flow
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  // Persist completed topics in localStorage so progress survives page refresh
  const storageKey = `bhasha_completed_${level}`;
  const [completedTopics, setCompletedTopics] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "{}");
    } catch {
      return {};
    }
  });

  const markComplete = (topicId, correct, total) => {
    const updated = { ...completedTopics, [topicId]: { correct, total, completedAt: Date.now() } };
    setCompletedTopics(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));

    // Auto-advance to next topic in the module
    if (selectedModule) {
      const currentIndex = selectedModule.topics.findIndex((t) => t.id === topicId);
      const nextTopic = selectedModule.topics[currentIndex + 1];
      if (nextTopic) {
        setSelectedTopic(nextTopic);
      } else {
        // All topics done — go back to module view
        setSelectedTopic(null);
      }
    }
  };

  // Non-A1 levels use the old API flow
  if (level !== "A1") {
    return <LegacyPractice level={level} />;
  }

  // A1 three-level navigation: grid → module → topic
  return (
    <section className="content-section">
      {!selectedModule && (
        <A1ModuleGrid
          completedTopics={completedTopics}
          onSelectModule={setSelectedModule}
        />
      )}

      {selectedModule && !selectedTopic && (
        <ModuleView
          module={selectedModule}
          completedTopics={completedTopics}
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