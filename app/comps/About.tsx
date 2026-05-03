"use client";

import { useEffect, useRef, useState } from "react";

// ── EXACT 4 BRAND COLORS — unchanged ──
const C = {
  petroleum: "#124f45",
  gold: "#C7A856",
  crimson: "#972B28",
  rose: "#B18083",
  // Neutrals — supporting cast
  white: "#FFFFFF",
  offwhite: "#F8F6F1",
  border: "#E8E4DC",
  borderSoft: "#F0ECE6",
  ink: "#0D1F21 ",
  inkSoft: "#2E4547",
  inkMuted: "#7A8C8D",
};

const keyPoints = [
  {
    ar: "نماذج معرفية حاكمة للقرار",
    en: "Knowledge Models",
    accent: C.petroleum,
  },
  { ar: "تطوير أنظمة معرفية", en: "Knowledge Systems", accent: C.gold },
  {
    ar: "تحويل المعرفة لقيمة اقتصادية",
    en: "Economic Value",
    accent: C.crimson,
  },
  {
    ar: "ابتكار نماذج تطبيقية مؤثرة",
    en: "Applied Innovation",
    accent: C.rose,
  },
];

const stats = [
  {
    value: "8+",
    label: "نموذج معرفي",
    sub: "Knowledge Models",
    accent: C.petroleum,
  },
  { value: "2024", label: "سنة التأسيس", sub: "Founded", accent: C.gold },
  {
    value: "100%",
    label: "تخصص معرفي",
    sub: "Knowledge Focus",
    accent: C.crimson,
  },
];

function useInView(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function About() {
  const { ref, inView } = useInView();
  const [hovered, setHovered] = useState<number | null>(null);

  const vis = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms`,
  });

  const visX = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0)" : "translateX(24px)",
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
  });

  return (
    <section
      id="about"
      dir="rtl"
      ref={ref}
      style={{
        background: C.white,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ══════════════════════════════════════════
          PART 1 — HEADER
          White background. Ink typography.
          4-color line at top. Petroleum used as
          a SINGLE border accent — not a background.
      ══════════════════════════════════════════ */}
      <div
        style={{
          background: C.white,
          borderBottom: `1px solid ${C.border}`,
          padding: "96px 24px 88px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ── 4-color gradient top line ── */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            height: 3,
            background: `linear-gradient(to left, ${C.rose}, ${C.crimson}, ${C.gold}, ${C.petroleum})`,
          }}
        />

        {/* Faint watermark */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: -10,
            top: "50%",
            transform: "translateY(-50%)",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: "clamp(160px,20vw,280px)",
            fontWeight: 900,
            color: `${C.petroleum}04`,
            lineHeight: 1,
            letterSpacing: -10,
            userSelect: "none",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          01
        </div>

        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr))",
              gap: 80,
              alignItems: "end",
            }}
          >
            {/* Heading */}
            <div style={vis(100)}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 20,
                }}
              >
                <div style={{ width: 36, height: 1, background: C.gold }} />
                <span
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontSize: 12,
                    fontWeight: 700,
                    color: C.gold,
                    letterSpacing: "5px",
                    textTransform: "uppercase",
                  }}
                >
                  WHO WE ARE
                </span>
              </div>

              <h2
                style={{
                  fontFamily: "'Beiruti', sans-serif",
                  fontSize: "clamp(44px,5vw,72px)",
                  fontWeight: 900,
                  color: C.ink,
                  lineHeight: 1.15,
                  letterSpacing: -1.5,
                  margin: 0,
                }}
              >
                شركة متخصصة
                <br />
                في بناء{" "}
                <span
                  style={{
                    color: C.petroleum,
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  المعرفة
                  {/* Gold animated underline */}
                  <span
                    style={{
                      position: "absolute",
                      bottom: 2,
                      right: 0,
                      left: 0,
                      height: 3,
                      background: C.gold,
                      borderRadius: 2,
                      transformOrigin: "right",
                      transform: inView ? "scaleX(1)" : "scaleX(0)",
                      transition: "transform 1s ease 0.9s",
                    }}
                  />
                </span>
              </h2>
            </div>

            {/* Body */}
            <div style={{ paddingBottom: 8, ...vis(260) }}>
              <p
                style={{
                  fontFamily: "'Beiruti', sans-serif",
                  fontSize: 19,
                  fontWeight: 600,
                  color: C.inkSoft,
                  lineHeight: 2.1,
                  margin: "0 0 22px",
                  borderRight: `3px solid ${C.petroleum}`,
                  paddingRight: 24,
                }}
              >
                شركة متخصصة في بناء النماذج والمنتجات المعرفية التي تمكّن
                المؤسسات، خصوصًا في قطاع التعليم، من تحقيق نمو اقتصادي عبر تطوير
                أنظمتها المعرفية وتعزيز جودة القرار.
              </p>
              <p
                style={{
                  fontFamily: "'Beiruti', sans-serif",
                  fontSize: 16,
                  fontWeight: 800,
                  color: C.inkMuted,
                  lineHeight: 2,
                  margin: 0,
                }}
              >
                تنطلق منظومة من أن المعرفة لم تعد عنصرًا داعمًا للنمو، بل أصبحت
                بنيته الحاكمة.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          STAT BOXES
          Offwhite background.
          Each stat: its accent color as top bar + dot.
          Numbers in ink — NOT in accent color.
          This is the luxury move: accent used as
          a small signal, not a loud color flood.
      ══════════════════════════════════════════ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 1,
          background: C.border,
          borderBottom: `1px solid ${C.border}`,
        }}
        className="stat-boxes-grid"
      >
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              background: C.offwhite,
              padding: "48px 52px",
              position: "relative",
              ...vis(300 + i * 100),
            }}
          >
            {/* Colored top bar */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                left: 0,
                height: 4,
                background: s.accent,
              }}
            />

            {/* Number — big, ink */}
            <p
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontSize: 58,
                fontWeight: 600,
                color: C.ink,
                margin: "0 0 12px",
                lineHeight: 1,
                letterSpacing: -2,
              }}
            >
              {s.value}
            </p>

            <p
              style={{
                fontFamily: "'Beiruti', sans-serif",
                fontSize: 20,
                fontWeight: 700,
                color: C.ink,
                margin: "0 0 8px",
              }}
            >
              {s.label}
            </p>

            {/* Accent dot + EN */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: s.accent,
                  flexShrink: 0,
                }}
              />
              <p
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontSize: 10,
                  fontWeight: 600,
                  color: C.inkMuted,
                  margin: 0,
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                }}
              >
                {s.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════════
          PART 2 — KEY POINTS + IDENTITY CARD
          Each key point gets its own accent color.
          The 4 colors appear naturally — not forced.
      ══════════════════════════════════════════ */}
      <div
        style={{
          background: C.offwhite,
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "96px 24px 112px",
            display: "grid",
            gridTemplateColumns: "1fr 400px",
            gap: 96,
            alignItems: "start",
          }}
          className="about-body-grid"
        >
          {/* Key points */}
          <div>
            <div style={{ marginBottom: 32, ...vis(500) }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 14,
                }}
              >
                <div style={{ width: 28, height: 1, background: C.gold }} />
                <span
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    color: C.gold,
                    letterSpacing: "4px",
                    textTransform: "uppercase",
                  }}
                >
                  CORE PILLARS
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "'Beiruti', sans-serif",
                  fontSize: 32,
                  fontWeight: 700,
                  color: C.ink,
                  margin: 0,
                }}
              >
                محاور عملنا
              </h3>
            </div>

            {keyPoints.map((p, i) => (
              <div key={p.ar} style={visX(560 + i * 110)}>
                <div
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "60px 1fr auto",
                    alignItems: "center",
                    gap: 24,
                    padding: "22px 20px",
                    borderBottom: `1px solid ${hovered === i ? "transparent" : C.border}`,
                    borderRadius: hovered === i ? 16 : 0,
                    background: hovered === i ? C.white : "transparent",
                    boxShadow:
                      hovered === i ? `0 4px 24px rgba(1,90,98,0.06)` : "none",
                    transform:
                      hovered === i ? "translateX(-6px)" : "translateX(0)",
                    transition: "all 0.3s ease",
                    cursor: "default",
                  }}
                >
                  {/* Number badge — uses each point's accent color on hover */}
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      flexShrink: 0,
                      background: hovered === i ? p.accent : C.white,
                      border: `1.5px solid ${hovered === i ? p.accent : C.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow:
                        hovered === i
                          ? `0 8px 24px ${p.accent}30`
                          : "0 2px 8px rgba(0,0,0,0.04)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Helvetica, Arial, sans-serif",
                        fontSize: 13,
                        fontWeight: 900,
                        color: hovered === i ? C.white : C.ink,
                        transition: "color 0.3s ease",
                      }}
                    >
                      0{i + 1}
                    </span>
                  </div>

                  {/* Arabic */}
                  <span
                    style={{
                      fontFamily: "'Beiruti', sans-serif",
                      fontSize: 18,
                      fontWeight: 600,
                      color: hovered === i ? p.accent : C.ink,
                      lineHeight: 1.5,
                      transition: "color 0.3s ease",
                    }}
                  >
                    {p.ar}
                  </span>

                  {/* English */}
                  <span
                    style={{
                      fontFamily: "Helvetica, Arial, sans-serif",
                      fontSize: 9,
                      fontWeight: 700,
                      color: hovered === i ? p.accent : C.inkMuted,
                      letterSpacing: "2.5px",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                      transition: "color 0.3s ease",
                      opacity: hovered === i ? 0.7 : 1,
                    }}
                  >
                    {p.en}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Identity card */}
          <div style={{ position: "sticky", top: 96, ...vis(480) }}>
            <div
              style={{
                background: C.white,
                borderRadius: 24,
                border: `1px solid ${C.border}`,
                overflow: "hidden",
                boxShadow: "0 24px 64px rgba(13,31,33,0.07)",
              }}
            >
              {/* Card header — petroleum, used intentionally here */}
              <div
                style={{
                  background: C.petroleum,
                  padding: "44px 40px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    backgroundImage:
                      "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                  }}
                />
                {/* Gold top line */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    left: 0,
                    height: 3,
                    background: C.gold,
                  }}
                />
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    bottom: -50,
                    left: -50,
                    width: 160,
                    height: 160,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.06)",
                    pointerEvents: "none",
                  }}
                />
                <p
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontSize: 9,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.3)",
                    letterSpacing: "5px",
                    textTransform: "uppercase",
                    margin: "0 0 20px",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  ESTABLISHED
                </p>
                <p
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontSize: 88,
                    fontWeight: 900,
                    color: C.white,
                    margin: 0,
                    lineHeight: 1,
                    letterSpacing: -6,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  2024
                </p>
                {/* Gold accent line under year */}
                <div
                  style={{
                    width: 40,
                    height: 2,
                    background: C.gold,
                    borderRadius: 2,
                    marginTop: 20,
                    position: "relative",
                    zIndex: 1,
                  }}
                />
              </div>

              {/* Card rows */}
              <div style={{ padding: "0 40px" }}>
                {[
                  {
                    en: "SPECIALIZATION",
                    ar: "بناء النماذج والمنتجات المعرفية",
                  },
                  { en: "SECTOR", ar: "التعليم والاستثمار المعرفي" },
                ].map((row, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "26px 0",
                      borderBottom: `1px solid ${C.borderSoft}`,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "Helvetica, Arial, sans-serif",
                        fontSize: 9,
                        fontWeight: 700,
                        color: C.inkMuted,
                        letterSpacing: "3px",
                        textTransform: "uppercase",
                        margin: "0 0 10px",
                      }}
                    >
                      {row.en}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Beiruti', sans-serif",
                        fontSize: 17,
                        fontWeight: 800,
                        color: C.ink,
                        margin: 0,
                        lineHeight: 1.6,
                      }}
                    >
                      {row.ar}
                    </p>
                  </div>
                ))}

                {/* 4-color dots badge — shows all 4 colors together */}
                <div style={{ padding: "28px 0" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      background: C.offwhite,
                      border: `1px solid ${C.border}`,
                      borderRadius: 12,
                      padding: "14px 20px",
                    }}
                  >
                    {/* All 4 brand colors as dots */}
                    <div style={{ display: "flex", gap: 5 }}>
                      {[C.petroleum, C.gold, C.crimson, C.rose].map(
                        (col, i) => (
                          <div
                            key={i}
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              background: col,
                            }}
                          />
                        ),
                      )}
                    </div>
                    <div>
                      <p
                        style={{
                          fontFamily: "'Beiruti', sans-serif",
                          fontSize: 15,
                          fontWeight: 800,
                          color: C.ink,
                          margin: "0 0 3px",
                        }}
                      >
                        منظومة المعرفية
                      </p>
                      <p
                        style={{
                          fontFamily: "Helvetica, Arial, sans-serif",
                          fontSize: 9,
                          fontWeight: 600,
                          color: C.inkMuted,
                          margin: 0,
                          letterSpacing: "2px",
                          textTransform: "uppercase",
                        }}
                      >
                        Manzoma Knowledge Co.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .about-body-grid { grid-template-columns: 1fr !important; gap: 52px !important; }
        }
        @media (max-width: 768px) {
          .stat-boxes-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
