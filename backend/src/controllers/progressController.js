import PracticeAttempt from "../models/PracticeAttempt.js";
import Progress from "../models/Progress.js";
import LessonProgress from "../models/LessonProgress.js";
import Vocab from "../models/Vocab.js";
import Grammar from "../models/Grammar.js";

export const submitAttempt = async (req, res) => {
  try {
    const userId = req.user._id;
    const { level, theme, type, totalQuestions, correctAnswers } = req.body;

    if (!level || !theme || !type) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const score = Math.round((correctAnswers / totalQuestions) * 100);

    const attempt = await PracticeAttempt.create({
      userId, level, theme, type, totalQuestions, correctAnswers, score,
    });

    let progress = await Progress.findOne({ userId, theme });

    if (!progress) {
      progress = await Progress.create({
        userId, level, theme,
        completed: score >= 70,
        bestScore: score,
        attempts: 1,
      });
    } else {
      progress.attempts += 1;
      progress.bestScore = Math.max(progress.bestScore, score);
      if (score >= 70) progress.completed = true;
      await progress.save();
    }

    res.status(201).json({ message: "Attempt saved", attempt, progress });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit attempt" });
  }
};

export const getUserProgress = async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const progress = await Progress.find({ userId: req.params.userId }).populate(
      "theme", "title level"
    );
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch progress" });
  }
};

export const saveLessonProgress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { level, sectionType, sectionIndex, sectionId, score } = req.body;

    if (!level || !sectionType || sectionIndex === undefined || !sectionId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const completed = score >= 70;

    let lesson = await LessonProgress.findOne({
      userId, level, sectionType, sectionIndex,
    });

    if (!lesson) {
      lesson = await LessonProgress.create({
        userId, level, sectionType, sectionIndex, sectionId,
        completed, bestScore: score, attempts: 1,
      });
    } else {
      lesson.attempts += 1;
      lesson.bestScore = Math.max(lesson.bestScore, score);
      if (completed) lesson.completed = true;
      await lesson.save();
    }

    res.status(200).json({ message: "Lesson progress saved", lesson });
  } catch (error) {
    res.status(500).json({ message: "Failed to save lesson progress" });
  }
};

export const getLessonProgress = async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const lessons = await LessonProgress.find({ userId: req.params.userId });
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch lesson progress" });
  }
};

export const getDashboardSummary = async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const lessons = await LessonProgress.find({ userId: req.params.userId });

    if (!lessons.length) {
      return res.status(200).json([]);
    }

    // Get unique levels the user has started
    const startedLevels = [...new Set(lessons.map((l) => l.level))];

    // Fetch real totals from DB for each started level
    const summary = await Promise.all(
      startedLevels.map(async (level) => {
        const [vocabDoc, grammarDoc] = await Promise.all([
          Vocab.findOne({ level }).lean(),
          Grammar.findOne({ level }).lean(),
        ]);

        const vocabTotal   = vocabDoc?.topics?.length   || 0;
        const grammarTotal = grammarDoc?.lessons?.length || 0;

        const vocabCompleted = lessons.filter(
          (l) => l.level === level && l.sectionType === "vocabulary" && l.completed
        ).length;

        const grammarCompleted = lessons.filter(
          (l) => l.level === level && l.sectionType === "grammar" && l.completed
        ).length;

        const totalSections  = vocabTotal + grammarTotal;
        const totalCompleted = vocabCompleted + grammarCompleted;
        const overallPct = totalSections > 0
          ? Math.round((totalCompleted / totalSections) * 100)
          : 0;

        return {
          level,
          overallPct,
          vocabulary: { completed: vocabCompleted, total: vocabTotal },
          grammar:    { completed: grammarCompleted, total: grammarTotal },
        };
      })
    );

    // Sort by level order
    const ORDER = ["A1", "A2", "B1", "B2", "C1"];
    summary.sort((a, b) => ORDER.indexOf(a.level) - ORDER.indexOf(b.level));

    res.status(200).json(summary);
  } catch (error) {
    console.error("getDashboardSummary error:", error);
    res.status(500).json({ message: "Failed to fetch dashboard summary" });
  }
};