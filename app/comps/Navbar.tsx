/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const navLinks = [
  { label: "الرئيسية", href: "#home" },
  { label: "من نحن", href: "#about" },
  { label: "لماذا منظومة", href: "#why" },
  { label: "الاستراتيجية", href: "#strategy" },
  { label: "النماذج", href: "#models" },
  { label: "تواصل معنا", href: "#contact" },
];

// Brand colors
const colors = {
  petroleum: "#1F5A5E",
  petroleumLight: "#2A7A7E",
  gold: "#C9A227",
  cream: "#F8F6F1",
  textMuted: "#536668",
};

function ManzomLogo() {
  return (
    <a
      href="#home"
      className="logo-link"
      style={{
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      {/* Logo */}
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
  );
}

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#home");

  // Detect scroll position and active section
  const handleScroll = useCallback(() => {
    // Show navbar only after scrolling past hero (approx 100vh)
    const heroHeight = window.innerHeight;
    setVisible(window.scrollY > heroHeight * 0.85);

    // Detect active section
    const sections = navLinks.map((link) => link.href.replace("#", ""));
    let currentSection = "#home";

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          currentSection = `#${sectionId}`;
          break;
        }
      }
    }

    setActiveHash(currentSection);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleLinkClick = (href: string) => {
    setActiveHash(href);
    setMenuOpen(false);
  };

  return (
    <>
      <header
        dir="rtl"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          left: 0,
          zIndex: 50,
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          background: visible ? "rgba(248, 246, 241, 0.95)" : "transparent",
          backdropFilter: visible ? "blur(16px)" : "none",
          WebkitBackdropFilter: visible ? "blur(16px)" : "none",
          borderBottom: visible
            ? `1px solid rgba(31, 90, 94, 0.1)`
            : "1px solid transparent",
          boxShadow: visible ? "0 4px 30px rgba(31, 90, 94, 0.08)" : "none",
          transform: visible ? "translateY(0)" : "translateY(-100%)",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        <nav
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 24px",
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ManzomLogo />

          {/* Desktop links */}
          <div
            className="desktop-nav"
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
          >
            {navLinks.slice(0, -1).map((link) => {
              const isActive = activeHash === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  style={{
                    fontFamily: "var(--font-beiruti), sans-serif",
                    fontSize: "15px",
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? colors.petroleum : colors.textMuted,
                    textDecoration: "none",
                    padding: "8px 16px",
                    borderRadius: "999px",
                    background: isActive
                      ? `rgba(31, 90, 94, 0.1)`
                      : "transparent",
                    position: "relative",
                    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = colors.petroleum;
                      e.currentTarget.style.background = `rgba(31, 90, 94, 0.06)`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = colors.textMuted;
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: "2px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "20px",
                        height: "3px",
                        background: colors.gold,
                        borderRadius: "2px",
                      }}
                    />
                  )}
                </a>
              );
            })}

            <a
              href="#contact"
              onClick={() => handleLinkClick("#contact")}
              style={{
                fontFamily: "var(--font-beiruti), sans-serif",
                fontSize: "14px",
                fontWeight: 700,
                color: "#FFFFFF",
                textDecoration: "none",
                padding: "10px 24px",
                borderRadius: "999px",
                background: `linear-gradient(135deg, ${colors.petroleum} 0%, ${colors.petroleumLight} 100%)`,
                marginRight: "12px",
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 4px 15px rgba(31, 90, 94, 0.25)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(31, 90, 94, 0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 15px rgba(31, 90, 94, 0.25)";
              }}
            >
              تواصل معنا
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              flexDirection: "column",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "2.5px",
                background: colors.petroleum,
                borderRadius: "2px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: menuOpen
                  ? "rotate(45deg) translate(5px, 5px)"
                  : "none",
              }}
            />
            <div
              style={{
                width: "24px",
                height: "2.5px",
                background: colors.petroleum,
                borderRadius: "2px",
                opacity: menuOpen ? 0 : 1,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
            <div
              style={{
                width: "24px",
                height: "2.5px",
                background: colors.petroleum,
                borderRadius: "2px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: menuOpen
                  ? "rotate(-45deg) translate(5px, -5px)"
                  : "none",
              }}
            />
          </button>
        </nav>
      </header>

      {/* Mobile dropdown */}
      <div
        dir="rtl"
        className="mobile-menu"
        style={{
          position: "fixed",
          top: "72px",
          right: 0,
          left: 0,
          zIndex: 49,
          background: "rgba(248, 246, 241, 0.98)",
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid rgba(31, 90, 94, 0.1)`,
          boxShadow: "0 8px 30px rgba(31, 90, 94, 0.1)",
          transform: menuOpen ? "translateY(0)" : "translateY(-110%)",
          opacity: menuOpen ? 1 : 0,
          transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: menuOpen ? "all" : "none",
        }}
      >
        <div style={{ padding: "16px 24px 24px" }}>
          {navLinks.map((link, index) => {
            const isActive = activeHash === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontFamily: "var(--font-beiruti), sans-serif",
                  fontSize: "17px",
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? colors.petroleum : "#1A2E2F",
                  textDecoration: "none",
                  padding: "14px 0",
                  borderBottom:
                    index < navLinks.length - 1
                      ? `1px solid rgba(31, 90, 94, 0.08)`
                      : "none",
                  position: "relative",
                }}
              >
                {isActive && (
                  <span
                    style={{
                      width: "4px",
                      height: "20px",
                      background: colors.gold,
                      borderRadius: "2px",
                      position: "absolute",
                      right: "-12px",
                    }}
                  />
                )}
                {link.label}
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={() => handleLinkClick("#contact")}
            style={{
              display: "block",
              fontFamily: "var(--font-beiruti), sans-serif",
              fontSize: "16px",
              fontWeight: 700,
              color: "#FFFFFF",
              textDecoration: "none",
              textAlign: "center",
              padding: "14px",
              borderRadius: "12px",
              background: `linear-gradient(135deg, ${colors.petroleum} 0%, ${colors.petroleumLight} 100%)`,
              marginTop: "20px",
              boxShadow: "0 4px 15px rgba(31, 90, 94, 0.2)",
            }}
          >
            تواصل معنا
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
