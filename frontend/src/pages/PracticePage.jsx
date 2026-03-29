import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getUser, getToken } from "../utils/auth";

function PracticePage() {
  const { level } = useParams();

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
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load practice questions.");
        setLoading(false);
      });
  }, [level]);

  const handleSelect = (questionId, optionText) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionText,
    }));
  };

  const handleSubmit = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    if (questions.length === 0) {
      return;
    }

    let correct = 0;

    questions.forEach((q) => {
      const correctOption = q.options.find((opt) => opt.isCorrect);
      if (answers[q._id] === correctOption?.text) {
        correct++;
      }
    });

    const total = questions.length;
    const score = total > 0 ? Math.round((correct / total) * 100) : 0;

    setResult({ correct, total, score });

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/progress/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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

  if (loading) {
    return <p>Loading questions...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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
                  className={`option-btn ${
                    answers[q._id] === opt.text ? "selected" : ""
                  }`}
                  onClick={() => handleSelect(q._id, opt.text)}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          ))}

          <button className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </>
      )}

      {result && (
        <div className="result-box">
          <h2>Result</h2>
          <p>
            {result.correct} / {result.total}
          </p>
          <p>Score: {result.score}%</p>
        </div>
      )}
    </section>
  );
}

export default PracticePage;