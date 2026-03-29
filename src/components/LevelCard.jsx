import { Link } from "react-router";

function LevelCard({ level }) {
  return (
    <Link to={`/mode/${level.id}`} className="card level-card">
      <div className="level-badge">{level.title}</div>
      <h3>{level.title} Level</h3>
      <p>{level.description}</p>
    </Link>
  );
}

export default LevelCard;