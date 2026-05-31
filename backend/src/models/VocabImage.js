import mongoose from "mongoose";

const vocabImageSchema = new mongoose.Schema({
  word:     { type: String, required: true },
  level:    { type: String, required: true },
  imageUrl: { type: String, required: true },
  fetchedAt:{ type: Date, default: Date.now },
}, { timestamps: true });

vocabImageSchema.index({ word: 1, level: 1 }, { unique: true });

export default mongoose.model("VocabImage", vocabImageSchema);