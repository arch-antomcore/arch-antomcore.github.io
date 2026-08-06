import React from "react";
import { motion } from "framer-motion";
import { Container, Kicker, Reveal } from "@/components/site/primitives";

/**
 * Editorial numbered chapters:
 * huge serif drop-cap number + kicker + heading + body + tag chips.
 * Alternates left/right for magazine rhythm. Very Awwwards.
 */

const EditorialChapters = ({ items = [], leftLabel, hoverLabel = "Ler" }) => {
  if (!items.length) return null;

  return (
    <Container className="mt-16">
      <div className="flex flex-col divide-y divide-[#211d18]/10">
        {items.map((it, i) => {
          const isEven = i % 2 === 0;
          return (
            <motion.article
              key={it.n || it.t || i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-12 md:py-16 transition-colors duration-500 hover:bg-[#211d18]/[0.03]"
              data-cursor="hover"
              data-cursor-text={hoverLabel}
              data-testid={`editorial-chapter-${i}`}
            >
              {/* Left: big serif number */}
              <div className={`md:col-span-3 flex ${isEven ? "md:justify-start" : "md:justify-end md:order-3"}`}>
                <div className="flex items-start gap-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#211d18]/40 pt-3">
                    {leftLabel || "N°"}
                  </span>
                  <span className="aether-font-serif italic text-[#211d18] text-[100px] md:text-[140px] leading-[0.85] font-normal transition-colors duration-500 group-hover:text-[#A34A33]">
                    {it.n || String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Middle: content */}
              <div className="md:col-span-6 flex flex-col justify-center">
                {it.tag && <Kicker className="mb-4">{it.tag}</Kicker>}
                <h3 className="aether-font-display font-bold uppercase tracking-tight text-2xl md:text-4xl leading-[1.02] text-[#211d18]">
                  {it.t}
                </h3>
                <p className="mt-4 text-sm md:text-base text-[#211d18]/60 leading-relaxed max-w-xl">
                  {it.d}
                </p>
                {it.points && it.points.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {it.points.map((p) => (
                      <span
                        key={p}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#211d18]/15 bg-[#fbf9f2] px-3 py-1 text-[11px] font-mono uppercase tracking-[0.15em] text-[#211d18]/70"
                      >
                        <span className="h-1 w-1 rounded-full bg-[#A34A33]" />
                        {p}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: arrow + hover indicator */}
              <div className={`md:col-span-3 flex items-center ${isEven ? "md:justify-end" : "md:justify-start md:order-1"}`}>
                <motion.div
                  className="flex items-center gap-3 text-[#211d18]/60 group-hover:text-[#A34A33]"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
                    {i === items.length - 1 ? "END" : "NEXT"}
                  </span>
                  <span className="block h-px w-14 bg-current" />
                  <span className="aether-font-display font-bold text-xl">→</span>
                </motion.div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </Container>
  );
};

export default EditorialChapters;
