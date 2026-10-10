import React from "react";
import { KineticText } from "@/components/site/interactions";

export const Container = ({ className = "", children }) => (
  <div className={`aether-container max-w-7xl mx-auto px-6 md:px-12 ${className}`}>{children}</div>
);

/* Sections: tighter vertical rhythm, no continuous per-section drift (it forced
   glass cards to re-rasterize on every scroll frame). */
export const Section = ({ id, className = "", children, ...rest }) => (
  <section id={id} className={`aether-section py-12 md:py-16 ${className}`} data-render-defer {...rest}>
    {children}
  </section>
);

export const Kicker = ({ children, className = "" }) => (
  <span
    className={`aether-kicker inline-flex items-center font-mono text-[11px] md:text-xs uppercase tracking-[0.28em] text-zinc-500 ${className}`}
  >
    <span className="mr-2.5 h-1.5 w-1.5 rounded-full bg-[#0038FF]" aria-hidden="true" />
    {children}
  </span>
);

export const Pill = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-300 ${className}`}
  >
    {children}
  </span>
);

/* Scroll-driven reveal. Scrubbed by the native view() timeline when
   available; `delay` maps onto the stagger index (--sda-i). */
export const Reveal = ({ children, delay = 0, className = "", as = "div", variant = "rise" }) => {
  const Tag = typeof as === "string" ? as : "div";
  const stagger = Math.round(delay / 0.06);
  return (
    <Tag
      className={`sda-${variant} ${className}`}
      style={stagger ? { "--sda-i": stagger } : undefined}
    >
      {children}
    </Tag>
  );
};

export const SectionHeader = ({ kicker, title, desc, align = "left", className = "" }) => {
  const isCenter = align === "center";
  return (
    <Reveal
      variant="blur"
      className={`aether-section-header ${isCenter ? "text-center mx-auto max-w-3xl" : "max-w-3xl"} ${className}`}
    >
      <div className={`flex items-center gap-4 ${isCenter ? "justify-center" : ""}`}>
        {kicker && <Kicker>{kicker}</Kicker>}

      </div>
      <h2 className="aether-section-title mt-4 text-3xl md:text-5xl aether-font-display font-bold uppercase aether-tracking-tighter leading-[1.02] text-gradient py-1 -my-1">
        <KineticText text={title} />
      </h2>
      {desc && (
        <p className="mt-5 text-base md:text-lg text-zinc-400 leading-relaxed">{desc}</p>
      )}
    </Reveal>
  );
};

export const Chip = ({ children }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full liquid-glass px-3 py-1 text-xs text-zinc-400">
    <span className="h-1 w-1 rounded-full bg-zinc-500" />
    {children}
  </span>
);

export const PageGridSection = ({
  id,
  className = "liquid-divider",
  kicker,
  title,
  desc,
  gridClassName = "mt-10 grid gap-4 md:gap-5 lg:grid-cols-3",
  children
}) => (
  <Section id={id} className={className}>
    <Container>
      {(kicker || title || desc) && (
        <SectionHeader kicker={kicker} title={title} desc={desc} />
      )}
      <div className={gridClassName}>{children}</div>
    </Container>
  </Section>
);

