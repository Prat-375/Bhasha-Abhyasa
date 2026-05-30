// quizController.js
// Generates quiz questions dynamically from Vocab and Grammar collections.
// No separate practice data needed — questions come from what was learned.

import Vocab from "../models/Vocab.js";
import Grammar from "../models/Grammar.js";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Pick n random items from an array */
const sample = (arr, n) => {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
};

/** Pick one random item */
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

/** Shuffle an array */
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

// ─── Vocab quiz generators ─────────────────────────────────────────────────────

/**
 * Q: What does [German word] mean?
 * Options: correct English + 3 wrong English meanings from same level
 */
function makeVocabMeaningQuestion(word, allWords) {
  const distractors = allWords
    .filter(w => w.de !== word.de)
    .map(w => w.en);
  const wrongOptions = sample(distractors, 3);
  const options = shuffle([word.en, ...wrongOptions]);
  return {
    type: "vocab-meaning",
    question: `Was bedeutet „${word.de}"?`,
    options,
    answer: options.indexOf(word.en),
    explanation: `„${word.de}" bedeutet „${word.en}". Beispiel: ${word.example}`,
  };
}

/**
 * Q: Which German word means [English]?
 * Options: correct German + 3 wrong German words
 */
function makeVocabReverseQuestion(word, allWords) {
  const distractors = allWords
    .filter(w => w.de !== word.de)
    .map(w => w.de);
  const wrongOptions = sample(distractors, 3);
  const options = shuffle([word.de, ...wrongOptions]);
  return {
    type: "vocab-reverse",
    question: `Welches Wort bedeutet „${word.en}"?`,
    options,
    answer: options.indexOf(word.de),
    explanation: `Das richtige Wort ist „${word.de}". Beispiel: ${word.example}`,
  };
}

/**
 * Q: Complete the sentence — fill the blank with the right word
 * Uses the word's example sentence with the German word blanked out
 */
function makeVocabContextQuestion(word, allWords) {
  if (!word.example || !word.example.includes(word.de.split(" ").pop())) {
    return null; // skip if we can't cleanly blank the word
  }
  // Get the core word (without article)
  const coreWord = word.de.split(" ").pop();
  const blanked = word.example.replace(coreWord, "___");
  if (blanked === word.example) return null;

  const distractors = allWords
    .filter(w => w.de !== word.de)
    .map(w => w.de.split(" ").pop());
  const wrongOptions = sample(distractors, 3);
  const options = shuffle([coreWord, ...wrongOptions]);
  return {
    type: "vocab-context",
    question: `Ergänzen Sie den Satz:\n„${blanked}"`,
    options,
    answer: options.indexOf(coreWord),
    explanation: `Das richtige Wort ist „${coreWord}". Vollständiger Satz: „${word.example}"`,
  };
}

/**
 * Q: What is the plural of [word]?
 */
function makeVocabPluralQuestion(word, allWords) {
  if (!word.plural || word.plural === "-" || word.plural.includes("no plural") || word.plural.includes("Pl. only")) {
    return null;
  }
  const distractors = allWords
    .filter(w => w.de !== word.de && w.plural && w.plural !== "-" && !w.plural.includes("no plural"))
    .map(w => w.plural);
  if (distractors.length < 3) return null;
  const wrongOptions = sample(distractors, 3);
  const options = shuffle([word.plural, ...wrongOptions]);
  return {
    type: "vocab-plural",
    question: `Was ist der Plural von „${word.de.split(" ").pop()}"?`,
    options,
    answer: options.indexOf(word.plural),
    explanation: `Der Plural ist „${word.plural}". Beispiel: „${word.example}"`,
  };
}


/**
 * Q: What is the article (der/die/das) of this noun?
 * Only for nouns that have an article (der/die/das) prefix
 */
function makeArticleQuestion(word) {
  // Extract article from the German word (der/die/das at the start)
  const match = word.de.match(/^(der|die|das)\s+(.+)$/i);
  if (!match) return null;

  const article     = match[1].toLowerCase();
  const nounOnly    = match[2];
  const allArticles = ["der", "die", "das"];

  // Only valid if it's one of the three articles
  if (!allArticles.includes(article)) return null;

  const options = ["der", "die", "das"]; // always same 3 options, always same order

  return {
    type: "article",
    question: `Welcher Artikel passt?\n\n___ ${nounOnly}`,
    options,
    answer: options.indexOf(article),
    explanation: `Es heißt „${word.de}". ${
      article === "der" ? "Maskulinum (der)" :
      article === "die" ? "Femininum (die)" :
                          "Neutrum (das)"
    }. Beispiel: ${word.example}`,
    tip: word.tip || "",
  };
}

// ─── Grammar quiz generators ───────────────────────────────────────────────────

/**
 * Build questions from grammar exercises (fill-in → multiple choice)
 */
function makeGrammarExerciseQuestion(exercise, lesson) {
  // Create plausible wrong options based on common mistakes
  const wrongOptions = generateGrammarDistractors(exercise.answer, lesson.title);
  if (wrongOptions.length < 3) return null;

  const options = shuffle([exercise.answer, ...wrongOptions.slice(0, 3)]);
  return {
    type: "grammar-exercise",
    question: `Grammatik: ${lesson.title}\n\n${exercise.sentence}`,
    options,
    answer: options.indexOf(exercise.answer),
    explanation: exercise.hint
      ? `Richtig: „${exercise.answer}". Tipp: ${exercise.hint}`
      : `Die richtige Antwort ist: „${exercise.answer}"`,
  };
}

/**
 * Generate plausible wrong answers for grammar questions
 */
function generateGrammarDistractors(correctAnswer, lessonTitle) {
  const answer = correctAnswer.toLowerCase();

  // Verb conjugation distractors
  if (["bin", "bist", "ist", "sind", "seid"].includes(answer)) {
    return ["bin", "bist", "ist", "sind", "seid", "sein"].filter(o => o !== answer);
  }
  if (["habe", "hast", "hat", "haben", "habt"].includes(answer)) {
    return ["habe", "hast", "hat", "haben", "habt"].filter(o => o !== answer);
  }
  if (["wird", "werde", "wirst", "werden", "werdet"].includes(answer)) {
    return ["wird", "werde", "wirst", "werden", "werdet"].filter(o => o !== answer);
  }
  if (["war", "warst", "waren", "wart"].includes(answer)) {
    return ["war", "warst", "waren", "wart", "ist", "sein"].filter(o => o !== answer);
  }
  if (["hatte", "hattest", "hatten", "hattet"].includes(answer)) {
    return ["hatte", "hattest", "hatten", "hattet", "hat", "haben"].filter(o => o !== answer);
  }

  // Article distractors
  if (["der", "die", "das", "den", "dem", "des"].includes(answer)) {
    return ["der", "die", "das", "den", "dem", "des"].filter(o => o !== answer);
  }
  if (["ein", "eine", "einen", "einem", "einer", "eines"].includes(answer)) {
    return ["ein", "eine", "einen", "einem", "einer"].filter(o => o !== answer);
  }

  // KII forms
  if (["wäre", "hätte", "würde", "könnte", "müsste", "sollte", "dürfte"].includes(answer)) {
    return ["wäre", "hätte", "würde", "könnte", "müsste"].filter(o => o !== answer);
  }

  // Auxiliary for Perfekt
  if (answer === "habe" || answer === "ist" || answer === "bin" || answer === "hat" || answer === "sind") {
    return ["habe", "bin", "ist", "hat", "sind", "haben"].filter(o => o !== answer);
  }

  // Passive forms
  if (["wird", "wurde", "worden", "worden ist"].includes(answer)) {
    return ["wird", "wurde", "worden", "ist", "hat", "werden"].filter(o => o !== answer);
  }

  // Conjunction distractors
  if (["weil", "dass", "ob", "als", "wenn", "obwohl", "damit", "bevor", "nachdem"].includes(answer)) {
    return ["weil", "dass", "ob", "als", "wenn", "obwohl"].filter(o => o !== answer);
  }

  // Relative pronouns
  if (["der", "die", "das", "den", "dem", "dessen", "deren"].includes(answer)) {
    return ["der", "die", "das", "den", "dem", "dessen", "deren"].filter(o => o !== answer);
  }

  // Adjective endings
  const adjEndingPattern = /^[a-zäöü]+e[nmrs]?$/;
  if (adjEndingPattern.test(answer)) {
    const base = answer.replace(/e[nmrs]?$/, "");
    return [`${base}e`, `${base}en`, `${base}em`, `${base}er`, `${base}es`].filter(o => o !== answer);
  }

  // Fallback — generic wrong options
  return ["ist", "hat", "wird", "war", "kann", "muss"].filter(o => o !== answer);
}

/**
 * Grammar rule question — true/false or rule identification
 */
function makeGrammarRuleQuestion(lesson) {
  if (!lesson.rules || lesson.rules.length < 2) return null;

  // Pick a real rule and create a plausible wrong version
  const correctRule = pick(lesson.rules.filter(r => !r.startsWith("⚠️")));
  if (!correctRule) return null;

  const allRules = lesson.rules.filter(r => !r.startsWith("⚠️") && r !== correctRule);
  if (allRules.length < 2) return null;

  const wrongRules = sample(allRules, 2);

  // Create one plausible wrong rule by modifying the correct one
  const fakeRule = correctRule
    .replace("→ -en", "→ -e")
    .replace("→ -e", "→ -en")
    .replace("sein", "haben")
    .replace("haben", "sein")
    .replace("Ende", "Anfang")
    .replace("Akkusativ", "Dativ")
    .replace("Dativ", "Akkusativ");

  const options = shuffle([correctRule, fakeRule, ...wrongRules].slice(0, 4));
  return {
    type: "grammar-rule",
    question: `${lesson.title}: Welche Aussage ist korrekt?`,
    options,
    answer: options.indexOf(correctRule),
    explanation: `Richtig: ${correctRule}`,
  };
}

// ─── Main quiz builder ─────────────────────────────────────────────────────────

/**
 * Build a full vocab quiz for a level
 * Returns array of question objects
 */
async function buildVocabQuiz(level, topicName, count = 10) {
  const doc = await Vocab.findOne({ level: level.toUpperCase() }).lean();
  if (!doc) return [];

  let words = [];
  if (topicName && topicName !== "all") {
    const topic = doc.topics.find(t => t.topic === topicName);
    words = topic ? topic.words : [];
  } else {
    words = doc.topics.flatMap(t => t.words);
  }

  if (words.length < 4) return [];

  const allWords = doc.topics.flatMap(t => t.words);
  const selectedWords = sample(words, Math.min(count, words.length));
  const questions = [];

  for (const word of selectedWords) {
    const questionType = Math.random();
    let q;

    if (questionType < 0.35) {
      q = makeVocabMeaningQuestion(word, allWords);
    } else if (questionType < 0.6) {
      q = makeVocabReverseQuestion(word, allWords);
    } else if (questionType < 0.8) {
      q = makeVocabContextQuestion(word, allWords);
    } else {
      q = makeVocabPluralQuestion(word, allWords);
    }

    // Fallback to meaning question if chosen type returned null
    if (!q) q = makeVocabMeaningQuestion(word, allWords);
    if (q) questions.push(q);
  }

  return questions.slice(0, count);
}

/**
 * Build a full grammar quiz for a level
 */
async function buildGrammarQuiz(level, lessonId, count = 10) {
  const doc = await Grammar.findOne({ level: level.toUpperCase() }).lean();
  if (!doc) return [];

  let lessons = doc.lessons;
  if (lessonId && lessonId !== "all") {
    lessons = lessons.filter(l => l.id === lessonId);
  }

  const questions = [];

  for (const lesson of lessons) {
    // Exercise-based questions
    if (lesson.exercises) {
      for (const ex of lesson.exercises) {
        const q = makeGrammarExerciseQuestion(ex, lesson);
        if (q) questions.push(q);
      }
    }
    // Rule-based question (1 per lesson)
    const ruleQ = makeGrammarRuleQuestion(lesson);
    if (ruleQ) questions.push(ruleQ);
  }

  return sample(questions, Math.min(count, questions.length));
}

/**
 * Build a mixed quiz (vocab + grammar)
 */
async function buildMixedQuiz(level, count = 15) {
  const half = Math.floor(count / 2);
  const [vocabQs, grammarQs] = await Promise.all([
    buildVocabQuiz(level, "all", half),
    buildGrammarQuiz(level, "all", count - half),
  ]);
  return shuffle([...vocabQs, ...grammarQs]).slice(0, count);
}


/**
 * Build an article quiz — all questions are der/die/das
 */
async function buildArticleQuiz(level, topicName, count = 15) {
  const doc = await Vocab.findOne({ level: level.toUpperCase() }).lean();
  if (!doc) return [];

  let words = [];
  if (topicName && topicName !== "all") {
    const topic = doc.topics.find(t => t.topic === topicName);
    words = topic ? topic.words : [];
  } else {
    words = doc.topics.flatMap(t => t.words);
  }

  // Only nouns that have der/die/das
  const nouns = words.filter(w => /^(der|die|das)\s+/i.test(w.de));
  if (nouns.length < 4) return [];

  const selected  = sample(nouns, Math.min(count, nouns.length));
  const questions = selected
    .map(w => makeArticleQuestion(w))
    .filter(Boolean);

  return questions.slice(0, count);
}

// ─── Express route handlers ────────────────────────────────────────────────────

// GET /api/quiz/:level/vocab?topic=all&count=10
export const getVocabQuiz = async (req, res) => {
  try {
    const { level } = req.params;
    const { topic = "all", count = 10 } = req.query;
    const questions = await buildVocabQuiz(level, topic, parseInt(count));
    if (!questions.length) return res.status(404).json({ message: "No quiz questions found" });
    res.json({ level, type: "vocab", topic, questions });
  } catch (err) {
    console.error("getVocabQuiz error:", err);
    res.status(500).json({ message: "Server error generating vocab quiz" });
  }
};

// GET /api/quiz/:level/grammar?lesson=all&count=10
export const getGrammarQuiz = async (req, res) => {
  try {
    const { level } = req.params;
    const { lesson = "all", count = 10 } = req.query;
    const questions = await buildGrammarQuiz(level, lesson, parseInt(count));
    if (!questions.length) return res.status(404).json({ message: "No quiz questions found" });
    res.json({ level, type: "grammar", lesson, questions });
  } catch (err) {
    console.error("getGrammarQuiz error:", err);
    res.status(500).json({ message: "Server error generating grammar quiz" });
  }
};

// GET /api/quiz/:level/mixed?count=15
export const getMixedQuiz = async (req, res) => {
  try {
    const { level } = req.params;
    const { count = 15 } = req.query;
    const questions = await buildMixedQuiz(level, parseInt(count));
    if (!questions.length) return res.status(404).json({ message: "No quiz questions found" });
    res.json({ level, type: "mixed", questions });
  } catch (err) {
    console.error("getMixedQuiz error:", err);
    res.status(500).json({ message: "Server error generating mixed quiz" });
  }
};

// GET /api/quiz/:level/article?topic=all&count=15
export const getArticleQuiz = async (req, res) => {
  try {
    const { level } = req.params;
    const { topic = "all", count = 15 } = req.query;
    const questions = await buildArticleQuiz(level, topic, parseInt(count));
    if (!questions.length) return res.status(404).json({ message: "No article questions found" });
    res.json({ level, type: "article", topic, questions });
  } catch (err) {
    console.error("getArticleQuiz error:", err);
    res.status(500).json({ message: "Server error generating article quiz" });
  }
};

// GET /api/quiz/:level/topics — list available topics for this level
export const getVocabTopics = async (req, res) => {
  try {
    const { level } = req.params;
    const doc = await Vocab.findOne({ level: level.toUpperCase() }, "topics.topic topics.icon").lean();
    if (!doc) return res.status(404).json({ message: "Level not found" });
    res.json(doc.topics.map(t => ({ topic: t.topic, icon: t.icon })));
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/quiz/:level/lessons — list available grammar lessons for this level
export const getGrammarLessons = async (req, res) => {
  try {
    const { level } = req.params;
    const doc = await Grammar.findOne({ level: level.toUpperCase() }, "lessons.id lessons.title lessons.icon").lean();
    if (!doc) return res.status(404).json({ message: "Level not found" });
    res.json(doc.lessons.map(l => ({ id: l.id, title: l.title, icon: l.icon })));
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};