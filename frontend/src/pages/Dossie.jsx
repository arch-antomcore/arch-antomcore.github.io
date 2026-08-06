import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Container, Section, SectionHeader, Kicker, Reveal } from "@/components/site/primitives";
import PageHero from "@/components/site/PageHero";
import CtaSection from "@/components/site/CtaSection";
import { SpotlightCard } from "@/components/site/interactions";

const Dossie = () => {
  const { t, language } = useTranslation();
  const DOSSIE = t.DOSSIE;

  return (
    <div data-testid="dossie-page">
      <PageHero
        kicker={DOSSIE.kicker}
        lines={DOSSIE.title}
        lead={DOSSIE.lead}
        primary={{ 
          label: language === "en" ? "Request early access" : "Solicitar acesso antecipado", 
          to: "/#cta" 
        }}
        secondary={{ 
          label: language === "en" ? "View roadmap" : "Ver roadmap", 
          to: "/roadmap" 
        }}
      />

      <Section className="liquid-divider">
        <Container>
          <SectionHeader kicker={DOSSIE.summaryKicker} title={DOSSIE.summaryTitle} />
          <div className="mt-14 grid gap-px overflow-hidden rounded-[28px] liquid-glass sm:grid-cols-2 lg:grid-cols-3">
            {DOSSIE.blocks.map((b, i) => (
              <Reveal key={b.tag} delay={(i % 3) * 0.06}>
                <SpotlightCard className="h-full bg-black p-8 hover:bg-white/[0.02] transition-colors duration-300">
                  <Kicker>{b.tag}</Kicker>
                  <h3 className="mt-5 text-lg font-medium tracking-tight text-white">{b.t}</h3>
                  <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{b.d}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="plano" className="liquid-divider">
        <Container>
          <SectionHeader kicker={DOSSIE.planKicker} title={DOSSIE.planTitle} />
          <div className="mt-14 space-y-3">
            {DOSSIE.plan.map((p, i) => (
              <Reveal key={p.period} delay={(i % 2) * 0.05}>
                <SpotlightCard className="grid gap-3 rounded-2xl liquid-glass p-6 md:grid-cols-[180px_1fr] md:items-center hover:border-white/20 transition-colors">
                  <span className="font-mono text-sm uppercase tracking-[0.15em] text-white">{p.period}</span>
                  <p className="text-sm text-zinc-400 leading-relaxed">{p.d}</p>
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

export default Dossie;
