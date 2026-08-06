import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { Magnetic } from "@/components/site/interactions";

/* ============================================================
   GLASS MEDIA SYSTEM — imagery + liquid glass (Awwwards kit)
   All media is free for commercial use:
   · Photos — Unsplash License (unsplash.com/license)
   · Video  — Pexels License (pexels.com/license)
   Credits rendered on-screen via <MediaCredit /> and listed
   on the /referencias page.
   ============================================================ */

export const MEDIA = {
  datacenter: {
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2200&q=80",
    author: "Taylor Vick",
    url: "https://unsplash.com/@tvick",
    source: "Unsplash",
    alt: "Corredor de data center com cabos organizados",
  },
  forest: {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2200&q=80",
    author: "Lukasz Szmigiel",
    url: "https://unsplash.com/@szmigieldesign",
    source: "Unsplash",
    alt: "Floresta com luz atravessando as árvores",
  },
  office: {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2200&q=80",
    author: "Nastuh Abootalebi",
    url: "https://unsplash.com/@sunday_digital",
    source: "Unsplash",
    alt: "Escritório corporativo moderno com divisórias de vidro",
  },
  circuit: {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    author: "Alexandre Debiève",
    url: "https://unsplash.com/@alexkixa",
    source: "Unsplash",
    alt: "Macro de placa de circuito eletrônico",
  },
  networkVideo: {
    src: "https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4",
    poster: "https://images.pexels.com/videos/3129671/free-video-3129671.jpg?auto=compress&w=1600",
    author: "Pressmaster",
    url: "https://www.pexels.com/@pressmaster/",
    source: "Pexels",
    alt: "Rede abstrata de conexões e pontos de dados",
  },
};

/* Small glass chip crediting the photographer/videographer */
export const MediaCredit = ({ media, type = "Foto", className = "" }) => (
  <a
    href={media.url}
    target="_blank"
    rel="noopener noreferrer"
    data-cursor="hover"
    className={`media-credit ${className}`}
    data-testid="media-credit"
  >
    <span className="h-1 w-1 rounded-full bg-[#A34A33]" aria-hidden="true" />
    {type}: {media.author} · {media.source}
  </a>
);

/* ------------------------------------------------------------
   ImageBand — full-bleed editorial band with scroll-scrubbed
   clip-path reveal, parallax zoom, grayscale→color hover and
   a floating liquid-glass quote panel.
   ------------------------------------------------------------ */
export const ImageBand = ({ media, kicker, lines, caption, testId = "image-band" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(16% 7% 16% 7% round 48px)", "inset(0% 0% 0% 0% round 40px)"]
  );
  const scale = useTransform(scrollYProgress, [0, 1], [1.22, 1.05]);
  const { scrollYProgress: driftP } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(driftP, [0, 1], ["-6%", "6%"]);

  return (
    <section ref={ref} className="group relative px-4 py-16 md:px-8 md:py-24" data-testid={testId}>
      <motion.div
        style={{ clipPath }}
        className="relative h-[62vh] min-h-[420px] overflow-hidden md:h-[74vh]"
      >
        <motion.img
          src={media.src}
          alt={media.alt}
          loading="lazy"
          style={{ scale, y: imgY }}
          className="absolute inset-0 h-full w-full object-cover grayscale-[45%] transition-[filter] duration-1000 ease-out group-hover:grayscale-0"
        />
        {/* Ink wash + grain */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a08]/85 via-[#0b0a08]/25 to-[#0b0a08]/40" />
        <div className="noise-print absolute inset-0 opacity-[0.1] mix-blend-overlay" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-14">
          <div className="glass-panel max-w-3xl p-7 md:p-10" data-cursor="hover">
            <span className="aether-card-label text-[#f7f4ec]/70">{kicker}</span>
            <h3 className="mt-5 leading-[1.02]">
              {lines.map((ln, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={
                    ln.serif
                      ? "aether-font-serif mr-3 inline-block text-4xl italic text-[#A34A33] sm:text-5xl md:text-6xl"
                      : "aether-font-display mr-3 inline-block text-4xl font-extrabold uppercase tracking-tight text-[#f7f4ec] sm:text-5xl md:text-6xl"
                  }
                >
                  {ln.t}
                </motion.span>
              ))}
            </h3>
            {caption && (
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#f7f4ec]/65 md:text-base">{caption}</p>
            )}
          </div>
        </div>

        <MediaCredit media={media} className="absolute right-5 top-5 md:right-8 md:top-8" />
      </motion.div>
    </section>
  );
};

/* ------------------------------------------------------------
   GlassShowcase — Home immersive spread: parallax datacenter
   photo, giant editorial statement and floating liquid-glass
   stat panels (the glass effect over real imagery).
   ------------------------------------------------------------ */
const SHOWCASE = {
  pt: {
    kicker: "Soberania física — 04",
    meta: "//GLASS.OVER.METAL",
    lines: [
      { t: "A nuvem é", style: "solid" },
      { t: "o computador", style: "stroke" },
      { t: "dos outros.", style: "serif" },
    ],
    sub: "O AetherCore devolve a inteligência para onde seus dados sempre deveriam ter ficado: dentro da sua própria infraestrutura, atrás da sua própria porta.",
    stats: [
      { v: "0 BYTES", k: "enviados para fora" },
      { v: "100%", k: "no seu hardware" },
      { v: "24/7", k: "funciona offline" },
    ],
    cta: "Conhecer a arquitetura",
  },
  en: {
    kicker: "Physical sovereignty — 04",
    meta: "//GLASS.OVER.METAL",
    lines: [
      { t: "The cloud is", style: "solid" },
      { t: "someone else's", style: "stroke" },
      { t: "computer.", style: "serif" },
    ],
    sub: "AetherCore brings intelligence back to where your data should have always lived: inside your own infrastructure, behind your own door.",
    stats: [
      { v: "0 BYTES", k: "sent outside" },
      { v: "100%", k: "on your hardware" },
      { v: "24/7", k: "works offline" },
    ],
    cta: "Explore the architecture",
  },
};

export const GlassShowcase = () => {
  const { language } = useTranslation();
  const c = SHOWCASE[language] || SHOWCASE.pt;
  const media = MEDIA.datacenter;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1.08, 1.18]);
  const { scrollYProgress: revealP } = useScroll({ target: ref, offset: ["start end", "start 0.25"] });
  const clipPath = useTransform(
    revealP,
    [0, 1],
    ["inset(0% 3% 0% 3% round 40px)", "inset(0% 0% 0% 0% round 24px)"]
  );

  return (
    <section ref={ref} className="relative px-4 py-6 md:px-8 md:py-10" data-testid="glass-showcase">
      <motion.div
        style={{ clipPath }}
        className="relative min-h-[88vh] overflow-hidden"
      >
        <motion.img
          src={media.src}
          alt={media.alt}
          loading="lazy"
          style={{ y: imgY, scale: imgScale }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0a08]/70 via-[#0b0a08]/35 to-[#0b0a08]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_20%,rgba(163, 74, 51,0.18),transparent_65%)]" />
        <div className="noise-print absolute inset-0 opacity-[0.12] mix-blend-overlay" />

        <div className="relative z-10 flex min-h-[88vh] flex-col justify-between pt-24 pb-12 px-7 md:pt-36 md:pb-16 md:px-16">
          {/* Meta strip */}
          <div className="flex items-center justify-between border-b border-white/15 pb-5">
            <span className="flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-[#f7f4ec]/70">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#A34A33]" />
              {c.kicker}
            </span>
            <span className="hidden font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-[#f7f4ec]/40 md:block">
              {c.meta}
            </span>
          </div>

          {/* Statement */}
          <motion.div
            className="py-14 md:py-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {c.lines.map((ln, i) => (
              <div key={i} className="overflow-hidden">
                <motion.span
                  variants={{
                    hidden: { y: "105%" },
                    visible: {
                      y: 0,
                      transition: { duration: 0.95, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className={`block w-max max-w-full leading-[1.02] tracking-tighter ${
                    ln.style === "serif"
                      ? "aether-font-serif italic text-[#A34A33] text-5xl sm:text-6xl md:text-7xl lg:text-[5.5vw]"
                      : ln.style === "stroke"
                      ? "aether-font-display aether-text-stroke--light font-extrabold uppercase text-5xl sm:text-6xl md:text-7xl lg:text-[5.5vw]"
                      : "aether-font-display font-extrabold uppercase text-[#f7f4ec] text-5xl sm:text-6xl md:text-7xl lg:text-[5.5vw]"
                  }`}
                >
                  {ln.t}
                </motion.span>
              </div>
            ))}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="mt-8 max-w-xl text-base leading-relaxed text-[#f7f4ec]/70 md:text-lg"
            >
              {c.sub}
            </motion.p>
          </motion.div>

          {/* Liquid glass stat panels */}
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <motion.div
              className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-3 md:max-w-2xl"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {c.stats.map((s, i) => (
                <div
                  key={s.k}
                  className="glass-panel p-6 flex flex-col justify-between"
                  data-cursor="hover"
                  data-testid={`showcase-stat-${i}`}
                >
                  <span className="font-display block text-3xl font-extrabold uppercase tracking-tight text-[#f7f4ec] md:text-4xl whitespace-nowrap">
                    {s.v}
                  </span>
                  <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.24em] text-[#f7f4ec]/60">
                    {s.k}
                  </span>
                </div>
              ))}
            </motion.div>

            <Magnetic strength={0.24}>
              <Link
                to="/arquitetura"
                data-cursor="hover"
                data-testid="showcase-cta"
                className="glass-panel inline-flex items-center gap-2.5 !rounded-full px-8 py-4 text-sm font-semibold text-[#f7f4ec] hover:text-[#A34A33]"
              >
                {c.cta}
                <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
              </Link>
            </Magnetic>
          </div>
        </div>

        <MediaCredit media={media} className="absolute right-5 top-20 md:right-8 md:top-24" />
      </motion.div>
    </section>
  );
};
