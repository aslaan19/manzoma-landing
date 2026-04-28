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

const elements = [
  {
    num: "1",
    ar: "المعرفة",
    desc: "أساس الإدراك",
    en: "Knowledge",
    accent: COLORS.rose,
  },
  {
    num: "2",
    ar: "الحافز المالي",
    desc: "شرارة الانطلاق",
    en: "Financial Drive",
    accent: COLORS.gold,
  },
  {
    num: "3",
    ar: "الإقتصاد",
    desc: "لغة القيمة",
    en: "Economy",
    accent: COLORS.petroleum,
  },
  {
    num: "4",
    ar: "الديموغرافيا",
    desc: "فهم الإنسان",
    en: "Demographics",
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

export default function CTA() {
  const { ref, inView } = useInView();
  const [hoveredEl, setHoveredEl] = useState<number | null>(null);
  const [hoveredBtn, setHoveredBtn] = useState<number | null>(null);

  const vis = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
  });

  return (
    <section
      id="contact"
      dir="rtl"
      ref={ref}
      style={{
        background: COLORS.white,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Faint grid — same as other sections */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `
          linear-gradient(${COLORS.petroleum}04 1px, transparent 1px),
          linear-gradient(90deg, ${COLORS.petroleum}04 1px, transparent 1px)
        `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Decorative rings — bottom left */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: -180,
          left: -180,
          width: 520,
          height: 520,
          borderRadius: "50%",
          border: `1px solid ${COLORS.petroleum}06`,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: -100,
          left: -100,
          width: 320,
          height: 320,
          borderRadius: "50%",
          border: `1px solid ${COLORS.petroleum}04`,
          pointerEvents: "none",
        }}
      />
      {/* top right ring */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -120,
          right: -120,
          width: 400,
          height: 400,
          borderRadius: "50%",
          border: `1px solid ${COLORS.gold}08`,
          pointerEvents: "none",
        }}
      />

      {/* ══════════════════════════════════════════
          HEADER — same pattern as other sections
      ══════════════════════════════════════════ */}
      <div
        style={{
          borderBottom: `1px solid ${COLORS.border}`,
          padding: "80px 24px 72px",
          position: "relative",
          zIndex: 10,
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
            background: `linear-gradient(to left, ${COLORS.rose}, ${COLORS.crimson}, ${COLORS.gold}, ${COLORS.petroleum})`,
          }}
        />

        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {/* Breadcrumb */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 36,
              ...vis(60),
            }}
          >
            <span
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontSize: 11,
                fontWeight: 800,
                color: COLORS.border,
                letterSpacing: "2px",
              }}
            >
              05
            </span>
            <div style={{ width: 40, height: 1, background: COLORS.border }} />
            <span
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontSize: 10,
                fontWeight: 700,
                color: COLORS.petroleum,
                letterSpacing: "5px",
                textTransform: "uppercase",
              }}
            >
              GET IN TOUCH
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))",
              gap: 72,
              alignItems: "end",
            }}
          >
            {/* Heading */}
            <div style={vis(150)}>
              <h2
                style={{
                  fontFamily: "'Beiruti', sans-serif",
                  fontSize: "clamp(44px, 5vw, 72px)",
                  fontWeight: 900,
                  color: COLORS.ink,
                  lineHeight: 1.15,
                  letterSpacing: -2,
                  margin: 0,
                }}
              >
                تواصل مع
                <br />
                <span
                  style={{
                    color: COLORS.petroleum,
                    position: "relative",
                    display: "inline-block",
                    paddingBottom: 6,
                  }}
                >
                  منظومة
                  <span
                    style={{
                      position: "absolute",
                      bottom: 4,
                      right: 0,
                      left: 0,
                      height: 3,
                      background: COLORS.gold,
                      borderRadius: 2,
                      transformOrigin: "right",
                      transform: inView ? "scaleX(1)" : "scaleX(0)",
                      transition: "transform 1s ease 0.9s",
                    }}
                  />
                </span>
              </h2>
            </div>

            {/* Statement block */}
            <div style={{ paddingBottom: 8, ...vis(280) }}>
              <div
                style={{
                  borderRight: `4px solid ${COLORS.petroleum}`,
                  paddingRight: 24,
                  marginBottom: 22,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Beiruti', sans-serif",
                    fontSize: 20,
                    fontWeight: 900,
                    color: COLORS.petroleum,
                    margin: 0,
                    lineHeight: 1.65,
                  }}
                >
                  منظومة ليست مشروعًا تشغيليًا،
                  <br />
                  <span style={{ color: COLORS.gold }}>
                    بل بنية معرفية تُبنى ليُبنى عليها.
                  </span>
                </p>
              </div>
              <p
                style={{
                  fontFamily: "'Beiruti', sans-serif",
                  fontSize: 16,
                  fontWeight: 500,
                  color: COLORS.inkSoft,
                  margin: 0,
                  lineHeight: 1.95,
                }}
              >
                إذا كنت تبحث عن شريك معرفي يبدأ من النموذج لا من التشغيل —
                فمنظومة هي المكان الصحيح.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          4 ELEMENTS STRIP
      ══════════════════════════════════════════ */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "72px 24px 0",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 28,
            ...vis(360),
          }}
        >
          <div style={{ width: 28, height: 1, background: COLORS.gold }} />
          <span
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 9,
              fontWeight: 700,
              color: COLORS.gold,
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            نظرة أعمق على مرتكزاتنا
          </span>
        </div>

        {/* 4 element cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 1,
            background: COLORS.border,
            borderRadius: 24,
            overflow: "hidden",
            border: `1px solid ${COLORS.border}`,
            boxShadow: `0 20px 60px ${COLORS.petroleum}07`,
            ...vis(420),
          }}
          className="elements-grid"
        >
          {elements.map((el, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredEl(i)}
              onMouseLeave={() => setHoveredEl(null)}
              style={{
                background: hoveredEl === i ? el.accent : COLORS.white,
                padding: "36px 32px",
                position: "relative",
                cursor: "default",
                transition: "background 0.3s ease",
              }}
            >
              {/* Top accent bar */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  left: 0,
                  height: 4,
                  background: el.accent,
                  opacity: hoveredEl === i ? 1 : 0.5,
                  transition: "opacity 0.3s ease",
                }}
              />

              {/* Number */}
              <p
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontSize: 52,
                  fontWeight: 900,
                  lineHeight: 1,
                  color:
                    hoveredEl === i
                      ? `rgba(255,255,255,0.15)`
                      : `${el.accent}18`,
                  margin: "0 0 20px",
                  letterSpacing: -2,
                  transition: "color 0.3s ease",
                }}
              >
                {el.num}
              </p>

              {/* Arabic name */}
              <h3
                style={{
                  fontFamily: "'Beiruti', sans-serif",
                  fontSize: 22,
                  fontWeight: 900,
                  color: hoveredEl === i ? COLORS.white : el.accent,
                  margin: "0 0 6px",
                  lineHeight: 1.2,
                  transition: "color 0.3s ease",
                }}
              >
                {el.ar}
              </h3>

              {/* Desc */}
              <p
                style={{
                  fontFamily: "'Beiruti', sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                  color:
                    hoveredEl === i
                      ? "rgba(255,255,255,0.75)"
                      : COLORS.inkMuted,
                  margin: "0 0 16px",
                  transition: "color 0.3s ease",
                }}
              >
                {el.desc}
              </p>

              {/* Gold divider */}
              <div
                style={{
                  width: hoveredEl === i ? 40 : 24,
                  height: 2,
                  background:
                    hoveredEl === i ? "rgba(255,255,255,0.4)" : COLORS.gold,
                  borderRadius: 2,
                  marginBottom: 12,
                  transition: "all 0.3s ease",
                }}
              />

              {/* EN label */}
              <p
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontSize: 9,
                  fontWeight: 700,
                  color:
                    hoveredEl === i
                      ? "rgba(255,255,255,0.45)"
                      : COLORS.inkMuted,
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  margin: 0,
                  transition: "color 0.3s ease",
                }}
              >
                {el.en}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MAIN CTA CARD
      ══════════════════════════════════════════ */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "24px 24px 96px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          style={{
            background: COLORS.petroleum,
            borderRadius: 28,
            overflow: "hidden",
            position: "relative",
            boxShadow: `0 40px 100px ${COLORS.petroleum}22`,
            ...vis(600),
          }}
        >
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

          {/* Dot texture */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* Decorative rings inside card */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              bottom: -80,
              left: -80,
              width: 280,
              height: 280,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.07)",
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: -60,
              right: -60,
              width: 220,
              height: 220,
              borderRadius: "50%",
              border: `1px solid ${COLORS.gold}15`,
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              padding: "64px 64px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 40,
            }}
            className="cta-inner"
          >
            {/* Left — text */}
            <div style={{ maxWidth: 560 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: COLORS.gold,
                  }}
                />
                <span
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontSize: 9,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.4)",
                    letterSpacing: "4px",
                    textTransform: "uppercase",
                  }}
                >
                  Manzoma Knowledge Co.
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "'Beiruti', sans-serif",
                  fontSize: "clamp(24px, 3vw, 40px)",
                  fontWeight: 900,
                  color: COLORS.white,
                  lineHeight: 1.4,
                  margin: "0 0 8px",
                  letterSpacing: -0.5,
                }}
              >
                منظومة ليست مشروعًا تشغيليًا،
              </h3>
              <h3
                style={{
                  fontFamily: "'Beiruti', sans-serif",
                  fontSize: "clamp(24px, 3vw, 40px)",
                  fontWeight: 900,
                  color: COLORS.gold,
                  lineHeight: 1.4,
                  margin: "0 0 24px",
                  letterSpacing: -0.5,
                }}
              >
                بل بنية معرفية تُبنى ليُبنى عليها.
              </h3>

              <div
                style={{
                  width: 48,
                  height: 2,
                  background: `rgba(255,255,255,0.15)`,
                  borderRadius: 2,
                }}
              />
            </div>

            {/* Right — buttons */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                minWidth: 220,
              }}
            >
              <a
                href="mailto:info@manzoma.sa"
                onMouseEnter={() => setHoveredBtn(0)}
                onMouseLeave={() => setHoveredBtn(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  fontFamily: "'Beiruti', sans-serif",
                  fontSize: 16,
                  fontWeight: 800,
                  color: hoveredBtn === 0 ? COLORS.ink : COLORS.ink,
                  textDecoration: "none",
                  background: hoveredBtn === 0 ? COLORS.gold : COLORS.white,
                  padding: "15px 36px",
                  borderRadius: 999,
                  boxShadow:
                    hoveredBtn === 0
                      ? `0 12px 40px ${COLORS.gold}40`
                      : `0 8px 32px rgba(0,0,0,0.2)`,
                  transform:
                    hoveredBtn === 0 ? "translateY(-2px)" : "translateY(0)",
                  transition: "all 0.25s ease",
                }}
              >
                <span>تواصل معنا</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2 7H12M12 7L7 2M12 7L7 12"
                    stroke={COLORS.ink}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              <a
                href="#about"
                onMouseEnter={() => setHoveredBtn(1)}
                onMouseLeave={() => setHoveredBtn(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Beiruti', sans-serif",
                  fontSize: 15,
                  fontWeight: 700,
                  color:
                    hoveredBtn === 1 ? COLORS.white : "rgba(255,255,255,0.65)",
                  textDecoration: "none",
                  background: "transparent",
                  border: `1px solid ${hoveredBtn === 1 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)"}`,
                  padding: "14px 36px",
                  borderRadius: 999,
                  transition: "all 0.25s ease",
                }}
              >
                تعرّف على منظومة
              </a>

              <p
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontSize: 9,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.3)",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  margin: "4px 0 0",
                  textAlign: "center",
                }}
              >
                info@manzoma.sa
              </p>
            </div>
          </div>

          {/* Bottom strip inside card */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              padding: "16px 64px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
              position: "relative",
              zIndex: 1,
            }}
          >
            <p
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontSize: 9,
                fontWeight: 700,
                color: "rgba(255,255,255,0.25)",
                letterSpacing: "3px",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              manzoma.sa
            </p>
            <div style={{ display: "flex", gap: 20 }}>
              {elements.map((el, i) => (
                <div
                  key={i}
                  style={{ display: "flex", alignItems: "center", gap: 6 }}
                >
                  <div
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: el.accent,
                      opacity: 0.7,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Beiruti', sans-serif",
                      fontSize: 12,
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.35)",
                    }}
                  >
                    {el.ar}
                  </span>
                </div>
              ))}
            </div>
            <p
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontSize: 9,
                fontWeight: 700,
                color: "rgba(255,255,255,0.25)",
                letterSpacing: "2px",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              © 2024
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .elements-grid { grid-template-columns: repeat(2,1fr) !important; }
          .cta-inner { flex-direction: column !important; }
        }
      `}</style>
    </section>
  );
}
