import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * Editorial "opening spread" between the PageHero and the pricing stage.
 * Giant kinetic statement with horizontal scroll scrub, running stats and
 * a constant-speed infinite marquee band.
 */

const stats = {
  pt: [
    { k: "Custo por mês na cloud", v: "R$ 0.000", sub: "sem inferência externa" },
    { k: "Tempo até primeiro deploy", v: "< 12min", sub: "instalador local" },
    { k: "Dados enviados para fora", v: "0 bytes", sub: "por design" },
    { k: "Cores da matriz", v: "016", sub: "modelos empacotados" },
  ],
  en: [
    { k: "Monthly cloud fee", v: "$ 0.000", sub: "no external inference" },
    { k: "Time to first deploy", v: "< 12min", sub: "local installer" },
    { k: "Data sent outside", v: "0 bytes", sub: "by design" },
    { k: "Matrix cores", v: "016", sub: "bundled models" },
  ],
};

const HeadingLine = ({ line, index, scrollYProgress }) => {
  const dir = index % 2 === 0 ? 1 : -1;
  const x = useTransform(scrollYProgress, [0, 1], [dir * 40, dir * -40]);
  return (
    <motion.div
      className="overflow-hidden py-2"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.div
        variants={{
          hidden: { y: "135%", opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.9, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] },
          },
        }}
      >
        <motion.span
          style={{ x }}
          className={`block w-max max-w-full leading-[1.15] tracking-tighter py-1 ${
            line.serif
              ? "aether-font-serif italic text-[#A34A33] text-5xl sm:text-6xl md:text-7xl lg:text-[7vw] font-normal"
              : line.stroke
              ? "aether-font-display font-extrabold uppercase aether-text-stroke text-5xl sm:text-6xl md:text-7xl lg:text-[7vw]"
              : "aether-font-display font-extrabold uppercase text-[#211d18] text-5xl sm:text-6xl md:text-7xl lg:text-[7vw]"
          }`}
        >
          {line.t}
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

const MarqueeGroup = ({ language }) => (
  <div className="flex shrink-0 items-center gap-10 pr-10 md:gap-14 md:pr-14">
    {Array.from({ length: 3 }).map((_, i) => (
      <React.Fragment key={i}>
        <span className="aether-font-display whitespace-nowrap text-4xl font-black uppercase tracking-tight text-[#211d18] md:text-6xl">
          {language === "pt" ? "Você compra, é seu" : "You buy, you own"}
        </span>
        <span className="aether-font-display text-4xl font-black text-[#A34A33] md:text-6xl">×</span>
        <span className="aether-font-serif whitespace-nowrap text-4xl italic text-[#211d18]/70 md:text-6xl">
          {language === "pt" ? "Zero mensalidade" : "Zero monthly fee"}
        </span>
        <span className="aether-font-display text-4xl font-black text-[#A34A33] md:text-6xl">×</span>
      </React.Fragment>
    ))}
  </div>
);

const PrecosEditorial = () => {
  const { language } = useTranslation();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yQuote = useTransform(scrollYProgress, [0, 1], ["8%", "-5%"]);

  const s = stats[language] || stats.pt;

  const heading = language === "pt"
    ? [
        { t: "Preço é", stroke: false },
        { t: "geografia,", stroke: true },
        { t: "não", stroke: false },
        { t: "assinatura.", stroke: false, serif: true },
      ]
    : [
        { t: "Price is", stroke: false },
        { t: "geography,", stroke: true },
        { t: "not", stroke: false },
        { t: "subscription.", stroke: false, serif: true },
      ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#ece7da] py-24 md:py-32"
      data-testid="precos-editorial"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        {/* Meta strip */}
        <div className="mb-16 flex items-center justify-between border-b border-[#211d18]/12 pb-5 md:mb-24">
          <span className="flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-[#211d18]/60">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#A34A33]" />
            {language === "pt" ? "Preambulo — 02" : "Preamble — 02"}
          </span>
          <span className="hidden font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-[#211d18]/40 md:block">
            //PRICING.STATEMENT
          </span>
        </div>

        {/* Kinetic statement with horizontal scrub */}
        <motion.div style={{ y: yQuote }} className="flex flex-col gap-1">
          {heading.map((ln, i) => (
            <HeadingLine key={ln.t} line={ln} index={i} scrollYProgress={scrollYProgress} />
          ))}
        </motion.div>

        {/* Stats strip */}
        <div className="mt-20 grid grid-cols-1 gap-6 border-t border-[#211d18]/12 pt-8 md:mt-28 md:grid-cols-4 md:gap-4">
          {s.map((m, i) => (
            <motion.div
              key={m.k}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-2 border-l-2 border-[#211d18]/10 pl-5 transition-colors duration-500 hover:border-[#A34A33]"
              data-cursor="hover"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#211d18]/50">
                {m.k}
              </span>
              <span className="aether-font-display text-3xl font-extrabold uppercase tracking-tight text-[#211d18] tabular-nums md:text-4xl">
                {m.v}
              </span>
              <span className="text-xs text-[#211d18]/50">{m.sub}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Constant-speed infinite marquee band */}
      <div
        className="marquee-mask mt-24 overflow-hidden border-y border-[#211d18]/10 bg-[#f4f1e8] py-6 md:mt-32 md:py-8"
        data-testid="precos-marquee"
      >
        <div className="aether-marquee">
          <MarqueeGroup language={language} />
          <MarqueeGroup language={language} />
        </div>
      </div>
    </section>
  );
};

export default PrecosEditorial;
