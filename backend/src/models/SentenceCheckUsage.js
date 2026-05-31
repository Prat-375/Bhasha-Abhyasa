import mongoose from "mongoose";

const sentenceCheckUsageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  level: {
    type: String,
    enum: ["A1", "A2", "B1", "B2", "C1"],
    required: true,
  },
  checksThisHour: {
    type: Number,
    default: 0,
  },
  windowStart: {
    type: Date,
    default: Date.now,
  },
});

const SentenceCheckUsage = mongoose.model("SentenceCheckUsage", sentenceCheckUsageSchema);
export default SentenceCheckUsage;