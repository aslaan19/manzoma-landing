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
        background: COLORS.ink,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── BACKGROUND TREATMENT ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `radial-gradient(${COLORS.petroleum}35 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
      {/* Radial petroleum glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: -200,
          right: -200,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.petroleum}30 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />
      {/* Gold glow top left */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -150,
          left: -150,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.gold}08 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />
      {/* Decorative arcs */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: -120,
          right: -120,
          width: 380,
          height: 380,
          borderRadius: "50%",
          border: `1px solid ${COLORS.petroleum}25`,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: -60,
          right: -60,
          width: 220,
          height: 220,
          borderRadius: "50%",
          border: `1px solid ${COLORS.petroleum}18`,
          pointerEvents: "none",
        }}
      />

      {/* ══════════════════════════════════════════
          TOP BRAND BAND
      ══════════════════════════════════════════ */}
      <div
        style={{
          borderBottom: `1px solid rgba(255,255,255,0.06)`,
          padding: "64px 24px",
          position: "relative",
          zIndex: 10,
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
            background: `linear-gradient(to left, ${COLORS.rose}, ${COLORS.crimson}, ${COLORS.gold}, ${COLORS.petroleum})`,
          }}
        />

        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
              gap: 64,
              alignItems: "start",
            }}
            className="footer-main-grid"
          >
            {/* Brand column */}
            <div style={vis(100)}>
              {/* Logo */}
              <div style={{ marginBottom: 28 }}>
                <Image
                  src="/logo.png"
                  alt="منظومة - Manzoma"
                  width={160}
                  height={72}
                  style={{
                    objectFit: "contain",
                    filter: "brightness(0) invert(1)",
                    opacity: 0.9,
                  }}
                />
              </div>

              <p
                style={{
                  fontFamily: "'Beiruti', sans-serif",
                  fontSize: 15,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.9,
                  margin: "0 0 36px",
                  maxWidth: 300,
                }}
              >
                شركة متخصصة في بناء النماذج والمنتجات المعرفية التي تمكّن
                المؤسسات من تحقيق نمو اقتصادي حقيقي.
              </p>

              {/* 4 element dots */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {elements.map((el, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
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
                        color: "rgba(255,255,255,0.4)",
                      }}
                    >
                      {el.ar}
                    </span>
                    <span
                      style={{
                        fontFamily: "Helvetica, Arial, sans-serif",
                        fontSize: 9,
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.2)",
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        marginRight: "auto",
                      }}
                    >
                      {el.en}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nav columns */}
            {navLinks.map((col, ci) => (
              <div key={ci} style={vis(200 + ci * 100)}>
                {/* Heading */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 28,
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 2,
                      background: COLORS.gold,
                      borderRadius: 2,
                    }}
                  />
                  <h4
                    style={{
                      fontFamily: "'Beiruti', sans-serif",
                      fontSize: 14,
                      fontWeight: 800,
                      color: COLORS.white,
                      margin: 0,
                      letterSpacing: "0.3px",
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
                    color: "rgba(255,255,255,0.2)",
                    letterSpacing: "2.5px",
                    textTransform: "uppercase",
                    margin: "0 0 24px",
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
                    gap: 16,
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
                            color: isHovered
                              ? COLORS.gold
                              : "rgba(255,255,255,0.45)",
                            textDecoration: "none",
                            transition: "color 0.2s ease",
                          }}
                        >
                          {/* Sliding line */}
                          <span
                            style={{
                              display: "block",
                              width: isHovered ? 16 : 0,
                              height: 1,
                              background: COLORS.gold,
                              borderRadius: 1,
                              transition: "width 0.2s ease",
                              flexShrink: 0,
                            }}
                          />
                          {link.label}
                          {"external" in link && link.external && (
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 10 10"
                              fill="none"
                              style={{ opacity: 0.5, flexShrink: 0 }}
                            >
                              <path
                                d="M2 8L8 2M8 2H4M8 2V6"
                                stroke={COLORS.gold}
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
      </div>

      {/* ══════════════════════════════════════════
          BOTTOM BAR
      ══════════════════════════════════════════ */}
      <div
        style={{
          borderTop: `1px solid rgba(255,255,255,0.05)`,
          padding: "20px 24px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
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
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 9,
              fontWeight: 600,
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "2px",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            © 2025 منظومة المعرفية. جميع الحقوق محفوظة.
          </p>

          {/* Center — 4 color dots */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {elements.map((el, i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
                {i > 0 && (
                  <div
                    style={{
                      width: 1,
                      height: 10,
                      background: "rgba(255,255,255,0.08)",
                    }}
                  />
                )}
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: el.accent,
                    opacity: 0.6,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Right — URL */}
          <p
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 9,
              fontWeight: 700,
              color: `${COLORS.gold}50`,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            manzoma.sa
          </p>
        </div>
      </div>
    </footer>
  );
}
