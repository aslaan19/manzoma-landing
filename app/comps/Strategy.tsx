/* eslint-disable react-hooks/static-components */
"use client";

import { useEffect, useRef, useState } from "react";

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

const pillars = [
  {
    num: "01",
    ar: "تكوين النموذج المعرفي",
    en: "Knowledge Model Formation",
    desc: "بناء الإطار الفكري والمنهجي الحاكم للقرار",
    accent: COLORS.petroleum,
    dir: "top" as const,
  },
  {
    num: "02",
    ar: "بناء القوة الداخلية",
    en: "Internal Capacity Building",
    desc: "تعزيز القدرات المؤسسية والقيادية",
    accent: COLORS.gold,
    dir: "right" as const,
  },
  {
    num: "03",
    ar: "استخراج الموارد الاقتصادية",
    en: "Economic Resource Extraction",
    desc: "تحويل المعرفة إلى موارد قابلة للتفعيل",
    accent: COLORS.crimson,
    dir: "bottom" as const,
  },
  {
    num: "04",
    ar: "بناء المجالس والحوكمة",
    en: "Governance & Councils",
    desc: "تأسيس بنية حوكمة تضبط القرار",
    accent: COLORS.rose,
    dir: "left" as const,
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

function PillarCard({
  pillar,
  hovered,
  onEnter,
  onLeave,
  compact = false,
}: {
  pillar: (typeof pillars)[0];
  hovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
  compact?: boolean;
}) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        width: compact ? "100%" : 230,
        background: hovered ? COLORS.white : COLORS.offwhite,
        border: `1.5px solid ${hovered ? pillar.accent : COLORS.border}`,
        borderRadius: 18,
        padding: compact ? "18px 18px 16px" : "22px 22px 18px",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
        boxShadow: hovered
          ? `0 20px 50px ${pillar.accent}22, 0 4px 16px ${pillar.accent}10`
          : "0 4px 20px rgba(1,90,98,0.05)",
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          height: 3,
          background: hovered ? pillar.accent : COLORS.border,
          transition: "background 0.3s ease",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <span
          style={{
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: compact ? 26 : 30,
            fontWeight: 900,
            lineHeight: 1,
            color: hovered ? pillar.accent : COLORS.border,
            letterSpacing: -1,
            transition: "color 0.3s ease",
          }}
        >
          {pillar.num}
        </span>
        <div
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: hovered ? pillar.accent : COLORS.border,
            transition: "background 0.3s ease",
          }}
        />
      </div>
      <h4
        style={{
          fontFamily: "'Beiruti', sans-serif",
          fontSize: compact ? 14 : 18,
          fontWeight: 800,
          color: hovered ? pillar.accent : COLORS.ink,
          margin: "0 0 6px",
          lineHeight: 1.4,
          transition: "color 0.3s ease",
        }}
      >
        {pillar.ar}
      </h4>
      <p
        style={{
          fontFamily: "'Beiruti', sans-serif",
          fontSize: compact ? 18 : 15,
          fontWeight: 600,
          color: COLORS.inkMuted,
          margin: "0 0 8px",
          lineHeight: 1.7,
        }}
      >
        {pillar.desc}
      </p>
      <p
        style={{
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: 8,
          fontWeight: 700,
          color: hovered ? pillar.accent : COLORS.border,
          letterSpacing: "2px",
          textTransform: "uppercase",
          margin: 0,
          transition: "color 0.3s ease",
        }}
      >
        {pillar.en}
      </p>
    </div>
  );
}

export default function Strategy() {
  const { ref, inView } = useInView();
  const [hovered, setHovered] = useState<number | null>(null);

  const vis = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
  });

  /* ── Center node — shared between desktop + mobile ── */
  const CenterNode = ({ size = 160 }: { size?: number }) => (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: COLORS.petroleum,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        boxShadow: `0 0 0 ${size * 0.088}px ${COLORS.petroleum}12, 0 0 0 ${size * 0.175}px ${COLORS.petroleum}07, 0 28px 72px ${COLORS.petroleum}40`,
        opacity: inView ? 1 : 0,
        transform: inView ? "scale(1)" : "scale(0.7)",
        transition:
          "opacity 0.8s ease 500ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) 500ms",
        flexShrink: 0,
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 10,
          borderRadius: "50%",
          border: `1px solid ${COLORS.gold}25`,
        }}
      />
      <span
        style={{
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: 7,
          fontWeight: 700,
          color: `${COLORS.gold}80`,
          letterSpacing: "4px",
          textTransform: "uppercase",
          marginBottom: 6,
          position: "relative",
          zIndex: 1,
        }}
      >
        CORE
      </span>
      <span
        style={{
          fontFamily: "'Beiruti', sans-serif",
          fontSize: size * 0.19,
          fontWeight: 900,
          color: COLORS.white,
          lineHeight: 1,
          position: "relative",
          zIndex: 1,
        }}
      >
        المعرفة
      </span>
      <span
        style={{
          fontFamily: "'Beiruti', sans-serif",
          fontSize: 10,
          fontWeight: 500,
          color: "rgba(255,255,255,0.5)",
          marginTop: 6,
          position: "relative",
          zIndex: 1,
        }}
      >
        المحور المركزي
      </span>
    </div>
  );

  return (
    <section
      id="strategy"
      dir="rtl"
      ref={ref}
      style={{
        background: COLORS.white,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid texture */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `
          linear-gradient(${COLORS.petroleum}06 1px, transparent 1px),
          linear-gradient(90deg, ${COLORS.petroleum}06 1px, transparent 1px)
        `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ══════════════════════════════════════════
          HEADER
      ══════════════════════════════════════════ */}
      <div
        style={{
          borderBottom: `1px solid ${COLORS.border}`,
          padding: "80px 24px 72px",
          position: "relative",
          zIndex: 10,
        }}
      >
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
              03
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
              OUR STRATEGY
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
            <div style={vis(150)}>
              <h2
                style={{
                  fontFamily: "'Beiruti', sans-serif",
                  fontSize: "clamp(48px,5.5vw,80px)",
                  fontWeight: 900,
                  color: COLORS.ink,
                  lineHeight: 1.1,
                  letterSpacing: -2,
                  margin: 0,
                }}
              >
                استراتيجية
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
                    fontSize: 22,
                    fontWeight: 900,
                    color: COLORS.petroleum,
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  ابتكار القيمة من خلال
                  <br />
                  استثمار المعرفة
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
                تقوم استراتيجية منظومة على بناء سلاسل قيمة تعليمية واقتصادية،
                تنطلق من المعرفة كمحور مركزي يُغذّي أربعة أركان استراتيجية
                متكاملة.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          DIAGRAM WRAPPER
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
        {/* ── DESKTOP DIAMOND ── */}
        <div
          className="strategy-desktop"
          style={{ position: "relative", height: 700, ...vis(400) }}
        >
          <svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            <circle
              cx="50%"
              cy="50%"
              r="195"
              fill="none"
              stroke={`${COLORS.petroleum}05`}
              strokeWidth="1"
            />
            <circle
              cx="50%"
              cy="50%"
              r="125"
              fill="none"
              stroke={`${COLORS.gold}07`}
              strokeWidth="1"
            />
            {[
              { x2: "50%", y2: "8%", color: COLORS.petroleum, delay: 600 },
              { x2: "87%", y2: "50%", color: COLORS.gold, delay: 700 },
              { x2: "50%", y2: "92%", color: COLORS.crimson, delay: 800 },
              { x2: "13%", y2: "50%", color: COLORS.rose, delay: 900 },
            ].map((l, i) => (
              <line
                key={i}
                x1="50%"
                y1="50%"
                x2={l.x2}
                y2={l.y2}
                stroke={l.color}
                strokeOpacity="0.5"
                strokeWidth="1.8"
                style={{
                  opacity: inView ? 1 : 0,
                  transition: `opacity 0.7s ease ${l.delay}ms`,
                }}
              />
            ))}
            {[
              ["50%", "8%", "87%", "50%"],
              ["87%", "50%", "50%", "92%"],
              ["50%", "92%", "13%", "50%"],
              ["13%", "50%", "50%", "8%"],
            ].map(([x1, y1, x2, y2], i) => (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={`${COLORS.gold}35`}
                strokeWidth="1"
                style={{
                  opacity: inView ? 1 : 0,
                  transition: `opacity 0.7s ease ${1000 + i * 100}ms`,
                }}
              />
            ))}
            {[
              { cx: "50%", cy: "8%", fill: COLORS.petroleum },
              { cx: "87%", cy: "50%", fill: COLORS.gold },
              { cx: "50%", cy: "92%", fill: COLORS.crimson },
              { cx: "13%", cy: "50%", fill: COLORS.rose },
            ].map((d, i) => (
              <circle
                key={i}
                cx={d.cx}
                cy={d.cy}
                r="5"
                fill={d.fill}
                fillOpacity="0.6"
                style={{
                  opacity: inView ? 1 : 0,
                  transition: `opacity 0.6s ease ${650 + i * 150}ms`,
                }}
              />
            ))}
            <circle cx="50%" cy="50%" r="6" fill={COLORS.gold} />
          </svg>

          {/* Center */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: -80,
              marginLeft: -80,
              zIndex: 20,
            }}
          >
            <CenterNode size={160} />
          </div>

          {/* TOP */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              marginLeft: -115,
              zIndex: 10,
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(-16px)",
              transition: "opacity 0.7s ease 600ms, transform 0.7s ease 600ms",
            }}
          >
            <PillarCard
              pillar={pillars[0]}
              hovered={hovered === 0}
              onEnter={() => setHovered(0)}
              onLeave={() => setHovered(null)}
            />
          </div>
          {/* RIGHT */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: 0,
              marginTop: -100,
              zIndex: 10,
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(16px)",
              transition: "opacity 0.7s ease 750ms, transform 0.7s ease 750ms",
            }}
          >
            <PillarCard
              pillar={pillars[1]}
              hovered={hovered === 1}
              onEnter={() => setHovered(1)}
              onLeave={() => setHovered(null)}
            />
          </div>
          {/* BOTTOM */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              marginLeft: -115,
              zIndex: 10,
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s ease 900ms, transform 0.7s ease 900ms",
            }}
          >
            <PillarCard
              pillar={pillars[2]}
              hovered={hovered === 2}
              onEnter={() => setHovered(2)}
              onLeave={() => setHovered(null)}
            />
          </div>
          {/* LEFT */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              marginTop: -100,
              zIndex: 10,
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(-16px)",
              transition:
                "opacity 0.7s ease 1050ms, transform 0.7s ease 1050ms",
            }}
          >
            <PillarCard
              pillar={pillars[3]}
              hovered={hovered === 3}
              onEnter={() => setHovered(3)}
              onLeave={() => setHovered(null)}
            />
          </div>
        </div>

        {/* ══════════════════════════════════════════
            MOBILE — Premium vertical layout
            Center node at top → connecting lines → 4 cards
        ══════════════════════════════════════════ */}
        <div
          className="strategy-mobile"
          style={{ display: "none", padding: "0 4px" }}
        >
          {/* Center node */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 0,
              ...vis(300),
            }}
          >
            <CenterNode size={140} />
          </div>

          {/* Connector from center down */}
          <div
            style={{ display: "flex", justifyContent: "center", ...vis(400) }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0,
              }}
            >
              <div
                style={{
                  width: 1,
                  height: 32,
                  background: `linear-gradient(to bottom, ${COLORS.petroleum}, ${COLORS.border})`,
                }}
              />
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: COLORS.gold,
                }}
              />
              <div
                style={{ width: 1, height: 12, background: COLORS.border }}
              />
            </div>
          </div>

          {/* 4 pillar cards stacked */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginTop: 8,
            }}
          >
            {pillars.map((p, i) => (
              <div
                key={i}
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.7s ease ${500 + i * 100}ms, transform 0.7s ease ${500 + i * 100}ms`,
                }}
              >
                {/* Connecting line above each card */}
                {i > 0 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      height: 10,
                      marginBottom: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 1,
                        height: "100%",
                        background: `${p.accent}40`,
                      }}
                    />
                  </div>
                )}

                {/* Mobile card — horizontal layout */}
                <div
                  onTouchStart={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      p.accent;
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      `0 8px 28px ${p.accent}20`;
                  }}
                  onTouchEnd={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      COLORS.border;
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 4px 16px rgba(1,90,98,0.05)";
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    background: COLORS.white,
                    border: `1.5px solid ${COLORS.border}`,
                    borderRadius: 20,
                    padding: "18px 18px",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: "0 4px 16px rgba(1,90,98,0.05)",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                  }}
                >
                  {/* Accent right bar */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      bottom: 0,
                      width: 4,
                      background: p.accent,
                      borderRadius: "0 20px 20px 0",
                    }}
                  />

                  {/* Number badge */}
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      flexShrink: 0,
                      background: `${p.accent}10`,
                      border: `1.5px solid ${p.accent}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Helvetica, Arial, sans-serif",
                        fontSize: 16,
                        fontWeight: 900,
                        color: p.accent,
                      }}
                    >
                      {p.num}
                    </span>
                  </div>

                  {/* Text content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        marginBottom: 5,
                      }}
                    >
                      <div
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: p.accent,
                          flexShrink: 0,
                        }}
                      />
                      <p
                        style={{
                          fontFamily: "Helvetica, Arial, sans-serif",
                          fontSize: 8,
                          fontWeight: 700,
                          color: p.accent,
                          letterSpacing: "2px",
                          textTransform: "uppercase",
                          margin: 0,
                        }}
                      >
                        {p.en}
                      </p>
                    </div>
                    <h4
                      style={{
                        fontFamily: "'Beiruti', sans-serif",
                        fontSize: 16,
                        fontWeight: 800,
                        color: COLORS.ink,
                        margin: "0 0 4px",
                        lineHeight: 1.3,
                      }}
                    >
                      {p.ar}
                    </h4>
                    <p
                      style={{
                        fontFamily: "'Beiruti', sans-serif",
                        fontSize: 12,
                        fontWeight: 500,
                        color: COLORS.inkMuted,
                        margin: 0,
                        lineHeight: 1.6,
                      }}
                    >
                      {p.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            SUMMARY STRIP — desktop + mobile
        ══════════════════════════════════════════ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 1,
            background: COLORS.border,
            borderRadius: "0 0 24px 24px",
            overflow: "hidden",
            border: `1px solid ${COLORS.border}`,
            marginTop: 16,
            ...vis(1200),
          }}
          className="strategy-strip"
        >
          {pillars.map((p, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === i ? p.accent : COLORS.white,
                padding: "22px 24px",
                cursor: "default",
                position: "relative",
                transition: "background 0.3s ease",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  left: 0,
                  height: 3,
                  background: p.accent,
                  opacity: hovered === i ? 1 : 0.35,
                  transition: "opacity 0.3s ease",
                }}
              />
              <p
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontSize: 9,
                  fontWeight: 800,
                  color: hovered === i ? "rgba(255,255,255,0.5)" : COLORS.gold,
                  letterSpacing: "2px",
                  margin: "0 0 7px",
                  transition: "color 0.3s ease",
                }}
              >
                {p.num}
              </p>
              <h4
                style={{
                  fontFamily: "'Beiruti', sans-serif",
                  fontSize: 14,
                  fontWeight: 800,
                  color: hovered === i ? COLORS.white : COLORS.ink,
                  margin: "0 0 5px",
                  lineHeight: 1.35,
                  transition: "color 0.3s ease",
                }}
              >
                {p.ar}
              </h4>
              <p
                style={{
                  fontFamily: "'Beiruti', sans-serif",
                  fontSize: 11,
                  fontWeight: 500,
                  color:
                    hovered === i ? "rgba(255,255,255,0.65)" : COLORS.inkMuted,
                  margin: 0,
                  lineHeight: 1.6,
                  transition: "color 0.3s ease",
                }}
              >
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          VISION BANNER
      ══════════════════════════════════════════ */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "20px 24px 96px",
          ...vis(1400),
        }}
      >
        <div
          style={{
            background: COLORS.petroleum,
            borderRadius: 24,
            padding: "44px 52px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 28,
            position: "relative",
            overflow: "hidden",
            boxShadow: `0 32px 80px ${COLORS.petroleum}25`,
          }}
          className="vision-banner"
        >
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
          <div
            aria-hidden
            style={{
              position: "absolute",
              bottom: -60,
              left: -60,
              width: 200,
              height: 200,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.07)",
              pointerEvents: "none",
            }}
          />

          {/* Left text */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 14,
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
                VISION DIRECTION
              </span>
            </div>
            <h3
              style={{
                fontFamily: "'Beiruti', sans-serif",
                fontSize: 28,
                fontWeight: 900,
                color: COLORS.white,
                margin: "0 0 10px",
                lineHeight: 1.3,
              }}
            >
              التوجه نحو الرؤية
            </h3>
            <p
              style={{
                fontFamily: "'Beiruti', sans-serif",
                fontSize: 15,
                fontWeight: 500,
                color: "rgba(255,255,255,0.65)",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              التكاملية بين العناصر الأربعة تقودنا نحو تحقيق الرؤية
            </p>
          </div>

          {/* Right chips + arrow + star */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              position: "relative",
              zIndex: 1,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: 16,
                background: "rgba(255,255,255,0.06)",
                padding: "14px 20px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              {pillars.map((p, i) => (
                <div
                  key={i}
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 11,
                      background: "rgba(255,255,255,0.07)",
                      border: `1.5px solid ${p.accent}60`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Helvetica, Arial, sans-serif",
                        fontSize: 11,
                        fontWeight: 800,
                        color: p.accent,
                      }}
                    >
                      {p.num}
                    </span>
                  </div>
                  {i < pillars.length - 1 && (
                    <div
                      style={{
                        width: 10,
                        height: 1,
                        background: "rgba(255,255,255,0.12)",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div
                style={{
                  width: 32,
                  height: 1.5,
                  background: `${COLORS.gold}70`,
                  borderRadius: 2,
                }}
              />
              <svg
                width="10"
                height="14"
                viewBox="0 0 10 14"
                fill="none"
                style={{ flexShrink: 0, marginRight: -2 }}
              >
                <path
                  d="M9 1L1 7L9 13"
                  stroke={COLORS.gold}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: `${COLORS.gold}20`,
                border: `2px solid ${COLORS.gold}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 8px 24px ${COLORS.gold}35`,
                flexShrink: 0,
              }}
            >
              <span style={{ color: COLORS.gold, fontSize: 22 }}>✦</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Desktop */
        .strategy-desktop { display: block !important; }
        .strategy-mobile  { display: none   !important; }

        /* Mobile */
        @media (max-width: 1024px) {
          .strategy-desktop { display: none  !important; }
          .strategy-mobile  { display: block !important; }
          .strategy-strip   { display: none  !important; }
          .vision-banner    { padding: 32px 24px !important; }
        }
        @media (max-width: 600px) {
          .vision-banner { padding: 28px 20px !important; }
        }
      `}</style>
    </section>
  );
}
