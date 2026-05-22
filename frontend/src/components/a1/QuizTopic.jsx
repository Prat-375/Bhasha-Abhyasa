// QuizTopic.jsx
// Multiple choice quiz for a "quiz" type topic

import { useState } from "react";

function QuizTopic({ topic, onComplete }) {
  const [selected, setSelected] = useState({});   // { questionIndex: chosenOptionIndex }
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  const handleSelect = (qIndex, optIndex) => {
    if (submitted) return;
    setSelected((prev) => ({ ...prev, [qIndex]: optIndex }));
  };

  const handleSubmit = () => {
    if (Object.keys(selected).length < topic.questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    let correct = 0;
    topic.questions.forEach((q, i) => {
      if (selected[i] === q.answer) correct++;
    });

    setScore(correct);
    setSubmitted(true);
  };

  const handleRetry = () => {
    setSelected({});
    setSubmitted(false);
    setScore(null);
  };

  const allAnswered = Object.keys(selected).length === topic.questions.length;
  const percentage = score !== null ? Math.round((score / topic.questions.length) * 100) : 0;
  const passed = percentage >= 60;

  return (
    <div className="topic-container">
      {topic.questions.map((q, qIndex) => (
        <div key={qIndex} className="question-card">
          <h3 className="question-text">
            <span className="question-number">Q{qIndex + 1}.</span> {q.question}
          </h3>

          <div className="options-grid">
            {q.options.map((opt, optIndex) => {
              let optClass = "option-btn";
              if (submitted) {
                if (optIndex === q.answer) optClass += " correct";
                else if (selected[qIndex] === optIndex && optIndex !== q.answer)
                  optClass += " wrong";
              } else if (selected[qIndex] === optIndex) {
                optClass += " selected";
              }

              return (
                <button
                  key={optIndex}
                  className={optClass}
                  onClick={() => handleSelect(qIndex, optIndex)}
                >
                  <span className="option-letter">
                    {["A", "B", "C", "D"][optIndex]}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>

          {submitted && (
            <p className={`answer-feedback ${selected[qIndex] === q.answer ? "feedback-correct" : "feedback-wrong"}`}>
              {selected[qIndex] === q.answer
                ? "✓ Correct!"
                : `✗ The correct answer was: "${q.options[q.answer]}"`}
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
          <p className="result-percent">{percentage}% — {passed ? "Well done! 🎉" : "Keep practising! 💪"}</p>

          <div className="result-actions">
            <button className="secondary-btn" onClick={handleRetry}>
              Try again
            </button>
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

export default QuizTopic;