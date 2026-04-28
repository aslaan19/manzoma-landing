"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const C = {
  petroleum: "#015A62",
  gold: "#C7A856",
  crimson: "#972B28",
  rose: "#B18083",
  white: "#FFFFFF",
  offwhite: "#F8F6F1",
  border: "#E8E4DC",
  ink: "#0D1F21",
  inkSoft: "#2E4547",
  inkMuted: "#7A8C8D",
};

const accents = [C.petroleum, C.gold, C.crimson, C.rose, C.petroleum, C.gold];

const partners = [
  {
    id: 1,
    name: "جامعة الملك سعود",
    logo: "/ksu.png",
    url: "https://ksu.edu.sa/en",
    desc: "شريك استراتيجي في التطوير",
  },
  {
    id: 2,
    name: "شركة راز للاستشارات التطويرية",
    logo: "/raz.png",
    url: "https://x.com/raz_cd",
    desc: "شريك في الابتكار المعرفي",
  },
  {
    id: 3,
    name: "شركة القيمة الغارقة",
    logo: "/sunk.png",
    url: "https://x.com/raz_cd",
    desc: "شريك في النمو المستدام",
  },
  {
    id: 4,
    name: "جمعية واعي",
    logo: "/wa3i.png",
    url: "https://wa3i.sa/",
    desc: "شريك في هاكاثون الوعي المعرفي",
  },
  {
    id: 5,
    name: "جمعية انسان",
    logo: "/insan.png",
    url: "https://ensan.org.sa/",
    desc: "شريك رعاية المعرفة التطويرية",
  },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// Get orbital positions — evenly distributed around center
function getPos(i: number, total: number, radiusVw: number) {
  const angle = (i * 360) / total - 90; // start from top
  const rad = (angle * Math.PI) / 180;
  return {
    x: 50 + radiusVw * Math.cos(rad),
    y: 50 + radiusVw * Math.sin(rad),
  };
}

export default function Partners() {
  const { ref, inView } = useInView();
  const [active, setActive] = useState<number | null>(null);

  const vis = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
  });

  return (
    <section
      id="partners"
      dir="rtl"
      ref={ref}
      style={{
        background: C.offwhite,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Faint grid */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `
          linear-gradient(${C.petroleum}04 1px, transparent 1px),
          linear-gradient(90deg, ${C.petroleum}04 1px, transparent 1px)
        `,
          backgroundSize: "56px 56px",
        }}
      />

      {/* ── HEADER ── */}
      <div
        style={{
          background: C.white,
          borderBottom: `1px solid ${C.border}`,
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
            fontSize: "clamp(140px,18vw,240px)",
            fontWeight: 900,
            color: `${C.petroleum}04`,
            lineHeight: 1,
            letterSpacing: -8,
            userSelect: "none",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          06
        </div>

        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
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
                color: C.border,
                letterSpacing: "2px",
              }}
            >
              06
            </span>
            <div style={{ width: 40, height: 1, background: C.border }} />
            <span
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontSize: 10,
                fontWeight: 700,
                color: C.petroleum,
                letterSpacing: "5px",
                textTransform: "uppercase",
              }}
            >
              OUR PARTNERS
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))",
              gap: 80,
              alignItems: "end",
            }}
          >
            <div style={vis(150)}>
              <h2
                style={{
                  fontFamily: "'Beiruti', sans-serif",
                  fontSize: "clamp(44px,5.5vw,76px)",
                  fontWeight: 900,
                  color: C.ink,
                  lineHeight: 1.1,
                  letterSpacing: -2,
                  margin: 0,
                }}
              >
                شركاء
                <br />
                <span
                  style={{
                    color: C.petroleum,
                    position: "relative",
                    display: "inline-block",
                    paddingBottom: 6,
                  }}
                >
                  النجاح
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

            <div style={{ paddingBottom: 8, ...vis(280) }}>
              <div
                style={{
                  borderRight: `3px solid ${C.petroleum}`,
                  paddingRight: 24,
                  marginBottom: 22,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Beiruti', sans-serif",
                    fontSize: 20,
                    fontWeight: 900,
                    color: C.petroleum,
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  شراكات حقيقية
                  <br />
                  تُنتج قيمة مستدامة
                </p>
              </div>
              <p
                style={{
                  fontFamily: "'Beiruti', sans-serif",
                  fontSize: 16,
                  fontWeight: 500,
                  color: C.inkSoft,
                  margin: 0,
                  lineHeight: 1.95,
                }}
              >
                نبني علاقاتنا على أساس التكامل المعرفي — كل شراكة تُجسّد تقاطعاً
                حقيقياً بين رؤيتنا ورؤية شركائنا في خلق الأثر.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── CONSTELLATION DIAGRAM ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 900,
          margin: "0 auto",
          padding: "80px 24px 40px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: "90%", // square-ish aspect ratio
            ...vis(300),
          }}
        >
          {/* ── SVG — rings + lines ── */}
          <svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              overflow: "visible",
            }}
          >
            <defs>
              {/* Gold gradient for active lines */}
              <linearGradient id="goldLine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={C.gold} stopOpacity="0.05" />
                <stop offset="50%" stopColor={C.gold} stopOpacity="0.55" />
                <stop offset="100%" stopColor={C.gold} stopOpacity="0.05" />
              </linearGradient>
              {/* Petroleum gradient for idle lines */}
              <linearGradient id="idleLine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={C.petroleum} stopOpacity="0" />
                <stop offset="50%" stopColor={C.petroleum} stopOpacity="0.12" />
                <stop offset="100%" stopColor={C.petroleum} stopOpacity="0" />
              </linearGradient>
              {/* Glow filter */}
              <filter id="lineGlow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Outer decorative ring */}
            <circle
              cx="50%"
              cy="50%"
              r="43%"
              fill="none"
              stroke={C.border}
              strokeWidth="1"
              strokeDasharray="4 8"
              style={{
                opacity: inView ? 1 : 0,
                transition: "opacity 1s ease 400ms",
              }}
            />
            {/* Inner ring */}
            <circle
              cx="50%"
              cy="50%"
              r="22%"
              fill="none"
              stroke={`${C.petroleum}10`}
              strokeWidth="1"
              style={{
                opacity: inView ? 1 : 0,
                transition: "opacity 1s ease 600ms",
              }}
            />

            {/* Lines from center to each partner */}
            {partners.map((_, i) => {
              const pos = getPos(i, partners.length, 43);
              const isActive = active === i;
              return (
                <line
                  key={i}
                  x1="50%"
                  y1="50%"
                  x2={`${pos.x}%`}
                  y2={`${pos.y}%`}
                  stroke={isActive ? C.gold : C.petroleum}
                  strokeWidth={isActive ? 1.5 : 1}
                  strokeOpacity={isActive ? 0.55 : 0.1}
                  strokeDasharray={isActive ? "0" : "5 5"}
                  filter={isActive ? "url(#lineGlow)" : undefined}
                  style={{ transition: "all 0.4s ease" }}
                />
              );
            })}

            {/* Outer ring connecting dots */}
            {partners.map((_, i) => {
              const p1 = getPos(i, partners.length, 43);
              const p2 = getPos((i + 1) % partners.length, partners.length, 43);
              const isActive =
                active === i || active === (i + 1) % partners.length;
              return (
                <line
                  key={`ring-${i}`}
                  x1={`${p1.x}%`}
                  y1={`${p1.y}%`}
                  x2={`${p2.x}%`}
                  y2={`${p2.y}%`}
                  stroke={isActive ? C.gold : C.border}
                  strokeWidth="1"
                  strokeOpacity={isActive ? 0.5 : 0.7}
                  strokeDasharray="3 6"
                  style={{ transition: "all 0.4s ease" }}
                />
              );
            })}

            {/* Gold dot at center */}
            <circle
              cx="50%"
              cy="50%"
              r="4"
              fill={C.gold}
              style={{
                opacity: inView ? 1 : 0,
                transition: "opacity 0.8s ease 700ms",
              }}
            />

            {/* Animated pulse dot on active line */}
            {active !== null &&
              (() => {
                const pos = getPos(active, partners.length, 43);
                return (
                  <circle r="3" fill={C.gold} opacity="0.8">
                    <animateMotion
                      dur="1.2s"
                      repeatCount="indefinite"
                      path={`M0,0 L${(pos.x - 50) * 6},${(pos.y - 50) * 6}`}
                    />
                  </circle>
                );
              })()}
          </svg>

          {/* ── CENTER — Manzoma logo ── */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 20,
              opacity: inView ? 1 : 0,
              transition: "opacity 0.9s ease 500ms",
            }}
          >
            <div
              style={{
                width: 150,
                height: 150,
                borderRadius: "50%",
                background: C.white,
                border: `1.5px solid ${C.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `
  0 20px 60px rgba(1,90,98,0.12),
  0 0 0 8px ${C.offwhite}
              `,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Subtle dot texture */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  borderRadius: "50%",
                  backgroundImage: `radial-gradient(${C.petroleum}06 1px, transparent 1px)`,
                  backgroundSize: "10px 10px",
                }}
              />
              {/* Gold top arc line */}

              {/* Manzoma logo */}
              <div
                style={{
                  width: 150,
                  overflow: "hidden",

                  position: "relative",
                  zIndex: 1,
                }}
              >
                <Image
                  src="/logo2.png"
                  alt="منظومة"
                  width={400}
                  height={300}
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
              </div>
            </div>
          </div>

          {/* ── PARTNER NODES ── */}
          {partners.map((p, i) => {
            const pos = getPos(i, partners.length, 43);
            const isActive = active === i;
            const acc = accents[i];

            return (
              <a
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                style={{
                  position: "absolute",
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: `translate(-50%, -50%) ${isActive ? "scale(1.08)" : "scale(1)"}`,
                  zIndex: 15,
                  textDecoration: "none",
                  opacity: inView ? 1 : 0,
                  transition: `opacity 0.7s ease ${300 + i * 120}ms, transform 0.35s cubic-bezier(0.4,0,0.2,1)`,
                }}
              >
                {/* Outer glow ring on hover */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: isActive ? 110 : 80,
                    height: isActive ? 110 : 80,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${acc}22 0%, transparent 70%)`,
                    transition: "all 0.4s ease",
                    pointerEvents: "none",
                  }}
                />

                {/* Card */}
                <div
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 20,
                    background: isActive ? C.white : C.white,
                    border: `1.5px solid ${isActive ? acc : C.border}`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    boxShadow: isActive
                      ? `0 16px 48px ${acc}30, 0 0 0 4px ${acc}15`
                      : `0 4px 20px rgba(1,90,98,0.07)`,
                    transition: "all 0.35s ease",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Accent top bar */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      left: 0,
                      height: 3,
                      background: acc,
                      opacity: isActive ? 1 : 0.3,
                      transition: "opacity 0.35s ease",
                    }}
                  />

                  {/* Gold corner brackets on hover */}
                  {isActive && (
                    <>
                      <div
                        style={{
                          position: "absolute",
                          top: 6,
                          right: 6,
                          width: 10,
                          height: 10,
                          borderTop: `2px solid ${C.gold}`,
                          borderRight: `2px solid ${C.gold}`,
                          borderRadius: "0 4px 0 0",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: 6,
                          left: 6,
                          width: 10,
                          height: 10,
                          borderBottom: `2px solid ${C.gold}`,
                          borderLeft: `2px solid ${C.gold}`,
                          borderRadius: "0 0 4px 0",
                        }}
                      />
                    </>
                  )}

                  {/* Logo */}
                  <div
                    style={{
                      width: 120,
                      height: 120,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      filter: isActive ? "none" : "grayscale(20%)",
                      transition: "filter 0.35s ease",
                    }}
                  >
                    <Image
                      src={p.logo}
                      alt={p.name}
                      width={40}
                      height={40}
                      style={{
                        objectFit: "contain",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                </div>

                {/* Tooltip — appears on hover */}
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 12px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    opacity: isActive ? 1 : 0,
                    pointerEvents: "none",
                    transition: "opacity 0.3s ease",
                    zIndex: 30,
                    whiteSpace: "nowrap",
                  }}
                >
                  <div
                    style={{
                      background: C.petroleum,
                      borderRadius: 12,
                      padding: "10px 16px",
                      boxShadow: `0 12px 40px ${C.petroleum}30`,
                      textAlign: "center",
                      position: "relative",
                    }}
                  >
                    {/* Tooltip arrow */}
                    <div
                      style={{
                        position: "absolute",
                        top: -6,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 0,
                        height: 0,
                        borderLeft: "6px solid transparent",
                        borderRight: "6px solid transparent",
                        borderBottom: `6px solid ${C.petroleum}`,
                      }}
                    />
                    {/* Gold dot */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        marginBottom: 3,
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: C.gold,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "'Beiruti', sans-serif",
                          fontSize: 13,
                          fontWeight: 800,
                          color: C.gold,
                        }}
                      >
                        {p.name}
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: "'Beiruti', sans-serif",
                        fontSize: 11,
                        fontWeight: 500,
                        color: "rgba(255,255,255,0.7)",
                        margin: 0,
                      }}
                    >
                      {p.desc}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* ── PARTNER LIST STRIP ── */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px 80px",
          ...vis(800),
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${partners.length}, 1fr)`,
            gap: 1,
            background: C.border,
            borderRadius: 20,
            overflow: "hidden",
            border: `1px solid ${C.border}`,
            boxShadow: `0 8px 40px rgba(1,90,98,0.06)`,
          }}
          className="partners-strip"
        >
          {partners.map((p, i) => (
            <a
              key={i}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              style={{
                textDecoration: "none",
                background: active === i ? accents[i] : C.white,
                padding: "24px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                position: "relative",
                transition: "background 0.3s ease",
                cursor: "pointer",
              }}
            >
              {/* Top accent */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  left: 0,
                  height: 3,
                  background: accents[i],
                  opacity: active === i ? 1 : 0.3,
                  transition: "opacity 0.3s ease",
                }}
              />

              {/* Logo */}
              <div
                style={{
                  width: 64,
                  height: 64,
                  filter: active === i ? "none" : "grayscale(20%)",
                  transition: "filter 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={64}
                  height={64}
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>

              <p
                style={{
                  fontFamily: "'Beiruti', sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: active === i ? C.white : C.ink,
                  margin: 0,
                  textAlign: "center",
                  transition: "color 0.3s ease",
                }}
              >
                {p.name}
              </p>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .partners-strip { grid-template-columns: repeat(3,1fr) !important; }
        }
        @media (max-width: 480px) {
          .partners-strip { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </section>
  );
}
