# 🪐 BODYQUEST — HORMONE ISLAND
### A Gen-Z Interactive PCOS Diagnostic Education Game

> **"Decode your body signals. Navigate your PCOS diagnostic path."**

BodyQuest is a fully interactive, dark-cosmic-themed health education web app built for adolescents and young adults who want to understand PCOS (Polycystic Ovary Syndrome) — what it is, what signals to look for, and how to prepare for a real clinical conversation with a healthcare professional.

**This is not a diagnostic tool. It is an educational companion.**

---

## 🎮 What Makes BodyQuest Different

Most health information online is either too clinical to understand or too vague to act on. BodyQuest bridges that gap by:

- Translating Rotterdam Criteria and 2023 International PCOS Guidelines into plain, accessible language
- Using a **game-loop format** (XP, zones, missions) that makes learning feel engaging rather than scary
- Including a **PCOS Detection Card Deck** — 10 signal cards based on real diagnostic criteria
- Providing an **AI companion (Bro ⚡)** powered by Gemini, with a built-in offline fallback
- Generating a **Care Passport** — a personalised summary the user can bring to a doctor's appointment
- Enforcing clear **non-diagnostic disclaimers** throughout — no diagnosis cosplay, ever

---

## ✨ Features

### 🗺 6 Interactive World Zones
| Zone | What You Do |
|------|-------------|
| ⚡ **Spawn Point** | PCOS & Hormone Signals 101 — understand the basics |
| 🧬 **Body Lab** | 10-card PCOS Detection Deck — swipe through real signals |
| 🌊 **Cycle City** | Interactive menstrual cycle timeline + Myth or Fact mini-game |
| 🔮 **Mood Arcade** | 4-7-8 rhythm breathing orb for nervous system grounding |
| 🪐 **PCOS Signal Lab** | Structured 5-question signal check-in |
| 💊 **Care Portal** | Generate your personalised Care Passport |

### 🃏 PCOS Detection Deck (Body Lab)
10 cards covering every major PCOS indicator:
- Menstrual irregularity (Rotterdam Criterion 1)
- Hirsutism / facial hair (Androgen — Rotterdam Criterion 2)
- Cystic/persistent acne
- Scalp hair thinning (androgenic alopecia)
- Acanthosis nigricans (insulin resistance skin sign)
- Central weight gain
- Mood & energy dysregulation
- Pelvic bloating
- Difficulty losing weight
- Clinical / doctor-flagged hormone concerns

Each card has a **"Why does this matter?"** flip for the science behind the signal. At the end, you get a 6-level result mapped to Rotterdam Criteria combinations.

### 🤖 Bro ⚡ — AI Companion
- Powered by **Google Gemini** via a local Express backend
- Trained on a PCOS-specific system prompt
- Covers: cycle patterns, androgenic signs, insulin resistance, doctor prep
- **Offline fallback** built in — deterministic keyword-matching responses when the API is unavailable
- Never diagnoses. Always refers to healthcare professionals for formal evaluation.

### 📋 Care Passport
A personalised summary generated from your signal check-in:
- Signals reported
- Status classification
- Recommended next step
- Questions to ask your doctor
- Evidence card citing 2023 PCOS Guideline, WHO, NIH sources

### 🎨 Visual Design
- Dynamic 3D cosmos canvas background (mouse-reactive particle field with nebula pulses)
- Background image layer with wellness art
- Glassmorphic UI panels with backdrop blur
- 3D card tilt effects on hover
- XP toast notifications, breathing orb animation
- Google Fonts: Outfit, Plus Jakarta Sans, Space Grotesk
- Reduced-motion toggle for accessibility

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 (Vite) |
| Styling | Vanilla CSS (no Tailwind) |
| AI Backend | Express.js + Google Gemini API (`@google/generative-ai`) |
| Build Tool | Vite 8 |
| Linting | ESLint |
| Fonts | Google Fonts (Outfit, Plus Jakarta Sans, Space Grotesk) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A [Google AI Studio](https://aistudio.google.com/) API key (free)

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/hormone-harbor.git
cd hormone-harbor
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up your environment
Create a `.env` file in the root:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run the app

**Start the Bro AI backend** (Terminal 1):
```bash
node server.cjs
```
> Bro API will run at `http://localhost:8787`

**Start the Vite dev server** (Terminal 2):
```bash
npm run dev
```
> App will be available at `http://localhost:5173`

> **Note:** The Vite dev server proxies `/api` requests to `localhost:8787` automatically. If the backend is not running, Bro falls back to built-in offline responses.

---

## 📁 Project Structure

```
hormone-harbor/
├── src/
│   ├── App.jsx          # Main app — all 6 zones, game state, AI chat, PCOS deck
│   ├── App.css          # Full dark cosmic design system
│   ├── index.css        # Base HTML/body resets
│   ├── main.jsx         # React entry point
│   └── assets/          # Background art images
├── server.cjs           # Express + Gemini API backend (Bro companion)
├── vite.config.js       # Vite config with API proxy
├── index.html           # HTML entry with Google Fonts
├── .env                 # API key (not committed)
└── package.json
```

---

## ⚕️ Medical Disclaimer

BodyQuest is an **educational prototype only**.

- It does **not** diagnose PCOS, PCOD, or any medical condition
- Results from the PCOS Detection Deck and Signal Lab are for **awareness and preparation purposes only**
- A formal PCOS diagnosis requires clinical evaluation by a licensed healthcare professional — including cycle history, blood tests (LH, FSH, testosterone, AMH), and pelvic ultrasound
- If you are experiencing severe pelvic pain, extremely heavy bleeding, fainting, or any safety concern, please seek immediate medical attention

---

## 📚 Evidence Base

- [2023 International Evidence-Based Guideline for PCOS — Monash University](https://monash.edu/medicine/sphpm/mchri/pcos/guideline)
- [WHO — Menstrual Health Education](https://www.who.int/health-topics/menstrual-health)
- [NIH — Puberty and Hormone Health](https://www.nichd.nih.gov/health/topics/puberty)
- Rotterdam PCOS Consensus Criteria (2003, updated 2023)

---

## 🌟 What's Unique About This Project

| Feature | Other Health Apps | BodyQuest |
|---------|------------------|-----------|
| Target audience | General / adults | Gen-Z adolescents |
| Tone | Clinical or generic | Casual, respectful, Gen-Z |
| PCOS education | Article-style | Interactive card deck + zones |
| AI companion | Generic chatbot | PCOS-specific system prompt with safety guardrails |
| Result output | None | Personalised Care Passport |
| Evidence | Often missing | Cited 2023 PCOS Guidelines throughout |
| Diagnosis | Sometimes implied | Explicitly disclaimed — never diagnoses |

---

## 👩‍💻 Author

**Arthi Karjee**  
Built as a health-tech education project focused on PCOS diagnostic literacy for adolescents.

---

## 📄 License

This project is for educational and portfolio purposes.  
Not intended for clinical or commercial use without appropriate medical oversight.
