// FillTopic.jsx
// Fill-in-the-blank exercises for a "fill" type topic

import { useState } from "react";

function FillTopic({ topic, onComplete }) {
  const [inputs, setInputs] = useState(
    topic.sentences.reduce((acc, _, i) => ({ ...acc, [i]: "" }), {})
  );
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [showHints, setShowHints] = useState({});

  const handleChange = (index, value) => {
    if (submitted) return;
    setInputs((prev) => ({ ...prev, [index]: value }));
  };

  const toggleHint = (index) => {
    setShowHints((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleSubmit = () => {
    const allFilled = topic.sentences.every((_, i) => inputs[i].trim() !== "");
    if (!allFilled) {
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
    setInputs(topic.sentences.reduce((acc, _, i) => ({ ...acc, [i]: "" }), {}));
    setSubmitted(false);
    setScore(null);
    setShowHints({});
  };

  const allFilled = topic.sentences.every((_, i) => inputs[i].trim() !== "");
  const percentage = score !== null ? Math.round((score / topic.sentences.length) * 100) : 0;
  const passed = percentage >= 60;

  return (
    <div className="topic-container">
      <p className="topic-intro">
        Type the missing German word into each blank.
      </p>

      {topic.sentences.map((s, i) => {
        const isCorrect = submitted && inputs[i].trim().toLowerCase() === s.blank.toLowerCase();
        const isWrong = submitted && inputs[i].trim().toLowerCase() !== s.blank.toLowerCase();

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
                  {showHints[i] ? "Hide hint" : "Show hint"}
                </button>
              )}
              {showHints[i] && !submitted && (
                <span className="hint-text">💡 {s.hint}</span>
              )}
              {submitted && isWrong && (
                <span className="correct-answer">
                  ✗ Correct answer: <strong>{s.blank}</strong>
                </span>
              )}
              {submitted && isCorrect && (
                <span className="correct-label">✓ Correct!</span>
              )}
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
          <p className="result-percent">{percentage}% — {passed ? "Great work! 🎉" : "Keep going! 💪"}</p>

          <div className="result-actions">
            <button className="secondary-btn" onClick={handleRetry}>
              Try again
            </button>
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

export default FillTopic;