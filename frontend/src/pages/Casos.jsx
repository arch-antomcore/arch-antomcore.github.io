import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Container, Section, SectionHeader, Kicker, Reveal, Chip } from "@/components/site/primitives";
import PageHero from "@/components/site/PageHero";
import CtaSection from "@/components/site/CtaSection";
import { SpotlightCard } from "@/components/site/interactions";
import ComparisonTable from "@/components/site/ComparisonTable";
import EditorialChapters from "@/components/aether/EditorialChapters";
import SectionRail from "@/components/aether/SectionRail";
import { ImageBand, MEDIA } from "@/components/aether/GlassMedia";

const Casos = () => {
  const { t, language } = useTranslation();
  const CASOS = t.CASOS;

  const railItems = language === "pt"
    ? [
        { id: "casos-hero", label: "01 · Intro" },
        { id: "casos-problem", label: "02 · Problema" },
        { id: "casos-compare", label: "03 · Comparativo" },
        { id: "casos-audience", label: "04 · Audiência" },
        { id: "cta", label: "05 · Contato" },
      ]
    : [
        { id: "casos-hero", label: "01 · Intro" },
        { id: "casos-problem", label: "02 · Problem" },
        { id: "casos-compare", label: "03 · Compare" },
        { id: "casos-audience", label: "04 · Audience" },
        { id: "cta", label: "05 · Contact" },
      ];

  return (
    <div data-testid="casos-de-uso-page">
      <SectionRail items={railItems} />
      <div id="casos-hero">
        <PageHero
          kicker={CASOS.kicker}
          lines={CASOS.title}
          lead={CASOS.lead}
          ghostWord={language === "en" ? "Cases" : "Casos"}
          primary={{
            label: language === "en" ? "Request early access" : "Solicitar acesso antecipado",
            to: "/#cta"
          }}
          secondary={{
            label: language === "en" ? "View architecture" : "Ver arquitetura",
            to: "/arquitetura"
          }}
        />
      </div>

      <Section id="casos-problem" className="liquid-divider">
        <Container>
          <SectionHeader kicker={CASOS.problemKicker} title={CASOS.problemTitle} desc={CASOS.problemDesc} />
        </Container>
        <EditorialChapters
          items={CASOS.steps}
          leftLabel={language === "en" ? "STEP" : "PASSO"}
          hoverLabel={language === "en" ? "Read" : "Ler"}
        />
      </Section>

      <div id="casos-compare">
        <ComparisonTable />
      </div>

      <ImageBand
        media={MEDIA.office}
        testId="casos-image-band"
        kicker={language === "en" ? "On-premise by design" : "On-premise por projeto"}
        lines={
          language === "en"
            ? [{ t: "Your data never" }, { t: "leaves", serif: true }, { t: "the building." }]
            : [{ t: "Seus dados nunca" }, { t: "saem", serif: true }, { t: "do prédio." }]
        }
        caption={
          language === "en"
            ? "Legal, finance and controlling teams run AetherCore behind their own firewall — the AI comes to the files, never the other way around."
            : "Times jurídicos, financeiros e de controladoria rodam o AetherCore atrás do próprio firewall — a IA vai até os arquivos, nunca o contrário."
        }
      />

      <Section id="casos-audience" className="liquid-divider">
        <Container>
          <SectionHeader kicker={CASOS.audienceKicker} title={CASOS.audienceTitle} desc={CASOS.audienceDesc} />
          <div className="mt-14 grid gap-4 md:gap-5 sm:grid-cols-2">
            {CASOS.audience.map((a, i) => (
              <Reveal key={a.t} delay={(i % 2) * 0.08}>
                <SpotlightCard
                  as="article"
                  cursorText={language === "en" ? "Read" : "Ler"}
                  className="h-full rounded-[28px] bg-[#fbf9f2] border border-[#211d18]/10 p-8 hover:border-[#A34A33] hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="aether-font-serif italic text-[#211d18]/30 text-4xl leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px flex-1 bg-[#211d18]/10" />
                  </div>
                  <h3 className="aether-font-display font-bold uppercase tracking-tight text-xl md:text-2xl leading-[1.02] text-[#211d18]">{a.t}</h3>
                  <p className="mt-4 text-sm text-[#211d18]/60 leading-relaxed">{a.d}</p>
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

export default Casos;
