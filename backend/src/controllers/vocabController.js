import Vocab from "../models/Vocab.js";

export const getVocabByLevel = async (req, res) => {
  try {
    const doc = await Vocab.findOne({ level: req.params.level.toUpperCase() }).lean();
    if (!doc) return res.status(404).json({ message: `No vocabulary found for level ${req.params.level}` });
    res.json(doc.topics);
  } catch (err) {
    console.error("getVocabByLevel error:", err);
    res.status(500).json({ message: "Server error fetching vocabulary" });
  }
};

export const getAllVocab = async (req, res) => {
  try {
    const docs = await Vocab.find({}, "level topics").lean();
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};