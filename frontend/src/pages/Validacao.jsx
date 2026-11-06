import React from "react";
import { Container, Section, SectionHeader, Reveal } from "@/components/site/primitives";
import PageHero from "@/components/site/PageHero";
import { useTranslation } from "@/hooks/useTranslation";

const STATUS_COPY = {
  pt: {
    kicker: "AetherCore · acesso antecipado",
    title: ["IA para agir", "sobre arquivos.", "Você decide como."],
    lead: "O AetherCore une modelos, arquivos e ferramentas em uma aplicação desktop. O runtime em Rust organiza as etapas; você escolhe o contexto e o caminho de execução.",
    action: "Solicitar acesso antecipado",
    explore: "Ver arquitetura",
    sectionKicker: "a proposta em ação",
    sectionTitle: "Um produto para trabalho verificável.",
    sectionLead: "A arquitetura permite selecionar arquivos, configurar modelos e acompanhar a execução das ferramentas no workspace.",
    cards: [
      { label: "01 · produto", title: "Interface + runtime Rust", body: "Uma aplicação desktop combina interação com o usuário, coordenação de tarefas e ferramentas para trabalhar com arquivos." },
      { label: "02 · modelos", title: "Escolha onde inferir", body: "Use modelos locais, como os disponibilizados via Ollama, ou conecte um provedor externo quando o fluxo exigir. A escolha determina o destino dos dados enviados ao modelo." },
      { label: "03 · controle", title: "Contexto definido por você", body: "O workspace delimita os arquivos da tarefa. Etapas de aprovação ajudam a revisar ações cobertas pelo fluxo antes da execução." },
      { label: "04 · negócio", title: "Acesso amplo, valor empresarial", body: "A estratégia prevê um núcleo local gratuito no lançamento público. Implantação, suporte e governança para equipes formam a frente comercial, com proposta conforme o caso." },
    ],
    nextTitle: "Próxima etapa: acesso antecipado",
    nextBody: "Estamos preparando distribuição, documentação de compatibilidade e pilotos com tarefas mensuráveis. Interessados podem solicitar uma conversa e acompanhar a evolução do produto.",
    note: "Para fluxos com dados sensíveis, selecione o modelo e revise os destinos das conexões antes de iniciar a tarefa.",
  },
  en: {
    kicker: "AetherCore · early access",
    title: ["AI that works", "with files.", "You decide how."],
    lead: "AetherCore brings models, files, and tools into a desktop app. Its Rust runtime coordinates each step; you choose the context and execution path.",
    action: "Request early access",
    explore: "View architecture",
    sectionKicker: "the product in action",
    sectionTitle: "Built for work you can inspect.",
    sectionLead: "The architecture lets you select files, configure models, and follow tool execution within a workspace.",
    cards: [
      { label: "01 · product", title: "Interface + Rust runtime", body: "A desktop app combines user interaction, task coordination, and tools for working with files." },
      { label: "02 · models", title: "Choose where inference runs", body: "Use local models, including those served through Ollama, or connect an external provider when a workflow calls for one. That choice sets the destination for model input." },
      { label: "03 · control", title: "Context you define", body: "The workspace scopes task files. Approval steps help you review covered actions before execution." },
      { label: "04 · business", title: "Broad access, enterprise value", body: "Our strategy calls for a free local core at public launch. Team deployment, support, and governance form the commercial offer, scoped by proposal." },
    ],
    nextTitle: "Next: early access",
    nextBody: "We are preparing distribution, compatibility documentation, and pilots with measurable tasks. Interested teams can request a conversation and follow product progress.",
    note: "For sensitive workflows, choose the model and review connection destinations before starting the task.",
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
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#0038FF]">// próximo passo</span>
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
