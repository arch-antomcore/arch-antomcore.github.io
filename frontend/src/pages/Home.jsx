import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { getLucideIcon } from "@/lib/iconHelper";
import { useTranslation } from "@/hooks/useTranslation";
import { Container, Section, SectionHeader, Kicker, Reveal } from "@/components/site/primitives";
import { SpotlightCard } from "@/components/site/interactions";
import Marquee from "@/components/site/Marquee";
import GlobalLeakCounter from "@/components/site/GlobalLeakCounter";
import AetherHero from "@/components/aether/AetherHero";
import AetherClosing from "@/components/aether/AetherClosing";
import { IntroCurtain } from "@/components/aether/AetherKit";
import { GlassShowcase } from "@/components/aether/GlassMedia";
import CtaSection from "@/components/site/CtaSection";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { BlackHole } from "@/components/ui/black-hole";
import { GlitterWrap } from "@/components/ui/glitter-wrap";

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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeader kicker={HOME.stackKicker} title={HOME.stackTitle} desc={HOME.stackDesc} />
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/70 border border-[#211d18]/10 text-xs font-mono uppercase tracking-widest text-[#211d18] shrink-0 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#A34A33] animate-pulse" />
            14 Módulos · Processamento 100% Local
          </div>
        </div>
      </Container>
      <Reveal className="mt-8">
        <Marquee />
      </Reveal>
      <Container>
        <div className="mt-10 p-5 rounded-2xl bg-white/50 border border-[#211d18]/10 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600 leading-relaxed max-w-2xl">{HOME.stackCredit}</p>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#A34A33] font-semibold shrink-0">
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
      <div className="mt-14 grid gap-4 md:gap-5 md:grid-cols-3">
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

const ScrollCinematic = ({ children, offset = ["0 1", "0.8 1"] }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset,
  });
  
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  return (
    <motion.div ref={ref} style={{ opacity, y, scale }}>
      {children}
    </motion.div>
  );
};

const AETHER_ZOOM_IMAGES = [
  {
    src: "/assets/img/gallery/aether-5.png",
    alt: "Chat inteligente integrado na barra lateral do Quintessence",
  },
  {
    src: "/assets/img/gallery/aether-2.png",
    alt: "Orquestrador Hub de Modelos e LLMs",
  },
  {
    src: "/assets/img/gallery/aether-1.png",
    alt: "AetherCore Workspace - Dashboard local e chat com IA",
  },
  {
    src: "/assets/img/gallery/aether-4.png",
    alt: "Marketplace de Extensões do Quintessence",
  },
  {
    src: "/assets/img/gallery/aether-3.png",
    alt: "Visual da IDE de alta performance do Quintessence",
  },
  {
    src: "/assets/img/gallery/aether-2.png",
    alt: "Orquestrador de Modelos",
  },
  {
    src: "/assets/img/gallery/aether-4.png",
    alt: "Quintessence Marketplace",
  },
];

const SectionGroupWithStarfield = ({ children }) => {
  const groupRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: groupRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <div ref={groupRef} className="relative overflow-hidden w-full">
      {/* Background Starfield Warp Tunnel (GlitterWrap) with Parallax behind BlackHole */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.85] overflow-hidden"
        aria-hidden="true"
      >
        <GlitterWrap
          particleCount={550}
          speed={4}
          starSize={14}
          focalDepth={14}
          brightness={85}
          glitterIntensity={4}
          color1="#ffffff"
          color2="#A34A33"
          color3="#eab308"
          trailAmount={80}
        />
      </motion.div>

      {/* Interactive 3D BlackHole Background spanning 'what-is-aether' section */}
      <div className="absolute inset-0 z-[1] opacity-[0.92] pointer-events-auto overflow-hidden" aria-hidden="true">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center">
          <BlackHole
            particleCount={1000}
            particleSize={4}
            tilt={20}
            tiltSideway={160}
            trail={50}
            orbitSpeed={4}
            outerRadius={70}
            colors={["#ffffff", "#A34A33", "#d97706"]}
          />
        </div>
        {/* Clean transparent container without dark gradient masks */}
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

const Home = () => (
  <div data-testid="home-page">
    <IntroCurtain />
    <AetherHero />
    <ZoomParallax images={AETHER_ZOOM_IMAGES} />
    
    {/* Sections //01 ("O que o Aether Faz?") up to //03 ("Resumo Comercial") */}
    <SectionGroupWithStarfield>
      <ScrollCinematic offset={["0 1", "0.6 1"]}>
        <WhatIsAetherSection />
      </ScrollCinematic>
      
      <ScrollCinematic offset={["0 1", "0.5 1"]}>
        <Section id="global-leak-counter" className="liquid-divider">
          <Container>
            <GlobalLeakCounter />
          </Container>
        </Section>
      </ScrollCinematic>
      
      <ScrollCinematic offset={["0 1", "0.6 1"]}>
        <Synthesis />
      </ScrollCinematic>
    </SectionGroupWithStarfield>

    <GlassShowcase />

    <ScrollCinematic offset={["0 1", "0.7 1"]}>
      <StackSection />
    </ScrollCinematic>
    
    <AetherClosing />

    <CtaSection />
  </div>
);

export default Home;
