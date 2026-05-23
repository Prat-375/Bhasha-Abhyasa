import mongoose from "mongoose";

// ── Shared sub-schemas ────────────────────────────────────────
const questionSchema = new mongoose.Schema({
  q:       { type: String, default: "" },
  text:    { type: String, default: "" },
  options: [String],
  answer:  { type: mongoose.Schema.Types.Mixed }, // number | string | boolean
});

// ── Hören task ────────────────────────────────────────────────
const hoerenTaskSchema = new mongoose.Schema({
  id:         { type: String, required: true },
  title:      { type: String, required: true },
  scenario:   { type: String, default: "" },
  transcript: { type: String, default: "" },
  questions:  [questionSchema],
});

// ── Schreiben task ────────────────────────────────────────────
const schreibenTaskSchema = new mongoose.Schema({
  id:              { type: String, required: true },
  title:           { type: String, required: true },
  type:            { type: String, default: "guided-writing" },
  instruction:     { type: String, default: "" },
  inputText:       { type: String, default: "" },
  topic:           { type: String, default: "" },
  points:          [String],
  structure:       [String],
  modelAnswer:     { type: String, default: "" },
  keyPhrases:      [String],
  usefulConnectors:[String],
  keyLanguage:     [String],
  checklist:       [String],
});

// ── Lesen task ────────────────────────────────────────────────
const lesenTaskSchema = new mongoose.Schema({
  id:          { type: String, required: true },
  title:       { type: String, required: true },
  instruction: { type: String, default: "" },
  text:        { type: String, default: "" },
  texts:       [{ id: String, text: String }],
  questions:   [questionSchema],
});

// ── Sprechen task ─────────────────────────────────────────────
const sprechenTaskSchema = new mongoose.Schema({
  id:              { type: String, required: true },
  title:           { type: String, required: true },
  type:            { type: String, default: "monologue" },
  instruction:     { type: String, default: "" },
  statement:       { type: String, default: "" },
  imageDescription:{ type: String, default: "" },
  task:            { type: String, default: "" },
  prompts:         [String],
  points:          [String],
  structure:       [String],
  usefulPhrases:   [String],
  tip:             { type: String, default: "" },
});

// ── Skill group ───────────────────────────────────────────────
const skillGroupSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  icon:        { type: String, default: "" },
  description: { type: String, default: "" },
  tasks:       [mongoose.Schema.Types.Mixed], // flexible — each skill has different task shape
});

// ── Top-level document: one per level ─────────────────────────
const practiceSkillSchema = new mongoose.Schema(
  {
    level:     { type: String, required: true, uppercase: true, enum: ["A1","A2","B1","B2","C1"] },
    hoeren:    { type: Object, default: {} },
    schreiben: { type: Object, default: {} },
    lesen:     { type: Object, default: {} },
    sprechen:  { type: Object, default: {} },
  },
  { timestamps: true }
);

practiceSkillSchema.index({ level: 1 }, { unique: true });

export default mongoose.model("PracticeSkill", practiceSkillSchema);