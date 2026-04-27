"use client";

import { useEffect, useRef, useState } from "react";

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

const keyPoints = [
  { ar: "نماذج معرفية حاكمة للقرار", en: "Knowledge Models" },
  { ar: "تطوير أنظمة معرفية", en: "Knowledge Systems" },
  { ar: "تحويل المعرفة لقيمة اقتصادية", en: "Economic Value" },
  { ar: "ابتكار نماذج تطبيقية مؤثرة", en: "Applied Innovation" },
];

const stats = [
  {
    value: "٨+",
    label: "نموذج معرفي",
    sub: "Knowledge Models",
    accent: COLORS.petroleum,
  },
  { value: "٢٠٢٤", label: "سنة التأسيس", sub: "Founded", accent: COLORS.gold },
  {
    value: "١٠٠٪",
    label: "تخصص معرفي",
    sub: "Knowledge Focus",
    accent: COLORS.crimson,
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
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
  });

  const visX = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0)" : "translateX(28px)",
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  });

  return (
    <section
      id="about"
      dir="rtl"
      ref={ref}
      style={{
        background: COLORS.white,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ══════════════════════════════════════════
          PART 1 — FULL WIDTH HEADER BAND
      ══════════════════════════════════════════ */}
      <div
        style={{
          background: COLORS.petroleum,
          padding: "80px 24px 72px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dot grid texture */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Decorative gold line — top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            height: 3,
            background: COLORS.gold,
          }}
        />

        {/* Giant watermark */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: -10,
            top: "50%",
            transform: "translateY(-50%)",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: "clamp(160px, 20vw, 280px)",
            fontWeight: 900,
            color: "rgba(255,255,255,0.03)",
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
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 72,
              alignItems: "end",
            }}
          >
            {/* Heading */}
            <div style={vis(100)}>
              {/* Section label */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 24,
                }}
              >
                <div
                  style={{ width: 36, height: 1, background: COLORS.gold }}
                />
                <span
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    color: COLORS.gold,
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
                  fontSize: "clamp(42px, 5vw, 70px)",
                  fontWeight: 900,
                  color: COLORS.white,
                  lineHeight: 1.15,
                  letterSpacing: -1,
                  margin: 0,
                }}
              >
                شركة متخصصة
                <br />
                في بناء{" "}
                <span
                  style={{
                    color: COLORS.gold,
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  المعرفة
                  {/* Animated underline */}
                  <span
                    style={{
                      position: "absolute",
                      bottom: 2,
                      right: 0,
                      left: 0,
                      height: 2,
                      background: COLORS.gold,
                      transformOrigin: "right",
                      transform: inView ? "scaleX(1)" : "scaleX(0)",
                      transition: "transform 1s ease 0.8s",
                      opacity: 0.5,
                    }}
                  />
                </span>
              </h2>
            </div>

            {/* Body text */}
            <div style={{ paddingBottom: 8, ...vis(240) }}>
              <p
                style={{
                  fontFamily: "'Beiruti', sans-serif",
                  fontSize: 18,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.8)",
                  lineHeight: 2.1,
                  margin: "0 0 20px",
                  borderRight: `3px solid ${COLORS.gold}`,
                  paddingRight: 20,
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
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.55)",
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
          STAT BOXES — bridge between header and body
      ══════════════════════════════════════════ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 1,
          background: COLORS.border,
          borderBottom: `1px solid ${COLORS.border}`,
        }}
        className="stat-boxes-grid"
      >
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              background: COLORS.white,
              padding: "44px 48px",
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
            <p
              style={{
                fontFamily: "'Beiruti', sans-serif",
                fontSize: 52,
                fontWeight: 900,
                color: s.accent,
                margin: "0 0 10px",
                lineHeight: 1,
                letterSpacing: -2,
              }}
            >
              {s.value}
            </p>
            <p
              style={{
                fontFamily: "'Beiruti', sans-serif",
                fontSize: 17,
                fontWeight: 700,
                color: COLORS.ink,
                margin: "0 0 4px",
              }}
            >
              {s.label}
            </p>
            <p
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontSize: 10,
                fontWeight: 600,
                color: COLORS.inkMuted,
                margin: 0,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
              }}
            >
              {s.sub}
            </p>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════════
          PART 2 — KEY POINTS + IDENTITY CARD
      ══════════════════════════════════════════ */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "96px 24px 112px",
          display: "grid",
          gridTemplateColumns: "1fr 400px",
          gap: 88,
          alignItems: "start",
        }}
        className="about-body-grid"
      >
        {/* Key points */}
        <div>
          {/* Sub-heading */}
          <div style={{ marginBottom: 48, ...vis(500) }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 12,
              }}
            >
              <div style={{ width: 28, height: 1, background: COLORS.gold }} />
              <span
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  color: COLORS.gold,
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
                fontSize: 26,
                fontWeight: 800,
                color: COLORS.ink,
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
                  gridTemplateColumns: "56px 1fr auto",
                  alignItems: "center",
                  gap: 24,
                  padding: "24px 20px",
                  borderBottom: `1px solid ${hovered === i ? "transparent" : COLORS.border}`,
                  borderRadius: hovered === i ? 16 : 0,
                  background: hovered === i ? COLORS.offwhite : "transparent",
                  boxShadow:
                    hovered === i ? "0 8px 40px rgba(1,90,98,0.08)" : "none",
                  transform:
                    hovered === i ? "translateX(-8px)" : "translateX(0)",
                  transition: "all 0.3s ease",
                  cursor: "default",
                }}
              >
                {/* Number badge */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: hovered === i ? COLORS.petroleum : COLORS.white,
                    border: `1.5px solid ${hovered === i ? COLORS.petroleum : COLORS.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow:
                      hovered === i
                        ? "0 8px 24px rgba(1,90,98,0.25)"
                        : "0 2px 8px rgba(0,0,0,0.04)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Helvetica, Arial, sans-serif",
                      fontSize: 13,
                      fontWeight: 800,
                      color: hovered === i ? COLORS.white : COLORS.petroleum,
                      letterSpacing: "0.5px",
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
                    fontWeight: 700,
                    color: hovered === i ? COLORS.petroleum : COLORS.ink,
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
                    color: hovered === i ? COLORS.gold : COLORS.inkMuted,
                    letterSpacing: "2.5px",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    transition: "color 0.3s ease",
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
              background: COLORS.white,
              borderRadius: 24,
              border: `1px solid ${COLORS.border}`,
              overflow: "hidden",
              boxShadow: "0 32px 80px rgba(1,90,98,0.1)",
            }}
          >
            {/* Petroleum header */}
            <div
              style={{
                background: COLORS.petroleum,
                padding: "44px 40px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Dot texture */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  backgroundImage:
                    "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
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
                  background: COLORS.gold,
                }}
              />
              {/* Rings */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  bottom: -50,
                  left: -50,
                  width: 160,
                  height: 160,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.08)",
                  pointerEvents: "none",
                }}
              />
              <p
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontSize: 9,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.35)",
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
                  color: COLORS.white,
                  margin: 0,
                  lineHeight: 1,
                  letterSpacing: -6,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                2024
              </p>
            </div>

            {/* Card rows */}
            <div style={{ padding: "0 40px" }}>
              {[
                { en: "SPECIALIZATION", ar: "بناء النماذج والمنتجات المعرفية" },
                { en: "SECTOR", ar: "التعليم والاستثمار المعرفي" },
              ].map((row, i) => (
                <div
                  key={i}
                  style={{
                    padding: "26px 0",
                    borderBottom: `1px solid ${COLORS.border}`,
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Helvetica, Arial, sans-serif",
                      fontSize: 9,
                      fontWeight: 700,
                      color: COLORS.inkMuted,
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
                      color: COLORS.ink,
                      margin: 0,
                      lineHeight: 1.6,
                    }}
                  >
                    {row.ar}
                  </p>
                </div>
              ))}

              {/* Gold badge */}
              <div style={{ padding: "28px 0" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    background: COLORS.offwhite,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 12,
                    padding: "14px 20px",
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: COLORS.gold,
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <p
                      style={{
                        fontFamily: "'Beiruti', sans-serif",
                        fontSize: 15,
                        fontWeight: 800,
                        color: COLORS.ink,
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
                        color: COLORS.inkMuted,
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

      <style>{`
        @media (max-width: 1100px) {
          .about-body-grid  { grid-template-columns: 1fr !important; gap: 52px !important; }
        }
        @media (max-width: 768px) {
          .stat-boxes-grid  { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
