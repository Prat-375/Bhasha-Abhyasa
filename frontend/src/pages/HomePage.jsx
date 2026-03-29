import { useEffect, useState } from "react";
import LevelCard from "../components/LevelCard";

function HomePage() {
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/levels`)
      .then((res) => res.json())
      .then((data) => setLevels(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section>
      <h1>Select your level</h1>

      <div className="card-grid">
        {levels.map((level) => (
          <LevelCard key={level._id} level={level} />
        ))}
      </div>
    </section>
  );
}

export default HomePage;