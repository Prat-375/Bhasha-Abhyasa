// quizRoutes.js
import express from "express";
import {
  getVocabQuiz,
  getGrammarQuiz,
  getMixedQuiz,
  getArticleQuiz,
  getVocabTopics,
  getGrammarLessons,
} from "../controllers/quizController.js";

const router = express.Router();

router.get("/:level/vocab",    getVocabQuiz);      // GET /api/quiz/B1/vocab?topic=all&count=10
router.get("/:level/grammar",  getGrammarQuiz);    // GET /api/quiz/B1/grammar?lesson=all&count=10
router.get("/:level/mixed",    getMixedQuiz);      // GET /api/quiz/B1/mixed?count=15
router.get("/:level/article",  getArticleQuiz);    // GET /api/quiz/B1/article?topic=all&count=15
router.get("/:level/topics",   getVocabTopics);    // GET /api/quiz/B1/topics
router.get("/:level/lessons",  getGrammarLessons); // GET /api/quiz/B1/lessons

export default router;