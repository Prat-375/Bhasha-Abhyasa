import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import ModePage from "./pages/ModePage";
import LearnPage from "./pages/LearnPage";
import PracticePage from "./pages/PracticePage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mode/:level" element={<ModePage />} />
          <Route path="/learn/:level" element={<LearnPage />} />
          <Route path="/practice/:level" element={<PracticePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;