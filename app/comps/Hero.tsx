/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
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
    icon: (color: string) => (
      <svg
        width="44"
        height="44"
        viewBox="0 0 32 32"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
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
    icon: (color: string) => (
      <svg
        width="44"
        height="44"
        viewBox="0 0 32 32"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
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
    icon: (color: string) => (
      <svg
        width="44"
        height="44"
        viewBox="0 0 32 32"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
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
    icon: (color: string) => (
      <svg
        width="44"
        height="44"
        viewBox="0 0 32 32"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
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

  const typedWord = useTyping(
    elements.map((e) => e.ar),
    85,
    1800,
  );

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Sync active element with typed word
  useEffect(() => {
    const idx = elements.findIndex(
      (e) => e.ar.startsWith(typedWord.slice(0, 3)) && typedWord.length > 2,
    );
    if (idx >= 0) setActiveEl(idx);
  }, [typedWord]);

  const stagger = (delay: number): React.CSSProperties => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms`,
  });

  const currentAccent = elements[activeEl]?.accent || COLORS.petroleum;

  return (
    <section
      id="home"
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
      {/* ── BACKGROUNDS ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `
          linear-gradient(${COLORS.petroleum}05 1px, transparent 1px),
          linear-gradient(90deg, ${COLORS.petroleum}05 1px, transparent 1px)
        `,
          backgroundSize: "56px 56px",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80vw",
          height: "80vw",
          maxWidth: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.petroleum}07 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      {/* Dot clusters */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "8%",
          left: "3%",
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 12,
          opacity: 0.12,
          pointerEvents: "none",
        }}
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: COLORS.petroleum,
            }}
          />
        ))}
      </div>
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "18%",
          right: "3%",
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 12,
          opacity: 0.1,
          pointerEvents: "none",
        }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: COLORS.petroleum,
            }}
          />
        ))}
      </div>

      {/* Decorative rings */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          border: `1px solid ${COLORS.petroleum}07`,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: -80,
          left: -80,
          width: 320,
          height: 320,
          borderRadius: "50%",
          border: `1px solid ${COLORS.gold}08`,
          pointerEvents: "none",
        }}
      />

      {/* ── MAIN CONTENT ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "100px 24px 48px",
          position: "relative",
          zIndex: 10,
          textAlign: "center",
        }}
      >
        {/* Logo — BIG */}
        <Image
          src="/logo.png"
          alt="منظومة - Manzoma"
          width={840}
          height={420}
          style={{
            objectFit: "contain",
            width: "clamp(280px, 35vw, 520px)",
            height: "auto",
            mixBlendMode: "multiply", // ← THIS removes the black background
          }}
          priority
        />
        {/* Gold divider */}
        <div style={{ marginBottom: 40, ...stagger(280) }}>
          <div
            style={{
              width: loaded ? 56 : 0,
              height: 2,
              background: COLORS.gold,
              borderRadius: 2,
              margin: "0 auto",
              transition: "width 1s ease 400ms",
            }}
          />
        </div>

        {/* Slogan line 1 — typing + static */}
        <div style={{ marginBottom: 10, ...stagger(380) }}>
          <h1
            style={{
              fontFamily: "'Beiruti', sans-serif",
              fontSize: "clamp(28px, 4vw, 52px)",
              fontWeight: 900,
              color: COLORS.ink,
              lineHeight: 1.45,
              margin: 0,
              letterSpacing: -0.5,
            }}
          >
            <span
              style={{
                color: currentAccent,
                display: "inline-block",
                minWidth: "clamp(120px, 14vw, 200px)",
                textAlign: "right",
                transition: "color 0.4s ease",
              }}
            >
              {typedWord}
              <span
                style={{
                  display: "inline-block",
                  width: 3,
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
            </span>{" "}
            نبني النمو
          </h1>
        </div>

        {/* Slogan line 2 */}
        <div style={{ marginBottom: 44, ...stagger(460) }}>
          <h1
            style={{
              fontFamily: "'Beiruti', sans-serif",
              fontSize: "clamp(28px, 4vw, 52px)",
              fontWeight: 900,
              color: COLORS.ink,
              lineHeight: 1.45,
              margin: 0,
              letterSpacing: -0.5,
            }}
          >
            ونحول الفجوات إلى{" "}
            <span style={{ color: COLORS.petroleum }}>قيمة</span>
          </h1>
        </div>

        {/* ══════════════════════════════════════════
            PILLARS SECTION — Centered with Icons
        ══════════════════════════════════════════ */}
        <div
          style={{
            marginBottom: 48,
            padding: "40px 32px",
            borderRadius: 24,
            background: `linear-gradient(180deg, ${COLORS.white}90 0%, ${COLORS.offwhite}60 100%)`,
            backdropFilter: "blur(12px)",
            border: `1px solid ${COLORS.border}`,
            boxShadow: `0 8px 32px ${COLORS.petroleum}08`,
            ...stagger(560),
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "clamp(24px, 5vw, 64px)",
            }}
            className="pillars-grid"
          >
            {elements.map((el, i) => {
              const isActive = activeEl === i;
              const isHovered = hoveredEl === i;
              const shouldHighlight = isActive || isHovered;

              return (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredEl(i)}
                  onMouseLeave={() => setHoveredEl(null)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 16,
                    cursor: "pointer",
                    padding: "20px 28px",
                    borderRadius: 16,
                    background: shouldHighlight
                      ? `${el.accent}08`
                      : "transparent",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform: shouldHighlight
                      ? "translateY(-4px)"
                      : "translateY(0)",
                    opacity: loaded ? 1 : 0,
                    animation: loaded
                      ? `fadeSlideUp 0.8s ease ${700 + i * 120}ms both`
                      : "none",
                  }}
                >
                  {/* Icon Container with Animation */}
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      background: shouldHighlight
                        ? `${el.accent}12`
                        : `${el.accent}06`,
                      border: `1.5px solid ${shouldHighlight ? el.accent : `${el.accent}30`}`,
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      transform: shouldHighlight ? "scale(1.1)" : "scale(1)",
                      boxShadow: shouldHighlight
                        ? `0 8px 24px ${el.accent}25, 0 0 0 4px ${el.accent}08`
                        : `0 4px 12px ${el.accent}10`,
                    }}
                  >
                    <div
                      style={{
                        transition: "transform 0.4s ease",
                        transform: shouldHighlight ? "scale(1.05)" : "scale(1)",
                      }}
                    >
                      {el.icon(el.accent)}
                    </div>
                  </div>

                  {/* Arabic Name */}
                  <p
                    style={{
                      fontFamily: "'Beiruti', sans-serif",
                      fontSize: "clamp(16px, 2vw, 20px)",
                      fontWeight: 800,
                      color: shouldHighlight ? el.accent : COLORS.ink,
                      margin: 0,
                      textAlign: "center",
                      transition: "color 0.4s ease",
                      letterSpacing: -0.3,
                    }}
                  >
                    {el.ar}
                  </p>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: "'Beiruti', sans-serif",
                      fontSize: "clamp(12px, 1.4vw, 14px)",
                      fontWeight: 500,
                      color: shouldHighlight ? el.accent : COLORS.inkMuted,
                      margin: 0,
                      textAlign: "center",
                      transition: "color 0.4s ease, opacity 0.4s ease",
                      opacity: shouldHighlight ? 1 : 0.7,
                    }}
                  >
                    {el.desc}
                  </p>

                  {/* Accent Line */}
                  <div
                    style={{
                      width: shouldHighlight ? 40 : 0,
                      height: 2,
                      background: el.accent,
                      borderRadius: 2,
                      transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            justifyContent: "center",
            ...stagger(900),
          }}
        >
          <a
            href="#about"
            style={{
              fontFamily: "'Beiruti', sans-serif",
              fontSize: 16,
              fontWeight: 800,
              color: COLORS.white,
              textDecoration: "none",
              background: COLORS.petroleum,
              padding: "14px 44px",
              borderRadius: 999,
              boxShadow: `0 10px 32px ${COLORS.petroleum}30`,
              transition: "all 0.25s ease",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "#01707A";
              el.style.transform = "translateY(-2px)";
              el.style.boxShadow = `0 16px 40px ${COLORS.petroleum}35`;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = COLORS.petroleum;
              el.style.transform = "translateY(0)";
              el.style.boxShadow = `0 10px 32px ${COLORS.petroleum}30`;
            }}
          >
            اكتشف منظومة
          </a>
          <a
            href="#contact"
            style={{
              fontFamily: "'Beiruti', sans-serif",
              fontSize: 16,
              fontWeight: 700,
              color: COLORS.petroleum,
              textDecoration: "none",
              background: "transparent",
              border: `1.5px solid ${COLORS.border}`,
              padding: "13px 36px",
              borderRadius: 999,
              transition: "all 0.25s ease",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = COLORS.petroleum;
              el.style.background = `${COLORS.petroleum}08`;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = COLORS.border;
              el.style.background = "transparent";
            }}
          >
            تواصل معنا
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            marginTop: 48,
            opacity: loaded ? 0.45 : 0,
            transition: "opacity 0.8s ease 1200ms",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 9,
              fontWeight: 700,
              color: COLORS.inkMuted,
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            SCROLL
          </span>
          <div
            style={{
              width: 1,
              height: 40,
              background: `linear-gradient(to bottom, ${COLORS.petroleum}, transparent)`,
              animation: "scrollPulse 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50%       { opacity: 0.9; transform: scaleY(1.15); }
        }
        @keyframes fadeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes iconPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @media (max-width: 768px) {
          .pillars-grid {
            gap: 20px !important;
          }
        }
        @media (max-width: 480px) {
          .pillars-grid {
            flex-direction: column !important;
            align-items: center !important;
          }
        }
      `}</style>
    </section>
  );
}
