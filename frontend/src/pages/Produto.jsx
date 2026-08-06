import React from "react";
import { Container, Section, SectionHeader, Kicker, Reveal, Chip } from "@/components/site/primitives";
import { getLucideIcon } from "@/lib/iconHelper";
import PageHero from "@/components/site/PageHero";

import CtaSection from "@/components/site/CtaSection";
import { SpotlightCard } from "@/components/site/interactions";
import EditorialChapters from "@/components/aether/EditorialChapters";
import SectionRail from "@/components/aether/SectionRail";
import { useTranslation } from "@/hooks/useTranslation";

const Produto = () => {
  const { t, language } = useTranslation();
  const PRODUTO = t.PRODUTO;

  const railItems = language === "pt"
    ? [
        { id: "produto-hero", label: "01 · Intro" },
        { id: "funcionamento", label: "02 · Como funciona" },
        { id: "edicoes", label: "03 · Edições" },
        { id: "sustentavel", label: "04 · Sustentável" },
        { id: "cta", label: "05 · Contato" },
      ]
    : [
        { id: "produto-hero", label: "01 · Intro" },
        { id: "funcionamento", label: "02 · How it works" },
        { id: "edicoes", label: "03 · Editions" },
        { id: "sustentavel", label: "04 · Sustainable" },
        { id: "cta", label: "05 · Contact" },
      ];

  return (
    <div data-testid="produto-page">
      <SectionRail items={railItems} />
      <div id="produto-hero">
        <PageHero
          kicker={PRODUTO.kicker}
          lines={PRODUTO.title}
          lead={PRODUTO.lead}
          ghostWord={language === "en" ? "Product" : "Produto"}
          primary={{ label: language === "en" ? "Request early access" : "Solicitar acesso antecipado", to: "/#cta" }}
          secondary={{ label: language === "en" ? "View architecture" : "Ver arquitetura", to: "/arquitetura" }}
        />
      </div>

      <Section id="funcionamento" className="liquid-divider">
        <Container>
          <SectionHeader
            kicker={PRODUTO.solutionKicker}
            title={PRODUTO.solutionTitle}
            desc={PRODUTO.solutionDesc}
          />
        </Container>
        <EditorialChapters
          items={PRODUTO.blocks}
          leftLabel={language === "en" ? "STEP" : "PASSO"}
          hoverLabel={language === "en" ? "Explore" : "Explorar"}
        />
      </Section>

      <Section id="edicoes" className="liquid-divider">
        <Container>
          <SectionHeader
            kicker={PRODUTO.offeringsKicker}
            title={PRODUTO.offeringsTitle}
            desc={PRODUTO.offeringsDesc}
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUTO.offerings.map((o, i) => (
              <Reveal key={o.name} delay={i * 0.08}>
                <SpotlightCard
                  as="article"
                  cursorText={o.name}
                  className={`flex h-full flex-col rounded-[28px] p-7 md:p-8 transition-all duration-500 border ${
                    i === 1
                      ? "bg-[#211d18] text-[#f4f1e8] border-[#211d18] hover:bg-[#A34A33] hover:border-[#A34A33]"
                      : "bg-[#fbf9f2] text-[#211d18] border-[#211d18]/10 hover:border-[#A34A33] hover:-translate-y-1"
                  }`}
                >
                  <div className="flex items-baseline gap-3">
                    <span className={`font-mono text-3xl font-extralight ${i === 1 ? "text-[#f4f1e8]/40" : "text-[#211d18]/30"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`font-mono text-[10px] uppercase tracking-[0.24em] ${i === 1 ? "text-[#f4f1e8]/60" : "text-[#211d18]/50"}`}>
                      {o.audience}
                    </span>
                  </div>
                  <h3 className="mt-6 aether-font-display font-bold uppercase tracking-tight text-2xl md:text-3xl leading-[1.02]">
                    {o.name}
                  </h3>
                  <p className={`mt-4 text-sm font-medium ${i === 1 ? "text-[#f4f1e8]/85" : "text-[#211d18]/75"}`}>
                    {o.t}
                  </p>
                  <p className={`mt-3 text-sm leading-relaxed flex-1 ${i === 1 ? "text-[#f4f1e8]/60" : "text-[#211d18]/55"}`}>
                    {o.d}
                  </p>
                  <ul className={`mt-6 space-y-2.5 border-t pt-5 ${i === 1 ? "border-[#f4f1e8]/15" : "border-[#211d18]/10"}`}>
                    {o.points.map((p) => (
                      <li
                        key={p}
                        className={`flex items-center gap-2.5 text-sm ${i === 1 ? "text-[#f4f1e8]/85" : "text-[#211d18]/70"}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${i === 1 ? "bg-[#A34A33]" : "bg-[#211d18]/40"}`} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="sustentavel" className="liquid-divider">
        <Container>
          <SectionHeader
            kicker={PRODUTO.greenKicker}
            title={PRODUTO.greenTitle}
            desc={PRODUTO.greenDesc}
          />
          <div className="mt-14 grid gap-4 md:gap-5 lg:grid-cols-3">
            {PRODUTO.greenCards.map((c, i) => {
              const IconComponent = getLucideIcon(c.icon);

              return (
                <Reveal key={c.t} delay={i * 0.08}>
                  <SpotlightCard as="article" cursorText={c.t} className="flex h-full flex-col rounded-[28px] bg-[#fbf9f2] border border-[#211d18]/10 p-8 hover:border-[#A34A33] hover:-translate-y-1 transition-all duration-500">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#A34A33]/10 text-[#A34A33]">
                        <IconComponent className="h-5 w-5" strokeWidth={2} />
                      </span>
                      <Kicker className="!mb-0">{c.t}</Kicker>
                    </div>
                    <p className="mt-6 text-sm text-[#211d18]/60 leading-relaxed flex-1">{c.d}</p>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <CtaSection />
    </div>
  );
};

export default Produto;
