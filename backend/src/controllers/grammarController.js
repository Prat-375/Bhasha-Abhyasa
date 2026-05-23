import Grammar from "../models/Grammar.js";

export const getGrammarByLevel = async (req, res) => {
  try {
    const doc = await Grammar.findOne({ level: req.params.level.toUpperCase() }).lean();
    if (!doc) return res.status(404).json({ message: `No grammar found for level ${req.params.level}` });
    res.json(doc.lessons);
  } catch (err) {
    console.error("getGrammarByLevel error:", err);
    res.status(500).json({ message: "Server error fetching grammar" });
  }
};

export const getGrammarLesson = async (req, res) => {
  try {
    const { level, lessonId } = req.params;
    const doc = await Grammar.findOne({ level: level.toUpperCase() }).lean();
    if (!doc) return res.status(404).json({ message: "Level not found" });
    const lesson = doc.lessons.find((l) => l.id === lessonId);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};