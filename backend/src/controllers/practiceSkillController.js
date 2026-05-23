import PracticeSkill from "../models/PracticeSkill.js";

const VALID_SKILLS = ["hoeren", "schreiben", "lesen", "sprechen"];

export const getSkillTasks = async (req, res) => {
  try {
    const { level, skill } = req.params;
    if (!VALID_SKILLS.includes(skill)) {
      return res.status(400).json({ message: `Invalid skill. Use: ${VALID_SKILLS.join(", ")}` });
    }
    const doc = await PracticeSkill.findOne({ level: level.toUpperCase() }).select(skill).lean();
    if (!doc) return res.status(404).json({ message: `No practice content for level ${level}` });
    res.json(doc[skill] || {});
  } catch (err) {
    console.error("getSkillTasks error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllSkills = async (req, res) => {
  try {
    const doc = await PracticeSkill.findOne({ level: req.params.level.toUpperCase() }).lean();
    if (!doc) return res.status(404).json({ message: `No practice content for level ${req.params.level}` });
    const { hoeren, schreiben, lesen, sprechen } = doc;
    res.json({ hoeren, schreiben, lesen, sprechen });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};