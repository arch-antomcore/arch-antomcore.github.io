import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Desktop, Compass, Brain } from "@phosphor-icons/react";
import { Container, Section, SectionHeader, Reveal } from "@/components/site/primitives";
import { SpotlightCard } from "@/components/site/interactions";
import { useTranslation } from "@/hooks/useTranslation";

export const EcosystemSection = () => {
  const { language } = useTranslation();
  const isPt = language === "pt";

  const products = [
    {
      id: "aethercore",
      name: "AetherCore",
      badge: isPt ? "Plataforma Principal" : "Flagship Platform",
      badgeColor: "bg-[#A34A33]/20 text-[#A34A33] border-[#A34A33]/30",
      status: isPt ? "🟢 Ativo · v0.6.0" : "🟢 Live · v0.6.0",
      icon: Brain,
      headline: isPt ? "Agentes Autônomos Cognitivos" : "Autonomous Cognitive Agents",
      desc: isPt
        ? "Sistema nervoso de IA local-first para empresas e desenvolvedores. Processa tarefas, planilhas e códigos sem vazar dados."
        : "Local-first cognitive AI nervous system for teams. Executes tasks, spreadsheets, and code with zero data leaks.",
      tags: ["Local-first", "Rust + Axum", "Zero Leakage"],
      cta: {
        label: isPt ? "Explorar AetherCore" : "Explore AetherCore",
        to: "/produto",
        isExternal: false,
        active: true,
      },
    },
    {
      id: "monitorsmith",
      name: "MonitorSmith",
      badge: isPt ? "Telemetria & Hardware" : "Telemetry & Hardware",
      badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      status: isPt ? "🟢 Online · Web App" : "🟢 Live · Web App",
      icon: Desktop,
      headline: isPt ? "Monitoramento & Inteligência de Sistema" : "Real-Time System & Hardware Telemetry",
      desc: isPt
        ? "Plataforma de alta precisão para telemetria em tempo real, monitoramento de performance de hardware e diagnósticos visuais."
        : "High-precision platform for real-time telemetry, hardware performance monitoring, and visual diagnostics.",
      tags: ["Live Telemetry", "Hardware Health", "Diagnostics"],
      cta: {
        label: isPt ? "Acessar MonitorSmith ↗" : "Launch MonitorSmith ↗",
        href: "https://monitorsmith.app/",
        isExternal: true,
        active: true,
      },
    },
    {
      id: "component-atlas",
      name: "Component Atlas",
      badge: isPt ? "Novo Projeto" : "New Project",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      status: isPt ? "🟡 Domínio em Breve" : "🟡 Custom Domain Soon",
      icon: Compass,
      headline: isPt ? "Descoberta Universal de Componentes UI" : "Universal Web UI Component Atlas",
      desc: isPt
        ? "Catálogo e indexador visual multi-bibliotecas (Aceternity, Kokonut, shadcn, Magic UI). Pesquise, compare e filtre componentes de ponta a ponta."
        : "Multi-library visual catalog and discovery layer for web UI components. Search, compare, and filter components across independent ecosystems.",
      tags: ["UI Discovery", "Multi-Source", "Interactive Stage"],
      cta: {
        label: isPt ? "Component Atlas (Em breve)" : "Component Atlas (Coming Soon)",
        href: "#",
        isExternal: false,
        active: false,
      },
    },
  ];

  return (
    <Section id="ecosystem" className="liquid-divider relative overflow-hidden">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeader
            kicker={isPt ? "Ecossistema da Startup" : "Startup Ecosystem"}
            title={isPt ? "Nossos Projetos & Produtos" : "Our Products & Projects"}
            desc={
              isPt
                ? "A Exvorn desenvolve tecnologia de ponta em inteligência artificial, telemetria de infraestrutura e engenharia de software."
                : "Exvorn engineers cutting-edge solutions across local AI intelligence, system telemetry, and software platforms."
            }
          />
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/70 border border-[#211d18]/10 text-xs font-mono uppercase tracking-widest text-[#211d18] shrink-0 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#A34A33] animate-pulse" />
            {isPt ? "3 Projetos Integrados" : "3 Integrated Projects"}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.id} delay={i * 0.08}>
                <SpotlightCard className="identity-reveal-card flex h-full flex-col justify-between overflow-hidden rounded-[28px] liquid-glass p-7 md:p-8 transition-all duration-300 hover:border-white/25 hover:shadow-2xl group">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-6">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white shadow-inner p-3 transition-transform duration-300 group-hover:scale-105">
                        <Icon className="h-6 w-6 text-[#fbf9f2]" strokeWidth={1.5} />
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <span className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${p.badgeColor}`}>
                          {p.badge}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400">
                          {p.status}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
                      {p.name}
                    </h3>
                    <p className="text-xs font-mono text-[#A34A33] uppercase tracking-wider mb-4 font-semibold">
                      {p.headline}
                    </p>

                    <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                      {p.desc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-8">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white/[0.04] border border-white/10 px-2.5 py-1 text-[10px] font-mono text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    {p.cta.isExternal ? (
                      <a
                        href={p.cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`ecosystem-cta-${p.id}`}
                        className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white text-white hover:text-[#211d18] border border-white/15 px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300 shadow-sm"
                      >
                        {p.cta.label}
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </a>
                    ) : p.cta.active ? (
                      <Link
                        to={p.cta.to}
                        data-testid={`ecosystem-cta-${p.id}`}
                        className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#A34A33] hover:bg-[#211d18] text-[#fbf9f2] px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300 shadow-md shadow-[#A34A33]/20"
                      >
                        {p.cta.label}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                      </Link>
                    ) : (
                      <div
                        data-testid={`ecosystem-cta-${p.id}`}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/[0.04] text-zinc-400 border border-white/10 px-4 py-3 text-xs font-mono tracking-wider cursor-default"
                        title={isPt ? "Domínio próprio em configuração" : "Custom domain being configured"}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 animate-pulse" />
                        {p.cta.label}
                      </div>
                    )}
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

export default EcosystemSection;
