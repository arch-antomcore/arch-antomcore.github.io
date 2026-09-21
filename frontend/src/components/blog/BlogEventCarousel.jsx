import React, { useRef, useState, useEffect } from "react";
import { 
  CaretLeft, 
  CaretRight, 
  Broadcast, 
  Cpu, 
  Code, 
  Sparkle, 
  ArrowUpRight, 
  ShieldCheck, 
  CalendarBlank,
  Rocket
} from "@phosphor-icons/react";
import { useTranslation } from "../../hooks/useTranslation";

export const getNextCarouselIndex = (currentIndex, direction, cardCount) => {
  if (!cardCount) return 0;

  const nextIndex = direction === "left" ? currentIndex - 1 : currentIndex + 1;
  return Math.min(cardCount - 1, Math.max(0, nextIndex));
};

const NAVIGATION_TIMEOUT = 1200;

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
      <span className="text-[8px] md:text-[9px] font-black tracking-wider uppercase">STATUS</span>
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
  const navigationTimerRef = useRef(null);
  const navigationFrameRef = useRef(null);

  const CAROUSEL_CARDS = [
    {
      id: "runtime-kernel-governance",
      icon: Cpu,
      phase: isPt ? "FASE 01 • NÚCLEO DE EXECUÇÃO" : "PHASE 01 • EXECUTION CORE",
      title: isPt ? "Aether Runtime Kernel" : "Aether Runtime Kernel",
      subtitle: isPt ? "A autoridade operacional em Rust" : "The Rust operational authority",
      description: isPt
        ? "O Kernel recebe a intenção, roteia o modelo, valida ferramentas e mantém sessões, permissões e auditoria no fluxo local. Modelo propõe; Kernel valida; Kernel executa."
        : "The Kernel receives intent, routes the model, validates tools, and keeps sessions, permissions, and auditing in the local flow. The model proposes; the Kernel validates and executes.",
      metrics: isPt ? ["Rust", "Permissões", "Trilha de auditoria"] : ["Rust", "Permissions", "Audit trail"],
      tag: isPt ? "NÚCLEO" : "CORE",
      highlight: isPt ? "Arquitetura verificável" : "Verifiable architecture",
      status: isPt ? "IMPLEMENTADO" : "IMPLEMENTED",
      badgeColor: "bg-[#CCFF00] text-black",
    },
    {
      id: "local-model-routing",
      icon: Broadcast,
      phase: isPt ? "FASE 02 • MODELOS" : "PHASE 02 • MODELS",
      title: isPt ? "Modelos no controle do usuário" : "Models under your control",
      subtitle: isPt ? "Ollama, Qwen, Granite e GLM" : "Ollama, Qwen, Granite, and GLM",
      description: isPt
        ? "O caminho local validado usa Qwen via Ollama sob demanda. Granite pode atuar como orquestrador estruturado; GLM e uplinks compatíveis entram quando configurados, sem fallback silencioso para a nuvem."
        : "The validated local path uses Qwen through Ollama on demand. Granite can act as a structured orchestrator; GLM and compatible uplinks are used only when configured, with no silent cloud fallback.",
      metrics: isPt ? ["Qwen + Ollama", "Granite", "Uplinks explícitos"] : ["Qwen + Ollama", "Granite", "Explicit uplinks"],
      tag: isPt ? "LOCAL-FIRST" : "LOCAL-FIRST",
      highlight: isPt ? "Roteamento explícito" : "Explicit routing",
      status: isPt ? "CONFIGURAÇÃO VISÍVEL" : "VISIBLE CONFIGURATION",
      badgeColor: "bg-white text-black",
    },
    {
      id: "governed-agents",
      icon: ShieldCheck,
      phase: isPt ? "FASE 03 • GOVERNANÇA" : "PHASE 03 • GOVERNANCE",
      title: isPt ? "Autonomia com freios claros" : "Autonomy with clear brakes",
      subtitle: isPt ? "Workspace Scope, checkpoints e ARL" : "Workspace Scope, checkpoints, and ARL",
      description: isPt
        ? "Cada leitura, escrita ou ferramenta passa por escopo e política. Ações sensíveis pedem aprovação humana e deixam registro local para revisão."
        : "Every read, write, or tool call goes through scope and policy. Sensitive actions require human approval and leave a local record for review.",
      metrics: isPt ? ["Escopo local", "Checkpoints", "Trilha ARL"] : ["Local scope", "Checkpoints", "ARL audit trail"],
      tag: isPt ? "SEGURANÇA" : "SECURITY",
      highlight: isPt ? "Revisão humana" : "Human review",
      status: isPt ? "APROVAÇÃO HUMANA" : "HUMAN APPROVAL",
      badgeColor: "bg-[#CCFF00] text-black",
    },
    {
      id: "ecosystem-surfaces",
      icon: Sparkle,
      phase: isPt ? "FASE 04 • ECOSSISTEMA" : "PHASE 04 • ECOSYSTEM",
      title: isPt ? "Quintessence e Telegram" : "Quintessence and Telegram",
      subtitle: isPt ? "Duas superfícies, o mesmo Kernel" : "Two surfaces, the same Kernel",
      description: isPt
        ? "A Quintessence conecta o Aether Chat ao workspace por uma ponte IPC local. O gateway Telegram oferece menu, status e seleção de modelo com allowlist; o chat Gemini permanece sem ferramentas locais."
        : "Quintessence connects Aether Chat to the workspace through a local IPC bridge. The Telegram gateway provides menus, status, and model selection with an allowlist; Gemini chat remains free of local tools.",
      metrics: isPt ? ["JSON-RPC local", "Open VSX", "Telegram allowlist"] : ["Local JSON-RPC", "Open VSX", "Telegram allowlist"],
      tag: isPt ? "INTEGRAÇÕES" : "INTEGRATIONS",
      highlight: isPt ? "Superfícies controladas" : "Controlled surfaces",
      status: isPt ? "EM EVOLUÇÃO" : "IN PROGRESS",
      badgeColor: "bg-cyan-300 text-black",
    },
    {
      id: "open-source-community",
      icon: Code,
      phase: isPt ? "FASE 05 • ABERTURA PÚBLICA" : "PHASE 05 • PUBLIC OPENING",
      title: isPt ? "Código aberto, com governança" : "Open source, with governance",
      subtitle: isPt ? "O próximo passo do AetherCore" : "AetherCore's next step",
      description: isPt
        ? "Estamos preparando a abertura pública do código no GitHub, com licença, avisos, SECURITY e guia de contribuição. A comunidade poderá auditar, sugerir e enviar melhorias quando a base estiver publicada."
        : "We are preparing the public GitHub release with licensing, notices, SECURITY, and contribution guidance. The community will be able to audit, suggest, and submit improvements once the code is published.",
      metrics: isPt ? ["GitHub público", "Licença e avisos", "CONTRIBUTING"] : ["Public GitHub", "License and notices", "CONTRIBUTING"],
      tag: isPt ? "OPEN SOURCE" : "OPEN SOURCE",
      highlight: isPt ? "Plano de abertura" : "Opening plan",
      status: isPt ? "EM PREPARAÇÃO" : "IN PREPARATION",
      badgeColor: "bg-[#CCFF00] text-black",
    },
  ];

  // The ref is the source of truth while a smooth scroll is running. React state
  // can lag behind several rapid clicks, while the ref is updated synchronously.
  const targetIndexRef = useRef(0);
  const navigationTargetRef = useRef(null);
  const settledIndexRef = useRef(null);

  const cancelNavigation = () => {
    if (navigationTimerRef.current) {
      window.clearTimeout(navigationTimerRef.current);
      navigationTimerRef.current = null;
    }
    if (navigationFrameRef.current) {
      window.cancelAnimationFrame(navigationFrameRef.current);
      navigationFrameRef.current = null;
    }
    navigationTargetRef.current = null;
  };

  const getCards = (container) =>
    Array.from(container.querySelectorAll(".event-carousel-card"));

  const getCardScrollLeft = (container, card) => {
    const styles = window.getComputedStyle(container);
    const paddingLeft = parseFloat(styles.paddingLeft) || 0;
    const borderLeft = container.clientLeft || 0;
    const maxScrollLeft = Math.max(0, container.scrollWidth - container.clientWidth);
    const target = card.offsetLeft - paddingLeft - borderLeft;
    return Math.min(maxScrollLeft, Math.max(0, target));
  };

  const finishNavigation = (idx) => {
    cancelNavigation();
    targetIndexRef.current = idx;
    // Multiple cards can share the track's maximum scrollLeft. Preserve the
    // requested card until a new user gesture starts instead of falling back
    // to an earlier card based only on physical position.
    settledIndexRef.current = idx;
    setActiveIndex(idx);
    checkScroll();
  };

  const waitForNavigation = (container, idx, targetScrollLeft) => {
    const startedAt = Date.now();

    const settle = () => {
      if (navigationTargetRef.current !== idx) return;
      const reachedTarget = Math.abs(container.scrollLeft - targetScrollLeft) <= 1;
      const timedOut = Date.now() - startedAt >= NAVIGATION_TIMEOUT;

      if (reachedTarget || timedOut) {
        finishNavigation(idx);
        return;
      }

      navigationFrameRef.current = window.requestAnimationFrame(settle);
    };

    navigationFrameRef.current = window.requestAnimationFrame(settle);
    navigationTimerRef.current = window.setTimeout(() => finishNavigation(idx), NAVIGATION_TIMEOUT + 100);
  };

  const checkScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const children = getCards(container);
    const atScrollEnd = Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 5;

    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(!atScrollEnd || targetIndexRef.current < children.length - 1);

    // During a programmatic scroll the requested card remains selected. The
    // settle loop below confirms the final position before releasing this lock.
    if (navigationTargetRef.current !== null) return;

    if (children.length === 0) return;

    const settledIndex = settledIndexRef.current;
    if (settledIndex !== null && children[settledIndex]) {
      const settledScrollLeft = getCardScrollLeft(container, children[settledIndex]);
      if (Math.abs(scrollLeft - settledScrollLeft) <= 1) {
        targetIndexRef.current = settledIndex;
        setActiveIndex((current) => (current === settledIndex ? current : settledIndex));
        return;
      }
      settledIndexRef.current = null;
    }

    const containerPaddingLeft = parseFloat(window.getComputedStyle(container).paddingLeft) || 0;
    let closestIdx = 0;
    let minDistance = Infinity;

    children.forEach((child, idx) => {
      const childLeft = child.offsetLeft - containerPaddingLeft;
      const distance = Math.abs(childLeft - scrollLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });

    if (targetIndexRef.current !== closestIdx) targetIndexRef.current = closestIdx;
    setActiveIndex((current) => (current === closestIdx ? current : closestIdx));
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      const initialFrame = window.requestAnimationFrame(checkScroll);
      const cancelFromUserScroll = () => {
        if (navigationTargetRef.current === null && settledIndexRef.current === null) return;
        cancelNavigation();
        settledIndexRef.current = null;
        checkScroll();
      };

      el.addEventListener("pointerdown", cancelFromUserScroll, { passive: true });
      el.addEventListener("touchstart", cancelFromUserScroll, { passive: true });
      el.addEventListener("wheel", cancelFromUserScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
      return () => {
        window.cancelAnimationFrame(initialFrame);
        el.removeEventListener("scroll", checkScroll);
        el.removeEventListener("pointerdown", cancelFromUserScroll);
        el.removeEventListener("touchstart", cancelFromUserScroll);
        el.removeEventListener("wheel", cancelFromUserScroll);
        window.removeEventListener("resize", checkScroll);
        cancelNavigation();
      };
    }
    // The listener must be rebound when the translated card layout changes;
    // `checkScroll` is intentionally kept from the current render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPt]);

  const scrollToIndex = (idx) => {
    const container = scrollRef.current;
    if (!container) return;
    const cards = getCards(container);
    if (!cards[idx]) return;

    cancelNavigation();
    targetIndexRef.current = idx;
    setActiveIndex(idx);
    navigationTargetRef.current = idx;

    const targetScrollLeft = getCardScrollLeft(container, cards[idx]);

    container.scrollTo({
      left: targetScrollLeft,
      behavior: "smooth",
    });

    waitForNavigation(container, idx, targetScrollLeft);
  };

  const scrollTo = (direction) => {
    const nextIdx = getNextCarouselIndex(
      targetIndexRef.current,
      direction,
      CAROUSEL_CARDS.length,
    );
    scrollToIndex(nextIdx);
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
                {isPt ? "ATUALIZAÇÃO DO PROJETO • MARCOS VERIFICADOS" : "PROJECT UPDATE • VERIFIED MILESTONES"}
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
                {isPt ? "#AETHERCORE EM EVOLUÇÃO" : "#AETHERCORE IN PROGRESS"}
              </h2>
              <h3 
                className="text-[clamp(2rem,5.5vw,3.8rem)] font-black leading-[0.9] tracking-tighter text-[#f7f4ec] uppercase m-0 p-0"
                style={{ 
                  fontFamily: '"Arial Black", Impact, sans-serif',
                  textShadow: '1px 1px 0 #001A99, 2px 2px 0 #001A99, 3px 3px 0 #001A99, 4px 4px 0 #001A99, 5px 5px 0 #001A99, 6px 6px 0 #001A99, 7px 7px 0 #001A99, 8px 8px 0 #001A99'
                }}
              >
                {isPt ? "CÓDIGO, CONTROLE E COMUNIDADE" : "CODE, CONTROL, AND COMMUNITY"}
              </h3>
            </div>

            <p className="mt-4 text-[#f7f4ec]/90 text-sm md:text-base font-medium max-w-2xl leading-relaxed">
              {isPt
                ? "Do runtime Rust ao plano de abertura open source: estes são os marcos implementados e os próximos passos que estamos preparando para o AetherCore."
                : "From the Rust runtime to the open-source opening plan: these are the milestones shipped and the next steps we are preparing for AetherCore."}
            </p>
          </div>

          {/* Rotating Circular Badge & Navigation Controls */}
          <div className="flex items-center gap-5 sm:gap-6 self-start md:self-end">
            <div className="hidden sm:block">
              <CircularEventBadge 
                text={isPt ? "AETHERCORE • CÓDIGO ABERTO EM PREPARAÇÃO • " : "AETHERCORE • OPEN SOURCE IN PREPARATION • "}
              />
            </div>

            {/* Next / Prev Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollTo("left")}
                disabled={!canScrollLeft}
                aria-label="Previous card"
                className={`p-3 md:p-3.5 rounded-full border border-white/30 text-[#f7f4ec] backdrop-blur-md transition-all duration-200 ${
                  canScrollLeft
                    ? "bg-white/20 hover:bg-[#CCFF00] hover:text-[#211d18] hover:border-[#211d18] cursor-pointer shadow-lg active:scale-95"
                    : "opacity-35 cursor-not-allowed bg-black/20"
                }`}
              >
                <CaretLeft className="w-5 h-5 md:w-6 md:h-6" weight="bold" />
              </button>

              <button
                type="button"
                onClick={() => scrollTo("right")}
                disabled={!canScrollRight}
                aria-label="Next card"
                className={`p-3 md:p-3.5 rounded-full border border-white/30 text-[#f7f4ec] backdrop-blur-md transition-all duration-200 ${
                  canScrollRight
                    ? "bg-white/20 hover:bg-[#CCFF00] hover:text-[#211d18] hover:border-[#211d18] cursor-pointer shadow-lg active:scale-95"
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
          className="relative z-10 flex gap-4 md:gap-6 overflow-x-auto px-6 sm:px-10 md:px-12 py-8 md:py-10 text-[#f7f4ec] [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {CAROUSEL_CARDS.map((card, idx) => {
            const Icon = card.icon;
            const isSelected = activeIndex === idx;

            return (
              <div
                key={card.id}
                onClick={() => scrollToIndex(idx)}
                className={`event-carousel-card flex-shrink-0 w-[290px] sm:w-[340px] md:w-[380px] rounded-[2rem] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer relative overflow-hidden group border ${
                  isSelected
                    ? "bg-[#f7f4ec] text-[#211d18] shadow-2xl border-white scale-[1.02]"
                    : "bg-[#001a80]/80 hover:bg-[#001a80]/90 text-[#f7f4ec] backdrop-blur-xl border-white/30 hover:border-[#CCFF00]/60 shadow-lg"
                }`}
              >
                {/* Top Card Badge & Phase */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full font-mono text-[10px] sm:text-xs font-black tracking-wider uppercase shadow-sm ${
                      isSelected ? "bg-[#0038FF] text-[#f7f4ec]" : card.badgeColor
                    }`}>
                      {card.tag}
                    </span>

                    <span className={`font-mono text-[10px] uppercase tracking-wider font-bold ${
                      isSelected ? "text-[#211d18]/65" : "text-[#f7f4ec]/80"
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
                      isSelected ? "text-[#211d18]" : "text-[#f7f4ec]"
                      }`}>
                        {card.title}
                      </h4>
                    </div>
                  </div>

                  {/* Body Description */}
                  <p className={`text-xs sm:text-sm leading-relaxed mt-3 ${
                    isSelected ? "text-[#211d18]/85 font-medium" : "text-[#f7f4ec]/90 font-normal"
                  }`}>
                    {card.description}
                  </p>
                </div>

                {/* Bottom Metrics Pill & Status */}
                <div className={`mt-6 pt-4 border-t ${isSelected ? "border-black/15" : "border-white/30"}`}>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {card.metrics.map((m, mIdx) => (
                      <span
                        key={mIdx}
                        className={`text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-md font-bold ${
                          isSelected
                            ? "bg-[#211d18]/5 text-[#211d18]/90 border border-[#211d18]/10"
                            : "bg-white/25 text-[#f7f4ec] border border-white/30"
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
                      isSelected ? "text-[#211d18]/70" : "text-[#f7f4ec]/85"
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

        {/* Bottom Bar: Carousel Pagination Dots & Project Status */}
        <div className="relative z-10 px-6 sm:px-10 md:px-12 py-4 sm:py-5 bg-black/25 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
          {/* Direct Slide Jump Pills */}
          <div className="flex items-center gap-2">
            {CAROUSEL_CARDS.map((c, i) => (
              <button
                key={c.id}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`Jump to announcement ${i + 1}`}
                aria-current={activeIndex === i ? "true" : undefined}
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === i
                    ? "w-8 h-2.5 bg-[#CCFF00]"
                    : "w-2.5 h-2.5 bg-white/40 hover:bg-white/80"
                }`}
              />
            ))}
          </div>

          {/* Project Status Notice */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#f7f4ec]/90 font-bold">
            <CalendarBlank className="w-4 h-4 text-[#CCFF00]" />
            <span>
              {isPt
                ? "STATUS DO PROJETO: ROADMAP E GOVERNANÇA EM CONSTRUÇÃO"
                : "PROJECT STATUS: ROADMAP AND GOVERNANCE IN PROGRESS"}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BlogEventCarousel;
