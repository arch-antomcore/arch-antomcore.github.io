import React from "react";

import { getLucideIcon } from "@/lib/iconHelper";
import { useTranslation } from "@/hooks/useTranslation";
import { Container, Section, SectionHeader, Kicker, Reveal } from "@/components/site/primitives";
import { SpotlightCard } from "@/components/site/interactions";
import GsapReveal from "@/components/site/GsapReveal";
import Marquee from "@/components/site/Marquee";
import GlobalLeakCounter from "@/components/site/GlobalLeakCounter";
import AetherHero from "@/components/aether/AetherHero";
import AetherClosing from "@/components/aether/AetherClosing";

import { GlassShowcase } from "@/components/aether/GlassMedia";
import CtaSection from "@/components/site/CtaSection";
import { Tiles } from "@/components/ui/tiles";
import FounderMessage from "@/components/site/FounderMessage";


const WhatIsAetherSection = () => {
  const { t } = useTranslation();
  const HOME = t.HOME;
  return (
  <Section id="what-is-aether" className="liquid-divider">
    <Container className="aether-tile-surface">
      <Tiles tileSize="lg" />
      <SectionHeader 
        kicker={HOME.whatIsAether.kicker} 
        title={HOME.whatIsAether.title} 
        desc={HOME.whatIsAether.desc} 
      />
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {HOME.whatIsAether.cards.map((card, i) => {
          const IconComponent = getLucideIcon(card.icon);

          return (
            <Reveal key={card.t} delay={i * 0.05}>
              <SpotlightCard className="identity-reveal-card flex h-full flex-col justify-between overflow-hidden rounded-[28px] liquid-glass p-8 transition-colors duration-300 hover:border-white/20">
                <div>
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white shadow-inner">
                    <IconComponent className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white mb-3">
                    {card.t}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {card.d}
                  </p>
                </div>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </Container>
  </Section>
  );
};

const StackSection = () => {
  const { t } = useTranslation();
  const HOME = t.HOME;
  return (
    <Section id="stack" className="liquid-divider">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <SectionHeader kicker={HOME.stackKicker} title={HOME.stackTitle} desc={HOME.stackDesc} />
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/70 border border-[#211d18]/10 text-xs font-mono uppercase tracking-widest text-[#211d18] shrink-0 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#0038FF] animate-pulse" />
            14 Módulos · Processamento 100% Local
          </div>
        </div>
      </Container>
      <Reveal className="mt-4">
        <Marquee />
      </Reveal>
      <Container>
        <div className="mt-8 p-5 rounded-2xl bg-white/60 border border-[#211d18]/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600 leading-relaxed max-w-2xl">{HOME.stackCredit}</p>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#0038FF] font-semibold shrink-0">
            // STACK VERIFICADA · RUST + TOKIO + AXUM
          </span>
        </div>
      </Container>
    </Section>
  );
};

const Synthesis = () => {
  const { t } = useTranslation();
  const HOME = t.HOME;
  return (
  <Section id="synthesis" className="liquid-divider">
    <Container>
      <SectionHeader kicker={HOME.synthKicker} title={HOME.synthTitle} desc={HOME.synthDesc} />
      <div className="mt-10 grid gap-4 md:gap-5 md:grid-cols-3">
        {HOME.synth.map((s, i) => (
          <Reveal key={s.tag} delay={i * 0.08}>
            <SpotlightCard className="identity-reveal-card h-full rounded-[28px] liquid-glass p-8 transition-colors duration-300 hover:border-white/20">
              <Kicker>{s.tag}</Kicker>
              <h3 className="mt-5 text-xl md:text-2xl font-medium tracking-tight text-white">{s.t}</h3>
              <p className="mt-4 text-sm text-zinc-400 leading-relaxed">{s.d}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Container>
  </Section>
  );
};

/* Section entrances are GSAP tweens fired once on enter (see GsapReveal), no
   longer scrubbed transforms over sections full of glass cards. */
const ScrollCinematic = ({ children }) => <GsapReveal>{children}</GsapReveal>;

const Home = () => {


  return (
  <div data-testid="home-page">

    <AetherHero />

    
    {/* Sections //01 ("O que o Aether Faz?") up to //03 ("Resumo Comercial") */}
    <div className="home-editorial-sections">
      <ScrollCinematic>
        <WhatIsAetherSection />
      </ScrollCinematic>
      
      <ScrollCinematic>
        <Section id="global-leak-counter" className="liquid-divider">
          <Container>
            <GlobalLeakCounter />
          </Container>
        </Section>
      </ScrollCinematic>
      
      <ScrollCinematic>
        <Synthesis />
      </ScrollCinematic>
    </div>

    <GlassShowcase />

    <ScrollCinematic>
      <StackSection />
    </ScrollCinematic>
    
    <AetherClosing />

    <FounderMessage />

    <CtaSection />
  </div>
  );
};

export default Home;
