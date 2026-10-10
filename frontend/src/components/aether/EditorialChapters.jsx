import React from "react";
import { motion } from "framer-motion";
import { Container, Kicker } from "@/components/site/primitives";

/**
 * Numbered reading cards. The number establishes the sequence; the content
 * stays in one column so a long list is easy to scan on every screen.
 */

const EditorialChapters = ({ items = [], leftLabel }) => {
  if (!items.length) return null;

  return (
    <Container className="mt-10">
      <div className="editorial-chapter-list flex flex-col gap-4">
        {items.map((it, i) => {
          return (
            <motion.article
              key={it.n || it.t || i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="editorial-chapter group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 transition-colors duration-500"
              data-testid={`editorial-chapter-${i}`}
            >
              <div className="md:col-span-2 flex">
                <div className="flex flex-col items-start gap-3">
                  <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#211d18]/60">
                    {leftLabel || "N°"}
                  </span>
                  <span className="editorial-chapter-number aether-font-display text-[#0038FF] text-5xl md:text-7xl leading-none font-black">
                    {it.n || String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Middle: content */}
              <div className="md:col-span-10 flex flex-col justify-center">
                {it.tag && <Kicker className="mb-4">{it.tag}</Kicker>}
                <h3 className="aether-font-display font-bold uppercase tracking-tight text-2xl md:text-4xl leading-[1.02] text-[#211d18]">
                  {it.t}
                </h3>
                <p className="mt-4 text-sm md:text-base text-[#211d18]/75 leading-relaxed max-w-3xl">
                  {it.d}
                </p>
                {it.points && it.points.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {it.points.map((p) => (
                      <span
                        key={p}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#0038FF]/15 bg-[#0038FF]/5 px-3 py-1 text-[11px] font-mono text-[#08258f]"
                      >
                        <span className="h-1 w-1 rounded-full bg-[#0038FF]" />
                        {p}
                      </span>
                    ))}
                  </div>
                )}
              </div>

            </motion.article>
          );
        })}
      </div>
    </Container>
  );
};

export default EditorialChapters;
