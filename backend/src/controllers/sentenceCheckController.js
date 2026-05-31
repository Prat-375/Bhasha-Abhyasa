import SentenceCheckUsage from "../models/SentenceCheckUsage.js";
import LessonProgress from "../models/LessonProgress.js";
import Vocab from "../models/Vocab.js";
import Grammar from "../models/Grammar.js";

const GEMINI_API  = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";
const LEVEL_ORDER = ["A1", "A2", "B1", "B2", "C1"];

function getCumulativeLevels(level) {
  const idx = LEVEL_ORDER.indexOf(level);
  return LEVEL_ORDER.slice(0, idx + 1);
}

async function getAllowedChecks(userId, level) {
  const lessons = await LessonProgress.find({ userId, level });
  const [vocabDoc, grammarDoc] = await Promise.all([
    Vocab.findOne({ level }).lean(),
    Grammar.findOne({ level }).lean(),
  ]);
  const total     = (vocabDoc?.topics?.length || 0) + (grammarDoc?.lessons?.length || 0);
  const completed = lessons.filter((l) => l.completed).length;
  const pct       = total > 0 ? Math.round((completed / total) * 100) : 0;
  return Math.floor(pct / 10);
}

async function callGemini(prompt) {
  const url = `${GEMINI_API}?key=${process.env.GEMINI_API_KEY}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    }),
  });
  const data = await response.json();
  console.log("=== GEMINI FULL RESPONSE ===", JSON.stringify(data));
  if (!response.ok) {
    throw new Error(`Gemini API error: ${data?.error?.message || response.status}`);
  }
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

function parseJSON(text) {
  const clean = text.replace(/```json|```/g, "").trim();
  try {
    return JSON.parse(clean);
  } catch {
    const match = clean.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON found in response");
    return JSON.parse(match[0]);
  }
}

// ── Generate sentence ─────────────────────────────────────────────────────────
export const generateSentence = async (req, res) => {
  try {
    const userId = req.user._id;
    const { level } = req.params;

    const allowed = await getAllowedChecks(userId, level);
    if (allowed === 0) {
      return res.status(403).json({
        message: "Complete at least 10% of this level to unlock sentence practice.",
        allowed: 0,
      });
    }

    const now = new Date();
    let usage = await SentenceCheckUsage.findOne({ userId, level });
    if (usage) {
      const hourPassed = (now - usage.windowStart) >= 60 * 60 * 1000;
      if (hourPassed) {
        usage.checksThisHour = 0;
        usage.windowStart = now;
        await usage.save();
      }
      if (usage.checksThisHour >= allowed) {
        const resetAt  = new Date(usage.windowStart.getTime() + 60 * 60 * 1000);
        const minsLeft = Math.ceil((resetAt - now) / 60000);
        return res.status(429).json({
          message: `You've used all ${allowed} checks for this hour. Resets in ${minsLeft} minute(s).`,
          allowed,
          used: usage.checksThisHour,
          minsLeft,
        });
      }
    }

    const levels = getCumulativeLevels(level);
    const completedProgress = await LessonProgress.find({
      userId, level: { $in: levels }, sectionType: "vocabulary", completed: true,
    });

    const vocabWords = [];
    for (const prog of completedProgress) {
      const vocabDoc = await Vocab.findOne({ level: prog.level }).lean();
      if (vocabDoc?.topics?.[prog.sectionIndex]) {
        const topic = vocabDoc.topics[prog.sectionIndex];
        topic.words.slice(0, 5).forEach((w) => vocabWords.push(`${w.de} (${w.en})`));
      }
    }

    const vocabHint = vocabWords.length > 0
      ? `Use some of these words the student has learned: ${vocabWords.slice(0, 20).join(", ")}.`
      : `Use simple ${level}-appropriate German vocabulary.`;

    const prompt = `You are a German language teacher. Generate ONE simple English sentence for a ${level} level German learner to translate into German.

${vocabHint}

Requirements:
- The sentence should be translatable using ${level}-level German grammar
- Keep it simple and natural
- Return ONLY a JSON object, no extra text, no markdown:
{"english": "The English sentence here", "hint": "A brief grammar hint e.g. use Akkusativ here"}`;

    const text = await callGemini(prompt);
    console.log("=== GEMINI RAW TEXT ===", text);

    let parsed;
    try {
      parsed = parseJSON(text);
    } catch {
      console.error("Parse failed, raw:", text);
      return res.status(500).json({ message: "Failed to parse AI response", raw: text });
    }

    res.json({
      english: parsed.english,
      hint:    parsed.hint,
      allowed,
      used: usage?.checksThisHour || 0,
    });
  } catch (error) {
    console.error("generateSentence error:", error);
    res.status(500).json({ message: error.message || "Failed to generate sentence" });
  }
};

// ── Check sentence ────────────────────────────────────────────────────────────
export const checkSentence = async (req, res) => {
  try {
    const userId = req.user._id;
    const { level } = req.params;
    const { english, userAnswer } = req.body;

    if (!english || !userAnswer) {
      return res.status(400).json({ message: "Missing english or userAnswer" });
    }

    const allowed = await getAllowedChecks(userId, level);
    if (allowed === 0) {
      return res.status(403).json({
        message: "Complete at least 10% of this level to unlock sentence practice.",
        allowed: 0,
      });
    }

    const now = new Date();
    let usage = await SentenceCheckUsage.findOne({ userId, level });

    if (!usage) {
      usage = await SentenceCheckUsage.create({
        userId, level, checksThisHour: 0, windowStart: now,
      });
    } else {
      const hourPassed = (now - usage.windowStart) >= 60 * 60 * 1000;
      if (hourPassed) {
        usage.checksThisHour = 0;
        usage.windowStart = now;
      }
      if (usage.checksThisHour >= allowed) {
        const resetAt  = new Date(usage.windowStart.getTime() + 60 * 60 * 1000);
        const minsLeft = Math.ceil((resetAt - now) / 60000);
        return res.status(429).json({
          message: `You've used all ${allowed} checks for this hour. Resets in ${minsLeft} minute(s).`,
          allowed,
          used: usage.checksThisHour,
          minsLeft,
        });
      }
    }

    usage.checksThisHour += 1;
    await usage.save();

    const prompt = `You are a German language teacher checking a student's translation.

English sentence: "${english}"
Student's German answer: "${userAnswer}"
Student's level: ${level}

Evaluate the student's answer and respond ONLY with a JSON object, no extra text, no markdown:
{
  "correct": true or false,
  "score": number from 0 to 100,
  "correctAnswer": "The best German translation",
  "feedback": "2-3 sentences of detailed feedback covering word order (Tekamolo if relevant), grammar, vocabulary, and what was good or wrong",
  "wordOrderNote": "Specific note about word order if relevant, or null",
  "grammarNote": "Specific grammar note if relevant, or null"
}`;

    const text = await callGemini(prompt);
    console.log("=== GEMINI RAW TEXT ===", text);

    let parsed;
    try {
      parsed = parseJSON(text);
    } catch {
      console.error("Parse failed, raw:", text);
      return res.status(500).json({ message: "Failed to parse AI response", raw: text });
    }

    res.json({
      correct:       parsed.correct,
      score:         parsed.score,
      correctAnswer: parsed.correctAnswer,
      feedback:      parsed.feedback,
      wordOrderNote: parsed.wordOrderNote,
      grammarNote:   parsed.grammarNote,
      allowed,
      used: usage.checksThisHour,
    });
  } catch (error) {
    console.error("checkSentence error:", error);
    res.status(500).json({ message: error.message || "Failed to check sentence" });
  }
};