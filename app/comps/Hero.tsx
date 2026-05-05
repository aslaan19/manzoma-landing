/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { BookOpen, Coins, LineChart, Users } from "lucide-react";

const COLORS = {
  petroleum: "#124f45",
  gold: "#C7A856",
  crimson: "#972B28",
  rose: "#B18083",
  white: "#FFFFFF",
  offwhite: "#F8F6F1",
  border: "#E8E4DC",
  ink: "#0D1F21",
  inkSoft: "#2E4547",
  inkMuted: "#6B7C7D",
};

const elements = [
  {
    ar: "المعرفة",
    desc: "أساس الإدراك",
    en: "Knowledge",
    accent: COLORS.rose,
    number: "01",
    icon: (color: string) => (
      <BookOpen size={26} stroke={color} strokeWidth={1.4} />
    ),
  },
  {
    ar: "الحافز  \u00A0المالي",
    desc: "شرارة الانطلاق",
    en: "Financial Drive",
    accent: COLORS.gold,
    number: "02",
    icon: (color: string) => (
      <Coins size={26} stroke={color} strokeWidth={1.4} />
    ),
  },
  {
    ar: "الإقتصاد",
    desc: "لغة القيمة",
    en: "Economy",
    accent: COLORS.petroleum,
    number: "03",
    icon: (color: string) => (
      <LineChart size={26} stroke={color} strokeWidth={1.4} />
    ),
  },
  {
    ar: "الديموغرافيا",
    desc: "فهم الإنسان",
    en: "Demographics",
    accent: COLORS.crimson,
    number: "04",
    icon: (color: string) => (
      <Users size={26} stroke={color} strokeWidth={1.4} />
    ),
  },
];

function useTyping(words: string[], speed = 85, pause = 2000) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((i) => i + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((i) => i - 1), speed / 2);
    } else {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    }
    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

type Phase =
  | "curtain"
  | "logo"
  | "divider"
  | "headline"
  | "pillars"
  | "cta"
  | "done";

export default function Hero() {
  const [phase, setPhase] = useState<Phase>("curtain");
  const [loaded, setLoaded] = useState(false);
  const [activeEl, setActiveEl] = useState(0);
  const [hoveredEl, setHoveredEl] = useState<number | null>(null);
  const [logoHovered, setLogoHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  const typedWord = useTyping(
    elements.map((e) => e.ar),
    85,
    1800,
  );

  // ── CINEMATIC ENTRANCE SEQUENCE ──
  useEffect(() => {
    const timings: [Phase, number][] = [
      ["logo", 900],
      ["divider", 1700],
      ["headline", 2050],
      ["pillars", 2400],
      ["cta", 2900],
      ["done", 3300],
    ];
    const timers = timings.map(([p, ms]) =>
      setTimeout(() => {
        setPhase(p);
        if (p === "done") setLoaded(true);
      }, ms),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const idx = elements.findIndex(
      (e) => e.ar.startsWith(typedWord.slice(0, 3)) && typedWord.length > 2,
    );
    if (idx >= 0) setActiveEl(idx);
  }, [typedWord]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const currentAccent = elements[activeEl]?.accent || COLORS.petroleum;

  const isAfter = (p: Phase, target: Phase): boolean => {
    const order: Phase[] = [
      "curtain",
      "logo",
      "divider",
      "headline",
      "pillars",
      "cta",
      "done",
    ];
    return order.indexOf(p) >= order.indexOf(target);
  };

  const contentStyle = (
    targetPhase: Phase,
    delayOffset = 0,
  ): React.CSSProperties => ({
    opacity: isAfter(phase, targetPhase) ? 1 : 0,
    transform: isAfter(phase, targetPhase)
      ? "translateY(0)"
      : "translateY(28px)",
    transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delayOffset}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delayOffset}ms`,
  });

  return (
    <section
      id="home"
      ref={sectionRef}
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: COLORS.offwhite,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ══════════════════════════════════════════
          CINEMATIC CURTAIN — lifts on load
      ══════════════════════════════════════════ */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: COLORS.offwhite,
          transformOrigin: "top center",
          animation:
            "curtainLift 1s cubic-bezier(0.76,0,0.24,1) 0.05s forwards",
          pointerEvents: phase === "curtain" ? "all" : "none",
        }}
      />
      {/* Gold sweep line that rides the curtain edge */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          height: 2,
          zIndex: 10000,
          background: `linear-gradient(90deg, transparent 0%, ${COLORS.gold} 30%, ${COLORS.white} 50%, ${COLORS.gold} 70%, transparent 100%)`,
          animation:
            "goldLineSweep 1s cubic-bezier(0.76,0,0.24,1) 0.05s forwards",
          pointerEvents: "none",
        }}
      />

      {/* ══════════════════════════════════════════
          BACKGROUND SYSTEM
      ══════════════════════════════════════════ */}

      {/* Noise texture */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          opacity: 0.4,
        }}
      />

      {/* Grid */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          backgroundImage: `linear-gradient(${COLORS.petroleum}04 1px, transparent 1px), linear-gradient(90deg, ${COLORS.petroleum}04 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />

      {/* Mouse radial */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 2,
          background: `radial-gradient(ellipse 55% 45% at ${mousePos.x}% ${mousePos.y}%, ${COLORS.petroleum}06 0%, transparent 70%)`,
          transition: "background 0.8s ease",
        }}
      />

      {/* Petroleum ambient */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "35%",
          right: "20%",
          width: "50vw",
          height: "50vw",
          maxWidth: 640,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.petroleum}08 0%, transparent 65%)`,
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Gold ambient */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "10%",
          left: "10%",
          width: "35vw",
          height: "35vw",
          maxWidth: 480,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.gold}07 0%, transparent 65%)`,
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Geo lines top-left */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 3,
          width: 200,
          height: 200,
          opacity: 0.2,
        }}
      >
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
          <line
            x1="0"
            y1="100"
            x2="100"
            y2="0"
            stroke={COLORS.petroleum}
            strokeWidth="0.5"
          />
          <line
            x1="0"
            y1="160"
            x2="160"
            y2="0"
            stroke={COLORS.petroleum}
            strokeWidth="0.5"
          />
          <line
            x1="0"
            y1="200"
            x2="200"
            y2="0"
            stroke={COLORS.gold}
            strokeWidth="0.5"
          />
          <circle
            cx="0"
            cy="0"
            r="80"
            stroke={COLORS.petroleum}
            strokeWidth="0.5"
            fill="none"
          />
          <circle
            cx="0"
            cy="0"
            r="140"
            stroke={COLORS.petroleum}
            strokeWidth="0.5"
            fill="none"
          />
        </svg>
      </div>

      {/* Geo lines bottom-right */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          pointerEvents: "none",
          zIndex: 3,
          width: 280,
          height: 280,
          opacity: 0.15,
        }}
      >
        <svg width="280" height="280" viewBox="0 0 280 280" fill="none">
          <circle
            cx="280"
            cy="280"
            r="120"
            stroke={COLORS.petroleum}
            strokeWidth="0.5"
            fill="none"
          />
          <circle
            cx="280"
            cy="280"
            r="200"
            stroke={COLORS.gold}
            strokeWidth="0.5"
            fill="none"
          />
          <line
            x1="280"
            y1="0"
            x2="0"
            y2="280"
            stroke={COLORS.petroleum}
            strokeWidth="0.5"
          />
          <line
            x1="280"
            y1="80"
            x2="80"
            y2="280"
            stroke={COLORS.gold}
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Dot matrix top-right */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "6%",
          right: "2%",
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
          gap: 14,
          opacity: 0.1,
          pointerEvents: "none",
          zIndex: 3,
        }}
      >
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 3,
              height: 3,
              borderRadius: "50%",
              background: COLORS.petroleum,
            }}
          />
        ))}
      </div>

      {/* Dot matrix bottom-left */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "12%",
          left: "2%",
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 14,
          opacity: 0.08,
          pointerEvents: "none",
          zIndex: 3,
        }}
      >
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 3,
              height: 3,
              borderRadius: "50%",
              background: COLORS.gold,
            }}
          />
        ))}
      </div>

      {/* Vertical rule */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "15%",
          left: 40,
          bottom: "15%",
          width: 1,
          background: `linear-gradient(to bottom, transparent, ${COLORS.petroleum}20 30%, ${COLORS.petroleum}20 70%, transparent)`,
          pointerEvents: "none",
          zIndex: 3,
        }}
      />
      {[0.2, 0.4, 0.6, 0.8].map((pct, i) => (
        <div
          key={i}
          aria-hidden
          style={{
            position: "absolute",
            top: `calc(15% + ${pct * 70}%)`,
            left: 34,
            width: 12,
            height: 1,
            background: `${COLORS.petroleum}30`,
            pointerEvents: "none",
            zIndex: 3,
          }}
        />
      ))}

      {/* ══════════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════════ */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "100px 48px 48px",
          position: "relative",
          zIndex: 10,
          textAlign: "center",
        }}
      >
        {/* ── LOGO ── */}
        <div
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          style={{
            position: "relative",
            width: "clamp(240px, 56vw, 580px)",
            marginTop: "-6%",
            marginBottom: 4,
            cursor: "default",
            opacity: isAfter(phase, "logo") ? 1 : 0,
            filter: isAfter(phase, "logo") ? "blur(0px)" : "blur(16px)",
            transform: isAfter(phase, "logo") ? "scale(1)" : "scale(0.92)",
            transition:
              "opacity 1.1s cubic-bezier(0.16,1,0.3,1), filter 1.1s cubic-bezier(0.16,1,0.3,1), transform 1.1s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* Outermost wide halo */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: "-40% -22%",
              pointerEvents: "none",
              zIndex: 0,
              borderRadius: "50%",
              background: `radial-gradient(ellipse 62% 48% at 50% 50%, ${COLORS.petroleum}1c 0%, ${COLORS.petroleum}09 42%, transparent 68%)`,
              filter: "blur(24px)",
              opacity: logoHovered ? 0.1 : 0,
              transition: "opacity 0.85s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
          {/* Mid halo */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: "-24% -12%",
              pointerEvents: "none",
              zIndex: 0,
              borderRadius: "48%",
              background: `radial-gradient(ellipse 58% 44% at 50% 50%, ${COLORS.gold}16 0%, ${COLORS.gold}07 48%, transparent 68%)`,
              filter: "blur(13px)",
              opacity: logoHovered ? 0.1 : 0,
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.07s",
            }}
          />
          {/* Core halo */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: "-12% -6%",
              pointerEvents: "none",
              zIndex: 0,
              borderRadius: "38%",
              background: `radial-gradient(ellipse 54% 40% at 50% 50%, ${COLORS.petroleum}2a 0%, ${COLORS.petroleum}0e 52%, transparent 72%)`,
              filter: "blur(3px)",
              opacity: logoHovered ? 0.1 : 0,
              transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          />
          {/* Bottom spill */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              bottom: "-52%",
              left: "8%",
              right: "8%",
              height: "58%",
              pointerEvents: "none",
              zIndex: 0,
              background: `radial-gradient(ellipse 78% 100% at 50% 0%, ${COLORS.petroleum}16 0%, ${COLORS.gold}08 44%, transparent 70%)`,
              filter: "blur(18px)",
              opacity: logoHovered ? 0.1 : 0,
              transition: "opacity 0.95s cubic-bezier(0.16,1,0.3,1) 0.13s",
            }}
          />

          {/* Logo image */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              transition: "transform 0.55s cubic-bezier(0.16,1,0.3,1)",
              transform: logoHovered ? "scale(1.015)" : "scale(1)",
            }}
          >
            <Image
              src="/logo.png"
              alt="منظومة - Manzoma"
              width={1380}
              height={340}
              priority
              style={{
                objectFit: "contain",
                width: "100%",
                height: "auto",
                display: "block",
                marginTop: "-12%",
                marginBottom: "-22%",
                transition: "filter 0.55s cubic-bezier(0.16,1,0.3,1)",
                filter: logoHovered
                  ? `brightness(1.07) contrast(1.02) drop-shadow(0 0 6px rgba(18,79,69,0.45)) drop-shadow(0 0 20px rgba(18,79,69,0.28)) drop-shadow(0 0 40px rgba(199,168,86,0.18)) drop-shadow(0 0 70px rgba(18,79,69,0.12))`
                  : "brightness(1) contrast(1)",
              }}
            />
          </div>
        </div>

        {/* ── PREMIUM DIVIDER ── */}
        <div style={{ marginBottom: 36, ...contentStyle("divider") }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: isAfter(phase, "divider") ? 56 : 0,
                height: 1,
                background: `linear-gradient(to right, transparent, ${COLORS.gold})`,
                transition: "width 1.2s cubic-bezier(0.16,1,0.3,1) 200ms",
              }}
            />
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: COLORS.gold,
                opacity: isAfter(phase, "divider") ? 1 : 0,
                transform: isAfter(phase, "divider") ? "scale(1)" : "scale(0)",
                transition: "all 0.6s ease 400ms",
              }}
            />
            <div
              style={{
                width: isAfter(phase, "divider") ? 56 : 0,
                height: 1,
                background: `linear-gradient(to left, transparent, ${COLORS.gold})`,
                transition: "width 1.2s cubic-bezier(0.16,1,0.3,1) 200ms",
              }}
            />
          </div>
        </div>

        {/* ── HEADLINE ── */}
        <div style={{ marginBottom: 8, ...contentStyle("headline") }}>
          <h1
            style={{
              fontFamily: "'Beiruti', sans-serif",
              fontSize: "clamp(54px, 5.2vw, 62px)",
              fontWeight: 800,
              color: COLORS.ink,
              lineHeight: 1.4,
              margin: 0,
              letterSpacing: -0.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              flexWrap: "wrap",
            }}
          >
            <span style={{ color: COLORS.inkMuted, fontWeight: 600 }}>بـ</span>

            {/* Typing word */}
            <span
              style={{
                position: "relative",
                display: "inline-block",
                minWidth: "clamp(110px, 14vw, 200px)",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  inset: "-8px -10px",
                  borderRadius: 40,
                  background: currentAccent,
                  opacity: 0.06,
                  filter: "blur(6px)",
                  transition: "background 0.4s ease, opacity 0.4s ease",
                  pointerEvents: "none",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  bottom: 4,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: `${(typedWord.length / 12) * 100}%`,
                  height: 3,
                  borderRadius: 2,
                  background: `linear-gradient(90deg, ${currentAccent}40, ${currentAccent})`,
                  transition: "width 0.15s ease, background 0.4s ease",
                }}
              />
              <span
                style={{
                  color: currentAccent,
                  transition: "color 0.4s ease",
                  position: "relative",
                }}
              >
                {typedWord}
                <span
                  style={{
                    display: "inline-block",
                    width: 2.5,
                    height: "0.8em",
                    background: currentAccent,
                    marginRight: 4,
                    marginBottom: 2,
                    borderRadius: 2,
                    animation: "cursorBlink 1s ease-in-out infinite",
                    transition: "background 0.4s ease",
                    verticalAlign: "middle",
                  }}
                />
              </span>
            </span>

            <span style={{ color: COLORS.ink }}>نبني النمو</span>
          </h1>
        </div>

        {/* ── HEADLINE LINE 2 ── */}
        <div style={{ marginBottom: 52, ...contentStyle("headline", 100) }}>
          <h1
            style={{
              fontFamily: "'Beiruti', sans-serif",
              fontSize: "clamp(54px, 5.2vw, 62px)",
              fontWeight: 600,
              color: COLORS.ink,
              lineHeight: 1.4,
              margin: 0,
              letterSpacing: -0.5,
            }}
          >
            ونحول الفجوات إلى{" "}
            <span
              style={{
                color: COLORS.petroleum,
                position: "relative",
                display: "inline-block",
                fontSize: "clamp(34px, 4.6vw, 60px)",
                fontWeight: 900,
              }}
            >
              قيمة
              <span
                style={{
                  position: "absolute",
                  bottom: 2,
                  left: 0,
                  right: 0,
                  height: 3,
                  borderRadius: 2,
                  background: `linear-gradient(90deg, ${COLORS.petroleum}, ${COLORS.petroleum}50)`,
                  opacity: 0.4,
                }}
              />
            </span>
          </h1>
        </div>

        {/* ── 4 PILLARS ── */}
        <div style={{ width: "100%", maxWidth: 900, marginBottom: 48 }}>
          {/* Label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 20,
              justifyContent: "center",
              ...contentStyle("pillars"),
            }}
          >
            <div
              style={{
                flex: 1,
                maxWidth: 80,
                height: 1,
                background: `linear-gradient(to right, transparent, ${COLORS.border})`,
              }}
            />
            <span
              style={{
                fontFamily: "'Beiruti', sans-serif",
                fontSize: 30,
                fontWeight: 500,
                color: COLORS.inkMuted,
                letterSpacing: "0.2em",
              }}
            >
              ركائز منظومة
            </span>
            <div
              style={{
                flex: 1,
                maxWidth: 80,
                height: 1,
                background: `linear-gradient(to left, transparent, ${COLORS.border})`,
              }}
            />
          </div>

          {/* Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 12,
            }}
            className="pillars-grid"
          >
            {elements.map((el, i) => {
              const isActive = activeEl === i;
              const isHovered = hoveredEl === i;
              const highlight = isActive || isHovered;
              return (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredEl(i)}
                  onMouseLeave={() => setHoveredEl(null)}
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 12,
                    padding: "28px 20px 24px",
                    borderRadius: 16,
                    background: highlight
                      ? COLORS.white
                      : `linear-gradient(160deg, ${COLORS.white}80, ${COLORS.offwhite}60)`,
                    border: `1px solid ${highlight ? el.accent + "40" : COLORS.border}`,
                    boxShadow: highlight
                      ? `0 16px 48px ${el.accent}15, 0 4px 16px ${el.accent}10, inset 0 1px 0 ${COLORS.white}`
                      : `0 2px 12px ${COLORS.petroleum}05, inset 0 1px 0 ${COLORS.white}`,
                    transition: "all 0.45s cubic-bezier(0.16,1,0.3,1)",
                    transform: highlight ? "translateY(-6px)" : "translateY(0)",
                    cursor: "pointer",
                    backdropFilter: "blur(8px)",
                    overflow: "hidden",
                    opacity: isAfter(phase, "pillars") ? 1 : 0,
                    animation: isAfter(phase, "pillars")
                      ? `pillCardIn 0.75s cubic-bezier(0.16,1,0.3,1) ${i * 120}ms both`
                      : "none",
                  }}
                >
                  {/* Top accent bar */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "15%",
                      right: "15%",
                      height: 2,
                      background: el.accent,
                      borderRadius: "0 0 4px 4px",
                      opacity: highlight ? 1 : 0,
                      transition: "opacity 0.4s ease",
                    }}
                  />

                  {/* Number tag */}
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      fontFamily: "'Beiruti', sans-serif",
                      fontSize: 14,
                      fontWeight: 600,
                      color: highlight ? el.accent : `${COLORS.inkMuted}60`,
                      letterSpacing: "0.15em",
                      transition: "color 0.4s ease",
                    }}
                  >
                    {el.number}
                  </div>

                  {/* Icon */}
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 14,
                      background: highlight
                        ? `${el.accent}12`
                        : `${el.accent}07`,
                      border: `1px solid ${highlight ? el.accent + "30" : el.accent + "15"}`,
                      transition: "all 0.45s cubic-bezier(0.16,1,0.3,1)",
                      transform: highlight
                        ? "scale(1.08) rotate(-3deg)"
                        : "scale(1) rotate(0deg)",
                    }}
                  >
                    {el.icon(el.accent)}
                  </div>

                  {/* Name */}
                  <p
                    style={{
                      fontFamily: "'Beiruti', sans-serif",
                      fontSize: "clamp(18px, 1.6vw, 20px)",
                      fontWeight: 800,
                      color: highlight ? el.accent : COLORS.ink,
                      margin: 0,
                      textAlign: "center",
                      whiteSpace: "pre",
                      transition: "color 0.4s ease",
                    }}
                  >
                    {el.ar}
                  </p>

                  {/* Desc */}
                  <p
                    style={{
                      fontFamily: "'Beiruti', sans-serif",
                      fontSize: "clamp(12px, 1.1vw, 12.5px)",
                      fontWeight: 500,
                      color: highlight ? `${el.accent}CC` : COLORS.inkMuted,
                      margin: 0,
                      textAlign: "center",
                      transition: "color 0.4s ease",
                      opacity: highlight ? 1 : 0.65,
                    }}
                  >
                    {el.desc}
                  </p>

                  {/* Bottom line */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: "20%",
                      right: "20%",
                      height: 1,
                      background: `linear-gradient(to right, transparent, ${el.accent}30, transparent)`,
                      opacity: highlight ? 1 : 0,
                      transition: "opacity 0.4s ease",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* ── CTAs ── */}
        <div
          style={{
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: 56,
            ...contentStyle("cta"),
          }}
        >
          {/* Primary */}
          <a
            href="#about"
            style={{
              fontFamily: "'Beiruti', sans-serif",
              fontSize: 18,
              fontWeight: 600,
              color: COLORS.white,
              textDecoration: "none",
              background: `linear-gradient(135deg, #01707A, ${COLORS.petroleum})`,
              padding: "14px 48px",
              borderRadius: 999,
              boxShadow: `0 12px 40px ${COLORS.petroleum}35, 0 2px 8px ${COLORS.petroleum}20`,
              transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              border: `1px solid ${COLORS.petroleum}`,
              letterSpacing: "0.01em",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(-3px)";
              el.style.boxShadow = `0 20px 56px ${COLORS.petroleum}40, 0 4px 16px ${COLORS.petroleum}25`;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(0)";
              el.style.boxShadow = `0 12px 40px ${COLORS.petroleum}35, 0 2px 8px ${COLORS.petroleum}20`;
            }}
          >
            <span>اكتشف منظومة</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M3 8 H13 M8 3 L13 8 L8 13"
                transform="scale(-1,1) translate(-16,0)"
              />
            </svg>
          </a>

          {/* Secondary */}
          <a
            href="#contact"
            style={{
              fontFamily: "'Beiruti', sans-serif",
              fontSize: 18,
              fontWeight: 700,
              color: COLORS.petroleum,
              textDecoration: "none",
              background: COLORS.white,
              border: `1px solid ${COLORS.border}`,
              padding: "14px 40px",
              borderRadius: 999,
              transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              boxShadow: `0 2px 12px ${COLORS.petroleum}06`,
              letterSpacing: "0.01em",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = `${COLORS.petroleum}50`;
              el.style.background = COLORS.offwhite;
              el.style.transform = "translateY(-2px)";
              el.style.boxShadow = `0 8px 24px ${COLORS.petroleum}10`;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = COLORS.border;
              el.style.background = COLORS.white;
              el.style.transform = "translateY(0)";
              el.style.boxShadow = `0 2px 12px ${COLORS.petroleum}06`;
            }}
          >
            تواصل معنا
          </a>
        </div>

        {/* ── SCROLL INDICATOR ── */}
        <div
          style={{
            opacity: isAfter(phase, "done") ? 0.5 : 0,
            transition: "opacity 0.8s ease 600ms",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 7.5,
              fontWeight: 700,
              color: COLORS.inkMuted,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            SCROLL
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <div
              style={{
                width: 1,
                height: 28,
                background: `linear-gradient(to bottom, ${COLORS.petroleum}80, transparent)`,
                animation: "scrollPulse 2.2s ease-in-out infinite",
              }}
            />
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: COLORS.gold,
                animation: "scrollDot 2.2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>

      {/* ── GLOBAL STYLES ── */}
      <style>{`
        @keyframes curtainLift {
          0%   { transform: scaleY(1); opacity: 1; }
          100% { transform: scaleY(0); opacity: 0; }
        }
        @keyframes goldLineSweep {
          0%   { top: 0%;   opacity: 1; }
          80%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes pillCardIn {
          from {
            opacity: 0;
            transform: translateY(32px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50%       { opacity: 1;   transform: scaleY(1.2); }
        }
        @keyframes scrollDot {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50%       { opacity: 1;   transform: translateY(4px); }
        }
        @media (max-width: 900px) {
          .pillars-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 520px) {
          .pillars-grid { grid-template-columns: 1fr 1fr !important; gap: 8px !important; }
        }
      `}</style>
    </section>
  );
}
