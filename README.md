# Speakline — Gamified English Speaking & Writing Studio

> **A vibrant, gamified, and responsive web application for mastering English speaking fluency and writing skills.**  
> Inspired by the lush, playful, and rewarding visual design of modern language learning platforms like Duolingo.  
> Built with pure vanilla HTML5, CSS3, and modern JavaScript — zero external frameworks, zero build steps.

---

## ✨ Features & Highlights

### 🎮 1. Visual Vibe & Gamification (Lush Green Theme)
- **Meadow Sky & Rolling Hills Aesthetic:** Fresh lime-tinted gradients (`#E2F7C2` to `#FFFFFF`), crisp white cards with rounded corners (`22px`), and rich deep forest green cards (`#0F2C1D`).
- **Winding Stepping Stones Learning Path:** The 10 CEFR topics are laid out along a playful vertical S-curved roadmap.
  - Active topic has a bouncing `"Start"` speech bubble tooltip!
  - Completed topics show vibrant green circles with checkmark `✔`.
  - Upcoming topics display theme icons (headphones, books, chests, dumbbells, airplanes, trophies).
- **Cute Learning Buddy Mascot & Greeting:** Cheerful mascot avatar with real-time personalized user greeting ("Hey, [Name]!").
- **4 Core English Skills Hub:**
  - 🎙️ **Speaking Practice:** Prominent card with all 10 CEFR topics listed directly inside for instant teleprompter access.
  - ✍️ **Writing Studio:** Guided 50-100 word essay practice with real-time target vocabulary badges.
  - 🎧 **Listening Practice:** Audio playback with adjustable speed, live spoken sentence highlighting, and comprehension questions.
  - 📖 **Reading Practice:** Interactive graded passages with tap-to-pronounce words and comprehension questions.
- **Floating Bottom Navigation Dock:** Minimal and focused navigation for **Asosiy (Path)**, **Audios**, and **Profile**.

---

### 🎙️ 2. Speaking Mode
- **10 CEFR-Graded Topics:** A1 (Easy), A2 (Elementary), and B1 (Medium).
- **60fps Smooth Teleprompter:** GPU-accelerated scrolling (`transform: translate3d`) driven by `requestAnimationFrame`, with zero layout thrashing.
- **Luminous Spring-Green Focus Zone & 18% Magnified Text:** The reading line sits between soft guide lines with a gentle glowing aura (`--focus-glow`) and 18% magnification (`scale(1.18)`) so you never lose your place.
- **Adjustable Speed Scrollbar:** Fine-tune reading velocity between **60 and 200 WPM** both on the Setup screen and on the live teleprompter bottom controls bar.
- **Pre-Reading Vocabulary & Pronunciation:** View key target vocabulary translated into Uzbek with instant text-to-speech (`speechSynthesis`) pronunciation, plus an interactive passage preview where you can tap any word to hear how it sounds.
- **Follow-up Speaking Questions & Diktafon:** Answer 3 topic-specific follow-up questions out loud with a 30-second voice recorder (`MediaRecorder` API).
- **LocalStorage Audio Hub (Max 3 Audios, FIFO):** Audio recordings are automatically stored in `localStorage` as base64 audio clips. A maximum of **3 recordings** are retained; adding a new one replaces the oldest. Access them anytime via the top header or bottom dock.

---

### ✍️ 3. Writing Studio Mode
- **10 Guided Essay Prompts:** Targeted 50–100 word essay challenges corresponding to each topic.
- **5 Target Vocabulary Badges:** Real-time regex detection (`\bword\b`) flags target words with an emerald green badge and checkmark (`✔`) as you type.
- **Live Word Counter:** Dynamic word counter that lights up in green when the 50–100 word threshold is met.
- **Auto-Save:** Essays are automatically saved to `localStorage` as you write.
- **Practice Speaking This Text:** Seamlessly load your written essay into the teleprompter to practice speaking your own words with the speed slider and reading focus glow.

---

### 👤 4. User Profile, Custom Avatar & Settings Modal
- **Personalized Account:** Enter and edit your display name ("Hey, [Name]!") anytime.
- **6 Gamified Avatars:** Choose from 6 cute characters (Mascot Sprout, Wise Owl, Clever Fox, Cozy Panda, Space Explorer, Crown Champion).
- **Theme Switcher:** Seamlessly switch between Light (Meadow) and Dark (Night Forest) mode directly from the settings dialog or the top header / bottom dock.
- **First-Time Welcome Onboarding:** New learners are welcomed with a friendly onboarding dialog to introduce themselves and pick an avatar.
- **Zero-Backend LocalStorage Persistence:** All settings are stored locally in the user's browser with instant reactivity.

---

### 🎨 5. Day & Night Modes
- **Day Mode (Lush Meadow):** Light lime and grassy green gradients with fresh white cards.
- **Night Forest Mode:** Deep midnight pine and emerald dark theme (`#0B1C13` / `#102B1E`) with luminous green accents.

---

## 📁 Project Structure

```text
marjona-english/
├── index.html                             # Main application markup & screens
├── style.css                              # Design system, themes & animations
├── script.js                              # Application state, prompter & controllers
├── server.js                              # Lightweight Node.js static HTTP server
├── package.json                           # NPM configuration (npm start)
├── README.md                              # Project documentation
├── audio/
│   └── README.txt                         # Placeholder & web fallbacks for local audio
└── speakline_english_speaking_practice (1).html # Standalone HTML backup
```

---

## 🚀 Running the Application

### Option A: Local Node Server (Recommended)
Make sure you have [Node.js](https://nodejs.org/) installed, then run:

```bash
# Start the server (runs on http://localhost:3000)
npm start
# OR: node server.js
```

Open your browser and navigate to:
```
http://localhost:3000
```

---

## ⌨️ Keyboard Shortcuts (Reading Mode)

| Key | Action |
| --- | --- |
| `Space` | Pause / Resume teleprompter |
| `ArrowUp` | Increase reading speed (+10 WPM) |
| `ArrowDown` | Decrease reading speed (-10 WPM) |
| `Escape` | Exit reading session |

---

## 📄 License
MIT License.
