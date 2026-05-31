import mongoose from "mongoose";

const lessonProgressSchema = new mongoose.Schema(
  {
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
    sectionType: {
      type: String,
      enum: ["vocabulary", "grammar"],
      required: true,
    },
    sectionIndex: {
      type: Number,
      required: true,
    },
    sectionId: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    bestScore: {
      type: Number,
      default: 0,
    },
    attempts: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Unique per user+level+type+index
lessonProgressSchema.index(
  { userId: true, level: true, sectionType: true, sectionIndex: true },
  { unique: true }
);

const LessonProgress = mongoose.model("LessonProgress", lessonProgressSchema);
export default LessonProgress;