// practiceSkillsData.js
// Goethe exam-aligned practice tasks for A1–C1.
// Skills: Hören (Hearing), Schreiben (Writing), Lesen (Reading), Sprechen (Speaking)

export const PRACTICE_SKILLS_BY_LEVEL = {

  A1: {
    hoeren: {
      title: "Hören", icon: "🎧",
      description: "Listen to short everyday conversations and answer simple questions.",
      tasks: [
        {
          id: "a1-h1",
          title: "Im Café bestellen",
          scenario: "Listen to a conversation at a café and answer the questions.",
          transcript: `Kellner: Guten Tag! Was möchten Sie?
Kundin: Guten Tag. Ich möchte einen Kaffee und ein Stück Kuchen, bitte.
Kellner: Möchten Sie Milch und Zucker?
Kundin: Milch, ja. Zucker, nein danke.
Kellner: Und für Sie?
Gast: Ich nehme einen Orangensaft und ein belegtes Brötchen.
Kellner: Sehr gern. Das macht zusammen 9 Euro 50.`,
          questions: [
            { q: "What does the woman order?", options: ["Tea and cake", "Coffee and cake", "Coffee and juice", "Tea and a roll"], answer: 1 },
            { q: "How does she want her coffee?", options: ["Black", "With sugar only", "With milk only", "With milk and sugar"], answer: 2 },
            { q: "What does the man order?", options: ["Coffee and cake", "Tea and a sandwich", "Orange juice and a roll", "Water and soup"], answer: 2 },
            { q: "How much does everything cost?", options: ["€8.50", "€9.00", "€9.50", "€10.50"], answer: 2 },
          ],
        },
        {
          id: "a1-h2",
          title: "Telefongespräch",
          scenario: "Listen to a phone conversation about an appointment.",
          transcript: `Rezeption: Arztpraxis Dr. Müller, guten Morgen!
Patientin: Guten Morgen. Ich möchte gern einen Termin machen.
Rezeption: Wann haben Sie Zeit? Morgen um 10 Uhr?
Patientin: Nein, Dienstag ist besser. Haben Sie am Dienstag etwas frei?
Rezeption: Ja, Dienstag um 14 Uhr geht das.
Patientin: Prima! Mein Name ist Schmidt, Maria Schmidt.
Rezeption: Alles klar, Frau Schmidt. Bis Dienstag!`,
          questions: [
            { q: "Where is this conversation taking place?", options: ["A pharmacy", "A hospital", "A doctor's practice", "A health insurance office"], answer: 2 },
            { q: "When does the patient want an appointment?", options: ["Tomorrow", "Monday", "Tuesday", "Wednesday"], answer: 2 },
            { q: "What time is the appointment?", options: ["10:00", "12:00", "14:00", "16:00"], answer: 2 },
            { q: "What is the patient's name?", options: ["Müller", "Schmidt Maria", "Maria Müller", "Dr. Schmidt"], answer: 1 },
          ],
        },
        {
          id: "a1-h3",
          title: "Am Bahnhof",
          scenario: "Listen to station announcements and answer the questions.",
          transcript: `Ansage 1: Achtung auf Gleis 3! Der ICE 578 nach München fährt um 14 Uhr 32 ab. Bitte einsteigen!

Ansage 2: Achtung Reisende! Der RE 45 nach Hamburg hat heute 20 Minuten Verspätung. Ankunft jetzt um 15 Uhr 15.

Ansage 3: Der Intercity nach Frankfurt am Gleis 7 fährt in 5 Minuten ab. Bitte alle einsteigen und die Türen frei halten.`,
          questions: [
            { q: "Where is the ICE 578 going?", options: ["Frankfurt", "Berlin", "Hamburg", "Munich"], answer: 3 },
            { q: "How late is the RE 45 to Hamburg?", options: ["5 minutes", "10 minutes", "20 minutes", "45 minutes"], answer: 2 },
            { q: "The Frankfurt train departs in:", options: ["2 minutes", "5 minutes", "10 minutes", "15 minutes"], answer: 1 },
            { q: "Which platform is the Frankfurt train on?", options: ["3", "5", "7", "9"], answer: 2 },
          ],
        },
      ],
    },
    schreiben: {
      title: "Schreiben", icon: "✏️",
      description: "Write short messages, forms, and simple sentences.",
      tasks: [
        {
          id: "a1-w1",
          title: "Formular ausfüllen",
          type: "form",
          instruction: "Fill in the registration form with the information given.",
          givenInfo: "Name: Julia Becker | Geburtsdatum: 15.03.1995 | Adresse: Hauptstraße 12, 10115 Berlin | Telefon: 030-456789 | E-Mail: julia.becker@email.de",
          fields: [
            { label: "Vorname", answer: "Julia" },
            { label: "Familienname", answer: "Becker" },
            { label: "Geburtsdatum", answer: "15.03.1995" },
            { label: "Straße und Hausnummer", answer: "Hauptstraße 12" },
            { label: "PLZ und Stadt", answer: "10115 Berlin" },
            { label: "Telefonnummer", answer: "030-456789" },
          ],
        },
        {
          id: "a1-w2",
          title: "Kurze Nachricht schreiben",
          type: "guided-writing",
          instruction: "Write a short message to your friend about why you cannot meet today.",
          points: ["Say you cannot come", "Give a reason (e.g. you are ill)", "Suggest another day"],
          modelAnswer: `Hallo Lisa!

Leider kann ich heute nicht kommen. Ich bin krank und habe Fieber.

Können wir uns am Samstag treffen?

Bis bald,
Max`,
          keyPhrases: ["Leider kann ich nicht...", "Ich bin krank.", "Können wir...?"],
        },
        {
          id: "a1-w3",
          title: "Sich vorstellen",
          type: "guided-writing",
          instruction: "Write a short self-introduction (4–6 sentences) for a language class.",
          points: ["Name", "Age", "Where you come from", "What languages you speak", "Why you learn German"],
          modelAnswer: `Hallo! Ich heiße Carlos. Ich bin 28 Jahre alt und komme aus Spanien. Ich wohne jetzt in Hamburg. Ich spreche Spanisch und ein bisschen Englisch. Ich lerne Deutsch, weil ich in Deutschland arbeite.`,
          keyPhrases: ["Ich heiße...", "Ich komme aus...", "Ich wohne in...", "Ich spreche...", "Ich lerne Deutsch, weil..."],
        },
      ],
    },
    lesen: {
      title: "Lesen", icon: "📖",
      description: "Read short texts — signs, notices, adverts — and answer questions.",
      tasks: [
        {
          id: "a1-r1",
          title: "Anzeigen lesen",
          instruction: "Read the notices and decide: richtig (true) oder falsch (false)?",
          texts: [
            { id: "A", text: "SUPERMARKT REWE\nMontag–Samstag: 7:00–22:00 Uhr\nSonntag: GESCHLOSSEN\nSonderangebot: Äpfel 1 kg = 0,99 €" },
            { id: "B", text: "SPRACHKURS DEUTSCH\nBeginn: 5. September\nZeit: Dienstags und Donnerstags, 18:00–20:00 Uhr\nKosten: 150 € pro Monat\nAnmeldung: info@deutschkurs.de" },
            { id: "C", text: "ZU VERMIETEN\n2-Zimmer-Wohnung, 55 m²\nMiete: 750 € + Nebenkosten\nAb sofort frei\nTel: 0176-234567" },
          ],
          questions: [
            { text_id: "A", q: "Der Supermarkt ist am Sonntag geöffnet.", answer: false },
            { text_id: "A", q: "Äpfel kosten weniger als 1 Euro pro Kilo.", answer: true },
            { text_id: "B", q: "Der Deutschkurs findet dreimal pro Woche statt.", answer: false },
            { text_id: "B", q: "Man kann sich per E-Mail anmelden.", answer: true },
            { text_id: "C", q: "Die Wohnung hat zwei Zimmer.", answer: true },
            { text_id: "C", q: "Die Wohnung ist noch nicht frei.", answer: false },
          ],
        },
        {
          id: "a1-r2",
          title: "Eine E-Mail lesen",
          instruction: "Read the email and answer the questions.",
          text: `Von: anna.schulz@email.de
An: peter.maier@email.de
Betreff: Party am Samstag!

Hallo Peter!

Ich mache am Samstag eine Party. Sie beginnt um 19 Uhr. Meine Adresse ist Rosenstraße 7, 2. Etage.

Bitte bring etwas zu trinken mit! Ich mache Essen.

Kommst du? Bitte schreib mir bis Freitag!

Liebe Grüße,
Anna`,
          questions: [
            { q: "When is Anna's party?", options: ["Friday", "Saturday", "Sunday", "Next week"], answer: 1 },
            { q: "What time does the party start?", options: ["17:00", "18:00", "19:00", "20:00"], answer: 2 },
            { q: "What should Peter bring?", options: ["Food", "Something to drink", "Music", "A gift"], answer: 1 },
            { q: "By when should Peter reply?", options: ["Tuesday", "Wednesday", "Thursday", "Friday"], answer: 3 },
          ],
        },
      ],
    },
    sprechen: {
      title: "Sprechen", icon: "🗣️",
      description: "Practice speaking tasks — introducing yourself and simple interactions.",
      tasks: [
        {
          id: "a1-s1",
          title: "Sich vorstellen",
          type: "monologue",
          instruction: "Introduce yourself. Speak for 1–2 minutes.",
          prompts: ["Your name", "Your age", "Your country / city", "Your job or studies", "Why you learn German", "Your hobbies"],
          usefulPhrases: [
            "Ich heiße ...",
            "Ich bin ... Jahre alt.",
            "Ich komme aus ...",
            "Ich wohne in ...",
            "Ich arbeite als ... / Ich studiere ...",
            "Ich lerne Deutsch, weil ...",
            "Mein Hobby ist ...",
          ],
          tip: "Speak slowly and clearly. Don't worry about mistakes — complete sentences matter more.",
        },
        {
          id: "a1-s2",
          title: "Im Restaurant bestellen",
          type: "roleplay",
          instruction: "You are in a restaurant. Your teacher/partner plays the waiter. Use the menu to order.",
          role: "Customer",
          partnerRole: "Waiter",
          menu: ["Suppe: 4,50 €", "Schnitzel mit Pommes: 12,00 €", "Pasta: 9,50 €", "Kaffee: 2,80 €", "Mineralwasser: 2,20 €", "Apfelsaft: 3,00 €"],
          usefulPhrases: [
            "Ich möchte ... bestellen.",
            "Was empfehlen Sie?",
            "Ich nehme ...",
            "Zahlen, bitte.",
            "Das macht ... Euro.",
            "Kann ich mit Karte zahlen?",
          ],
          tip: "Use 'Ich möchte' for polite ordering. Never use 'Ich will' in a restaurant.",
        },
      ],
    },
  },

  B1: {
    hoeren: {
      title: "Hören", icon: "🎧",
      description: "Goethe B1 exam: 4 tasks — short messages, radio programme, conversations, announcements.",
      tasks: [
        {
          id: "b1-h1",
          title: "Teil 1 — Kurze Gespräche (5 Aufgaben)",
          scenario: "You hear five short conversations. Match each to the correct picture/statement. In this exercise, read and answer based on the transcript.",
          transcript: `Gespräch 1:
A: Schau mal, der Zug hat schon wieder Verspätung.
B: Wie lange diesmal?
A: 25 Minuten laut Anzeigetafel.
B: Ich ruf mal schnell beim Kunden an.

Gespräch 2:
A: Können Sie mir helfen? Ich suche das Rathaus.
B: Ja, gehen Sie diese Straße geradeaus, dann links an der Ampel, und dann sehen Sie es schon.
A: Ist es weit?
B: Nein, etwa 10 Minuten zu Fuß.

Gespräch 3:
A: Ich brauche ein Rezept für Ibuprofen.
B: Ja, ich schaue kurz. Haben Sie zurzeit Schmerzen?
A: Ja, starke Rückenschmerzen seit drei Tagen.
B: Dann mache ich Ihnen das Rezept und empfehle Ihnen auch Physiotherapie.`,
          questions: [
            { q: "Gespräch 1: Why is the man calling the customer?", options: ["To cancel the meeting", "Because the train is delayed", "Because he is sick", "To change the location"], answer: 1 },
            { q: "Gespräch 2: How far is the town hall?", options: ["5 minutes", "10 minutes", "15 minutes", "20 minutes"], answer: 1 },
            { q: "Gespräch 2: Which direction first?", options: ["Left then straight", "Straight then left", "Right then straight", "Straight then right"], answer: 1 },
            { q: "Gespräch 3: What has the patient had for 3 days?", options: ["Headaches", "Fever", "Back pain", "Stomach ache"], answer: 2 },
            { q: "Gespräch 3: What does the doctor also recommend?", options: ["Surgery", "Rest", "Physiotherapy", "A different medication"], answer: 2 },
          ],
        },
        {
          id: "b1-h2",
          title: "Teil 2 — Radiobericht",
          scenario: "A radio report about a current topic. Listen and decide: richtig, falsch, or nicht im Text.",
          transcript: `Moderatorin: Guten Morgen. Heute sprechen wir über das Thema Homeoffice in Deutschland. Seit der Pandemie arbeiten immer mehr Menschen von zu Hause. Eine aktuelle Studie zeigt: 42 Prozent der deutschen Arbeitnehmer arbeiten mindestens teilweise im Homeoffice.

Vorteile sind klar: weniger Pendelzeit, flexiblere Arbeitszeiten und oft höhere Produktivität. Kritisch sehen viele Experten jedoch die fehlende Trennung zwischen Arbeit und Privatleben. Außerdem klagen manche Arbeitnehmer über soziale Isolation.

Interessant: Jüngere Arbeitnehmer zwischen 25 und 35 Jahren schätzen Homeoffice besonders. Ältere Arbeitnehmer über 55 bevorzugen dagegen das Büro. Viele Unternehmen setzen jetzt auf hybride Modelle — teilweise Büro, teilweise zu Hause.`,
          questions: [
            { q: "Mehr als 40% der deutschen Arbeitnehmer arbeiten im Homeoffice.", answer: "richtig", options: ["richtig", "falsch", "nicht im Text"] },
            { q: "Im Homeoffice arbeiten die Leute weniger produktiv.", answer: "falsch", options: ["richtig", "falsch", "nicht im Text"] },
            { q: "Manche Menschen fühlen sich im Homeoffice einsam.", answer: "richtig", options: ["richtig", "falsch", "nicht im Text"] },
            { q: "Die Studie wurde von einer Universität durchgeführt.", answer: "nicht im Text", options: ["richtig", "falsch", "nicht im Text"] },
            { q: "Ältere Arbeitnehmer arbeiten lieber im Büro.", answer: "richtig", options: ["richtig", "falsch", "nicht im Text"] },
          ],
        },
      ],
    },
    schreiben: {
      title: "Schreiben", icon: "✏️",
      description: "Goethe B1 exam: two tasks — a message/email and an opinion text.",
      tasks: [
        {
          id: "b1-w1",
          title: "Teil 1 — E-Mail schreiben",
          type: "guided-writing",
          instruction: "You received this email from your German language school. Write a reply of 80–100 words.",
          inputText: `Betreff: Neue Kurszeiten

Sehr geehrte Kursteilnehmer,

ab nächstem Monat ändern sich die Kurszeiten. Der Kurs findet jetzt dienstags und donnerstags von 18:00–20:00 Uhr statt (bisher: montags und mittwochs).

Bitte teilen Sie uns mit, ob die neuen Zeiten für Sie passen.

Mit freundlichen Grüßen,
Das Kursteam`,
          points: [
            "Respond to the time change — do the new times suit you or not?",
            "Give a reason",
            "Make a suggestion or ask a question",
            "Use appropriate formal greeting and closing",
          ],
          modelAnswer: `Sehr geehrtes Kursteam,

vielen Dank für Ihre Nachricht. Leider passen mir die neuen Kurszeiten nicht, weil ich dienstags bis 20 Uhr arbeite.

Wäre es möglich, den Kurs auch am Wochenende anzubieten? Samstags hätte ich Zeit.

Ich hoffe, wir finden eine Lösung.

Mit freundlichen Grüßen,
[Name]`,
          keyPhrases: ["Vielen Dank für...", "Leider passen mir... nicht, weil...", "Wäre es möglich...?", "Mit freundlichen Grüßen"],
          checklist: ["Formal greeting (Sehr geehrte...)", "Response to content", "Reason given", "Suggestion/question", "Formal closing"],
        },
        {
          id: "b1-w2",
          title: "Teil 2 — Meinungstext schreiben",
          type: "opinion-writing",
          instruction: "Write an opinion text of 80–100 words on the following topic.",
          topic: "Sollen Handys in der Schule verboten werden?",
          structure: [
            "Einleitung: Introduce the topic (1–2 sentences)",
            "These/Meinung: Your opinion (clearly stated)",
            "Argument 1: First reason with example",
            "Argument 2: Second reason or counter-argument",
            "Schluss: Conclusion / summary",
          ],
          modelAnswer: `Heutzutage benutzen viele Schüler das Handy im Unterricht. Das führt oft zu Ablenkung und schlechteren Leistungen.

Meiner Meinung nach sollten Handys in der Schule verboten werden. Erstens können sich Schüler besser konzentrieren, wenn keine Handys erlaubt sind. Zweitens lernen sie, ohne ständige Ablenkung zu arbeiten.

Natürlich können Handys auch nützlich sein, zum Beispiel für Recherchen. Aber dafür gibt es Schulcomputer.

Ich bin also für ein Handyverbot an Schulen.`,
          usefulConnectors: ["Meiner Meinung nach...", "Erstens... Zweitens...", "Außerdem...", "Jedoch / Allerdings...", "Ich bin der Ansicht, dass...", "Zusammenfassend..."],
        },
      ],
    },
    lesen: {
      title: "Lesen", icon: "📖",
      description: "Goethe B1 exam: 5 reading tasks — ads, articles, correspondence, instructions.",
      tasks: [
        {
          id: "b1-r1",
          title: "Teil 2 — Zeitungsartikel",
          instruction: "Read the article and answer: richtig, falsch, or nicht im Text.",
          text: `Homeoffice — Fluch oder Segen?

Millionen Deutsche arbeiten seit einigen Jahren regelmäßig im Homeoffice. Die Vorteile liegen auf der Hand: Man spart Pendelzeit, kann flexibler arbeiten und hat oft weniger Stress. Studien zeigen, dass viele Arbeitnehmer im Homeoffice sogar produktiver sind als im Büro.

Allerdings hat die Arbeit von zu Hause auch Nachteile. Viele Arbeitnehmer berichten, dass die Grenze zwischen Arbeit und Freizeit verschwimmt. Man arbeitet oft länger, als man sollte. Außerdem fehlt der soziale Kontakt mit Kollegen, was langfristig zur Isolation führen kann.

Experten empfehlen deshalb ein hybrides Modell: zwei bis drei Tage im Büro, der Rest zu Hause. So behält man die Vorteile beider Welten.`,
          questions: [
            { q: "Im Homeoffice sind Arbeitnehmer oft produktiver.", answer: "richtig", options: ["richtig", "falsch", "nicht im Text"] },
            { q: "Homeoffice führt immer zu weniger Stress.", answer: "nicht im Text", options: ["richtig", "falsch", "nicht im Text"] },
            { q: "Viele Arbeitnehmer arbeiten zu Hause länger als geplant.", answer: "richtig", options: ["richtig", "falsch", "nicht im Text"] },
            { q: "Alle Experten sind gegen das Homeoffice.", answer: "falsch", options: ["richtig", "falsch", "nicht im Text"] },
            { q: "Das hybride Modell bedeutet: manchmal Büro, manchmal zu Hause.", answer: "richtig", options: ["richtig", "falsch", "nicht im Text"] },
          ],
        },
        {
          id: "b1-r2",
          title: "Teil 4 — Korrespondenz",
          instruction: "Read the letter and choose the best answer.",
          text: `Sehr geehrte Damen und Herren,

hiermit bewerbe ich mich auf die ausgeschriebene Stelle als Bürokauffrau in Ihrer Firma. Ich habe eine abgeschlossene Ausbildung als Bürokauffrau und drei Jahre Berufserfahrung in einem mittelständischen Unternehmen.

Meine Stärken sind meine Zuverlässigkeit, meine Teamfähigkeit und meine guten Kenntnisse in den gängigen Office-Programmen. Ich spreche Deutsch als Muttersprache und habe gute Englischkenntnisse.

Ich freue mich auf ein persönliches Gespräch und stehe ab sofort zur Verfügung.

Mit freundlichen Grüßen,
Ayşe Demir`,
          questions: [
            { q: "What is this letter?", options: ["A complaint", "A job application", "A resignation letter", "An enquiry"], answer: 1 },
            { q: "How many years of experience does she have?", options: ["1 year", "2 years", "3 years", "5 years"], answer: 2 },
            { q: "What is one of her strengths?", options: ["She speaks English natively", "She has a degree", "She is reliable", "She can start in 3 months"], answer: 2 },
            { q: "When can she start?", options: ["Next month", "After an interview", "Immediately", "In 6 months"], answer: 2 },
          ],
        },
      ],
    },
    sprechen: {
      title: "Sprechen", icon: "🗣️",
      description: "Goethe B1 exam: 3 parts — picture description, planning a task, giving an opinion.",
      tasks: [
        {
          id: "b1-s1",
          title: "Teil 1 — Bild beschreiben",
          type: "picture-description",
          instruction: "Describe the picture and say what you think about it. Speak for 1–2 minutes.",
          imageDescription: "[Picture of a busy city street with people on bicycles, trams, and cars. Some people are walking. Signs visible for a pharmacy and a supermarket.]",
          structure: ["Was sehen Sie? (What do you see?)", "Was passiert gerade? (What is happening?)", "Wie finden Sie das? (What do you think about it?)"],
          usefulPhrases: [
            "Auf dem Bild sehe ich ...",
            "Im Vordergrund / Hintergrund ist ...",
            "Die Person links/rechts ...",
            "Es scheint, dass ...",
            "Ich finde das interessant, weil ...",
            "Das erinnert mich an ...",
          ],
          tip: "Describe systematically: foreground → background → your opinion.",
        },
        {
          id: "b1-s2",
          title: "Teil 2 — Planung",
          type: "planning",
          instruction: "You and your partner need to plan a farewell party for a colleague. Discuss and agree.",
          task: "Planen Sie eine Abschiedsfeier für Ihren Kollegen Thomas, der nächsten Monat die Firma verlässt.",
          points: ["Wann und wo? (When and where?)", "Wie viele Personen? (How many people?)", "Was essen und trinken? (Food and drinks?)", "Musik / Aktivitäten?", "Wer organisiert was?"],
          usefulPhrases: [
            "Ich schlage vor, dass wir ...",
            "Was hältst du von ...?",
            "Wäre es möglich ...?",
            "Ich finde, dass ... besser wäre.",
            "Einverstanden! / Das ist eine gute Idee.",
            "Ich bin dagegen, weil ...",
          ],
          tip: "Make suggestions, agree, disagree politely, and reach a conclusion together.",
        },
        {
          id: "b1-s3",
          title: "Teil 3 — Meinung äußern",
          type: "opinion",
          instruction: "Give your opinion on the following statement. Speak for 1–2 minutes.",
          statement: "\"Heutzutage ist das Internet wichtiger als Bücher.\"",
          structure: ["Einleitung: Introduce the topic", "These: Your position", "Argumente: 2–3 reasons", "Gegenargument: Acknowledge the other side", "Schluss: Conclusion"],
          usefulPhrases: [
            "Ich bin der Meinung, dass ...",
            "Einerseits ..., andererseits ...",
            "Ein wichtiger Vorteil ist ...",
            "Man darf aber nicht vergessen, dass ...",
            "Zusammenfassend kann ich sagen ...",
            "Das stimmt, aber ...",
          ],
          tip: "Don't just agree or disagree — show nuance by mentioning the other side.",
        },
      ],
    },
  },
};

// Add simplified structures for A2, B2, C1
PRACTICE_SKILLS_BY_LEVEL.A2 = {
  hoeren: {
    title: "Hören", icon: "🎧",
    description: "Short conversations about everyday topics — work, shopping, appointments.",
    tasks: [
      {
        id: "a2-h1", title: "Im Supermarkt",
        scenario: "A conversation at the supermarket checkout.",
        transcript: `Kassiererin: Haben Sie eine Kundenkarte?
Kundin: Nein, leider nicht. Kann ich eine bekommen?
Kassiererin: Natürlich! Füllen Sie bitte dieses Formular aus. Sie bekommen dann 5% Rabatt auf alles.
Kundin: Super! Und wie lange ist die Karte gültig?
Kassiererin: Zwei Jahre. Danach schicken wir Ihnen automatisch eine neue.
Kundin: Perfekt. Kann ich mit Karte zahlen?
Kassiererin: Ja, natürlich. Das macht 23 Euro 40.`,
        questions: [
          { q: "Does the customer have a loyalty card?", options: ["Yes", "No", "She lost it", "It's expired"], answer: 1 },
          { q: "What discount does the loyalty card give?", options: ["3%", "5%", "10%", "15%"], answer: 1 },
          { q: "How long is the card valid?", options: ["1 year", "2 years", "3 years", "5 years"], answer: 1 },
          { q: "How much does she pay?", options: ["€20.30", "€23.40", "€24.30", "€32.40"], answer: 1 },
        ],
      },
    ],
  },
  schreiben: {
    title: "Schreiben", icon: "✏️",
    description: "Write short messages, notes and simple emails about everyday situations.",
    tasks: [
      {
        id: "a2-w1", title: "E-Mail an Vermieter",
        type: "guided-writing",
        instruction: "Write an email to your landlord about a problem in your apartment. (60–80 words)",
        points: ["Greeting", "Describe the problem (e.g. heating broken, leaking tap)", "Ask them to fix it", "Give your availability", "Closing"],
        modelAnswer: `Sehr geehrter Herr Bauer,

ich schreibe Ihnen, weil die Heizung in meiner Wohnung seit drei Tagen nicht funktioniert. Es ist sehr kalt.

Könnten Sie bitte einen Handwerker schicken? Ich bin werktags ab 17 Uhr zu Hause, am Wochenende auch tagsüber.

Mit freundlichen Grüßen,
[Name]`,
        keyPhrases: ["Ich schreibe Ihnen, weil...", "Seit ... Tagen...", "Könnten Sie bitte...?", "Ich bin ... zu Hause."],
      },
    ],
  },
  lesen: {
    title: "Lesen", icon: "📖",
    description: "Read notices, short articles and correspondence about everyday topics.",
    tasks: [
      {
        id: "a2-r1", title: "Anzeigen & Mitteilungen",
        instruction: "Read the text and choose the correct answer.",
        text: `STADTBIBLIOTHEK HAMBURG — NEUE ÖFFNUNGSZEITEN

Ab dem 1. Oktober gelten neue Öffnungszeiten:
Montag–Freitag: 10:00–20:00 Uhr
Samstag: 10:00–18:00 Uhr
Sonntag: GESCHLOSSEN

Neu: Online-Ausleihe! Ebooks und Hörbücher können Sie jetzt rund um die Uhr herunterladen.
Benutzerausweis erforderlich.

Informationen: www.buecherei-hamburg.de oder Tel. 040-12345`,
        questions: [
          { q: "Until what time is the library open on weekdays?", options: ["18:00", "19:00", "20:00", "21:00"], answer: 2 },
          { q: "Is the library open on Sundays?", options: ["Yes, until 18:00", "Yes, until 10:00", "No", "Only for online services"], answer: 2 },
          { q: "What is new at the library?", options: ["Free printing", "Online borrowing of ebooks", "A café", "Children's events"], answer: 1 },
          { q: "What do you need for online borrowing?", options: ["An email address", "A library card", "A credit card", "A phone number"], answer: 1 },
        ],
      },
    ],
  },
  sprechen: {
    title: "Sprechen", icon: "🗣️",
    description: "Describe pictures and discuss everyday situations with a partner.",
    tasks: [
      {
        id: "a2-s1", title: "Bild beschreiben",
        type: "picture-description",
        instruction: "Describe the picture. What do you see? What is happening?",
        imageDescription: "[Picture of a family having dinner together at a table. There are several dishes on the table. The family is talking and smiling.]",
        usefulPhrases: [
          "Auf dem Bild sieht man...",
          "Es gibt... Personen.",
          "Sie sitzen / essen / sprechen...",
          "Im Hintergrund sehe ich...",
          "Die Familie scheint... zu sein.",
        ],
        tip: "Say what you see, what is happening, and what you think about it.",
      },
    ],
  },
};

PRACTICE_SKILLS_BY_LEVEL.B2 = {
  hoeren: {
    title: "Hören", icon: "🎧",
    description: "Complex dialogues, radio discussions and lectures on abstract topics.",
    tasks: [
      {
        id: "b2-h1", title: "Radiosendung — Diskussion",
        scenario: "A radio discussion about social media and mental health.",
        transcript: `Moderator: Willkommen bei 'Gesellschaft heute'. Unser Thema: Soziale Medien und psychische Gesundheit. Frau Dr. Weber, was sagen Ihre Studien?

Dr. Weber: Die Ergebnisse sind eindeutig: übermäßige Nutzung sozialer Medien, besonders bei Jugendlichen, korreliert mit erhöhten Depressions- und Angstraten. Vergleiche mit anderen führen zu Unzufriedenheit.

Moderator: Herr König, Sie sind anderer Meinung?

Herr König: Ich würde differenzieren. Soziale Medien ermöglichen auch positive Verbindungen, besonders für isolierte Menschen. Das Problem liegt in der unkritischen Nutzung, nicht in den Medien selbst.

Moderator: Welche Lösung schlagen Sie vor?

Dr. Weber: Medienkompetenz muss in den Schulen gelehrt werden. Außerdem sollten Plattformen transparenter über Algorithmen sein.`,
        questions: [
          { q: "What is the main topic of the discussion?", options: ["Internet addiction", "Social media and mental health", "Screen time for children", "Online safety"], answer: 1 },
          { q: "According to Dr. Weber, what leads to dissatisfaction?", options: ["Too much content", "Comparing oneself to others", "Advertising", "Fake news"], answer: 1 },
          { q: "Mr König thinks the problem is:", options: ["Social media itself", "Young people", "Uncritical use of media", "Algorithm design"], answer: 2 },
          { q: "What solution does Dr. Weber propose?", options: ["Banning social media", "Teaching media literacy in schools", "Age restrictions", "Parental controls"], answer: 1 },
        ],
      },
    ],
  },
  schreiben: {
    title: "Schreiben", icon: "✏️",
    description: "Write formal correspondence, reports and structured argumentative texts.",
    tasks: [
      {
        id: "b2-w1", title: "Erörterung schreiben",
        type: "essay",
        instruction: "Write an argumentative essay of 200–250 words on the following topic.",
        topic: "Sollte das Autofahren in Innenstädten verboten werden?",
        structure: ["Einleitung: Hook + Thesis", "Hauptteil 1: Arguments in favour", "Hauptteil 2: Counter-arguments", "Abwägung: Weighing up", "Schluss: Your position + outlook"],
        modelAnswer: `In vielen Großstädten weltweit wird diskutiert, ob Autos aus Innenstädten verbannt werden sollen. Dies ist ein kontroverses Thema, das verschiedene Interessen berührt.

Einerseits gibt es gewichtige Argumente für ein Fahrverbot. Autos sind die Hauptquelle von Luftverschmutzung und Lärm in städtischen Gebieten. Ein Verbot würde die Lebensqualität der Bewohner erheblich verbessern und den öffentlichen Nahverkehr stärken. Zudem würden mehr Flächen für Fußgänger und Radfahrer entstehen.

Andererseits sind Autos für viele Menschen unentbehrlich, besonders für Pendler aus dem Umland oder Menschen mit eingeschränkter Mobilität. Ein pauschales Verbot könnte wirtschaftliche Schäden verursachen, da Kunden und Lieferanten den Zugang verlieren.

Meiner Meinung nach ist ein absolutes Verbot nicht die Lösung. Sinnvoller wäre ein hybrides Modell: strengere Fahrverbote für Dieselfahrzeuge, Förderung von Elektromobilität und massive Investitionen in den ÖPNV. So ließen sich Umweltziele und individuelle Mobilität vereinbaren.`,
        usefulConnectors: ["Einerseits... andererseits...", "Hinzu kommt, dass...", "Dennoch / Trotzdem...", "Meiner Meinung nach...", "Zusammenfassend lässt sich sagen..."],
      },
    ],
  },
  lesen: {
    title: "Lesen", icon: "📖",
    description: "Read complex texts — articles, essays, reports — on abstract and specialised topics.",
    tasks: [
      {
        id: "b2-r1", title: "Wissenschaftlicher Artikel",
        instruction: "Read the text and answer the questions.",
        text: `Künstliche Intelligenz im Gesundheitswesen: Chancen und Risiken

Die Integration künstlicher Intelligenz in die Medizin schreitet rasant voran. KI-Systeme sind mittlerweile in der Lage, bestimmte Krebsarten auf Röntgenbildern mit höherer Präzision zu erkennen als erfahrene Radiologen. Dies verspricht eine Revolution in der Frühdiagnose.

Allerdings werfen diese Entwicklungen grundlegende ethische Fragen auf. Wer trägt die Verantwortung, wenn ein KI-System eine falsche Diagnose stellt? Die rechtlichen Rahmenbedingungen hinken der technologischen Entwicklung weit hinterher.

Datenschutz stellt eine weitere Herausforderung dar. Um KI-Systeme zu trainieren, werden große Mengen an Patientendaten benötigt — ein Spannungsfeld zwischen medizinischem Fortschritt und dem Recht auf Privatheit.

Experten sind sich einig: KI wird menschliche Ärzte nicht ersetzen, sondern als Unterstützungswerkzeug dienen. Die Kunst liegt darin, die Stärken beider zu kombinieren.`,
        questions: [
          { q: "What can AI systems now do better than some radiologists?", options: ["Perform surgery", "Detect certain cancers on X-rays", "Write prescriptions", "Diagnose mental illness"], answer: 1 },
          { q: "What ethical question is raised?", options: ["Whether AI is too expensive", "Who is responsible for AI misdiagnosis", "Whether AI can replace all doctors", "How to train doctors with AI"], answer: 1 },
          { q: "What does the text say about data protection?", options: ["It is not a problem", "Patient data is fully anonymised", "There is tension between medical progress and privacy", "It is already solved legally"], answer: 2 },
          { q: "According to experts, AI will:", options: ["Replace all doctors eventually", "Work as a support tool alongside doctors", "Be used only in research", "Be banned from hospitals"], answer: 1 },
        ],
      },
    ],
  },
  sprechen: {
    title: "Sprechen", icon: "🗣️",
    description: "Present arguments, debate abstract topics, and discuss complex ideas fluently.",
    tasks: [
      {
        id: "b2-s1", title: "Diskussion — Für und Wider",
        type: "debate",
        instruction: "Discuss the following statement. Give your opinion with arguments.",
        statement: "\"Soziale Medien tun der Gesellschaft mehr Schaden als Nutzen.\"",
        structure: ["Position klar machen", "2–3 Argumente mit Beispielen", "Gegenargumente einräumen und entkräften", "Schlussfolgerung"],
        usefulPhrases: [
          "Ich bin der Ansicht, dass...",
          "Man könnte einwenden, dass...",
          "Dem möchte ich entgegenhalten, dass...",
          "Es ist nicht zu leugnen, dass...",
          "Abschließend möchte ich sagen...",
          "Das lässt sich damit erklären, dass...",
        ],
        tip: "At B2, show nuance — don't just agree or disagree, acknowledge the other perspective.",
      },
    ],
  },
};

PRACTICE_SKILLS_BY_LEVEL.C1 = {
  hoeren: {
    title: "Hören", icon: "🎧",
    description: "Understand complex, extended speech including lectures, debates and implicit meaning.",
    tasks: [
      {
        id: "c1-h1", title: "Akademischer Vortrag",
        scenario: "An excerpt from an academic lecture on urban sociology.",
        transcript: `...und wenn wir die Gentrifizierung als stadtsoziologisches Phänomen betrachten, stoßen wir unweigerlich auf das Paradox des urbanen Wandels: Eben jene Kreativschaffenden, die ein Viertel durch ihre Präsenz aufwerten, werden durch die daraus resultierenden Mietpreissteigerungen früher oder später verdrängt. Dies bezeichnet Neil Smith als 'rent gap theory'.

Was uns dabei besonders beschäftigen sollte, ist die Frage nach politischen Handlungsspielräumen. Rein marktbasierte Lösungsansätze haben sich als unzureichend erwiesen. Städte wie Wien oder Singapur zeigen, dass staatliche Interventionen — Mietpreisbremsen, Sozialwohnungsbau — durchaus wirksam sein können, wenn sie frühzeitig und konsequent eingesetzt werden.

Die Frage ist also nicht ob, sondern wie wir intervenieren...`,
        questions: [
          { q: "What paradox of urban change does the speaker describe?", options: ["Cities grow too fast", "Creative workers who improve an area are eventually priced out", "Rents fall when artists move in", "Government intervention always fails"], answer: 1 },
          { q: "Whose theory is mentioned?", options: ["Max Weber", "Neil Smith", "Georg Simmel", "Jürgen Habermas"], answer: 1 },
          { q: "Which cities are cited as positive examples?", options: ["Berlin and Paris", "London and New York", "Vienna and Singapore", "Amsterdam and Zurich"], answer: 2 },
          { q: "What is the speaker's conclusion?", options: ["Do nothing", "Intervention is necessary — the question is how", "Markets should decide", "Gentrification is always positive"], answer: 1 },
        ],
      },
    ],
  },
  schreiben: {
    title: "Schreiben", icon: "✏️",
    description: "Write well-structured, nuanced essays and reports with sophisticated language.",
    tasks: [
      {
        id: "c1-w1", title: "Akademischer Essay",
        type: "essay",
        instruction: "Write a well-argued essay of 300–350 words.",
        topic: "Inwieweit verändert künstliche Intelligenz die Arbeitswelt, und welche gesellschaftlichen Konsequenzen sind zu erwarten?",
        structure: ["These aufstellen", "Differenzierte Analyse", "Gegenargumente einbeziehen", "Eigene Position begründen", "Ausblick"],
        keyLanguage: [
          "Es lässt sich argumentieren, dass...",
          "Differenziert betrachtet...",
          "Nichtsdestotrotz...",
          "Im Hinblick auf... zeigt sich, dass...",
          "Es bleibt abzuwarten, ob...",
          "Zusammenfassend lässt sich festhalten...",
        ],
      },
    ],
  },
  lesen: {
    title: "Lesen", icon: "📖",
    description: "Understand complex texts with implicit meaning, irony and sophisticated argumentation.",
    tasks: [
      {
        id: "c1-r1", title: "Feuilleton-Text",
        instruction: "Read the text and answer the questions, including questions about the author's tone and implicit meaning.",
        text: `Die Tyrannei der Effizienz

Man muss kein Kulturpessimist sein, um festzustellen, dass die Optimierungslogik unserer Zeit zunehmend in Lebensbereiche vordringt, die ihr eigentlich verschlossen sein sollten. Wenn selbst Freundschaften anhand ihrer 'Nützlichkeit' bewertet werden und Muße als 'unproduktive Zeit' gilt, dann offenbart das eine tiefe Verwirrung über das, was ein gutes Leben ausmacht.

Die Ironie ist kaum zu übersehen: Wir sind produktiver als je zuvor — und unzufriedener. Burnout-Raten steigen, während die Freizeit sinkt. Man könnte einwenden, das sei ein individuelles Versagen. Doch es wäre naiv, strukturelle Probleme durch individuelle Lösungen — mehr Achtsamkeit, besseres Zeitmanagement — beheben zu wollen.

Was wir brauchen, ist eine öffentliche Debatte über den Zweck von Arbeit und Zeit. Nicht als nostalgische Rückbesinnung, sondern als nüchterne Analyse dessen, was wir optimieren wollen — und was eben nicht.`,
        questions: [
          { q: "What does the author mean by 'Tyrannei der Effizienz'?", options: ["Dictatorship of employers", "The logic of optimisation invading all areas of life", "Technology making us lazy", "Economic inequality"], answer: 1 },
          { q: "What irony does the author point out?", options: ["People work less but earn more", "We are more productive than ever but less satisfied", "Technology saves time but creates more work", "Efficiency increases poverty"], answer: 1 },
          { q: "What does the author mean by 'individuelles Versagen'?", options: ["Personal moral failure", "Blaming individuals for structural problems", "Individual success", "Leadership failure"], answer: 1 },
          { q: "The author's tone can best be described as:", options: ["Nostalgic and sentimental", "Angry and polemical", "Critical but measured", "Optimistic and encouraging"], answer: 2 },
        ],
      },
    ],
  },
  sprechen: {
    title: "Sprechen", icon: "🗣️",
    description: "Discuss complex abstract topics fluently, with nuance and sophisticated language.",
    tasks: [
      {
        id: "c1-s1", title: "Komplexes Thema diskutieren",
        type: "discussion",
        instruction: "Discuss the following question in depth. Aim to speak for 3–5 minutes.",
        statement: "\"Ist die Demokratie in ihrer jetzigen Form noch in der Lage, die Herausforderungen des 21. Jahrhunderts zu bewältigen?\"",
        structure: ["Thema einführen und eingrenzen", "Analyse: Stärken der Demokratie", "Kritische Bestandsaufnahme: Schwächen / Herausforderungen", "Reformvorschläge oder alternative Perspektiven", "Differenziertes Fazit"],
        usefulPhrases: [
          "Diese Frage berührt den Kern des...",
          "Man muss dabei differenzieren zwischen...",
          "Historisch betrachtet...",
          "Es wäre zu kurz gegriffen zu sagen...",
          "Eine differenzierte Betrachtung zeigt...",
          "Inwieweit... bleibt offen, aber...",
        ],
        tip: "At C1, avoid simplistic answers. Show that you can hold complexity — acknowledge contradictions and nuance.",
      },
    ],
  },
};