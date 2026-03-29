import { useParams } from "react-router";

const practiceTypes = [
  {
    title: "Multiple Choice",
    description: "Quick questions to test grammar and vocabulary.",
  },
  {
    title: "Fill in the Blanks",
    description: "Practice sentence structure and missing words.",
  },
  {
    title: "Writing Task",
    description: "Write short responses, letters, or structured answers.",
  },
];

function PracticePage() {
  const { level } = useParams();

  return (
    <section className="content-section">
      <p className="eyebrow">Practice Mode</p>
      <h1>{level} Practice</h1>
      <p className="section-text">
        Choose how you want to practice for this level.
      </p>

      <div className="card-grid">
        {practiceTypes.map((item) => (
          <div key={item.title} className="card practice-card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <button className="primary-btn">Start</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PracticePage;