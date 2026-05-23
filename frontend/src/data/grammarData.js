// grammarData.js
// Grammar lessons for A1–C1, aligned with Goethe Zertifikat syllabi.
// Each lesson: { id, title, explanation, rules[], examples[], exercises[] }

export const GRAMMAR_BY_LEVEL = {

  A1: [
    {
      id: "a1-g1", title: "Verb Conjugation (Present)",
      icon: "⚡",
      explanation: "Regular German verbs follow a predictable pattern. Remove -en from the infinitive to get the stem, then add the correct ending. Two key irregular verbs — sein and haben — must be memorised.",
      rules: [
        "stem + -e → ich (ich mache)",
        "stem + -st → du (du machst)",
        "stem + -t → er/sie/es (er macht)",
        "stem + -en → wir/sie/Sie (wir machen)",
        "stem + -t → ihr (ihr macht)",
        "⚠️ If stem ends in -t or -d, add extra -e: er arbeitet (not 'arbeit')",
      ],
      table: {
        headers: ["Person", "sein (to be)", "haben (to have)", "machen (to do)"],
        rows: [
          ["ich", "bin", "habe", "mache"],
          ["du", "bist", "hast", "machst"],
          ["er/sie/es", "ist", "hat", "macht"],
          ["wir", "sind", "haben", "machen"],
          ["ihr", "seid", "habt", "macht"],
          ["sie/Sie", "sind", "haben", "machen"],
        ],
      },
      examples: [
        { de: "Ich bin Lehrerin.", en: "I am a teacher." },
        { de: "Du hast ein Buch.", en: "You have a book." },
        { de: "Er arbeitet viel.", en: "He works a lot." },
        { de: "Wir machen Hausaufgaben.", en: "We do homework." },
      ],
      exercises: [
        { type: "fill", sentence: "Ich ___ Student. (sein)", answer: "bin", hint: "ich + sein" },
        { type: "fill", sentence: "Du ___ einen Hund. (haben)", answer: "hast", hint: "du + haben" },
        { type: "fill", sentence: "Er ___ in Berlin. (wohnen)", answer: "wohnt", hint: "stem: wohn- + t" },
        { type: "fill", sentence: "Wir ___ Deutsch. (lernen)", answer: "lernen", hint: "wir = stem + en" },
        { type: "fill", sentence: "Sie ___ im Büro. (arbeiten)", answer: "arbeitet", hint: "stem ends in -t → extra e" },
      ],
    },
    {
      id: "a1-g2", title: "Noun Gender & Articles",
      icon: "🏷️",
      explanation: "Every German noun has a grammatical gender: masculine (der), feminine (die), or neuter (das). The indefinite articles are ein (m/n) and eine (f). Gender must be memorised — always learn the article with the noun.",
      rules: [
        "Masculine (der): der Mann, der Hund, der Tisch",
        "Feminine (die): die Frau, die Katze, die Schule",
        "Neuter (das): das Kind, das Buch, das Haus",
        "⚠️ Words ending in -chen/-lein are ALWAYS neuter: das Mädchen",
        "Words ending in -ung/-heit/-keit are ALWAYS feminine: die Zeitung",
        "Plural always uses 'die' regardless of gender",
      ],
      table: {
        headers: ["Gender", "Definite", "Indefinite", "Example"],
        rows: [
          ["Masculine", "der", "ein", "der/ein Mann"],
          ["Feminine", "die", "eine", "die/eine Frau"],
          ["Neuter", "das", "ein", "das/ein Kind"],
          ["Plural", "die", "—", "die Männer"],
        ],
      },
      examples: [
        { de: "Der Mann ist groß.", en: "The man is tall." },
        { de: "Eine Frau liest.", en: "A woman is reading." },
        { de: "Das Mädchen singt.", en: "The girl sings." },
        { de: "Die Kinder spielen.", en: "The children play." },
      ],
      exercises: [
        { type: "fill", sentence: "___ Mann ist groß. (definite, masc.)", answer: "Der", hint: "masculine = der" },
        { type: "fill", sentence: "Ich habe ___ Katze. (indefinite, fem.)", answer: "eine", hint: "feminine indefinite = eine" },
        { type: "fill", sentence: "___ Mädchen ist nett. (definite, neuter)", answer: "Das", hint: "-chen words → das" },
        { type: "fill", sentence: "___ Bücher sind teuer. (plural)", answer: "Die", hint: "all plurals → die" },
        { type: "fill", sentence: "Das ist ___ Haus. (indefinite, neuter)", answer: "ein", hint: "neuter indefinite = ein" },
      ],
    },
    {
      id: "a1-g3", title: "Nominative & Accusative Cases",
      icon: "📐",
      explanation: "German has 4 cases. At A1, focus on nominative (subject) and accusative (direct object). The main change in accusative is the masculine article: der → den, ein → einen.",
      rules: [
        "Nominative = subject of the sentence (who does the action)",
        "Accusative = direct object (who/what receives the action)",
        "Masculine: der → den / ein → einen in accusative",
        "Feminine, neuter, plural: NO change in accusative",
        "Mnemonic: only masculine changes!",
      ],
      table: {
        headers: ["Case", "Masculine", "Feminine", "Neuter", "Plural"],
        rows: [
          ["Nominative", "der / ein", "die / eine", "das / ein", "die / —"],
          ["Accusative", "den / einen", "die / eine", "das / ein", "die / —"],
        ],
      },
      examples: [
        { de: "Der Mann sieht einen Film.", en: "The man watches a film. (Mann=nom, Film=acc masc.)" },
        { de: "Ich kaufe eine Tasche.", en: "I buy a bag. (Tasche=acc fem. — no change)" },
        { de: "Sie liest das Buch.", en: "She reads the book. (Buch=acc neuter — no change)" },
      ],
      exercises: [
        { type: "fill", sentence: "Ich sehe ___ Mann. (den/die/das)", answer: "den", hint: "masc. accusative = den" },
        { type: "fill", sentence: "Er kauft ___ Buch. (den/die/das)", answer: "das", hint: "neuter accusative = das (no change)" },
        { type: "fill", sentence: "Sie hat ___ Freund. (einen/eine/ein)", answer: "einen", hint: "masc. indefinite accusative = einen" },
      ],
    },
    {
      id: "a1-g4", title: "Word Order — V2 Rule",
      icon: "🔢",
      explanation: "In German main clauses, the conjugated verb ALWAYS comes second. If you move a time or place expression to the front, the verb and subject swap positions (inversion).",
      rules: [
        "Normal: Subject (1) — Verb (2) — Rest",
        "Inversion: Time/Place (1) — Verb (2) — Subject (3) — Rest",
        "The verb is ALWAYS in position 2 — never 1st or 3rd",
        "Negation: 'nicht' usually comes at the end, or before the word it negates",
      ],
      table: null,
      examples: [
        { de: "Ich lerne heute Deutsch.", en: "I learn German today. (normal)" },
        { de: "Heute lerne ich Deutsch.", en: "Today I learn German. (inversion)" },
        { de: "Am Montag fahre ich nach Berlin.", en: "On Monday I go to Berlin. (inversion)" },
        { de: "Ich schlafe nicht.", en: "I am not sleeping. (nicht at end)" },
      ],
      exercises: [
        { type: "fill", sentence: "Morgen ___ ich nach Berlin. (fahren)", answer: "fahre", hint: "inversion: Morgen (1) + verb (2) + subject (3)" },
        { type: "fill", sentence: "Heute Abend ___ wir ins Kino. (gehen)", answer: "gehen", hint: "V2 rule applies" },
        { type: "fill", sentence: "Ich ___ jetzt nicht. (schlafen)", answer: "schlafe", hint: "ich + verb ending -e" },
      ],
    },
  ],

  A2: [
    {
      id: "a2-g1", title: "Perfekt — Talking About the Past",
      icon: "⏪",
      explanation: "The Perfekt is the main past tense used in spoken German. It is formed with haben or sein (auxiliary) + past participle at the END. Most verbs use haben; movement and change-of-state verbs use sein.",
      rules: [
        "Formula: haben/sein (pos. 2) + Partizip II (end)",
        "Regular Partizip II: ge- + stem + -t (machen → gemacht)",
        "Strong Partizip II: ge- + changed stem + -en (schreiben → geschrieben)",
        "USE SEIN: movement (gehen, fahren, laufen), change of state (aufwachen, einschlafen), bleiben, sein, werden",
        "USE HABEN: everything else",
        "⚠️ Separable verbs: ge- goes between prefix and stem (aufgemacht)",
      ],
      table: {
        headers: ["Verb", "Partizip II", "Auxiliary", "Example"],
        rows: [
          ["machen", "gemacht", "haben", "Ich habe gemacht."],
          ["schreiben", "geschrieben", "haben", "Er hat geschrieben."],
          ["gehen", "gegangen", "sein", "Ich bin gegangen."],
          ["fahren", "gefahren", "sein", "Sie ist gefahren."],
          ["aufmachen", "aufgemacht", "haben", "Ich habe aufgemacht."],
        ],
      },
      examples: [
        { de: "Ich habe heute Pizza gegessen.", en: "I ate pizza today." },
        { de: "Er ist nach Berlin gefahren.", en: "He drove to Berlin." },
        { de: "Wir haben lange geschlafen.", en: "We slept a long time." },
        { de: "Sie ist früh aufgestanden.", en: "She got up early." },
      ],
      exercises: [
        { type: "fill", sentence: "Ich ___ heute Fußball gespielt. (haben/sein)", answer: "habe", hint: "spielen → haben" },
        { type: "fill", sentence: "Er ___ nach Hamburg gefahren. (haben/sein)", answer: "ist", hint: "fahren = movement → sein" },
        { type: "fill", sentence: "Wir ___ lange geblieben. (haben/sein)", answer: "sind", hint: "bleiben → sein" },
        { type: "fill", sentence: "Das Partizip II von 'kaufen' ist ___.", answer: "gekauft", hint: "ge- + stem + -t" },
        { type: "fill", sentence: "Das Partizip II von 'schreiben' ist ___.", answer: "geschrieben", hint: "strong verb: ge- + changed vowel + -en" },
      ],
    },
    {
      id: "a2-g2", title: "Modal Verbs",
      icon: "🎛️",
      explanation: "Modal verbs express ability, permission, necessity and desire. They are conjugated irregularly and always send the main verb (infinitive) to the END of the clause.",
      rules: [
        "Structure: Modal (pos. 2) + ... + Infinitive (end)",
        "können: ability/possibility (ich kann)",
        "müssen: necessity/must (ich muss)",
        "wollen: intention/want to (ich will)",
        "dürfen: permission/may (ich darf)",
        "sollen: external obligation/should (ich soll)",
        "möchten: polite wish/would like (ich möchte)",
        "⚠️ ich/er/sie/es forms are IDENTICAL in all modals",
      ],
      table: {
        headers: ["", "können", "müssen", "wollen", "dürfen", "sollen", "möchten"],
        rows: [
          ["ich", "kann", "muss", "will", "darf", "soll", "möchte"],
          ["du", "kannst", "musst", "willst", "darfst", "sollst", "möchtest"],
          ["er/sie/es", "kann", "muss", "will", "darf", "soll", "möchte"],
          ["wir", "können", "müssen", "wollen", "dürfen", "sollen", "möchten"],
        ],
      },
      examples: [
        { de: "Ich kann Deutsch sprechen.", en: "I can speak German." },
        { de: "Du musst das lernen.", en: "You have to learn that." },
        { de: "Darf ich hier parken?", en: "May I park here?" },
        { de: "Ich möchte einen Kaffee.", en: "I would like a coffee." },
      ],
      exercises: [
        { type: "fill", sentence: "Ich ___ nicht kommen. (können)", answer: "kann", hint: "ich + können" },
        { type: "fill", sentence: "___ ich hier fotografieren? (dürfen)", answer: "Darf", hint: "permission → dürfen, ich-form" },
        { type: "fill", sentence: "Er ___ morgen früh aufstehen. (müssen)", answer: "muss", hint: "er + müssen" },
        { type: "fill", sentence: "Sie ___ ins Kino gehen. (wollen)", answer: "wollen", hint: "sie (they) + wollen" },
      ],
    },
    {
      id: "a2-g3", title: "Dative Case",
      icon: "📍",
      explanation: "The dative case marks the indirect object — the recipient. It's also required after specific prepositions (mit, nach, bei, von, zu, aus, seit, gegenüber) and verbs like helfen, gehören, gefallen.",
      rules: [
        "Dative articles: dem (m/n), der (f), den+n (pl)",
        "Indefinite dative: einem (m/n), einer (f)",
        "After: mit, nach, bei, von, zu, aus, seit, gegenüber",
        "After: helfen (to help), gehören (to belong to), gefallen (to please), danken (to thank)",
        "Plural dative: noun gets extra -n: mit Kindern, mit Männern",
      ],
      table: {
        headers: ["Case", "Masculine", "Feminine", "Neuter", "Plural"],
        rows: [
          ["Dative (def.)", "dem", "der", "dem", "den + n"],
          ["Dative (indef.)", "einem", "einer", "einem", "—"],
        ],
      },
      examples: [
        { de: "Ich helfe dem Mann.", en: "I help the man. (dative after helfen)" },
        { de: "Sie kommt mit dem Bus.", en: "She comes by bus. (mit + dative)" },
        { de: "Das gehört meiner Mutter.", en: "That belongs to my mother." },
        { de: "Das gefällt mir.", en: "I like that. (lit: that pleases me)" },
      ],
      exercises: [
        { type: "fill", sentence: "Ich fahre mit ___ Zug. (der/dem/den)", answer: "dem", hint: "mit + dative, Zug = masc." },
        { type: "fill", sentence: "Sie hilft ___ Kind. (das/dem/der)", answer: "dem", hint: "helfen + dative, Kind = neuter" },
        { type: "fill", sentence: "Das Buch gehört ___ Frau. (die/der/dem)", answer: "der", hint: "dative feminine = der" },
      ],
    },
    {
      id: "a2-g4", title: "Separable Verbs",
      icon: "✂️",
      explanation: "Separable verbs have a prefix that splits off and goes to the END of the main clause. In infinitive form and in Partizip II, they stay together. Common prefixes: auf-, an-, ab-, ein-, aus-, mit-, zurück-, vor-.",
      rules: [
        "In main clauses: prefix goes to END",
        "Partizip II: ge- between prefix and stem (aufgemacht)",
        "In subordinate clauses: prefix stays attached (weil er aufmacht)",
        "With modal verbs: infinitive stays whole at end (Ich muss aufmachen)",
      ],
      table: {
        headers: ["Verb", "Main clause", "Partizip II", "With modal"],
        rows: [
          ["aufmachen", "Ich mache auf.", "Ich habe aufgemacht.", "Ich muss aufmachen."],
          ["anrufen", "Er ruft an.", "Er hat angerufen.", "Er will anrufen."],
          ["einladen", "Sie lädt ein.", "Sie hat eingeladen.", "Sie kann einladen."],
          ["zurückkommen", "Wir kommen zurück.", "Wir sind zurückgekommen.", "Wir werden zurückkommen."],
        ],
      },
      examples: [
        { de: "Ich stehe um 7 Uhr auf.", en: "I get up at 7 o'clock." },
        { de: "Er ruft mich morgen an.", en: "He will call me tomorrow." },
        { de: "Wann kommt der Zug an?", en: "When does the train arrive?" },
      ],
      exercises: [
        { type: "fill", sentence: "Ich ___ um 6 Uhr ___. (aufstehen)", answer: "stehe / auf", hint: "prefix goes to end: stehe...auf" },
        { type: "fill", sentence: "Er ___ seine Mutter ___. (anrufen)", answer: "ruft / an", hint: "ruft...an" },
        { type: "fill", sentence: "Das Partizip II von 'einladen' ist ___.", answer: "eingeladen", hint: "ein + ge + lad + en" },
      ],
    },
  ],

  B1: [
    {
      id: "b1-g1", title: "Konjunktiv II — Wishes & Hypotheticals",
      icon: "💭",
      explanation: "Konjunktiv II expresses unreal wishes, hypotheticals and polite requests. The key forms to memorise are: wäre (sein), hätte (haben), würde (werden). For most other verbs, use würde + infinitive.",
      rules: [
        "wäre = would be (Konjunktiv II of sein)",
        "hätte = would have (Konjunktiv II of haben)",
        "würde + infinitive = would do (most verbs)",
        "Modal KII: könnte, müsste, dürfte, sollte, wollte",
        "Unreal condition: Wenn + KII, ... würde + infinitive",
        "Polite requests: Könnten Sie...? / Würden Sie...?",
      ],
      table: {
        headers: ["Person", "sein → wäre", "haben → hätte", "werden → würde"],
        rows: [
          ["ich", "wäre", "hätte", "würde"],
          ["du", "wärst", "hättest", "würdest"],
          ["er/sie", "wäre", "hätte", "würde"],
          ["wir", "wären", "hätten", "würden"],
        ],
      },
      examples: [
        { de: "Wenn ich Zeit hätte, würde ich reisen.", en: "If I had time, I would travel." },
        { de: "Das wäre schön.", en: "That would be nice." },
        { de: "Könnten Sie mir helfen?", en: "Could you help me? (polite)" },
        { de: "Ich würde gern nach Japan fahren.", en: "I would like to go to Japan." },
      ],
      exercises: [
        { type: "fill", sentence: "Wenn ich mehr Geld ___, würde ich ein Auto kaufen.", answer: "hätte", hint: "KII of haben" },
        { type: "fill", sentence: "___ Sie mir bitte helfen? (polite: können)", answer: "Könnten", hint: "KII of können = könnte" },
        { type: "fill", sentence: "Das ___ toll! (sein, KII)", answer: "wäre", hint: "KII of sein = wäre" },
        { type: "fill", sentence: "Ich ___ gern länger bleiben. (würde/wäre)", answer: "würde", hint: "würde + infinitive for most verbs" },
        { type: "fill", sentence: "Wenn ich du ___, würde ich das nicht machen.", answer: "wäre", hint: "Wenn ich du wäre = if I were you" },
      ],
    },
    {
      id: "b1-g2", title: "Subordinate Clauses",
      icon: "🔗",
      explanation: "Subordinating conjunctions introduce dependent clauses. The conjugated verb goes to the END of the subordinate clause. With modals, the infinitive comes last, then the modal.",
      rules: [
        "Verb goes to END of subordinate clause",
        "weil (because), dass (that), ob (whether), wenn (if/when), als (when-past), obwohl (although), damit (so that), bevor (before), nachdem (after)",
        "als = single past event; wenn = repeated/future",
        "Modal in sub-clause: ...weil er kommen kann (infinitive then modal — reversed)",
        "Separable verbs stay together in sub-clauses",
        "Main + sub clause separated by comma",
      ],
      table: {
        headers: ["Conjunction", "Meaning", "Example"],
        rows: [
          ["weil", "because", "Ich bleibe, weil ich krank bin."],
          ["dass", "that", "Ich denke, dass er kommt."],
          ["ob", "whether", "Ich weiß nicht, ob er kommt."],
          ["als", "when (past)", "Als ich jung war, spielte ich Klavier."],
          ["obwohl", "although", "Obwohl es regnet, gehe ich raus."],
          ["damit", "so that", "Ich lerne, damit ich die Prüfung bestehe."],
        ],
      },
      examples: [
        { de: "Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte.", en: "I learn German because I want to work in Germany." },
        { de: "Ich weiß nicht, ob er heute kommt.", en: "I don't know whether he is coming today." },
        { de: "Obwohl es kalt ist, trägt er kein Jacket.", en: "Although it is cold, he doesn't wear a jacket." },
      ],
      exercises: [
        { type: "fill", sentence: "Ich bleibe zu Hause, weil ich krank ___.", answer: "bin", hint: "verb goes to end of weil-clause" },
        { type: "fill", sentence: "Ich weiß nicht, ob er morgen ___.", answer: "kommt", hint: "ob-clause: verb to end" },
        { type: "fill", sentence: "___ ich jung war, lebte ich in München.", answer: "Als", hint: "single past event = als" },
        { type: "fill", sentence: "Ich lerne, damit ich die Prüfung ___ kann.", answer: "bestehen", hint: "damit-clause: infinitive at end" },
      ],
    },
    {
      id: "b1-g3", title: "Passive Voice",
      icon: "🔄",
      explanation: "The passive voice shifts focus from the agent to the action. German has two passives: Vorgangspassiv (process) with werden + Partizip II, and Zustandspassiv (state/result) with sein + Partizip II.",
      rules: [
        "Vorgangspassiv: werden + Partizip II (action happening)",
        "Present: Das Haus wird gebaut. Past: Das Haus wurde gebaut.",
        "Zustandspassiv: sein + Partizip II (resulting state)",
        "Agent introduced by von + dative",
        "Active → Passive: object becomes subject, agent → von + dat, verb → werden + PP",
        "Man-sentences → simple passive: Man baut → Es wird gebaut.",
      ],
      table: {
        headers: ["Tense", "Formula", "Example"],
        rows: [
          ["Present", "wird + PP", "Das Buch wird gelesen."],
          ["Past (Prät.)", "wurde + PP", "Das Buch wurde gelesen."],
          ["Perfekt", "ist + PP + worden", "Das Buch ist gelesen worden."],
          ["Zustand", "ist + PP", "Das Fenster ist geöffnet."],
        ],
      },
      examples: [
        { de: "Das Buch wird von vielen Leuten gelesen.", en: "The book is read by many people." },
        { de: "Das Auto wurde in der Werkstatt repariert.", en: "The car was repaired in the garage." },
        { de: "Die Tür ist geschlossen.", en: "The door is closed. (state)" },
      ],
      exercises: [
        { type: "fill", sentence: "Das Haus ___ gerade gebaut. (present passive)", answer: "wird", hint: "present passive = wird + PP" },
        { type: "fill", sentence: "Der Brief ___ gestern geschrieben. (past passive)", answer: "wurde", hint: "past passive = wurde + PP" },
        { type: "fill", sentence: "Das Buch ___ von Schiller geschrieben ___. (Perfekt passive)", answer: "ist / worden", hint: "Perfekt passive: ist + PP + worden" },
      ],
    },
    {
      id: "b1-g4", title: "Relative Clauses",
      icon: "🔍",
      explanation: "Relative clauses describe a noun using a relative pronoun that matches the noun in gender and number, but takes the case required by its role in the relative clause. The verb goes to the END.",
      rules: [
        "Relative pronoun must match gender/number of the noun it refers to",
        "Case is determined by the role IN the relative clause",
        "Nominative: der/die/das/die",
        "Accusative: den/die/das/die",
        "Dative: dem/der/dem/denen",
        "Genitive: dessen/deren/dessen/deren",
        "Verb goes to END of relative clause",
        "Relative clause is set off by commas",
      ],
      table: {
        headers: ["Case", "Masculine", "Feminine", "Neuter", "Plural"],
        rows: [
          ["Nominative", "der", "die", "das", "die"],
          ["Accusative", "den", "die", "das", "die"],
          ["Dative", "dem", "der", "dem", "denen"],
          ["Genitive", "dessen", "deren", "dessen", "deren"],
        ],
      },
      examples: [
        { de: "Das ist der Mann, der dort wohnt.", en: "That is the man who lives there. (nom.)" },
        { de: "Die Frau, die ich kenne, ist Ärztin.", en: "The woman I know is a doctor. (acc.)" },
        { de: "Das Kind, dem ich helfe, ist nett.", en: "The child I'm helping is nice. (dat.)" },
        { de: "Der Mann, dessen Frau krank ist, bleibt zu Hause.", en: "The man whose wife is ill stays at home. (gen.)" },
      ],
      exercises: [
        { type: "fill", sentence: "Der Mann, ___ dort sitzt, ist mein Vater. (nom.)", answer: "der", hint: "Mann = masc., subject of rel. clause" },
        { type: "fill", sentence: "Die Frau, ___ ich kenne, heißt Anna. (acc.)", answer: "die", hint: "Frau = fem., object → accusative" },
        { type: "fill", sentence: "Das Kind, ___ ich helfe, ist 8 Jahre alt. (dat.)", answer: "dem", hint: "helfen + dative, Kind = neuter" },
      ],
    },
  ],

  B2: [
    {
      id: "b2-g1", title: "Genitive Case",
      icon: "🧬",
      explanation: "The genitive expresses possession and is required after certain prepositions. Masculine and neuter nouns add -s/-es. It's common in written/formal German.",
      rules: [
        "Masculine/Neuter nouns: add -s (or -es for short nouns): des Mannes, des Kindes",
        "Feminine/Plural: no ending on noun: der Frau, der Kinder",
        "Genitive prepositions: wegen, trotz, während, statt/anstatt, aufgrund, innerhalb, außerhalb",
        "Genitive relative pronouns: dessen (m/n), deren (f/pl)",
        "'s' possessive works like English: Annas Buch",
        "von + dative often replaces genitive in spoken German",
      ],
      table: {
        headers: ["Gender", "Definite", "Indefinite", "Noun ending"],
        rows: [
          ["Masculine", "des", "eines", "+ s/es"],
          ["Feminine", "der", "einer", "no change"],
          ["Neuter", "des", "eines", "+ s/es"],
          ["Plural", "der", "—", "no change"],
        ],
      },
      examples: [
        { de: "Das Auto des Mannes ist neu.", en: "The man's car is new." },
        { de: "Wegen des Regens blieb ich zu Hause.", en: "Because of the rain I stayed home." },
        { de: "Trotz der Kälte ging er raus.", en: "Despite the cold he went out." },
        { de: "Der Mann, dessen Frau Ärztin ist, wohnt hier.", en: "The man whose wife is a doctor lives here." },
      ],
      exercises: [
        { type: "fill", sentence: "Das Auto ___ Mannes ist teuer. (genitive article)", answer: "des", hint: "masculine genitive = des" },
        { type: "fill", sentence: "Trotz ___ Regens spielten die Kinder draußen.", answer: "des", hint: "trotz + genitive, Regen = masc." },
        { type: "fill", sentence: "Die Tasche ___ Frau ist schön. (genitive)", answer: "der", hint: "feminine genitive = der" },
        { type: "fill", sentence: "Der Mann, ___ Auto gestohlen wurde, ist traurig.", answer: "dessen", hint: "masc. genitive relative = dessen" },
      ],
    },
    {
      id: "b2-g2", title: "Infinitive Constructions",
      icon: "🔧",
      explanation: "German has three key infinitive constructions: um...zu (in order to), ohne...zu (without), anstatt...zu (instead of). They require the same subject in both clauses.",
      rules: [
        "um...zu + infinitive: purpose/goal (in order to)",
        "ohne...zu + infinitive: without -ing",
        "anstatt...zu + infinitive: instead of -ing",
        "Same subject in both clauses required",
        "Separable verbs: um aufzustehen (prefix + zu + stem)",
        "For different subjects → use damit / ohne dass / anstatt dass",
      ],
      table: {
        headers: ["Construction", "Meaning", "Example"],
        rows: [
          ["um...zu", "in order to", "Ich lerne, um die Prüfung zu bestehen."],
          ["ohne...zu", "without -ing", "Er ging, ohne zu grüßen."],
          ["anstatt...zu", "instead of -ing", "Anstatt zu lernen, spielt er."],
          ["zu + Adj. + als dass", "too ... to", "Es ist zu kalt, als dass man rausgehen könnte."],
        ],
      },
      examples: [
        { de: "Ich lerne Deutsch, um in Deutschland zu arbeiten.", en: "I learn German in order to work in Germany." },
        { de: "Er kam, ohne etwas zu sagen.", en: "He came without saying anything." },
        { de: "Anstatt zu schlafen, arbeitet sie noch.", en: "Instead of sleeping, she is still working." },
      ],
      exercises: [
        { type: "fill", sentence: "Ich gehe ins Fitnessstudio, ___ fit zu bleiben.", answer: "um", hint: "purpose/goal = um...zu" },
        { type: "fill", sentence: "Er fuhr, ___ sich zu verabschieden.", answer: "ohne", hint: "without doing = ohne...zu" },
        { type: "fill", sentence: "___ zu lernen, geht er spazieren.", answer: "Anstatt", hint: "instead of = anstatt...zu" },
        { type: "fill", sentence: "Trennbare Verben: 'um aufzustehen' — where does 'zu' go?", answer: "between prefix and stem", hint: "auf + zu + stehen → aufzustehen" },
      ],
    },
    {
      id: "b2-g3", title: "Extended Participial Phrases",
      icon: "📐",
      explanation: "German can replace relative clauses with participial phrases inserted before a noun. Partizip I (ongoing action) and Partizip II (completed/passive action) function as adjectives and take regular adjective endings.",
      rules: [
        "Partizip I = infinitive + d: schlafend, weinend, laufend",
        "Partizip II used as adjective: geschrieben, gebaut, gemacht",
        "Both decline like regular adjectives",
        "Extended attribute: article + (adverb +) participle + noun",
        "Replaces: das Kind, das weint → das weinende Kind",
        "Passive meaning with Partizip II: das gebaute Haus (the built house)",
      ],
      table: {
        headers: ["Type", "Formation", "Example", "Meaning"],
        rows: [
          ["Partizip I", "inf + d", "das weinende Kind", "the crying child"],
          ["Partizip II", "ge- + stem + t/en", "das gebaute Haus", "the built house"],
          ["Extended", "article + adv + PP + noun", "das von Goethe geschriebene Buch", "the book written by Goethe"],
        ],
      },
      examples: [
        { de: "das schlafende Baby", en: "the sleeping baby (Partizip I)" },
        { de: "das renovierte Gebäude", en: "the renovated building (Partizip II)" },
        { de: "der bereits fertiggestellte Bericht", en: "the already completed report" },
      ],
      exercises: [
        { type: "fill", sentence: "das ___ Kind (weinen — Partizip I)", answer: "weinende", hint: "weinen + d + adjective ending -e" },
        { type: "fill", sentence: "das ___ Haus (bauen — Partizip II, neuter nom.)", answer: "gebaute", hint: "gebaut + -e ending for neuter nom." },
      ],
    },
  ],

  C1: [
    {
      id: "c1-g1", title: "Konjunktiv I — Reported Speech",
      icon: "💬",
      explanation: "Konjunktiv I is used mainly in reported speech in formal written/journalistic German. It signals that the writer is reporting what someone said without endorsing it.",
      rules: [
        "Konjunktiv I = stem + subjunctive endings",
        "Most distinctive form: er/sie/es gets no ending (er habe, sie sei, er komme)",
        "sein: ich sei, du seist, er sei, wir seien",
        "haben: er habe, sie habe",
        "If KI looks identical to indicative, use KII instead",
        "Journalism: 'Der Politiker sagte, er habe nichts gewusst.'",
      ],
      table: {
        headers: ["Verb", "Indicative (3rd sg)", "Konjunktiv I (3rd sg)"],
        rows: [
          ["sein", "er ist", "er sei"],
          ["haben", "er hat", "er habe"],
          ["kommen", "er kommt", "er komme"],
          ["wissen", "er weiß", "er wisse"],
          ["gehen", "er geht", "er gehe"],
        ],
      },
      examples: [
        { de: "Die Ministerin sagte, sie habe keine Kenntnis davon.", en: "The minister said she had no knowledge of it." },
        { de: "Er behauptete, er sei unschuldig.", en: "He claimed he was innocent." },
        { de: "Die Zeitung berichtete, der Verdächtige sei geflohen.", en: "The newspaper reported the suspect had fled." },
      ],
      exercises: [
        { type: "fill", sentence: "Er sagte, er ___ krank. (sein — KI)", answer: "sei", hint: "KI of sein for er = sei" },
        { type: "fill", sentence: "Sie behauptete, sie ___ die Wahrheit gesagt. (haben — KI)", answer: "habe", hint: "KI of haben for sie = habe" },
        { type: "fill", sentence: "Der Bericht sagte, er ___ nicht da gewesen. (sein — KI Perfekt)", answer: "sei ... gewesen", hint: "KI Perfekt: sei + Partizip II" },
      ],
    },
    {
      id: "c1-g2", title: "Concessive & Adversative Structures",
      icon: "⚖️",
      explanation: "Advanced concessive structures allow nuanced argumentation. Key patterns: zwar...aber, wenngleich, obschon, mag...auch noch so, wie...auch (immer).",
      rules: [
        "zwar...aber: it's true that...but (concession + contrast)",
        "wenngleich / wiewohl: although (formal, literary)",
        "obschon / obzwar: although (archaic/formal)",
        "Möge es auch noch so schwer sein, ...: however hard it may be",
        "wie...auch immer: however/whatever",
        "Verb-first in concessive clauses: Sei es auch noch so teuer, ...",
      ],
      table: {
        headers: ["Structure", "Register", "Example"],
        rows: [
          ["zwar...aber", "neutral", "Das ist zwar teuer, aber es lohnt sich."],
          ["wenngleich", "formal/written", "Wenngleich er müde war, arbeitete er weiter."],
          ["obschon", "archaic/literary", "Obschon es regnete, blieben sie draußen."],
          ["wie...auch", "formal", "Wie schwer es auch sein mag, ..."],
        ],
      },
      examples: [
        { de: "Das Projekt ist zwar teuer, aber notwendig.", en: "The project is admittedly expensive but necessary." },
        { de: "Wenngleich die Ergebnisse positiv sind, bleiben Risiken.", en: "Although the results are positive, risks remain." },
        { de: "Wie komplex das Problem auch sein mag, es muss gelöst werden.", en: "However complex the problem may be, it must be solved." },
      ],
      exercises: [
        { type: "fill", sentence: "Das ist ___ schwierig, ___ lösbar. (zwar/aber)", answer: "zwar / aber", hint: "zwar...aber = admittedly...but" },
        { type: "fill", sentence: "___ er müde war, arbeitete er weiter. (although — formal)", answer: "Wenngleich", hint: "formal written: wenngleich" },
      ],
    },
    {
      id: "c1-g3", title: "Modalpartikeln — Nuance Particles",
      icon: "🎭",
      explanation: "Modal particles (Modalpartikeln) add nuance, emotion and attitude to sentences. They are untranslatable but essential for sounding natural. They never carry sentence stress.",
      rules: [
        "doch: contradiction, emphasis, appeal (Sie wissen doch...)",
        "ja: shared knowledge, mild surprise (Das ist ja interessant!)",
        "mal: softening requests (Könnten Sie mal kommen?)",
        "eigentlich: actually, originally (Was wollten Sie eigentlich?)",
        "wohl: probability, assumption (Er ist wohl krank.)",
        "halt/eben: resignation, 'that's just how it is' (Das ist halt so.)",
        "schon: concession, confidence (Das wird schon klappen.)",
        "bloß/nur: restriction, warning (Mach das bloß nicht!)",
      ],
      table: {
        headers: ["Particle", "Feeling/nuance", "Example"],
        rows: [
          ["doch", "contradiction / appeal", "Du weißt doch, dass das falsch ist."],
          ["ja", "shared knowledge", "Das ist ja unglaublich!"],
          ["mal", "soften request", "Schau mal hier."],
          ["wohl", "probability", "Er ist wohl krank."],
          ["eben/halt", "resignation", "Das ist eben so."],
          ["schon", "confidence/concession", "Das wird schon klappen."],
        ],
      },
      examples: [
        { de: "Das weißt du doch!", en: "You know that (surely)! (reminder/mild reproach)" },
        { de: "Das ist ja interessant.", en: "That is (actually) interesting! (discovery)" },
        { de: "Er ist wohl krank.", en: "He's probably ill. (assumption)" },
      ],
      exercises: [
        { type: "fill", sentence: "Das ist ___ unglaublich! (shared surprise)", answer: "ja", hint: "'ja' for shared knowledge/discovery" },
        { type: "fill", sentence: "Er ist ___ krank — er fehlt schon drei Tage. (probability)", answer: "wohl", hint: "'wohl' for assumption/probability" },
        { type: "fill", sentence: "Das ist ___ so — man kann nichts machen. (resignation)", answer: "halt", hint: "'halt' or 'eben' for resignation" },
      ],
    },
  ],
};