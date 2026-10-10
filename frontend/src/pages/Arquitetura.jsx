import React from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { useTranslation } from "@/hooks/useTranslation";
import { Container, Section, SectionHeader, Kicker, Reveal } from "@/components/site/primitives";
import PageHero from "@/components/site/PageHero";
import CtaSection from "@/components/site/CtaSection";
import { SpotlightCard } from "@/components/site/interactions";

const Arquitetura = () => {
  const { t } = useTranslation();
  const ARQUITETURA = t.ARQUITETURA;
  const BRAND = t.BRAND;

  return (
    <div className="design-page" data-testid="arquitetura-page">
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
          <div className="architecture-flow mt-10 grid gap-4 md:gap-5 lg:grid-cols-4">
            {ARQUITETURA.loop.map((s, i) => (
              <Reveal key={s.tag} delay={i * 0.07}>
                <SpotlightCard className="design-panel relative flex h-full flex-col rounded-[32px] p-7 transition-colors duration-300">
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
                  <p className="architecture-flow-chip mt-6 rounded-2xl px-3 py-2 text-center font-mono text-[11px] text-[#08258f]">
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
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ARQUITETURA.caps.map((c, i) => (
              <Reveal key={c.n} delay={(i % 4) * 0.05}>
                <SpotlightCard className="design-panel group h-full p-7 transition-colors duration-300 relative overflow-hidden">
                  
                  <div className="flex items-center justify-between relative z-10">
                    <span className="font-mono text-2xl font-light text-zinc-600 group-hover:text-zinc-400 transition-colors">{c.n}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600 group-hover:text-[#0038FF]/70 transition-colors">{c.tag}</span>
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
            <SpotlightCard className="design-blue-panel architecture-release relative overflow-hidden rounded-[40px] p-8 md:p-12">
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                <div className="flex-1">
                  <Kicker>{ARQUITETURA.releaseKicker}</Kicker>
                  <h2 className="mt-6 aether-font-display text-3xl md:text-5xl font-black tracking-tight text-[#ccff00]">
                    {ARQUITETURA.releaseTitle}
                  </h2>
                  <p className="mt-6 max-w-2xl text-base md:text-lg text-zinc-400 leading-relaxed">
                    {ARQUITETURA.releaseDesc}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-2.5 font-mono text-[10px] md:text-[11px] uppercase tracking-widest text-[#f4f1e8]">
                    {ARQUITETURA.releaseTags?.map((tag, i) => (
                      <span key={i} className="rounded-full border border-[#f4f1e8]/25 bg-[#f4f1e8]/5 px-3.5 py-1.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="hidden md:flex shrink-0 items-center justify-center pt-4 pr-4">
                  <div className="h-28 w-28 rounded-full bg-[#ccff00] flex items-center justify-center relative">
                    <div className="absolute inset-2 rounded-full border border-[#08258f]/50 animate-[spin_15s_linear_infinite] border-dashed" aria-hidden="true" />
                    <span className="font-mono text-lg font-bold text-[#08258f] tracking-tighter">
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
