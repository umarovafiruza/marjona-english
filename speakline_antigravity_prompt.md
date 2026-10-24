# Speakline — Antigravity Uchun To'liq Master Prompt (Speaking + Writing Edition)

Quyidagi promptni to'liqligicha nusxalab (**Copy**), **Antigravity** dasturiga tashlang. Unda loyihaning barcha eski va yangi funksiyalari (Speaking teleprompter, 3 ta savol + 30 soniyalik diktofon, Writing bo'limi, 5 ta maqsadli so'z tekshiruvi, so'z sanagich, Lofi musiqalar, yomg'ir animatsiyasi va xotirada saqlash) eng mayda detallarigacha aniq yozilgan.

## Antigravity-ga Tashlanadigan Tayyor Prompt (Ingliz tilida — eng yuqori aniqlik uchun)

```text
Build a minimal, responsive, lightweight web application called "Speakline" using ONLY plain HTML, CSS, and vanilla JavaScript (no frameworks, no build tools). Output three main files: `index.html`, `style.css`, `script.js`, plus a `README.md` and an `/audio` folder placeholder.

==========================================================================
1. PURPOSE & CORE EXPERIENCE
==========================================================================
Speakline is an English Speaking & Writing practice studio with a calm, rainy night atmosphere.
When the user opens the app, they can switch between two main modes via top navigation tabs or mode selector buttons:
  1. SPEAKING MODE — Teleprompter reading practice (levels A1, A2, B1) with background rain and real Lofi music, followed by 3 topic-specific speaking questions where the user records a 30-second voice answer per question using a built-in microphone voice recorder (dictaphone).
  2. WRITING MODE — Guided essay/paragraph writing on the same 10 topics (50–100 words), featuring 5 target vocabulary words/phrases per topic that automatically light up with a green checkmark (✔) as the user types them, a live word counter (e.g., "45 / 80 words"), and automatic saving to localStorage so users can view and edit their writing anytime.

==========================================================================
2. VISUAL DESIGN & ATMOSPHERE
==========================================================================
- Color Palette (Deep Night Blue & Crisp White):
  - Background Primary: Deep Dark Blue (#0B1D36) with a subtle vertical gradient (#09172B to #102747)
  - Surface / Cards: Translucent Navy (#112849 / rgba(255, 255, 255, 0.05)) with thin borders (rgba(255, 255, 255, 0.18))
  - Primary Text & Active Controls: Pure White (#FFFFFF)
  - Secondary Text: Soft Ice Blue (#A5C0E2)
  - Success / Checkmark Accent: Emerald Green (#34D399) for completed badges and used target vocabulary checkmarks (✔)
  - Recording Accent: Soft Coral Red (#F87171) for active microphone recording indicator
- Typography (via Google Fonts):
  - "Newsreader" (serif) for headings, teleprompter reading text, and writing editor text
  - "Inter" (sans-serif) for UI buttons, labels, counters, and badges
- Ambient Background Rain:
  - Include a lightweight HTML5 `<canvas id="rain-canvas">` in the background that renders smooth, calm falling rain during active practice sessions using a single batched `ctx.beginPath()` and `ctx.stroke()` per frame for 60fps performance.
- Responsive & Mobile-First:
  - Works seamlessly from 320px mobile screens to large desktop monitors using `100dvh` and safe-area insets.
  - Narrow, eye-friendly reading column (`max-width: 390px` on desktop, `305px` on mobile) so the user's eyes do not get tired while reading.

==========================================================================
3. DATA STRUCTURE: 10 TOPICS (FOR BOTH SPEAKING & WRITING)
==========================================================================
Store all 10 topics in `script.js` in a structured `TOPICS` array:
01. Introducing Yourself
02. Daily Routine
03. Food and Restaurants
04. Travel and Directions
05. Work and Career
06. Hobbies and Free Time
07. Technology
08. Health and Fitness
09. Shopping
10. Dreams and Goals

Each topic object MUST include:
- `id`: 1 to 10
- `title`: Topic title
- `levels`: `{ A1: "...", A2: "...", B1: "..." }` — three natural, conversational first-person passages (around 85–115 words each) tailored to CEFR A1 (Easy), A2 (Elementary), and B1 (Medium).
- `questions`: Array of 3 speaking follow-up questions related to the topic (e.g., for Daily Routine: 1. "What time do you usually wake up and what is the first thing you do?", 2. "Which part of your daily routine helps you relax the most?", 3. "What is one daily habit you would like to change or improve?").
- `targetWords`: Array of 5 useful vocabulary words or short phrases related to the topic for the Writing mode (e.g., for Introducing Yourself: `["grow up", "free time", "curious", "practicing", "express"]`).
- `writingPrompt`: A short, encouraging 1-sentence writing prompt for the Writing mode.

==========================================================================
4. NAVIGATION & HOME SCREEN
==========================================================================
- At the top of the Home screen, display a prominent Mode Switcher with two main buttons:
  - `[ Speaking ]`
  - `[ Writing ]`
- Below the Mode Switcher, show the numbered list (01 to 10) of the 10 topics:
  - In **Speaking** mode: each topic row shows `01`–`10`, the topic title, a status label if completed earlier (`"Read before"` + level/speed from `localStorage`), and a level badge (`A1–B1`). Clicking a topic opens the **Speaking Setup Screen**.
  - In **Writing** mode: each topic row shows `01`–`10`, the topic title, and the user's saved writing status from `localStorage` (e.g., `"Saved · 68 words"` with a green `✔` if 50–100 words are written, or `"Draft · 24 words"`, or `"Not started"`). Clicking a topic opens the **Writing Studio Screen** for that topic.

==========================================================================
5. SPEAKING MODE WORKFLOW
==========================================================================
### A. Speaking Setup Screen
- Displays topic number, title, word count for the selected level, and estimated reading time.
- **Level Selector**: 3 buttons (`A1 Easy`, `A2 Elementary`, `B1 Medium`). Default is the last used level from `localStorage` or `A1`.
- **Reading Speed Scroll-Bar (Range Slider)**: Smooth `<input type="range" min="60" max="200" step="5" value="115">` showing live WPM (`60 wpm` Slow to `200 wpm` Fast, default `115 wpm`).
- **5 Real Open-Source Lofi Music Tracks**:
  - 5 track selector buttons (`1. Bonjour`, `2. London`, `3. Puddles`, `4. Memory`, `5. Slow Hands`) streaming real Creative Commons Lofi Hip-Hop tracks from Internet Archive (`DWK312` by Centz: `Centz_-_01_-_Bonjour.mp3`, `Centz_-_03_-_The_London_Underground.mp3`, `Centz_-_09_-_Puddles.mp3`, `Centz_-_10_-_Memory_Box.mp3`, `Centz_-_11_-_Slow_Hands.mp3`) with `.ogg` and `https://stream.laut.fm/lofi` fallbacks (plus `/audio/lofi.mp3` fallback).
  - Clicking a track button on Setup previews the music immediately.
- **Music Volume Slider**: `0%` to `100%` (default `45%`).
- **Start Button** & **Back Link**: Audio and rain start when clicking Start.

### B. Teleprompter Reading Screen
- **Start Sequence**:
  1. Background rain canvas starts falling.
  2. Selected Lofi music fades in smoothly over ~1.8 seconds.
  3. Voice intro plays `/audio/intro.mp3` or falls back to `speechSynthesis` speaking `"Speak fast and clear"` in English.
  4. Big `3, 2, 1` countdown in the center.
  5. Text starts scrolling upward smoothly.
- **Smooth 60fps Teleprompter**:
  - Text is split into short lines (5 to 7 words per line) inside a narrow centered column.
  - Moves upward via `requestAnimationFrame` and `translate3d(0, y, 0)` with zero DOM layout reads during the animation loop.
  - Fixed vertical center focus band: the focused line is bright white (`opacity: 1`), adjacent lines are soft (`opacity: 0.5`), and outer lines fade (`opacity: 0.24`) under top/bottom edge gradients.
  - Speed is calculated uniformly from WPM (`pxPerWord * (wpm / 60)`) with exponential velocity smoothing so changing the speed slider mid-session never jumps.
- **Bottom Controls Bar**:
  - Live **Speed Scroll-Bar (Range Slider)** (`60` to `200 WPM`) so the user can adjust speed smoothly while reading.
  - **Pause / Resume** button (also triggered by pressing `Space` or tapping the text stage; lowers music volume slightly while paused; auto-pauses on `visibilitychange`).
  - **Exit** button (or `Escape` key) to return to topics without marking completed.

### C. Post-Reading Speaking Result & 3 Questions Dictaphone Screen
When the last line of the teleprompter finishes scrolling:
- Mark the topic as completed in `localStorage` and gently lower the background music volume (or fade out).
- Show the **Session Completed Summary** (Topic title, Level & WPM used, Total reading time).
- Directly below the summary on the same screen, display the **"Speaking Practice: 3 Follow-Up Questions"** section:
  - List the 3 topic-specific questions clearly (Question 1, Question 2, Question 3).
  - Each question card has:
    - The question text.
    - A **30-Second Timer Display** (`0:30` counting down to `0:00` when recording).
    - A **"Record Answer (30s)" / "Stop"** button using the browser's `MediaRecorder` API (`navigator.mediaDevices.getUserMedia({ audio: true })`).
    - When the user clicks **Record Answer**, start recording from the microphone, show a live recording indicator (`Recording... 0:29`), and automatically stop when the 30-second countdown reaches `0:00` (or when the user clicks **Stop** early).
    - Once recorded, display an inline HTML5 `<audio controls>` player right inside that question card so the user can listen to their own recorded voice immediately, plus a **"Re-record"** button to try again.
    - Gracefully handle microphone permission denial or unsupported browsers with a friendly inline message without crashing.
- Navigation buttons at the bottom: **Read again**, **Write on this topic** (jumps directly to the Writing Studio for this topic), **Next topic**, and **All topics**.

==========================================================================
6. WRITING MODE WORKFLOW
==========================================================================
When the user selects **Writing** on the Home screen and clicks any of the 10 topics, open the **Writing Studio Screen**:
- **Top Bar**:
  - **Back to topics** button.
  - Topic number & title (e.g., `Topic 01 · Introducing Yourself`) and the short writing prompt.
  - Optional toggle to play/pause the soft Lofi music & background rain while writing.
- **5 Target Words / Phrases Bar (Top of Editor)**:
  - Display the 5 topic-specific target words or phrases as clean pill badges above the writing area.
  - Each badge shows the word/phrase and an indicator icon.
  - **Real-Time Detection**: As the user types in the textarea, check case-insensitively (using word-boundary matching) whether each target word/phrase appears in the user's text.
  - Whenever a target word/phrase is used in the text, its badge immediately turns emerald-accented and displays a green checkmark (`✔`) next to it, plus a counter (e.g., `3 / 5 target words used`).
- **Writing Textarea Editor**:
  - Clean, distraction-free writing area styled in the Deep Blue & White theme with comfortable serif/sans typography and generous line height.
  - Placeholder guiding the user to write 50 to 100 words on the topic.
- **Bottom Status Bar (Word Counter & Auto-Save)**:
  - **Live Word Counter**: Shows the current word count against the recommended target (e.g., `45 / 80 words`, with a helper range indicator `Target: 50–100 words`). Changes style/color subtly when the user reaches the 50–100 word target zone.
  - **Auto-Save to `localStorage`**: Every keystroke (debounced) or click on **"Save Writing"** automatically saves the user's text, word count, used target words count, and timestamp in `localStorage` under that topic ID.
  - Show a subtle `"Saved to memory ✔"` status indicator so the user knows their work is safe and can be viewed or edited anytime they return.
  - Include a **"Clear"** button (with confirmation) and a **"Practice Speaking This Text"** button (which sends the user's own written text directly into the Teleprompter so they can read their own essay aloud!).

==========================================================================
7. CODE QUALITY & ARCHITECTURE
==========================================================================
- Modular, well-commented vanilla JavaScript (`StorageManager`, `AppState`, `RainController`, `AudioController`, `VoiceRecorderController`, `TeleprompterController`, `WritingController`, `UIController`).
- Wrap all `localStorage`, `Audio`, and `MediaRecorder` calls in `try/catch` blocks so the app never crashes.
- Accessible markup (`aria-live`, keyboard navigation, focus-visible states, `prefers-reduced-motion` support).
```

## Ushbu Prompt Nimalarni Qamrab Oladi (Qisqacha Tekshiruv)

1. **Kirishda 2 ta asosiy bo'lim (`Speaking` va `Writing`):** Foydalanuvchi saytga kirishi bilan tepada **Speaking** yoki **Writing** tugmasini tanlaydi.
2. **Speaking + 3 ta savol va 30 soniyalik Diktofon:**
   - Teleprompterda matn o'qib tugatilgach, pastda shu mavzuga mos **3 ta savol** chiqadi.
   - Har bir savol uchun **30 soniyalik taymer** va ** diktofon (Record Answer)** tugmasi bo'ladi — foydalanuvchi gapirib bo'lgach, o'z ovozini shu joyning o'zida qayta eshitib ko'rishi mumkin.
3. **Writing bo'limi + 5 ta muhim so'z (`✔`) + So'z sanagich + Xotira:**
   - O'sha 10 ta mavzu Writing bo'limida ham chiqadi.
   - Yozish oynasining tepasida mavzuga oid **5 ta muhim so'z/ibora** turadi — foydalanuvchi matnda ularni ishlatishi bilan yonida **yashil belgi (`✔`)** yonadi.
   - Pastki qismda jonli ravishda **`45 / 80 words`** (maqsad: 50–100 so'z) ko'rinib turadi.
   - Yozilgan matn avtomatik ravishda brauzer xotirasida (`localStorage`) saqlanadi — foydalanuvchi keyinroq qaytib kirib, yozgan matnini ko'rishi, tahrirlashi yoki hatto o'zi yozgan matnni teleprompterda ovoz chiqarib o'qishi mumkin.
