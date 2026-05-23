import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  type:     { type: String, default: "fill" },
  sentence: { type: String, required: true },
  answer:   { type: String, required: true },
  hint:     { type: String, default: "" },
});

const exampleSchema = new mongoose.Schema({
  de: { type: String, required: true },
  en: { type: String, default: "" },
});

const tableSchema = new mongoose.Schema({
  headers: [String],
  rows:    [[String]],
});

const lessonSchema = new mongoose.Schema({
  id:          { type: String, required: true },
  title:       { type: String, required: true },
  icon:        { type: String, default: "" },
  explanation: { type: String, default: "" },
  rules:       [String],
  table:       { type: tableSchema, default: null },
  examples:    [exampleSchema],
  exercises:   [exerciseSchema],
});

const grammarSchema = new mongoose.Schema(
  {
    level:   { type: String, required: true, uppercase: true, enum: ["A1","A2","B1","B2","C1"] },
    lessons: [lessonSchema],
  },
  { timestamps: true }
);

grammarSchema.index({ level: 1 }, { unique: true });

export default mongoose.model("Grammar", grammarSchema);