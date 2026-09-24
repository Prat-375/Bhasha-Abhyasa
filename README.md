# 🌿 Bhasha Abhyāsa — German Learning Platform

> A gamified, RPG-style German language learning platform with multi-language support, AI-powered sentence checking, and immersive vocabulary flashcards.

![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Node.js%20%7C%20MongoDB-blueviolet)
![Deployment](https://img.shields.io/badge/Frontend-Vercel-black)
![Deployment](https://img.shields.io/badge/Backend-Render-46E3B7)
![AI](https://img.shields.io/badge/AI-Google%20Gemini-4285F4)

---

## 🎮 Overview

**Bhasha Abhyāsa** (Sanskrit for *Language Practice*) is a full-stack German language learning application built with an RPG game aesthetic. Users progress through CEFR levels (A1 to C1), complete vocabulary and grammar quests, and receive AI-powered feedback on their German writing — all in their native language.

### ✨ Key Highlights

- 🗺️ **RPG Quest UI** — Level select, rank progression (Novice → Grand Master), XP bars and quest cards
- 📚 **Stacked Flashcards** — Physical index card style with flip animations, vibrant colors, and swipe-away mechanics
- 🌍 **11-Language Support** — English, Russian, Ukrainian, Hindi, Odia, Bengali, Telugu, Tamil, Sanskrit, Spanish, French
- 🤖 **AI Sentence Checker** — Gemini-powered German writing feedback with grammar and word order analysis
- 🔒 **Sequential Unlocking** — Each lesson/topic unlocks only after completing the previous one
- 📊 **Progress Tracking** — Per-level dashboards with vocabulary and grammar completion metrics
- 🏫 **Blackboard Grammar UI** — Grammar rules displayed on animated chalkboard sliders

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 + Vite | UI framework and build tool |
| React Router v7 | Client-side routing |
| CSS Custom Properties | Design system and theming |
| Context API | Global translation and auth state |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js + Express | REST API server (ES Modules) |
| MongoDB + Mongoose | Database and ODM |
| JWT | Authentication |
| Nodemailer + Gmail | OTP email verification |
| Google Gemini API | AI translation + sentence checking |

### Infrastructure
| Service | Purpose |
|---------|---------|
| Vercel | Frontend deployment |
| Render | Backend deployment |
| MongoDB Atlas | Cloud database |

---

## 🗂️ Project Structure

```
bhasha_abhyasa/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── HomePage.jsx          # Level select with animated cards
│   │   │   ├── ModePage.jsx          # RPG quest selection per level
│   │   │   ├── LearnPage.jsx         # Vocabulary flashcards + grammar lessons
│   │   │   ├── PracticePage.jsx      # Quizzes, drills and AI writing
│   │   │   ├── ProgressPage.jsx      # User progress dashboard
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   ├── ForgotPasswordPage.jsx
│   │   │   ├── VerifyOtpPage.jsx
│   │   │   └── ResetPasswordPage.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── UserDashboard.jsx
│   │   │   └── LanguagePickerModal.jsx
│   │   ├── context/
│   │   │   └── TranslationContext.jsx # Global language + translation state
│   │   ├── hooks/
│   │   │   └── useRouteBackground.js  # Dynamic background per route
│   │   ├── utils/
│   │   │   └── auth.js
│   │   ├── App.jsx
│   │   ├── index.css                  # Complete design system
│   │   └── routeBackgrounds.css
│   ├── .env
│   └── vercel.json
│
└── backend/
    └── src/
        ├── models/
        │   ├── User.js
        │   ├── Vocab.js
        │   ├── Grammar.js
        │   ├── LessonProgress.js
        │   ├── SentenceCheckUsage.js
        │   └── Translation.js
        ├── controllers/
        │   ├── authController.js
        │   ├── vocabController.js
        │   ├── grammarController.js
        │   ├── progressController.js
        │   ├── sentenceCheckController.js
        │   └── translationController.js
        ├── routes/
        │   ├── authRoutes.js
        │   ├── vocabRoutes.js
        │   ├── grammarRoutes.js
        │   ├── progressRoutes.js
        │   ├── sentenceCheckRoutes.js
        │   └── translationRoutes.js
        ├── middleware/
        │   └── auth.js
        └── index.js
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Google AI Studio API key (Gemini)
- Gmail account (for OTP emails)

### 1. Clone the repository

```bash
git clone https://github.com/Prat-375/Bhasha-Abhyasa.git
cd Bhasha-Abhyasa
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://your_connection_string
JWT_SECRET=your_jwt_secret_key

# Client URLs
CLIENT_URL=http://localhost:5173
PRODUCTION_CLIENT_URL=https://bhasha-abhyasa.vercel.app

# Email (Gmail)
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key
```

```bash
npm run dev
```

Backend runs at `http://localhost:5000`

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
```

```bash
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## 🌍 Multi-Language Translation

When a user selects a CEFR level, a language picker appears. After selecting their preferred language:

1. **Loading screen** displays while Gemini translates all content for that level
2. Translations are **cached in MongoDB** — only fetched from Gemini once per language per level
3. All UI text, vocabulary, grammar rules, and examples display in the chosen language
4. German words always remain in German — only translations change

### Supported Languages

| Code | Language | Native |
|------|----------|--------|
| en | English | English |
| ru | Russian | Русский |
| uk | Ukrainian | Українська |
| hi | Hindi | हिन्दी |
| or | Odia | ଓଡ଼ିଆ |
| bn | Bengali | বাংলা |
| te | Telugu | తెలుగు |
| ta | Tamil | தமிழ் |
| sa | Sanskrit | संस्कृतम् |
| es | Spanish | Español |
| fr | French | Français |

---

## 🎯 Features

### 🏠 Homepage
- Horizontal card slider showing all CEFR levels (A1–C1)
- Each level has a unique gradient theme
- Responsive: 3 cards on desktop, 2 on tablet, 1 on mobile
- Language picker popup on level click

### 🗺️ Mode Page (RPG Quest)
- Level crest with spinning dashed ring animation
- Rank title (Novice / Apprentice / Warrior / Knight / Grand Master)
- XP progress bar with animated fill
- Stat badges: Vocab, Grammar, Mastery %
- Two quest cards: Learn and Practice

### 📚 Learn Page

#### Vocabulary
- Topics shown as a circular slider (3/2/1 per viewport)
- Sequential topic unlocking — complete one to unlock the next
- **Stacked index cards** with vibrant colors (yellow, pink, teal, purple, orange, blue)
- Physical ruled lines and red margin on each card
- Flip animation to reveal translation
- "Got it!" flies card left, "Keep Reviewing" sends card to bottom of stack
- Completion screen when all cards cleared

#### Grammar
- Quest-style lesson list with lock/unlock indicators
- **Blackboard UI** for rules and examples — chalk text on green chalkboard with wooden frame
- Circular slider for rules (3/2/1 per viewport)
- Tables for declension and conjugation patterns
- Fill-in-the-blank exercises with hints

### 🎯 Practice Page
- **Vokabeln** — Vocabulary multiple choice quizzes
- **Grammatik** — Grammar exercises
- **Artikel** — Article (der/die/das) drills
- **Gemischt** — Mixed mode
- **Schreiben** (AI Writing) — Gemini generates an English sentence, user writes it in German, AI checks grammar, word order, and meaning with detailed feedback

### 📊 Progress Page
- Level tabs showing only visited levels
- Per-section progress bars (Vocabulary / Grammar)
- Lesson completion pills
- Overall mastery percentage with animated ring

### 🔐 Authentication
- JWT-based login/signup
- Email OTP verification for password reset
- Protected routes for all learning content

---

## 🤖 AI Features (Google Gemini)

### Sentence Writing Check (`/api/sentence`)
- Generates English sentences using vocabulary words the user has studied
- Checks user's German translation for:
  - Overall score (0–100)
  - Detailed feedback
  - Word order notes (V2 rule)
  - Grammar corrections
- Rate limited: `floor(completionPct / 10)` checks per hour
- Resets hourly

### Multi-Language Translation (`/api/translate`)
- Bulk translates all content for a level in one API call
- Results cached permanently in MongoDB
- Falls back to English if translation fails
- Supports 11 languages

---

## 🎨 Design System

### Color Palette per Level
| Level | Color | Theme |
|-------|-------|-------|
| A1 | `#a78bfa` | Purple — Novice |
| A2 | `#34d399` | Green — Apprentice |
| B1 | `#f472b6` | Pink — Warrior |
| B2 | `#fbbf24` | Gold — Knight |
| C1 | `#38bdf8` | Blue — Grand Master |

### Route Backgrounds
Each section has its own background theme that transitions smoothly:
- **Home** — Deep blue cosmos
- **Mode** — Dark with colored gradients
- **Learn** — Purple-magenta gradient
- **Practice** — Deep ocean blue
- **Auth** — Dark minimal

---

## 🔗 API Reference

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/forgot-password` | Send OTP email |
| POST | `/api/auth/verify-otp` | Verify OTP |
| POST | `/api/auth/reset-password` | Reset password |

### Vocabulary & Grammar
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/vocab/:level` | Get vocabulary topics for level |
| GET | `/api/grammar/:level` | Get grammar lessons for level |

### Progress
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/progress/lesson` | Save lesson completion |
| GET | `/api/progress/lesson/:userId` | Get lesson progress |
| GET | `/api/progress/dashboard/:userId` | Get dashboard summary |

### AI Features
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/sentence/generate/:level` | Generate English sentence |
| POST | `/api/sentence/check/:level` | Check German sentence |
| POST | `/api/translate/bulk` | Bulk translate texts |
| GET | `/api/translate/cached` | Get cached translations |

---

## 🚢 Deployment

### Frontend (Vercel)
1. Connect GitHub repo to Vercel
2. Set environment variable: `VITE_API_URL=https://your-render-url.onrender.com`
3. Add `vercel.json` for SPA routing:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Backend (Render)
1. Connect GitHub repo to Render
2. Set environment variables (same as `.env` above)
3. Build command: `npm install`
4. Start command: `node src/index.js`

### MongoDB Atlas
- Whitelist IP: `0.0.0.0/0` for Render compatibility
- Create database user with read/write permissions

---

## 📝 Data Models

### Vocabulary Word
```json
{
  "de": "der Mann",
  "en": "man / husband",
  "article": "der",
  "plural": "Männer",
  "example": "Mein Mann arbeitet bei der Polizei.",
  "tip": "Also means husband in context"
}
```

### Grammar Lesson
```json
{
  "id": "articles",
  "title": "Articles with Nouns",
  "icon": "📖",
  "explanation": "German has three genders...",
  "rules": ["Rule 1...", "Rule 2..."],
  "table": { "headers": [...], "rows": [...] },
  "examples": [{ "de": "...", "en": "..." }],
  "exercises": [{ "sentence": "...", "answer": "...", "hint": "..." }]
}
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👤 Author

**Prateek Nayak**
- GitHub: [@Prat-375](https://github.com/Prat-375)
- Email: prateek.nayak50@gmail.com

---

## 🙏 Acknowledgements

- [Google AI Studio](https://aistudio.google.com) — Gemini API for AI features
- [MongoDB Atlas](https://www.mongodb.com/atlas) — Cloud database
- [Vercel](https://vercel.com) — Frontend hosting
- [Render](https://render.com) — Backend hosting
- Inspired by Duolingo, Anki, and classic RPG games

---

*Built with ❤️ and a deep love for languages*
