/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const COLORS = {
  petroleum: "#015A62",
  accent: "#01707A",
  gold: "#C7A856",
  crimson: "#972B28",
  rose: "#B18083",
  white: "#FFFFFF",
  offwhite: "#F8F6F1",
  border: "#E8E4DC",
  ink: "#0D1F21",
  inkMuted: "#6B7C7D",
};

const navLinks = [
  { label: "الرئيسية", href: "#home" },
  { label: "من نحن", href: "#about" },
  { label: "لماذا منظومة", href: "#why" },
  { label: "الاستراتيجية", href: "#strategy" },
  { label: "النماذج", href: "#models" },
  { label: "الشركاء", href: "#partners" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#home");

  const handleScroll = useCallback(() => {
    const sy = window.scrollY;
    const heroH = window.innerHeight;
    setVisible(sy > heroH * 0.85);
    setScrolled(sy > heroH * 0.85 + 40);

    const ids = [...navLinks.map((l) => l.href.slice(1)), "contact"];
    let cur = "#home";
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) {
        const r = el.getBoundingClientRect();
        if (r.top <= 120 && r.bottom >= 120) {
          cur = `#${id}`;
          break;
        }
      }
    }
    setActiveHash(cur);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const go = (href: string) => {
    setActiveHash(href);
    setMenuOpen(false);
  };

  return (
    <>
      {/* ══════════════════════════════════════════
          MAIN HEADER
      ══════════════════════════════════════════ */}
      <header
        dir="rtl"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          left: 0,
          zIndex: 50,
          transform: visible ? "translateY(0)" : "translateY(-100%)",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          transition:
            "transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease",
        }}
      >
        {/* Glass panel */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: scrolled
              ? "rgba(248,246,241,0.97)"
              : "rgba(248,246,241,0.93)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderBottom: `1px solid ${scrolled ? COLORS.border : "transparent"}`,
            boxShadow: scrolled ? "0 8px 40px rgba(1,90,98,0.07)" : "none",
            transition: "all 0.35s ease",
          }}
        />

        {/* 4-color top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            height: 3,
            background: `linear-gradient(to left, ${COLORS.rose}, ${COLORS.crimson}, ${COLORS.gold}, ${COLORS.petroleum})`,
            opacity: scrolled ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />

        <nav
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 32px",
            height: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* ── LOGO ── */}
          <a
            href="#home"
            onClick={() => go("#home")}
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <div style={{ marginTop: 8 }}>
              <Image
                src="/logo.png"
                alt="منظومة - Manzoma"
                width={160}
                height={72}
                style={{ objectFit: "contain" }}
              />
            </div>
          </a>

          {/* ── DESKTOP NAV ── */}
          <div
            className="nav-desktop"
            style={{ display: "flex", alignItems: "center", gap: 0 }}
          >
            {navLinks.map((link) => {
              const isActive = activeHash === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => go(link.href)}
                  style={{
                    position: "relative",
                    fontFamily: "'Beiruti', sans-serif",
                    fontSize: 15,
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? COLORS.petroleum : COLORS.inkMuted,
                    textDecoration: "none",
                    padding: "8px 16px",
                    borderRadius: 999,
                    transition: "all 0.2s ease",
                    background: isActive
                      ? `${COLORS.petroleum}0C`
                      : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color =
                        COLORS.petroleum;
                      (e.currentTarget as HTMLElement).style.background =
                        `${COLORS.petroleum}07`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color =
                        COLORS.inkMuted;
                      (e.currentTarget as HTMLElement).style.background =
                        "transparent";
                    }
                  }}
                >
                  {link.label}
                  {/* Animated gold underline */}
                  <span
                    style={{
                      position: "absolute",
                      bottom: 4,
                      left: "50%",
                      transform: "translateX(-50%)",
                      height: 2,
                      borderRadius: 2,
                      background: COLORS.gold,
                      width: isActive ? "60%" : "0%",
                      transition: "width 0.3s ease",
                      display: "block",
                    }}
                  />
                </a>
              );
            })}

            {/* Vertical separator */}
            <div
              style={{
                width: 1,
                height: 24,
                background: COLORS.border,
                margin: "0 14px",
                flexShrink: 0,
              }}
            />

            {/* CTA button */}
            <a
              href="#contact"
              onClick={() => go("#contact")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "'Beiruti', sans-serif",
                fontSize: 14,
                fontWeight: 800,
                color: COLORS.white,
                textDecoration: "none",
                padding: "10px 22px",
                borderRadius: 999,
                background: COLORS.petroleum,
                boxShadow: `0 4px 20px ${COLORS.petroleum}28`,
                transition: "all 0.25s ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = COLORS.accent;
                el.style.transform = "translateY(-1px)";
                el.style.boxShadow = `0 8px 28px ${COLORS.petroleum}38`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = COLORS.petroleum;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = `0 4px 20px ${COLORS.petroleum}28`;
              }}
            >
              {/* Gold dot */}
              تواصل معنا
            </a>
          </div>

          {/* ── HAMBURGER ── */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              flexDirection: "column",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: 22,
                  height: 2,
                  background: COLORS.petroleum,
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  transform: menuOpen
                    ? i === 0
                      ? "rotate(45deg) translate(5px, 5px)"
                      : i === 2
                        ? "rotate(-45deg) translate(5px, -5px)"
                        : "none"
                    : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </nav>
      </header>

      {/* ══════════════════════════════════════════
          MOBILE MENU
      ══════════════════════════════════════════ */}
      <div
        dir="rtl"
        className="nav-mobile-menu"
        style={{
          position: "fixed",
          top: 72,
          right: 0,
          left: 0,
          zIndex: 49,
          background: "rgba(248,246,241,0.98)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: `1px solid ${COLORS.border}`,
          boxShadow: "0 16px 48px rgba(1,90,98,0.1)",
          transform: menuOpen ? "translateY(0)" : "translateY(-110%)",
          opacity: menuOpen ? 1 : 0,
          transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
          pointerEvents: menuOpen ? "all" : "none",
        }}
      >
        {/* 4-color top line */}
        <div
          style={{
            height: 3,
            background: `linear-gradient(to left, ${COLORS.rose}, ${COLORS.crimson}, ${COLORS.gold}, ${COLORS.petroleum})`,
            opacity: 0.7,
          }}
        />

        <div style={{ padding: "12px 24px 28px" }}>
          {navLinks.map((link, i) => {
            const isActive = activeHash === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => go(link.href)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontFamily: "'Beiruti', sans-serif",
                  fontSize: 16,
                  fontWeight: isActive ? 800 : 500,
                  color: isActive ? COLORS.petroleum : COLORS.ink,
                  textDecoration: "none",
                  padding: "15px 0",
                  borderBottom: `1px solid ${COLORS.border}`,
                  transition: "color 0.2s ease",
                }}
              >
                {link.label}
                {isActive && (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 2,
                        background: COLORS.gold,
                        borderRadius: 2,
                      }}
                    />
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: COLORS.petroleum,
                      }}
                    />
                  </div>
                )}
              </a>
            );
          })}

          <a
            href="#contact"
            onClick={() => go("#contact")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              fontFamily: "'Beiruti', sans-serif",
              fontSize: 15,
              fontWeight: 800,
              color: COLORS.white,
              textDecoration: "none",
              padding: "14px 20px",
              borderRadius: 14,
              background: COLORS.petroleum,
              marginTop: 20,
              boxShadow: `0 8px 28px ${COLORS.petroleum}28`,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: COLORS.gold,
              }}
            />
            تواصل معنا
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop    { display: none !important; }
          .nav-hamburger  { display: flex !important; }
        }
      `}</style>
    </>
  );
}
