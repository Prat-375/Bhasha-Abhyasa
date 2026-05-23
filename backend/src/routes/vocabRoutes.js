import express from "express";
import { getVocabByLevel, getAllVocab } from "../controllers/vocabController.js";

const router = express.Router();
router.get("/", getAllVocab);
router.get("/:level", getVocabByLevel);

export default router;