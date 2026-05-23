// PracticePage.jsx
// Fetches all practice content from API — no local data imports

import { useState, useEffect } from "react";
import { useParams } from "react-router";

const API = import.meta.env.VITE_API_URL;

const LEVEL_COLORS = {
  A1: "#a78bfa", A2: "#34d399", B1: "#f472b6", B2: "#fbbf24", C1: "#38bdf8",
};

const LEVEL_LABELS = {
  A1: "Beginner", A2: "Elementary", B1: "Intermediate", B2: "Upper Intermediate", C1: "Advanced",
};

// ─── useFetch hook ─────────────────────────────────────────────────────────────
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

// ─── Skeleton ──────────────────────────────────────────────────────────────────
function Skeleton({ height = "120px" }) {
  return (
    <div style={{
      height, borderRadius: "var(--radius)",
      background: "rgba(255,255,255,0.05)",
      animation: "pulse 1.5s ease infinite",
    }} />
  );
}

// ─── Multiple choice question ──────────────────────────────────────────────────
function MCQuestion({ q, index, submitted, answers, onSelect }) {
  return (
    <div className="pr-question">
      <p className="pr-q-text"><span className="pr-qnum">Q{index + 1}.</span> {q.q || q.text || q.question}</p>
      <div className="pr-options">
        {q.options.map((opt, oi) => {
          let cls = "pr-opt";
          if (submitted) {
            const correctIdx = typeof q.answer === "number" ? q.answer : q.options.indexOf(q.answer);
            if (oi === correctIdx) cls += " pr-opt-correct";
            else if (answers[index] === oi && oi !== correctIdx) cls += " pr-opt-wrong";
            else cls += " pr-opt-dim";
          } else if (answers[index] === oi) cls += " pr-opt-selected";
          return (
            <button key={oi} className={cls} onClick={() => !submitted && onSelect(index, oi)}>
              <span className="pr-opt-letter">{"ABCD"[oi]}</span>{opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── True/False/Not-in-text question ──────────────────────────────────────────
function TFQuestion({ q, index, submitted, answers, onSelect }) {
  const opts = q.options || ["richtig", "falsch", "nicht im Text"];
  return (
    <div className="pr-question">
      <p className="pr-q-text"><span className="pr-qnum">Q{index + 1}.</span> {q.q || q.text}</p>
      <div className="pr-tf-row">
        {opts.map((opt, oi) => {
          const isAnswer = opt === q.answer ||
            (q.answer === true  && opt === "richtig") ||
            (q.answer === false && opt === "falsch");
          let cls = "pr-tf-btn";
          if (submitted) {
            if (isAnswer) cls += " pr-tf-correct";
            else if (answers[index] === oi) cls += " pr-tf-wrong";
          } else if (answers[index] === oi) cls += " pr-tf-selected";
          return (
            <button key={oi} className={cls} onClick={() => !submitted && onSelect(index, oi)}>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Result bar ────────────────────────────────────────────────────────────────
function ResultBar({ score, total, color, onRetry }) {
  const pct = Math.round((score / total) * 100);
  return (
    <div className="pr-result">
      <div className="pr-result-score" style={{ color }}>{score}/{total}</div>
      <div className="pr-result-pct">
        {pct}% — {pct >= 75 ? "Excellent! 🎉" : pct >= 50 ? "Good effort! 👍" : "Keep practising! 💪"}
      </div>
      <button className="pr-retry-btn" onClick={onRetry}>Try again</button>
    </div>
  );
}

// ─── Hören Task ────────────────────────────────────────────────────────────────
function HoerenTask({ task, color, onBack }) {
  const [answers, setAnswers]     = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore]         = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);

  const handleSelect = (qi, oi) => setAnswers((p) => ({ ...p, [qi]: oi }));

  const handleSubmit = () => {
    let correct = 0;
    task.questions.forEach((q, i) => {
      const userAns = answers[i];
      if (typeof q.answer === "number") {
        if (userAns === q.answer) correct++;
      } else {
        const opts = q.options || ["richtig", "falsch", "nicht im Text"];
        if (
          opts[userAns] === q.answer ||
          (q.answer === true  && opts[userAns] === "richtig") ||
          (q.answer === false && opts[userAns] === "falsch")
        ) correct++;
      }
    });
    setScore(correct); setSubmitted(true);
  };

  const allAnswered = task.questions.every((_, i) => answers[i] !== undefined);

  return (
    <div className="skill-task">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <div className="task-header">
        <span className="task-badge" style={{ background: color + "22", color }}>🎧 Hören</span>
        <h2 className="task-title">{task.title}</h2>
      </div>
      <div className="task-scenario">{task.scenario}</div>

      <div className="transcript-box">
        <button className="transcript-toggle" onClick={() => setShowTranscript(!showTranscript)}>
          {showTranscript ? "▲ Hide transcript" : "▼ Show transcript (Transkript)"}
        </button>
        {showTranscript && <pre className="transcript-text">{task.transcript}</pre>}
      </div>

      <div className="task-questions">
        {task.questions.map((q, i) =>
          q.options?.length === 4 && typeof q.answer === "number" ? (
            <MCQuestion key={i} q={q} index={i} submitted={submitted} answers={answers} onSelect={handleSelect} />
          ) : (
            <TFQuestion key={i} q={q} index={i} submitted={submitted} answers={answers} onSelect={handleSelect} />
          )
        )}
      </div>

      {!submitted ? (
        <button className="pr-submit-btn"
          style={{ background: allAnswered ? color : "rgba(255,255,255,0.1)" }}
          disabled={!allAnswered} onClick={handleSubmit}>
          Submit answers
        </button>
      ) : (
        <ResultBar score={score} total={task.questions.length} color={color}
          onRetry={() => { setAnswers({}); setSubmitted(false); setScore(0); }} />
      )}
    </div>
  );
}

// ─── Lesen Task ────────────────────────────────────────────────────────────────
function LesenTask({ task, color, onBack }) {
  const [answers, setAnswers]     = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore]         = useState(0);

  const handleSelect = (qi, oi) => setAnswers((p) => ({ ...p, [qi]: oi }));

  const handleSubmit = () => {
    let correct = 0;
    task.questions.forEach((q, i) => {
      const userAns = answers[i];
      const opts = q.options || ["richtig", "falsch", "nicht im Text"];
      if (typeof q.answer === "number") {
        if (userAns === q.answer) correct++;
      } else if (
        opts[userAns] === q.answer ||
        (q.answer === true  && opts[userAns] === "richtig") ||
        (q.answer === false && opts[userAns] === "falsch")
      ) correct++;
    });
    setScore(correct); setSubmitted(true);
  };

  const allAnswered = task.questions.every((_, i) => answers[i] !== undefined);

  return (
    <div className="skill-task">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <div className="task-header">
        <span className="task-badge" style={{ background: color + "22", color }}>📖 Lesen</span>
        <h2 className="task-title">{task.title}</h2>
      </div>
      <div className="task-instruction">{task.instruction}</div>

      {task.text && (
        <div className="reading-text">
          <pre className="reading-content">{task.text}</pre>
        </div>
      )}
      {task.texts && (
        <div className="reading-texts-multi">
          {task.texts.map((t) => (
            <div key={t.id} className="reading-text-card">
              <span className="reading-text-id" style={{ color }}>{t.id}</span>
              <pre className="reading-content">{t.text}</pre>
            </div>
          ))}
        </div>
      )}

      <div className="task-questions">
        {task.questions.map((q, i) =>
          q.options?.length === 4 && typeof q.answer === "number" ? (
            <MCQuestion key={i} q={q} index={i} submitted={submitted} answers={answers} onSelect={handleSelect} />
          ) : (
            <TFQuestion key={i} q={q} index={i} submitted={submitted} answers={answers} onSelect={handleSelect} />
          )
        )}
      </div>

      {!submitted ? (
        <button className="pr-submit-btn"
          style={{ background: allAnswered ? color : "rgba(255,255,255,0.1)" }}
          disabled={!allAnswered} onClick={handleSubmit}>
          Submit answers
        </button>
      ) : (
        <ResultBar score={score} total={task.questions.length} color={color}
          onRetry={() => { setAnswers({}); setSubmitted(false); setScore(0); }} />
      )}
    </div>
  );
}

// ─── Schreiben Task ────────────────────────────────────────────────────────────
function SchreibenTask({ task, color, onBack }) {
  const [text, setText]           = useState("");
  const [showModel, setShowModel] = useState(false);
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="skill-task">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <div className="task-header">
        <span className="task-badge" style={{ background: color + "22", color }}>✏️ Schreiben</span>
        <h2 className="task-title">{task.title}</h2>
      </div>
      <div className="task-instruction">{task.instruction}</div>

      {task.inputText && (
        <div className="schreiben-input-text">
          <p className="sit-label">Read this first:</p>
          <pre className="sit-content">{task.inputText}</pre>
        </div>
      )}
      {task.topic && (
        <div className="schreiben-topic">
          <p className="topic-label">Topic:</p>
          <p className="topic-text">"{task.topic}"</p>
        </div>
      )}
      {task.points?.length > 0 && (
        <div className="schreiben-checklist">
          <p className="cl-label">Your answer should include:</p>
          {task.points.map((p, i) => (
            <div key={i} className="cl-item">
              <span className="cl-num" style={{ color }}>{i + 1}</span> {p}
            </div>
          ))}
        </div>
      )}
      {task.structure?.length > 0 && (
        <div className="schreiben-structure">
          <p className="cl-label">Suggested structure:</p>
          {task.structure.map((s, i) => (
            <div key={i} className="cl-item">
              <span className="cl-num" style={{ color }}>{i + 1}</span> {s}
            </div>
          ))}
        </div>
      )}
      {(task.keyPhrases?.length || task.usefulConnectors?.length || task.keyLanguage?.length) > 0 && (
        <div className="schreiben-phrases">
          <p className="cl-label">Useful phrases:</p>
          <div className="phrases-grid">
            {(task.keyPhrases || task.usefulConnectors || task.keyLanguage || []).map((p, i) => (
              <span key={i} className="phrase-chip" style={{ borderColor: color + "55" }}>{p}</span>
            ))}
          </div>
        </div>
      )}

      <div className="writing-area">
        <div className="writing-area-header">
          <span className="writing-label">Your answer:</span>
          <span className={`word-count ${wordCount > 0 ? "wc-active" : ""}`} style={wordCount > 0 ? { color } : {}}>
            {wordCount} words
          </span>
        </div>
        <textarea className="writing-textarea" value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your answer here in German..." rows={12} />
      </div>

      <div className="model-answer-section">
        <button className="model-toggle-btn" style={{ borderColor: color, color }}
          onClick={() => setShowModel(!showModel)}>
          {showModel ? "▲ Hide model answer" : "▼ Show model answer (Musterlösung)"}
        </button>
        {showModel && task.modelAnswer && (
          <div className="model-answer">
            <p className="ma-note">💡 One possible answer — yours may differ. Check content, not just wording.</p>
            <pre className="ma-text">{task.modelAnswer}</pre>
            {task.checklist?.length > 0 && (
              <div className="ma-checklist">
                <p className="cl-label">Checklist:</p>
                {task.checklist.map((item, i) => (
                  <div key={i} className="cl-check-item">☐ {item}</div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sprechen Task ─────────────────────────────────────────────────────────────
function SprechenTask({ task, color, onBack }) {
  const [phase, setPhase] = useState("prep");

  return (
    <div className="skill-task">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <div className="task-header">
        <span className="task-badge" style={{ background: color + "22", color }}>🗣️ Sprechen</span>
        <h2 className="task-title">{task.title}</h2>
      </div>

      <div className="sprechen-phases">
        {["prep","speak","review"].map((p) => (
          <button key={p} className={`sp-phase-btn ${phase === p ? "sp-phase-active" : ""}`}
            style={phase === p ? { borderColor: color, color } : {}}
            onClick={() => setPhase(p)}>
            {{ prep: "1. Prepare", speak: "2. Speak", review: "3. Review" }[p]}
          </button>
        ))}
      </div>

      {phase === "prep" && (
        <div className="sprechen-prep">
          <div className="sp-instruction">{task.instruction}</div>
          {task.statement && <div className="sp-statement" style={{ borderLeftColor: color }}>{task.statement}</div>}
          {task.imageDescription && (
            <div className="sp-image-box">
              <p className="sp-image-label">📷 Picture to describe:</p>
              <p className="sp-image-desc">{task.imageDescription}</p>
            </div>
          )}
          {task.task && (
            <div className="sp-task-box" style={{ borderColor: color + "44" }}>
              <p className="sp-task-label">Your task:</p>
              <p className="sp-task-text">{task.task}</p>
            </div>
          )}
          {task.points?.length > 0 && (
            <div className="sp-points">
              <p className="cl-label">Talk about:</p>
              {task.points.map((p, i) => (
                <div key={i} className="cl-item"><span className="cl-num" style={{ color }}>{i + 1}</span> {p}</div>
              ))}
            </div>
          )}
          {task.structure?.length > 0 && (
            <div className="sp-structure">
              <p className="cl-label">Suggested structure:</p>
              {task.structure.map((s, i) => (
                <div key={i} className="cl-item"><span className="cl-num" style={{ color }}>{i + 1}</span> {s}</div>
              ))}
            </div>
          )}
          {task.usefulPhrases?.length > 0 && (
            <div className="sp-phrases">
              <p className="cl-label">Useful phrases:</p>
              <div className="phrases-grid">
                {task.usefulPhrases.map((p, i) => (
                  <span key={i} className="phrase-chip" style={{ borderColor: color + "55" }}>{p}</span>
                ))}
              </div>
            </div>
          )}
          {task.tip && <div className="sp-tip" style={{ borderLeftColor: color }}>💡 {task.tip}</div>}
          <button className="sp-next-btn" style={{ background: color }} onClick={() => setPhase("speak")}>
            Ready to speak →
          </button>
        </div>
      )}

      {phase === "speak" && (
        <div className="sprechen-speak">
          <div className="sp-speak-icon">🎙️</div>
          <h3>Time to speak!</h3>
          {task.statement && (
            <div className="sp-statement" style={{ borderLeftColor: color, textAlign: "center" }}>{task.statement}</div>
          )}
          <p className="sp-speak-sub">Use the phrases you prepared. Speak clearly and fully.</p>
          {task.usefulPhrases?.length > 0 && (
            <div className="sp-quick-ref">
              <p className="sp-qr-label">Quick reference:</p>
              {task.usefulPhrases.slice(0, 4).map((p, i) => (
                <div key={i} className="sp-qr-item">{p}</div>
              ))}
            </div>
          )}
          <button className="sp-next-btn" style={{ background: color }} onClick={() => setPhase("review")}>
            Done speaking →
          </button>
        </div>
      )}

      {phase === "review" && (
        <div className="sprechen-review">
          <h3>Self-review</h3>
          <p style={{ color: "var(--muted)", marginBottom: "1.5rem" }}>Honestly assess your performance:</p>
          {[
            "Did I speak clearly and at a good pace?",
            "Did I cover all the required points?",
            "Did I use varied vocabulary and sentence structures?",
            "Did I use the useful phrases?",
            "Did I handle any difficult moments well?",
          ].map((q, i) => (
            <div key={i} className="review-item">
              <p className="review-q">{q}</p>
              <div className="review-btns">
                {["Yes ✓", "Partly", "Not yet"].map((opt) => (
                  <button key={opt} className="review-btn">{opt}</button>
                ))}
              </div>
            </div>
          ))}
          <div className="sp-tip" style={{ borderLeftColor: color, marginTop: "1rem" }}>
            💡 Practice 2–3 times. Record yourself if possible — listening back reveals a lot.
          </div>
          <button className="sp-next-btn" style={{ background: color }} onClick={() => setPhase("prep")}>
            ← Practice again
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Skill Section ─────────────────────────────────────────────────────────────
function SkillSection({ skill, data, color, loading, error }) {
  const [activeTask, setActiveTask] = useState(null);

  if (loading) return <><Skeleton /><Skeleton /><Skeleton /></>;
  if (error)   return <p style={{ color: "var(--danger)" }}>Failed to load: {error}</p>;
  if (!data?.tasks?.length) return <p style={{ color: "var(--muted)" }}>No tasks available yet.</p>;

  if (activeTask !== null) {
    const task  = data.tasks[activeTask];
    const props = { task, color, onBack: () => setActiveTask(null) };
    if (skill === "hoeren")    return <HoerenTask    {...props} />;
    if (skill === "schreiben") return <SchreibenTask {...props} />;
    if (skill === "lesen")     return <LesenTask     {...props} />;
    if (skill === "sprechen")  return <SprechenTask  {...props} />;
  }

  return (
    <div className="skill-section">
      <div className="learn-section-header">
        <div>
          <h2 className="learn-section-title">{data.icon} {data.title}</h2>
          <p className="learn-section-sub">{data.description}</p>
        </div>
      </div>
      <div className="tasks-list">
        {data.tasks.map((task, i) => (
          <button key={task.id} className="task-card" onClick={() => setActiveTask(i)}>
            <div className="task-card-left">
              <div className="task-card-num" style={{ background: color + "22", color }}>{i + 1}</div>
              <div>
                <div className="task-card-title">{task.title}</div>
                <div className="task-card-meta">
                  {task.questions?.length
                    ? `${task.questions.length} questions`
                    : "Writing / Speaking task"}
                </div>
              </div>
            </div>
            <span className="task-card-arrow" style={{ color }}>→</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Practice Sub Nav ──────────────────────────────────────────────────────────
function PracticeSubNav({ active, onChange, color }) {
  return (
    <div className="sub-nav">
      {[
        { key: "hoeren",    label: "Hören",     icon: "🎧" },
        { key: "schreiben", label: "Schreiben", icon: "✏️" },
        { key: "lesen",     label: "Lesen",     icon: "📖" },
        { key: "sprechen",  label: "Sprechen",  icon: "🗣️" },
      ].map((s) => (
        <button key={s.key}
          className={`sub-nav-btn ${active === s.key ? "sub-nav-active" : ""}`}
          style={active === s.key ? { background: color + "22", borderColor: color, color } : {}}
          onClick={() => onChange(s.key)}>
          {s.icon} {s.label}
        </button>
      ))}
    </div>
  );
}

// ─── Main PracticePage ─────────────────────────────────────────────────────────
function PracticePage() {
  const { level }              = useParams();
  const [activeSkill, setActiveSkill] = useState("hoeren");
  const color = LEVEL_COLORS[level] || "#a78bfa";
  const label = LEVEL_LABELS[level] || level;

  const { data, loading, error } = useFetch(`${API}/api/practice-skills/${level}`);

  return (
    <section className="content-section">
      <div className="learn-page-header">
        <p className="eyebrow">Practice Mode</p>
        <h1 style={{ color }}>
          {level} <span style={{ color: "var(--text)", fontWeight: 400 }}>— {label}</span>
        </h1>
        <p className="section-text">Exam-style practice — Hören, Schreiben, Lesen, Sprechen.</p>
      </div>

      <PracticeSubNav active={activeSkill} onChange={setActiveSkill} color={color} />

      <SkillSection
        skill={activeSkill}
        data={data?.[activeSkill]}
        color={color}
        loading={loading}
        error={error}
      />
    </section>
  );
}

export default PracticePage;