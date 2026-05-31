import express from "express";
import {
  submitAttempt,
  getUserProgress,
  saveLessonProgress,
  getLessonProgress,
  getDashboardSummary,
} from "../controllers/progressController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/submit",              protect, submitAttempt);
router.post("/lesson",              protect, saveLessonProgress);
router.get("/lesson/:userId",       protect, getLessonProgress);
router.get("/dashboard/:userId",    protect, getDashboardSummary);
router.get("/:userId",              protect, getUserProgress);

export default router;