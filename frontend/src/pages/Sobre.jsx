import React from "react";
import { Container, Section, SectionHeader, Kicker, Reveal } from "@/components/site/primitives";
import PageHero from "@/components/site/PageHero";
import CtaSection from "@/components/site/CtaSection";
import { SpotlightCard } from "@/components/site/interactions";
import { useTranslation } from "@/hooks/useTranslation";
import { Users, Trophy as Award, GitMerge } from "@phosphor-icons/react";

const Sobre = () => {
  const { t, language } = useTranslation();
  const SOBRE = t.SOBRE;

  return (
    <div className="design-page" data-testid="sobre-page">
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
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {SOBRE.members.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.1}>
                <SpotlightCard
                  as="article"
                  cursorText={m.name.split(" ")[0]}
                  className="flex h-full flex-col rounded-[28px] bg-[#fbf9f2] border border-[#211d18]/10 p-8 hover:border-[#0038FF] hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0038FF]/10 text-[#0038FF]">
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
              className="aether-card group relative flex flex-col justify-between overflow-hidden p-8 md:p-14"
              data-cursor="hover"
            >
              <div className="relative z-10 flex flex-col md:flex-row items-start gap-8 md:gap-12">
                <span className="aether-card-icon">
                  <GitMerge className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <div>
                  <div className="flex items-baseline gap-4 mb-6">
                    <span className="design-number text-[#0038FF] text-4xl leading-none font-black">03</span>
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
              className="aether-card group relative flex flex-col justify-between overflow-hidden p-8 md:p-12"
              data-cursor="hover"
            >
              <div className="relative z-10">
                <div className="flex items-baseline gap-4 mb-8">
                  <span className="design-number text-[#0038FF] text-4xl leading-none font-black">04</span>
                  <h3 className="aether-font-display font-bold uppercase text-2xl md:text-3xl tracking-tight text-[#211d18]">
                    {language === "en" ? "Terms & Licensing" : "Termos & Licenciamento"}
                  </h3>
                </div>
                <div className="grid gap-8 md:grid-cols-2 text-sm text-[#211d18]/70 leading-relaxed">
                  <div>
                    <h4 className="font-mono uppercase tracking-[0.22em] text-[10px] text-[#0038FF] mb-3">
                      {language === "en" ? "License status" : "Estado da licença"}
                    </h4>
                    <p>
                      {language === "en"
                        ? "AetherCore is in beta and has no public commercial release. License terms and the scope of any future distribution remain under review."
                        : "O AetherCore está em beta e não tem lançamento comercial público. Os termos de licença e o escopo de uma futura distribuição seguem em revisão."}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-mono uppercase tracking-[0.22em] text-[10px] text-[#0038FF] mb-3">
                      {language === "en" ? "Data handling & support" : "Tratamento de dados & suporte"}
                    </h4>
                    <p>
                      {language === "en"
                        ? "Data handling depends on configuration and connected services. No paid tier, support commitment, custom-integration offer, or SLA is available today."
                        : "O tratamento de dados depende da configuração e dos serviços conectados. Não há plano pago, compromisso de suporte, oferta de integração sob medida ou SLA disponível hoje."}
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
