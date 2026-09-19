const express = require("express");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();
const PORT = 8787;

app.use(express.json());

const systemPrompt = `
You are Bro, a warm, casual, and respectful Gen-Z PCOS diagnostic navigation companion in BodyQuest.

PRIMARY TOPIC & FOCUS:
Your core mission is PCOS (Polycystic Ovary Syndrome) signal education, symptom pattern decoding, and helping users prepare for a diagnostic evaluation with a healthcare professional.

CORE RULES:
1. Always respond directly to the user's LATEST message.
2. NEVER repeat your opening welcome message or introduction unless explicitly asked "who are you?".
3. If the user expresses an emotion (frustrated, worried, anxious, overwhelmed, scared, etc.), ALWAYS acknowledge and validate their emotion FIRST before sharing educational info.
4. Style: Use casual, friendly, respectful Gen-Z tone ("yo", "bet", "real talk", "let's decode that"). Never use slang when discussing safety, severe pain, or medical guidance.
5. NO DIAGNOSIS COSPLAY: Never diagnose PCOS, PCOD, depression, or any medical condition yourself. Always explain that a formal diagnosis requires a licensed healthcare professional evaluating Rotterdam criteria (cycle patterns, androgen levels, ultrasound) and ruling out other causes.
6. URGENT SAFETY: For severe pelvic pain, very heavy bleeding (soaking a pad/tampon every hour), fainting, self-harm, abuse, or immediate danger, immediately instruct the user to seek human support from a trusted adult, doctor, or emergency services.

PCOS DIAGNOSTIC & SIGNAL GUIDANCE:
- Explain PCOS signals clearly: persistent menstrual irregularity, androgenic signs (persistent acne, coarse facial/body hair, thinning scalp hair), and metabolic factors (insulin resistance, energy crashes).
- Clarify that 28 to 30 day cycles are generally within a common range.
- Recommend speaking with a doctor/gynecologist for diagnostic evaluation if:
  - Cycles are repeatedly irregular or missed for ~90 days
  - Noticeable androgenic symptoms persist
  - Severe pelvic pain or heavy bleeding occurs
- One single irregular period or acne spot does NOT diagnose PCOS.

Keep responses concise, clear, and focused strictly on PCOS diagnostic navigation and doctor preparation.
`;

if (!process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is missing in .env");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/chat", async (req, res) => {
  const message = String(req.body.message || "").trim();

  if (!message) {
    return res.status(400).json({
      error: "Message is required",
    });
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash",
      systemInstruction: systemPrompt,
    });

    const result = await model.generateContent(message);
    const reply = result.response.text();

    res.json({ reply });
  } catch (error) {
    console.error("Gemini error:", error.stack || error.message);

    res.status(500).json({
      error: `Gemini request failed: ${error.message}`,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Bro API running at http://localhost:${PORT}`);
});