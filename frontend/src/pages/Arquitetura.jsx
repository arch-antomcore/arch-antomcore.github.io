import React from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { useTranslation } from "@/hooks/useTranslation";
import { Container, Section, SectionHeader, Kicker, Reveal } from "@/components/site/primitives";
import PageHero from "@/components/site/PageHero";
import CtaSection from "@/components/site/CtaSection";
import { SpotlightCard } from "@/components/site/interactions";

const Arquitetura = () => {
  const { t, language } = useTranslation();
  const ARQUITETURA = t.ARQUITETURA;
  const BRAND = t.BRAND;

  return (
    <div data-testid="arquitetura-page">
      <PageHero
        kicker={ARQUITETURA.kicker}
        lines={ARQUITETURA.title}
        lead={ARQUITETURA.lead}
        primary={{ to: "/#cta" }}
        secondary={{ to: "/produto" }}
      />

      <Section className="liquid-divider">
        <Container>
          <SectionHeader kicker={ARQUITETURA.loopKicker} title={ARQUITETURA.loopTitle} desc={ARQUITETURA.loopDesc} />
          <div className="mt-14 grid gap-4 md:gap-5 lg:grid-cols-4">
            {ARQUITETURA.loop.map((s, i) => (
              <Reveal key={s.tag} delay={i * 0.07}>
                <SpotlightCard className="relative flex h-full flex-col rounded-[28px] liquid-glass p-7 hover:border-white/20 transition-colors duration-300">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                      {s.tag}
                    </span>
                    {i < ARQUITETURA.loop.length - 1 && (
                      <ArrowRight className="hidden lg:block h-4 w-4 text-zinc-700" strokeWidth={1.5} />
                    )}
                  </div>
                  <h3 className="mt-6 text-lg font-medium tracking-tight text-white">{s.t}</h3>
                  <p className="mt-3 flex-1 text-sm text-zinc-400 leading-relaxed">{s.d}</p>
                  <p className="mt-6 rounded-full liquid-glass px-3 py-2 text-center font-mono text-[11px] text-zinc-400">
                    {s.chip}
                  </p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="seguranca" className="liquid-divider">
        <Container>
          <SectionHeader kicker={ARQUITETURA.capsKicker} title={ARQUITETURA.capsTitle} desc={ARQUITETURA.capsDesc} />
          <div className="mt-14 grid gap-px overflow-hidden rounded-[28px] liquid-glass sm:grid-cols-2 lg:grid-cols-4">
            {ARQUITETURA.caps.map((c, i) => (
              <Reveal key={c.n} delay={(i % 4) * 0.05}>
                <SpotlightCard className="group h-full bg-black p-7 hover:bg-white/[0.03] transition-all duration-300 relative overflow-hidden">
                  {/* Subtle hover gradient detail */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#A34A33]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="flex items-center justify-between relative z-10">
                    <span className="font-mono text-2xl font-light text-zinc-600 group-hover:text-zinc-400 transition-colors">{c.n}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600 group-hover:text-[#A34A33]/70 transition-colors">{c.tag}</span>
                  </div>
                  <h3 className="mt-8 text-base font-medium tracking-tight text-white relative z-10">{c.t}</h3>
                  <p className="mt-3 text-sm text-zinc-500 leading-relaxed relative z-10">{c.d}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="liquid-divider">
        <Container>
          <Reveal>
            <SpotlightCard className="relative overflow-hidden rounded-[32px] liquid-glass p-8 md:p-12">
              {/* Subtle amber radial gradient for 'Obsidiana' feel */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-900/20 via-zinc-950 to-zinc-950 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                <div className="flex-1">
                  <Kicker>{ARQUITETURA.releaseKicker}</Kicker>
                  <h2 className="mt-6 font-mono text-3xl md:text-5xl font-medium tracking-tight text-white">
                    {ARQUITETURA.releaseTitle}
                  </h2>
                  <p className="mt-6 max-w-2xl text-base md:text-lg text-zinc-400 leading-relaxed">
                    {ARQUITETURA.releaseDesc}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-2.5 font-mono text-[10px] md:text-[11px] uppercase tracking-widest text-amber-500/80">
                    {ARQUITETURA.releaseTags?.map((tag, i) => (
                      <span key={i} className="rounded-full border border-amber-500/20 bg-amber-500/5 px-3.5 py-1.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="hidden md:flex shrink-0 items-center justify-center pt-4 pr-4">
                  <div className="h-28 w-28 rounded-full liquid-glass flex items-center justify-center relative shadow-[0_0_50px_rgba(245,158,11,0.05)]">
                    <div className="absolute inset-2 rounded-full border border-amber-500/20 animate-[spin_15s_linear_infinite] border-dashed" />
                    <span className="font-mono text-lg font-bold text-white tracking-tighter">
                      {BRAND.version.split(" ")[0]}
                    </span>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        </Container>
      </Section>

      <CtaSection />
    </div>
  );
};

export default Arquitetura;
