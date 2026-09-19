import { useState, useEffect, useRef } from "react";
import "./App.css";

import heroNeonPortrait from "./assets/hero_neon_portrait.jpg";
import cycleWellnessArt from "./assets/cycle_wellness_art.jpg";
import moodZenArt from "./assets/mood_zen_art.jpg";

// Custom Glowing 3D SVG Icon Components
function IconEnergyCore({ size = 24, color = "#FF5E7E" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" opacity="0.4" />
      <path d="M13 2L4 14H11L10 22L20 9H12L13 2Z" fill={color} filter="drop-shadow(0 0 6px rgba(255,94,126,0.6))" />
    </svg>
  );
}

function IconDnaCore({ size = 24, color = "#FF5E7E" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 4C8 8 16 16 20 20" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 4C16 8 8 16 4 20" stroke="#00F2FE" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3" fill="#FFD166" />
    </svg>
  );
}

function IconLunarCore({ size = 24, color = "#00F2FE" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" strokeDasharray="3 3" />
      <path d="M12 3A9 9 0 0 1 12 21A6 6 0 0 0 12 3Z" fill={color} />
    </svg>
  );
}

function IconCrystalOrb({ size = 24, color = "#C792EA" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" fill="url(#orbGrad)" stroke={color} strokeWidth="1.5" />
      <circle cx="9" cy="9" r="2.5" fill="#FFF" opacity="0.6" />
      <defs>
        <radialGradient id="orbGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#C792EA" />
          <stop offset="100%" stopColor="#1E1442" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function IconSaturnCore({ size = 24, color = "#FFD166" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke={color} strokeWidth="1.8" transform="rotate(-20 12 12)" />
      <circle cx="12" cy="12" r="6" fill="url(#saturnGrad)" />
      <defs>
        <radialGradient id="saturnGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFD166" />
          <stop offset="100%" stopColor="#FF5E7E" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function IconCrossPulse({ size = 24, color = "#FF5E7E" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="9" y="3" width="6" height="18" rx="3" fill={color} />
      <rect x="3" y="9" width="18" height="6" rx="3" fill={color} />
    </svg>
  );
}

function ZoneIcon({ type }) {
  switch (type) {
    case "spawn":
      return <IconEnergyCore size={28} color="#00E676" />;
    case "bodylab":
      return <IconDnaCore size={28} color="#FF5E7E" />;
    case "cyclecity":
      return <IconLunarCore size={28} color="#00F2FE" />;
    case "moodarcade":
      return <IconCrystalOrb size={28} color="#C792EA" />;
    case "pcoslab":
      return <IconSaturnCore size={28} color="#FFD166" />;
    case "careportal":
      return <IconCrossPulse size={28} color="#FF5E7E" />;
    default:
      return <IconEnergyCore size={28} color="#FF5E7E" />;
  }
}

// DYNAMIC 3D COSMOS CANVAS COMPONENT
function Dynamic3DCosmosCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // 3D Particles Setup
    const numParticles = 180;
    const particles = [];
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 2.2,
        y: (Math.random() - 0.5) * height * 2.2,
        z: Math.random() * 1000 + 10,
        radius: Math.random() * 2 + 0.8,
        color: ["#FF5E7E", "#00F2FE", "#C792EA", "#FFD166", "#FFFFFF"][
          Math.floor(Math.random() * 5)
        ],
        alpha: Math.random() * 0.85 + 0.15,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.6,
      });
    }

    // Render Loop
    const render = () => {
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const offsetX = (mouseX - width / 2) * 0.15;
      const offsetY = (mouseY - height / 2) * 0.15;

      ctx.clearRect(0, 0, width, height);

      // Render Dynamic Nebulae Pulses
      const time = Date.now() * 0.001;
      const neb1X = width * 0.25 + Math.sin(time * 0.4) * 60;
      const neb1Y = height * 0.3 + Math.cos(time * 0.3) * 50;
      const g1 = ctx.createRadialGradient(neb1X, neb1Y, 10, neb1X, neb1Y, 380);
      g1.addColorStop(0, "rgba(199, 146, 234, 0.2)");
      g1.addColorStop(1, "transparent");
      ctx.fillStyle = g1;
      ctx.beginPath();
      ctx.arc(neb1X, neb1Y, 380, 0, Math.PI * 2);
      ctx.fill();

      const neb2X = width * 0.75 + Math.cos(time * 0.3) * 70;
      const neb2Y = height * 0.7 + Math.sin(time * 0.5) * 60;
      const g2 = ctx.createRadialGradient(neb2X, neb2Y, 10, neb2X, neb2Y, 420);
      g2.addColorStop(0, "rgba(0, 242, 254, 0.18)");
      g2.addColorStop(1, "transparent");
      ctx.fillStyle = g2;
      ctx.beginPath();
      ctx.arc(neb2X, neb2Y, 420, 0, Math.PI * 2);
      ctx.fill();

      // Render 3D Projection Particles
      const cx = width / 2;
      const cy = height / 2;
      const fov = 400;

      for (let i = 0; i < numParticles; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        if (p.z <= 1) p.z = 1000;
        if (p.z > 1000) p.z = 1;

        const scale = fov / (fov + p.z);
        const px = (p.x + offsetX) * scale + cx;
        const py = (p.y + offsetY) * scale + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          ctx.beginPath();
          ctx.arc(px, py, p.radius * scale * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha * scale;
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="cosmos-3d-canvas" />;
}

// 6 World Zone Definitions
const ZONES = [
  {
    id: "spawn",
    iconType: "spawn",
    title: "Spawn Point",
    subtitle: "PCOS & Hormone Signals 101",
    description: "Understand the core signals of PCOS: menstrual patterns, androgen shifts, and metabolic factors.",
    color: "mint",
    mission: "Complete PCOS signal briefing",
    rewardXp: 50,
  },
  {
    id: "bodylab",
    iconType: "bodylab",
    title: "Body Lab",
    subtitle: "PCOS Signal Sorter Mini-Game",
    description: "Learn to differentiate common puberty updates from persistent PCOS signals that justify medical evaluation.",
    color: "peach",
    mission: "Sort 5 PCOS body signals",
    rewardXp: 75,
  },
  {
    id: "cyclecity",
    iconType: "cyclecity",
    title: "Cycle City",
    subtitle: "Rotterdam Criteria & Timeline",
    description: "Decode cycle irregularity patterns, ovulation timing, and myth-busters regarding PCOS diagnosis.",
    color: "cyan",
    mission: "Explore cycle criteria & myths",
    rewardXp: 75,
  },
  {
    id: "moodarcade",
    iconType: "moodarcade",
    title: "Mood Arcade",
    subtitle: "Metabolic & Nervous System Grounder",
    description: "Insulin resistance and hormone shifts can impact mood. Practice 4-7-8 rhythm breathing to ground your system.",
    color: "lavender",
    mission: "Complete 1 grounding cycle",
    rewardXp: 50,
  },
  {
    id: "pcoslab",
    iconType: "pcoslab",
    title: "PCOS Signal Lab",
    subtitle: "Diagnostic Preparation Check-In",
    description: "Complete a structured, non-diagnostic signal check-in to prepare for a conversation with a qualified professional.",
    color: "gold",
    mission: "Complete signal check-in",
    rewardXp: 100,
  },
  {
    id: "careportal",
    iconType: "careportal",
    title: "Care Portal",
    subtitle: "Care Passport & Doctor Checklist",
    description: "Generate your Care Passport, review questions to ask a gynecologist/doctor, and access urgent support pathways.",
    color: "coral",
    mission: "Unlock Care Passport",
    rewardXp: 100,
  },
];

// PCOS Check-In Questions
const QUIZ_QUESTIONS = [
  {
    id: "cycles",
    question: "Have your periods been persistently irregular for over 6 months?",
    help: "Think about a continuous pattern over time, not just one unusual cycle.",
  },
  {
    id: "hair",
    question: "Have you noticed new or noticeable facial or body hair growth?",
    help: "Everyone naturally has body hair. We are asking about a distinct shift in pattern.",
  },
  {
    id: "acne",
    question: "Have you experienced persistent or severe acne that doesn’t respond to typical care?",
    help: "Occasional breakouts are standard during puberty updates.",
  },
  {
    id: "metabolic",
    question: "Has a healthcare professional mentioned a metabolic or hormone concern?",
    help: "Select yes only if a doctor or qualified nurse practitioner discussed this with you.",
  },
  {
    id: "urgent",
    question: "Are you currently experiencing severe pain, extremely heavy bleeding, fainting, or feeling unsafe?",
    help: "If yes, pause the game and seek immediate human support.",
  },
];

// Myth or Fact Database
const MYTHS = [
  {
    id: "myth1",
    statement: "One irregular period confirms you have PCOS.",
    answer: "MYTH",
    explanation: "One unusual cycle is common during puberty! PCOS requires evaluating long-term patterns, clinical signs, and ruling out other causes.",
  },
  {
    id: "myth2",
    statement: "PCOS evaluation includes menstrual cycle patterns and androgen-related signs.",
    answer: "FACT",
    explanation: "According to international guidelines, doctors look at cycle regularity alongside clinical or laboratory androgen signs.",
  },
  {
    id: "myth3",
    statement: "This app can diagnose PCOS, PCOD, or depression.",
    answer: "MYTH",
    explanation: "BodyQuest is an educational game! No app can diagnose medical conditions. Always consult a licensed healthcare professional.",
  },
  {
    id: "myth4",
    statement: "Cycle variation is very common in the first two years after your first period.",
    answer: "FACT",
    explanation: "Your body’s hormone control system takes time to mature during adolescence. Irregularity can be a normal part of the update.",
  },
];

// Signal Sorter Deck
const SORTER_CARDS = [
  {
    id: "c1",
    title: "Occasional acne spot on forehead",
    description: "Appears during stressful weeks or before periods.",
    correctCategory: "puberty",
    categoryLabel: "Common during puberty",
  },
  {
    id: "c2",
    title: "Period missing for 4+ consecutive months",
    description: "Repeated pattern after previously having regular cycles.",
    correctCategory: "pattern",
    categoryLabel: "Track the pattern",
  },
  {
    id: "c3",
    title: "Noticeable coarse facial hair growth",
    description: "New persistent growth on chin, upper lip, or chest.",
    correctCategory: "pro",
    categoryLabel: "Talk to a professional",
  },
  {
    id: "c4",
    title: "Sudden agonizing pelvic pain & dizziness",
    description: "Unable to stand up straight or severe fainting episode.",
    correctCategory: "urgent",
    categoryLabel: "Urgent human support",
  },
  {
    id: "c5",
    title: "Sleep pattern shifting later at night",
    description: "Feeling awake at 11 PM and tired at 7 AM.",
    correctCategory: "puberty",
    categoryLabel: "Common during puberty",
  },
];

// Cycle Phases Database
const CYCLE_PHASES = {
  menstrual: {
    name: "Menstrual Phase",
    days: "Days 1–5",
    summary: "Estrogen and progesterone drop. The uterine lining sheds.",
    tip: "Rest up, stay hydrated, and use warm compresses for mild cramps.",
    color: "#FF5E7E",
  },
  follicular: {
    name: "Follicular Phase",
    days: "Days 6–13",
    summary: "Estrogen rises! Ovarian follicles mature and energy levels rebound.",
    tip: "Great time for learning new skills, stamina, and creative quests!",
    color: "#00F2FE",
  },
  ovulatory: {
    name: "Ovulatory Phase",
    days: "Day 14 (approx)",
    summary: "LH surge triggers egg release. Estrogen peaks.",
    tip: "Social energy and confidence are often at their highest point.",
    color: "#FFD166",
  },
  luteal: {
    name: "Luteal Phase",
    days: "Days 15–28",
    summary: "Progesterone dominates. Body prepares for the next cycle.",
    tip: "Mood shifts, skin oiliness, or appetite changes can occur naturally.",
    color: "#C792EA",
  },
};

export default function App() {
  // Navigation & Screen state
  const [screen, setScreen] = useState("island");

  // Gameplay state
  const [xp, setXp] = useState(0);
  const [xpPulse, setXpPulse] = useState(false);
  const [missions, setMissions] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  // PCOS Check-in state
  const [answers, setAnswers] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);

  // Mini-game states
  const [mythIndex, setMythIndex] = useState(0);
  const [mythFeedback, setMythFeedback] = useState(null);

  const [sorterIndex, setSorterIndex] = useState(0);
  const [sorterFeedback, setSorterFeedback] = useState(null);

  const [cyclePhase, setCyclePhase] = useState("follicular");

  // Breathing Orb State
  const [breathingPhase, setBreathingPhase] = useState("Ready");
  const [breathingCount, setBreathingCount] = useState(4);
  const [isBreathingActive, setIsBreathingActive] = useState(false);

  // Drawers
  const [showEvidence, setShowEvidence] = useState(false);
  const [showBroDrawer, setShowBroDrawer] = useState(false);

  // Bro Chat state
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      content:
        "Yo! I’m Bro ⚡ your PCOS diagnostic & signal companion. Ask me anything about PCOS signals, cycle irregularity, androgenic signs, or preparing for a doctor evaluation. We keep it 100% educational—no diagnosis cosplay!",
    },
  ]);
  const [chatLoading, setChatLoading] = useState(false);

  // 3D Card Tilt Handlers
  function handleCard3DTilt(e) {
    if (reducedMotion) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${-y / 14}deg) rotateY(${x / 14}deg) translateY(-8px)`;
  }

  function handleCard3DReset(e) {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
  }

  // XP Granting Helper
  function awardXp(amount, missionId = null) {
    if (missionId && missions.includes(missionId)) return;

    if (missionId) {
      setMissions((prev) => [...prev, missionId]);
    }

    setXp((prev) => prev + amount);
    setXpPulse(true);
    setTimeout(() => setXpPulse(false), 500);

    const toastId = Date.now();
    setToasts((prev) => [...prev, { id: toastId, text: `+${amount} XP Earned!` }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toastId));
    }, 2400);
  }

  // Reset Game Helper
  function resetGame() {
    setXp(0);
    setMissions([]);
    setAnswers({});
    setQuestionIndex(0);
    setScreen("island");
    setMythIndex(0);
    setMythFeedback(null);
    setSorterIndex(0);
    setSorterFeedback(null);
    setIsBreathingActive(false);
    awardXp(0);
  }

  // PCOS Check-in Flow
  const currentQuestion = QUIZ_QUESTIONS[questionIndex];

  function handleAnswer(value) {
    const nextAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(nextAnswers);

    if (questionIndex < QUIZ_QUESTIONS.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setScreen("result");
      awardXp(100, "pcos-lab");
    }
  }

  // PCOS Result Calculator
  function getPcosResult() {
    if (answers.urgent) {
      return {
        title: "Pause the Game & Seek Urgent Human Support",
        color: "urgent",
        statusTag: "CRITICAL SUPPORT NEEDED",
        text: "Because you selected an urgent concern (severe pain, heavy bleeding, fainting, or safety concerns), please pause and contact a trusted adult, doctor, or emergency service immediately. Bro cannot handle emergencies.",
        nextMove: "Contact Emergency Services or Trusted Adult",
      };
    }

    const signalCount = [answers.cycles, answers.hair, answers.acne, answers.metabolic].filter(
      Boolean
    ).length;

    if (signalCount >= 2) {
      return {
        title: "Worth Discussing with a Healthcare Professional",
        color: "coral",
        statusTag: "MULTIPLE SIGNALS REPORTED",
        text: "You reported multiple features (such as cycle timing or skin/hair changes) that may be worth discussing with a qualified doctor. This tool does NOT confirm PCOS or PCOD.",
        nextMove: "Schedule a check-up with a doctor or gynecologist",
      };
    }

    if (signalCount === 1) {
      return {
        title: "Track the Pattern & Ask Questions",
        color: "gold",
        statusTag: "SINGLE SIGNAL REPORTED",
        text: "You reported one signal worth tracking. Cycle variations or acne can naturally occur during adolescent puberty updates. Keep a simple cycle log.",
        nextMove: "Track cycle dates for 3 months in a note app",
      };
    }

    return {
      title: "Keep Exploring & Learning Your Body",
      color: "emerald",
      statusTag: "STANDARD PUBERTY PROFILE",
      text: "You didn't report multiple persistent PCOS signals in this check-in. Continue learning about your body and reach out to a professional whenever you have questions.",
      nextMove: "Keep exploring Hormone Island missions",
    };
  }

  // Signal Sorter Mini-Game Handler
  function handleSortChoice(category) {
    const card = SORTER_CARDS[sorterIndex];
    const isCorrect = category === card.correctCategory;

    setSorterFeedback({
      isCorrect,
      text: isCorrect
        ? `W Move! "${card.title}" belongs under ${card.categoryLabel}.`
        : `Not quite! "${card.title}" is best placed under ${card.categoryLabel}.`,
    });

    if (isCorrect) {
      awardXp(15);
    }
  }

  function nextSorterCard() {
    setSorterFeedback(null);
    if (sorterIndex < SORTER_CARDS.length - 1) {
      setSorterIndex(sorterIndex + 1);
    } else {
      setSorterIndex(0);
      awardXp(50, "bodylab");
    }
  }

  // Myth Handler
  function handleMythAnswer(chosenAnswer) {
    const currentMyth = MYTHS[mythIndex];
    const isCorrect = chosenAnswer === currentMyth.answer;

    setMythFeedback({
      isCorrect,
      text: isCorrect
        ? `Correct! ${currentMyth.explanation}`
        : `Almost! ${currentMyth.explanation}`,
    });

    if (isCorrect) {
      awardXp(25);
    }
  }

  function nextMythCard() {
    setMythFeedback(null);
    setMythIndex((prev) => (prev + 1) % MYTHS.length);
    awardXp(25, "cyclecity");
  }

  // Breathing Orb Loop
  function toggleBreathing() {
    if (!isBreathingActive) {
      setBreathingPhase("Inhale");
      setBreathingCount(4);
      setIsBreathingActive(true);
    } else {
      setIsBreathingActive(false);
      setBreathingPhase("Ready");
      setBreathingCount(4);
    }
  }

  useEffect(() => {
    if (!isBreathingActive) return;

    const interval = setInterval(() => {
      setBreathingCount((count) => {
        if (count > 1) return count - 1;

        if (breathingPhase === "Inhale") {
          setBreathingPhase("Hold");
          return 7;
        } else if (breathingPhase === "Hold") {
          setBreathingPhase("Exhale");
          return 8;
        } else {
          setBreathingPhase("Inhale");
          setMissions((prev) => (prev.includes("moodarcade") ? prev : [...prev, "moodarcade"]));
          setXp((prev) => prev + 30);
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isBreathingActive, breathingPhase]);

  // Bro Companion Chat Handler with Fallback
  async function handleSendChat(e) {
    e.preventDefault();
    const query = chatInput.trim();
    if (!query || chatLoading) return;

    setChatMessages((prev) => [...prev, { role: "user", content: query }]);
    setChatInput("");
    setChatLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });

      const data = await res.json();
      if (data.reply) {
        setChatMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        throw new Error(data.error || "No reply from server");
      }
    } catch {
      // Deterministic Offline Fallback Response Generator
      const lower = query.toLowerCase();
      let fallbackText = "";

      if (
        lower.includes("frustrated") ||
        lower.includes("sad") ||
        lower.includes("anxious") ||
        lower.includes("worried") ||
        lower.includes("scared") ||
        lower.includes("upset") ||
        lower.includes("overwhelmed")
      ) {
        fallbackText =
          "I hear you, real talk. Body updates and period uncertainty can feel super overwhelming. What’s bothering you the most right now—is it cycle timing, body changes, or something else?";
      } else if (
        lower.includes("28") ||
        lower.includes("30") ||
        lower.includes("28 to 30") ||
        lower.includes("28-30")
      ) {
        fallbackText =
          "A cycle around 28 to 30 days is generally within a common, reassuring range! What matters most is tracking your overall pattern over time. If cycles are repeatedly unusual, missed for ~90 days, or accompanied by severe pain, that's worth checking with a healthcare professional.";
      } else if (lower.includes("pcos") || lower.includes("pcod")) {
        fallbackText =
          "PCOS (Polycystic Ovary Syndrome) is a common hormonal pattern involving persistent cycle irregularity, androgenic signs (like persistent acne or facial hair), and ovarian follicle patterns. Only a qualified doctor can diagnose it with proper tests!";
      } else if (lower.includes("period") || lower.includes("cycle") || lower.includes("bleed")) {
        fallbackText =
          "Periods can take 1 to 2 years after your very first cycle to settle into a predictable rhythm. A 28–30 day cycle is common, while repeated unusual patterns or 90 days without a period should be discussed with a doctor.";
      } else if (
        lower.includes("pain") ||
        lower.includes("cramp") ||
        lower.includes("heavy") ||
        lower.includes("help") ||
        lower.includes("emergency") ||
        lower.includes("faint") ||
        lower.includes("harm") ||
        lower.includes("abuse")
      ) {
        fallbackText =
          "If you're dealing with severe abdominal pain, fainting, extremely heavy bleeding (soaking a pad in an hour), self-harm, or safety concerns, please pause and reach out to a trusted adult, doctor, or emergency support immediately.";
      } else if (lower.includes("acne") || lower.includes("hair") || lower.includes("skin")) {
        fallbackText =
          "Acne and hair updates are super common during puberty as hormones shift. If acne is persistent or severe, a doctor or dermatologist can help guide you.";
      } else {
        fallbackText = `I hear you! Regarding "${query}": body updates can bring up lots of questions. Feel free to ask about period timing, mood shifts, or PCOS signals!`;
      }

      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: fallbackText,
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  }

  return (
    <div className={`game-background ${reducedMotion ? "reduced-motion" : ""}`}>
      {/* BACKGROUND IMAGE LAYER */}
      <img
        src={cycleWellnessArt}
        alt="Cycle Wellness Background"
        className="game-bg-image-layer"
      />

      {/* DYNAMIC 3D COSMOS CANVAS BACKGROUND */}
      <Dynamic3DCosmosCanvas />

      {/* TOP HUD BAR */}
      <header className="game-hud">
        <div className="hud-left">
          <button className="logo-button" onClick={() => setScreen("island")}>
            <div className="logo-icon">
              <IconEnergyCore size={22} color="#FFF" />
            </div>
            <span>BODYQUEST</span>
          </button>
          <span className="hud-badge">PCOS DIAGNOSTIC LAB</span>
        </div>

        <div className="hud-right">
          <div className={`stat-pill xp-pill ${xpPulse ? "xp-pulse" : ""}`}>
            <IconEnergyCore size={16} color="#FFD166" />
            <span>{xp} XP</span>
          </div>

          <div className="stat-pill mission-pill">
            <span>🎯 {missions.length}/6 MISSIONS</span>
          </div>

          <button
            className="icon-btn"
            title="Toggle Reduced Motion"
            onClick={() => setReducedMotion(!reducedMotion)}
          >
            {reducedMotion ? "⚡" : "✨"}
          </button>

          <button className="icon-btn" title="Reset Quest Progress" onClick={resetGame}>
            🔄
          </button>

          <button className="bro-hud-trigger" onClick={() => setShowBroDrawer(true)}>
            <IconCrystalOrb size={18} color="#FF5E7E" />
            <span>Ask Bro</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="container">
        {/* SCREEN 1: ISLAND MAP / EXPLORE */}
        {screen === "island" && (
          <>
            {/* HERO SECTION */}
            <section className="hero">
              <div className="hero-copy">
                <div className="eyebrow">
                  <IconEnergyCore size={14} color="#FF5E7E" />
                  <span>🪐 PCOS DIAGNOSTIC & SIGNAL COMPANION</span>
                </div>
                <h1>Decode your body signals. Navigate your PCOS diagnostic path.</h1>
                <p className="hero-description">
                  Welcome to BodyQuest! Explore 6 interactive zones to decode PCOS signals,
                  track symptom patterns, and prepare for a diagnostic evaluation with a healthcare professional.
                </p>

                <div className="hero-actions">
                  <button
                    className="primary-button"
                    onClick={() => {
                      setScreen("spawn");
                      awardXp(50, "spawn");
                    }}
                  >
                    <span>Start Main Quest →</span>
                  </button>
                  <button
                    className="secondary-button"
                    onClick={() => setShowBroDrawer(true)}
                  >
                    <span>Talk to Bro 💬</span>
                  </button>
                </div>

                <div className="quest-preview-card">
                  <div className="quest-info">
                    <span>CURRENT QUEST</span>
                    <strong>PCOS Diagnostic Signal Quest</strong>
                  </div>
                  <div className="progress-bar-wrap">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${(missions.length / 6) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* VISUAL HERO PORTRAIT CARD WITH 3D HOVER TILT */}
              <div className="hero-art-showcase">
                <div
                  className="hero-portrait-card"
                  onMouseMove={handleCard3DTilt}
                  onMouseLeave={handleCard3DReset}
                >
                  <img
                    src={heroNeonPortrait}
                    alt="BodyQuest Afro-Futuristic Hero Guide"
                    className="hero-portrait-img"
                  />
                  <div className="hero-art-overlay">
                    <span className="hero-art-badge">✨ PCOS DIAGNOSTIC COMPANION</span>
                    <h3 className="hero-art-caption">PCOS Signal Decoder</h3>
                  </div>
                </div>
              </div>
            </section>

            {/* QUEST MAP GRID */}
            <section className="map-section">
              <div className="section-header">
                <div className="eyebrow">🗺 HORMONE ISLAND WORLD ZONES</div>
                <h2>Select a Mission, Bro.</h2>
                <p>Click any island location to start an interactive health activity.</p>
              </div>

              <div className="zone-grid">
                {ZONES.map((zone) => {
                  const isDone = missions.includes(zone.id);
                  return (
                    <button
                      key={zone.id}
                      className={`zone-card ${zone.color} ${isDone ? "completed" : ""}`}
                      onMouseMove={handleCard3DTilt}
                      onMouseLeave={handleCard3DReset}
                      onClick={() => {
                        setScreen(zone.id);
                      }}
                    >
                      <div className="zone-header">
                        <div className="zone-icon-wrap">
                          <ZoneIcon type={zone.iconType} />
                        </div>
                        <span className={`zone-status-badge ${isDone ? "done" : "new"}`}>
                          {isDone ? "✓ COMPLETED" : "ACTIVE"}
                        </span>
                      </div>

                      <div className="zone-body">
                        <h3>{zone.title}</h3>
                        <p>{zone.description}</p>
                      </div>

                      <div className="zone-footer">
                        <span className="zone-xp-reward">+{zone.rewardXp} XP</span>
                        <span className="zone-action-btn">
                          {isDone ? "Revisit Zone →" : "Enter Zone →"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          </>
        )}

        {/* SCREEN 2: SPAWN POINT */}
        {screen === "spawn" && (
          <section className="glass-panel quiz-shell">
            <div className="zone-art-banner">
              <img src={heroNeonPortrait} alt="Spawn Point Art" className="zone-art-img" />
            </div>

            <div className="eyebrow">
              <IconEnergyCore size={14} color="#00E676" />
              <span>ZONE 01 · SPAWN POINT</span>
            </div>
            <h2>What is Adolescence?</h2>
            <p className="hero-description">
              Adolescence is your body and brain installing a huge system update.
              Hormones like estrogen, progesterone, and androgens start signaling new growth phases.
            </p>

            <div className="passport-grid" style={{ margin: "30px 0" }}>
              <div className="passport-item">
                <span>⚡ Skin & Hair Update</span>
                <strong>Oil glands activate & body hair develops</strong>
              </div>
              <div className="passport-item">
                <span>🧠 Brain & Sleep Update</span>
                <strong>Melatonin shifts 2 hours later naturally</strong>
              </div>
              <div className="passport-item">
                <span>◒ Menstrual Update</span>
                <strong>Cycles take 1–2 years to find a rhythm</strong>
              </div>
              <div className="passport-item">
                <span>🔮 Mood & Emotion Update</span>
                <strong>Limbic system matures faster than prefrontal cortex</strong>
              </div>
            </div>

            <div className="hero-actions" style={{ justifyContent: "center" }}>
              <button
                className="primary-button"
                onClick={() => {
                  setScreen("bodylab");
                  awardXp(75, "bodylab");
                }}
              >
                Next: Enter Body Lab →
              </button>
              <button className="secondary-button" onClick={() => setScreen("island")}>
                Return to Map
              </button>
            </div>
          </section>
        )}

        {/* SCREEN 3: BODY LAB (SIGNAL SORTER) */}
        {screen === "bodylab" && (
          <section className="glass-panel sorter-shell">
            <div className="eyebrow">
              <IconDnaCore size={14} color="#FF5E7E" />
              <span>ZONE 02 · BODY LAB</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)" }}>Signal Sorter Challenge</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>
              Sort each body change card into the right category. Earn XP for learning patterns!
            </p>

            <div className="sorter-card-deck">
              <div className="sorter-active-card">
                <div className="sorter-card-tag">CARD {sorterIndex + 1} OF {SORTER_CARDS.length}</div>
                <div className="sorter-card-title">{SORTER_CARDS[sorterIndex].title}</div>
                <div className="sorter-card-desc">{SORTER_CARDS[sorterIndex].description}</div>
              </div>
            </div>

            {!sorterFeedback ? (
              <div className="sorter-buckets">
                <button
                  className="sorter-bucket-btn puberty"
                  onClick={() => handleSortChoice("puberty")}
                >
                  <IconEnergyCore size={20} color="#00E676" />
                  <span>Common during Puberty</span>
                </button>
                <button
                  className="sorter-bucket-btn pattern"
                  onClick={() => handleSortChoice("pattern")}
                >
                  <IconLunarCore size={20} color="#FFD166" />
                  <span>Track the Pattern</span>
                </button>
                <button
                  className="sorter-bucket-btn pro"
                  onClick={() => handleSortChoice("pro")}
                >
                  <IconDnaCore size={20} color="#FF5E7E" />
                  <span>Talk to a Professional</span>
                </button>
                <button
                  className="sorter-bucket-btn urgent"
                  onClick={() => handleSortChoice("urgent")}
                >
                  <IconCrossPulse size={20} color="#FF3366" />
                  <span>Urgent Human Support</span>
                </button>
              </div>
            ) : (
              <div className={`myth-feedback-box ${sorterFeedback.isCorrect ? "good" : "bad"}`}>
                <strong>{sorterFeedback.isCorrect ? "W move! +15 XP" : "Learning Moment!"}</strong>
                <p>{sorterFeedback.text}</p>
                <button className="primary-button" onClick={nextSorterCard}>
                  {sorterIndex < SORTER_CARDS.length - 1 ? "Next Card →" : "Complete Mission →"}
                </button>
              </div>
            )}

            <div style={{ marginTop: "30px", textAlign: "center" }}>
              <button className="secondary-button" onClick={() => setScreen("island")}>
                Return to Map
              </button>
            </div>
          </section>
        )}

        {/* SCREEN 4: CYCLE CITY (TIMELINE & MYTH ARCADE) */}
        {screen === "cyclecity" && (
          <section className="glass-panel cycle-timeline-shell">
            <div className="zone-art-banner">
              <img src={cycleWellnessArt} alt="Cycle Wellness Illustration" className="zone-art-img" />
            </div>

            <div className="eyebrow">
              <IconLunarCore size={14} color="#00F2FE" />
              <span>ZONE 03 · CYCLE CITY</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)" }}>Interactive Cycle Timeline</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>
              Click each phase to decode what happens in a standard 28-day menstrual cycle.
            </p>

            <div className="cycle-phases-grid">
              {Object.keys(CYCLE_PHASES).map((key) => {
                const p = CYCLE_PHASES[key];
                return (
                  <button
                    key={key}
                    className={`phase-tab ${cyclePhase === key ? "active" : ""}`}
                    onClick={() => setCyclePhase(key)}
                  >
                    <div className="days">{p.days}</div>
                    <h4>{p.name}</h4>
                  </button>
                );
              })}
            </div>

            <div className="phase-details-box">
              <h3 style={{ color: CYCLE_PHASES[cyclePhase].color, margin: "0 0 10px 0" }}>
                {CYCLE_PHASES[cyclePhase].name} ({CYCLE_PHASES[cyclePhase].days})
              </h3>
              <p style={{ color: "var(--text-main)", fontSize: "1.05rem", lineHeight: "1.6" }}>
                {CYCLE_PHASES[cyclePhase].summary}
              </p>
              <div className="source-pill" style={{ marginTop: "10px" }}>
                💡 Pro Tip: {CYCLE_PHASES[cyclePhase].tip}
              </div>
            </div>

            {/* MYTH OR FACT SIDE QUEST */}
            <div className="glass-panel myth-card" style={{ marginTop: "40px" }}>
              <div className="eyebrow">🎯 SIDE QUEST · MYTH OR FACT</div>
              <div className="myth-statement">"{MYTHS[mythIndex].statement}"</div>

              {!mythFeedback ? (
                <div className="myth-options">
                  <button className="myth-btn fact" onClick={() => handleMythAnswer("FACT")}>
                    FACT
                  </button>
                  <button className="myth-btn myth" onClick={() => handleMythAnswer("MYTH")}>
                    MYTH
                  </button>
                </div>
              ) : (
                <div className={`myth-feedback-box ${mythFeedback.isCorrect ? "good" : "bad"}`}>
                  <strong>{mythFeedback.isCorrect ? "W move! +25 XP" : "Good Attempt!"}</strong>
                  <p>{mythFeedback.text}</p>
                  <button className="primary-button" onClick={nextMythCard}>
                    Next Challenge →
                  </button>
                </div>
              )}
            </div>

            <div style={{ marginTop: "30px", textAlign: "center" }}>
              <button className="secondary-button" onClick={() => setScreen("island")}>
                Return to Map
              </button>
            </div>
          </section>
        )}

        {/* SCREEN 5: MOOD ARCADE */}
        {screen === "moodarcade" && (
          <section className="glass-panel mood-grounder-shell">
            <div className="zone-art-banner">
              <img src={moodZenArt} alt="Mood Zen Illustration" className="zone-art-img" />
            </div>

            <div className="eyebrow">
              <IconCrystalOrb size={14} color="#C792EA" />
              <span>ZONE 04 · MOOD ARCADE</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)" }}>4-7-8 Rhythm Breathing Orb</h2>
            <p style={{ color: "var(--text-muted)" }}>
              Hormone shifts can impact nervous system arousal. Practice grounding breathwork.
            </p>

            <div className="breathing-orb-wrap">
              <div
                className={`breathing-orb ${isBreathingActive ? breathingPhase.toLowerCase() : ""}`}
              />
            </div>

            <div className="breathing-prompt">
              {isBreathingActive ? `${breathingPhase} (${breathingCount}s)` : "Press Start to Begin"}
            </div>
            <p className="breathing-sub">
              {breathingPhase === "Inhale" && "Breathe in deeply through your nose..."}
              {breathingPhase === "Hold" && "Hold your breath gently..."}
              {breathingPhase === "Exhale" && "Exhale completely through your mouth..."}
              {breathingPhase === "Ready" && "Follow the expanding orb rhythm."}
            </p>

            <div className="hero-actions" style={{ justifyContent: "center", marginTop: "30px" }}>
              <button
                className="primary-button"
                onClick={toggleBreathing}
              >
                {isBreathingActive ? "Pause Grounding" : "Start 4-7-8 Breathing"}
              </button>
              <button className="secondary-button" onClick={() => setScreen("island")}>
                Return to Map
              </button>
            </div>
          </section>
        )}

        {/* SCREEN 6: PCOS SIGNAL LAB */}
        {screen === "pcoslab" && (
          <section className="glass-panel quiz-shell">
            <div className="eyebrow">
              <IconSaturnCore size={14} color="#FFD166" />
              <span>ZONE 05 · PCOS SIGNAL LAB</span>
            </div>
            <h2>Structured Signal Check-In</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>
              Educational check-in only. No diagnosis cosplay. A qualified healthcare professional makes a diagnosis.
            </p>

            <div className="progress-dots">
              {QUIZ_QUESTIONS.map((q, idx) => (
                <div
                  key={q.id}
                  className={`progress-dot ${idx <= questionIndex ? "active" : ""}`}
                />
              ))}
            </div>

            <div className="quiz-card glass-panel">
              <div className="hud-badge" style={{ marginBottom: "16px" }}>
                QUESTION {questionIndex + 1} OF {QUIZ_QUESTIONS.length}
              </div>
              <h2>{currentQuestion.question}</h2>
              <p className="quiz-help">{currentQuestion.help}</p>

              <div className="quiz-answers">
                <button className="quiz-ans-btn" onClick={() => handleAnswer(true)}>
                  Yes, that's me
                </button>
                <button className="quiz-ans-btn" onClick={() => handleAnswer(false)}>
                  Nope
                </button>
              </div>
            </div>

            <div style={{ marginTop: "24px", textAlign: "center" }}>
              <button className="secondary-button" onClick={() => setScreen("island")}>
                Return to Map
              </button>
            </div>
          </section>
        )}

        {/* SCREEN 7: CARE PASSPORT RESULT / CARE PORTAL */}
        {(screen === "result" || screen === "careportal") && (
          <section className="glass-panel result-shell">
            {(() => {
              const res = getPcosResult();
              const signalCount = [
                answers.cycles,
                answers.hair,
                answers.acne,
                answers.metabolic,
              ].filter(Boolean).length;

              return (
                <>
                  <div className="eyebrow">
                    <IconCrossPulse size={14} color="#FF5E7E" />
                    <span>ZONE 06 · CARE PORTAL</span>
                  </div>
                  <h2>{res.title}</h2>

                  {answers.urgent && (
                    <div className="urgent-banner">
                      <h3>🚨 Urgent Support Recommended</h3>
                      <p>{res.text}</p>
                    </div>
                  )}

                  {!answers.urgent && (
                    <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", margin: "16px 0" }}>
                      {res.text}
                    </p>
                  )}

                  <div className="passport-card">
                    <div className="eyebrow">📋 YOUR CARE PASSPORT</div>
                    <div className="passport-grid">
                      <div className="passport-item">
                        <span>PCOS Signals Reported</span>
                        <strong>{signalCount} / 4 Signals</strong>
                      </div>
                      <div className="passport-item">
                        <span>Status Classification</span>
                        <strong>{res.statusTag}</strong>
                      </div>
                      <div className="passport-item">
                        <span>Recommended Next Step</span>
                        <strong>{res.nextMove}</strong>
                      </div>
                      <div className="passport-item">
                        <span>Questions to Ask a Doctor</span>
                        <strong>"How can I track my cycle pattern?"</strong>
                      </div>
                    </div>
                  </div>

                  <div className="hero-actions" style={{ justifyContent: "center" }}>
                    <button className="primary-button" onClick={() => setScreen("island")}>
                      Back to Map
                    </button>
                    <button className="secondary-button" onClick={() => setShowEvidence(true)}>
                      Why this result? (Evidence Card)
                    </button>
                  </div>
                </>
              );
            })()}
          </section>
        )}
      </main>

      {/* BRO COMPANION CHAT DRAWER */}
      {showBroDrawer && (
        <div className="bro-drawer-backdrop" onClick={() => setShowBroDrawer(false)}>
          <aside className="bro-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="bro-header">
              <div className="bro-profile">
                <div className="bro-avatar">
                  <IconCrystalOrb size={22} color="#FFF" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontFamily: "var(--font-heading)" }}>Bro ⚡ Companion</h3>
                  <span style={{ fontSize: "0.75rem", color: "var(--emerald)" }}>● Online · Safe Guide</span>
                </div>
              </div>
              <button className="icon-btn" onClick={() => setShowBroDrawer(false)}>
                ×
              </button>
            </div>

            <div className="bro-chat-body">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`chat-bubble ${msg.role}`}>
                  {msg.content}
                </div>
              ))}
              {chatLoading && <div className="chat-bubble assistant">Bro is typing...</div>}
            </div>

            <form className="bro-chat-form" onSubmit={handleSendChat}>
              <input
                className="bro-input"
                placeholder="Ask Bro: What is PCOS?"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button className="primary-button" type="submit" style={{ padding: "12px 18px" }}>
                Send
              </button>
            </form>
          </aside>
        </div>
      )}

      {/* EVIDENCE DRAWER */}
      {showEvidence && (
        <div className="evidence-backdrop" onClick={() => setShowEvidence(false)}>
          <aside className="evidence-drawer" onClick={(e) => e.stopPropagation()}>
            <button
              className="icon-btn"
              style={{ position: "absolute", top: "20px", right: "20px" }}
              onClick={() => setShowEvidence(false)}
            >
              ×
            </button>
            <div className="eyebrow">📚 EVIDENCE CARD</div>
            <h2 style={{ fontFamily: "var(--font-heading)" }}>Why This Matters</h2>
            <p style={{ color: "var(--text-muted)", lineHeight: "1.6" }}>
              PCOS evaluation in adolescents considers persistent menstrual irregularity alongside clinical or biochemical androgenic features (like persistent acne or excess hair growth), while other causes must be excluded.
            </p>
            <p style={{ color: "var(--text-muted)", lineHeight: "1.6" }}>
              This app provides educational guidance to help adolescents decode their body updates and prepare for conversations with healthcare professionals.
            </p>
            <div className="source-pill">
              2023 International PCOS Guideline · WHO Menstrual-Health Education · NIH Puberty Guidelines
            </div>
          </aside>
        </div>
      )}

      {/* FLOATING XP TOAST NOTIFICATIONS */}
      <div className="xp-toast-wrap">
        {toasts.map((t) => (
          <div key={t.id} className="xp-toast">
            ⚡ {t.text}
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <footer className="container">
        <div>⚡ BODYQUEST — HORMONE ISLAND · Gen-Z Health Education</div>
        <div>Educational prototype — Not medical advice. No diagnosis cosplay.</div>
      </footer>
    </div>
  );
}