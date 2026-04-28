/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const COLORS = {
  petroleum: "#015A62",
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
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="16" cy="9" r="4" fill={`${color}20`} />
        <path d="M11 9 Q9 15 11 18 H21 Q23 15 21 9" />
        <path d="M13 18 L13 22 M19 18 L19 22" />
        <path d="M11 22 H21" />
        <path d="M9 25 H23" />
        <path d="M14 5 L16 3 L18 5" strokeWidth="1" />
      </svg>
    ),
  },
  {
    ar: "الحافز المالي",
    desc: "شرارة الانطلاق",
    en: "Financial Drive",
    accent: COLORS.gold,
    number: "02",
    icon: (color: string) => (
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="16" cy="16" r="11" />
        <circle cx="16" cy="16" r="8" fill={`${color}15`} />
        <path
          d="M16 8 L17.5 12.5 L22 12.5 L18.5 15.5 L20 20 L16 17 L12 20 L13.5 15.5 L10 12.5 L14.5 12.5 Z"
          fill={`${color}30`}
        />
      </svg>
    ),
  },
  {
    ar: "الإقتصاد",
    desc: "لغة القيمة",
    en: "Economy",
    accent: COLORS.petroleum,
    number: "03",
    icon: (color: string) => (
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <ellipse cx="16" cy="24" rx="11" ry="4" fill={`${color}10`} />
        <path d="M5 24 C5 20 27 20 27 24" />
        <path d="M8 21 L8 15" />
        <path d="M12 22 L12 12" />
        <path d="M16 22 L16 8" />
        <path d="M20 22 L20 12" />
        <path d="M24 21 L24 15" />
        <path d="M13 8 L16 5 L19 8" strokeWidth="1" />
        <circle cx="16" cy="8" r="1.5" fill={color} />
      </svg>
    ),
  },
  {
    ar: "الديموغرافيا",
    desc: "فهم الإنسان",
    en: "Demographics",
    accent: COLORS.crimson,
    number: "04",
    icon: (color: string) => (
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="16" cy="8" r="3.5" fill={`${color}20`} />
        <path d="M16 12 L16 20" />
        <path d="M12 14 L16 17 L20 14" />
        <path d="M10 26 L16 20 L22 26" />
        <path d="M8 16 Q6 20 8 24" strokeDasharray="2 2" />
        <path d="M24 16 Q26 20 24 24" strokeDasharray="2 2" />
        <path d="M12 28 L20 28" strokeWidth="1.5" />
      </svg>
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

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [activeEl, setActiveEl] = useState(0);
  const [hoveredEl, setHoveredEl] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  const typedWord = useTyping(
    elements.map((e) => e.ar),
    85,
    1800,
  );

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
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

  const stagger = (delay: number): React.CSSProperties => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(32px)",
    transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  const currentAccent = elements[activeEl]?.accent || COLORS.petroleum;

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
      {/* ── LAYERED BACKGROUND SYSTEM ── */}

      {/* Subtle noise texture overlay */}
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

      {/* Precision grid */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          backgroundImage: `
          linear-gradient(${COLORS.petroleum}04 1px, transparent 1px),
          linear-gradient(90deg, ${COLORS.petroleum}04 1px, transparent 1px)
        `,
          backgroundSize: "72px 72px",
        }}
      />

      {/* Dynamic mouse-following radial */}
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

      {/* Static ambient glow — petroleum */}
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

      {/* Static ambient glow — gold */}
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

      {/* Geometric accent lines — top left */}
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

      {/* Geometric accent lines — bottom right */}
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

      {/* Dot matrix — top right */}
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

      {/* Dot matrix — bottom left */}
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

      {/* Vertical rule — left edge */}
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

      {/* Vertical rule tick marks */}
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

      {/* ── MAIN CONTENT ── */}
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
          style={{
            width: "clamp(240px, 32vw, 440px)",
            overflow: "hidden",
            marginTop: "-2%",
            marginBottom: 4,
            ...stagger(160),
          }}
        >
          <Image
            src="/logo.png"
            alt="منظومة - Manzoma"
            width={1040}
            height={840}
            priority
            style={{
              objectFit: "contain",
              width: "100%",
              height: "auto",
              display: "block",
              marginTop: "-8%",
              marginBottom: "-8%",
            }}
          />
        </div>

        {/* ── PREMIUM DIVIDER ── */}
        <div style={{ marginBottom: 36, ...stagger(260) }}>
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
                width: loaded ? 56 : 0,
                height: 1,
                background: `linear-gradient(to right, transparent, ${COLORS.gold})`,
                transition: "width 1.2s cubic-bezier(0.16,1,0.3,1) 400ms",
              }}
            />
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: COLORS.gold,
                opacity: loaded ? 1 : 0,
                transform: loaded ? "scale(1)" : "scale(0)",
                transition: "all 0.6s ease 700ms",
              }}
            />
            <div
              style={{
                width: loaded ? 56 : 0,
                height: 1,
                background: `linear-gradient(to left, transparent, ${COLORS.gold})`,
                transition: "width 1.2s cubic-bezier(0.16,1,0.3,1) 400ms",
              }}
            />
          </div>
        </div>

        {/* ── HEADLINE ── */}
        <div style={{ marginBottom: 8, ...stagger(360) }}>
          <h1
            style={{
              fontFamily: "'Beiruti', sans-serif",
              fontSize: "clamp(30px, 4.5vw, 58px)",
              fontWeight: 900,
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

            {/* Typing word with highlight pill */}
            <span
              style={{
                position: "relative",
                display: "inline-block",
                minWidth: "clamp(110px, 14vw, 200px)",
                textAlign: "center",
              }}
            >
              {/* Underline highlight */}
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
                    marginBottom: -3,
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
        <div style={{ marginBottom: 52, ...stagger(440) }}>
          <h1
            style={{
              fontFamily: "'Beiruti', sans-serif",
              fontSize: "clamp(30px, 4.5vw, 58px)",
              fontWeight: 900,
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
              }}
            >
              قيمة
              {/* Petroleum underline */}
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

        {/* ── 4 PILLARS — PREMIUM CARD STRIP ── */}
        <div
          style={{
            width: "100%",
            maxWidth: 900,
            marginBottom: 48,
            ...stagger(540),
          }}
        >
          {/* Top label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 20,
              justifyContent: "center",
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
                fontSize: 10,
                fontWeight: 700,
                color: COLORS.inkMuted,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
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
                    opacity: loaded ? 1 : 0,
                    animation: loaded
                      ? `fadeSlideUp 0.9s cubic-bezier(0.16,1,0.3,1) ${700 + i * 100}ms both`
                      : "none",
                    backdropFilter: "blur(8px)",
                    overflow: "hidden",
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
                      fontSize: 9,
                      fontWeight: 800,
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
                      fontSize: "clamp(15px, 1.6vw, 18px)",
                      fontWeight: 800,
                      color: highlight ? el.accent : COLORS.ink,
                      margin: 0,
                      textAlign: "center",
                      transition: "color 0.4s ease",
                    }}
                  >
                    {el.ar}
                  </p>

                  {/* Desc */}
                  <p
                    style={{
                      fontFamily: "'Beiruti', sans-serif",
                      fontSize: "clamp(11px, 1.1vw, 12.5px)",
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

                  {/* Bottom separator line */}
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
            ...stagger(860),
          }}
        >
          {/* Primary CTA */}
          <a
            href="#about"
            style={{
              fontFamily: "'Beiruti', sans-serif",
              fontSize: 15,
              fontWeight: 800,
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

          {/* Secondary CTA */}
          <a
            href="#contact"
            style={{
              fontFamily: "'Beiruti', sans-serif",
              fontSize: 15,
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
            opacity: loaded ? 0.5 : 0,
            transition: "opacity 0.8s ease 1400ms",
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

      <style>{`
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
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.7); }
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
