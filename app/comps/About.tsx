"use client";

import { useEffect, useRef, useState } from "react";

const C = {
  petroleum: "#124f45",
  gold: "#C7A856",
  crimson: "#972B28",
  rose: "#B18083",
  white: "#FFFFFF",
  offwhite: "#F8F6F1",
  border: "#E8E4DC",
  borderSoft: "#F0ECE6",
  ink: "#0D1F21",
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
      style={{ background: C.white, position: "relative", overflow: "hidden" }}
    >
      {/* ══════════════════════════════
          PART 1 — HEADER
      ══════════════════════════════ */}
      <div
        className="about-header"
        style={{
          background: C.white,
          borderBottom: `1px solid ${C.border}`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 4-color top line */}
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

        {/* Watermark — hidden on mobile */}
        <div
          aria-hidden
          className="about-watermark"
          style={{
            position: "absolute",
            left: -10,
            top: "50%",
            transform: "translateY(-50%)",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: "clamp(120px,20vw,280px)",
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
          className="about-header-inner"
        >
          <div className="about-header-grid">
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
                <div style={{ width: 40, height: 1, background: C.border }} />
                <span
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    color: C.petroleum,
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
                  fontSize: "clamp(38px, 5vw, 68px)",
                  fontWeight: 800,
                  color: C.ink,
                  lineHeight: 1.2,
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
                  fontSize: "clamp(16px, 2vw, 19px)",
                  fontWeight: 600,
                  color: C.inkSoft,
                  lineHeight: 2.1,
                  margin: "0 0 22px",
                  borderRight: `3px solid ${C.petroleum}`,
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
                  fontSize: "clamp(14px, 1.8vw, 16px)",
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

      {/* ══════════════════════════════
          STAT BOXES
          Horizontal scroll on mobile
      ══════════════════════════════ */}
      <div className="stat-scroll-wrapper">
        <div className="stat-boxes-grid" style={{ background: C.border }}>
          {stats.map((s, i) => (
            <div
              key={i}
              className="stat-box"
              style={{
                background: C.offwhite,
                position: "relative",
                ...vis(300 + i * 100),
              }}
            >
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
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontSize: "clamp(40px, 6vw, 58px)",
                  fontWeight: 600,
                  color: C.ink,
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
                  fontSize: "clamp(16px, 2vw, 20px)",
                  fontWeight: 700,
                  color: C.ink,
                  margin: "0 0 8px",
                }}
              >
                {s.label}
              </p>
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
      </div>

      {/* ══════════════════════════════
          PART 2 — KEY POINTS + CARD
      ══════════════════════════════ */}
      <div
        style={{
          background: C.offwhite,
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div className="about-body-grid">
          {/* Key points */}
          <div>
            <div style={{ marginBottom: 28, ...vis(500) }}>
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
                  fontSize: "clamp(24px, 3vw, 32px)",
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
                  className="key-point-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "52px 1fr auto",
                    alignItems: "center",
                    gap: 18,
                    padding: "18px 16px",
                    borderBottom: `1px solid ${hovered === i ? "transparent" : C.border}`,
                    borderRadius: hovered === i ? 16 : 0,
                    background: hovered === i ? C.white : "transparent",
                    boxShadow:
                      hovered === i ? `0 4px 24px rgba(1,90,98,0.06)` : "none",
                    transform:
                      hovered === i ? "translateX(-4px)" : "translateX(0)",
                    transition: "all 0.3s ease",
                    cursor: "default",
                  }}
                >
                  {/* Number badge */}
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 13,
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
                        fontSize: 12,
                        fontWeight: 900,
                        color: hovered === i ? C.white : C.ink,
                        transition: "color 0.3s ease",
                      }}
                    >
                      0{i + 1}
                    </span>
                  </div>

                  {/* Arabic text */}
                  <span
                    style={{
                      fontFamily: "'Beiruti', sans-serif",
                      fontSize: "clamp(15px, 2vw, 18px)",
                      fontWeight: 600,
                      color: hovered === i ? p.accent : C.ink,
                      lineHeight: 1.5,
                      transition: "color 0.3s ease",
                    }}
                  >
                    {p.ar}
                  </span>

                  {/* English label — hidden on very small screens via CSS */}
                  <span
                    className="key-point-en"
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
          <div className="identity-card-wrapper" style={vis(480)}>
            <div
              style={{
                background: C.white,
                borderRadius: 24,
                border: `1px solid ${C.border}`,
                overflow: "hidden",
                boxShadow: "0 24px 64px rgba(13,31,33,0.07)",
              }}
            >
              {/* Card header */}
              <div
                style={{
                  background: C.petroleum,
                  padding: "clamp(28px, 5vw, 44px) clamp(24px, 5vw, 40px)",
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
                    margin: "0 0 16px",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  ESTABLISHED
                </p>
                <p
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontSize: "clamp(64px, 10vw, 88px)",
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
                <div
                  style={{
                    width: 40,
                    height: 2,
                    background: C.gold,
                    borderRadius: 2,
                    marginTop: 16,
                    position: "relative",
                    zIndex: 1,
                  }}
                />
              </div>

              {/* Card rows */}
              <div className="card-rows">
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
                      padding: "22px 0",
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
                        fontSize: "clamp(15px, 2vw, 17px)",
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

                {/* 4-color badge */}
                <div style={{ padding: "24px 0" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      background: C.offwhite,
                      border: `1px solid ${C.border}`,
                      borderRadius: 12,
                      padding: "14px 18px",
                    }}
                  >
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

        /* ── HEADER ── */
        .about-header { padding: 72px 20px 64px; }
        .about-header-inner { padding: 0 4px; }
        .about-header-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 56px;
          align-items: end;
        }

        /* ── STAT BOXES ── */
        .stat-scroll-wrapper {
          /* On desktop: no scroll — just a grid wrapper */
        }
        .stat-boxes-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          border-bottom: 1px solid ${C.border};
        }
        .stat-box { padding: 44px 44px; }

        /* ── BODY ── */
        .about-body-grid {
          max-width: 1280px;
          margin: 0 auto;
          padding: 88px 24px 104px;
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 88px;
          align-items: start;
        }
        .identity-card-wrapper { position: sticky; top: 88px; }
        .card-rows { padding: 0 36px; }
        .key-point-en { display: inline; }

        /* ════════════════════════════════════════
           TABLET — 900px
        ════════════════════════════════════════ */
        @media (max-width: 1100px) {
          .about-body-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
            padding: 64px 20px 80px !important;
          }
          .identity-card-wrapper { position: static !important; top: auto !important; }
        }

        /* ════════════════════════════════════════
           MOBILE — 640px
           Everything designed specifically for
           a one-column, thumb-friendly layout.
        ════════════════════════════════════════ */
        @media (max-width: 640px) {

          /* Header */
          .about-header { padding: 52px 20px 48px !important; }
          .about-header-grid { gap: 32px !important; }
          .about-watermark { display: none !important; }

          /* Stat boxes — horizontal scroll strip */
          .stat-scroll-wrapper {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scroll-snap-type: x mandatory;
            /* Fade hint on right edge */
            -webkit-mask-image: linear-gradient(to right, black 85%, transparent 100%);
            mask-image: linear-gradient(to right, black 85%, transparent 100%);
          }
          .stat-boxes-grid {
            display: flex !important;
            gap: 0 !important;
            width: max-content;
            border-bottom: none !important;
          }
          .stat-box {
            scroll-snap-align: start;
            min-width: 56vw;
            padding: 32px 28px !important;
            border-left: 1px solid ${C.border};
            border-bottom: 1px solid ${C.border};
          }
          .stat-box:first-child { border-right: 1px solid ${C.border}; }

          /* Body */
          .about-body-grid {
            padding: 48px 20px 64px !important;
            gap: 36px !important;
          }

          /* Key point rows — tighter on mobile */
          .key-point-row {
            gap: 14px !important;
            padding: 16px 12px !important;
          }
          .key-point-en { display: none !important; }

          /* Identity card */
          .card-rows { padding: 0 20px !important; }
        }

        /* ════════════════════════════════════════
           VERY SMALL — 380px
        ════════════════════════════════════════ */
        @media (max-width: 380px) {
          .about-header { padding: 44px 16px 40px !important; }
          .stat-box { min-width: 72vw !important; }
          .about-body-grid { padding: 40px 16px 56px !important; }
        }
      `}</style>
    </section>
  );
}
