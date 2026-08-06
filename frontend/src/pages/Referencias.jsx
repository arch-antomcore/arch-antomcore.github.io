import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Container, Section, SectionHeader, Kicker, Reveal } from "@/components/site/primitives";
import PageHero from "@/components/site/PageHero";
import CtaSection from "@/components/site/CtaSection";
import { CodeBlock, CodeBlockCode, CodeBlockGroup } from "@/components/ui/code-block";
import { SpotlightCard } from "@/components/site/interactions";
import { MEDIA } from "@/components/aether/GlassMedia";
import { Camera } from "@phosphor-icons/react";

const configCode = `[agent]
id = "aether-local-supervisor"
sandbox = true
approval_gate = "always_prompt"

[security]
isolation_level = "strict"
allow_network = false
crawlers_policy = "block_all"

[database]
engine = "sqlite"
connection = "sqlite://dev.db"
cache_size_mb = 256

[uplink]
port = 5432
host = "127.0.0.1"`;

const Referencias = () => {
  const { t, language } = useTranslation();
  const REFERENCIAS = t.REFERENCIAS;

  return (
    <div data-testid="referencias-page">
      <PageHero
        kicker={REFERENCIAS.kicker}
        lines={[REFERENCIAS.title]}
        lead={REFERENCIAS.lead}
        primary={{ 
          label: language === "en" ? "View principles" : "Ver princípios", 
          to: "/principios" 
        }}
        secondary={{ 
          label: language === "en" ? "View privacy" : "Ver privacidade", 
          to: "/privacidade" 
        }}
      />

      <Section className="liquid-divider">
        <Container>
          <SectionHeader
            kicker={REFERENCIAS.introKicker}
            title={REFERENCIAS.introTitle}
            desc={REFERENCIAS.introDesc}
          />
          <div className="mt-14 grid gap-8 lg:grid-cols-12 items-start">
            <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
              {REFERENCIAS.items.map((r, i) => (
                <Reveal key={r.tag} delay={i * 0.05}>
                  <SpotlightCard className="rounded-[24px] liquid-glass p-6 hover:border-white/20 transition-all duration-300">
                    <Kicker>{r.tag}</Kicker>
                    <h3 className="mt-4 text-base font-medium tracking-tight text-white">{r.t}</h3>
                    <p className="mt-2 text-xs text-zinc-400 leading-relaxed">{r.d}</p>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>

            <div id="configuracao" className="lg:col-span-5 w-full">
              <Reveal delay={0.2}>
                <div className="flex flex-col gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                    {language === "en" ? "Declarative configuration" : "Configuração declarativa"}
                  </span>
                  <CodeBlock className="border-white/10 bg-zinc-950/95 shadow-2xl rounded-2xl w-full overflow-hidden">
                    <CodeBlockGroup className="border-b border-white/5 bg-zinc-950/40 px-4 py-3 flex justify-between items-center">
                      <span className="font-mono text-[10px] text-zinc-400">aether.toml</span>
                      <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest">
                        {language === "en" ? "local sandbox" : "sandbox local"}
                      </span>
                    </CodeBlockGroup>
                    <CodeBlockCode
                      code={configCode}
                      language="toml"
                      theme="github-dark"
                    />
                  </CodeBlock>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Media credits — imagery/video used across the site */}
      <Section className="liquid-divider !pt-0" id="creditos-midia">
        <Container>
          <SectionHeader
            kicker={language === "en" ? "media credits" : "créditos de mídia"}
            title={language === "en" ? "Imagery & footage." : "Imagens & vídeos."}
            desc={
              language === "en"
                ? "All photography and footage used on this site is free for commercial use under the Unsplash and Pexels licenses. Full credit to the artists below."
                : "Todas as fotografias e vídeos usados neste site são liberados para uso comercial sob as licenças Unsplash e Pexels. Crédito integral aos artistas abaixo."
            }
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="media-credits-grid">
            {Object.entries(MEDIA).map(([key, m], i) => (
              <Reveal key={key} delay={i * 0.05}>
                <a
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="aether-card group flex h-full flex-col p-6"
                  data-testid={`media-credit-card-${key}`}
                >
                  <div className="flex items-start justify-between">
                    <span className="aether-card-icon !h-11 !w-11 !rounded-xl">
                      <Camera className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#211d18]/35">
                      {m.source}
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-semibold tracking-tight text-[#211d18] group-hover:text-[#A34A33] transition-colors duration-300">
                    {m.author}
                  </h3>
                  <p className="mt-1.5 flex-1 text-xs leading-relaxed text-[#211d18]/55">{m.alt}</p>
                  <span className="mt-4 font-mono text-[9px] uppercase tracking-[0.24em] text-[#211d18]/40">
                    {m.src.includes(".mp4")
                      ? language === "en" ? "Video · Pexels License" : "Vídeo · Licença Pexels"
                      : language === "en" ? "Photo · Unsplash License" : "Foto · Licença Unsplash"}
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaSection />
    </div>
  );
};

export default Referencias;
