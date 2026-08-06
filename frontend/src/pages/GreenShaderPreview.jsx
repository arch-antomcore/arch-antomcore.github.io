import React from "react";
import { ShaderBackground } from "@/components/ui/shader-background";
import { Sparkle, ArrowLeft, FileText, Code as Code2, Table as Table2, ShieldCheck, ChatText as MessageSquareText, Globe, Cpu, HardDrive, ClipboardText as ClipboardCheck, Shield, Lock, CheckCircle as CheckCircle2 } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { Container, SectionHeader, Section, Reveal } from "@/components/site/primitives";
import { SpotlightCard } from "@/components/site/interactions";
import GlobalLeakCounter from "@/components/site/GlobalLeakCounter";

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
      <Container>
        <SectionHeader 
          kicker={HOME.whatIsAether.kicker} 
          title={HOME.whatIsAether.title} 
          desc={HOME.whatIsAether.desc} 
        />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
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
          kicker={HOME.synthesis.kicker}
          title={HOME.synthesis.title}
          desc={HOME.synthesis.desc}
        />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {HOME.synthesis.cards.map((s, i) => {
            const Icon = icons[i] || CheckCircle2;
            return (
              <Reveal key={s.t} delay={i * 0.1}>
                <SpotlightCard className="identity-reveal-card relative overflow-hidden rounded-[32px] liquid-glass p-8 h-full flex flex-col justify-between group transition-all duration-500 hover:border-white/25">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-[#A34A33]/20 transition-all duration-500" />
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
  return (
    <div className="relative min-h-screen w-full bg-[#f4f1e8] text-[#211d18] font-sans">
      {/* Navigation Bar */}
      <div className="sticky top-0 z-50 p-6 flex items-center justify-between pointer-events-auto bg-[#f4f1e8]/80 backdrop-blur-md border-b border-[#211d18]/10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 border border-[#211d18]/10 text-xs font-mono uppercase tracking-widest text-[#211d18] hover:bg-[#211d18] hover:text-white transition-colors duration-300 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Site Principial
        </Link>

        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#054833]/10 border border-[#054833]/20 text-[#054833] text-xs font-mono uppercase tracking-widest font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#054833] animate-pulse" />
          Preview Cópia Exata do Bloco WebGL
        </span>
      </div>

      {/* EXACT COPY OF THE HOMEPAGE SHADER BLOCK & SECTIONS */}
      <div className="relative overflow-hidden w-full">
        {/* WebGL Shader Background spanning from 'what-is-aether' to 'synthesis' */}
        <div className="absolute inset-0 z-0 opacity-[0.80] pointer-events-none" aria-hidden="true">
          <ShaderBackground className="h-full w-full" />
          {/* Soft top gradient mask blending dark ZoomParallax background into green shader */}
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#0b0a08] to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#f4f1e8] to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10">
          <WhatIsAetherSection />
          
          <Section id="global-leak-counter" className="liquid-divider">
            <Container>
              <GlobalLeakCounter />
            </Container>
          </Section>
          
          <Synthesis />
        </div>
      </div>
    </div>
  );
}
