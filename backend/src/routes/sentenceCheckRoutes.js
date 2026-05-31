import express from "express";
import { generateSentence, checkSentence } from "../controllers/sentenceCheckController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/generate/:level",  protect, generateSentence);
router.post("/check/:level",    protect, checkSentence);

export default router;