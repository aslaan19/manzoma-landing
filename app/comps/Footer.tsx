"use client";

import { useEffect, useRef, useState } from "react";
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

const navLinks = [
  {
    heading: "عن منظومة",
    headingEn: "About",
    links: [
      { label: "من نحن", href: "#about" },
      { label: "لماذا منظومة", href: "#why" },
      { label: "استراتيجيتنا", href: "#strategy" },
    ],
  },
  {
    heading: "منتجاتنا",
    headingEn: "Products",
    links: [
      { label: "النماذج المعرفية", href: "#models" },
      { label: "القرارات الاستراتيجية", href: "#models" },
      {
        label: "هاكاثون الوعي المعرفي",
        href: "https://hackathonwa3i.online/",
        external: true,
      },
    ],
  },
  {
    heading: "تواصل معنا",
    headingEn: "Contact",
    links: [
      { label: "info@manzoma.sa", href: "mailto:info@manzoma.sa" },
      { label: "manzoma.sa", href: "#" },
    ],
  },
];

const elements = [
  { ar: "المعرفة", en: "Knowledge", accent: COLORS.rose },
  { ar: "الحافز المالي", en: "Financial Drive", accent: COLORS.gold },
  { ar: "الإقتصاد", en: "Economy", accent: COLORS.petroleum },
  { ar: "الديموغرافيا", en: "Demographics", accent: COLORS.crimson },
];

function useInView(threshold = 0.05) {
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

export default function Footer() {
  const { ref, inView } = useInView();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const vis = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(16px)",
    transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
  });

  return (
    <footer
      dir="rtl"
      ref={ref}
      style={{
        background: COLORS.offwhite,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Same faint grid as every other section */}
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

      {/* Subtle decorative rings — same style as other sections */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: -160,
          right: -160,
          width: 480,
          height: 480,
          borderRadius: "50%",
          border: `1px solid ${COLORS.petroleum}06`,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: -80,
          right: -80,
          width: 280,
          height: 280,
          borderRadius: "50%",
          border: `1px solid ${COLORS.petroleum}04`,
          pointerEvents: "none",
        }}
      />

      {/* ══════════════════════════════════════════
          TOP LINE — same 4-color gradient
      ══════════════════════════════════════════ */}
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

      {/* ══════════════════════════════════════════
          MAIN BODY
      ══════════════════════════════════════════ */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "72px 24px 56px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.8fr 1fr 1fr 1fr",
            gap: 64,
            alignItems: "start",
          }}
          className="footer-grid"
        >
          {/* ── BRAND COLUMN ── */}
          <div style={vis(100)}>
            {/* Logo */}
            <div style={{ marginBottom: 24 }}>
              <Image
                src="/logo.png"
                alt="منظومة - Manzoma"
                width={160}
                height={72}
                style={{ objectFit: "contain" }}
              />
            </div>

            <p
              style={{
                fontFamily: "'Beiruti', sans-serif",
                fontSize: 15,
                fontWeight: 500,
                color: COLORS.inkMuted,
                lineHeight: 1.9,
                margin: "0 0 32px",
                maxWidth: 300,
              }}
            >
              شركة متخصصة في بناء النماذج والمنتجات المعرفية التي تمكّن المؤسسات
              من تحقيق نمو اقتصادي حقيقي.
            </p>

            {/* 4 element pills */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {elements.map((el, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: el.accent,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Beiruti', sans-serif",
                      fontSize: 13,
                      fontWeight: 700,
                      color: COLORS.inkSoft,
                    }}
                  >
                    {el.ar}
                  </span>
                  <span
                    style={{
                      fontFamily: "Helvetica, Arial, sans-serif",
                      fontSize: 9,
                      fontWeight: 600,
                      color: COLORS.inkMuted,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      marginRight: "auto",
                      opacity: 0.6,
                    }}
                  >
                    {el.en}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── NAV COLUMNS ── */}
          {navLinks.map((col, ci) => (
            <div key={ci} style={vis(200 + ci * 100)}>
              {/* Heading */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 2,
                    background: COLORS.petroleum,
                    borderRadius: 2,
                  }}
                />
                <h4
                  style={{
                    fontFamily: "'Beiruti', sans-serif",
                    fontSize: 15,
                    fontWeight: 800,
                    color: COLORS.ink,
                    margin: 0,
                  }}
                >
                  {col.heading}
                </h4>
              </div>
              <p
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontSize: 9,
                  fontWeight: 700,
                  color: COLORS.inkMuted,
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  margin: "0 0 24px",
                  opacity: 0.7,
                }}
              >
                {col.headingEn}
              </p>

              {/* Links */}
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                {col.links.map((link, li) => {
                  const key = `${ci}-${li}`;
                  const isHovered = hoveredLink === key;
                  return (
                    <li key={li}>
                      <a
                        href={link.href}
                        target={
                          "external" in link && link.external
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          "external" in link && link.external
                            ? "noopener noreferrer"
                            : undefined
                        }
                        onMouseEnter={() => setHoveredLink(key)}
                        onMouseLeave={() => setHoveredLink(null)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          fontFamily: "'Beiruti', sans-serif",
                          fontSize: 14,
                          fontWeight: 600,
                          color: isHovered ? COLORS.petroleum : COLORS.inkMuted,
                          textDecoration: "none",
                          transition: "color 0.2s ease",
                        }}
                      >
                        {/* Sliding petroleum line */}
                        <span
                          style={{
                            display: "block",
                            width: isHovered ? 14 : 0,
                            height: 1,
                            background: COLORS.petroleum,
                            borderRadius: 1,
                            flexShrink: 0,
                            transition: "width 0.2s ease",
                          }}
                        />
                        {link.label}
                        {"external" in link && link.external && (
                          <svg
                            width="9"
                            height="9"
                            viewBox="0 0 9 9"
                            fill="none"
                            style={{ opacity: 0.4, flexShrink: 0 }}
                          >
                            <path
                              d="M1.5 7.5L7.5 1.5M7.5 1.5H3.5M7.5 1.5V5.5"
                              stroke={COLORS.petroleum}
                              strokeWidth="1.2"
                              strokeLinecap="round"
                            />
                          </svg>
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          DIVIDER
      ══════════════════════════════════════════ */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div style={{ height: 1, background: COLORS.border }} />
      </div>

      {/* ══════════════════════════════════════════
          BOTTOM BAR
      ══════════════════════════════════════════ */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "20px 24px",
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        {/* Copyright */}
        <p
          style={{
            fontFamily: "'Beiruti', sans-serif",
            fontSize: 12,
            fontWeight: 500,
            color: COLORS.inkMuted,
            margin: 0,
          }}
        >
          © 2026 منظومة المعرفية. جميع الحقوق محفوظة.
        </p>

        {/* Center — 4 colored dots */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {elements.map((el, i) => (
            <div
              key={i}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              {i > 0 && (
                <div
                  style={{ width: 1, height: 10, background: COLORS.border }}
                />
              )}
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: el.accent,
                  opacity: 0.7,
                }}
              />
            </div>
          ))}
        </div>

        {/* Right — URL */}
        <p
          style={{
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 10,
            fontWeight: 700,
            color: COLORS.petroleum,
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            margin: 0,
            opacity: 0.6,
          }}
        >
          manzoma.sa
        </p>
      </div>
    </footer>
  );
}
