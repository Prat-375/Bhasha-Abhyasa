// allPracticeData.js
// Single source of truth for ALL level PRACTICE content.
// A1, A2, B1, B2 — quiz and fill-in-the-blank topics.
// Usage: import { PRACTICE_MODULES, PRACTICE_META } from "../data/allPracticeData";

// ─────────────────────────────────────────────────────────────────────────────
// A1 — BEGINNER PRACTICE
// ─────────────────────────────────────────────────────────────────────────────
export const A1_PRACTICE_MODULES = [
  {
    id: "a1-p-greetings",
    icon: "👋",
    title: "Greetings Practice",
    subtitle: "Greetings, introductions, farewells",
    topics: [
      {
        id: "a1-p-greet-quiz",
        title: "Greetings Quiz",
        type: "quiz",
        questions: [
          { question: "How do you say 'Good morning' in German?", options: ["Guten Abend", "Guten Morgen", "Guten Tag", "Hallo"], answer: 1 },
          { question: "Which greeting is informal?", options: ["Guten Tag", "Auf Wiedersehen", "Hallo", "Guten Morgen"], answer: 2 },
          { question: "Formal way to say goodbye:", options: ["Tschüss", "Hi", "Hallo", "Auf Wiedersehen"], answer: 3 },
          { question: "How do you ask someone's name informally?", options: ["Wie heißen Sie?", "Woher kommen Sie?", "Wie heißt du?", "Ich heiße..."], answer: 2 },
          { question: "'Ich komme aus England' means:", options: ["I live in England", "I come from England", "I speak English", "I am going to England"], answer: 1 },
          { question: "'Wie geht's?' is short for:", options: ["Wie heißt du?", "Wie geht es dir?", "Wo wohnst du?", "Wie alt bist du?"], answer: 1 },
          { question: "Guten Abend is used:", options: ["in the morning", "at midday", "in the evening", "at night"], answer: 2 },
          { question: "'Bis morgen' means:", options: ["See you later", "See you tomorrow", "Goodbye", "Good evening"], answer: 1 },
        ],
      },
      {
        id: "a1-p-greet-fill",
        title: "Greetings Fill-in",
        type: "fill",
        sentences: [
          { before: "", blank: "Guten", after: " Morgen! Wie geht's?", hint: "Good _____ ! How are you?" },
          { before: "Ich ", blank: "komme", after: " aus Deutschland.", hint: "I _____ from Germany." },
          { before: "Wie ", blank: "heißt", after: " du?", hint: "What is your name? (informal)" },
          { before: "Auf ", blank: "Wiedersehen", after: "!", hint: "Goodbye! (formal)" },
          { before: "Ich ", blank: "heiße", after: " Maria.", hint: "My name is Maria." },
          { before: "Wie ", blank: "geht", after: " es Ihnen?", hint: "How are you? (formal)" },
          { before: "Bis ", blank: "später", after: "!", hint: "See you _____ !" },
          { before: "Ich ", blank: "wohne", after: " in Berlin.", hint: "I _____ in Berlin." },
        ],
      },
    ],
  },
  {
    id: "a1-p-numbers",
    icon: "🔢",
    title: "Numbers Practice",
    subtitle: "1–100 and compound numbers",
    topics: [
      {
        id: "a1-p-num-quiz",
        title: "Numbers Quiz",
        type: "quiz",
        questions: [
          { question: "What is 'sieben' in English?", options: ["6", "7", "8", "9"], answer: 1 },
          { question: "How do you write 21 in German?", options: ["zwanzigeins", "einundzwanzig", "zwanzigein", "einzwanzig"], answer: 1 },
          { question: "Which number is irregular?", options: ["dreizehn", "vierzehn", "zwölf", "achtzehn"], answer: 2 },
          { question: "What does 'dreißig' mean?", options: ["13", "23", "30", "33"], answer: 2 },
          { question: "How do you say 93 in German?", options: ["neunundneunzig", "dreiundneunzig", "neundreißig", "dreiundzwanzig"], answer: 1 },
          { question: "16 in German is:", options: ["sechszehn", "sechzehn", "sechzehnzehn", "sechzig"], answer: 1 },
          { question: "'fünfundvierzig' is:", options: ["54", "45", "44", "55"], answer: 1 },
          { question: "What does 'hundert' mean?", options: ["10", "1000", "100", "110"], answer: 2 },
        ],
      },
      {
        id: "a1-p-num-fill",
        title: "Numbers Fill-in",
        type: "fill",
        sentences: [
          { before: "Ich bin ", blank: "zwanzig", after: " Jahre alt.", hint: "I am twenty years old." },
          { before: "Das kostet ", blank: "fünf", after: " Euro.", hint: "That costs five euros." },
          { before: "Es gibt ", blank: "drei", after: " Äpfel.", hint: "There are three apples." },
          { before: "Meine Hausnummer ist ", blank: "zwölf", after: ".", hint: "My house number is twelve." },
          { before: "Sie hat ", blank: "zwei", after: " Kinder.", hint: "She has two children." },
          { before: "Der Zug kommt in ", blank: "zehn", after: " Minuten.", hint: "The train comes in ten minutes." },
          { before: "Wir brauchen ", blank: "sieben", after: " Tage.", hint: "We need seven days." },
          { before: "Es kostet ", blank: "neunzehn", after: " Euro.", hint: "It costs nineteen euros." },
        ],
      },
    ],
  },
  {
    id: "a1-p-nouns",
    icon: "🏷️",
    title: "Nouns & Gender Practice",
    subtitle: "der, die, das and plurals",
    topics: [
      {
        id: "a1-p-nouns-quiz",
        title: "Nouns & Gender Quiz",
        type: "quiz",
        questions: [
          { question: "What is the article for 'Mädchen' (girl)?", options: ["der", "die", "das", "ein"], answer: 2 },
          { question: "All plural nouns use which article?", options: ["der", "die", "das", "den"], answer: 1 },
          { question: "Words ending in '-ung' are almost always:", options: ["masculine (der)", "feminine (die)", "neuter (das)", "no pattern"], answer: 1 },
          { question: "What is the plural of 'das Kind'?", options: ["die Kinds", "die Kinde", "die Kinder", "die Kindern"], answer: 2 },
          { question: "Why must you learn articles with nouns?", options: ["For politeness", "Gender affects grammar", "It sounds better", "Only for formal German"], answer: 1 },
          { question: "'der Hund' plural is:", options: ["die Hunds", "die Hunde", "die Hunden", "die Hünd"], answer: 1 },
          { question: "Words ending in '-chen' are always:", options: ["masculine", "feminine", "neuter", "depends"], answer: 2 },
          { question: "'die Frau' plural is:", options: ["die Frauen", "die Fraus", "die Fraue", "die Fräuen"], answer: 0 },
        ],
      },
      {
        id: "a1-p-nouns-fill",
        title: "Nouns Fill-in",
        type: "fill",
        sentences: [
          { before: "", blank: "Der", after: " Mann ist groß.", hint: "_____ man is tall. (masc. article)" },
          { before: "", blank: "Die", after: " Frau liest.", hint: "_____ woman reads. (fem. article)" },
          { before: "", blank: "Das", after: " Kind spielt.", hint: "_____ child plays. (neuter article)" },
          { before: "Die ", blank: "Kinder", after: " spielen.", hint: "The _____ play. (plural of Kind)" },
          { before: "Ich habe zwei ", blank: "Katzen", after: ".", hint: "I have two _____. (plural of Katze)" },
          { before: "Die ", blank: "Bücher", after: " sind interessant.", hint: "The _____ are interesting. (plural of Buch)" },
          { before: "", blank: "Das", after: " Mädchen singt.", hint: "_____ girl sings. (always neuter!)" },
          { before: "In der Stadt gibt es viele ", blank: "Häuser", after: ".", hint: "In the city there are many _____. (plural of Haus)" },
        ],
      },
    ],
  },
  {
    id: "a1-p-verbs",
    icon: "⚡",
    title: "Verbs Practice",
    subtitle: "sein, haben and regular verbs",
    topics: [
      {
        id: "a1-p-verbs-quiz",
        title: "Verbs Quiz",
        type: "quiz",
        questions: [
          { question: "What is 'wir' + 'sein'?", options: ["wir sind", "wir sein", "wir ist", "wir haben"], answer: 0 },
          { question: "'du hast Hunger' means:", options: ["You are hungry", "She has hunger", "I have hunger", "You have hunger"], answer: 3 },
          { question: "What is the 'du' form of 'spielen'?", options: ["du spielen", "du spiele", "du spielt", "du spielst"], answer: 3 },
          { question: "Why is it 'er arbeitet' not 'er arbeit'?", options: ["It's irregular", "stem ends in -t, add -et", "All verbs add -et", "Random exception"], answer: 1 },
          { question: "To conjugate a regular verb you:", options: ["use it as-is", "remove -en, then add endings", "only change the vowel", "add -s for all"], answer: 1 },
          { question: "'sie / Sie sind' means:", options: ["only 'they are'", "only 'you (formal) are'", "both 'they are' and 'you (formal) are'", "only 'she is'"], answer: 2 },
          { question: "'wohnen' — ich form:", options: ["ich wohnen", "ich wohnt", "ich wohne", "ich wohnst"], answer: 2 },
          { question: "'Ich habe keine Zeit.' — 'keine' means:", options: ["a lot of", "some", "no / not any", "much"], answer: 2 },
        ],
      },
      {
        id: "a1-p-verbs-fill",
        title: "Verbs Fill-in",
        type: "fill",
        sentences: [
          { before: "Ich ", blank: "bin", after: " müde.", hint: "I _____ tired. (sein)" },
          { before: "Du ", blank: "hast", after: " Recht.", hint: "You _____ right. (haben)" },
          { before: "Wir ", blank: "lernen", after: " Deutsch.", hint: "We _____ German. (lernen)" },
          { before: "Er ", blank: "wohnt", after: " in Berlin.", hint: "He _____ in Berlin. (wohnen)" },
          { before: "Sie ", blank: "spielen", after: " Fußball.", hint: "They _____ football. (spielen)" },
          { before: "Ich ", blank: "arbeite", after: " viel.", hint: "I _____ a lot. (arbeiten)" },
          { before: "Du ", blank: "kommst", after: " aus England.", hint: "You _____ from England. (kommen)" },
          { before: "Er ", blank: "ist", after: " Arzt.", hint: "He _____ a doctor. (sein)" },
        ],
      },
    ],
  },
  {
    id: "a1-p-food",
    icon: "🍽️",
    title: "Food & Café Practice",
    subtitle: "Ordering and food vocabulary",
    topics: [
      {
        id: "a1-p-food-quiz",
        title: "Food & Café Quiz",
        type: "quiz",
        questions: [
          { question: "Polite way to order in a restaurant:", options: ["Ich will...", "Ich möchte...", "Gib mir...", "Ich nehme..."], answer: 1 },
          { question: "How do you ask for the bill?", options: ["Bitte Geld.", "Rechnung!", "Zahlen, bitte.", "Ich gehe."], answer: 2 },
          { question: "What does 'das Gemüse' mean?", options: ["the fruit", "the meat", "the bread", "the vegetables"], answer: 3 },
          { question: "'Das schmeckt gut!' means:", options: ["That looks good!", "That smells good!", "That tastes good!", "That sounds good!"], answer: 2 },
          { question: "What is 'der Käse'?", options: ["the coffee", "the cake", "the cheese", "the butter"], answer: 2 },
          { question: "'Die Speisekarte, bitte.' means:", options: ["The bill, please.", "The menu, please.", "Water, please.", "One more, please."], answer: 1 },
          { question: "'Ich bin vegetarisch.' means:", options: ["I like vegetables", "I am vegetarian", "I eat vegetables", "I cook vegetables"], answer: 1 },
          { question: "What is 'das Wasser'?", options: ["wine", "beer", "juice", "water"], answer: 3 },
        ],
      },
      {
        id: "a1-p-food-fill",
        title: "Food Fill-in",
        type: "fill",
        sentences: [
          { before: "Ich ", blank: "möchte", after: " einen Kaffee, bitte.", hint: "I _____ a coffee, please." },
          { before: "Die ", blank: "Speisekarte", after: ", bitte.", hint: "The _____, please." },
          { before: "Das ", blank: "schmeckt", after: " gut!", hint: "That _____ good!" },
          { before: "", blank: "Zahlen", after: ", bitte.", hint: "The bill, please." },
          { before: "Ich bin ", blank: "vegetarisch", after: ".", hint: "I am vegetarian." },
          { before: "Einmal ", blank: "Kaffee", after: ", bitte.", hint: "One _____, please." },
          { before: "Was ", blank: "empfehlen", after: " Sie?", hint: "What do you _____?" },
          { before: "Das ", blank: "kostet", after: " fünf Euro.", hint: "That _____ five euros." },
        ],
      },
    ],
  },
  {
    id: "a1-p-time",
    icon: "🕐",
    title: "Time & Days Practice",
    subtitle: "Days, months, telling the time",
    topics: [
      {
        id: "a1-p-time-quiz",
        title: "Time & Days Quiz",
        type: "quiz",
        questions: [
          { question: "What does 'Mittwoch' mean?", options: ["Monday", "Thursday", "Wednesday", "Friday"], answer: 2 },
          { question: "'Es ist halb drei' means:", options: ["3:30", "2:30", "3:00", "2:00"], answer: 1 },
          { question: "How do you ask 'What time is it?'", options: ["Wie geht es?", "Wie viel Uhr ist es?", "Wie heißt du?", "Wann gehst du?"], answer: 1 },
          { question: "Which month is 'März'?", options: ["February", "May", "March", "April"], answer: 2 },
          { question: "'Viertel nach vier' is:", options: ["Quarter to four", "Quarter past four", "Four o'clock", "Four forty-five"], answer: 1 },
          { question: "Shops in Germany are closed on:", options: ["Monday", "Friday", "Saturday", "Sunday"], answer: 3 },
          { question: "What does 'Freitag' mean?", options: ["Thursday", "Saturday", "Friday", "Tuesday"], answer: 2 },
          { question: "'morgens' means:", options: ["at midday", "in the evening", "in the morning", "at night"], answer: 2 },
        ],
      },
      {
        id: "a1-p-time-fill",
        title: "Time Fill-in",
        type: "fill",
        sentences: [
          { before: "Heute ist ", blank: "Montag", after: ".", hint: "Today is Monday." },
          { before: "Es ist drei ", blank: "Uhr", after: ".", hint: "It is three o'clock." },
          { before: "Es ist halb ", blank: "drei", after: ".", hint: "It is 2:30." },
          { before: "Wir treffen uns am ", blank: "Freitag", after: ".", hint: "We meet on Friday." },
          { before: "Mein Geburtstag ist im ", blank: "März", after: ".", hint: "My birthday is in March." },
          { before: "Es ist Viertel ", blank: "nach", after: " vier.", hint: "It is quarter _____ four. (4:15)" },
          { before: "Am ", blank: "Sonntag", after: " sind die Geschäfte geschlossen.", hint: "On _____ shops are closed." },
          { before: "Der Film beginnt um ", blank: "halb", after: " acht.", hint: "The film starts at _____ past seven (7:30)." },
        ],
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// A2 — ELEMENTARY PRACTICE
// ─────────────────────────────────────────────────────────────────────────────
export const A2_PRACTICE_MODULES = [
  {
    id: "a2-p-past",
    icon: "⏪",
    title: "Past Tense Practice",
    subtitle: "Perfekt with haben & sein",
    topics: [
      {
        id: "a2-p-past-quiz",
        title: "Perfekt Quiz",
        type: "quiz",
        questions: [
          { question: "Choose the correct Perfekt: 'Ich ___ nach Berlin gefahren.'", options: ["habe", "bin", "wurde", "hatte"], answer: 1 },
          { question: "Past participle of 'kaufen':", options: ["gekofen", "kaufte", "gekauft", "kaufen"], answer: 2 },
          { question: "'Er hat das Buch ___.' (lesen)", options: ["gelest", "liest", "gelesen", "lesan"], answer: 2 },
          { question: "Which uses 'sein' in Perfekt?", options: ["essen", "trinken", "bleiben", "schreiben"], answer: 2 },
          { question: "'Wir sind zu Hause ___.' (bleiben)", options: ["geblieben", "gebleibt", "bleiben", "blieben"], answer: 0 },
          { question: "Perfekt of 'schlafen' (sie — she):", options: ["sie hat geschlafen", "sie ist geschlafen", "sie schlafete", "sie hat schlafen"], answer: 0 },
          { question: "Past participle of 'trinken':", options: ["getrunken", "getrinken", "getränkt", "trank"], answer: 0 },
          { question: "'Ich ___ früh aufgestanden.' (Perfekt)", options: ["habe", "bin", "hatte", "wurde"], answer: 1 },
        ],
      },
      {
        id: "a2-p-past-fill",
        title: "Past Tense Fill-in",
        type: "fill",
        sentences: [
          { before: "Ich ", blank: "habe", after: " heute Pizza gegessen.", hint: "I ___ pizza today. (haben Perfekt)" },
          { before: "Er ", blank: "ist", after: " nach Hause gegangen.", hint: "He ___ home. (sein Perfekt)" },
          { before: "Wir ", blank: "haben", after: " viel Kaffee getrunken.", hint: "We ___ lots of coffee. (haben Perfekt)" },
          { before: "Sie ", blank: "ist", after: " sehr schnell gelaufen.", hint: "She ___ very fast. (sein Perfekt)" },
          { before: "Das Buch ", blank: "hat", after: " ihm gut gefallen.", hint: "He liked the book. (gefallen uses haben)" },
          { before: "Ich ", blank: "bin", after: " um 7 Uhr aufgestanden.", hint: "I ___ up at 7. (sein Perfekt)" },
          { before: "Du ", blank: "hast", after: " das sehr gut gemacht.", hint: "You ___ that very well." },
          { before: "Sie ", blank: "sind", after: " in Berlin geblieben.", hint: "They ___ in Berlin. (bleiben — sein)" },
        ],
      },
    ],
  },

  {
    id: "a2-p-modals",
    icon: "🎛️",
    title: "Modal Verbs Practice",
    subtitle: "können, müssen, wollen, dürfen",
    topics: [
      {
        id: "a2-p-modals-quiz",
        title: "Modal Verbs Quiz",
        type: "quiz",
        questions: [
          { question: "Fill in: 'Ich ___ nicht kommen.' (cannot)", options: ["kann", "darf", "muss", "soll"], answer: 0 },
          { question: "'___ ich hier parken?' (permission)", options: ["Muss", "Kann", "Darf", "Will"], answer: 2 },
          { question: "The infinitive with a modal goes:", options: ["second position", "after subject", "to the end", "before modal"], answer: 2 },
          { question: "'Er ___ nach Hause gehen.' (wants to)", options: ["soll", "darf", "will", "muss"], answer: 2 },
          { question: "Polite form of 'wollen' (order food):", options: ["ich will", "ich möchte", "ich soll", "ich kann"], answer: 1 },
          { question: "'Sie ___ um 9 Uhr da sein.' (is supposed to)", options: ["kann", "will", "muss", "soll"], answer: 3 },
          { question: "Conjugation: 'du' + 'können'", options: ["du können", "du kann", "du kannst", "du könnt"], answer: 2 },
          { question: "'Ich ___ das nicht essen.' (must not)", options: ["kann", "soll", "darf", "will"], answer: 2 },
        ],
      },
      {
        id: "a2-p-modals-fill",
        title: "Modal Verbs Fill-in",
        type: "fill",
        sentences: [
          { before: "Ich ", blank: "möchte", after: " einen Kaffee, bitte.", hint: "I ___ like a coffee, please. (polite)" },
          { before: "Er ", blank: "muss", after: " heute arbeiten.", hint: "He ___ work today. (obligation)" },
          { before: "Darf ich das Fenster ", blank: "öffnen", after: "?", hint: "May I ___ the window?" },
          { before: "Sie ", blank: "kann", after: " sehr gut Gitarre spielen.", hint: "She ___ play guitar very well." },
          { before: "Wir ", blank: "sollen", after: " um 8 Uhr da sein.", hint: "We ___ be there at 8. (told to by someone)" },
          { before: "Du ", blank: "sollst", after: " mehr schlafen.", hint: "You ___ sleep more. (advice)" },
          { before: "Ich ", blank: "will", after: " nächstes Jahr nach Japan fahren.", hint: "I ___ go to Japan next year. (intention)" },
          { before: "Hier ", blank: "darf", after: " man nicht rauchen.", hint: "You ___ not smoke here. (not allowed)" },
        ],
      },
    ],
  },

  {
    id: "a2-p-adj",
    icon: "🎨",
    title: "Adjective Endings Practice",
    subtitle: "Correct endings after articles",
    topics: [
      {
        id: "a2-p-adj-quiz",
        title: "Adjective Endings Quiz",
        type: "quiz",
        questions: [
          { question: "'Ein ___ Mann' (alt) — indefinite article, masc. nominative:", options: ["alte", "alten", "alter", "altem"], answer: 2 },
          { question: "'Der ___ Film' (gut) — definite article, masc. nominative:", options: ["guten", "guter", "gute", "gutem"], answer: 2 },
          { question: "'Ich sehe den ___ Mann.' (alt) — masc. accusative:", options: ["alter", "alten", "alte", "altem"], answer: 1 },
          { question: "'Mit dem ___ Auto.' (neu) — dative:", options: ["neue", "neuem", "neuen", "neuer"], answer: 2 },
          { question: "'Die ___ Häuser.' (alt) — plural, definite:", options: ["alte", "alten", "alter", "altem"], answer: 1 },
          { question: "'Eine ___ Frau.' (nett) — fem. indef. nominative:", options: ["netten", "nette", "netter", "nettes"], answer: 1 },
          { question: "After definite article in nominative, all adjectives end in:", options: ["-er", "-en", "-e", "-em"], answer: 2 },
          { question: "In dative case after any article, adjectives always end in:", options: ["-e", "-er", "-em", "-en"], answer: 3 },
        ],
      },
      {
        id: "a2-p-adj-fill",
        title: "Adjective Endings Fill-in",
        type: "fill",
        sentences: [
          { before: "Der ", blank: "alte", after: " Mann sitzt im Park.", hint: "The old man. (def. article, masc. nom.)" },
          { before: "Ich kaufe einen ", blank: "warmen", after: " Pullover.", hint: "I buy a warm jumper. (indef., masc. acc.)" },
          { before: "Das ist eine ", blank: "schöne", after: " Stadt.", hint: "That is a beautiful city. (indef., fem. nom.)" },
          { before: "Mit dem ", blank: "alten", after: " Lehrer spreche ich.", hint: "I speak with the old teacher. (dative)" },
          { before: "Die ", blank: "neuen", after: " Bücher sind teuer.", hint: "The new books are expensive. (plural, def.)" },
          { before: "Er trägt ein ", blank: "rotes", after: " Hemd.", hint: "He wears a red shirt. (indef., neut. nom.)" },
          { before: "Wir wohnen in einem ", blank: "kleinen", after: " Haus.", hint: "We live in a small house. (dative, neut.)" },
          { before: "Das ist der ", blank: "beste", after: " Film.", hint: "That is the best film. (def., masc. nom.)" },
        ],
      },
    ],
  },

  {
    id: "a2-p-prepositions",
    icon: "📍",
    title: "Prepositions Practice",
    subtitle: "Cases with prepositions",
    topics: [
      {
        id: "a2-p-prep-quiz",
        title: "Prepositions Quiz",
        type: "quiz",
        questions: [
          { question: "'Ich fahre ___ Berlin.' (to a city)", options: ["zu", "in", "nach", "an"], answer: 2 },
          { question: "'Das Buch liegt ___ dem Tisch.' (on — location)", options: ["an", "in", "auf", "bei"], answer: 2 },
          { question: "'Ich gehe ___ die Schule.' (into — movement)", options: ["in der", "in die", "bei der", "an der"], answer: 1 },
          { question: "'Für' always takes:", options: ["dative", "genitive", "nominative", "accusative"], answer: 3 },
          { question: "'___ dem Essen schauen wir TV.' (after)", options: ["Vor", "Bei", "Nach", "Von"], answer: 2 },
          { question: "'Ich komme ___ der Schweiz.' (from a country)", options: ["von", "aus", "nach", "bei"], answer: 1 },
          { question: "'Ich warte ___ den Bus.' (on/for)", options: ["auf", "an", "bei", "in"], answer: 0 },
          { question: "'Er wohnt ___ seinen Eltern.' (at someone's place)", options: ["mit", "bei", "von", "zu"], answer: 1 },
        ],
      },
      {
        id: "a2-p-prep-fill",
        title: "Prepositions Fill-in",
        type: "fill",
        sentences: [
          { before: "Ich fahre ", blank: "nach", after: " München.", hint: "I'm going ___ Munich. (nach + city)" },
          { before: "Das Bild hängt ", blank: "an", after: " der Wand.", hint: "The picture hangs ___ the wall. (location)" },
          { before: "Ich gehe ", blank: "durch", after: " den Park.", hint: "I walk ___ the park. (through — accusative)" },
          { before: "Das Geschenk ist ", blank: "für", after: " dich.", hint: "The gift is ___ you." },
          { before: "Er kommt ", blank: "aus", after: " Deutschland.", hint: "He comes ___ Germany." },
          { before: "Wir treffen uns ", blank: "vor", after: " dem Kino.", hint: "We meet ___ the cinema. (in front of)" },
          { before: "Sie fährt ", blank: "mit", after: " dem Zug.", hint: "She travels ___ the train. (by — with)" },
          { before: "Stell das Glas ", blank: "auf", after: " den Tisch.", hint: "Put the glass ___ the table. (movement → acc.)" },
        ],
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// B1 PRACTICE
// ─────────────────────────────────────────────────────────────
export const B1_PRACTICE_MODULES = [
  {
    id: "b1-p-kII",
    icon: "💭",
    title: "Konjunktiv II Practice",
    subtitle: "Wishes, hypotheticals, polite requests",
    topics: [
      {
        id: "b1-p-kII-quiz",
        title: "Konjunktiv II Quiz",
        type: "quiz",
        questions: [
          { question: "Konjunktiv II of 'sein' (ich):", options: ["ich sei", "ich wäre", "ich würde sein", "ich bin"], answer: 1 },
          { question: "'___ du mir bitte helfen?' (polite: could you)", options: ["Kannst", "Könntest", "Willst", "Sollst"], answer: 1 },
          { question: "'Wenn ich Zeit ___, würde ich reisen.' (hätte / hätte)", options: ["habe", "hätte", "hatte", "haben"], answer: 1 },
          { question: "'Ich ___ gern mehr verdienen.' (would like to)", options: ["würde", "wäre", "hätte", "möchte"], answer: 0 },
          { question: "Konjunktiv II of 'können' (er):", options: ["er kann", "er konnte", "er könnte", "er würde können"], answer: 2 },
          { question: "'Das ___ wirklich schön.' (would be)", options: ["ist", "wäre", "würde", "sei"], answer: 1 },
          { question: "'___ Sie mir bitte sagen, wo der Bahnhof ist?' (polite)", options: ["Können", "Könnten", "Wollen", "Sollen"], answer: 1 },
          { question: "'Ich an deiner Stelle ___ das nicht tun.'", options: ["würde", "wäre", "hätte", "könnte"], answer: 0 },
        ],
      },
      {
        id: "b1-p-kII-fill",
        title: "Konjunktiv II Fill-in",
        type: "fill",
        sentences: [
          { before: "Wenn ich mehr Geld ", blank: "hätte", after: ", würde ich reisen.", hint: "If I ___ more money … (unreal condition)" },
          { before: "Das ", blank: "wäre", after: " sehr nett von dir.", hint: "That ___ very nice of you." },
          { before: "Ich ", blank: "würde", after: " gern nach Italien fahren.", hint: "I ___ love to go to Italy." },
          { before: "Er ", blank: "könnte", after: " uns morgen helfen.", hint: "He ___ help us tomorrow." },
          { before: "Sie ", blank: "sollte", after: " mehr schlafen.", hint: "She ___ sleep more. (advice)" },
          { before: "Wenn ich du ", blank: "wäre", after: ", würde ich entschuldigen.", hint: "If I ___ you, I would apologise." },
          { before: "Ich ", blank: "hätte", after: " gern ein Glas Wasser.", hint: "I ___ like a glass of water, please." },
          { before: "Das ", blank: "dürfte", after: " nicht so einfach sein.", hint: "That ___ not be so simple. (probability)" },
        ],
      },
    ],
  },

  {
    id: "b1-p-subordinate",
    icon: "🔗",
    title: "Subordinate Clauses Practice",
    subtitle: "weil, dass, ob, obwohl, relative clauses",
    topics: [
      {
        id: "b1-p-sub-quiz",
        title: "Subordinate Clauses Quiz",
        type: "quiz",
        questions: [
          { question: "Word order after 'weil': verb goes to…", options: ["front", "second", "end", "stays same"], answer: 2 },
          { question: "'Ich weiß nicht, ___ er kommt.' (whether)", options: ["dass", "weil", "ob", "als"], answer: 2 },
          { question: "Correct: 'Er bleibt zu Hause, weil er ___ krank ist.'", options: ["ist krank", "krank ist", "ist er krank", "krank sein"], answer: 1 },
          { question: "'___ ich jung war, spielte ich Fußball.' (single past event)", options: ["Wenn", "Weil", "Als", "Ob"], answer: 2 },
          { question: "Correct relative pronoun: 'Der Mann, ___ ich kenne, ist nett.' (accusative)", options: ["der", "dem", "den", "dessen"], answer: 2 },
          { question: "'Obwohl es regnet, gehe ich spazieren.' — 'obwohl' means:", options: ["because", "although", "when", "if"], answer: 1 },
          { question: "Relative pronoun for feminine noun in nominative:", options: ["der", "die", "das", "den"], answer: 1 },
          { question: "'Ich lerne Deutsch, damit ich in Deutschland ___ kann.' (arbeiten)", options: ["arbeite", "arbeiten", "arbeit", "gearbeitet"], answer: 1 },
        ],
      },
      {
        id: "b1-p-sub-fill",
        title: "Subordinate Clauses Fill-in",
        type: "fill",
        sentences: [
          { before: "Ich bleibe zu Hause, weil ich krank ", blank: "bin", after: ".", hint: "… because I ___ ill. (verb to end)" },
          { before: "Ich glaube, dass er Recht ", blank: "hat", after: ".", hint: "I believe that he ___ right." },
          { before: "Ich weiß nicht, ob er morgen ", blank: "kommt", after: ".", hint: "I don't know whether he ___ tomorrow." },
          { before: "Als ich jung ", blank: "war", after: ", lebte ich in München.", hint: "When I ___ young, I lived in Munich." },
          { before: "Er geht nicht raus, obwohl es schön ", blank: "ist", after: ".", hint: "He doesn't go out, although it ___ nice." },
          { before: "Das ist die Frau, die ich ", blank: "kenne", after: ".", hint: "That is the woman I ___ . (relative clause)" },
          { before: "Ich lerne Deutsch, damit ich arbeiten ", blank: "kann", after: ".", hint: "I learn German so that I ___ work." },
          { before: "Der Film, den er ", blank: "empfiehlt", after: ", ist sehr gut.", hint: "The film he ___ is very good." },
        ],
      },
    ],
  },

  {
    id: "b1-p-passive",
    icon: "🔄",
    title: "Passive Voice Practice",
    subtitle: "werden + Partizip II",
    topics: [
      {
        id: "b1-p-passive-quiz",
        title: "Passive Voice Quiz",
        type: "quiz",
        questions: [
          { question: "Present passive formula:", options: ["sein + Infinitiv", "werden + Partizip II", "haben + Partizip II", "werden + Infinitiv"], answer: 1 },
          { question: "'Das Haus ___ gerade gebaut.' (present passive)", options: ["ist", "hat", "wird", "wurde"], answer: 2 },
          { question: "'Das Buch ___ gestern gelesen.' (past passive)", options: ["wird", "wurde", "ist", "hat"], answer: 1 },
          { question: "Agent in passive is introduced by:", options: ["mit + dative", "von + dative", "durch + accusative", "für + accusative"], answer: 1 },
          { question: "Active: 'Man repariert das Auto.' → Passive:", options: ["Das Auto ist repariert.", "Das Auto wird repariert.", "Das Auto hat repariert.", "Das Auto repariert."], answer: 1 },
          { question: "Zustandspassiv uses:", options: ["werden + Partizip II", "sein + Infinitiv", "sein + Partizip II", "haben + Partizip II"], answer: 2 },
          { question: "'Das Fenster ist geöffnet.' is:", options: ["Vorgangspassiv", "Zustandspassiv", "active voice", "Konjunktiv"], answer: 1 },
          { question: "'Das Lied wurde ___ Maria gesungen.'", options: ["von", "mit", "durch", "für"], answer: 0 },
        ],
      },
      {
        id: "b1-p-passive-fill",
        title: "Passive Voice Fill-in",
        type: "fill",
        sentences: [
          { before: "Das Haus ", blank: "wird", after: " gerade gebaut.", hint: "The house ___ being built. (present passive)" },
          { before: "Der Brief ", blank: "wurde", after: " gestern geschrieben.", hint: "The letter ___ written yesterday. (past passive)" },
          { before: "Das Auto wird von einem Mechaniker ", blank: "repariert", after: ".", hint: "The car is ___ by a mechanic." },
          { before: "Die Tür ist ", blank: "geöffnet", after: ".", hint: "The door is open. (Zustandspassiv)" },
          { before: "Das Buch ", blank: "wurde", after: " von Goethe geschrieben.", hint: "The book ___ written by Goethe." },
          { before: "In Deutschland ", blank: "wird", after: " viel Brot gegessen.", hint: "In Germany lots of bread ___ eaten." },
          { before: "Das Problem ", blank: "wird", after: " diskutiert.", hint: "The problem ___ being discussed." },
          { before: "Die Pakete ", blank: "wurden", after: " bereits geliefert.", hint: "The parcels ___ already delivered." },
        ],
      },
    ],
  },

  {
    id: "b1-p-mixed",
    icon: "🎯",
    title: "B1 Mixed Practice",
    subtitle: "Combining all B1 structures",
    topics: [
      {
        id: "b1-p-mixed-quiz",
        title: "B1 Mixed Quiz",
        type: "quiz",
        questions: [
          { question: "'Er sagt, dass er morgen ___ kommt.' (nicht)", options: ["nicht kommt", "kommt nicht", "nicht", "kommt"], answer: 0 },
          { question: "Correct passive: 'The report is written.'", options: ["Der Bericht schreibt.", "Der Bericht wird geschrieben.", "Der Bericht hat geschrieben.", "Der Bericht ist schreiben."], answer: 1 },
          { question: "'Wenn ich du ___, würde ich den Job nehmen.'", options: ["bin", "war", "wäre", "sei"], answer: 2 },
          { question: "Relative clause: 'Das Buch, ___ ich lese, ist faszinierend.' (neuter, accusative)", options: ["das", "dem", "der", "dessen"], answer: 0 },
          { question: "'Obwohl er müde ___, arbeitet er weiter.'", options: ["ist", "war", "sei", "wäre"], answer: 0 },
          { question: "Polite request using Konjunktiv II:", options: ["Können Sie mir helfen?", "Könnten Sie mir helfen?", "Wollen Sie mir helfen?", "Sollen Sie mir helfen?"], answer: 1 },
          { question: "'Als' vs 'wenn' for repeated past:", options: ["als", "wenn", "both", "neither"], answer: 1 },
          { question: "Past passive of 'bauen' (er):", options: ["er hat gebaut", "er wird gebaut", "er wurde gebaut", "er ist gebaut"], answer: 2 },
        ],
      },
      {
        id: "b1-p-mixed-fill",
        title: "B1 Mixed Fill-in",
        type: "fill",
        sentences: [
          { before: "Ich wünschte, ich ", blank: "hätte", after: " mehr Zeit.", hint: "I wish I ___ more time. (Konjunktiv II)" },
          { before: "Er sagt, dass er das Buch ", blank: "gelesen", after: " hat.", hint: "He says he ___ the book." },
          { before: "Das Gebäude ", blank: "wurde", after: " 1900 gebaut.", hint: "The building ___ built in 1900." },
          { before: "Ich bleibe, obwohl ich müde ", blank: "bin", after: ".", hint: "I'm staying, although I ___ tired." },
          { before: "Die Frau, ", blank: "die", after: " dort arbeitet, ist meine Schwester.", hint: "The woman ___ works there is my sister." },
          { before: "Wenn er mehr lernen ", blank: "würde", after: ", hätte er Erfolg.", hint: "If he ___ study more, he'd succeed." },
          { before: "Das Problem ", blank: "wird", after: " von allen diskutiert.", hint: "The problem ___ discussed by everyone." },
          { before: "Er kam, ohne etwas zu ", blank: "sagen", after: ".", hint: "He came without ___ anything." },
        ],
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// B2 PRACTICE
// ─────────────────────────────────────────────────────────────
export const B2_PRACTICE_MODULES = [
  {
    id: "b2-p-genitive",
    icon: "🧠",
    title: "Genitive & Advanced Cases",
    subtitle: "Genitive prepositions and attributes",
    topics: [
      {
        id: "b2-p-genitive-quiz",
        title: "Genitive Quiz",
        type: "quiz",
        questions: [
          { question: "Genitive of 'der Mann':", options: ["dem Mann", "des Mannes", "den Mann", "der Mannes"], answer: 1 },
          { question: "Genitive of 'die Frau':", options: ["der Frau", "des Frau", "dem Frau", "die Frau"], answer: 0 },
          { question: "'Trotz ___ Regens blieb er draußen.'", options: ["der", "dem", "des", "den"], answer: 2 },
          { question: "'Während ___ Meetings war er still.'", options: ["dem", "des", "den", "der"], answer: 1 },
          { question: "Genitive relative pronoun for masculine: 'whose'", options: ["der", "dem", "dessen", "den"], answer: 2 },
          { question: "'Wegen ___ Krankheit kam er nicht.'", options: ["der", "dem", "des", "seinen"], answer: 0 },
          { question: "'Aufgrund ___ Erfahrung wurde er befördert.'", options: ["seiner", "seinem", "seinen", "seines"], answer: 0 },
          { question: "Which preposition takes genitive? ", options: ["mit", "bei", "trotz", "von"], answer: 2 },
        ],
      },
      {
        id: "b2-p-genitive-fill",
        title: "Genitive Fill-in",
        type: "fill",
        sentences: [
          { before: "Das Auto ", blank: "des", after: " Mannes ist neu.", hint: "The man's car. (masc. genitive article)" },
          { before: "Trotz ", blank: "des", after: " Regens gingen wir spazieren.", hint: "Despite ___ rain. (trotz + genitive)" },
          { before: "Während ", blank: "der", after: " Ferien war es schön.", hint: "During ___ holidays. (während + genitive, fem.)" },
          { before: "Der Mann, ", blank: "dessen", after: " Frau Ärztin ist, wohnt hier.", hint: "The man ___ wife is a doctor. (genitive rel. pronoun, masc.)" },
          { before: "Wegen ", blank: "der", after: " Verspätung verpasste er den Zug.", hint: "Because of ___ delay. (wegen + genitive, fem.)" },
          { before: "Die Qualität ", blank: "des", after: " Produkts ist sehr gut.", hint: "The quality ___ product. (neuter genitive)" },
          { before: "Anstatt ", blank: "des", after: " Kaffees trank sie Tee.", hint: "Instead of ___ coffee. (masc. genitive)" },
          { before: "Aufgrund ", blank: "ihrer", after: " Erfahrung bekam sie den Job.", hint: "Due to ___ experience. (genitive, her)" },
        ],
      },
    ],
  },

  {
    id: "b2-p-discourse",
    icon: "🗣️",
    title: "Discourse & Argumentation",
    subtitle: "Opinion, contrast and concession",
    topics: [
      {
        id: "b2-p-discourse-quiz",
        title: "Discourse Quiz",
        type: "quiz",
        questions: [
          { question: "Formal word for 'aber' (however):", options: ["und", "weil", "jedoch", "wenn"], answer: 2 },
          { question: "'Das ist zwar gut, ___ es hat Nachteile.'", options: ["weil", "obwohl", "aber", "damit"], answer: 2 },
          { question: "'Einerseits … andererseits' presents:", options: ["one opinion strongly", "balanced two-sided view", "a conclusion", "a definition"], answer: 1 },
          { question: "'Nicht nur … sondern auch' connects:", options: ["contrast", "additive/reinforcing ideas", "cause and effect", "concession"], answer: 1 },
          { question: "Academic phrase meaning 'In summary':", options: ["Einerseits", "Im Gegensatz", "Zusammenfassend lässt sich sagen", "Hinzu kommt"], answer: 2 },
          { question: "'Dennoch' is more formal than:", options: ["jedoch", "allerdings", "trotzdem", "zwar"], answer: 2 },
          { question: "'Es lässt sich argumentieren, dass' is typical of:", options: ["casual speech", "text messages", "academic writing", "phone calls"], answer: 2 },
          { question: "'Im Hinblick auf die Kosten …' means:", options: ["Despite the costs", "With regard to the costs", "Because of the costs", "Instead of the costs"], answer: 1 },
        ],
      },
      {
        id: "b2-p-discourse-fill",
        title: "Discourse Fill-in",
        type: "fill",
        sentences: [
          { before: "Meiner Meinung ", blank: "nach", after: " ist das falsch.", hint: "In my opinion ___ that is wrong. (Meiner Meinung ___)" },
          { before: "Einerseits ist das gut, ", blank: "andererseits", after: " gibt es Risiken.", hint: "On one hand it's good, ___ there are risks." },
          { before: "Das ist zwar teuer, ", blank: "aber", after: " es lohnt sich.", hint: "Admittedly it's expensive, ___ it's worth it." },
          { before: "Darüber ", blank: "hinaus", after: " muss man bedenken, dass …", hint: "Moreover / Beyond that … (Darüber ___)" },
          { before: "Im Gegensatz ", blank: "dazu", after: " zeigt die Studie, dass …", hint: "In contrast ___ , the study shows …" },
          { before: "Zusammenfassend lässt sich ", blank: "sagen", after: ", dass das Projekt erfolgreich war.", hint: "In summary, it can be ___ …" },
          { before: "Nicht nur Kinder, ", blank: "sondern", after: " auch Erwachsene profitieren.", hint: "Not only children, ___ also adults benefit." },
          { before: "Sowohl Männer ", blank: "als", after: " auch Frauen nehmen teil.", hint: "Both men ___ also women participate." },
        ],
      },
    ],
  },

  {
    id: "b2-p-writing",
    icon: "✍️",
    title: "Academic Writing Practice",
    subtitle: "Essay phrases and formal structures",
    topics: [
      {
        id: "b2-p-writing-quiz",
        title: "Academic Writing Quiz",
        type: "quiz",
        questions: [
          { question: "'Es ist anzumerken, dass' uses which construction?", options: ["Konjunktiv I", "Passive infinitive (zu + Inf.)", "Konjunktiv II", "Futur II"], answer: 1 },
          { question: "Phrase to add a further point formally:", options: ["Einerseits", "Darüber hinaus", "Obwohl", "Zusammenfassend"], answer: 1 },
          { question: "'Es bleibt abzuwarten, ob' expresses:", options: ["certainty", "past events", "uncertainty about future", "contrast"], answer: 2 },
          { question: "'Dies verdeutlicht, dass' means:", options: ["This contradicts", "This illustrates/shows that", "This summarises", "This defines"], answer: 1 },
          { question: "'Im Hinblick auf' introduces:", options: ["a contrast", "a conclusion", "a topic/aspect", "a definition"], answer: 2 },
          { question: "Passive infinitive: 'Es ist zu bedenken, dass' means:", options: ["It is being considered", "One should consider that", "It has been considered", "Consider this!"], answer: 1 },
          { question: "Best conclusion phrase:", options: ["Zunächst ist festzustellen", "Im Hinblick auf", "Zusammenfassend lässt sich sagen", "Einerseits"], answer: 2 },
          { question: "'Wenngleich' means:", options: ["therefore", "because", "although / even though", "in addition"], answer: 2 },
        ],
      },
      {
        id: "b2-p-writing-fill",
        title: "Academic Writing Fill-in",
        type: "fill",
        sentences: [
          { before: "In der folgenden Arbeit werde ich das Thema ", blank: "untersuchen", after: ".", hint: "I will ___ the topic in the following paper." },
          { before: "Zunächst ist ", blank: "festzustellen", after: ", dass die Zahlen steigen.", hint: "First of all, it should be ___ that the numbers are rising." },
          { before: "Darüber hinaus muss ", blank: "berücksichtigt", after: " werden, dass …", hint: "Moreover, it must be ___ into account that …" },
          { before: "Im Hinblick ", blank: "auf", after: " die Umwelt ist das problematisch.", hint: "With regard ___ the environment, this is problematic." },
          { before: "Es bleibt abzuwarten, ", blank: "ob", after: " die Maßnahmen wirken.", hint: "It remains to be seen ___ the measures work." },
          { before: "Dies ", blank: "verdeutlicht", after: ", dass weitere Forschung nötig ist.", hint: "This ___ that further research is needed." },
          { before: "Zusammenfassend lässt sich ", blank: "sagen", after: ", dass das Ziel erreicht wurde.", hint: "In summary, it can be ___ that the goal was achieved." },
          { before: "Es ist ", blank: "anzumerken", after: ", dass die Datenlage begrenzt ist.", hint: "It should be ___ that the data is limited." },
        ],
      },
    ],
  },

  {
    id: "b2-p-vocab",
    icon: "📚",
    title: "Advanced Vocabulary Practice",
    subtitle: "Synonyms, idioms, nuanced German",
    topics: [
      {
        id: "b2-p-vocab-quiz",
        title: "Advanced Vocabulary Quiz",
        type: "quiz",
        questions: [
          { question: "Nuanced synonym for 'sagen' (when the claim may be disputed):", options: ["sprechen", "behaupten", "reden", "flüstern"], answer: 1 },
          { question: "'Das Handtuch werfen' means:", options: ["to do laundry", "to give up", "to exercise", "to wave hello"], answer: 1 },
          { question: "'Ins Fettnäpfchen treten' means:", options: ["to slip on ice", "to put one's foot in it socially", "to be clumsy physically", "to make a maths error"], answer: 1 },
          { question: "More formal word for 'Problem':", options: ["Sache", "Ding", "Herausforderung", "Fehler"], answer: 2 },
          { question: "'Auf den Punkt kommen' means:", options: ["to arrive on time", "to get to the point", "to make a point on paper", "to score a point"], answer: 1 },
          { question: "Germans 'press thumbs' instead of:", options: ["shaking hands", "crossing fingers", "waving", "nodding"], answer: 1 },
          { question: "'Behaupten' differs from 'sagen' in that:", options: ["it's past tense", "the claim may be disputed", "it's more polite", "it's louder"], answer: 1 },
          { question: "'Den Nagel auf den Kopf treffen' means:", options: ["to hammer something", "to hit the nail on the head", "to injure yourself", "to be precise in maths"], answer: 1 },
        ],
      },
      {
        id: "b2-p-vocab-fill",
        title: "Advanced Vocabulary Fill-in",
        type: "fill",
        sentences: [
          { before: "Er ", blank: "behauptet", after: ", unschuldig zu sein.", hint: "He ___ to be innocent. (disputed claim)" },
          { before: "Die Ergebnisse ", blank: "verdeutlichen", after: " das Problem.", hint: "The results ___ the problem. (make clear)" },
          { before: "Das ist eine wichtige ", blank: "Herausforderung", after: " für uns alle.", hint: "That is an important ___ for all of us. (challenge)" },
          { before: "Kannst du bitte auf den ", blank: "Punkt", after: " kommen?", hint: "Can you please get to the ___ ?" },
          { before: "Ich drücke dir die ", blank: "Daumen", after: " für das Gespräch!", hint: "I'm keeping fingers crossed (lit: pressing ___) for your interview!" },
          { before: "Wir sollten das nicht auf die lange ", blank: "Bank", after: " schieben.", hint: "We shouldn't put that on the back burner (long ___)." },
          { before: "Die Studie wurde von Experten ", blank: "durchgeführt", after: ".", hint: "The study was ___ by experts. (carried out)" },
          { before: "Das ", blank: "erfordert", after: " viel Geduld und Ausdauer.", hint: "That ___ a lot of patience. (requires — formal)" },
        ],
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Shared lookup maps
// ─────────────────────────────────────────────────────────────────────────────
export const PRACTICE_MODULES = {
  A1: A1_PRACTICE_MODULES,
  A2: A2_PRACTICE_MODULES,
  B1: B1_PRACTICE_MODULES,
  B2: B2_PRACTICE_MODULES,
};

export const PRACTICE_META = {
  A1: { label: "A1 — Beginner",          sub: "Greetings, numbers, nouns, verbs, food and time.", color: "#a78bfa" },
  A2: { label: "A2 — Elementary",        sub: "Past tense, modals, adjective endings, prepositions.", color: "#34d399" },
  B1: { label: "B1 — Intermediate",      sub: "Konjunktiv II, subordinate clauses, passive voice.", color: "#f472b6" },
  B2: { label: "B2 — Upper Intermediate", sub: "Genitive, discourse, academic writing, advanced vocab.", color: "#fbbf24" },
};