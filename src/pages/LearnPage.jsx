import { useParams } from "react-router";

const themes = [
  { name: "Greetings", status: "Completed" },
  { name: "Numbers", status: "In Progress" },
  { name: "Daily Routine", status: "Locked" },
  { name: "Travel", status: "Locked" },
];

function LearnPage() {
  const { level } = useParams();

  return (
    <section className="content-section">
      <p className="eyebrow">Learn Mode</p>
      <h1>{level} Themes</h1>
      <p className="section-text">
        Review your learning path and reopen any completed topic anytime.
      </p>

      <div className="list-block">
        {themes.map((theme) => (
          <div key={theme.name} className="list-item">
            <div>
              <h3>{theme.name}</h3>
              <p>Structured lesson for {level} learners.</p>
            </div>
            <span className={`status-pill status-${theme.status.toLowerCase().replace(/\s+/g, "-")}`}>
              {theme.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LearnPage;