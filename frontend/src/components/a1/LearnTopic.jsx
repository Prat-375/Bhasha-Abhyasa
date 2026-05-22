// LearnTopic.jsx
// Displays a vocabulary list for a "learn" type topic

function LearnTopic({ topic, onComplete }) {
  return (
    <div className="topic-container">
      <p className="topic-intro">{topic.content.intro}</p>

      <table className="vocab-table">
        <thead>
          <tr>
            <th>German</th>
            <th>English</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {topic.content.vocabulary.map((item, i) => (
            <tr key={i}>
              <td className="german">{item.german}</td>
              <td className="english">{item.english}</td>
              <td className="note">{item.note}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="primary-btn" onClick={onComplete}>
        Got it — mark as done ✓
      </button>
    </div>
  );
}

export default LearnTopic;