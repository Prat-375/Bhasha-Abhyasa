import LevelCard from "../components/LevelCard";
import levels from "../data/levels";

function HomePage() {
  return (
    <section className="hero-section">
      <div className="hero-copy">
        <p className="eyebrow">Welcome to Bhasha Abhyasa</p>
        <h1>Choose your German level</h1>
        <p className="hero-text">
          Pick your level and continue with guided learning or targeted practice.
        </p>
      </div>

      <div className="card-grid">
        {levels.map((level) => (
          <LevelCard key={level.id} level={level} />
        ))}
      </div>
    </section>
  );
}

export default HomePage;