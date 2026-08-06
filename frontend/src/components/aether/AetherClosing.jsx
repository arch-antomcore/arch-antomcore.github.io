import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EditorialMarquee } from "./AetherSections";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * Awwwards-grade closing composition:
 * 1. Giant fluid serif watermark that scrolls in parallax
 * 2. Kinetic editorial statement with alternating stroke + solid lines
 * 3. Scroll-velocity marquee band
 * 4. "Numero de série" footer strip with mono glyphs
 */
const AetherClosing = () => {
  const { t, language } = useTranslation();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yWater = useTransform(scrollYProgress, [0, 1], ["8%", "-10%"]);
  const opacityWater = useTransform(scrollYProgress, [0, 0.5, 1], [0.06, 0.16, 0.06]);
  const yStatement = useTransform(scrollYProgress, [0, 1], ["6%", "-10%"]);

  const lines = language === "pt"
    ? [
        { text: "Cognição", variant: "solid" },
        { text: "sob controle,", variant: "stroke" },
        { text: "não sob", variant: "solid" },
        { text: "assinatura.", variant: "serif" },
      ]
    : [
        { text: "Cognition", variant: "solid" },
        { text: "you own,", variant: "stroke" },
        { text: "not one you", variant: "solid" },
        { text: "subscribe to.", variant: "serif" },
      ];

  const marqueeItems = language === "pt"
    ? ["PENSA LOCAL", "ROTEIA CONTEXTO", "EXECUTA COM APROVAÇÃO", "AUDITA CADA PASSO"]
    : ["THINKS LOCAL", "ROUTES CONTEXT", "EXECUTES WITH APPROVAL", "AUDITS EVERY STEP"];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#f4f1e8] pt-32 md:pt-48 pb-24 md:pb-32"
      data-testid="aether-closing"
    >
      {/* Giant fluid serif watermark drifting behind content */}
      <motion.div
        style={{ y: yWater, opacity: opacityWater }}
        className="pointer-events-none absolute inset-x-0 top-32 md:top-40 flex justify-center select-none"
        aria-hidden="true"
      >
        <span className="aether-font-serif italic text-[#211d18] whitespace-nowrap text-[26vw] leading-none tracking-[-0.05em] font-normal">
          {language === "pt" ? "AetherCore." : "AetherCore."}
        </span>
      </motion.div>

      <motion.div
        style={{ y: yStatement }}
        className="relative z-10 px-6 md:px-12 max-w-[1600px] mx-auto"
      >
        {/* Eyebrow strip */}
        <div className="flex items-center justify-between border-b border-[#211d18]/10 pb-5 mb-16 md:mb-24">
          <span className="text-[11px] uppercase tracking-[0.3em] font-mono font-semibold text-[#211d18]/60 flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A34A33] animate-pulse" />
            {language === "pt" ? "Chapter 04 — Filosofia" : "Chapter 04 — Philosophy"}
          </span>
          <span className="hidden md:block text-[11px] uppercase tracking-[0.3em] font-mono font-semibold text-[#211d18]/40">
            //MANIFESTO.2026
          </span>
        </div>

        {/* Kinetic statement */}
        <div className="flex flex-col gap-1 md:gap-2">
          {lines.map((ln, i) => (
            <motion.div
              key={ln.text}
              initial={{ y: "120%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.9,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="overflow-hidden py-2"
            >
              <span
                className={`block leading-[1.05] tracking-tighter py-1 ${
                  ln.variant === "serif"
                    ? "aether-font-serif italic text-[#A34A33] text-5xl sm:text-6xl md:text-7xl lg:text-[6.5vw] font-normal"
                    : ln.variant === "stroke"
                    ? "aether-font-display font-extrabold uppercase aether-text-stroke text-5xl sm:text-6xl md:text-7xl lg:text-[6.5vw]"
                    : "aether-font-display font-extrabold uppercase text-[#211d18] text-5xl sm:text-6xl md:text-7xl lg:text-[6.5vw]"
                }`}
              >
                {ln.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Meta strip */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 pt-8 border-t border-[#211d18]/10">
          {[
            { k: "N°", v: "00.04" },
            { k: language === "pt" ? "REV" : "REV", v: "v0.6.0" },
            { k: language === "pt" ? "ANO" : "YEAR", v: "MMXXVI" },
            { k: language === "pt" ? "STATUS" : "STATUS", v: language === "pt" ? "AO VIVO" : "LIVE" },
          ].map((m) => (
            <div key={m.k} className="flex items-baseline gap-3">
              <span className="text-[10px] uppercase tracking-[0.28em] font-mono text-[#211d18]/40">
                {m.k}
              </span>
              <span className="aether-font-display font-bold uppercase tracking-tight text-lg text-[#211d18]">
                {m.v}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll-velocity marquee band */}
      <div className="mt-24 md:mt-32">
        <EditorialMarquee items={marqueeItems} />
      </div>
    </section>
  );
};

export default AetherClosing;
