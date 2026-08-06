import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Container, Section, SectionHeader, Reveal, Kicker } from "@/components/site/primitives";
import PageHero from "@/components/site/PageHero";
import CtaSection from "@/components/site/CtaSection";
import { Shield, Eye, Cpu, Scales as Scale, UserCheck, Code } from "@phosphor-icons/react";

// Mapeamento visual para cada princípio
const getCardStyle = (index) => {
  const styles = [
    { span: "md:col-span-2 lg:col-span-2", icon: Shield, color: "text-[#A34A33]" }, // 01: controle
    { span: "col-span-1", icon: Eye, color: "text-sky-400" }, // 02: consentimento
    { span: "col-span-1", icon: Cpu, color: "text-[#A34A33]" }, // 03: registro
    { span: "col-span-1", icon: Scale, color: "text-[#A34A33]" }, // 04: proporcionalidade
    { span: "col-span-1", icon: UserCheck, color: "text-rose-400" }, // 05: humano no comando
    { span: "md:col-span-2 lg:col-span-2", icon: Code, color: "text-indigo-400" }, // 06: código como defesa
  ];
  return styles[index] || styles[0];
};

const Principios = () => {
  const { t, language } = useTranslation();
  const PRINCIPIOS = t.PRINCIPIOS;

  return (
    <div data-testid="principios-page">
      <PageHero
        kicker={PRINCIPIOS.kicker}
        lines={[PRINCIPIOS.title]}
        lead={PRINCIPIOS.lead}
        primary={{ 
          label: language === "en" ? "View architecture" : "Ver arquitetura", 
          to: "/arquitetura" 
        }}
        secondary={{ 
          label: language === "en" ? "Go to Home" : "Ir para Home", 
          to: "/" 
        }}
      />

      <Section className="liquid-divider">
        <Container>
          <SectionHeader
            kicker={PRINCIPIOS.manifestoKicker}
            title={PRINCIPIOS.manifestoTitle}
            desc={PRINCIPIOS.manifestoDesc}
          />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {PRINCIPIOS.items.map((it, i) => {
              const style = getCardStyle(i);
              const Icon = style.icon;

              return (
                <Reveal key={it.n} delay={i * 0.1} className={style.span}>
                  <div
                    className="aether-card group relative flex h-full flex-col justify-between overflow-hidden p-8 md:p-10 cursor-pointer"
                    data-cursor="hover"
                  >
                    {/* Giant background watermark number */}
                    <div className="absolute -right-4 -top-8 select-none font-mono text-[180px] font-bold leading-none text-[#211d18]/[0.03] transition-all duration-700 group-hover:scale-110 group-hover:text-[#211d18]/[0.06]">
                      {it.n}
                    </div>

                    <div className="relative z-10 flex h-full flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="aether-card-icon">
                            <Icon className="h-5 w-5" strokeWidth={1.75} />
                          </span>
                          <span className="aether-card-label">{it.tag}</span>
                        </div>
                      </div>
                      
                      <div className="mt-16 md:mt-24">
                        <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-[#211d18] transition-colors">
                          {it.t}
                        </h3>
                        <p className="mt-4 max-w-xl text-base text-[#211d18]/60 leading-relaxed transition-colors">
                          {it.d}
                        </p>
                      </div>
                    </div>
                  </div>
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

export default Principios;
