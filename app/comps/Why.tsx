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

const reasons = [
  {
    num: "01",
    tag: "المنهجية",
    ar: "نبدأ من النموذج لنشكل الواقع",
    en: "Model-First Approach",
    desc: "لا ننطلق من التشغيل، بل من بناء النموذج الفكري الذي يسبق كل قرار ويحكم كل خطوة. المنظومة تبني الإطار قبل أن تبني الجدران.",
    accent: COLORS.petroleum,
  },
  {
    num: "02",
    tag: "القرار",
    ar: "نعمل على القرار قبل التشغيل",
    en: "Decision Before Execution",
    desc: "نُرسي منطق القرار قبل أن تبدأ العجلة التشغيلية، لأن القرار الخاطئ لا يُصحَّح بالتنفيذ الجيد — بل يُكلّف أضعافاً.",
    accent: COLORS.gold,
  },
  {
    num: "03",
    tag: "التعليم",
    ar: "نرى التعليم كمنصة إنتاج قيمة",
    en: "Education as Value Platform",
    desc: "التعليم في منظومتنا ليس خدمة تُقدَّم، بل منصة إنتاج اقتصادي حقيقي قابل للقياس والتوسع والاستثمار المؤسسي.",
    accent: COLORS.crimson,
  },
  {
    num: "04",
    tag: "الأصول",
    ar: "نحول المعرفة إلى أصل اقتصادي",
    en: "Knowledge as Economic Asset",
    desc: "المعرفة عندنا ليست مفهوماً نظرياً — بل أصل ملموس قابل للتبادل والنمو، يُدار كما تُدار الأصول الاستراتيجية الكبرى.",
    accent: COLORS.rose,
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

export default function Why() {
  const { ref, inView } = useInView();
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const handleSetActive = (i: number) => {
    setActive(i);
    setAnimKey((k) => k + 1);
  };

  const vis = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
  });

  const visX = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0)" : "translateX(24px)",
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  });

  return (
    <section
      id="why"
      dir="rtl"
      ref={ref}
      style={{
        background: COLORS.offwhite,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ══════════════════════════════════════════
          HEADER — petroleum band
      ══════════════════════════════════════════ */}
      <div
        style={{
          background: COLORS.white,
          borderBottom: `1px solid ${COLORS.border}`,
          padding: "80px 24px 72px",
          position: "relative",
          overflow: "hidden",
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
            background: `linear-gradient(to left, ${COLORS.gold}, ${COLORS.petroleum})`,
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
              02
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
              WHY MANZOMA
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 80,
              alignItems: "end",
            }}
          >
            {/* Heading */}
            <div style={vis(150)}>
              <h2
                style={{
                  fontFamily: "'Beiruti', sans-serif",
                  fontSize: "clamp(48px, 5.5vw, 80px)",
                  fontWeight: 900,
                  color: COLORS.ink,
                  lineHeight: 1.1,
                  letterSpacing: -2,
                  margin: 0,
                }}
              >
                لماذا
                <br />
                <span
                  style={{
                    color: COLORS.petroleum,
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  منظومة؟
                  <span
                    style={{
                      position: "absolute",
                      bottom: 4,
                      right: 0,
                      left: 0,
                      height: 3,
                      background: COLORS.gold,
                      transformOrigin: "right",
                      transform: inView ? "scaleX(1)" : "scaleX(0)",
                      transition: "transform 1s ease 0.9s",
                      borderRadius: 2,
                    }}
                  />
                </span>
              </h2>
            </div>

            {/* Core idea block */}
            <div style={{ paddingBottom: 8, ...vis(280) }}>
              <div
                style={{
                  borderRight: `4px solid ${COLORS.petroleum}`,
                  paddingRight: 24,
                  marginBottom: 28,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Beiruti', sans-serif",
                    fontSize: 24,
                    fontWeight: 900,
                    color: COLORS.petroleum,
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  نبدأ من النموذج
                  <br />
                  لنشكل الواقع
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
                منظومة لا تبدأ من التشغيل — بل من البنية المعرفية التي تحكم كل
                قرار، وتوجّه كل استثمار، وتضبط كل توسع.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          TAB STRIP — 4 colored tabs
      ══════════════════════════════════════════ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 1,
          background: COLORS.border,
          borderBottom: `1px solid ${COLORS.border}`,
          ...vis(320),
        }}
        className="why-tabs"
      >
        {reasons.map((r, i) => (
          <button
            key={i}
            onClick={() => handleSetActive(i)}
            style={{
              background: active === i ? COLORS.petroleum : COLORS.white,
              border: "none",
              cursor: "pointer",
              padding: "22px 28px",
              textAlign: "right",
              position: "relative",
              transition: "background 0.3s ease",
            }}
          >
            {/* Colored top bar */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                left: 0,
                height: 3,
                background: active === i ? COLORS.gold : r.accent,
                opacity: active === i ? 1 : 0.4,
                transition: "opacity 0.3s ease",
              }}
            />
            <p
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontSize: 10,
                fontWeight: 800,
                color: active === i ? "rgba(255,255,255,0.45)" : COLORS.gold,
                letterSpacing: "2px",
                margin: "0 0 8px",
                transition: "color 0.3s ease",
              }}
            >
              {r.num}
            </p>
            <p
              style={{
                fontFamily: "'Beiruti', sans-serif",
                fontSize: 16,
                fontWeight: 800,
                color: active === i ? COLORS.white : COLORS.ink,
                margin: "0 0 4px",
                lineHeight: 1.3,
                transition: "color 0.3s ease",
              }}
            >
              {r.tag}
            </p>
            <p
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontSize: 9,
                fontWeight: 600,
                color:
                  active === i ? "rgba(255,255,255,0.35)" : COLORS.inkMuted,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                margin: 0,
                transition: "color 0.3s ease",
              }}
            >
              {r.en}
            </p>
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════
          SPLIT PANEL
      ══════════════════════════════════════════ */}
      <div
        style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 104px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 1,
            background: COLORS.border,
            borderRadius: "0 0 24px 24px",
            overflow: "hidden",
            boxShadow: "0 40px 100px rgba(1,90,98,0.08)",
          }}
          className="why-panel"
        >
          {/* LEFT — detail */}
          <div
            style={{
              background: COLORS.offwhite,
              padding: "64px 60px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              overflow: "hidden",
              minHeight: 480,
            }}
          >
            {/* Giant watermark */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                bottom: -28,
                left: -8,
                fontFamily: "Helvetica, Arial, sans-serif",
                fontSize: 240,
                fontWeight: 900,
                color: `${COLORS.petroleum}05`,
                lineHeight: 1,
                letterSpacing: -12,
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              {reasons[active].num}
            </div>

            {/* Accent line — uses each reason's color */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                left: 0,
                height: 4,
                background: reasons[active].accent,
                transition: "background 0.4s ease",
              }}
            />

            {/* Content — animates on tab change */}
            <div
              key={animKey}
              style={{
                position: "relative",
                zIndex: 1,
                animation: "fadeSlideUp 0.45s ease forwards",
              }}
            >
              {/* Accent badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: COLORS.white,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 999,
                  padding: "7px 18px",
                  marginBottom: 28,
                  borderRight: `3px solid ${reasons[active].accent}`,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: reasons[active].accent,
                  }}
                />
                <span
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontSize: 9,
                    fontWeight: 700,
                    color: reasons[active].accent,
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                  }}
                >
                  {reasons[active].en}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "'Beiruti', sans-serif",
                  fontSize: "clamp(26px, 3vw, 40px)",
                  fontWeight: 900,
                  color: COLORS.ink,
                  lineHeight: 1.4,
                  margin: "0 0 20px",
                  letterSpacing: -0.5,
                }}
              >
                {reasons[active].ar}
              </h3>

              {/* Divider using accent color */}
              <div
                style={{
                  width: 40,
                  height: 2,
                  background: reasons[active].accent,
                  borderRadius: 2,
                  marginBottom: 20,
                  transition: "background 0.4s ease",
                }}
              />

              <p
                style={{
                  fontFamily: "'Beiruti', sans-serif",
                  fontSize: 17,
                  fontWeight: 500,
                  color: COLORS.inkSoft,
                  lineHeight: 2.1,
                  margin: 0,
                }}
              >
                {reasons[active].desc}
              </p>
            </div>

            {/* Bottom nav */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 48,
                position: "relative",
                zIndex: 1,
              }}
            >
              {/* Progress dots */}
              <div style={{ display: "flex", gap: 6 }}>
                {reasons.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => handleSetActive(i)}
                    style={{
                      width: active === i ? 32 : 8,
                      height: 8,
                      borderRadius: 999,
                      background:
                        active === i ? reasons[active].accent : COLORS.border,
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      transition: "all 0.35s ease",
                    }}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div style={{ display: "flex", gap: 8 }}>
                {[
                  {
                    onClick: () =>
                      handleSetActive(
                        (active - 1 + reasons.length) % reasons.length,
                      ),
                    dir: "prev",
                  },
                  {
                    onClick: () =>
                      handleSetActive((active + 1) % reasons.length),
                    dir: "next",
                  },
                ].map(({ onClick, dir }) => (
                  <button
                    key={dir}
                    onClick={onClick}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: COLORS.white,
                      border: `1px solid ${COLORS.border}`,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        COLORS.petroleum;
                      (e.currentTarget as HTMLElement).style.borderColor =
                        COLORS.petroleum;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        COLORS.white;
                      (e.currentTarget as HTMLElement).style.borderColor =
                        COLORS.border;
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderTop: `2px solid ${COLORS.inkMuted}`,
                        [dir === "prev" ? "borderRight" : "borderLeft"]:
                          `2px solid ${COLORS.inkMuted}`,
                        transform:
                          dir === "prev" ? "rotate(45deg)" : "rotate(-45deg)",
                        [dir === "prev" ? "marginRight" : "marginLeft"]: 2,
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — list */}
          <div style={{ background: COLORS.white }}>
            {reasons.map((r, i) => (
              <div key={i} style={visX(380 + i * 100)}>
                <button
                  onClick={() => handleSetActive(i)}
                  style={{
                    width: "100%",
                    border: "none",
                    textAlign: "right",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    padding: "32px 36px",
                    background: active === i ? COLORS.offwhite : COLORS.white,
                    borderBottom:
                      i < reasons.length - 1
                        ? `1px solid ${COLORS.border}`
                        : "none",
                    borderRight: `4px solid ${active === i ? r.accent : "transparent"}`,
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (active !== i) {
                      (e.currentTarget as HTMLElement).style.background =
                        COLORS.offwhite;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (active !== i) {
                      (e.currentTarget as HTMLElement).style.background =
                        COLORS.white;
                    }
                  }}
                >
                  {/* Number badge */}
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      flexShrink: 0,
                      background: active === i ? r.accent : COLORS.offwhite,
                      border: `1px solid ${active === i ? r.accent : COLORS.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow:
                        active === i ? `0 8px 24px ${r.accent}30` : "none",
                      transition: "all 0.25s ease",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Helvetica, Arial, sans-serif",
                        fontSize: 13,
                        fontWeight: 800,
                        color: active === i ? COLORS.white : COLORS.petroleum,
                        transition: "color 0.25s ease",
                      }}
                    >
                      {r.num}
                    </span>
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1, textAlign: "right" }}>
                    <p
                      style={{
                        fontFamily: "'Beiruti', sans-serif",
                        fontSize: 17,
                        fontWeight: 800,
                        color: active === i ? r.accent : COLORS.ink,
                        margin: "0 0 5px",
                        lineHeight: 1.4,
                        transition: "color 0.25s ease",
                      }}
                    >
                      {r.ar}
                    </p>
                    <p
                      style={{
                        fontFamily: "Helvetica, Arial, sans-serif",
                        fontSize: 9,
                        fontWeight: 700,
                        color: active === i ? r.accent : COLORS.inkMuted,
                        letterSpacing: "2.5px",
                        textTransform: "uppercase",
                        margin: 0,
                        opacity: active === i ? 0.7 : 1,
                        transition: "color 0.25s ease",
                      }}
                    >
                      {r.en}
                    </p>
                  </div>

                  {/* Chevron */}
                  <div
                    style={{
                      width: 7,
                      height: 7,
                      flexShrink: 0,
                      borderTop: `2px solid ${active === i ? r.accent : COLORS.border}`,
                      borderLeft: `2px solid ${active === i ? r.accent : COLORS.border}`,
                      transform: "rotate(-45deg)",
                      transition: "border-color 0.25s ease",
                    }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 900px) {
          .why-tabs  { grid-template-columns: repeat(2,1fr) !important; }
          .why-panel { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
