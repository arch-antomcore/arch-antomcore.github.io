import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Container, Section, SectionHeader, Kicker, Reveal } from "@/components/site/primitives";
import PageHero from "@/components/site/PageHero";
import CtaSection from "@/components/site/CtaSection";
import { SpotlightCard } from "@/components/site/interactions";

const Roadmap = () => {
  const { t, language } = useTranslation();
  const ROADMAP = t.ROADMAP;

  return (
    <div data-testid="roadmap-page">
      <PageHero
        kicker={ROADMAP.kicker}
        lines={[ROADMAP.title]}
        lead={ROADMAP.lead}
        primary={{ 
          label: language === "en" ? "Open dossier" : "Abrir dossiê", 
          to: "/dossie" 
        }}
        secondary={{ 
          label: language === "en" ? "View references" : "Ver referências", 
          to: "/referencias" 
        }}
      />

      <Section className="liquid-divider">
        <Container>
          <SectionHeader
            kicker={ROADMAP.timelineKicker}
            title={ROADMAP.timelineTitle}
            desc={ROADMAP.timelineDesc}
          />

          <div className="mt-16 relative">
            <div className="absolute left-[7px] md:left-1/2 top-2 bottom-2 w-px bg-white/10 md:-translate-x-1/2" aria-hidden="true" />
            <div className="space-y-12">
              {ROADMAP.phases.map((p, i) => (
                <Reveal key={p.period} delay={(i % 2) * 0.06}>
                  <div className={`relative pl-10 md:pl-0 md:grid md:grid-cols-2 md:gap-12 ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
                    <span className="absolute left-0 top-2 md:left-1/2 md:-translate-x-1/2 h-4 w-4 rounded-full border border-white/30 bg-black">
                      <span className="absolute inset-1 rounded-full bg-white" />
                    </span>
                    <div className={`${i % 2 === 1 ? "md:text-left md:pl-12" : "md:text-right md:pr-12"}`}>
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                        {p.period}
                      </span>
                      <h3 className="mt-2 text-2xl font-medium tracking-tight text-white">{p.t}</h3>
                    </div>
                    <div className={`${i % 2 === 1 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                      <p className="mt-3 md:mt-0 text-sm text-zinc-400 leading-relaxed max-w-md md:inline-block">
                        {p.d}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="liquid-divider">
        <Container>
          <SectionHeader kicker={ROADMAP.metricsKicker} title={ROADMAP.metricsTitle} desc={ROADMAP.metricsDesc} />
          <div className="mt-14 grid gap-4 md:gap-5 md:grid-cols-3">
            {ROADMAP.metrics.map((m, i) => (
              <Reveal key={m.tag} delay={i * 0.08}>
                <SpotlightCard as="article" className="h-full rounded-[28px] liquid-glass p-8 hover:border-white/20 transition-colors duration-300">
                  <Kicker>{m.tag}</Kicker>
                  <h3 className="mt-5 text-xl font-medium tracking-tight text-white">{m.t}</h3>
                  <p className="mt-4 text-sm text-zinc-400 leading-relaxed">{m.d}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaSection />
    </div>
  );
};

export default Roadmap;
