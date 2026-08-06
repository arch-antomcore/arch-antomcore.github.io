import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Container, Section, SectionHeader, Kicker, Reveal } from "@/components/site/primitives";
import PageHero from "@/components/site/PageHero";
import CtaSection from "@/components/site/CtaSection";
import { SpotlightCard } from "@/components/site/interactions";

const Privacidade = () => {
  const { t, language } = useTranslation();
  const PRIVACIDADE = t.PRIVACIDADE;

  return (
    <div data-testid="privacidade-page">
      <PageHero
        kicker={PRIVACIDADE.kicker}
        lines={[PRIVACIDADE.title]}
        lead={PRIVACIDADE.lead}
        primary={{ 
          label: language === "en" ? "Join beta list" : "Entrar na lista beta", 
          to: "/#cta" 
        }}
        secondary={{ 
          label: language === "en" ? "View principles" : "Ver princípios", 
          to: "/principios" 
        }}
      />

      <Section className="liquid-divider">
        <Container>
          <SectionHeader
            kicker={PRIVACIDADE.policyKicker}
            title={PRIVACIDADE.policyTitle}
            desc={PRIVACIDADE.policyDesc}
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-[28px] liquid-glass sm:grid-cols-2 lg:grid-cols-3">
            {PRIVACIDADE.cards.map((c, i) => (
              <Reveal key={c.tag} delay={(i % 3) * 0.06}>
                <SpotlightCard className="h-full bg-black p-8 hover:bg-white/[0.02] transition-colors duration-300">
                  <Kicker>{c.tag}</Kicker>
                  <h3 className="mt-5 text-lg font-medium tracking-tight text-white">{c.t}</h3>
                  <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{c.d}</p>
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

export default Privacidade;
