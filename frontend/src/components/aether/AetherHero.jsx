import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, BookOpen, SelectionAll, Desktop, Compass } from "@phosphor-icons/react";
import { Magnetic } from "@/components/site/interactions";
import { ScrambleText, AmbientBlobs } from "./AetherKit";
import { useTranslation } from "@/hooks/useTranslation";
import ProductMockup from "./ProductMockup";
import { ManifestoChapters, EditorialMarquee } from "./AetherSections";
import { PerspectiveBackground } from "@/components/originkit/ui/hero-03/perspective-background";
import { GalleryOverlay } from "@/components/originkit/ui/hero-03/gallery-overlay";

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
        {c === " " ? " " : c}
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

/* Primary + secondary CTAs — tangerine editorial style. */
const CtaButtons = ({ primary, secondary, onOpenGallery }) => (
  <div className="flex flex-wrap items-center gap-4" data-testid="aether-cta-group">
    <Link
      to="/#cta"
      data-testid="aether-primary-cta"
      className="group flex items-center gap-2 bg-[#A34A33] !text-[#fbf9f2] text-xs uppercase tracking-[0.15em] font-semibold px-7 py-4 rounded-full transition-all duration-300 hover:bg-[#211d18] shadow-[0_18px_38px_-16px_rgba(163,74,51,0.5)]"
    >
      {primary}
      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>

    <button
      type="button"
      onClick={onOpenGallery}
      data-testid="aether-secondary-cta"
      className="group flex items-center gap-2 border border-[#211d18] text-[#211d18] text-xs uppercase tracking-[0.15em] font-semibold px-7 py-4 rounded-full transition-all duration-300 hover:bg-[#211d18] hover:!text-[#fbf9f2]"
    >
      <SelectionAll className="w-3.5 h-3.5" />
      Galeria 3D
    </button>

    <Link
      to="/produto"
      className="group flex items-center gap-2 border border-[#211d18]/40 text-[#211d18]/80 text-xs uppercase tracking-[0.15em] font-semibold px-6 py-4 rounded-full transition-all duration-300 hover:bg-[#211d18] hover:!text-[#fbf9f2]"
    >
      <BookOpen className="w-3.5 h-3.5" />
      {secondary}
    </Link>
  </div>
);

/**
 * AetherCore — transplanted Awwwards-grade hero (Off-White Editorial, Kinetic edition).
 * Uses the site's paper palette (#f4f1e8 / #ece7da / #fbf9f2) and existing nav/liquid-glass.
 */
const AetherHero = () => {
  const { t, language } = useTranslation();
  const isPt = language === "pt";
  const A = t.HOME.aether;
  const [galleryOpen, setGalleryOpen] = useState(false);

  return (
    <section
      className="aether-hero-root relative w-full"
      data-testid="aethercore-hero"
    >
      <div className="relative min-h-[85vh] md:min-h-screen flex flex-col justify-between overflow-hidden pb-12 md:pb-20">
        <PerspectiveBackground />
        <AmbientBlobs />

        <div className="relative z-10 px-6 md:px-12 pt-32 md:pt-40 flex-1 flex flex-col justify-center">
          {/* Eyebrow bar */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="flex items-center justify-between border-b border-[#211d18]/10 pb-5 mb-8 md:mb-12"
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

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-10 md:mt-14 items-end">
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
              <CtaButtons primary={t.HOME.primaryCta} secondary={t.HOME.secondaryCta} onOpenGallery={() => setGalleryOpen(true)} />
            </motion.div>
          </div>

          {/* Startup Ecosystem Quick Access Bar */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 pt-5 border-t border-[#211d18]/10 flex flex-wrap items-center justify-between gap-4"
          >
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#211d18]/70 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#A34A33] animate-pulse" />
              <span>{isPt ? "Ecossistema Exvorn · Outros Projetos:" : "Exvorn Ecosystem · Other Projects:"}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://monitorsmith.app/"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="hero-link-monitorsmith"
                className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider px-4 py-2 rounded-full bg-[#211d18]/5 hover:bg-[#211d18] text-[#211d18] hover:text-[#fbf9f2] border border-[#211d18]/15 transition-all duration-300 shadow-sm cursor-pointer"
              >
                <Desktop className="w-3.5 h-3.5 text-cyan-600 group-hover:text-cyan-400" />
                <span className="font-semibold">MonitorSmith</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <Link
                to="/ecossistema#component-atlas"
                data-testid="hero-link-component-atlas"
                className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider px-4 py-2 rounded-full bg-[#211d18]/5 hover:bg-[#211d18] text-[#211d18] hover:text-[#fbf9f2] border border-[#211d18]/15 transition-all duration-300 shadow-sm cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-amber-600 group-hover:text-amber-400" />
                <span className="font-semibold">Component Atlas</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold tracking-normal uppercase">{isPt ? "Em Breve" : "Soon"}</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <ProductMockup labels={A} />

      <div className="mt-24 md:mt-36">
        <ManifestoChapters chapters={A.chapters} />
        <EditorialMarquee items={A.marquee} />
      </div>

      <GalleryOverlay open={galleryOpen} onClose={() => setGalleryOpen(false)} />
    </section>
  );
};

export default AetherHero;
