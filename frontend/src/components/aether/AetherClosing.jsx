import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EditorialMarquee } from "./AetherSections";
import { useTranslation } from "@/hooks/useTranslation";

/* A kinetic blue manifesto, with product metadata from the shared copy. */
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
        { text: "sob controle.", variant: "accent" },
        { text: "Execução local.", variant: "solid" },
      ]
    : [
        { text: "Cognition", variant: "solid" },
        { text: "under control.", variant: "accent" },
        { text: "Local execution.", variant: "solid" },
      ];

  const marqueeItems = language === "pt"
    ? ["PENSA LOCAL", "ROTEIA CONTEXTO", "EXECUTA COM APROVAÇÃO", "AUDITA CADA PASSO"]
    : ["THINKS LOCAL", "ROUTES CONTEXT", "EXECUTES WITH APPROVAL", "AUDITS EVERY STEP"];

  return (
    <section
      ref={ref}
      className="aether-closing-panel relative overflow-hidden pt-14 md:pt-20 pb-0"
      data-testid="aether-closing"
    >
      {/* A display-type watermark drifts behind the statement. */}
      <motion.div
        style={{ y: yWater, opacity: opacityWater }}
        className="pointer-events-none absolute inset-x-0 top-20 md:top-24 flex justify-center select-none"
        aria-hidden="true"
      >
        <span className="aether-closing-watermark whitespace-nowrap text-[20vw] leading-none tracking-[-0.05em] font-black uppercase">
          AetherCore
        </span>
      </motion.div>

      <motion.div
        style={{ y: yStatement }}
        className="relative z-10 px-6 md:px-12 max-w-[1456px] mx-auto"
      >
        {/* Eyebrow strip */}
        <div className="flex items-center justify-between border-b border-[#f4f1e8]/25 pb-5 mb-10 md:mb-14">
          <span className="text-[11px] uppercase tracking-[0.2em] font-mono font-semibold text-[#f4f1e8] flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse" />
            {language === "pt" ? "Filosofia AetherCore" : "AetherCore philosophy"}
          </span>
          <span className="hidden md:block text-[11px] uppercase tracking-[0.15em] font-mono font-semibold text-[#f4f1e8]/75">
            {t.BRAND.tagline}
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
                className={`aether-closing-line block leading-[1.02] tracking-tighter py-1 font-black uppercase ${ln.variant === "accent" ? "text-[#ccff00]" : "text-[#f4f1e8]"}`}
              >
                {ln.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Meta strip */}
        <div className="mt-12 flex items-center justify-between gap-4 pt-6 border-t border-[#f4f1e8]/25 font-mono text-[11px] uppercase tracking-[0.15em] text-[#f4f1e8]/80">
          <span>{t.BRAND.name}</span>
          <span>{t.BRAND.version}</span>
        </div>
      </motion.div>

      {/* Scroll-velocity marquee band */}
      <div className="mt-14 md:mt-20">
        <EditorialMarquee items={marqueeItems} />
      </div>
    </section>
  );
};

export default AetherClosing;
