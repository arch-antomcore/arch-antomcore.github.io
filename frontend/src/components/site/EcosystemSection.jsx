import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "@phosphor-icons/react";
import { Container, Section, SectionHeader, Reveal } from "@/components/site/primitives";
import { SpotlightCard } from "@/components/site/interactions";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * EcosystemSection - Showcases the 3 ventures of Exvorn startup:
 * 1. AetherCore (Flagship Local AI)
 * 2. MonitorSmith (Hardware & System Telemetry)
 * 3. Component Atlas (Universal Web UI Component Catalog)
 */
const EcosystemSection = () => {
  const { language } = useTranslation();
  const isPt = language === "pt";

  const products = [
    {
      id: "aethercore",
      name: "AetherCore",
      badge: isPt ? "Carro-Chefe · IA Local" : "Flagship · Local AI",
      badgeColor: "bg-[#A34A33]/10 text-[#A34A33] border-[#A34A33]/20",
      status: isPt ? "🟢 Ativo · v0.6.0" : "🟢 Live · v0.6.0",
      logo: "/assets/ecosystem/aethercore.png",
      logoAlt: "AetherCore Favicon",
      logoContainer: "border-[#211d18]/10 bg-white p-1.5",
      headline: isPt ? "Agentes Autônomos de IA Local-First" : "Autonomous Local-First Cognitive AI",
      desc: isPt
        ? "Plataforma de inteligência artificial executada 100% no seu hardware com motor nativo em Rust, auditoria criptográfica e governança estrita."
        : "Autonomous cognitive AI engine running 100% on local hardware with native Rust performance, cryptographic audit logs, and human-in-the-loop control.",
      tags: ["Rust / Axum", "Local LLMs", "Privacidade 100%"],
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
      logo: "/assets/ecosystem/monitorsmith-centered.png",
      logoAlt: "MonitorSmith Logo",
      logoContainer: "border-cyan-500/20 bg-zinc-950 p-1.5",
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
      badge: isPt ? "Frontend & UI Discovery" : "Frontend & UI Discovery",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      status: isPt ? "🟡 Novo · Domínio em Breve" : "🟡 New · Custom Domain Soon",
      logo: "/assets/ecosystem/component-atlas-x.svg",
      logoAlt: "Component Atlas Logo",
      logoContainer: "border-red-500/20 bg-white p-1.5",
      headline: isPt ? "Catálogo Universal de Componentes UI" : "Universal Web UI Components Discovery",
      desc: isPt
        ? "Indexador visual de componentes independentes (Aceternity, Kokonut UI, 21st, shadcn, Magic UI) com busca semântica e comparador lado a lado."
        : "Unified visual discovery catalog for modern web UI libraries with semantic intent search, theme testing, and side-by-side comparison.",
      tags: ["React / Tailwind", "Multi-Source Catalog", "Busca Semântica"],
      cta: {
        label: isPt ? "Domínio Próprio em Breve" : "Custom Domain Coming Soon",
        isExternal: false,
        active: false,
      },
    },
  ];

  return (
    <Section id="ecosystem" className="liquid-divider">
      <Container>
        <SectionHeader
          kicker={isPt ? "Ecossistema Exvorn" : "Exvorn Ecosystem"}
          title={isPt ? "Nossos Três Projetos" : "Our Three Ventures"}
          desc={
            isPt
              ? "A Exvorn é a startup de engenharia por trás do AetherCore, MonitorSmith e Component Atlas. Conheça as soluções que compõem nosso portfólio."
              : "Exvorn is the engineering startup behind AetherCore, MonitorSmith, and Component Atlas. Explore the products powering our unified ecosystem."
          }
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1}>
              <SpotlightCard
                as="article"
                className="flex h-full flex-col justify-between rounded-[32px] bg-[#fbf9f2] border border-[#211d18]/10 p-8 hover:border-[#211d18]/30 hover:shadow-xl transition-all duration-500"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <span className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border ${p.badgeColor}`}>
                      {p.badge}
                    </span>
                    <span className="text-[11px] font-mono text-[#211d18]/50">
                      {p.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5 mb-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border overflow-hidden ${p.logoContainer}`}>
                      <img
                        src={p.logo}
                        alt={p.logoAlt}
                        className="w-full h-full object-contain"
                        loading="eager"
                      />
                    </div>
                    <div>
                      <h3 className="aether-font-display font-extrabold uppercase text-xl text-[#211d18]">
                        {p.name}
                      </h3>
                      <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#A34A33] font-semibold">
                        {p.headline}
                      </h4>
                    </div>
                  </div>

                  <p className="mt-4 text-xs md:text-sm text-[#211d18]/65 leading-relaxed">
                    {p.desc}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-[#211d18]/50 px-2 py-0.5 rounded bg-[#211d18]/5 border border-[#211d18]/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#211d18]/10">
                  {p.cta.active && p.cta.isExternal ? (
                    <a
                      href={p.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-[#211d18] text-[#fbf9f2] text-xs uppercase tracking-[0.15em] font-semibold px-5 py-3 rounded-full hover:bg-[#A34A33] transition-all duration-300 shadow-md cursor-pointer"
                    >
                      {p.cta.label}
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : p.cta.active ? (
                    <Link
                      to={p.cta.to}
                      className="w-full flex items-center justify-center gap-2 bg-[#A34A33] text-[#fbf9f2] text-xs uppercase tracking-[0.15em] font-semibold px-5 py-3 rounded-full hover:bg-[#211d18] transition-all duration-300 shadow-md"
                    >
                      {p.cta.label}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <div className="w-full flex items-center justify-center gap-2 bg-[#211d18]/5 text-[#211d18]/40 border border-[#211d18]/10 text-xs font-mono uppercase tracking-wider px-5 py-3 rounded-full select-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      {p.cta.label}
                    </div>
                  )}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default EcosystemSection;
