import { useEffect, useState } from "react";
import { useParams } from "react-router";

function LearnPage() {
  const { level } = useParams();
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/themes?level=${level}`)
      .then((res) => res.json())
      .then((data) => {
        setThemes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching themes:", error);
        setLoading(false);
      });
  }, [level]);

  return (
    <section className="content-section">
      <p className="eyebrow">Learn Mode</p>
      <h1>{level} Themes</h1>
      <p className="section-text">
        Review your learning path and open any topic you want to study.
      </p>

      {loading ? (
        <p>Loading themes...</p>
      ) : themes.length === 0 ? (
        <p>No themes found for this level yet.</p>
      ) : (
        <div className="list-block">
          {themes.map((theme) => (
            <div key={theme._id} className="list-item">
              <div>
                <h3>{theme.title}</h3>
                <p>{theme.description}</p>
                <p>{theme.category}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default LearnPage;