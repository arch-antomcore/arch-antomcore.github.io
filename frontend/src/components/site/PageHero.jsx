import React from "react";
import { ArrowUpRight, ArrowRight } from "@phosphor-icons/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/site/primitives";
import { MagneticButton } from "@/components/site/interactions";
import { AmbientBlobs } from "@/components/aether/AetherKit";
import { useTranslation } from "@/hooks/useTranslation";

const lineUp = { initial: { y: "115%" }, animate: { y: 0 } };

/* Inner-page hero — AetherCore editorial kinetic style.
   Stacked uppercase Syne display lines; the second line is stroke-only,
   with scroll-driven horizontal parallax and a tangerine full stop. */
const PageHero = ({ kicker, lines, lead, primary, secondary, ghostWord }) => {
  const { language } = useTranslation();
  const { scrollY } = useScroll();
  const x1 = useTransform(scrollY, [0, 700], [0, -50]);
  const x2 = useTransform(scrollY, [0, 700], [0, 40]);
  const yGhost = useTransform(scrollY, [0, 900], [0, -240]);
  const parallax = [x1, x2, x1];

  const ghost = ghostWord || (lines && lines[0]) || "";

  const defaultPrimaryLabel = language === "en" ? "Request early access" : "Solicitar acesso antecipado";
  const defaultSecondaryLabel = language === "en" ? "View product" : "Ver produto";

  const primaryObj = primary ? {
    to: typeof primary === "string" ? primary : (primary.to || "/#cta"),
    label: (typeof primary === "object" && primary.label) || defaultPrimaryLabel
  } : null;

  const secondaryObj = secondary ? {
    to: typeof secondary === "string" ? secondary : (secondary.to || "/produto"),
    label: (typeof secondary === "object" && secondary.label) || defaultSecondaryLabel
  } : null;


  return (
    <header className="relative overflow-hidden pt-36 md:pt-48 pb-16 md:pb-24" data-testid="page-hero">
      <AmbientBlobs />

      {/* Giant ghost serif watermark drifting in parallax */}
      <motion.div
        style={{ y: yGhost }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-24 md:top-32 flex justify-center overflow-hidden select-none"
      >
        <span className="aether-font-serif italic text-[#211d18]/[0.05] whitespace-nowrap text-[22vw] leading-[0.85] tracking-[-0.05em] font-normal">
          {ghost}.
        </span>
      </motion.div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between border-b border-[#211d18]/10 pb-5 mb-10 md:mb-14"
        >
          <span className="text-[11px] uppercase tracking-[0.3em] font-semibold text-[#211d18]/60 flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A34A33] animate-pulse" />
            {kicker}
          </span>
          <span className="hidden md:flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] font-mono font-semibold text-[#211d18]/40">
            <span>AetherCore</span>
            <span className="text-[#A34A33]">//</span>
            <span>MMXXVI</span>
          </span>
        </motion.div>

        <h1 className="aether-font-display font-extrabold uppercase aether-tracking-tighter leading-[0.95] text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-6xl text-[#211d18]">
          {lines.map((l, i) => {
            const isLast = i === lines.length - 1;
            const text = isLast && /[.!?…]$/.test(l.trim()) ? l.trim().slice(0, -1) : l;
            return (
            <span key={i} className="block overflow-hidden py-1 -my-1">
              <motion.span
                style={{ x: parallax[i % parallax.length] }}
                className={`inline-block max-w-full ${i === 1 ? "aether-text-stroke" : ""}`}
                variants={lineUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.15 + i * 0.1 }}
              >
                {text}
                {isLast && <span className="text-[#A34A33]">.</span>}
              </motion.span>
            </span>
            );
          })}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-10 md:mt-14 items-end">
          {lead && (
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 + lines.length * 0.08 }}
              className="md:col-span-6 text-base md:text-lg text-[#211d18]/60 leading-relaxed"
            >
              {lead}
            </motion.p>
          )}

          {(primaryObj || secondaryObj) && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.52 + lines.length * 0.08 }}
              className={`flex flex-wrap items-center gap-4 ${lead ? "md:col-span-6 md:justify-end" : "md:col-span-12"}`}
            >
              {primaryObj && (
                <MagneticButton to={primaryObj.to} cursorText="Deploy" data-testid="hero-primary-cta" className="!bg-[#A34A33] !border-[#A34A33] hover:!bg-[#211d18] hover:!border-[#211d18] !text-xs !uppercase !tracking-[0.15em] !font-semibold !px-7 !py-4">
                  {primaryObj.label}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.75} />
                </MagneticButton>
              )}
              {secondaryObj && (
                <MagneticButton to={secondaryObj.to} variant="ghost" cursorText="Explorar" data-testid="hero-secondary-cta" className="!border-[#211d18] !text-xs !uppercase !tracking-[0.15em] !font-semibold !px-7 !py-4 hover:!bg-[#211d18] hover:!text-[#fbf9f2]">
                  {secondaryObj.label}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} />
                </MagneticButton>
              )}
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 md:mt-16 border-t border-[#211d18]/10 relative"
        >
          {/* Scroll indicator + section marker */}
          <div className="absolute -top-3 right-0 flex items-center gap-3 bg-[#f4f1e8] pl-4">
            <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-[#211d18]/40">
              Scroll
            </span>
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="block w-px h-6 bg-[#211d18]/30"
            />
          </div>
        </motion.div>
      </Container>
    </header>
  );
};

export default PageHero;
