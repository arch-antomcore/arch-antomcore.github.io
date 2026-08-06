import React from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, BookOpen } from "@phosphor-icons/react";
import { Magnetic } from "@/components/site/interactions";
import { ScrambleText, AmbientBlobs } from "./AetherKit";
import { useTranslation } from "@/hooks/useTranslation";
import ProductMockup from "./ProductMockup";
import { ManifestoChapters, EditorialMarquee } from "./AetherSections";

const charVariant = {
  hidden: { y: "135%" },
  visible: { y: 0, transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } },
};

const pop = {
  hidden: { scale: 0, rotate: -90 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 200, damping: 14 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const Chars = ({ text }) => (
  <>
    {text.split("").map((c, i) => (
      <motion.span key={i} variants={charVariant} className="inline-block py-1">
        {c === " " ? "\u00A0" : c}
      </motion.span>
    ))}
  </>
);

/* Massive kinetic headline — char-by-char masked reveal + scroll parallax per line. */
const KineticHeadline = ({ headline }) => {
  const { scrollY } = useScroll();
  const x1 = useTransform(scrollY, [0, 900], [0, -90]);
  const x2 = useTransform(scrollY, [0, 900], [0, 70]);
  const x3 = useTransform(scrollY, [0, 900], [0, -50]);

  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.035, delayChildren: 1.0 } },
      }}
      className="aether-font-display font-extrabold uppercase text-[#211d18] leading-[1.1] aether-tracking-tighter text-[9.5vw] sm:text-7xl lg:text-[8.5vw]"
      data-testid="aether-kinetic-headline"
    >
      <span className="block overflow-hidden py-2">
        <motion.span style={{ x: x1 }} className="flex">
          <Chars text={headline.l1} />
        </motion.span>
      </span>
      <span className="block overflow-hidden py-2">
        <motion.span style={{ x: x2 }} className="flex aether-text-stroke">
          <Chars text={headline.l2} />
        </motion.span>
      </span>
      <span className="block overflow-hidden py-2">
        <motion.span style={{ x: x3 }} className="flex items-center gap-4 md:gap-8">
          <span className="flex">
            <Chars text={headline.l3a} />
          </span>
          <motion.span variants={pop} className="flex shrink-0">
            <svg
              viewBox="0 0 24 24"
              className="aether-spin-slow w-[0.55em] h-[0.55em] text-[#A34A33]"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0l2.4 8.2L22.4 6 16.8 12l5.6 6-8-2.2L12 24l-2.4-8.2L1.6 18l5.6-6-5.6-6 8 2.2L12 0z" />
            </svg>
          </motion.span>
          <motion.span
            variants={charVariant}
            className="aether-font-serif italic font-normal normal-case tracking-tight inline-block py-1"
          >
            {headline.l3b}<span className="text-[#A34A33]">.</span>
          </motion.span>
        </motion.span>
      </span>
    </motion.h1>
  );
};

/* Magnetic primary + secondary CTAs — tangerine editorial style. */
const CtaButtons = ({ primary, secondary }) => (
  <div className="flex flex-wrap items-center gap-4" data-testid="aether-cta-group">
    <Magnetic strength={0.3}>
      <Link
        to="/#cta"
        data-testid="aether-primary-cta"
        data-cursor="hover"
        data-cursor-text="Deploy"
        className="group flex items-center gap-2 bg-[#A34A33] !text-[#fbf9f2] text-xs uppercase tracking-[0.15em] font-semibold px-7 py-4 rounded-full transition-colors duration-300 hover:bg-[#211d18] shadow-[0_18px_38px_-16px_rgba(163, 74, 51,0.5)]"
      >
        {primary}
        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </Magnetic>

    <Magnetic strength={0.3}>
      <Link
        to="/produto"
        data-testid="aether-secondary-cta"
        data-cursor="hover"
        data-cursor-text="Explorar"
        className="group flex items-center gap-2 border border-[#211d18] text-[#211d18] text-xs uppercase tracking-[0.15em] font-semibold px-7 py-4 rounded-full transition-colors duration-300 hover:bg-[#211d18] hover:!text-[#fbf9f2]"
      >
        <BookOpen className="w-3.5 h-3.5" />
        {secondary}
      </Link>
    </Magnetic>
  </div>
);

/**
 * AetherCore — transplanted Awwwards-grade hero (Off-White Editorial, Kinetic edition).
 * Uses the site's paper palette (#f4f1e8 / #ece7da / #fbf9f2) and existing nav/liquid-glass.
 */
const AetherHero = () => {
  const { t } = useTranslation();
  const A = t.HOME.aether;

  return (
    <section
      className="aether-hero-root relative w-full overflow-hidden"
      data-testid="aethercore-hero"
    >
      <AmbientBlobs />

      <div className="relative z-10 px-6 md:px-12 pt-36 md:pt-48">
        {/* Eyebrow bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="flex items-center justify-between border-b border-[#211d18]/10 pb-5 mb-10 md:mb-14"
          data-testid="aether-eyebrow"
        >
          <span className="text-[11px] uppercase tracking-[0.3em] font-semibold text-[#211d18]/60 flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A34A33] animate-pulse" />
            <ScrambleText text={A.eyebrow} delay={1.2} />
          </span>
          <span className="hidden md:block text-[11px] uppercase tracking-[0.3em] font-semibold text-[#211d18]/40">
            {A.eyebrowRight}
          </span>
        </motion.div>

        <KineticHeadline headline={A.headline} />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-12 md:mt-16 items-end">
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 text-base lg:text-lg text-[#211d18]/60 leading-relaxed"
            data-testid="aether-subheadline"
          >
            {A.sub}
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 2.05, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7 md:flex md:justify-end"
          >
            <CtaButtons primary={t.HOME.primaryCta} secondary={t.HOME.secondaryCta} />
          </motion.div>
        </div>
      </div>

      <ProductMockup labels={A} />

      <div className="mt-24 md:mt-36">
        <ManifestoChapters chapters={A.chapters} />
        <EditorialMarquee items={A.marquee} />
      </div>
    </section>
  );
};

export default AetherHero;
