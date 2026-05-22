// LearnPage.jsx
// Advanced A1 learn page with local rich content.
// Other levels (A2, B1…) still fetch from the backend API as before.

import { useEffect, useState } from "react";
import { useParams } from "react-router";

// ─── A1 Rich Content ─────────────────────────────────────────────────────────
// Each module has: icon, title, description, category, lessons[]
// Each lesson has: title, explanation, vocabulary[], grammarNote, examples[], quickCheck[]

const A1_MODULES = [
  {
    id: "greetings",
    icon: "👋",
    title: "Greetings & Introductions",
    description: "Learn how to say hello, goodbye and introduce yourself in German.",
    category: "Communication",
    color: "#8b5cf6",
    lessons: [
      {
        id: "basic-greetings",
        title: "Basic Greetings",
        explanation:
          "German greetings depend on the time of day and how formal the situation is. In formal settings (work, strangers, elders) use 'Sie'. With friends and family use 'du'.",
        vocabulary: [
          { german: "Guten Morgen", english: "Good morning", example: "Guten Morgen! Wie geht es Ihnen?" },
          { german: "Guten Tag", english: "Good day / Hello", example: "Guten Tag, Herr Müller." },
          { german: "Guten Abend", english: "Good evening", example: "Guten Abend! Schön, Sie zu sehen." },
          { german: "Hallo", english: "Hello (casual)", example: "Hallo! Wie geht's?" },
          { german: "Tschüss", english: "Bye (casual)", example: "Tschüss! Bis morgen!" },
          { german: "Auf Wiedersehen", english: "Goodbye (formal)", example: "Auf Wiedersehen, Frau Schmidt." },
          { german: "Bis später", english: "See you later", example: "Ich gehe jetzt. Bis später!" },
          { german: "Bis morgen", english: "See you tomorrow", example: "Gute Nacht! Bis morgen." },
        ],
        grammarNote:
          "⚡ Key rule: Use 'Sie' (capital S) with strangers, elders and in professional settings. Use 'du' with friends, family and children. Getting this wrong is very noticeable to native speakers!",
        examples: [
          { de: "Guten Morgen, wie geht es Ihnen?", en: "Good morning, how are you? (formal)" },
          { de: "Hallo! Wie geht's dir?", en: "Hello! How are you? (casual)" },
          { de: "Auf Wiedersehen und gute Reise!", en: "Goodbye and have a good trip!" },
        ],
        quickCheck: [
          { q: "Which greeting is formal?", options: ["Hallo", "Hi", "Guten Tag", "Tschüss"], answer: 2 },
          { q: "How do you say 'See you tomorrow'?", options: ["Bis später", "Bis morgen", "Tschüss", "Hallo"], answer: 1 },
          { q: "'Guten Abend' is used...", options: ["in the morning", "at midday", "in the evening", "at night"], answer: 2 },
        ],
      },
      {
        id: "introducing-yourself",
        title: "Introducing Yourself",
        explanation:
          "When meeting someone for the first time, you'll need to share your name and where you're from. German has two ways to say your name — 'Ich heiße' (I am called) and 'Ich bin' (I am). Both are correct.",
        vocabulary: [
          { german: "Ich heiße ...", english: "My name is ...", example: "Ich heiße Anna." },
          { german: "Ich bin ...", english: "I am ...", example: "Ich bin Student." },
          { german: "Wie heißen Sie?", english: "What is your name? (formal)", example: "Entschuldigung, wie heißen Sie?" },
          { german: "Wie heißt du?", english: "What is your name? (informal)", example: "Hey! Wie heißt du?" },
          { german: "Ich komme aus ...", english: "I come from ...", example: "Ich komme aus England." },
          { german: "Woher kommen Sie?", english: "Where are you from? (formal)", example: "Woher kommen Sie, Frau Brown?" },
          { german: "Woher kommst du?", english: "Where are you from? (informal)", example: "Woher kommst du eigentlich?" },
          { german: "Ich wohne in ...", english: "I live in ...", example: "Ich wohne in Berlin." },
          { german: "Wie alt sind Sie?", english: "How old are you? (formal)", example: "Wie alt sind Sie, wenn ich fragen darf?" },
          { german: "Ich bin ... Jahre alt.", english: "I am ... years old.", example: "Ich bin 25 Jahre alt." },
        ],
        grammarNote:
          "⚡ Verb conjugation: German verbs change ending based on subject. 'kommen' (to come): ich komme, du kommst, Sie/er/sie kommt. Always learn verbs with their conjugations!",
        examples: [
          { de: "Hallo! Ich heiße Max und ich komme aus München.", en: "Hello! My name is Max and I come from Munich." },
          { de: "Wie heißt du? — Ich bin Lisa.", en: "What is your name? — I am Lisa." },
          { de: "Ich wohne in Hamburg und bin 30 Jahre alt.", en: "I live in Hamburg and am 30 years old." },
        ],
        quickCheck: [
          { q: "How do you say 'I come from Germany'?", options: ["Ich bin Deutschland.", "Ich komme aus Deutschland.", "Ich wohne Deutschland.", "Ich heiße Deutschland."], answer: 1 },
          { q: "Which is the informal way to ask someone's name?", options: ["Wie heißen Sie?", "Wie alt sind Sie?", "Wie heißt du?", "Woher kommen Sie?"], answer: 2 },
          { q: "Translate: 'I live in Berlin.'", options: ["Ich bin in Berlin.", "Ich komme Berlin.", "Ich wohne in Berlin.", "Ich heiße Berlin."], answer: 2 },
        ],
      },
    ],
  },

  {
    id: "numbers",
    icon: "🔢",
    title: "Numbers & Counting",
    description: "Count from 1 to 100, give your age and talk about prices.",
    category: "Core Vocabulary",
    color: "#f59e0b",
    lessons: [
      {
        id: "numbers-1-20",
        title: "Numbers 1–20",
        explanation:
          "The numbers 1–12 are all unique and must be memorised individually. From 13 onwards, most follow the pattern: ones + zehn (ten). Two important exceptions: 16 is 'sechzehn' (not 'sechszehn') and 17 is 'siebzehn' (not 'siebenzehn').",
        vocabulary: [
          { german: "eins / ein", english: "1", example: "Ich habe ein Buch. (one book)" },
          { german: "zwei", english: "2", example: "Zwei Kaffee, bitte." },
          { german: "drei", english: "3", example: "Drei Kinder spielen." },
          { german: "vier", english: "4", example: "Vier Jahreszeiten." },
          { german: "fünf", english: "5", example: "Fünf Euro, bitte." },
          { german: "sechs", english: "6", example: "Sechs Eier." },
          { german: "sieben", english: "7", example: "Sieben Tage in der Woche." },
          { german: "acht", english: "8", example: "Acht Stunden Schlaf." },
          { german: "neun", english: "9", example: "Neun Uhr morgens." },
          { german: "zehn", english: "10", example: "Zehn Minuten." },
          { german: "elf", english: "11", example: "Elf Spieler." },
          { german: "zwölf", english: "12", example: "Zwölf Monate." },
          { german: "dreizehn", english: "13", example: "Dreizehn Grad." },
          { german: "sechzehn ⚠️", english: "16 (not 'sechszehn')", example: "Er ist sechzehn Jahre alt." },
          { german: "siebzehn ⚠️", english: "17 (not 'siebenzehn')", example: "Siebzehn Uhr." },
          { german: "zwanzig", english: "20", example: "Zwanzig Euro." },
        ],
        grammarNote:
          "⚡ 'Eins' vs 'ein': Use 'eins' when counting (1, 2, 3…) or alone. Use 'ein/eine/einen' before a noun (ein Buch, eine Frau). This distinction trips up beginners!",
        examples: [
          { de: "Das kostet fünf Euro.", en: "That costs five euros." },
          { de: "Ich bin siebzehn Jahre alt.", en: "I am seventeen years old." },
          { de: "Der Zug kommt in zehn Minuten.", en: "The train comes in ten minutes." },
        ],
        quickCheck: [
          { q: "What is the correct German for 16?", options: ["sechszehn", "sechzehn", "sechzehnzehn", "sechzig"], answer: 1 },
          { q: "How do you say 'Two coffees, please'?", options: ["Zwei Kaffee, bitte.", "Zwölf Kaffee, bitte.", "Drei Kaffee, bitte.", "Zwei Kaffee, danke."], answer: 0 },
          { q: "Which number is irregular (doesn't follow the pattern)?", options: ["dreizehn", "vierzehn", "zwölf", "achtzehn"], answer: 2 },
        ],
      },
      {
        id: "numbers-tens",
        title: "Tens, Compounds & Prices",
        explanation:
          "German compound numbers put the ones BEFORE the tens, joined by 'und' (and). Think of it like the old English 'four and twenty'. So 25 = fünfundzwanzig (five-and-twenty). This applies to all numbers 21–99.",
        vocabulary: [
          { german: "dreißig ⚠️", english: "30", example: "Dreißig Grad im Sommer." },
          { german: "vierzig", english: "40", example: "Vierzig Euro." },
          { german: "fünfzig", english: "50", example: "Fünfzig Prozent." },
          { german: "sechzig", english: "60", example: "Sechzig Sekunden." },
          { german: "siebzig", english: "70", example: "Siebzig Kilometer." },
          { german: "achtzig", english: "80", example: "Achtzig Jahre alt." },
          { german: "neunzig", english: "90", example: "Neunzig Minuten." },
          { german: "hundert", english: "100", example: "Hundert Euro." },
          { german: "einundzwanzig", english: "21", example: "Einundzwanzig Uhr." },
          { german: "fünfundvierzig", english: "45", example: "Fünfundvierzig Minuten." },
          { german: "dreiundneunzig", english: "93", example: "Dreiundneunzig Seiten." },
        ],
        grammarNote:
          "⚡ Watch out: 30 is 'dreißig' — not 'dreizig'! This is the only irregular tens number. All others simply add '-zig': vierzig, fünfzig, sechzig etc. Also: compound numbers are written as ONE word in German.",
        examples: [
          { de: "Das T-Shirt kostet neunundzwanzig Euro.", en: "The T-shirt costs twenty-nine euros." },
          { de: "Meine Oma ist achtzig Jahre alt.", en: "My grandmother is eighty years old." },
          { de: "Der Zug fährt in fünfundvierzig Minuten ab.", en: "The train departs in forty-five minutes." },
        ],
        quickCheck: [
          { q: "How do you write 45 in German?", options: ["vierzigfünf", "fünfzig", "fünfundvierzig", "vierzigundfünf"], answer: 2 },
          { q: "What is special about 'dreißig'?", options: ["It uses -zig ending", "It is irregular (not 'dreizig')", "It means 13", "It means 23"], answer: 1 },
          { q: "In German, compound numbers are written...", options: ["as two words", "with a hyphen", "as one word", "with a comma"], answer: 2 },
        ],
      },
    ],
  },

  {
    id: "nouns-gender",
    icon: "🏷️",
    title: "Nouns & Gender",
    description: "Understand der, die, das — the most important concept in German grammar.",
    category: "Grammar",
    color: "#22c55e",
    lessons: [
      {
        id: "der-die-das",
        title: "Der, Die, Das — The Three Genders",
        explanation:
          "Every German noun has a grammatical gender: masculine (der), feminine (die) or neuter (das). Unlike English, this is NOT always logical — a girl ('das Mädchen') is grammatically neuter! You must learn the article together with every noun. There are some patterns that help, but many must just be memorised.",
        vocabulary: [
          { german: "der Mann", english: "the man (masc.)", example: "Der Mann ist groß." },
          { german: "der Hund", english: "the dog (masc.)", example: "Der Hund schläft." },
          { german: "der Tisch", english: "the table (masc.)", example: "Der Tisch ist neu." },
          { german: "die Frau", english: "the woman (fem.)", example: "Die Frau liest." },
          { german: "die Katze", english: "the cat (fem.)", example: "Die Katze trinkt Milch." },
          { german: "die Schule", english: "the school (fem.)", example: "Die Schule beginnt um 8 Uhr." },
          { german: "das Kind", english: "the child (neut.)", example: "Das Kind spielt." },
          { german: "das Buch", english: "the book (neut.)", example: "Das Buch ist interessant." },
          { german: "das Mädchen ⚠️", english: "the girl (neut.!)", example: "Das Mädchen singt." },
          { german: "das Haus", english: "the house (neut.)", example: "Das Haus ist groß." },
        ],
        grammarNote:
          "⚡ Patterns to help you: Words ending in -ung, -heit, -keit, -schaft, -tion are almost always feminine (die). Words ending in -chen or -lein are always neuter (das) — that's why 'das Mädchen' (girl) is neuter! Words ending in -er, -en (for people/jobs) are often masculine.",
        examples: [
          { de: "Der Mann und die Frau haben ein Kind.", en: "The man and the woman have a child." },
          { de: "Das Buch liegt auf dem Tisch.", en: "The book is on the table." },
          { de: "Die Katze schläft auf dem Sofa.", en: "The cat sleeps on the sofa." },
        ],
        quickCheck: [
          { q: "What is the article for 'Mädchen' (girl)?", options: ["der", "die", "das", "ein"], answer: 2 },
          { q: "Words ending in '-ung' are almost always...", options: ["masculine (der)", "feminine (die)", "neuter (das)", "it varies"], answer: 1 },
          { q: "Why must you learn articles with nouns?", options: ["For politeness", "Gender affects grammar throughout sentences", "It sounds better", "Only for formal German"], answer: 1 },
        ],
      },
      {
        id: "plural-nouns",
        title: "Plural Nouns",
        explanation:
          "German plurals are unpredictable — unlike English which almost always adds -s, German has about 8 different plural patterns. The good news: all plural nouns use 'die' as their article. Always learn the plural form when you learn a new noun.",
        vocabulary: [
          { german: "der Mann → die Männer", english: "man → men", example: "Zwei Männer warten." },
          { german: "die Frau → die Frauen", english: "woman → women", example: "Die Frauen sprechen." },
          { german: "das Kind → die Kinder", english: "child → children", example: "Die Kinder spielen." },
          { german: "das Buch → die Bücher", english: "book → books", example: "Viele Bücher." },
          { german: "der Tisch → die Tische", english: "table → tables", example: "Zwei Tische." },
          { german: "die Katze → die Katzen", english: "cat → cats", example: "Drei Katzen." },
          { german: "das Haus → die Häuser", english: "house → houses", example: "Große Häuser." },
          { german: "der Hund → die Hunde", english: "dog → dogs", example: "Viele Hunde." },
        ],
        grammarNote:
          "⚡ All plurals use 'die' — regardless of the singular gender. So 'der Mann' (the man) becomes 'die Männer' (the men). This is one of the few consistent rules! When unsure of a plural, dictionaries always list it: Mann (-er) means the plural adds -er.",
        examples: [
          { de: "Ich habe zwei Katzen und drei Hunde.", en: "I have two cats and three dogs." },
          { de: "Die Kinder lesen Bücher.", en: "The children are reading books." },
          { de: "In der Stadt gibt es viele Häuser.", en: "In the city there are many houses." },
        ],
        quickCheck: [
          { q: "What article do ALL plural nouns use?", options: ["der", "die", "das", "den"], answer: 1 },
          { q: "What is the plural of 'das Kind'?", options: ["die Kinds", "die Kinde", "die Kinder", "die Kindern"], answer: 2 },
          { q: "When learning a new noun in German, you should learn...", options: ["only the noun", "the article only", "the article, noun AND plural form", "only the plural"], answer: 2 },
        ],
      },
    ],
  },

  {
    id: "verbs-present",
    icon: "⚡",
    title: "Verbs & Present Tense",
    description: "Master verb conjugation and build your first real sentences.",
    category: "Grammar",
    color: "#ef4444",
    lessons: [
      {
        id: "sein-haben",
        title: "sein & haben — The Two Most Important Verbs",
        explanation:
          "'Sein' (to be) and 'haben' (to have) are the two most used verbs in German. They are irregular — you must memorise them. Nearly every other tense in German is built using these two verbs, so getting them solid now pays off hugely later.",
        vocabulary: [
          { german: "ich bin", english: "I am", example: "Ich bin müde." },
          { german: "du bist", english: "you are (informal)", example: "Du bist nett." },
          { german: "er / sie / es ist", english: "he / she / it is", example: "Er ist Arzt." },
          { german: "wir sind", english: "we are", example: "Wir sind Freunde." },
          { german: "ihr seid", english: "you all are", example: "Ihr seid toll!" },
          { german: "sie / Sie sind", english: "they / you (formal) are", example: "Sie sind pünktlich." },
          { german: "ich habe", english: "I have", example: "Ich habe Hunger." },
          { german: "du hast", english: "you have (informal)", example: "Du hast Recht." },
          { german: "er / sie / es hat", english: "he / she / it has", example: "Sie hat ein Auto." },
          { german: "wir haben", english: "we have", example: "Wir haben Zeit." },
          { german: "ihr habt", english: "you all have", example: "Ihr habt Glück." },
          { german: "sie / Sie haben", english: "they / you (formal) have", example: "Sie haben Kinder." },
        ],
        grammarNote:
          "⚡ In German, 'sie' (lowercase) means 'they' OR 'she', while 'Sie' (capital S) means 'you (formal)'. This looks confusing in writing but context always makes it clear. Both 'they have' and 'you (formal) have' use 'haben' — the conjugation is the same.",
        examples: [
          { de: "Ich bin Student und habe viel Zeit.", en: "I am a student and have a lot of time." },
          { de: "Er ist müde, weil er keine Zeit hat.", en: "He is tired because he has no time." },
          { de: "Wir sind glücklich und haben alles.", en: "We are happy and have everything." },
        ],
        quickCheck: [
          { q: "What is 'wir' + 'sein'?", options: ["wir sind", "wir sein", "wir ist", "wir haben"], answer: 0 },
          { q: "'Du hast Hunger' means...", options: ["You are hungry", "She has hunger", "I have hunger", "You have hunger"], answer: 3 },
          { q: "Which form means BOTH 'they are' AND 'you (formal) are'?", options: ["ihr seid", "wir sind", "sie / Sie sind", "du bist"], answer: 2 },
        ],
      },
      {
        id: "regular-verbs",
        title: "Regular Verbs in the Present Tense",
        explanation:
          "Regular (weak) verbs follow a predictable pattern. Take the infinitive (e.g. machen), remove the -en to get the stem (mach-), then add the correct ending. Learn this pattern once and it applies to hundreds of verbs!",
        vocabulary: [
          { german: "machen – ich mache", english: "to make/do – I make", example: "Ich mache Hausaufgaben." },
          { german: "spielen – du spielst", english: "to play – you play", example: "Du spielst gut." },
          { german: "wohnen – er wohnt", english: "to live – he lives", example: "Er wohnt in Berlin." },
          { german: "lernen – wir lernen", english: "to learn – we learn", example: "Wir lernen Deutsch." },
          { german: "arbeiten – ihr arbeitet", english: "to work – you all work", example: "Ihr arbeitet viel." },
          { german: "hören – sie hören", english: "to hear/listen – they listen", example: "Sie hören Musik." },
          { german: "kaufen – ich kaufe", english: "to buy – I buy", example: "Ich kaufe Brot." },
          { german: "fragen – du fragst", english: "to ask – you ask", example: "Du fragst viel." },
        ],
        grammarNote:
          "⚡ The pattern: stem + -e (ich), -st (du), -t (er/sie/es), -en (wir), -t (ihr), -en (sie/Sie). Special rule: if the stem ends in -t or -d (like 'arbeit-'), add an extra -e before the ending to make it pronounceable: 'er arbeitet' not 'er arbeit'.",
        examples: [
          { de: "Ich lerne Deutsch und spiele jeden Tag.", en: "I learn German and play every day." },
          { de: "Sie wohnt in München und arbeitet viel.", en: "She lives in Munich and works a lot." },
          { de: "Wir kaufen Brot und machen dann das Abendessen.", en: "We buy bread and then make dinner." },
        ],
        quickCheck: [
          { q: "What is the 'du' form of 'spielen'?", options: ["du spielen", "du spiele", "du spielst", "du spielt"], answer: 2 },
          { q: "Why is it 'er arbeitet' and not 'er arbeit'?", options: ["It's irregular", "The stem ends in -t, so -e is added", "All verbs add -et", "It sounds better"], answer: 1 },
          { q: "To conjugate a regular verb, you take the infinitive and...", options: ["add endings directly", "remove -en to get the stem, then add endings", "change the vowel", "only use the stem"], answer: 1 },
        ],
      },
    ],
  },

  {
    id: "everyday-vocab",
    icon: "🏙️",
    title: "Everyday Life",
    description: "Essential vocabulary for shopping, food, directions and daily routines.",
    category: "Vocabulary",
    color: "#06b6d4",
    lessons: [
      {
        id: "food-drink",
        title: "Food & Drink",
        explanation:
          "Food vocabulary is among the most useful you'll learn — you'll need it in restaurants, supermarkets and when someone offers you something. Notice that all German food nouns have genders, so learn them with their articles.",
        vocabulary: [
          { german: "das Wasser", english: "water", example: "Ein Wasser, bitte." },
          { german: "der Kaffee", english: "coffee", example: "Einen Kaffee, bitte." },
          { german: "der Tee", english: "tea", example: "Ich trinke gern Tee." },
          { german: "das Brot", english: "bread", example: "Frisches Brot." },
          { german: "der Käse", english: "cheese", example: "Brot mit Käse." },
          { german: "das Fleisch", english: "meat", example: "Ich esse kein Fleisch." },
          { german: "das Gemüse", english: "vegetables", example: "Mehr Gemüse essen." },
          { german: "das Obst", english: "fruit", example: "Obst ist gesund." },
          { german: "die Milch", english: "milk", example: "Milch im Kaffee." },
          { german: "das Bier", english: "beer", example: "Ein Bier, bitte." },
          { german: "Ich möchte ...", english: "I would like ...", example: "Ich möchte einen Kaffee." },
          { german: "Zahlen, bitte.", english: "The bill, please.", example: "Entschuldigung, zahlen bitte!" },
        ],
        grammarNote:
          "⚡ Ordering food: 'Ich möchte' (I would like) is the polite way to order. Even more polite: 'Ich hätte gern...' (I'd like to have). Avoid 'Ich will...' (I want) in restaurants — it sounds rude and demanding to German ears!",
        examples: [
          { de: "Ich möchte einen Kaffee und ein Wasser, bitte.", en: "I would like a coffee and a water, please." },
          { de: "Ich esse kein Fleisch — ich bin Vegetarier.", en: "I don't eat meat — I'm a vegetarian." },
          { de: "Das Brot ist frisch und der Käse ist sehr gut.", en: "The bread is fresh and the cheese is very good." },
        ],
        quickCheck: [
          { q: "What is the polite way to order in a restaurant?", options: ["Ich will...", "Ich möchte...", "Gib mir...", "Ich nehme..."], answer: 1 },
          { q: "How do you ask for the bill?", options: ["Bitte Geld.", "Rechnung!", "Zahlen, bitte.", "Ich gehe."], answer: 2 },
          { q: "What does 'das Gemüse' mean?", options: ["the fruit", "the meat", "the bread", "the vegetables"], answer: 3 },
        ],
      },
      {
        id: "directions",
        title: "Asking for Directions",
        explanation:
          "Getting around in a German-speaking city requires knowing basic direction vocabulary. The key phrase is 'Entschuldigung' (Excuse me) to politely get someone's attention first.",
        vocabulary: [
          { german: "Entschuldigung!", english: "Excuse me!", example: "Entschuldigung, wo ist der Bahnhof?" },
          { german: "Wo ist ...?", english: "Where is ...?", example: "Wo ist die Toilette?" },
          { german: "links", english: "left", example: "Biegen Sie links ab." },
          { german: "rechts", english: "right", example: "Das ist rechts." },
          { german: "geradeaus", english: "straight ahead", example: "Immer geradeaus." },
          { german: "der Bahnhof", english: "the train station", example: "Der Bahnhof ist weit." },
          { german: "die Haltestelle", english: "the bus/tram stop", example: "Die Haltestelle ist hier." },
          { german: "nah / weit", english: "near / far", example: "Ist es weit von hier?" },
          { german: "Wie weit ist es?", english: "How far is it?", example: "Wie weit ist es zum Bahnhof?" },
          { german: "Ich verstehe nicht.", english: "I don't understand.", example: "Entschuldigung, ich verstehe nicht." },
        ],
        grammarNote:
          "⚡ Formal vs informal directions: When asking strangers for directions, use 'Sie' forms: 'Können Sie mir helfen?' (Can you help me?). Locals will often switch to 'du' themselves — follow their lead. If someone speaks too fast, say: 'Können Sie das bitte wiederholen?' (Can you repeat that please?)",
        examples: [
          { de: "Entschuldigung, wo ist der Bahnhof?", en: "Excuse me, where is the train station?" },
          { de: "Gehen Sie geradeaus und dann links.", en: "Go straight ahead and then turn left." },
          { de: "Ist es weit? — Nein, nur fünf Minuten.", en: "Is it far? — No, only five minutes." },
        ],
        quickCheck: [
          { q: "How do you say 'straight ahead' in German?", options: ["links", "rechts", "geradeaus", "nah"], answer: 2 },
          { q: "What does 'Entschuldigung' mean?", options: ["Thank you", "Goodbye", "Excuse me", "Please"], answer: 2 },
          { q: "If you don't understand, you say...", options: ["Ich weiß nicht.", "Ich verstehe nicht.", "Ich bin nicht hier.", "Ich spreche nicht."], answer: 1 },
        ],
      },
    ],
  },

  {
    id: "sentence-structure",
    icon: "🧱",
    title: "Sentence Structure",
    description: "Learn word order rules and build correct German sentences.",
    category: "Grammar",
    color: "#ec4899",
    lessons: [
      {
        id: "basic-word-order",
        title: "Basic Word Order (SVO & V2 Rule)",
        explanation:
          "German word order has one critical rule: the VERB always comes second in a main sentence (V2 rule). In a simple sentence: Subject – Verb – Object. But if you move another element (like a time word) to the front, the verb and subject SWAP to keep the verb in position 2.",
        vocabulary: [
          { german: "Ich lerne Deutsch.", english: "I learn German. (S-V-O)", example: "Normal order." },
          { german: "Heute lerne ich Deutsch.", english: "Today I learn German.", example: "'Heute' moved to front → verb stays 2nd, subject shifts." },
          { german: "Ich esse einen Apfel.", english: "I eat an apple.", example: "Simple S-V-O." },
          { german: "Morgen esse ich einen Apfel.", english: "Tomorrow I eat an apple.", example: "Time word first → inversion." },
          { german: "nicht", english: "not", example: "Ich lerne nicht. (I don't learn.)" },
          { german: "kein / keine", english: "no / not a", example: "Ich habe kein Geld. (I have no money.)" },
          { german: "und", english: "and", example: "Ich lerne und arbeite." },
          { german: "aber", english: "but", example: "Ich lerne, aber es ist schwer." },
        ],
        grammarNote:
          "⚡ The V2 rule is one of the most important rules in German. The verb MUST be in position 2 — it cannot be 1st or 3rd. If a time/place element starts the sentence, subject and verb invert. This is why Germans say 'Heute gehe ich' (Today go I) and not 'Heute ich gehe'.",
        examples: [
          { de: "Ich wohne in Berlin.", en: "I live in Berlin. (normal)" },
          { de: "In Berlin wohne ich.", en: "In Berlin I live. (place first → inversion)" },
          { de: "Ich habe kein Auto, aber ich habe ein Fahrrad.", en: "I don't have a car, but I have a bicycle." },
        ],
        quickCheck: [
          { q: "In German, where must the verb always be in a main sentence?", options: ["First", "Second", "Third", "Last"], answer: 1 },
          { q: "What happens when you start a sentence with a time word?", options: ["Nothing changes", "The verb moves to the end", "Subject and verb swap (inversion)", "The verb is removed"], answer: 2 },
          { q: "How do you say 'I don't have money' in German?", options: ["Ich habe nicht Geld.", "Ich habe kein Geld.", "Ich kein habe Geld.", "Nicht Geld ich habe."], answer: 1 },
        ],
      },
    ],
  },
];

// ─── Quick Check Component ────────────────────────────────────────────────────
function QuickCheck({ questions, onClose }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (qi, oi) => {
    if (submitted) return;
    setAnswers((p) => ({ ...p, [qi]: oi }));
  };

  const handleSubmit = () => {
    let c = 0;
    questions.forEach((q, i) => { if (answers[i] === q.answer) c++; });
    setScore(c);
    setSubmitted(true);
  };

  const allAnswered = Object.keys(answers).length === questions.length;
  const pct = submitted ? Math.round((score / questions.length) * 100) : 0;

  return (
    <div className="quickcheck-overlay" onClick={onClose}>
      <div className="quickcheck-modal" onClick={(e) => e.stopPropagation()}>
        <div className="qc-header">
          <span className="qc-title">⚡ Quick Check</span>
          <button className="qc-close" onClick={onClose}>✕</button>
        </div>

        {questions.map((q, qi) => (
          <div key={qi} className="qc-question">
            <p className="qc-q-text"><span className="qc-num">Q{qi + 1}.</span> {q.question}</p>
            <div className="qc-options">
              {q.options.map((opt, oi) => {
                let cls = "qc-opt";
                if (submitted) {
                  if (oi === q.answer) cls += " qc-correct";
                  else if (answers[qi] === oi && oi !== q.answer) cls += " qc-wrong";
                } else if (answers[qi] === oi) cls += " qc-selected";
                return (
                  <button key={oi} className={cls} onClick={() => handleSelect(qi, oi)}>
                    <span className="qc-letter">{["A","B","C","D"][oi]}</span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {!submitted ? (
          <button
            className={`qc-submit ${!allAnswered ? "qc-submit-disabled" : ""}`}
            onClick={handleSubmit}
            disabled={!allAnswered}
          >
            Check answers
          </button>
        ) : (
          <div className="qc-result">
            <span className={`qc-score ${pct === 100 ? "qc-perfect" : pct >= 60 ? "qc-pass" : "qc-fail"}`}>
              {score}/{questions.length}
            </span>
            <span className="qc-msg">
              {pct === 100 ? "Perfect! 🎉" : pct >= 60 ? "Good work! 👍" : "Review and try again 💪"}
            </span>
            <button className="qc-done" onClick={onClose}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Lesson Panel ─────────────────────────────────────────────────────────────
function LessonPanel({ lesson, accentColor, onClose }) {
  const [activeTab, setActiveTab] = useState("vocab");
  const [showQuickCheck, setShowQuickCheck] = useState(false);

  return (
    <div className="lesson-panel">
      <div className="lp-topbar">
        <button className="back-btn" onClick={onClose}>← Back</button>
        <span className="lp-lesson-title">{lesson.title}</span>
      </div>

      <div className="lp-explanation">{lesson.explanation}</div>

      <div className="lp-grammar-note">{lesson.grammarNote}</div>

      <div className="lp-tabs">
        {[
          { id: "vocab", label: "📚 Vocabulary" },
          { id: "examples", label: "💬 Examples" },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`lp-tab ${activeTab === tab.id ? "lp-tab-active" : ""}`}
            style={activeTab === tab.id ? { borderColor: accentColor, color: accentColor } : {}}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "vocab" && (
        <div className="lp-vocab">
          {lesson.vocabulary.map((item, i) => (
            <div key={i} className="lp-vocab-row">
              <div className="lp-vocab-left">
                <span className="lp-german">{item.german}</span>
                <span className="lp-english">{item.english}</span>
              </div>
              <span className="lp-example">{item.example}</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === "examples" && (
        <div className="lp-examples">
          {lesson.examples.map((ex, i) => (
            <div key={i} className="lp-example-card">
              <p className="lp-ex-de">{ex.de}</p>
              <p className="lp-ex-en">{ex.en}</p>
            </div>
          ))}
        </div>
      )}

      <button
        className="lp-quickcheck-btn"
        style={{ background: `linear-gradient(90deg, ${accentColor}, #7c3aed)` }}
        onClick={() => setShowQuickCheck(true)}
      >
        ⚡ Quick Check — test yourself
      </button>

      {showQuickCheck && (
        <QuickCheck questions={lesson.quickCheck} onClose={() => setShowQuickCheck(false)} />
      )}
    </div>
  );
}

// ─── Module Card ──────────────────────────────────────────────────────────────
function ModuleCard({ mod, completedLessons, onSelectLesson }) {
  const [expanded, setExpanded] = useState(false);
  const total = mod.lessons.length;
  const done = mod.lessons.filter((l) => completedLessons[l.id]).length;
  const pct = Math.round((done / total) * 100);

  return (
    <div className={`learn-module-card ${expanded ? "learn-module-expanded" : ""}`}>
      <button className="learn-module-header" onClick={() => setExpanded((p) => !p)}>
        <div className="lm-left">
          <span className="lm-icon">{mod.icon}</span>
          <div className="lm-info">
            <span className="lm-category" style={{ color: mod.color }}>{mod.category}</span>
            <h3 className="lm-title">{mod.title}</h3>
            <p className="lm-desc">{mod.description}</p>
          </div>
        </div>
        <div className="lm-right">
          <div className="lm-progress-ring" style={{ "--ring-color": mod.color, "--pct": pct }}>
            <svg viewBox="0 0 36 36" className="lm-ring-svg">
              <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3"/>
              <circle
                cx="18" cy="18" r="15" fill="none"
                stroke={mod.color} strokeWidth="3"
                strokeDasharray={`${(pct / 100) * 94.2} 94.2`}
                strokeLinecap="round"
                transform="rotate(-90 18 18)"
              />
            </svg>
            <span className="lm-ring-label">{pct}%</span>
          </div>
          <span className="lm-chevron">{expanded ? "▲" : "▼"}</span>
        </div>
      </button>

      {expanded && (
        <div className="lm-lessons">
          {mod.lessons.map((lesson) => {
            const isDone = !!completedLessons[lesson.id];
            return (
              <button
                key={lesson.id}
                className={`lm-lesson-row ${isDone ? "lm-lesson-done" : ""}`}
                onClick={() => onSelectLesson(mod, lesson)}
              >
                <span className="lm-lesson-icon">{isDone ? "✅" : "📖"}</span>
                <div className="lm-lesson-info">
                  <span className="lm-lesson-title">{lesson.title}</span>
                  <span className="lm-lesson-meta">
                    {lesson.vocabulary.length} words · {lesson.examples.length} examples · ⚡ quick check
                  </span>
                </div>
                <span className="lm-lesson-arrow">→</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── A1 Learn View ────────────────────────────────────────────────────────────
function A1LearnView() {
  const storageKey = "bhasha_learn_A1";
  const [completedLessons, setCompletedLessons] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || "{}"); }
    catch { return {}; }
  });
  const [activeLesson, setActiveLesson] = useState(null);
  const [activeMod, setActiveMod] = useState(null);

  const totalLessons = A1_MODULES.reduce((s, m) => s + m.lessons.length, 0);
  const doneLessons = Object.keys(completedLessons).length;
  const overallPct = Math.round((doneLessons / totalLessons) * 100);

  const handleSelectLesson = (mod, lesson) => {
    setActiveMod(mod);
    setActiveLesson(lesson);
  };

  const handleCloseLesson = () => {
    // Mark as completed when leaving
    if (activeLesson) {
      const updated = { ...completedLessons, [activeLesson.id]: true };
      setCompletedLessons(updated);
      localStorage.setItem(storageKey, JSON.stringify(updated));
    }
    setActiveLesson(null);
    setActiveMod(null);
  };

  if (activeLesson) {
    return (
      <LessonPanel
        lesson={activeLesson}
        accentColor={activeMod.color}
        onClose={handleCloseLesson}
      />
    );
  }

  return (
    <div className="a1-learn-view">
      <div className="alv-hero">
        <div className="alv-hero-text">
          <p className="eyebrow">Learn Mode</p>
          <h1>A1 — Beginner German</h1>
          <p className="section-text">
            Six modules covering everything you need for A1 level. Each lesson has vocabulary,
            grammar notes, example sentences, and a quick check to test yourself.
          </p>
        </div>
        <div className="alv-overall-progress">
          <div className="alv-progress-ring">
            <svg viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6"/>
              <circle
                cx="40" cy="40" r="34" fill="none"
                stroke="#8b5cf6" strokeWidth="6"
                strokeDasharray={`${(overallPct / 100) * 213.6} 213.6`}
                strokeLinecap="round"
                transform="rotate(-90 40 40)"
              />
            </svg>
            <div className="alv-ring-center">
              <span className="alv-ring-pct">{overallPct}%</span>
              <span className="alv-ring-sub">done</span>
            </div>
          </div>
          <span className="alv-progress-label">{doneLessons} / {totalLessons} lessons</span>
        </div>
      </div>

      <div className="alv-stats-row">
        {[
          { label: "Modules", value: A1_MODULES.length },
          { label: "Lessons", value: totalLessons },
          { label: "Completed", value: doneLessons },
          { label: "Remaining", value: totalLessons - doneLessons },
        ].map((stat) => (
          <div key={stat.label} className="alv-stat-card">
            <span className="alv-stat-value">{stat.value}</span>
            <span className="alv-stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="alv-modules">
        {A1_MODULES.map((mod) => (
          <ModuleCard
            key={mod.id}
            mod={mod}
            completedLessons={completedLessons}
            onSelectLesson={handleSelectLesson}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Legacy API View (A2, B1…) ────────────────────────────────────────────────
function LegacyLearnView({ level }) {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/themes?level=${level}`)
      .then((res) => res.json())
      .then((data) => { setThemes(data); setLoading(false); })
      .catch((error) => { console.error("Error fetching themes:", error); setLoading(false); });
  }, [level]);

  return (
    <section className="content-section">
      <p className="eyebrow">Learn Mode</p>
      <h1>{level} Themes</h1>
      <p className="section-text">Review your learning path and open any topic you want to study.</p>
      {loading ? (
        <p>Loading themes...</p>
      ) : themes.length === 0 ? (
        <p>No themes found for this level yet.</p>
      ) : (
        <div className="list-block">
          {themes.map((theme) => (
            <div key={theme._id} className="list-item">
              <div>
                <h3>{theme.title}</h3>
                <p>{theme.description}</p>
                <p>{theme.category}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
function LearnPage() {
  const { level } = useParams();

  if (level === "A1") return <A1LearnView />;
  return <LegacyLearnView level={level} />;
}

export default LearnPage;