import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Desktop, Compass, Brain, Cpu, ShieldCheck, Sparkle, SquaresFour, TreeStructure } from "@phosphor-icons/react";
import { Container, Section, SectionHeader, Kicker, Reveal } from "@/components/site/primitives";
import PageHero from "@/components/site/PageHero";
import CtaSection from "@/components/site/CtaSection";
import { SpotlightCard } from "@/components/site/interactions";
import SectionRail from "@/components/aether/SectionRail";
import { useTranslation } from "@/hooks/useTranslation";

const Ecossistema = () => {
  const { language } = useTranslation();
  const isPt = language === "pt";

  const railItems = isPt
    ? [
        { id: "eco-hero", label: "01 · Startup" },
        { id: "aethercore", label: "02 · AetherCore" },
        { id: "monitorsmith", label: "03 · MonitorSmith" },
        { id: "component-atlas", label: "04 · Component Atlas" },
        { id: "sinergia", label: "05 · Sinergia" },
        { id: "cta", label: "06 · Contato" },
      ]
    : [
        { id: "eco-hero", label: "01 · Startup" },
        { id: "aethercore", label: "02 · AetherCore" },
        { id: "monitorsmith", label: "03 · MonitorSmith" },
        { id: "component-atlas", label: "04 · Component Atlas" },
        { id: "sinergia", label: "05 · Synergy" },
        { id: "cta", label: "06 · Contact" },
      ];

  const projects = [
    {
      id: "aethercore",
      name: "AetherCore",
      number: "01",
      badge: isPt ? "Plataforma Principal (Flagship)" : "Flagship Platform",
      badgeColor: "bg-[#A34A33]/20 text-[#A34A33] border-[#A34A33]/30",
      status: isPt ? "🟢 Ativo · v0.6.0 · Roda neste site" : "🟢 Live · v0.6.0 · Powers this site",
      icon: Brain,
      headline: isPt ? "Agentes Autônomos de IA Local-First" : "Autonomous Local-First Cognitive AI",
      desc: isPt
        ? "O principal produto da startup. Um sistema nervoso de inteligência artificial executado 100% na máquina local (Rust + Axum + Tokio). O AetherCore lê arquivos, executa códigos e manipula planilhas com governança estrita e aprovação humana em tempo real."
        : "The startup's flagship product. An autonomous cognitive AI platform running 100% locally on user hardware (Rust + Axum + Tokio). Executes code, spreadsheets, and tasks with strict governance and human-in-the-loop controls.",
      highlights: isPt
        ? [
            "Motor nativo em Rust compilado para máxima performance e baixo consumo de VRAM.",
            "Trilha de auditoria criptográfica em SQLite com aprovação humana obrigatória.",
            "Privacidade absoluta: zero vazamento de dados confidenciais para nuvens públicas.",
          ]
        : [
            "Native Rust kernel compiled for low VRAM consumption and high throughput.",
            "Cryptographic SQLite audit logs with mandatory human-in-the-loop verification.",
            "Absolute privacy: zero enterprise data leakage to public cloud APIs.",
          ],
      techStack: ["Rust", "Tokio", "Axum", "SQLite", "Local LLMs", "React"],
      cta: {
        label: isPt ? "Explorar AetherCore" : "Explore AetherCore",
        to: "/produto",
        isExternal: false,
      },
    },
    {
      id: "monitorsmith",
      name: "MonitorSmith",
      number: "02",
      badge: isPt ? "Telemetria & Hardware" : "Telemetry & Hardware",
      badgeColor: "bg-cyan-500/10 text-cyan-500 border-cyan-500/30",
      status: isPt ? "🟢 Produção · Web App Disponível" : "🟢 Production · Web App Live",
      icon: Desktop,
      headline: isPt ? "Telemetria e Inteligência de Hardware em Tempo Real" : "Real-Time Hardware & System Telemetry Intelligence",
      desc: isPt
        ? "Plataforma de alta precisão dedicada ao monitoramento profundo de recursos de hardware, CPU, GPU, consumo térmico e diagnósticos visuais de sistemas para infraestruturas e desenvolvedores exigentes."
        : "High-precision platform dedicated to in-depth telemetry, CPU/GPU hardware tracking, thermal metrics, and visual performance diagnostics for mission-critical infrastructure.",
      highlights: isPt
        ? [
            "Coleta contínua de métricas de telemetria com latência ultra-baixa.",
            "Dashboard interativo com visualização gráfica de métricas de hardware.",
            "Projetado para monitorar workloads intensos de inferência de IA e renderização.",
          ]
        : [
            "Continuous telemetry collection with ultra-low measurement overhead.",
            "Interactive dashboard with visual graphs of system and hardware load.",
            "Engineered to monitor intensive AI inference and graphics workloads.",
          ],
      techStack: ["Web Telemetry", "System Profiling", "Hardware Diagnostics", "React"],
      cta: {
        label: isPt ? "Acessar MonitorSmith ↗" : "Launch MonitorSmith ↗",
        href: "https://monitorsmith.app/",
        isExternal: true,
      },
    },
    {
      id: "component-atlas",
      name: "Component Atlas",
      number: "03",
      badge: isPt ? "Frontend & UI Discovery" : "Frontend & UI Discovery",
      badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/30",
      status: isPt ? "🟡 Novo Lançamento · Domínio em Breve" : "🟡 New Launch · Custom Domain Soon",
      icon: Compass,
      headline: isPt ? "Camada Universal de Descoberta de Componentes UI" : "Universal Discovery Layer for Web UI Components",
      desc: isPt
        ? "Um catálogo visual unificado que indexa as melhores bibliotecas independentes de componentes web (Aceternity, Kokonut UI, 21st, shadcn/ui, Magic UI). Permite pesquisar por intenção, comparar dependências lado a lado e testar em tela cheia sem abrir dezenas de abas."
        : "A unified visual catalog that indexes modern independent UI component libraries (Aceternity, Kokonut, 21st, shadcn/ui, Magic UI). Enables intent-based search, side-by-side comparison, and fullscreen testing in one place.",
      highlights: isPt
        ? [
            "Busca semântica expandida por sinônimos (ex: login, CTA, dashboards).",
            "Comparador técnico lado a lado (frameworks, dependências e licenças).",
            "Estágio interativo com alternador de temas e preview em tela cheia.",
          ]
        : [
            "Semantic intent-based search with synonym expansion (login, SaaS, CTA).",
            "Side-by-side technical comparison drawer for dependencies and licenses.",
            "Isolated interactive preview stage with theme switches and fullscreen modal.",
          ],
      techStack: ["React", "Tailwind CSS", "Search Engine", "Multi-Source Catalog"],
      cta: {
        label: isPt ? "Component Atlas (Em breve)" : "Component Atlas (Coming Soon)",
        href: "#",
        isExternal: false,
        disabled: true,
      },
    },
  ];

  return (
    <div data-testid="ecossistema-page">
      <SectionRail items={railItems} />

      <div id="eco-hero">
        <PageHero
          kicker={isPt ? "Startup & Portfólio de Projetos" : "Startup & Project Portfolio"}
          lines={isPt ? ["O Ecossistema", "de Projetos", "da Exvorn."] : ["The Exvorn", "Project", "Ecosystem."]}
          lead={
            isPt
              ? "A Exvorn é a startup de engenharia por trás do AetherCore, MonitorSmith e Component Atlas. Como o AetherCore é o projeto carro-chefe de IA local-first, o domínio principal exvorn.tech o apresenta diretamente, integrando todos os nossos produtos."
              : "Exvorn is the engineering startup behind AetherCore, MonitorSmith, and Component Atlas. Since AetherCore is our flagship local-first AI platform, exvorn.tech showcases it directly while powering our connected product ecosystem."
          }
          ghostWord={isPt ? "Ecosystem" : "Ecossistema"}
          primary={{
            label: isPt ? "Explorar AetherCore" : "Explore AetherCore",
            to: "/produto",
          }}
          secondary={{
            label: isPt ? "Acessar MonitorSmith ↗" : "Open MonitorSmith ↗",
            href: "https://monitorsmith.app/",
            isExternal: true,
          }}
        />
      </div>

      {/* Projects Deep Dive */}
      {projects.map((p) => {
        const Icon = p.icon;
        return (
          <Section key={p.id} id={p.id} className="liquid-divider">
            <Container>
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-sm uppercase tracking-[0.3em] text-[#A34A33] font-bold">
                  // {p.number}
                </span>
                <span className={`text-[11px] font-mono uppercase tracking-widest px-3 py-1 rounded-full border ${p.badgeColor}`}>
                  {p.badge}
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  {p.status}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-7">
                  <h2 className="aether-font-display font-extrabold uppercase text-3xl md:text-5xl tracking-tight text-[#211d18] leading-[1.05]">
                    {p.name}
                  </h2>
                  <p className="mt-3 text-base md:text-lg font-mono text-[#A34A33] uppercase tracking-wider font-semibold">
                    {p.headline}
                  </p>
                  <p className="mt-6 text-base md:text-lg text-zinc-600 leading-relaxed">
                    {p.desc}
                  </p>

                  <div className="mt-8 space-y-3">
                    {p.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm text-zinc-700">
                        <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#A34A33]/15 text-[#A34A33]">
                          ✓
                        </span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    {p.cta.isExternal ? (
                      <a
                        href={p.cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#211d18] hover:bg-[#A34A33] text-[#fbf9f2] text-xs uppercase tracking-[0.15em] font-semibold px-7 py-4 rounded-full transition-all duration-300 shadow-md shadow-[#211d18]/20"
                      >
                        {p.cta.label}
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    ) : p.cta.disabled ? (
                      <div className="inline-flex items-center gap-2 bg-zinc-200 text-zinc-600 border border-zinc-300 text-xs font-mono uppercase tracking-wider px-6 py-4 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                        {p.cta.label}
                      </div>
                    ) : (
                      <Link
                        to={p.cta.to}
                        className="inline-flex items-center gap-2 bg-[#A34A33] hover:bg-[#211d18] text-[#fbf9f2] text-xs uppercase tracking-[0.15em] font-semibold px-7 py-4 rounded-full transition-all duration-300 shadow-md shadow-[#A34A33]/25"
                      >
                        {p.cta.label}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <SpotlightCard className="rounded-[28px] bg-white/70 border border-[#211d18]/10 p-8 shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-12 w-12 rounded-2xl bg-[#A34A33]/10 text-[#A34A33] flex items-center justify-center">
                        <Icon className="h-6 w-6" strokeWidth={1.75} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-[#211d18]">{p.name}</h4>
                        <span className="text-xs font-mono text-zinc-500">{p.techStack.join(" · ")}</span>
                      </div>
                    </div>

                    <h5 className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-3 font-semibold">
                      {isPt ? "Stack Tecnológica" : "Core Tech Stack"}
                    </h5>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {p.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-zinc-100 border border-zinc-300/80 px-3 py-1 text-xs font-mono text-zinc-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="p-4 rounded-2xl bg-[#f4f1e8] border border-[#211d18]/10 text-xs text-zinc-600 leading-relaxed">
                      <strong className="text-[#211d18] block mb-1 font-mono uppercase tracking-wider">
                        {isPt ? "Papel no Ecossistema:" : "Ecosystem Role:"}
                      </strong>
                      {p.id === "aethercore" && (isPt ? "Motor de IA autônoma e orquestração de fluxos seguros." : "Core local cognitive intelligence and agent execution.")}
                      {p.id === "monitorsmith" && (isPt ? "Telemetria de performance de hardware e monitoramento de carga." : "Hardware telemetry and infrastructure health intelligence.")}
                      {p.id === "component-atlas" && (isPt ? "Design system, catálogos e interface de ponta para aplicações modernas." : "Universal design systems catalog and frontend UI components discovery.")}
                    </div>
                  </SpotlightCard>
                </div>
              </div>
            </Container>
          </Section>
        );
      })}

      {/* Synergy Section */}
      <Section id="sinergia" className="liquid-divider">
        <Container>
          <SectionHeader
            kicker={isPt ? "Visão Integrada" : "Integrated Vision"}
            title={isPt ? "A Engenharia Unificada da Exvorn" : "Exvorn Unified Engineering"}
            desc={
              isPt
                ? "Construímos softwares que combinam inteligência computacional (AetherCore), telemetria em tempo real (MonitorSmith) e padrões de interface de classe mundial (Component Atlas)."
                : "We engineer software combining deep cognitive intelligence (AetherCore), real-time telemetry (MonitorSmith), and world-class frontend design systems (Component Atlas)."
            }
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Reveal delay={0}>
              <SpotlightCard className="rounded-[28px] bg-white/70 border border-[#211d18]/10 p-8 h-full flex flex-col justify-between">
                <div>
                  <Brain className="h-8 w-8 text-[#A34A33] mb-4" strokeWidth={1.5} />
                  <h3 className="text-xl font-bold text-[#211d18] mb-2">{isPt ? "Inteligência Autônoma" : "Autonomous Intelligence"}</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {isPt
                      ? "O AetherCore traz agentes cognitivos que pensam e agem localmente na máquina, sem dependência de nuvens públicas."
                      : "AetherCore delivers local-first cognitive agents executing tasks with absolute data privacy."}
                  </p>
                </div>
              </SpotlightCard>
            </Reveal>

            <Reveal delay={0.1}>
              <SpotlightCard className="rounded-[28px] bg-white/70 border border-[#211d18]/10 p-8 h-full flex flex-col justify-between">
                <div>
                  <Desktop className="h-8 w-8 text-cyan-600 mb-4" strokeWidth={1.5} />
                  <h3 className="text-xl font-bold text-[#211d18] mb-2">{isPt ? "Telemetria de Precisão" : "Precision Telemetry"}</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {isPt
                      ? "O MonitorSmith rastreia o pulso do hardware e da infraestrutura, garantindo que cargas pesadas rodem com estabilidade."
                      : "MonitorSmith measures system hardware and workloads with real-time analytics."}
                  </p>
                </div>
              </SpotlightCard>
            </Reveal>

            <Reveal delay={0.2}>
              <SpotlightCard className="rounded-[28px] bg-white/70 border border-[#211d18]/10 p-8 h-full flex flex-col justify-between">
                <div>
                  <Compass className="h-8 w-8 text-amber-600 mb-4" strokeWidth={1.5} />
                  <h3 className="text-xl font-bold text-[#211d18] mb-2">{isPt ? "Experiência de UI Universal" : "Universal UI Experience"}</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {isPt
                      ? "O Component Atlas conecta a vanguarda do ecossistema de componentes web para criar produtos com estética cinematográfica."
                      : "Component Atlas unifies the best web UI libraries for creating cinematic software."}
                  </p>
                </div>
              </SpotlightCard>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaSection />
    </div>
  );
};

export default Ecossistema;
