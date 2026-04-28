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

const accents = [C.petroleum, C.gold, C.crimson, C.rose, C.petroleum];

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

function getPos(i: number, total: number, r: number) {
  const angle = (i * 360) / total - 90;
  const rad = (angle * Math.PI) / 180;
  return { x: 50 + r * Math.cos(rad), y: 50 + r * Math.sin(rad) };
}

function useInView(threshold = 0.08) {
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

      {/* ══════════════════════════════════════════
          HEADER
      ══════════════════════════════════════════ */}
      <div
        style={{
          background: C.white,
          borderBottom: `1px solid ${C.border}`,
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
            background: `linear-gradient(to left, ${C.rose}, ${C.crimson}, ${C.gold}, ${C.petroleum})`,
          }}
        />
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
              gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))",
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

      {/* ══════════════════════════════════════════
          DESKTOP — Constellation diagram
      ══════════════════════════════════════════ */}
      <div
        className="partners-desktop"
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
            paddingBottom: "90%",
            ...vis(300),
          }}
        >
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
              <filter id="lineGlow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
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

          {/* Center — Manzoma */}
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
                width: 180,
                height: 180,
                borderRadius: "50%",
                background: C.white,
                border: `1.5px solid ${C.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 0 14px ${C.offwhite}, 0 0 0 15px ${C.border}, 0 24px 64px rgba(1,90,98,0.14)`,
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
                  borderRadius: "50%",
                  backgroundImage: `radial-gradient(${C.petroleum}06 1px, transparent 1px)`,
                  backgroundSize: "10px 10px",
                }}
              />

              <div
                style={{
                  width: 150,
                  overflow: "hidden",
                  marginTop: "-8%",
                  marginBottom: "-8%",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <Image
                  src="/logo2.png"
                  alt="منظومة"
                  width={300}
                  height={135}
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

          {/* Partner nodes */}
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
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: isActive ? 120 : 88,
                    height: isActive ? 120 : 88,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${acc}22 0%, transparent 70%)`,
                    transition: "all 0.4s ease",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 20,
                    background: C.white,
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
                {/* Tooltip */}
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

      {/* ══════════════════════════════════════════
          MOBILE — Premium layout (hidden on desktop)
          Manzoma badge → gold line → partner cards
      ══════════════════════════════════════════ */}
      <div
        className="partners-mobile"
        style={{
          display: "none",
          padding: "52px 20px 20px",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Manzoma center badge */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 8,
            ...vis(180),
          }}
        >
          <div
            style={{
              width: 130,
              height: 130,
              borderRadius: "50%",
              background: C.white,
              border: `1.5px solid ${C.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 0 10px ${C.offwhite}, 0 0 0 11px ${C.border}, 0 16px 48px rgba(1,90,98,0.1)`,
              position: "relative",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
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
            <div
              style={{
                width: 105,
                overflow: "hidden",
                marginTop: "-8%",
                marginBottom: "-8%",
                position: "relative",
                zIndex: 1,
              }}
            >
              <Image
                src="/logo2.png"
                alt="منظومة"
                width={210}
                height={95}
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </div>
          </div>

          {/* Connecting line + dot */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "12px 0",
            }}
          >
            <div
              style={{
                width: 1,
                height: 28,
                background: `linear-gradient(to bottom, ${C.gold}, ${C.border})`,
              }}
            />
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: C.gold,
                marginTop: -2,
              }}
            />
          </div>

          {/* Label */}
          <p
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 9,
              fontWeight: 700,
              color: C.inkMuted,
              letterSpacing: "3px",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            شركاء النجاح
          </p>
        </div>

        {/* Vertical partner cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            marginTop: 28,
          }}
        >
          {partners.map((p, i) => (
            <a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 16,
                background: C.white,
                border: `1.5px solid ${C.border}`,
                borderRadius: 20,
                padding: "16px 18px",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 4px 16px rgba(1,90,98,0.05)",
                ...vis(260 + i * 80),
              }}
              onTouchStart={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = accents[i];
                (e.currentTarget as HTMLElement).style.boxShadow =
                  `0 8px 28px ${accents[i]}20`;
              }}
              onTouchEnd={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = C.border;
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 4px 16px rgba(1,90,98,0.05)";
              }}
            >
              {/* Accent right bar (RTL) */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: 4,
                  background: accents[i],
                  borderRadius: "0 20px 20px 0",
                }}
              />

              {/* Logo box */}
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  flexShrink: 0,
                  background: `${accents[i]}08`,
                  border: `1.5px solid ${accents[i]}25`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={48}
                  height={48}
                  style={{ objectFit: "contain", width: "75%", height: "75%" }}
                />
              </div>

              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 4,
                  }}
                >
                  <div
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: accents[i],
                      flexShrink: 0,
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "Helvetica, Arial, sans-serif",
                      fontSize: 9,
                      fontWeight: 700,
                      color: accents[i],
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      margin: 0,
                    }}
                  >
                    PARTNER 0{i + 1}
                  </p>
                </div>
                <p
                  style={{
                    fontFamily: "'Beiruti', sans-serif",
                    fontSize: 16,
                    fontWeight: 800,
                    color: C.ink,
                    margin: "0 0 3px",
                    lineHeight: 1.3,
                  }}
                >
                  {p.name}
                </p>
                <p
                  style={{
                    fontFamily: "'Beiruti', sans-serif",
                    fontSize: 13,
                    fontWeight: 500,
                    color: C.inkMuted,
                    margin: 0,
                  }}
                >
                  {p.desc}
                </p>
              </div>

              {/* Arrow */}
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  flexShrink: 0,
                  background: `${accents[i]}10`,
                  border: `1.5px solid ${accents[i]}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path
                    d="M10 6.5H3M3 6.5L6.5 3M3 6.5L6.5 10"
                    stroke={accents[i]}
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          BOTTOM STRIP — both desktop + mobile
      ══════════════════════════════════════════ */}
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
                padding: "22px 12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
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
                  background: accents[i],
                  opacity: active === i ? 1 : 0.3,
                  transition: "opacity 0.3s ease",
                }}
              />
              <div
                style={{
                  width: 52,
                  height: 52,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  filter: active === i ? "none" : "grayscale(20%)",
                  transition: "filter 0.3s ease",
                }}
              >
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={44}
                  height={44}
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
                  fontSize: 11,
                  fontWeight: 700,
                  color: active === i ? C.white : C.ink,
                  margin: 0,
                  textAlign: "center",
                  transition: "color 0.3s ease",
                  lineHeight: 1.3,
                }}
              >
                {p.name}
              </p>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        /* ── Desktop ── */
        .partners-desktop { display: block; }
        .partners-mobile  { display: none !important; }

        /* ── Mobile: hide constellation, show cards ── */
        @media (max-width: 768px) {
          .partners-desktop { display: none !important; }
          .partners-mobile  { display: block !important; }
          .partners-strip   { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .partners-strip { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
