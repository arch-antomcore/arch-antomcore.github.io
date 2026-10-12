import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "@phosphor-icons/react";
import { Container, Section, SectionHeader, Reveal } from "@/components/site/primitives";
import PageHero from "@/components/site/PageHero";
import CtaSection from "@/components/site/CtaSection";
import { SpotlightCard } from "@/components/site/interactions";
import { useTranslation } from "@/hooks/useTranslation";

const Ecossistema = () => {
  const { language } = useTranslation();
  const isPt = language === "pt";

  const products = [
    {
      id: "aethercore",
      name: "AetherCore",
      number: "01",
      badge: isPt ? "Flagship · IA Local" : "Flagship · Local AI",
      badgeStyle: "bg-[#0038FF]/15 text-[#0038FF] border-[#0038FF]/30",
      logo: "/assets/img/brand/logo-aether.png",
      logoAlt: "Símbolo oficial do AetherCore",
      logoContainer: "border-[#0038FF]/20 bg-white shadow-sm shadow-[#0038FF]/10 p-2",
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
      badgeStyle: "bg-[#0038FF]/10 text-[#0038FF] border-[#0038FF]/25",
      logo: "/assets/ecosystem/monitorsmith.png",
      logoAlt: "MonitorSmith Logo",
      logoContainer: "border-[#0038FF]/15 bg-white p-2",
      logoClass: "w-full h-full object-contain",
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
  ];

  return (
    <div className="design-page" data-testid="ecossistema-page">

      <div id="eco-hero">
        <PageHero
          kicker={isPt ? "Startup & Portfólio" : "Startup & Portfolio"}
          lines={isPt ? ["O Ecossistema", "de Projetos", "da Exvorn."] : ["The Exvorn", "Project", "Ecosystem."]}
          lead={
            isPt
              ? "A Exvorn desenvolve o AetherCore — com a IDE Quintessence — e o MonitorSmith. Conheça os produtos e a tecnologia por trás de cada iniciativa."
              : "Exvorn builds AetherCore — with the Quintessence IDE — and MonitorSmith. Explore the products and technology behind each initiative."
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

      {/* Two-product portfolio */}
      <Section id="projetos" className="liquid-divider">
        <Container>
          <SectionHeader
            kicker={isPt ? "Portfólio de Produtos" : "Product Portfolio"}
            title={isPt ? "Duas frentes da Exvorn" : "Two sides of Exvorn"}
            desc={
              isPt
                ? "IA local-first e ferramentas para trabalho inteligente com o AetherCore; telemetria de hardware e diagnósticos em tempo real com o MonitorSmith."
                : "Local-first AI and intelligent work tools with AetherCore; hardware telemetry and real-time diagnostics with MonitorSmith."
            }
          />

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {products.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <SpotlightCard className="design-panel rounded-[32px] p-8 md:p-10 h-full flex flex-col justify-between transition-colors duration-300">
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

                    {/* High-Contrast Centered Logo & Title */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`h-14 w-14 rounded-2xl border flex items-center justify-center shrink-0 overflow-hidden ${p.logoContainer}`}>
                        <img
                          src={p.logo}
                          alt={p.logoAlt}
                          className={p.logoClass}
                          loading="eager"
                        />
                      </div>
                      <div>
                        <h3 className="aether-font-display font-extrabold uppercase text-2xl tracking-tight text-[#211d18]">
                          {p.name}
                        </h3>
                      </div>
                    </div>

                    <h4 className="text-xs font-mono text-[#0038FF] uppercase tracking-wider font-semibold mb-3">
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
                        className="w-full inline-flex items-center justify-center gap-2 bg-[#0038FF] hover:bg-[#08258f] text-[#fbf9f2] text-xs uppercase tracking-[0.15em] font-semibold px-6 py-3.5 rounded-full transition-colors duration-300"
                      >
                        {p.cta.label}
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    ) : p.cta.disabled ? (
                      <div className="w-full inline-flex items-center justify-center gap-2 bg-zinc-100 text-zinc-500 border border-zinc-300/70 text-xs font-mono uppercase tracking-wider px-6 py-3.5 rounded-full select-none">
                        <span className="w-2 h-2 rounded-full bg-[#777268]" />
                        {p.cta.label}
                      </div>
                    ) : (
                      <Link
                        to={p.cta.to}
                        className="w-full inline-flex items-center justify-center gap-2 bg-[#0038FF] hover:bg-[#08258f] text-[#fbf9f2] text-xs uppercase tracking-[0.15em] font-semibold px-6 py-3.5 rounded-full transition-colors duration-300"
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
