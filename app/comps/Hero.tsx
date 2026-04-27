"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const conceptWords = [
  { label: "الديموغرافيا", highlight: false },
  { label: "الإقتصاد", highlight: false },
  { label: "الحافز المالي", highlight: false },
  { label: "المعرفة", highlight: true },
];

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const fadeUp = (delay: string) =>
    `transition-all duration-700 ease-out ${delay}
     ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`;

  return (
    <section
      id="home"
      dir="rtl"
      className="relative min-h-screen flex items-center justify-center
        bg-surface-light overflow-hidden px-6 pt-[120px] pb-20"
    >
      {/* Grid background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(31,90,94,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(31,90,94,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Radial glow */}
      <div
        aria-hidden
        className="absolute pointer-events-none rounded-full"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -60%)",
          width: "700px",
          height: "700px",
          background:
            "radial-gradient(circle, rgba(31,90,94,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Decorative dot grid — top left */}
      <div
        aria-hidden
        className="absolute top-[10%] left-[5%] opacity-[0.12]
        grid pointer-events-none"
        style={{ gridTemplateColumns: "repeat(5, 6px)", gap: "10px" }}
      >
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="w-[5px] h-[5px] rounded-full bg-brand-primary"
          />
        ))}
      </div>

      {/* Decorative dot grid — bottom right */}
      <div
        aria-hidden
        className="absolute bottom-[12%] right-[4%] opacity-10
        grid pointer-events-none"
        style={{ gridTemplateColumns: "repeat(4, 6px)", gap: "10px" }}
      >
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="w-[5px] h-[5px] rounded-full bg-brand-primary"
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-3xl w-full text-center">
        {/* Logo */}
        <div className={`flex justify-center mb-10 ${fadeUp("delay-[100ms]")}`}>
          <Image
            src="/logo.png"
            alt="منظومة - Manzoma"
            width={220}
            height={100}
            className="object-contain"
            priority
          />
        </div>

        {/* Gold divider */}
        <div className={fadeUp("delay-[280ms]")}>
          <div className="w-12 h-[2px] bg-brand-gold rounded-full mx-auto mb-9" />
        </div>

        {/* Slogan */}
        <div className={fadeUp("delay-[380ms]")}>
          <p
            className="font-tajawal font-bold text-ink leading-[1.8]
            text-[clamp(20px,3.5vw,28px)] max-w-xl mx-auto"
          >
            المعرفة نبني النمو
            <br />
            ونحول الفجوات إلى قيمة
          </p>
        </div>

        {/* Concept pills */}
        <div
          className={`flex justify-center flex-wrap gap-[10px] mt-10 ${fadeUp("delay-[500ms]")}`}
        >
          {conceptWords.map((w) => (
            <span
              key={w.label}
              className={`font-tajawal text-sm font-semibold rounded-full px-[18px] py-[7px]
                ${
                  w.highlight
                    ? "text-brand-primary bg-teal-50 border border-teal-100"
                    : "text-ink-secondary bg-white border border-surface-border"
                }`}
            >
              {w.label}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div
          className={`flex justify-center flex-wrap gap-3 mt-12 ${fadeUp("delay-[620ms]")}`}
        >
          <a
            href="#about"
            className="font-tajawal text-base font-bold text-white
              bg-brand-primary hover:bg-brand-accent
              px-9 py-[14px] rounded-full shadow-card-md
              hover:shadow-card-lg hover:-translate-y-[2px]
              transition-all duration-200"
          >
            اكتشف منظومة
          </a>
          <a
            href="#contact"
            className="font-tajawal text-base font-semibold text-brand-primary
              bg-transparent border border-surface-border
              hover:border-brand-primary hover:bg-surface-light
              px-8 py-[13px] rounded-full transition-all duration-200"
          >
            تواصل معنا
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          className={`flex flex-col items-center mt-16
          transition-all duration-700 delay-[1000ms]
          ${visible ? "opacity-45" : "opacity-0"}`}
        >
          <div
            className="w-px h-10 animate-scroll-pulse"
            style={{
              background: "linear-gradient(to bottom, #1F5A5E, transparent)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
