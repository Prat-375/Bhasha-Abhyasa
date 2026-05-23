import mongoose from "mongoose";

const wordSchema = new mongoose.Schema({
  de:      { type: String, required: true },
  en:      { type: String, required: true },
  article: { type: String, default: "" },
  plural:  { type: String, default: "" },
  example: { type: String, default: "" },
  tip:     { type: String, default: "" },
});

const topicSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  icon:  { type: String, default: "" },
  words: [wordSchema],
});

const vocabSchema = new mongoose.Schema(
  {
    level:  { type: String, required: true, uppercase: true, enum: ["A1","A2","B1","B2","C1"] },
    topics: [topicSchema],
  },
  { timestamps: true }
);

// One document per level
vocabSchema.index({ level: 1 }, { unique: true });

export default mongoose.model("Vocab", vocabSchema);