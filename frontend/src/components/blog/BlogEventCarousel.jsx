import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CaretLeft, 
  CaretRight, 
  Broadcast, 
  Lightning, 
  Cpu, 
  Code, 
  Sparkle, 
  ArrowUpRight, 
  ShieldCheck, 
  Fire,
  CalendarBlank,
  Rocket
} from "@phosphor-icons/react";
import { useTranslation } from "@/hooks/useTranslation";

// --- Custom Hand-Drawn SVG Accents from Template ---

const ArrowGreenLeft = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full text-[#CCFF00] stroke-current overflow-visible" fill="none" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10,90 C 10,40 40,20 60,50 C 70,65 80,75 95,70" />
    <path d="M80,55 L95,70 L85,85" />
  </svg>
);

const ArrowGreenRight = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full text-[#CCFF00] stroke-current overflow-visible" fill="none" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M90,10 C 80,60 60,80 40,60 C 20,40 40,20 60,30 C 80,40 70,70 50,80" />
    <path d="M65,75 L50,80 L55,65" />
  </svg>
);

const CircularEventBadge = ({ text }) => (
  <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-[#CCFF00] rounded-full flex items-center justify-center shadow-2xl rotate-6 hover:scale-105 transition-transform duration-300 cursor-pointer border-[3px] border-black/10 select-none">
    <div className="absolute inset-1 animate-[spin_12s_linear_infinite]">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path id="circlePathEvent" d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" fill="none" />
        <text className="text-[10px] font-black tracking-[0.16em] uppercase" fill="black">
          <textPath href="#circlePathEvent" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
    </div>
    <div className="absolute inset-0 flex flex-col items-center justify-center text-black">
      <Rocket className="w-6 h-6 md:w-7 md:h-7 animate-bounce" weight="fill" />
      <span className="text-[8px] md:text-[9px] font-black tracking-wider uppercase">LIVE</span>
    </div>
  </div>
);

export const BlogEventCarousel = () => {
  const { language } = useTranslation();
  const isPt = language === "pt";
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const CAROUSEL_CARDS = [
    {
      id: "kernel-v1",
      icon: Cpu,
      phase: isPt ? "FASE 01 • MOTOR NATIVO" : "PHASE 01 • NATIVE CORE",
      title: isPt ? "Kernel V1.0 & Zero-Latency Engine" : "Kernel V1.0 & Zero-Latency Engine",
      subtitle: isPt ? "Reescrita Integral em Rust" : "Full Core Rewrite in Rust",
      description: isPt 
        ? "Novo runtime com isolamento de memória rigoroso, inferência local sub-milissegundo e arquitetura modular que reduz em 65% o consumo de RAM em qualquer PC."
        : "Brand-new execution runtime with strict sandboxing, sub-millisecond local inference, and modular architecture cutting RAM usage by 65% on any hardware.",
      metrics: isPt ? ["4x Mais Rápido", "0 KB na Nuvem", "Rust Axum"] : ["4x Faster", "0 KB Cloud", "Rust Axum"],
      tag: isPt ? "BREAKTHROUGH" : "BREAKTHROUGH",
      highlight: isPt ? "Apresentação ao vivo" : "Live Keynote Demo",
      status: isPt ? "CONFIDENCIAL // EM HOMOLOGAÇÃO" : "CONFIDENTIAL // IN STAGING",
      badgeColor: "bg-[#CCFF00] text-black",
    },
    {
      id: "quintessence-studio",
      icon: Code,
      phase: isPt ? "FASE 02 • WORKSPACE" : "PHASE 02 • WORKSPACE",
      title: isPt ? "Quintessence Studio 2.0" : "Quintessence Studio 2.0",
      subtitle: isPt ? "A Nova IDE da Era Local" : "The Cognitive Native IDE",
      description: isPt
        ? "Ambiente de desenvolvimento reimaginado com agentes integrados, canvas vetorial e auto-complete sem conexão externa. Suporte nativo a Qwen, DeepSeek e Llama."
        : "Rebuilt developer environment with built-in multi-agent workflows, infinite canvas, and offline copilot. Native support for Qwen, DeepSeek, and Llama.",
      metrics: isPt ? ["Offline Copilot", "Multi-LLMs", "Zero Telemetria"] : ["Offline Copilot", "Multi-LLMs", "Zero Telemetry"],
      tag: isPt ? "NOVA IDE" : "NEW IDE",
      highlight: isPt ? "Acesso VIP Fechado" : "Closed VIP Access",
      status: isPt ? "BETA RESTRITO" : "RESTRICTED BETA",
      badgeColor: "bg-white text-black",
    },
    {
      id: "agent-swarm",
      icon: Lightning,
      phase: isPt ? "FASE 03 • ORQUESTRAÇÃO" : "PHASE 03 • ORCHESTRATION",
      title: isPt ? "Multi-Agent Swarm (REACI v2)" : "Multi-Agent Swarm (REACI v2)",
      subtitle: isPt ? "Enxame de Agentes Autônomos" : "Autonomous Agent Swarms",
      description: isPt
        ? "Ativação de múltiplos agentes em paralelo para resolver desafios complexos: auditoria de segurança, síntese de arquivos sensíveis e automação local com checkpoints manuais."
        : "Deploy concurrent autonomous agents solving complex jobs: security auditing, sensitive data synthesis, and local automation with human-in-the-loop checkpoints.",
      metrics: isPt ? ["16+ Agentes Paralelos", "Auditoria SHA-256", "Hardware-Light"] : ["16+ Concurrent Agents", "SHA-256 Audit", "Hardware-Light"],
      tag: isPt ? "PARALELISMO" : "PARALLELISM",
      highlight: isPt ? "Capacidade Multi-Agente" : "Multi-Agent Fleet",
      status: isPt ? "PROTOCOLO ATIVO" : "PROTOCOL ACTIVE",
      badgeColor: "bg-[#CCFF00] text-black",
    },
    {
      id: "liquid-experience",
      icon: Sparkle,
      phase: isPt ? "FASE 04 • EXPERIÊNCIA" : "PHASE 04 • EXPERIENCE",
      title: isPt ? "Interface Líquida & Shaders 120 FPS" : "Liquid Glass UI & 120 FPS Shaders",
      subtitle: isPt ? "A Nova Estética Exvorn" : "The New Exvorn Aesthetic",
      description: isPt
        ? "Novo sistema visual baseado em vidro reativo e transições físicas calculadas em GPU integrada, mantendo leveza suprema e zero travamentos em PCs sem placa de vídeo."
        : "A responsive glass design system with GPU-accelerated physics and fluid shaders, engineered to run locked at 120 FPS without taxing low-spec laptops.",
      metrics: isPt ? ["120 FPS Fluido", "Modo Leve Ativo", "Sensorial"] : ["120 FPS Fluid", "Light Mode Ready", "Sensorial"],
      tag: isPt ? "DESIGN SYSTEM" : "DESIGN SYSTEM",
      highlight: isPt ? "Visual Revelado" : "Visual Revealed",
      status: isPt ? "PRONTO P/ PRODUÇÃO" : "READY FOR PRODUCTION",
      badgeColor: "bg-cyan-300 text-black",
    },
    {
      id: "founder-announcements",
      icon: Fire,
      phase: isPt ? "FASE 05 • REVEAL DAY" : "PHASE 05 • REVEAL DAY",
      title: isPt ? "Anúncios Exclusivos do Founder" : "Exclusive Founder Announcements",
      subtitle: isPt ? "Transmissão & Vagas VIP" : "Keynote Broadcast & VIP Slots",
      description: isPt
        ? "Matheus Peres fará comunicados cruciais e demonstrações em tempo real nos próximos dias. Vagas prioritárias e chaves de acesso antecipado serão distribuídas."
        : "Matheus Peres will deliver critical updates and live product demos in the coming days. Priority rollout keys and community seats will be opened.",
      metrics: isPt ? ["Transmissão Direta", "Vagas Limitadas", "Chaves Alpha"] : ["Direct Stream", "Limited Seats", "Alpha Keys"],
      tag: isPt ? "COMUNICADO OFICIAL" : "OFFICIAL BRIEFING",
      highlight: isPt ? "Fique Atento aos Próximos Dias" : "Stay Tuned Next Days",
      status: isPt ? "CONTAGEM REGRESSIVA" : "COUNTDOWN ON",
      badgeColor: "bg-[#CCFF00] text-black",
    },
  ];

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    
    // Add a small threshold (e.g., 5px) to handle rounding errors at the edges
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 5);

    // Calculate active card by finding the child whose left edge is closest to the scrollLeft + padding
    const container = scrollRef.current;
    const children = Array.from(container.querySelectorAll(".event-carousel-card"));
    
    let closestIdx = 0;
    let minDistance = Infinity;
    
    // The container has padding-left (px-6/px-10/px-12) which we need to account for
    const containerPaddingLeft = parseFloat(window.getComputedStyle(container).paddingLeft) || 0;

    children.forEach((child, idx) => {
      // The child's offsetLeft relative to the container's scrolling context
      // Child offsetLeft includes the container's padding.
      const childLeft = child.offsetLeft - containerPaddingLeft;
      const distance = Math.abs(childLeft - scrollLeft);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });

    setActiveIndex(closestIdx);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      // Initial check after layout
      setTimeout(checkScroll, 100);
      window.addEventListener("resize", checkScroll);
      return () => {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []);

  const scrollToIndex = (idx) => {
    if (!scrollRef.current) return;
    const cards = scrollRef.current.querySelectorAll(".event-carousel-card");
    if (cards[idx]) {
      cards[idx].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    }
  };

  const scrollTo = (direction) => {
    if (direction === "left") {
      scrollToIndex(Math.max(0, activeIndex - 1));
    } else {
      scrollToIndex(Math.min(CAROUSEL_CARDS.length - 1, activeIndex + 1));
    }
  };

  return (
    <div className="w-full relative my-8 md:my-14 px-3 sm:px-6 max-w-[1440px] mx-auto select-none">
      
      {/* Outer Banner with Electric Blue & Grid Pattern from User Template */}
      <div className="relative rounded-[2.5rem] md:rounded-[3.5rem] bg-[#0038FF] text-white overflow-hidden shadow-[0_25px_70px_rgba(0,56,255,0.4)] border-[3px] border-white/20">
        
        {/* Background Grid Pattern Extracted from Template */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none z-0" />

        {/* Decorative Ambient Glow Orbs */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#CCFF00]/25 rounded-full blur-[100px] pointer-events-none z-0" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-400/25 rounded-full blur-[120px] pointer-events-none z-0" />

        {/* Floating Accents */}
        <div className="hidden lg:block absolute top-6 right-8 w-24 h-24 z-20 pointer-events-none opacity-80">
          <ArrowGreenRight />
        </div>
        <div className="hidden lg:block absolute bottom-6 left-8 w-24 h-24 z-20 pointer-events-none opacity-80">
          <ArrowGreenLeft />
        </div>

        {/* Top Header Bar Inside the Banner */}
        <div className="relative z-10 p-6 sm:p-10 md:p-12 pb-4 md:pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/15">
          <div className="max-w-3xl">
            {/* Live Indicator Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/20 backdrop-blur-md mb-4 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CCFF00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#CCFF00]"></span>
              </span>
              <span className="font-mono font-bold text-[11px] md:text-xs uppercase tracking-[0.2em] text-[#CCFF00]">
                {isPt ? "EVENTO IMINENTE • ANÚNCIOS IMPORTANTES" : "IMMINENT EVENT • MAJOR ANNOUNCEMENTS"}
              </span>
            </div>

            {/* Massive 3D Layered Typography from User Template */}
            <div className="space-y-1">
              <h2 
                className="text-[clamp(2.2rem,6vw,4.2rem)] font-black leading-[0.9] tracking-tighter text-[#CCFF00] uppercase m-0 p-0"
                style={{ 
                  fontFamily: '"Arial Black", Impact, sans-serif',
                  textShadow: '1px 1px 0 #001A99, 2px 2px 0 #001A99, 3px 3px 0 #001A99, 4px 4px 0 #001A99, 5px 5px 0 #001A99, 6px 6px 0 #001A99, 7px 7px 0 #001A99, 8px 8px 0 #001A99'
                }}
              >
                {isPt ? "#GRANDE ATUALIZAÇÃO" : "#MAJOR UPDATE"}
              </h2>
              <h3 
                className="text-[clamp(2rem,5.5vw,3.8rem)] font-black leading-[0.9] tracking-tighter text-white uppercase m-0 p-0"
                style={{ 
                  fontFamily: '"Arial Black", Impact, sans-serif',
                  textShadow: '1px 1px 0 #001A99, 2px 2px 0 #001A99, 3px 3px 0 #001A99, 4px 4px 0 #001A99, 5px 5px 0 #001A99, 6px 6px 0 #001A99, 7px 7px 0 #001A99, 8px 8px 0 #001A99'
                }}
              >
                {isPt ? "KEYNOTE & LANÇAMENTO" : "KEYNOTE & REVEAL"}
              </h3>
            </div>

            <p className="mt-4 text-white/90 text-sm md:text-base font-medium max-w-2xl leading-relaxed">
              {isPt
                ? "Nos próximos dias, uma série de novidades transformará a infraestrutura do AetherCore e da Exvorn. Deslize para visualizar os pilares que serão revelados."
                : "In the coming days, a landmark series of announcements will transform the AetherCore and Exvorn ecosystem. Swipe to explore the upcoming keynote pillars."}
            </p>
          </div>

          {/* Rotating Circular Badge & Navigation Controls */}
          <div className="flex items-center gap-5 sm:gap-6 self-start md:self-end">
            <div className="hidden sm:block">
              <CircularEventBadge 
                text={isPt ? "AETHER KEYNOTE • ANÚNCIO EXCLUSIVO • DIAS • " : "AETHER KEYNOTE • MAJOR UPDATE INCOMING • "} 
              />
            </div>

            {/* Next / Prev Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollTo("left")}
                disabled={!canScrollLeft}
                aria-label="Previous card"
                className={`p-3 md:p-3.5 rounded-full border border-white/30 text-white backdrop-blur-md transition-all duration-200 ${
                  canScrollLeft
                    ? "bg-white/20 hover:bg-[#CCFF00] hover:text-black hover:border-black cursor-pointer shadow-lg active:scale-95"
                    : "opacity-35 cursor-not-allowed bg-black/20"
                }`}
              >
                <CaretLeft className="w-5 h-5 md:w-6 md:h-6" weight="bold" />
              </button>

              <button
                onClick={() => scrollTo("right")}
                disabled={!canScrollRight}
                aria-label="Next card"
                className={`p-3 md:p-3.5 rounded-full border border-white/30 text-white backdrop-blur-md transition-all duration-200 ${
                  canScrollRight
                    ? "bg-white/20 hover:bg-[#CCFF00] hover:text-black hover:border-black cursor-pointer shadow-lg active:scale-95"
                    : "opacity-35 cursor-not-allowed bg-black/20"
                }`}
              >
                <CaretRight className="w-5 h-5 md:w-6 md:h-6" weight="bold" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Carousel Track */}
        <div
          ref={scrollRef}
          className="relative z-10 flex gap-4 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 sm:px-10 md:px-12 py-8 md:py-10 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {CAROUSEL_CARDS.map((card, idx) => {
            const Icon = card.icon;
            const isSelected = activeIndex === idx;

            return (
              <div
                key={card.id}
                onClick={() => scrollToIndex(idx)}
                className={`event-carousel-card snap-start flex-shrink-0 w-[290px] sm:w-[340px] md:w-[380px] rounded-[2rem] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer relative overflow-hidden group border ${
                  isSelected
                    ? "bg-white text-black shadow-2xl border-white scale-[1.02]"
                    : "bg-[#001a80]/80 hover:bg-[#001a80]/90 text-white backdrop-blur-xl border-white/30 hover:border-[#CCFF00]/60 shadow-lg"
                }`}
              >
                {/* Top Card Badge & Phase */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full font-mono text-[10px] sm:text-xs font-black tracking-wider uppercase shadow-sm ${
                      isSelected ? "bg-[#0038FF] text-white" : card.badgeColor
                    }`}>
                      {card.tag}
                    </span>

                    <span className={`font-mono text-[10px] uppercase tracking-wider font-bold ${
                      isSelected ? "text-black/60" : "text-white/70"
                    }`}>
                      {card.phase}
                    </span>
                  </div>

                  {/* Icon & Subtitle */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2.5 rounded-2xl flex items-center justify-center transition-colors ${
                      isSelected ? "bg-[#0038FF] text-[#CCFF00]" : "bg-white/25 text-[#CCFF00] group-hover:bg-[#CCFF00] group-hover:text-black"
                    }`}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" weight="bold" />
                    </div>
                    <div>
                      <span className={`block font-mono text-[11px] font-bold uppercase tracking-wider ${
                        isSelected ? "text-[#0038FF]" : "text-[#CCFF00]"
                      }`}>
                        {card.subtitle}
                      </span>
                      <h4 className={`text-lg sm:text-xl font-black leading-tight tracking-tight ${
                        isSelected ? "text-black" : "text-white"
                      }`}>
                        {card.title}
                      </h4>
                    </div>
                  </div>

                  {/* Body Description */}
                  <p className={`text-xs sm:text-sm leading-relaxed mt-3 ${
                    isSelected ? "text-black/80 font-medium" : "text-white/80 font-normal"
                  }`}>
                    {card.description}
                  </p>
                </div>

                {/* Bottom Metrics Pill & Status */}
                <div className={`mt-6 pt-4 border-t ${isSelected ? "border-black/15" : "border-white/20"}`}>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {card.metrics.map((m, mIdx) => (
                      <span
                        key={mIdx}
                        className={`text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-md font-bold ${
                          isSelected
                            ? "bg-black/5 text-black/90 border border-black/10"
                            : "bg-white/20 text-white/90 border border-white/25"
                        }`}
                      >
                        {m}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-wider">
                    <span className={isSelected ? "text-[#0038FF]" : "text-[#CCFF00]"}>
                      ● {card.status}
                    </span>
                    <span className={`inline-flex items-center gap-1 ${
                      isSelected ? "text-black/60" : "text-white/60"
                    }`}>
                      {card.highlight}
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Bar: Carousel Pagination Dots & Countdown Note */}
        <div className="relative z-10 px-6 sm:px-10 md:px-12 py-4 sm:py-5 bg-black/25 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
          {/* Direct Slide Jump Pills */}
          <div className="flex items-center gap-2">
            {CAROUSEL_CARDS.map((c, i) => (
              <button
                key={c.id}
                onClick={() => scrollToIndex(i)}
                aria-label={`Jump to announcement ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === i
                    ? "w-8 h-2.5 bg-[#CCFF00]"
                    : "w-2.5 h-2.5 bg-white/40 hover:bg-white/80"
                }`}
              />
            ))}
          </div>

          {/* Event Countdown / Official Transmission Notice */}
          <div className="flex items-center gap-2 text-xs font-mono text-white/90 font-bold">
            <CalendarBlank className="w-4 h-4 text-[#CCFF00]" />
            <span>
              {isPt
                ? "DIVULGAÇÃO OFICIAL: PRÓXIMOS DIAS NO HUB DA EXVORN"
                : "OFFICIAL RELEASE: COMING SOON ON EXVORN HUB"}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BlogEventCarousel;
