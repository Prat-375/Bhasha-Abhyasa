import express from "express";
import { getSkillTasks, getAllSkills } from "../controllers/practiceSkillController.js";

const router = express.Router();
router.get("/:level", getAllSkills);
router.get("/:level/:skill", getSkillTasks);

export default router;