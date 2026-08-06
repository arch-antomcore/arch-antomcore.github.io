import React from "react";
import { Container, Section, SectionHeader, Reveal } from "@/components/site/primitives";
import PageHero from "@/components/site/PageHero";
import CtaSection from "@/components/site/CtaSection";
import SectionRail from "@/components/aether/SectionRail";
import { useTranslation } from "@/hooks/useTranslation";
import { getLucideIcon } from "@/lib/iconHelper";
import { ImageBand, MEDIA } from "@/components/aether/GlassMedia";


const Sustentabilidade = () => {
  const { t, language } = useTranslation();
  const SUSTENTABILIDADE = t.SUSTENTABILIDADE;

  const railItems = language === "pt"
    ? [
        { id: "sust-hero", label: "01 · Intro" },
        { id: "sust-cards", label: "02 · Impacto" },
        { id: "cta", label: "03 · Contato" },
      ]
    : [
        { id: "sust-hero", label: "01 · Intro" },
        { id: "sust-cards", label: "02 · Impact" },
        { id: "cta", label: "03 · Contact" },
      ];

  return (
    <div data-testid="sustentabilidade-page">
      <SectionRail items={railItems} />
      <div id="sust-hero">
        <PageHero
          kicker={SUSTENTABILIDADE.kicker}
          lines={SUSTENTABILIDADE.title}
          lead={SUSTENTABILIDADE.lead}
          ghostWord={language === "en" ? "Green" : "Verde"}
          primary={{ label: language === "en" ? "Request early access" : "Solicitar acesso antecipado", to: "/#cta" }}
          secondary={{ label: language === "en" ? "See the product" : "Ver o produto", to: "/produto" }}
        />
      </div>

      <ImageBand
        media={MEDIA.forest}
        testId="sust-image-band"
        kicker={language === "en" ? "Silent computing" : "Computação silenciosa"}
        lines={
          language === "en"
            ? [{ t: "Intelligence that" }, { t: "doesn't evaporate" }, { t: "rivers.", serif: true }]
            : [{ t: "Inteligência que" }, { t: "não evapora" }, { t: "rios.", serif: true }]
        }
        caption={
          language === "en"
            ? "Every local inference skips a round trip to a hyperscale data center — no water for cooling, no redundant network hops, no idle racks."
            : "Cada inferência local dispensa uma viagem até um data center de hiperescala — sem água para resfriamento, sem saltos de rede redundantes, sem racks ociosos."
        }
      />

      <Section className="liquid-divider" id="sust-cards">
        <Container>
          <SectionHeader
            kicker={SUSTENTABILIDADE.kicker}
            title={SUSTENTABILIDADE.cardsTitle}
            desc={SUSTENTABILIDADE.cardsDesc}
          />
          <div className="mt-14 grid gap-5 md:gap-6 lg:grid-cols-3">
            {SUSTENTABILIDADE.cards.map((c, i) => {
              const IconComponent = getLucideIcon(c.icon);

              return (
                <Reveal key={c.t} delay={i * 0.08}>
                  <article
                    className="aether-card flex h-full flex-col p-8"
                    data-cursor="hover"
                    data-testid={`sust-card-${i}`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="aether-card-icon">
                        <IconComponent className="h-6 w-6" strokeWidth={1.8} />
                      </span>
                      <span className="font-mono text-[11px] font-semibold tracking-[0.3em] text-[#211d18]/30">
                        //{String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="aether-card-label mt-7 text-[#211d18]/70">{c.t}</span>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-[#211d18]/60">{c.d}</p>
                    <span className="mt-6 block h-px w-full bg-[#211d18]/[0.07]" aria-hidden="true" />
                    <span className="mt-4 font-mono text-[10px] uppercase tracking-[0.28em] text-[#211d18]/35">
                      {language === "en" ? "Local-first impact" : "Impacto local-first"}
                    </span>
                  </article>
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

export default Sustentabilidade;
