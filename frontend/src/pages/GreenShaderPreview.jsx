import React from "react";
import { FileText, Code as Code2, Table as Table2, ShieldCheck, ChatText as MessageSquareText, Globe, Cpu, HardDrive, ClipboardText as ClipboardCheck, Shield, Lock, CheckCircle as CheckCircle2 } from "@phosphor-icons/react";
import { useTranslation } from "@/hooks/useTranslation";
import { Container, SectionHeader, Section, Reveal } from "@/components/site/primitives";
import { SpotlightCard } from "@/components/site/interactions";
import GlobalLeakCounter from "@/components/site/GlobalLeakCounter";
import PageHero from "@/components/site/PageHero";
import { Tiles } from "@/components/ui/tiles";

const CHIP_ICONS = {
  FileText,
  Code2,
  Table2,
  ShieldCheck,
  MessageSquareText,
  Globe,
  Cpu,
  HardDrive,
  ClipboardCheck,
};

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
            const IconComponent = CHIP_ICONS[card.icon] || FileText;
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

const Synthesis = () => {
  const { t } = useTranslation();
  const HOME = t.HOME;
  const icons = [Shield, Cpu, Lock];

  return (
    <Section id="synthesis" className="liquid-divider">
      <Container>
        <SectionHeader
          kicker={HOME.synthKicker}
          title={HOME.synthTitle}
          desc={HOME.synthDesc}
        />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {HOME.synth.map((s, i) => {
            const Icon = icons[i] || CheckCircle2;
            return (
              <Reveal key={s.t} delay={i * 0.1}>
                <SpotlightCard className="identity-reveal-card relative overflow-hidden rounded-[32px] liquid-glass p-8 h-full flex flex-col justify-between group transition-all duration-500 hover:border-white/25">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-[#0038FF]/20 transition-all duration-500" />
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shadow-inner">
                        <Icon className="h-6 w-6" strokeWidth={1.5} />
                      </div>
                      <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white mb-4">
                      {s.t}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {s.d}
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

export default function GreenShaderPreview() {
  const { language } = useTranslation();
  const en = language === "en";

  return (
    <div className="reference-theme-preview" data-testid="cinematic-theme-preview">
      <PageHero
        kicker={en ? "AetherCore · visual preview" : "AetherCore · prévia visual"}
        lines={en ? ["Form and motion.", "One experience."] : ["Forma e movimento.", "Uma só experiência."]}
        lead={en
          ? "Electric blue, warm paper and lime. A single visual language for the entire AetherCore website."
          : "Azul elétrico, papel e lima. Uma única linguagem visual para todo o website do AetherCore."}
        secondary={{ to: "/", label: en ? "Back to the website" : "Voltar ao website" }}
      />
      <WhatIsAetherSection />
      <Section id="global-leak-counter" className="liquid-divider">
        <Container>
          <GlobalLeakCounter />
        </Container>
      </Section>
      <Synthesis />
    </div>
  );
}
