import { Link, useParams } from "react-router";

function ModePage() {
  const { level } = useParams();

  return (
    <section className="content-section">
      <p className="eyebrow">Selected Level</p>
      <h1>{level}</h1>
      <p className="section-text">
        What would you like to do for this level?
      </p>

      <div className="mode-grid">
        <Link to={`/learn/${level}`} className="card mode-card">
          <h2>Learn</h2>
          <p>Study themes, grammar points, vocabulary, and completed topics.</p>
        </Link>

        <Link to={`/practice/${level}`} className="card mode-card">
          <h2>Practice</h2>
          <p>Try multiple choice, fill in the blanks, and writing exercises.</p>
        </Link>
      </div>
    </section>
  );
}

export default ModePage;