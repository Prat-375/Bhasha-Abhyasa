import express from "express";
import { getGrammarByLevel, getGrammarLesson } from "../controllers/grammarController.js";

const router = express.Router();
router.get("/:level", getGrammarByLevel);
router.get("/:level/:lessonId", getGrammarLesson);

export default router;