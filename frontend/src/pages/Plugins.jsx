import React from "react";
import { Container, Section, Reveal } from "@/components/site/primitives";
import PageHero from "@/components/site/PageHero";
import CtaSection from "@/components/site/CtaSection";
import { useTranslation } from "@/hooks/useTranslation";
import { ArrowUpRight } from "@phosphor-icons/react";

const Plugins = () => {
  const { t, language } = useTranslation();
  const PLUGINS = t.PLUGINS;
  const en = language === "en";

  return (
    <div data-testid="plugins-page">
      <PageHero
        kicker={PLUGINS.kicker}
        lines={PLUGINS.title}
        lead={PLUGINS.lead}
        primary={{ label: en ? "Request early access" : "Solicitar acesso antecipado", to: "/#cta" }}
        secondary={{ label: en ? "See the product" : "Ver o produto", to: "/produto" }}
      />

      <Section className="liquid-divider">
        <Container>
          <div className="max-w-3xl mx-auto">

            {/* LocalAI */}
            <Reveal>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-20">
                <a href="https://localai.io" target="_blank" rel="noopener noreferrer" className="shrink-0 hover:opacity-80 transition-opacity">
                  <img src="/assets/img/brand/localai-logo.png" alt="LocalAI" className="w-28 h-28 object-contain" />
                </a>
                <div>
                  <p className="text-zinc-300 leading-relaxed">
                    {en
                      ? "The plugin system was designed around "
                      : "O sistema de plugins foi projetado em torno do "}
                    <Link href="https://localai.io">LocalAI</Link>
                    {en
                      ? " as the primary inference engine. LLMs, audio, images, embeddings — all running offline, modular, and decoupled from the core."
                      : " como motor de inferência primário. LLMs, áudio, imagens, embeddings — tudo rodando offline, modular e desacoplado do core."}
                  </p>
                  <p className="mt-3 text-zinc-500 text-sm">
                    <Link href="https://github.com/mudler/LocalAI">{en ? "Source on GitHub" : "Código no GitHub"}</Link>
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Connectors */}
            <Reveal>
              <div className="mb-20">
                <h3 className="text-lg font-semibold text-white mb-4">{PLUGINS.cardsTitle}</h3>
                <p className="text-zinc-300 leading-relaxed">
                  {en
                    ? "External tools connect through "
                    : "Ferramentas externas se conectam via "}
                  <Link href="https://modelcontextprotocol.io">MCP</Link>
                  {en
                    ? " servers. Internal tools plug directly into the Memory Kernel — vector indexes, RAG pipelines, and custom actions."
                    : " servers. Ferramentas internas plugam direto no Memory Kernel — índices vetoriais, pipelines RAG e ações customizadas."}
                </p>
              </div>
            </Reveal>

            {/* Skills */}
            <Reveal>
              <div className="mb-20">
                <h3 className="text-lg font-semibold text-white mb-4">
                  {en ? "Agent Skills" : "Agent Skills"}
                </h3>
                <p className="text-zinc-300 leading-relaxed">
                  {en
                    ? "AetherCore follows the open "
                    : "O AetherCore segue o padrão aberto "}
                  <Link href="https://github.com/anthropics/skills">Agent Skills</Link>
                  {en
                    ? " standard — portable SKILL.md files adopted by Claude Code, Cursor, Copilot, and Gemini CLI. Install via "
                    : " — arquivos SKILL.md portáveis adotados pelo Claude Code, Cursor, Copilot e Gemini CLI. Instale via "}
                  <code className="text-zinc-200 font-mono text-[13px]">npx skills</code>.
                </p>
                <p className="mt-4 text-zinc-500 text-sm leading-relaxed">
                  {en ? "See also: " : "Veja também: "}
                  <Link href="https://github.com/vercel-labs/agent-skills">Vercel Agent Skills</Link>
                  {en ? " and " : " e "}
                  <Link href="https://www.ui-skills.com">UI Skills</Link>.
                </p>
              </div>
            </Reveal>

            {/* Security */}
            <Reveal>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">{PLUGINS.featuresTitle}</h3>
                {PLUGINS.features.map((f) => (
                  <p key={f.title} className="text-zinc-300 leading-relaxed mb-3">
                    <span className="text-white font-medium">{f.title}.</span> {f.desc}
                  </p>
                ))}
              </div>
            </Reveal>

          </div>
        </Container>
      </Section>

      <CtaSection />
    </div>
  );
};

const Link = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="underline underline-offset-3 decoration-zinc-600 hover:decoration-zinc-400 transition-colors"
  >
    {children}
  </a>
);

export default Plugins;
