import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { Container, Section, SectionHeader, Reveal } from "@/components/site/primitives";

/* Map each comparison feature to a risk level (bilingual badges) */
const FEATURE_METAS = [
  { risk: "critical", badgePt: "Incompatível", badgeEn: "Incompatible" },
  { risk: "high", badgePt: "Dados expostos", badgeEn: "Data exposed" },
  { risk: "medium", badgePt: "Limitado", badgeEn: "Limited" },
  { risk: "high", badgePt: "Sem registro", badgeEn: "No logs" },
  { risk: "critical", badgePt: "Zero controle", badgeEn: "Zero control" },
  { risk: "medium", badgePt: "Depende de internet", badgeEn: "Requires internet" },
];

/* Individual comparison row — clean editorial grid with subtle hover accentuation */
const ComparisonRow = ({ row, index, language }) => {
  const meta = FEATURE_METAS[index] || { risk: "medium", badgePt: "Risco", badgeEn: "Risk" };
  const isCritical = meta.risk === "critical";
  const isHigh = meta.risk === "high";

  return (
    <Reveal delay={index * 0.05}>
      <div 
        className="border-b border-[#211d18]/10 py-6 md:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-baseline transition-all duration-300 hover:bg-[#211d18]/[0.015] px-4 -mx-4 rounded-xl"
        data-testid={`compare-row-${index}`}
      >
        {/* Category Name */}
        <div className="md:col-span-3 flex flex-col justify-center">
          <span className="font-mono text-[10px] text-[#211d18]/40 tracking-wider">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h4 className="aether-font-display text-base md:text-lg font-bold uppercase tracking-tight text-[#211d18] mt-0.5">
            {row.feat}
          </h4>
          <div className="flex items-center gap-1.5 mt-2">
            <span className={`w-1.5 h-1.5 rounded-full ${isCritical ? "bg-[#A34A33] animate-pulse" : isHigh ? "bg-[#A34A33]/70" : "bg-[#211d18]/30"}`} />
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#211d18]/50">
              {language === "en"
                ? (meta.risk === "critical" ? "critical risk" : meta.risk === "high" ? "high risk" : "attention")
                : (meta.risk === "critical" ? "risco crítico" : meta.risk === "high" ? "risco alto" : "atenção")}
            </span>
          </div>
        </div>

        {/* Cloud Column */}
        <div className="md:col-span-4 md:col-start-4 pr-0 md:pr-4">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#211d18]/35 block mb-1.5">
            // {language === "en" ? "CLOUD CHATBOT" : "CHATBOT NA NUVEM"}
          </span>
          <p className="text-sm text-[#211d18]/55 leading-relaxed font-sans flex items-start gap-2">
            <span className="text-red-500/60 font-bold shrink-0 mt-0.5" aria-hidden="true">×</span>
            <span>{row.cloud}</span>
          </p>
        </div>

        {/* AetherCore Column */}
        <div className="md:col-span-5 md:col-start-8 pl-0 md:pl-4">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#A34A33]/80 block mb-1.5 font-semibold">
            // {language === "en" ? "AETHERCORE LOCAL-FIRST" : "AETHERCORE LOCAL-FIRST"}
          </span>
          <p className="text-sm text-[#211d18] font-medium leading-relaxed font-sans flex items-start gap-2">
            <span className="text-[#A34A33] font-bold shrink-0 mt-0.5" aria-hidden="true">✓</span>
            <span>{row.aether}</span>
          </p>
        </div>
      </div>
    </Reveal>
  );
};

/* Score summary banner — clean typographic numbers with no card borders */
const ScoreSummary = ({ CASOS, language }) => {
  const cloudRisks = CASOS.compare.length;
  const aetherSafe = CASOS.compare.length;
  const criticalCount = CASOS.compare.filter(
    (r, idx) => FEATURE_METAS[idx]?.risk === "critical"
  ).length;

  return (
    <Reveal>
      <div className="mt-12 mb-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-t border-b border-[#211d18]/10 py-10">
        {/* Column 1: Cloud Risks */}
        <div className="relative">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#211d18]/45 block mb-2">
            {language === "en" ? "Cloud Chatbot" : "Chatbot na Nuvem"}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-6xl md:text-7xl font-extrabold tracking-tighter text-[#211d18] leading-none aether-font-display">
              {cloudRisks}
            </span>
            <span className="text-lg text-[#211d18]/40 font-mono">/ {cloudRisks}</span>
          </div>
          <p className="mt-3 text-xs text-[#211d18]/60 leading-relaxed max-w-xs">
            {language === "en" 
              ? "vulnerabilities and compliance gaps detected in third-party environments."
              : "vulnerabilidades e brechas de conformidade detectadas em ambientes terceirizados."}
          </p>
        </div>

        {/* Column 2: Regulatory Risk */}
        <div className="relative md:border-l md:border-[#211d18]/10 md:pl-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#211d18]/45 block mb-2">
            {language === "en" ? "Regulatory Risk" : "Risco Regulatório"}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-6xl md:text-7xl font-extrabold tracking-tighter text-[#A34A33] leading-none aether-font-display">
              {criticalCount}
            </span>
            <span className="text-lg text-[#A34A33]/60 font-mono">
              {language === "en" ? "critical" : "críticos"}
            </span>
          </div>
          <p className="mt-3 text-xs text-[#211d18]/60 leading-relaxed max-w-xs">
            {language === "en"
              ? "imminent violations under GDPR / LGPD regulations for cloud-based storage."
              : "violações iminentes sob as normas da LGPD por armazenamento em nuvem."}
          </p>
        </div>

        {/* Column 3: AetherCore Compliance */}
        <div className="relative md:border-l md:border-[#211d18]/10 md:pl-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#A34A33] block mb-2 font-semibold">
            AetherCore Local-First
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-6xl md:text-7xl font-extrabold tracking-tighter text-[#211d18] leading-none aether-font-display">
              {aetherSafe}
            </span>
            <span className="text-lg text-[#211d18]/40 font-mono">/ {aetherSafe}</span>
          </div>
          <p className="mt-3 text-xs text-[#211d18]/60 leading-relaxed max-w-xs">
            {language === "en"
              ? "categories fully compliant with on-premise execution by design."
              : "categorias em conformidade total através de execução on-premise."}
          </p>
        </div>
      </div>
    </Reveal>
  );
};

/* Column legend header */
const ComparisonLegend = ({ language }) => (
  <Reveal className="mb-6 hidden md:block">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 px-4">
      <div className="md:col-span-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#211d18]/40 font-semibold">
          {language === "en" ? "Category" : "Categoria"}
        </span>
      </div>
      <div className="md:col-span-4 md:col-start-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#211d18]/40 font-semibold">
          {language === "en" ? "Cloud Chatbots" : "Chatbots Comuns na Nuvem"}
        </span>
      </div>
      <div className="md:col-span-5 md:col-start-8 pl-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#A34A33] font-bold">
          AetherCore Local-First
        </span>
      </div>
    </div>
  </Reveal>
);

/* Full comparison section */
const ComparisonTable = () => {
  const { t, language } = useTranslation();
  const CASOS = t.CASOS;

  return (
    <Section className="liquid-divider bg-[#f4f1e8]" id="comparison-section">
      <Container>
        <SectionHeader
          kicker={CASOS.compareKicker}
          title={CASOS.compareTitle}
          desc={CASOS.compareDesc}
        />

        <ScoreSummary CASOS={CASOS} language={language} />
        <ComparisonLegend language={language} />

        <div className="flex flex-col gap-1">
          {CASOS.compare.map((row, i) => (
            <ComparisonRow key={row.feat} row={row} index={i} language={language} />
          ))}
        </div>

        {/* Bottom verdict */}
        <Reveal className="mt-16">
          <div className="border-l-2 border-[#A34A33] pl-6 md:pl-10 py-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#A34A33] block mb-3 font-semibold">
              // {language === "en" ? "VERDICT" : "VEREDICTO"}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-[#211d18] aether-font-display leading-tight max-w-3xl">
              {language === "en" ? "Local sovereignty eliminates risk at the root." : "Soberania local elimina o risco na raiz."}
            </h3>
            <p className="mt-4 max-w-2xl text-base text-[#211d18]/70 leading-relaxed font-sans">
              {language === "en"
                ? "While cloud chatbots create compliance liabilities, AetherCore processes everything on-device with human approval and auditable logs."
                : "Enquanto chatbots na nuvem criam passivos regulatórios, o AetherCore processa tudo no dispositivo com aprovação humana e logs auditáveis."}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
};

export default ComparisonTable;
