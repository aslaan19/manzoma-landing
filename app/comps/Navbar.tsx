"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "الرئيسية", href: "#home" },
  { label: "من نحن", href: "#about" },
  { label: "لماذا منظومة", href: "#why" },
  { label: "الاستراتيجية", href: "#strategy" },
  { label: "النماذج", href: "#models" },
  { label: "تواصل معنا", href: "#contact" },
];

function ManzomLogo() {
  return (
    <a
      href="#home"
      style={{
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      {/* Symbol — 2×2 dot grid, bottom-right slightly smaller */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5px",
          alignItems: "end",
        }}
      >
        <div
          style={{
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            background: "#1F5A5E",
          }}
        />
        <div
          style={{
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            background: "#1F5A5E",
          }}
        />
        <div
          style={{
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            background: "#1F5A5E",
          }}
        />
        {/* Bottom-right dot — slightly smaller */}
        <div
          style={{
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            background: "#1F5A5E",
            justifySelf: "end",
            alignSelf: "end",
          }}
        />
      </div>
      {/* Wordmark */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "0px",
        }}
      >
        <span
          style={{
            fontFamily: "'Tajawal', sans-serif",
            fontSize: "26px",
            fontWeight: 800,
            color: "#1F5A5E",
            lineHeight: 1.15,
            letterSpacing: "-0.5px",
          }}
        >
          منظومة
        </span>
        <span
          style={{
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: "13px",
            fontWeight: 700,
            color: "#1F5A5E",
            letterSpacing: "0.5px",
            lineHeight: 1.2,
          }}
        >
          Manzoma
        </span>
      </div>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          transition: "all 0.3s ease",
          background: scrolled
            ? "rgba(255,255,255,0.97)"
            : "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: scrolled
            ? "1px solid #DCE7E5"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 24px rgba(31,90,94,0.06)" : "none",
        }}
      >
        <nav
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 24px",
            height: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ManzomLogo />

          {/* Desktop links */}
          <div
            className="desktop-nav"
            style={{ display: "flex", alignItems: "center", gap: "4px" }}
          >
            {navLinks.map((link) => {
              const isActive = activeHash === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  style={{
                    fontFamily: "'Tajawal', sans-serif",
                    fontSize: "15px",
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? "#1F5A5E" : "#536668",
                    textDecoration: "none",
                    padding: "6px 14px",
                    borderRadius: "999px",
                    background: isActive ? "#EEF5F5" : "transparent",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = "#1F5A5E";
                      (e.currentTarget as HTMLElement).style.background =
                        "#F3F8F6";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = "#536668";
                      (e.currentTarget as HTMLElement).style.background =
                        "transparent";
                    }
                  }}
                >
                  {link.label}
                </a>
              );
            })}

            <a
              href="#contact"
              onClick={() => handleLinkClick("#contact")}
              style={{
                fontFamily: "'Tajawal', sans-serif",
                fontSize: "14px",
                fontWeight: 700,
                color: "#FFFFFF",
                textDecoration: "none",
                padding: "9px 22px",
                borderRadius: "999px",
                background: "#1F5A5E",
                marginRight: "10px",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#2F7D7E";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#1F5A5E";
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
                width: "22px",
                height: "2px",
                background: "#1F5A5E",
                borderRadius: "2px",
                transition: "all 0.3s ease",
                transform: menuOpen
                  ? "rotate(45deg) translate(5px, 5px)"
                  : "none",
              }}
            />
            <div
              style={{
                width: "22px",
                height: "2px",
                background: "#1F5A5E",
                borderRadius: "2px",
                opacity: menuOpen ? 0 : 1,
                transition: "all 0.3s ease",
              }}
            />
            <div
              style={{
                width: "22px",
                height: "2px",
                background: "#1F5A5E",
                borderRadius: "2px",
                transition: "all 0.3s ease",
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
          top: "70px",
          right: 0,
          left: 0,
          zIndex: 49,
          background: "rgba(255,255,255,0.98)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #DCE7E5",
          boxShadow: "0 8px 24px rgba(31,90,94,0.08)",
          transform: menuOpen ? "translateY(0)" : "translateY(-110%)",
          opacity: menuOpen ? 1 : 0,
          transition: "all 0.3s ease",
          pointerEvents: menuOpen ? "all" : "none",
        }}
      >
        <div style={{ padding: "16px 24px 24px" }}>
          {navLinks.map((link) => {
            const isActive = activeHash === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                style={{
                  display: "block",
                  fontFamily: "'Tajawal', sans-serif",
                  fontSize: "17px",
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "#1F5A5E" : "#1A2E2F",
                  textDecoration: "none",
                  padding: "13px 0",
                  borderBottom: "1px solid #F0F5F4",
                }}
              >
                {link.label}
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={() => handleLinkClick("#contact")}
            style={{
              display: "block",
              fontFamily: "'Tajawal', sans-serif",
              fontSize: "16px",
              fontWeight: 700,
              color: "#FFFFFF",
              textDecoration: "none",
              textAlign: "center",
              padding: "14px",
              borderRadius: "12px",
              background: "#1F5A5E",
              marginTop: "16px",
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
