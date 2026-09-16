import React from "react";
import { ArrowUpRight, CheckCircle } from "@phosphor-icons/react";
import { Container, Section, SectionHeader, Reveal, Kicker } from "@/components/site/primitives";
import PageHero from "@/components/site/PageHero";
import CtaSection from "@/components/site/CtaSection";
import { SpotlightCard } from "@/components/site/interactions";
import { getLucideIcon } from "@/lib/iconHelper";
import { useTranslation } from "@/hooks/useTranslation";

const ExternalLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#A34A33] hover:text-[#7a3526] transition-colors"
  >
    {children}
    <ArrowUpRight className="h-3.5 w-3.5" />
  </a>
);

const Plugins = () => {
  const { t, language } = useTranslation();
  const PLUGINS = t.PLUGINS;
  const en = language === "en";

  return (
    <div data-testid="plugins-page">
      <div id="plugins-hero">
        <PageHero
          kicker={PLUGINS.kicker}
          lines={PLUGINS.title}
          lead={PLUGINS.lead}
          primary={{ label: en ? "Request early access" : "Solicitar acesso antecipado", to: "/#cta" }}
          secondary={{ label: en ? "See the product" : "Ver o produto", to: "/produto" }}
          ghostWord={en ? "Plugins" : "Plugins"}
        />
      </div>

      <Section id="plugins-conectores" className="liquid-divider">
        <Container>
          <SectionHeader
            kicker={en ? "composable surface" : "superfície composável"}
            title={PLUGINS.cardsTitle}
            desc={PLUGINS.cardsDesc}
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PLUGINS.cards.map((card, index) => {
              const Icon = getLucideIcon(card.icon);
              return (
                <Reveal key={card.t} delay={(index % 3) * 0.07}>
                  <SpotlightCard
                    as="article"
                    className="group flex h-full flex-col rounded-[28px] bg-[#fbf9f2] border border-[#211d18]/10 p-7 md:p-8 hover:-translate-y-1 hover:border-[#A34A33]/60 transition-all duration-500"
                    data-testid={`plugin-card-${index}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="aether-card-icon bg-[#A34A33]/10 text-[#A34A33] group-hover:bg-[#A34A33] group-hover:text-[#fffaf4] transition-colors">
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                      <span className="font-mono text-[10px] font-semibold tracking-[0.3em] text-[#211d18]/30">
                        //{String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-7 aether-font-display text-xl font-bold uppercase leading-tight tracking-tight text-[#211d18]">
                      {card.t}
                    </h3>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-[#211d18]/65">{card.d}</p>
                    {card.link && (
                      <div className="mt-7 border-t border-[#211d18]/10 pt-5">
                        <ExternalLink href={card.link}>{en ? "Official docs" : "Documentação oficial"}</ExternalLink>
                      </div>
                    )}
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section id="plugins-skills" className="liquid-divider">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <Reveal>
              <SpotlightCard className="h-full rounded-[32px] bg-[#211d18] p-8 md:p-10 text-[#f7f4ec] shadow-[0_28px_70px_-35px_rgba(33,29,24,0.7)]">
                <Kicker className="text-[#f7f4ec]/65">{en ? "Portable intelligence" : "Inteligência portátil"}</Kicker>
                <h2 className="mt-6 aether-font-display text-3xl font-bold uppercase tracking-tight text-white">
                  Agent Skills
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-[#f7f4ec]/70">
                  {en
                    ? "AetherCore follows the open Agent Skills standard: portable SKILL.md files can be shared by Claude Code, Cursor, Copilot, and Gemini CLI."
                    : "O AetherCore segue o padrão aberto Agent Skills: arquivos SKILL.md portáveis podem ser compartilhados pelo Claude Code, Cursor, Copilot e Gemini CLI."}
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {["Claude Code", "Cursor", "Copilot", "Gemini CLI", "MCP"].map((tag) => (
                    <span key={tag} className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#f7f4ec]/70">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-5">
                  <ExternalLink href="https://github.com/anthropics/skills">{en ? "Agent Skills" : "Agent Skills"}</ExternalLink>
                  <ExternalLink href="https://modelcontextprotocol.io">MCP</ExternalLink>
                </div>
              </SpotlightCard>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="aether-card h-full p-8 md:p-10" id="plugins-seguranca">
                <SectionHeader
                  showIndex={false}
                  kicker={PLUGINS.featuresTitle}
                  title={en ? "Permission before power." : "Permissão antes da potência."}
                  desc={PLUGINS.featuresDesc}
                />
                <div className="mt-8 space-y-4">
                  {PLUGINS.features.map((feature) => (
                    <div key={feature.title} className="flex items-start gap-3 rounded-2xl border border-[#211d18]/10 bg-white/55 p-4">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#A34A33]" weight="fill" />
                      <p className="text-sm leading-relaxed text-[#211d18]/70">
                        <span className="font-semibold text-[#211d18]">{feature.title}.</span> {feature.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaSection />
    </div>
  );
};

export default Plugins;
