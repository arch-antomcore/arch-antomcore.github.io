import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Container, Section, SectionHeader, Kicker, Reveal } from "@/components/site/primitives";
import PageHero from "@/components/site/PageHero";
import CtaSection from "@/components/site/CtaSection";
import { SpotlightCard, Magnetic, MagneticButton } from "@/components/site/interactions";
import SectionRail from "@/components/aether/SectionRail";
import { useTranslation } from "@/hooks/useTranslation";
import AnimateNumber from "@/components/animated-blur-number";
import {
  ShieldCheck,
  TrendUp,
  Buildings,
  Globe,
  Lock,
  ArrowUpRight,
  TerminalWindow,
  Cpu,
  CheckCircle,
  FileText,
  LinkedinLogo,
  Vault,
  Coins,
  CurrencyDollar as DollarSign
} from "@phosphor-icons/react";

const Validacao = () => {
  const { t, language } = useTranslation();
  const VALIDACAO = t.VALIDACAO;
  const [imgError, setImgError] = useState(false);

  const railItems = language === "pt"
    ? [
        { id: "validacao-hero", label: "01 · Resumo" },
        { id: "instituicao", label: "02 · Pacific Palm" },
        { id: "atuacao", label: "03 · Atuação" },
        { id: "stress-test", label: "04 · Teste de Fogo" },
        { id: "terminal-audit", label: "05 · Telemetria" },
        { id: "veredito", label: "06 · Veredito" },
        { id: "cta", label: "07 · Contato" },
      ]
    : [
        { id: "validacao-hero", label: "01 · Overview" },
        { id: "instituicao", label: "02 · Pacific Palm" },
        { id: "atuacao", label: "03 · Execution" },
        { id: "stress-test", label: "04 · Stress Test" },
        { id: "terminal-audit", label: "05 · Telemetry" },
        { id: "veredito", label: "06 · Verdict" },
        { id: "cta", label: "07 · Contact" },
      ];

  return (
    <div data-testid="validacao-page" className="relative overflow-hidden">
      <SectionRail items={railItems} />

      {/* Hero Section */}
      <div id="validacao-hero">
        <PageHero
          kicker={VALIDACAO.kicker}
          lines={VALIDACAO.title}
          lead={VALIDACAO.lead}
          ghostWord="¥45M"
          primary={{
            label: language === "en" ? "Talk to the Founder" : "Falar com o Fundador",
            href: "https://www.linkedin.com/company/pacific-palm-partners",
            isExternal: true
          }}
          secondary={{
            label: language === "en" ? "Explore Architecture" : "Ver Arquitetura",
            to: "/arquitetura"
          }}
        />
      </div>

      {/* Highlights Stats Bar */}
      <section className="relative z-10 -mt-10 mb-12">
        <Container>
          <Reveal variant="rise">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 md:p-8 rounded-[28px] bg-[#fbf9f2] border border-[#211d18]/10 shadow-[0_20px_50px_-20px_rgba(33,29,24,0.08)]">
              {VALIDACAO.stats.map((st, i) => (
                <div key={i} className="flex flex-col p-3 border-r last:border-r-0 border-[#211d18]/10">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#A34A33] font-semibold">
                    {st.label}
                  </span>
                  <span className="aether-font-display text-2xl md:text-3xl font-extrabold text-[#211d18] mt-1 tracking-tight">
                    {st.k}
                  </span>
                  <span className="text-xs text-[#211d18]/60 mt-1 leading-snug">
                    {st.sub}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Institution Profile Section */}
      <Section id="instituicao" className="liquid-divider">
        <Container>
          <SectionHeader
            kicker={language === "pt" ? "credenciais institucionais" : "institutional credentials"}
            title={language === "pt" ? "Pacific Palm Partners: A Fortaleza de Labuan." : "Pacific Palm Partners: The Labuan Fortress."}
            desc={language === "pt"
              ? "Um Private Hedge Fund e Venture Capital de raízes italianas, operando no Território Federal de Labuan (Malásia), que submeteu o AetherCore ao mais rígido teste de integridade financeira internacional."
              : "A Private Hedge Fund and Venture Capital with Italian heritage, operating in the Federal Territory of Labuan (Malaysia), subjecting AetherCore to the most rigorous international financial stress-tests."}
          />

          <div className="mt-14">
            <Reveal>
              <SpotlightCard
                as="article"
                cursorText="Hedge Fund"
                className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#fbf9f2] via-[#f7f4ec] to-[#ece7da] border border-[#211d18]/15 p-8 md:p-14 shadow-xl hover:border-[#A34A33]/50 transition-all duration-500"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  {/* Company Profile Left */}
                  <div className="lg:col-span-7 flex flex-col items-start gap-6">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="h-16 w-16 md:h-20 md:md:w-20 rounded-2xl bg-[#211d18] p-2 flex items-center justify-center shadow-lg border border-white/10 shrink-0">
                        <img
                          src={imgError ? VALIDACAO.partner.fallbackLogoUrl : VALIDACAO.partner.logoUrl}
                          alt={VALIDACAO.partner.name}
                          onError={() => setImgError(true)}
                          className="h-full w-full object-contain rounded-xl"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#A34A33]/10 text-[#A34A33] font-mono text-[10px] font-bold uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#A34A33] animate-ping" />
                            {language === "pt" ? "Operação Offshore Homologada" : "Verified Offshore Operation"}
                          </span>
                        </div>
                        <h3 className="aether-font-display text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-[#211d18] mt-1">
                          {VALIDACAO.partner.name}
                        </h3>
                        <p className="font-mono text-xs text-[#211d18]/60 mt-0.5">
                          {VALIDACAO.partner.sector}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm md:text-base text-[#211d18]/80 leading-relaxed max-w-2xl">
                      {VALIDACAO.partner.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pt-2">
                      <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/60 border border-[#211d18]/10">
                        <Globe className="h-5 w-5 text-[#A34A33] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[#211d18]/50 block">
                            {language === "pt" ? "Jurisdição / Sede" : "Jurisdiction / HQ"}
                          </span>
                          <span className="text-xs font-semibold text-[#211d18] leading-tight block mt-0.5">
                            {VALIDACAO.partner.location}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/60 border border-[#211d18]/10">
                        <Buildings className="h-5 w-5 text-[#A34A33] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[#211d18]/50 block">
                            {language === "pt" ? "Governança & Origem" : "Governance & Origin"}
                          </span>
                          <span className="text-xs font-semibold text-[#211d18] leading-tight block mt-0.5">
                            {VALIDACAO.partner.origin}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Magnetic strength={0.3}>
                        <a
                          href={VALIDACAO.partner.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#211d18] text-[#f7f4ec] hover:bg-[#A34A33] font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-md hover:shadow-xl"
                        >
                          <LinkedinLogo className="h-4 w-4" weight="fill" />
                          {language === "pt" ? "Página Oficial no LinkedIn" : "Official LinkedIn Company Page"}
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      </Magnetic>
                    </div>
                  </div>

                  {/* Financial & Volume Badge Right */}
                  <div className="lg:col-span-5 flex flex-col gap-5">
                    <div className="p-8 rounded-[28px] bg-[#211d18] text-[#f7f4ec] shadow-2xl relative overflow-hidden border border-white/10">
                      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                        <Vault className="h-32 w-32" />
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#A34A33] font-bold block mb-2">
                        {language === "pt" ? "Volume Transacionado Anual" : "Annual Turnover Audited"}
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="aether-font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                          ¥45.000.000+
                        </span>
                      </div>
                      <span className="font-mono text-xs text-zinc-400 block mt-2">
                        {language === "pt" ? "RMB anuais em arbitragem e ativos cross-border" : "RMB yearly in cross-border arbitrage & assets"}
                      </span>

                      <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-3">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-zinc-400">{language === "pt" ? "Status da Sandbox:" : "Sandbox Status:"}</span>
                          <span className="text-emerald-400 font-semibold">{language === "pt" ? "Homologada 100% Local" : "100% Local Homologated"}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-zinc-400">{language === "pt" ? "Vazamento para Nuvem:" : "Cloud Data Telemetry:"}</span>
                          <span className="text-emerald-400 font-semibold">{language === "pt" ? "0 Bytes (Zero Telemetria)" : "0 Bytes (Zero Telemetry)"}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-zinc-400">{language === "pt" ? "Linguagem do Core:" : "Core Engine:"}</span>
                          <span className="text-zinc-200 font-semibold">Rust Nativo + SQLite</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Founder's Executive Role Section */}
      <Section id="atuacao" className="liquid-divider">
        <Container>
          <SectionHeader
            kicker={VALIDACAO.founderRole.kicker}
            title={VALIDACAO.founderRole.title}
            desc={language === "pt"
              ? "A ponte direta entre a vanguarda tecnológica do AetherCore e as exigências reais de um Private Hedge Fund internacional."
              : "The direct bridge between AetherCore's technical vanguard and the real-world demands of an international Private Hedge Fund."}
          />

          <div className="mt-14">
            <div className="mb-8 p-6 rounded-2xl bg-[#A34A33]/[0.06] border border-[#A34A33]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#A34A33] font-bold block">
                  {VALIDACAO.founderRole.workplace}
                </span>
                <h4 className="aether-font-display text-xl md:text-2xl font-bold uppercase text-[#211d18] mt-1">
                  {VALIDACAO.founderRole.subtitle}
                </h4>
              </div>
              <span className="font-mono text-xs px-3.5 py-1.5 rounded-full bg-[#211d18] text-[#f7f4ec] font-semibold">
                Labuan, Malaysia
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {VALIDACAO.founderRole.duties.map((duty, idx) => (
                <Reveal key={idx} delay={idx * 0.1}>
                  <SpotlightCard
                    as="article"
                    cursorText={`0${idx + 1}`}
                    className="flex h-full flex-col justify-between rounded-[28px] bg-[#fbf9f2] border border-[#211d18]/10 p-8 hover:border-[#A34A33] hover:-translate-y-1 transition-all duration-500"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="aether-font-serif italic text-[#A34A33] text-3xl font-normal">
                          0{idx + 1}
                        </span>
                        <Cpu className="h-6 w-6 text-[#211d18]/40" />
                      </div>
                      <h3 className="aether-font-display font-bold uppercase text-lg text-[#211d18] tracking-tight leading-snug">
                        {duty.title}
                      </h3>
                      <p className="mt-4 text-sm text-[#211d18]/70 leading-relaxed">
                        {duty.desc}
                      </p>
                    </div>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Stress-Test & Hard Evidence Matrix */}
      <Section id="stress-test" className="liquid-divider">
        <Container>
          <SectionHeader
            kicker={VALIDACAO.stressTest.kicker}
            title={VALIDACAO.stressTest.title}
            desc={VALIDACAO.stressTest.desc}
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {VALIDACAO.stressTest.pillars.map((pillar, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <SpotlightCard
                  as="article"
                  cursorText={pillar.tag}
                  className="flex h-full flex-col justify-between rounded-[28px] bg-[#fbf9f2] border border-[#211d18]/10 p-8 md:p-10 hover:border-[#A34A33] transition-all duration-500"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A34A33]/10 text-[#A34A33] font-mono text-[10px] font-bold uppercase tracking-wider">
                        {pillar.badge}
                      </span>
                      <span className="aether-font-serif italic text-2xl text-[#211d18]/30">
                        {pillar.n}
                      </span>
                    </div>
                    <h3 className="aether-font-display font-extrabold uppercase text-xl md:text-2xl text-[#211d18] tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="mt-4 text-sm md:text-base text-[#211d18]/70 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Interactive Offshore Audit Terminal Simulation */}
      <Section id="terminal-audit" className="liquid-divider">
        <Container>
          <SectionHeader
            kicker={VALIDACAO.terminal.kicker}
            title={VALIDACAO.terminal.title}
            desc={language === "pt"
              ? "Inspeção visual da sandbox em Rust executando localmente a compilação de dados de ¥45M+ sem enviar pacotes para a rede."
              : "Visual inspection of the Rust sandbox running local ¥45M+ data compilation with zero outbound network packets."}
          />

          <div className="mt-12">
            <Reveal>
              <div className="rounded-[28px] bg-[#121110] border border-white/15 p-6 md:p-8 shadow-2xl overflow-hidden text-zinc-300 font-mono text-xs md:text-sm">
                {/* Terminal Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500/80" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-3 text-zinc-400 text-xs">{VALIDACAO.terminal.filename}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] uppercase tracking-wider font-bold">
                    {VALIDACAO.terminal.badge}
                  </span>
                </div>

                {/* Terminal Body */}
                <div className="space-y-3 font-mono leading-relaxed overflow-x-auto">
                  {VALIDACAO.terminal.lines.map((line, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08, duration: 0.4 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-[#A34A33] select-none shrink-0">&gt;</span>
                      <span className={line.includes("HARD BLOCKED") || line.includes("100% local") ? "text-emerald-400 font-semibold" : line.includes("Target Volume") ? "text-amber-300 font-semibold" : "text-zinc-300"}>
                        {line}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Institutional Verdict Quote Section */}
      <Section id="veredito" className="liquid-divider">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#211d18] to-[#2c2720] text-[#f7f4ec] p-10 md:p-16 border border-white/10 shadow-2xl">
              <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#A34A33] font-bold">
                  {VALIDACAO.verdict.kicker}
                </span>

                <blockquote className="aether-font-display text-xl sm:text-2xl md:text-3xl font-bold uppercase leading-tight tracking-tight text-white">
                  &ldquo;{VALIDACAO.verdict.quote}&rdquo;
                </blockquote>

                <div className="pt-4 flex flex-col items-center gap-2">
                  <span className="font-mono text-sm font-semibold text-zinc-300">
                    {VALIDACAO.verdict.author}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[10px] uppercase tracking-wider font-semibold">
                    <CheckCircle className="h-3.5 w-3.5" weight="fill" />
                    {VALIDACAO.verdict.badge}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* CTA Section */}
      <CtaSection />
    </div>
  );
};

export default Validacao;
