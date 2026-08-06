import React from "react";
import { Container, Section, SectionHeader, Kicker, Reveal } from "@/components/site/primitives";
import PageHero from "@/components/site/PageHero";
import CtaSection from "@/components/site/CtaSection";
import { SpotlightCard } from "@/components/site/interactions";
import SectionRail from "@/components/aether/SectionRail";
import { useTranslation } from "@/hooks/useTranslation";
import { Users, Trophy as Award, GitMerge } from "@phosphor-icons/react";

const Sobre = () => {
  const { t, language } = useTranslation();
  const SOBRE = t.SOBRE;

  const railItems = language === "pt"
    ? [
        { id: "sobre-hero", label: "01 · Intro" },
        { id: "equipe", label: "02 · Equipe" },
        { id: "paradigma", label: "03 · Paradigma" },
        { id: "licenciamento", label: "04 · Termos" },
        { id: "cta", label: "05 · Contato" },
      ]
    : [
        { id: "sobre-hero", label: "01 · Intro" },
        { id: "equipe", label: "02 · Team" },
        { id: "paradigma", label: "03 · Paradigm" },
        { id: "licenciamento", label: "04 · Terms" },
        { id: "cta", label: "05 · Contact" },
      ];

  return (
    <div data-testid="sobre-page">
      <SectionRail items={railItems} />
      <div id="sobre-hero">
        <PageHero
          kicker={SOBRE.kicker}
          lines={SOBRE.title}
          lead={SOBRE.lead}
          ghostWord={language === "en" ? "About" : "Sobre"}
          primary={{ label: language === "en" ? "Request early access" : "Solicitar acesso antecipado", to: "/#cta" }}
          secondary={{ label: language === "en" ? "See cases" : "Ver casos", to: "/casos-de-uso" }}
        />
      </div>

      <Section id="equipe" className="liquid-divider">
        <Container>
          <SectionHeader
            kicker={SOBRE.kicker}
            title={SOBRE.teamTitle}
            desc={SOBRE.teamDesc}
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {SOBRE.members.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.1}>
                <SpotlightCard
                  as="article"
                  cursorText={m.name.split(" ")[0]}
                  className="flex h-full flex-col rounded-[28px] bg-[#fbf9f2] border border-[#211d18]/10 p-8 hover:border-[#A34A33] hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#A34A33]/10 text-[#A34A33]">
                      {i === 0 ? <Award className="h-5 w-5" /> : <Users className="h-5 w-5" />}
                    </span>
                    <div>
                      <h4 className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#211d18]/50">{m.role}</h4>
                      <h3 className="aether-font-display font-bold uppercase text-xl tracking-tight text-[#211d18] mt-1">{m.name}</h3>
                    </div>
                  </div>
                  <p className="mt-6 text-sm text-[#211d18]/60 leading-relaxed flex-1">{m.bio}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Symmetric twin concept section */}
      <Section id="paradigma" className="liquid-divider">
        <Container>
          <Reveal>
            <div
              className="aether-card group relative flex flex-col justify-between overflow-hidden p-8 md:p-14 cursor-pointer animate-lift"
              data-cursor="hover"
            >
              <div className="relative z-10 flex flex-col md:flex-row items-start gap-8 md:gap-12">
                <span className="aether-card-icon">
                  <GitMerge className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <div>
                  <div className="flex items-baseline gap-4 mb-6">
                    <span className="aether-font-serif italic text-[#A34A33] text-4xl leading-none">03</span>
                    <h3 className="aether-font-display font-bold uppercase text-2xl md:text-3xl tracking-tight text-[#211d18]">
                      {SOBRE.twinTitle}
                    </h3>
                  </div>
                  <p className="mt-5 text-sm text-[#211d18]/60 leading-relaxed max-w-3xl">
                    {SOBRE.twinDesc}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Licensing and terms of service section */}
      <Section id="licenciamento" className="liquid-divider">
        <Container>
          <Reveal>
            <div
              className="aether-card group relative flex flex-col justify-between overflow-hidden p-8 md:p-12 cursor-pointer animate-lift"
              data-cursor="hover"
            >
              <div className="relative z-10">
                <div className="flex items-baseline gap-4 mb-8">
                  <span className="aether-font-serif italic text-[#A34A33] text-4xl leading-none">04</span>
                  <h3 className="aether-font-display font-bold uppercase text-2xl md:text-3xl tracking-tight text-[#211d18]">
                    {language === "en" ? "Terms & Licensing" : "Termos & Licenciamento"}
                  </h3>
                </div>
                <div className="grid gap-8 md:grid-cols-2 text-sm text-[#211d18]/70 leading-relaxed">
                  <div>
                    <h4 className="font-mono uppercase tracking-[0.22em] text-[10px] text-[#A34A33] mb-3">
                      {language === "en" ? "On-Premise License Model" : "Modelo On-Premise"}
                    </h4>
                    <p>
                      {language === "en"
                        ? "AetherCore is distributed under a proprietary on-premise licensing model. The software runs entirely on your own local infrastructure, with no external data transmission. Commercial usage requires a valid enterprise license agreement."
                        : "O AetherCore é distribuído sob um modelo de licenciamento proprietário on-premise. O software executa inteiramente na sua infraestrutura local, sem transmissão de dados externa. O uso comercial requer um contrato de licença corporativo ativo."}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-mono uppercase tracking-[0.22em] text-[10px] text-[#A34A33] mb-3">
                      {language === "en" ? "Data Sovereignty & Support" : "Soberania & Suporte"}
                    </h4>
                    <p>
                      {language === "en"
                        ? "All data processing, logs, and execution traces remain your exclusive property. Dedicated support, custom integrations, and SLA guarantees are available for enterprise tier subscribers. Subject to our standard terms of service."
                        : "Todo o processamento de dados, logs e registros de execução permanecem como sua propriedade exclusiva. Suporte dedicado, integrações sob medida e garantias de SLA estão disponíveis para assinantes corporativos."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaSection />
    </div>
  );
};

export default Sobre;
