"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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

const models = [
  {
    num: "01",
    type: "نموذج معرفي",
    typeEn: "Knowledge Model",
    title: "بناء الأصول غير الملموسة",
    desc: "تحويل المعرفة إلى أصول قابلة للتبادل والنمو.",
    icon: "◈",
    accent: COLORS.petroleum,
  },
  {
    num: "02",
    type: "نموذج تكويني",
    typeEn: "Formative Model",
    title: "بناء نموذج الوعي الإنساني",
    desc: "بناء نموذج الوعي لتحقيق النجاح والتنمية.",
    icon: "◎",
    accent: COLORS.gold,
  },
  {
    num: "03",
    type: "نموذج سياسات",
    typeEn: "Policy Model",
    title: "صناعة السياسات",
    desc: "صياغة الغايات العليا للسياسات التعليمية.",
    icon: "⬡",
    accent: COLORS.crimson,
  },
  {
    num: "04",
    type: "مختبر ابتكار",
    typeEn: "Innovation Lab",
    title: "مختبر منظومة للابتكار",
    desc: "تحويل المعرفة إلى نماذج تطبيقية مؤثرة.",
    icon: "◭",
    accent: COLORS.rose,
  },
  {
    num: "05",
    type: "أداة تغذية",
    typeEn: "Feedback Tool",
    title: "الفاصلة المنقوطة",
    desc: "أدوات تغذية راجعة لضبط القرار المؤسسي.",
    icon: "⊕",
    accent: COLORS.petroleum,
  },
  {
    num: "06",
    type: "نموذج قياس",
    typeEn: "Measurement Model",
    title: "قياس التوجه",
    desc: "إعادة تشكيل المنطق لدى عناصر المنظومة التعليمية.",
    icon: "◉",
    accent: COLORS.gold,
  },
  {
    num: "07",
    type: "نموذج أداء",
    typeEn: "Performance Model",
    title: "الأداء الوظيفي",
    desc: "ضبط القدرات البشرية داخل المؤسسات.",
    icon: "▲",
    accent: COLORS.crimson,
  },
  {
    num: "08",
    type: "نموذج عقاري",
    typeEn: "Real Estate Model",
    title: "التطوير العقاري في التعليم",
    desc: "إعادة تعريف العلاقة بين التعليم والمكان.",
    icon: "⬢",
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

export default function Models() {
  const { ref, inView } = useInView();
  const [hovered, setHovered] = useState<number | null>(null);

  const vis = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
  });

  return (
    <section
      id="models"
      dir="rtl"
      ref={ref}
      style={{
        background: COLORS.offwhite,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dot pattern */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `radial-gradient(${COLORS.petroleum}06 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* ══════════════════════════════════════════
          HEADER
      ══════════════════════════════════════════ */}
      <div
        style={{
          background: COLORS.white,
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
              04
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
              KNOWLEDGE PRODUCTS
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
                  fontSize: "clamp(44px, 5vw, 76px)",
                  fontWeight: 900,
                  color: COLORS.ink,
                  lineHeight: 1.1,
                  letterSpacing: -2,
                  margin: 0,
                }}
              >
                نماذج ومنتجات
                <br />
                <span
                  style={{
                    color: COLORS.petroleum,
                    position: "relative",
                    display: "inline-block",
                    paddingBottom: 6,
                  }}
                >
                  معرفية
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

            {/* Right block */}
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
                    fontSize: 26,
                    fontWeight: 900,
                    color: COLORS.petroleum,
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  ثمانية نماذج معرفية
                  <br />
                  مصممة للأثر
                </p>
              </div>
              <p
                style={{
                  fontFamily: "'Beiruti', sans-serif",
                  fontSize: 16,
                  fontWeight: 500,
                  color: COLORS.inkSoft,
                  margin: "0 0 28px",
                  lineHeight: 1.95,
                }}
              >
                كل نموذج من نماذج منظومة هو منتج معرفي قائم بذاته — مُصمَّم
                لبناء قدرة مؤسسية حقيقية، وتحويل المعرفة إلى أصل اقتصادي قابل
                للتفعيل.
              </p>

              {/* Counters */}
              <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
                {[
                  { val: "8", label: "نماذج معرفية" },
                  { val: "100%", label: "تخصص معرفي" },
                ].map((s, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", alignItems: "center", gap: 32 }}
                  >
                    {i > 0 && (
                      <div
                        style={{
                          width: 1,
                          height: 40,
                          background: COLORS.border,
                        }}
                      />
                    )}
                    <div style={{ textAlign: "center" }}>
                      <p
                        style={{
                          fontFamily: "Helvetica, Arial, sans-serif",
                          fontSize: 36,
                          fontWeight: 900,
                          color: COLORS.petroleum,
                          margin: "0 0 4px",
                          lineHeight: 1,
                          letterSpacing: -1,
                        }}
                      >
                        {s.val}
                      </p>
                      <p
                        style={{
                          fontFamily: "'Beiruti', sans-serif",
                          fontSize: 12,
                          fontWeight: 500,
                          color: COLORS.inkMuted,
                          margin: 0,
                        }}
                      >
                        {s.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          FEATURED PRODUCT — هاكاثون الوعي المعرفي
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
        <div style={vis(300)}>
          {/* Section label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 28,
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
              FEATURED INITIATIVE
            </span>
          </div>

          {/* Hackathon card */}
          <a
            href="https://hackathonwa3i.online/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", display: "block" }}
          >
            <div
              style={{
                background: COLORS.white,
                border: `1.5px solid ${COLORS.border}`,
                borderRadius: 28,
                overflow: "hidden",
                boxShadow: `0 24px 80px ${COLORS.petroleum}0A`,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                transition: "all 0.35s ease",
                cursor: "pointer",
              }}
              className="hackathon-card"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  `0 40px 100px ${COLORS.petroleum}18`;
                (e.currentTarget as HTMLElement).style.borderColor =
                  COLORS.petroleum;
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  `0 24px 80px ${COLORS.petroleum}0A`;
                (e.currentTarget as HTMLElement).style.borderColor =
                  COLORS.border;
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(0)";
              }}
            >
              {/* LEFT — content */}
              <div
                style={{
                  padding: "52px 52px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "'Beiruti', sans-serif",
                      fontSize: "clamp(28px, 3.5vw, 46px)",
                      fontWeight: 900,
                      color: COLORS.ink,
                      lineHeight: 1.25,
                      margin: "0 0 16px",
                      letterSpacing: -0.5,
                    }}
                  >
                    هاكاثون
                    <br />
                    <span style={{ color: COLORS.petroleum }}>
                      الوعي المعرفي
                    </span>
                  </h3>

                  {/* Gold divider */}
                  <div
                    style={{
                      width: 48,
                      height: 3,
                      background: COLORS.gold,
                      borderRadius: 2,
                      marginBottom: 20,
                    }}
                  />

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: "'Beiruti', sans-serif",
                      fontSize: 16,
                      fontWeight: 500,
                      color: COLORS.inkSoft,
                      lineHeight: 1.9,
                      margin: "0 0 32px",
                    }}
                  >
                    مبادرة معرفية أطلقتها منظومة بالشراكة مع جامعة الملك سعود —
                    تجسيداً حقيقياً لنموذج تحويل المعرفة إلى قيمة مؤسسية مؤثرة.
                  </p>

                  {/* Meta row */}
                  <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
                    {[
                      { label: "الجهة", value: "جامعة الملك سعود" },
                      { label: "النوع", value: "مبادرة معرفية" },
                      { label: "الحالة", value: "منجز ✦" },
                    ].map((m, i) => (
                      <div key={i}>
                        <p
                          style={{
                            fontFamily: "Helvetica, Arial, sans-serif",
                            fontSize: 9,
                            fontWeight: 700,
                            color: COLORS.inkMuted,
                            letterSpacing: "2px",
                            textTransform: "uppercase",
                            margin: "0 0 5px",
                          }}
                        >
                          {m.label}
                        </p>
                        <p
                          style={{
                            fontFamily: "'Beiruti', sans-serif",
                            fontSize: 14,
                            fontWeight: 800,
                            color: COLORS.ink,
                            margin: 0,
                          }}
                        >
                          {m.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div style={{ marginTop: 40 }}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 12,
                      background: COLORS.petroleum,
                      color: COLORS.white,
                      borderRadius: 999,
                      padding: "12px 28px",
                      fontFamily: "'Beiruti', sans-serif",
                      fontSize: 15,
                      fontWeight: 800,
                      boxShadow: `0 10px 32px ${COLORS.petroleum}30`,
                    }}
                  >
                    <span>زيارة الموقع</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8H13M13 8L8 3M13 8L8 13"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p
                    style={{
                      fontFamily: "Helvetica, Arial, sans-serif",
                      fontSize: 10,
                      fontWeight: 600,
                      color: COLORS.inkMuted,
                      letterSpacing: "1.5px",
                      marginTop: 10,
                      textTransform: "uppercase",
                    }}
                  >
                    hackathonwa3i.online
                  </p>
                </div>
              </div>

              {/* RIGHT — image */}
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  background: COLORS.ink,
                  minHeight: 480,
                }}
              >
                {/* Petroleum overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(135deg, ${COLORS.petroleum}CC 0%, ${COLORS.ink}99 100%)`,
                    zIndex: 1,
                  }}
                />

                {/* Actual image */}
                <Image
                  src="/hakathon.png"
                  alt="هاكاثون الوعي المعرفي - منظومة"
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    opacity: 0.6,
                  }}
                />

                {/* Content overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "40px",
                  }}
                >
                  {/* Top — URL chip */}
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: 999,
                      padding: "6px 16px",
                      alignSelf: "flex-start",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <div
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: COLORS.gold,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "Helvetica, Arial, sans-serif",
                        fontSize: 9,
                        fontWeight: 700,
                        color: "rgba(255,255,255,0.8)",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                      }}
                    >
                      hackathonwa3i.online
                    </span>
                  </div>

                  {/* Bottom — title overlay */}
                  <div>
                    <div
                      style={{
                        width: 32,
                        height: 2,
                        background: COLORS.gold,
                        borderRadius: 1,
                        marginBottom: 14,
                      }}
                    />
                    <p
                      style={{
                        fontFamily: "'Beiruti', sans-serif",
                        fontSize: 13,
                        fontWeight: 700,
                        color: "rgba(255,255,255,0.55)",
                        margin: "0 0 6px",
                        letterSpacing: "1px",
                      }}
                    >
                      منتج معرفي تطبيقي
                    </p>
                    <h4
                      style={{
                        fontFamily: "'Beiruti', sans-serif",
                        fontSize: 28,
                        fontWeight: 900,
                        color: COLORS.white,
                        margin: 0,
                        lineHeight: 1.3,
                      }}
                    >
                      هاكاثون الوعي
                      <br />
                      <span style={{ color: COLORS.gold }}>المعرفي</span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MODELS GRID
      ══════════════════════════════════════════ */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "48px 24px 104px",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Sub-label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 24,
            ...vis(400),
          }}
        >
          <div style={{ width: 28, height: 1, background: COLORS.border }} />
          <span
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 9,
              fontWeight: 700,
              color: COLORS.inkMuted,
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            ALL KNOWLEDGE MODELS
          </span>
        </div>

        {/* 8-card grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 1,
            background: COLORS.border,
            borderRadius: 24,
            overflow: "hidden",
            border: `1px solid ${COLORS.border}`,
            boxShadow: `0 24px 80px ${COLORS.petroleum}07`,
          }}
          className="models-grid"
        >
          {models.map((m, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={
                {
                  background: hovered === i ? COLORS.offwhite : COLORS.white,
                  padding: "32px 28px",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "default",
                  transition: "background 0.25s ease",
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(16px)",
                  transition2: `opacity 0.7s ease ${200 + i * 70}ms, transform 0.7s ease ${200 + i * 70}ms`,
                } as React.CSSProperties
              }
            >
              {/* Top accent bar */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  left: 0,
                  height: 3,
                  background: hovered === i ? m.accent : "transparent",
                  transition: "background 0.25s ease",
                }}
              />

              {/* Gold dot — top left */}
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: COLORS.gold,
                  opacity: hovered === i ? 1 : 0,
                  transition: "opacity 0.25s ease",
                }}
              />

              {/* Number + icon */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: hovered === i ? m.accent : COLORS.offwhite,
                    border: `1px solid ${hovered === i ? m.accent : COLORS.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow:
                      hovered === i ? `0 6px 20px ${m.accent}30` : "none",
                    transition: "all 0.25s ease",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Helvetica, Arial, sans-serif",
                      fontSize: 11,
                      fontWeight: 900,
                      color: hovered === i ? COLORS.white : COLORS.petroleum,
                      transition: "color 0.25s ease",
                    }}
                  >
                    {m.num}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: 20,
                    color: hovered === i ? m.accent : COLORS.border,
                    transition: "color 0.25s ease",
                  }}
                >
                  {m.icon}
                </span>
              </div>

              {/* Type EN */}
              <p
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontSize: 9,
                  fontWeight: 700,
                  color: hovered === i ? m.accent : COLORS.inkMuted,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  margin: "0 0 5px",
                  transition: "color 0.25s ease",
                }}
              >
                {m.typeEn}
              </p>

              {/* Type AR */}
              <p
                style={{
                  fontFamily: "'Beiruti', sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  color: hovered === i ? m.accent : COLORS.inkMuted,
                  margin: "0 0 8px",
                  transition: "color 0.25s ease",
                }}
              >
                {m.type}
              </p>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "'Beiruti', sans-serif",
                  fontSize: 16,
                  fontWeight: 800,
                  color: COLORS.ink,
                  margin: "0 0 10px",
                  lineHeight: 1.4,
                }}
              >
                {m.title}
              </h3>

              {/* Desc */}
              <p
                style={{
                  fontFamily: "'Beiruti', sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  color: COLORS.inkMuted,
                  margin: "0 0 16px",
                  lineHeight: 1.7,
                }}
              >
                {m.desc}
              </p>

              {/* Bottom indicator */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  opacity: hovered === i ? 1 : 0,
                  transition: "opacity 0.25s ease",
                }}
              >
                <div style={{ width: 16, height: 1, background: m.accent }} />
                <span
                  style={{
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontSize: 8,
                    fontWeight: 700,
                    color: m.accent,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                  }}
                >
                  Manzoma
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
            background: COLORS.white,
            border: `1px solid ${COLORS.border}`,
            borderRadius: "0 0 20px 20px",
            padding: "32px 40px",
            marginTop: 1,
            boxShadow: `0 12px 40px ${COLORS.petroleum}06`,
            ...vis(900),
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontSize: 9,
                fontWeight: 700,
                color: COLORS.inkMuted,
                letterSpacing: "3px",
                textTransform: "uppercase",
                margin: "0 0 8px",
              }}
            >
              KNOWLEDGE PORTFOLIO
            </p>
            <p
              style={{
                fontFamily: "'Beiruti', sans-serif",
                fontSize: 20,
                fontWeight: 800,
                color: COLORS.ink,
                margin: 0,
              }}
            >
              منظومة كاملة من النماذج المعرفية المتكاملة
            </p>
          </div>
          <a
            href="#contact"
            style={{
              fontFamily: "'Beiruti', sans-serif",
              fontSize: 15,
              fontWeight: 800,
              color: COLORS.white,
              textDecoration: "none",
              background: COLORS.petroleum,
              padding: "14px 32px",
              borderRadius: 999,
              boxShadow: `0 8px 28px ${COLORS.petroleum}30`,
              whiteSpace: "nowrap",
              transition: "all 0.2s ease",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#01707A";
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                COLORS.petroleum;
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(0)";
            }}
          >
            تواصل معنا لمعرفة المزيد
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .hackathon-card { grid-template-columns: 1fr !important; }
          .models-grid    { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 640px) {
          .models-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
