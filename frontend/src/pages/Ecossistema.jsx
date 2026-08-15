import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "@phosphor-icons/react";
import { Container, Section, SectionHeader, Reveal } from "@/components/site/primitives";
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
        { id: "eco-hero", label: "01 · Intro" },
        { id: "projetos", label: "02 · Projetos" },
        { id: "cta", label: "03 · Contato" },
      ]
    : [
        { id: "eco-hero", label: "01 · Intro" },
        { id: "projetos", label: "02 · Projects" },
        { id: "cta", label: "03 · Contact" },
      ];

  const products = [
    {
      id: "aethercore",
      name: "AetherCore",
      number: "01",
      badge: isPt ? "Flagship · IA Local" : "Flagship · Local AI",
      badgeStyle: "bg-[#A34A33]/15 text-[#A34A33] border-[#A34A33]/30",
      logo: "/assets/ecosystem/aethercore.png",
      logoAlt: "AetherCore Favicon",
      logoContainer: "border-[#211d18]/10 bg-white shadow-sm shadow-[#211d18]/5 p-2",
      logoClass: "w-full h-full object-contain",
      headline: isPt ? "Inteligência Autônoma Local-First" : "Autonomous Local-First Intelligence",
      desc: isPt
        ? "Plataforma cognitiva que executa agentes de IA com segurança e governança 100% no hardware local, sem envio de dados a nuvens de terceiros."
        : "Cognitive AI platform executing local-first autonomous agents with strict governance, zero cloud latency, and absolute privacy.",
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
      badge: isPt ? "Telemetria · Live" : "Telemetry · Live",
      badgeStyle: "bg-cyan-500/10 text-cyan-600 border-cyan-500/25",
      logo: "/assets/ecosystem/monitorsmith-centered.png",
      logoAlt: "MonitorSmith Logo",
      logoContainer: "border-cyan-500/20 bg-zinc-950 shadow-sm shadow-cyan-500/15 p-2",
      headline: isPt ? "Telemetria & Diagnósticos de Sistema" : "Real-Time System & Hardware Telemetry",
      desc: isPt
        ? "Web app dedicado ao monitoramento em tempo real de hardware, CPU, GPU, consumo térmico e diagnósticos visuais de infraestrutura."
        : "Dedicated web application for real-time hardware telemetry, CPU/GPU diagnostics, thermals, and system profiling.",
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
      badge: isPt ? "UI Catalog · Em Breve" : "UI Catalog · Soon",
      badgeStyle: "bg-amber-500/10 text-amber-600 border-amber-500/25",
      logo: "/assets/ecosystem/component-atlas-x.svg",
      logoAlt: "Component Atlas Logo",
      logoContainer: "border-red-500/20 bg-white shadow-sm shadow-red-500/5 p-2",
      logoClass: "w-full h-full object-contain",
      headline: isPt ? "Catálogo Universal de Componentes UI" : "Universal Web UI Components Discovery",
      desc: isPt
        ? "Indexador visual que unifica as melhores bibliotecas independentes de componentes web (Aceternity, Kokonut, 21st, shadcn, Magic UI)."
        : "Unified visual discovery catalog indexing modern independent web UI libraries into an interactive search and comparison stage.",
      cta: {
        label: isPt ? "Domínio Próprio em Breve" : "Custom Domain Coming Soon",
        disabled: true,
      },
    },
  ];

  return (
    <div data-testid="ecossistema-page">
      <SectionRail items={railItems} />

      <div id="eco-hero">
        <PageHero
          kicker={isPt ? "Startup & Portfólio" : "Startup & Portfolio"}
          lines={isPt ? ["O Ecossistema", "de Projetos", "da Exvorn."] : ["The Exvorn", "Project", "Ecosystem."]}
          lead={
            isPt
              ? "A Exvorn é a startup de engenharia por trás do AetherCore, MonitorSmith e Component Atlas. Conheça nossos produtos e a tecnologia que impulsiona cada iniciativa."
              : "Exvorn is the engineering startup behind AetherCore, MonitorSmith, and Component Atlas. Explore our products and the unified technology powering each initiative."
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

      {/* Clean 3-Card Portfolio Section with Perfect Centered Logos */}
      <Section id="projetos" className="liquid-divider">
        <Container>
          <SectionHeader
            kicker={isPt ? "Portfólio de Produtos" : "Product Portfolio"}
            title={isPt ? "Os Três Pilares da Exvorn" : "The Three Pillars of Exvorn"}
            desc={
              isPt
                ? "Cada projeto resolve um desafio fundamental: IA cognitiva local (AetherCore), telemetria de hardware (MonitorSmith) e padrões de interface moderna (Component Atlas)."
                : "Each project addresses a foundational pillar: local cognitive AI (AetherCore), system telemetry (MonitorSmith), and modern UI patterns (Component Atlas)."
            }
          />

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {products.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <SpotlightCard className="rounded-[32px] bg-white/80 border border-[#211d18]/10 p-8 md:p-10 h-full flex flex-col justify-between shadow-lg hover:shadow-2xl hover:border-[#211d18]/25 transition-all duration-300">
                  <div>
                    {/* Top Meta Bar */}
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 font-bold">
                        // {p.number}
                      </span>
                      <span className={`text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full border font-semibold ${p.badgeStyle}`}>
                        {p.badge}
                      </span>
                    </div>

                    {/* Official Centered Logo & Title */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`h-14 w-14 rounded-2xl border flex items-center justify-center shrink-0 overflow-hidden ${p.logoContainer}`}>
                        <img
                          src={p.logo}
                          alt={p.logoAlt}
                          className="w-full h-full object-contain"
                          loading="eager"
                        />
                      </div>
                      <div>
                        <h3 className="aether-font-display font-extrabold uppercase text-2xl tracking-tight text-[#211d18]">
                          {p.name}
                        </h3>
                      </div>
                    </div>

                    <h4 className="text-xs font-mono text-[#A34A33] uppercase tracking-wider font-semibold mb-3">
                      {p.headline}
                    </h4>

                    <p className="text-sm text-zinc-600 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  {/* Bottom CTA Button */}
                  <div className="mt-8 pt-6 border-t border-zinc-200/60">
                    {p.cta.isExternal ? (
                      <a
                        href={p.cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 bg-[#211d18] hover:bg-[#A34A33] text-[#fbf9f2] text-xs uppercase tracking-[0.15em] font-semibold px-6 py-3.5 rounded-full transition-all duration-300 shadow-md cursor-pointer"
                      >
                        {p.cta.label}
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    ) : p.cta.disabled ? (
                      <div className="w-full inline-flex items-center justify-center gap-2 bg-zinc-100 text-zinc-500 border border-zinc-300/70 text-xs font-mono uppercase tracking-wider px-6 py-3.5 rounded-full select-none">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                        {p.cta.label}
                      </div>
                    ) : (
                      <Link
                        to={p.cta.to}
                        className="w-full inline-flex items-center justify-center gap-2 bg-[#A34A33] hover:bg-[#211d18] text-[#fbf9f2] text-xs uppercase tracking-[0.15em] font-semibold px-6 py-3.5 rounded-full transition-all duration-300 shadow-md"
                      >
                        {p.cta.label}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
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

export default Ecossistema;
