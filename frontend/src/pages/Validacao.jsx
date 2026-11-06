import React from "react";
import { Container, Section, SectionHeader, Reveal } from "@/components/site/primitives";
import PageHero from "@/components/site/PageHero";
import { useTranslation } from "@/hooks/useTranslation";

const STATUS_COPY = {
  pt: {
    kicker: "estado do produto · beta",
    title: ["Construindo a base.", "Provando cada", "fronteira."],
    lead: "O AetherCore está em desenvolvimento. Esta página descreve o estágio atual e o que ainda precisa ser validado antes de uma oferta comercial.",
    action: "Conversar sobre validação",
    explore: "Ver arquitetura",
    sectionKicker: "o que é verdade hoje",
    sectionTitle: "Estado atual, limites e próxima prova.",
    sectionLead: "A proposta local-first orienta o produto; cada caminho de dados depende do modelo, dos conectores e da configuração escolhida.",
    cards: [
      { label: "01 · estágio", title: "Beta em desenvolvimento", body: "O produto reúne uma interface desktop e um runtime em Rust. O lançamento público ainda não foi aprovado e não há oferta comercial ativa." },
      { label: "02 · execução", title: "Local quando configurado", body: "O AetherCore pode usar modelos locais, como Ollama, e também permite conexões externas opcionais. Uma chamada a provedor remoto pode transmitir o conteúdo enviado a esse provedor." },
      { label: "03 · segurança", title: "Controles com escopo definido", body: "Há controles de workspace e etapas de aprovação no fluxo. O isolamento atual é lógico; não equivale a sandbox do sistema operacional, máquina virtual ou contêiner." },
      { label: "04 · validação", title: "Evidência ainda em construção", body: "Ainda não há auditoria independente, certificação, piloto formal, referência pública de cliente ou receita reportada. Não afirmamos conformidade LGPD nem garantia de ausência de vazamentos." },
    ],
    nextTitle: "Próximos marcos de prova",
    nextBody: "Pacote instalável e assinado, instalação limpa em Windows, matriz de modelos suportados, revisão de segurança independente e pilotos consentidos com métricas publicáveis.",
    note: "Para tarefas com dados sensíveis, confirme o modelo e o destino de cada conexão antes de usar. A configuração local reduz algumas transmissões, mas não substitui avaliação de risco, controles organizacionais ou análise jurídica.",
  },
  en: {
    kicker: "product status · beta",
    title: ["Building the foundation.", "Proving each", "boundary."],
    lead: "AetherCore is in development. This page describes its current stage and what still needs validation before a commercial offer.",
    action: "Discuss validation",
    explore: "View architecture",
    sectionKicker: "what is true today",
    sectionTitle: "Current status, limits, and next proof.",
    sectionLead: "Local-first guides the product; each data path depends on the selected model, connectors, and configuration.",
    cards: [
      { label: "01 · stage", title: "Beta in development", body: "The product combines a desktop interface and a Rust runtime. A public release has not been approved and there is no active commercial offer." },
      { label: "02 · execution", title: "Local when configured", body: "AetherCore can use local models such as Ollama and also allows optional external connections. A remote-provider call may transmit submitted content to that provider." },
      { label: "03 · security", title: "Controls with defined scope", body: "Workspace controls and approval steps exist in the flow. Current isolation is logical; it is not an operating-system sandbox, virtual machine, or container." },
      { label: "04 · validation", title: "Evidence is still being built", body: "There is no independent audit, certification, formal pilot, public customer reference, or reported revenue yet. We do not claim LGPD compliance or a guarantee against leaks." },
    ],
    nextTitle: "Next proof points",
    nextBody: "Signed installer, clean Windows installation, supported-model matrix, independent security review, and consented pilots with publishable metrics.",
    note: "For sensitive work, confirm the model and destination of every connection before use. Local configuration reduces some transmissions, but does not replace risk assessment, organizational controls, or legal review.",
  },
};

const Validacao = () => {
  const { language } = useTranslation();
  const copy = STATUS_COPY[language] || STATUS_COPY.pt;

  return (
    <main data-testid="validacao-page" className="relative overflow-hidden">
      <PageHero
        kicker={copy.kicker}
        lines={copy.title}
        lead={copy.lead}
        ghostWord="BETA"
        primary={{ label: copy.action, href: "mailto:business@exvorn.tech", isExternal: true }}
        secondary={{ label: copy.explore, to: "/arquitetura" }}
      />

      <Section className="liquid-divider bg-[#f4f1e8]">
        <Container>
          <SectionHeader kicker={copy.sectionKicker} title={copy.sectionTitle} desc={copy.sectionLead} />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {copy.cards.map((card) => (
              <Reveal key={card.label}>
                <article className="h-full rounded-[24px] border border-[#211d18]/10 bg-white/60 p-7 md:p-9">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0038FF]">{card.label}</span>
                  <h2 className="mt-4 text-xl font-semibold tracking-tight text-[#211d18] md:text-2xl">{card.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#211d18]/65">{card.body}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8">
            <div className="rounded-[24px] border border-[#0038FF]/20 bg-[#0038FF]/[0.04] p-7 md:p-9">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0038FF]">// roadmap de validação</span>
              <h2 className="mt-4 text-xl font-semibold tracking-tight text-[#211d18] md:text-2xl">{copy.nextTitle}</h2>
              <p className="mt-3 max-w-4xl text-sm leading-relaxed text-[#211d18]/65">{copy.nextBody}</p>
            </div>
          </Reveal>

          <p className="mx-auto mt-8 max-w-4xl text-xs leading-relaxed text-[#211d18]/75">{copy.note}</p>
        </Container>
      </Section>
    </main>
  );
};

export default Validacao;
