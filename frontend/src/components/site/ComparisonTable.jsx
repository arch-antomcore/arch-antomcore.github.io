import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Container, Section, SectionHeader, Reveal } from "@/components/site/primitives";

const ComparisonRow = ({ row, index, language }) => (
  <Reveal delay={index * 0.04}>
    <div
      className="grid grid-cols-1 items-start gap-4 rounded-xl border-b border-[#211d18]/10 px-4 py-6 transition-colors hover:bg-[#211d18]/[0.015] md:grid-cols-12 md:gap-6 md:py-7"
      data-testid={`compare-row-${index}`}
    >
      <div className="md:col-span-3">
        <span className="font-mono text-[10px] text-[#211d18]/40">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="mt-1 text-base font-semibold uppercase tracking-tight text-[#211d18]">{row.feat}</h3>
      </div>
      <div className="md:col-span-4 md:col-start-4">
        <span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.18em] text-[#211d18]/45">
          {language === "en" ? "External provider path" : "Caminho por provedor externo"}
        </span>
        <p className="text-sm leading-relaxed text-[#211d18]/65">{row.cloud}</p>
      </div>
      <div className="md:col-span-5 md:col-start-8 md:pl-4">
        <span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.18em] text-[#0038FF]">
          {language === "en" ? "AetherCore beta" : "AetherCore beta"}
        </span>
        <p className="text-sm leading-relaxed text-[#211d18]/80">{row.aether}</p>
      </div>
    </div>
  </Reveal>
);

const ComparisonTable = () => {
  const { t, language } = useTranslation();
  const CASOS = t.CASOS;

  return (
    <Section className="liquid-divider bg-[#f4f1e8]" id="comparison-section">
      <Container>
        <SectionHeader kicker={CASOS.compareKicker} title={CASOS.compareTitle} desc={CASOS.compareDesc} />

        <Reveal className="mt-8">
          <div className="rounded-2xl border border-[#0038FF]/15 bg-[#0038FF]/[0.035] p-5 text-sm leading-relaxed text-[#211d18]/65 md:p-6">
            {language === "en"
              ? "This is an architecture-level guide, not a security or legal assessment of any provider. Data handling varies by service, model, settings, and contract. AetherCore is in beta; its integrations and boundaries still require validation."
              : "Este guia compara caminhos de arquitetura; não é uma avaliação jurídica ou de segurança de nenhum provedor. O tratamento de dados varia conforme serviço, modelo, configuração e contrato. O AetherCore está em beta e suas integrações e fronteiras ainda precisam de validação."}
          </div>
        </Reveal>

        <div className="mt-6">
          {CASOS.compare.map((row, index) => (
            <ComparisonRow key={row.feat} row={row} index={index} language={language} />
          ))}
        </div>

        <Reveal className="mt-10">
          <div className="border-l-2 border-[#0038FF] py-2 pl-6 md:pl-10">
            <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.25em] text-[#0038FF]">
              // {language === "en" ? "DECISION CHECK" : "CRITÉRIO DE DECISÃO"}
            </span>
            <h3 className="max-w-3xl text-2xl font-bold uppercase leading-tight tracking-tight text-[#211d18] md:text-3xl">
              {language === "en" ? "Trace the data path before choosing the model." : "Rastreie o caminho dos dados antes de escolher o modelo."}
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#211d18]/65">
              {language === "en"
                ? "Check which model receives each prompt, what leaves the device, where outputs are stored, and which actions require approval. No architecture alone establishes legal compliance."
                : "Confira qual modelo recebe cada instrução, o que sai do dispositivo, onde as respostas ficam armazenadas e quais ações exigem aprovação. Nenhuma arquitetura, por si só, comprova conformidade legal."}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
};

export default ComparisonTable;
