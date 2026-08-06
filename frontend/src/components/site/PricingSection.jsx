import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Check, Minus, Warning as AlertTriangle, Cpu, HardDrives as Server, Lightning as Zap, Shield } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { Container, Section, Reveal } from "@/components/site/primitives";
import { MagneticButton, Magnetic } from "@/components/site/interactions";

const NOISE_PATTERN =
  'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.04), transparent 85%)';

/* --------------------------------------------------------------------------
   Editorial pricing — dark ink stage, tangerine accent, numbered plans.
   ------------------------------------------------------------------------ */


const easeExpo = [0.16, 1, 0.3, 1];

/* Billing toggle — animated spring pill with integrated -20% badge */
const BillingToggle = ({ isAnnual, setIsAnnual, text, annualLabel }) => (
  <div
    data-testid="billing-toggle-glass"
    className="relative grid grid-cols-2 items-center rounded-full border border-white/12 bg-white/[0.05] p-1.5 backdrop-blur-xl"
  >
    <motion.div
      aria-hidden="true"
      layout
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
      className="absolute inset-y-1.5 left-1.5 w-[calc(50%-6px)] rounded-full bg-[#A34A33] shadow-[0_4px_16px_rgba(163, 74, 51,0.4)]"
      style={{
        left: isAnnual ? "calc(50% + 3px)" : "6px",
      }}
    />
    <button
      onClick={() => setIsAnnual(false)}
      className={`relative z-10 flex items-center justify-center rounded-full py-2 font-mono text-[10px] font-bold uppercase tracking-[0.24em] transition-colors duration-300 ${
        !isAnnual ? "text-white" : "text-white/45 hover:text-white/70"
      }`}
    >
      {text.monthly}
    </button>
    <button
      onClick={() => setIsAnnual(true)}
      className={`relative z-10 flex items-center justify-center gap-2 rounded-full py-2 font-mono text-[10px] font-bold uppercase tracking-[0.24em] transition-colors duration-300 ${
        isAnnual ? "text-white" : "text-white/45 hover:text-white/70"
      }`}
    >
      {annualLabel}
      <span
        className={`rounded-full px-2 py-0.5 text-[9px] font-bold tracking-wider transition-colors duration-300 ${
          isAnnual ? "bg-white text-[#A34A33]" : "bg-[#A34A33]/20 text-[#A34A33]"
        }`}
      >
        -20%
      </span>
    </button>
  </div>
);

const cardVariants = {
  hidden: { opacity: 0, y: 64 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay: index * 0.12, ease: easeExpo }
  })
};

/* Numbered editorial plan card with smooth 3D tilt & spotlight tracking */
const PlanCard = ({ plan, index, isAnnual, lang, labels }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const isCustom = plan.priceMonthly === null;
  const isFree = plan.priceMonthly === 0;
  const price = isAnnual ? plan.priceYearly : plan.priceMonthly;
  const currency = lang === "en" ? "$" : "R$";
  const period = isAnnual ? (lang === "en" ? "yr" : "ano") : (lang === "en" ? "mo" : "mês");
  const rec = plan.recommended;
  const PlanIcon = plan.id === "free" ? Cpu : plan.id === "go" ? Zap : Server;

  const rectRef = useRef(null);
  const rafRef = useRef(null);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    if (!rectRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
    const rect = rectRef.current;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = Number((((y - centerY) / centerY) * -6).toFixed(2));
      const rotateY = Number((((x - centerX) / centerX) * 6).toFixed(2));

      setTilt({ x: rotateX, y: rotateY });
    });
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setTilt({ x: 0, y: 0 });
  };

  const isHovered = tilt.x !== 0 || tilt.y !== 0;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        y: rec ? (isHovered ? -28 : -16) : (isHovered ? -14 : 0),
        scale: isHovered ? 1.025 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 22,
        mass: 0.5,
      }}
      data-plan={plan.id}
      data-testid={`pricing-card-${plan.id}`}
      className={`group/card relative flex flex-col overflow-hidden rounded-[28px] p-8 md:p-10 transition-all duration-500 ${
        rec
          ? "border-2 border-[#A34A33] bg-[#17130c] shadow-[0_20px_50px_-15px_rgba(163,74,51,0.35)] hover:shadow-[0_32px_80px_-10px_rgba(163,74,51,0.6)]"
          : "border border-white/12 bg-[#12100a] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_32px_64px_-28px_rgba(0,0,0,0.7)] hover:border-[#A34A33]/60 hover:shadow-[0_28px_65px_-12px_rgba(163,74,51,0.35)]"
      }`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: NOISE_PATTERN }}
      />
      {rec && (
        <div
          aria-hidden="true"
          className="absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-72 rounded-full bg-[#A34A33]/25 blur-[80px] pointer-events-none transition-transform duration-500 group-hover/card:scale-125"
        />
      )}

      {/* Numbering row */}
      <div className="relative z-10 flex items-center justify-between">
        <span className={`font-mono text-xs font-semibold tracking-[0.3em] ${rec ? "text-[#A34A33]" : "text-white/35"}`}>
          //{String(index + 1).padStart(2, "0")}
        </span>
        {rec && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#A34A33] px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-white shadow-[0_8px_20px_-6px_rgba(163,74,51,0.6)] transition-transform duration-300 group-hover/card:scale-105">
            {labels.recommended}
          </span>
        )}
      </div>

      {/* Name */}
      <div className="relative z-10 mt-7 flex items-center gap-3.5">
        <span
          className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border transition-all duration-300 group-hover/card:scale-110 ${
            rec
              ? "border-[#A34A33]/60 bg-[#A34A33]/25 text-[#A34A33] shadow-[0_0_20px_rgba(163,74,51,0.4)]"
              : "border-white/12 bg-white/[0.06] text-white/70 group-hover/card:border-[#A34A33]/50 group-hover/card:bg-[#A34A33]/15 group-hover/card:text-[#A34A33]"
          }`}
        >
          <PlanIcon className="h-5 w-5 transition-transform duration-300 group-hover/card:rotate-6" strokeWidth={1.6} />
        </span>
        <h3 className="aether-font-display text-xl md:text-2xl font-bold uppercase tracking-tight text-white transition-colors duration-300 group-hover/card:text-white">
          {plan.name}
        </h3>
      </div>

      <p className="relative z-10 mt-4 min-h-[40px] text-sm leading-relaxed text-white/50">{plan.description}</p>

      {/* Price */}
      <div className="relative z-10 mt-7 flex items-baseline gap-1.5">
        {isCustom ? (
          <div className="flex h-[68px] items-center overflow-hidden">
            <span className="aether-font-display text-3xl md:text-4xl font-bold tracking-tight text-white">
              {labels.uponRequest}
            </span>
          </div>
        ) : (
          <>
            <span className="text-xl font-medium text-white/40">{currency}</span>
            <div className="flex h-[68px] items-center overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={`${plan.id}-${isAnnual}`}
                  initial={{ y: 48, opacity: 0, filter: "blur(5px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -48, opacity: 0, filter: "blur(5px)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className={`aether-font-display block font-extrabold leading-none tracking-tighter text-white tabular-nums ${
                    String(isFree ? 0 : price).length > 3 ? "text-[42px] md:text-[50px]" : "text-[56px] md:text-[64px]"
                  }`}
                >
                  {isFree ? "0" : price}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="ml-1 text-base font-medium text-white/40">/{period}</span>
          </>
        )}
      </div>

      <div className={`relative z-10 my-7 h-px w-full transition-colors duration-300 ${rec ? "bg-[#A34A33]/40" : "bg-white/10 group-hover/card:bg-white/20"}`} />

      {/* Features */}
      <div className="relative z-10 mb-10 flex flex-1 flex-col gap-3.5">
        <span className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-white/40">
          {plan.users}
        </span>
        {plan.features
          .filter((f) => f.included)
          .slice(0, 7)
          .map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.05, ease: easeExpo }}
              className="flex items-start gap-3 transition-transform duration-300 group-hover/card:translate-x-1"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#A34A33]/40 bg-[#A34A33]/15 transition-all duration-300 group-hover/card:scale-110 group-hover/card:bg-[#A34A33] group-hover/card:text-white">
                <Check className="h-3 w-3 text-[#A34A33] transition-colors duration-300 group-hover/card:text-white" strokeWidth={3} />
              </span>
              <span className="text-[13px] font-medium leading-tight text-white/75 transition-colors duration-300 group-hover/card:text-white">{feat.label}</span>
            </motion.div>
          ))}
      </div>

      {/* CTA */}
      <div className="relative z-10">
        <Magnetic strength={0.18} className="!block w-full">
          <Link
            to="/#cta"
            data-testid={`pricing-cta-${plan.id}`}
            data-cursor="hover"
            className={`block w-full rounded-2xl py-4 text-center text-[14px] font-semibold transition-all duration-300 transform ${
              rec
                ? "bg-[#A34A33] text-white shadow-[0_18px_44px_-14px_rgba(163,74,51,0.65)] hover:bg-[#8b3d29] hover:shadow-[0_24px_54px_-10px_rgba(163,74,51,0.85)] hover:-translate-y-0.5"
                : "border border-white/20 bg-white/[0.06] text-white hover:border-[#A34A33] hover:bg-[#A34A33] hover:text-white hover:shadow-[0_18px_44px_-14px_rgba(163,74,51,0.5)] hover:-translate-y-0.5"
            }`}
          >
            {isCustom ? labels.contact : labels.getStarted}
          </Link>
        </Magnetic>
      </div>
    </motion.div>
  );
};

/* Feature comparison matrix with animated check-ins */
const FEATURE_MATRIX = {
  pt: {
    heading: "Compare os planos em detalhe",
    cols: ["Free", "Go", "Enterprise"],
    rows: [
      { f: "Agente local persistente", v: [false, true, true] },
      { f: "Leitura e escrita local de XLSX/CSV", v: [false, true, true] },
      { f: "Aprovação humana de ações", v: ["demo", true, "granular"] },
      { f: "Logs ARL auditáveis", v: [false, "local", "exportáveis"] },
      { f: "Permissões por usuário e pasta", v: [false, false, true] },
      { f: "Workspace multiusuário", v: [false, false, "até 3"] },
      { f: "Dados enviados para a nuvem", v: ["sandbox", "0 bytes", "0 bytes"] },
      { f: "Suporte prioritário", v: [false, false, true] },
    ],
  },
  en: {
    heading: "Compare plans in detail",
    cols: ["Free", "Go", "Enterprise"],
    rows: [
      { f: "Persistent local agent", v: [false, true, true] },
      { f: "Local XLSX/CSV read & write", v: [false, true, true] },
      { f: "Human approval of actions", v: ["demo", true, "granular"] },
      { f: "Auditable ARL logs", v: [false, "local", "exportable"] },
      { f: "Per-user & folder permissions", v: [false, false, true] },
      { f: "Multi-user workspace", v: [false, false, "up to 3"] },
      { f: "Data sent to the cloud", v: ["sandbox", "0 bytes", "0 bytes"] },
      { f: "Priority support", v: [false, false, true] },
    ],
  },
};

const MatrixCell = ({ value, delay }) => {
  if (value === true)
    return (
      <motion.span
        initial={{ scale: 0, rotate: -90 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 380, damping: 22, delay }}
        className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#A34A33]/35 bg-[#A34A33]/15"
      >
        <Check className="h-3.5 w-3.5 text-[#A34A33]" strokeWidth={3} />
      </motion.span>
    );
  if (value === false)
    return (
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay }}
        className="inline-flex h-6 w-6 items-center justify-center"
      >
        <Minus className="h-3.5 w-3.5 text-white/25" strokeWidth={2} />
      </motion.span>
    );
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: easeExpo }}
      className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white/65"
    >
      {value}
    </motion.span>
  );
};

const FeatureMatrix = ({ language }) => {
  const m = FEATURE_MATRIX[language] || FEATURE_MATRIX.pt;
  return (
    <Reveal className="mt-20 md:mt-28">
      <div
        data-testid="pricing-feature-matrix"
        className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02]"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 md:px-8">
          <span className="aether-card-label text-white/60">{m.heading}</span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 md:block">
            //MATRIX
          </span>
        </div>
        <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr] border-b border-white/10 bg-white/[0.03] px-6 py-3.5 md:px-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
            {language === "en" ? "Feature" : "Recurso"}
          </span>
          {m.cols.map((c, i) => (
            <span
              key={c}
              className={`text-center font-mono text-[10px] font-semibold uppercase tracking-[0.2em] ${
                i === 1 ? "text-[#A34A33]" : "text-white/55"
              }`}
            >
              {c}
            </span>
          ))}
        </div>
        {m.rows.map((row, r) => (
          <div
            key={row.f}
            className="grid grid-cols-[1.6fr_1fr_1fr_1fr] items-center border-b border-white/[0.06] px-6 py-4 transition-colors duration-300 last:border-b-0 hover:bg-white/[0.03] md:px-8"
          >
            <span className="pr-4 text-[13px] font-medium text-white/70">{row.f}</span>
            {row.v.map((v, c) => (
              <span key={c} className={`flex justify-center ${c === 1 ? "relative" : ""}`}>
                <MatrixCell value={v} delay={r * 0.05 + c * 0.04} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </Reveal>
  );
};

const PricingStage = ({ PRICING, language, labels, text }) => {
  const [isAnnual, setIsAnnual] = useState(false);
  const stageRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start end", "end start"] });
  const auroraY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const auroraOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0.04, 0.16, 0.16, 0.04]);

  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [
      "inset(0% 4% 0% 4% round 48px)",
      "inset(0% 0% 0% 0% round 0px)",
      "inset(0% 0% 0% 0% round 0px)",
      "inset(0% 4% 0% 4% round 48px)"
    ]
  );

  return (
    <motion.div
      ref={stageRef}
      style={{ clipPath }}
      data-testid="pricing-stage"
      data-anim-scope="pricing-stage"
      className="relative overflow-hidden bg-[#0b0a08] text-white"
    >
      {/* Tangerine aurora */}
      <motion.div
        aria-hidden="true"
        style={{ y: auroraY, opacity: auroraOpacity }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]"
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle_at_center,rgba(163, 74, 51,0.5),rgba(255,90,38,0.12)_48%,transparent_75%)]" />
      </motion.div>

      {/* Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 78% 62% at 50% 45%, #000 0%, transparent 74%)",
          WebkitMaskImage: "radial-gradient(ellipse 78% 62% at 50% 45%, #000 0%, transparent 74%)",
        }}
      />

      {/* Grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{ backgroundImage: NOISE_PATTERN }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-44 md:px-12 md:py-56">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="flex flex-col items-center gap-6 text-center"
        >
          <motion.span
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeExpo } } }}
            className="inline-flex items-center font-mono text-[11px] uppercase tracking-[0.3em] text-white/50 md:text-xs"
          >
            <span className="mr-2 text-[#A34A33]">//</span>
            {PRICING.kicker}
          </motion.span>
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeExpo } } }}
            className="aether-font-display max-w-4xl text-4xl font-extrabold uppercase leading-[0.98] text-white sm:text-5xl md:text-6xl"
          >
            {Array.isArray(PRICING.title) ? PRICING.title.join(" ") : PRICING.title}
          </motion.h2>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeExpo } } }}
            className="max-w-2xl text-base leading-relaxed text-white/55 md:text-lg"
          >
            {PRICING.lead}
          </motion.p>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeExpo } } }}
            className="mt-4"
          >
            <BillingToggle
              isAnnual={isAnnual}
              setIsAnnual={setIsAnnual}
              text={text}
              annualLabel={PRICING.annualLabel}
            />
          </motion.div>
        </motion.div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 items-stretch gap-6 md:mt-24 md:grid-cols-3 lg:gap-8">
          {PRICING.plans.slice(0, 3).map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} index={i} isAnnual={isAnnual} lang={language} labels={labels} />
          ))}
        </div>

        {/* Sovereignty Guarantee Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: easeExpo, delay: 0.2 }}
          className="mt-12 mx-auto max-w-3xl rounded-2xl border border-[#A34A33]/20 bg-[#A34A33]/[0.02] p-6 text-center"
        >
          <div className="flex flex-col items-center gap-3 md:flex-row md:text-left md:items-start">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#A34A33]/10 text-[#A34A33]">
              <Shield className="h-5 w-5" />
            </span>
            <div className="space-y-1">
              <h4 className="font-sans text-sm font-semibold tracking-wide text-white">
                {language === "pt" ? "Garantia de Soberania (Fallback Vitalício)" : "Sovereignty Guarantee (Lifetime Fallback)"}
              </h4>
              <p className="text-xs leading-relaxed text-white/60">
                {language === "pt" 
                  ? "Se você assinar o plano anual e decidir não renovar, a versão instalada continua sendo sua para sempre. O software continuará executando localmente na sua máquina de forma offline e independente, apenas perdendo o acesso a atualizações futuras e suporte ativo." 
                  : "If you subscribe to the annual plan and decide not to renew, the installed version remains yours forever. The software will continue to run locally on your machine offline and independently, only losing access to future updates and active support."}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Comparison matrix */}
        <FeatureMatrix language={language} />

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: easeExpo }}
          className="mx-auto mt-16 max-w-3xl text-center text-xs leading-relaxed text-white/45"
        >
          {text.footerNote}
        </motion.p>
      </div>
    </motion.div>
  );
};

/* --------------------------------------------------------------------------
   Below the dark stage: Aether Scale + hardware requirements (light canvas,
   unified aether-card system).
   ------------------------------------------------------------------------ */

const SpecCard = ({ icon: Icon, title, sub, rows, foot, badge, overlay }) => (
  <article className="aether-card relative flex h-full flex-col justify-between p-7" data-cursor="hover">
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <span className="aether-card-icon">
          <Icon className="h-6 w-6" strokeWidth={1.6} />
        </span>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="aether-font-display text-sm font-bold uppercase tracking-tight text-[#211d18]">{title}</h4>
            {badge && (
              <span className="inline-flex items-center rounded-full bg-[#A34A33]/10 border border-[#A34A33]/25 px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wider text-[#A34A33]">
                {badge}
              </span>
            )}
          </div>
          <span className="font-mono text-[10px] text-[#211d18]/45">{sub}</span>
        </div>
      </div>

      <div className="space-y-3 pt-1">
        {rows.map(([k, v], i) => (
          <div key={i} className="grid grid-cols-3 gap-2 border-b border-[#211d18]/[0.07] py-1.5 last:border-b-0">
            <span className="font-mono text-[10px] text-[#211d18]/45">{k}</span>
            <span className="col-span-2 text-xs font-medium text-[#211d18]/80">{v}</span>
          </div>
        ))}
      </div>
    </div>
    <p className="mt-6 border-t border-[#211d18]/[0.07] pt-4 text-xs italic text-[#211d18]/50">{foot}</p>
    {overlay}
  </article>
);

const PricingSection = () => {
  const { t, language } = useTranslation();
  const PRICING = t.PRICING;

  const TEXTS = {
    pt: {
      monthly: "Mensal",
      scaleKicker: "Sob Consulta",
      scaleTitle: "Aether Scale",
      scaleDesc:
        "Para operações corporativas com requisitos específicos de segurança, infraestrutura e volume. Implementamos o AetherCore sob medida no ambiente privado da sua organização com suporte e governança customizados.",
      scaleSubtitle: "Implantação Dedicada",
      techKicker: "Especificações Técnicas & Engenharia",
      techTitle: "Requisitos de Servidor & Infraestrutura Local",
      techDesc:
        "O AetherCore foi projetado para máxima soberania de dados, executando a inteligência e o processamento principal de forma privada e local. Para garantir baixa latência no processamento dos modelos locais de linguagem principal, no funcionamento dos agentes autônomos de planejamento cognitivo, e nos mecanismos locais de mídia e planilhas, consulte as diretrizes de hardware recomendadas.",
      workstationTitle: "Estação de Trabalho Local",
      workstationSub: "Uso Individual / Estação de Trabalho",
      processor: "PROCESSADOR",
      graphics: "PLACA DE VÍDEO",
      ram: "MEMÓRIA RAM",
      disk: "DISCO SSD",
      workstationFoot:
        "Perfeito para operadores individuais, desenvolvimento e execução local supervisionada em computadores pessoais.",
      serverTitle: "Servidor Dedicado Padrão",
      serverSub: "Ambiente de Produção Local",
      diskNetwork: "DISCO & REDE",
      serverFoot:
        "Recomendado para implantações de equipes em servidores físicos locais ou servidores virtuais locais.",
      nodeTitle: "AetherNode™ Custom",
      nodeSub: "Hardware sob Engenharia / Exclusivo",
      nodeConcept: "CONCEPÇÃO",
      nodeSystem: "SISTEMA",
      nodeEngineering: "ENGENHARIA",
      nodeAdvantage: "VANTAGEM",
      nodeConceptVal:
        "Clusters modulares integrados sob medida para processamento de IA local de alta densidade",
      nodeSystemVal:
        "Nós customizados rodando sistema operacional próprio e otimizado (AetherOS) para máxima eficiência de kernel",
      nodeEngineeringVal:
        "Chassis físico e gabinetes customizados para acomodar nós de processamento integrados (ex: Mini Hardwares compactos)",
      nodeAdvantageVal:
        "Appliance físico blindado com isolamento total que protege os outros ERPs e servidores da empresa",
      nodeFoot:
        "O futuro do AetherCore: hardware proprietário com SO próprio e exclusivo para IA corporativa local de alta densidade.",
      underConstruction: "Em Construção",
      comingSoon: "Brevemente",
      warningTitle: "Alerta de Coexistência de Recursos & Impacto de Desempenho",
      warningDesc:
        "O processamento e a inferência contínua de agentes locais geram rajadas intensivas de uso de processador, aceleradores gráficos e leitura de disco. Se a infraestrutura local do AetherCore for implantada em um servidor compartilhado com outros serviços corporativos ativos da empresa (como ERPs, bancos de dados centrais ou servidores web), as demais aplicações sofrerão degradação severa de desempenho. É fundamental reservar uma infraestrutura física ou máquina virtual dedicada e exclusiva para este ambiente.",
      footerNote:
        "Valores ilustrativos de lançamento. O plano Aether Free oferece processamento seguro na nuvem em sandbox temporária descartável. Os planos Aether Go e Aether Enterprise operam de forma nativa e 100% isolada em sua própria máquina, garantindo soberania absoluta de dados.",
    },
    en: {
      monthly: "Monthly",
      scaleKicker: "Upon Request",
      scaleTitle: "Aether Scale",
      scaleDesc:
        "For enterprise operations with specific security, infrastructure, and volume requirements. We deploy AetherCore tailored to your organization's private environment with custom support and governance.",
      scaleSubtitle: "Dedicated Deployment",
      techKicker: "Technical Specifications & Engineering",
      techTitle: "Server & Local Infrastructure Requirements",
      techDesc:
        "AetherCore is designed for maximum data sovereignty, executing core intelligence and processing privately and locally. To ensure low latency in local language models, cognitive planning for autonomous agents, and local spreadsheet/media processing engines, refer to the recommended hardware guidelines.",
      workstationTitle: "Local Workstation",
      workstationSub: "Individual Use / Workstation",
      processor: "PROCESSOR",
      graphics: "GRAPHICS CARD",
      ram: "SYSTEM RAM",
      disk: "SSD STORAGE",
      workstationFoot:
        "Perfect for individual operators, local development and supervised local execution on personal computers.",
      serverTitle: "Standard Dedicated Server",
      serverSub: "Local Production Environment",
      diskNetwork: "DISK & NETWORK",
      serverFoot:
        "Recommended for team deployments on local physical servers or local virtual machines.",
      nodeTitle: "Custom AetherNode™",
      nodeSub: "Engineered / Exclusive Hardware",
      nodeConcept: "CONCEPT",
      nodeSystem: "SYSTEM",
      nodeEngineering: "ENGINEERING",
      nodeAdvantage: "ADVANTAGE",
      nodeConceptVal: "Modular clusters custom-integrated for high-density local AI processing",
      nodeSystemVal:
        "Custom nodes running a dedicated and optimized OS (AetherOS) for maximum kernel efficiency",
      nodeEngineeringVal:
        "Physical chassis and custom enclosures to accommodate integrated processing nodes (e.g., compact Mini Hardware)",
      nodeAdvantageVal:
        "Hardened physical appliance with complete isolation protecting other enterprise ERPs and servers",
      nodeFoot:
        "The future of AetherCore: proprietary hardware with custom OS for high-density local enterprise AI.",
      underConstruction: "Under Construction",
      comingSoon: "Coming Soon",
      warningTitle: "Resource Coexistence & Performance Impact Warning",
      warningDesc:
        "Continuous processing and inference of local agents generate intensive CPU, GPU, and disk read bursts. If AetherCore's local infrastructure is deployed on a shared server with other active corporate services (such as ERPs, central databases, or web servers), other applications will suffer severe performance degradation. It is essential to reserve a dedicated and exclusive physical machine or virtual machine for this environment.",
      footerNote:
        "Illustrative launch prices. The Aether Free plan offers secure cloud processing in a temporary disposable sandbox. Aether Go and Aether Enterprise plans run natively and 100% isolated on your machine, ensuring absolute data sovereignty.",
    },
  };

  const text = TEXTS[language] || TEXTS.pt;
  const labels = {
    recommended: language === "en" ? "Recommended" : "Recomendado",
    getStarted: PRICING.buttonLabel,
    contact: PRICING.contactLabel,
    uponRequest: language === "en" ? "Upon request" : "Sob consulta",
  };

  const cautionOverlay = (
    <div className="pointer-events-none absolute inset-0 z-20 flex select-none items-center justify-center overflow-hidden rounded-[24px] bg-black/60 backdrop-blur-[2px]">
      <div
        className="absolute z-10 flex h-10 w-[150%] -rotate-12 transform items-center justify-around border-y-2 border-black font-sans text-[10px] font-black tracking-[0.2em] shadow-[0_0_30px_rgba(0,0,0,0.8)] md:h-12 md:text-xs md:tracking-[0.3em]"
        style={{ backgroundImage: "repeating-linear-gradient(-45deg, #facc15, #facc15 24px, #000 24px, #000 48px)" }}
      >
        <span className="whitespace-nowrap rounded border border-yellow-400/20 bg-black px-3 py-1 uppercase text-yellow-400 shadow-xl md:px-4 md:py-1.5">{text.underConstruction}</span>
        <span className="whitespace-nowrap rounded border border-yellow-400/20 bg-black px-3 py-1 uppercase text-yellow-400 shadow-xl md:px-4 md:py-1.5">{text.underConstruction}</span>
      </div>
      <div
        className="absolute flex h-10 w-[150%] rotate-12 transform items-center justify-around border-y-2 border-black font-sans text-[10px] font-black tracking-[0.2em] shadow-[0_0_30px_rgba(0,0,0,0.8)] md:h-12 md:text-xs md:tracking-[0.3em]"
        style={{ backgroundImage: "repeating-linear-gradient(45deg, #facc15, #facc15 24px, #000 24px, #000 48px)" }}
      >
        <span className="whitespace-nowrap rounded border border-yellow-400/20 bg-black px-3 py-1 uppercase text-yellow-400 shadow-xl md:px-4 md:py-1.5">AetherNode™ OS</span>
        <span className="whitespace-nowrap rounded border border-yellow-400/20 bg-black px-3 py-1 uppercase text-yellow-400 shadow-xl md:px-4 md:py-1.5">{text.comingSoon}</span>
      </div>
    </div>
  );

  return (
    <div id="pricing" data-testid="pricing-section">
      {/* ============ DARK STAGE ============ */}
      <PricingStage PRICING={PRICING} language={language} labels={labels} text={text} />

      {/* ============ BELOW: Aether Scale + Hardware (light canvas) ============ */}
      <Section className="liquid-divider" id="pricing-extras">
        <Container>
          {/* Aether Scale banner */}
          <Reveal>
            <div className="aether-card relative overflow-hidden p-8 md:p-12" data-cursor="hover">
              <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(163, 74, 51,0.08),transparent_60%)] blur-[50px]" />

              <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
                <div className="max-w-2xl space-y-4 text-left">
                  <span className="aether-card-label text-[#211d18]/55">{text.scaleKicker}</span>
                  <h3 className="aether-font-display text-2xl font-bold uppercase tracking-tight text-[#211d18] md:text-3xl">
                    {text.scaleTitle}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#211d18]/60 md:text-base">{text.scaleDesc}</p>

                  <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2.5 border-t border-[#211d18]/[0.08] pt-6 md:grid-cols-3">
                    {PRICING.plans[3].features.map((f, index) => (
                      <li key={index} className="flex items-center gap-2 text-xs text-[#211d18]/55 md:text-sm">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#A34A33]" />
                        {f.label}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex shrink-0 flex-col items-start justify-center gap-3 lg:items-end">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#211d18]/45">{text.scaleSubtitle}</span>
                  <MagneticButton to="/#cta" variant="orange" className="rounded-full px-8 py-3.5 text-sm" data-testid="scale-cta">
                    {PRICING.contactLabel}
                  </MagneticButton>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Hardware requirements */}
          <Reveal className="mt-8 md:mt-10">
            <div className="relative overflow-hidden rounded-[28px] border border-[#211d18]/10 bg-[#fbf9f2]/60 p-8 text-left md:p-12">
              <div className="relative z-10 space-y-10">
                <div className="max-w-4xl space-y-4">
                  <span className="aether-card-label text-[#211d18]/55">{text.techKicker}</span>
                  <h3 className="aether-font-display text-xl font-bold uppercase tracking-tight text-[#211d18] md:text-2xl">
                    {text.techTitle}
                  </h3>
                  <p className="max-w-4xl text-sm leading-relaxed text-[#211d18]/60">{text.techDesc}</p>
                </div>

                <div className="grid grid-cols-1 gap-6 border-t border-[#211d18]/[0.08] pt-10 md:grid-cols-2 lg:grid-cols-3">
                  <SpecCard
                    icon={Cpu}
                    title={text.workstationTitle}
                    sub={text.workstationSub}
                    rows={[
                      [text.processor, "Intel Core i7/i9, AMD Ryzen 7/9 or Apple Silicon (M2/M3/M4 Pro/Max)"],
                      [text.graphics, "NVIDIA RTX 3060 / 4060 (mín. 12GB VRAM) ou memória unificada de alta largura de banda"],
                      [text.ram, "16 GB a 32 GB de RAM de alta velocidade"],
                      [text.disk, "SSD NVMe rápido com no mínimo 50GB livres para downloads dos modelos"],
                    ]}
                    foot={text.workstationFoot}
                  />
                  <SpecCard
                    icon={Server}
                    title={text.serverTitle}
                    sub={text.serverSub}
                    rows={[
                      [text.processor, "Intel Xeon Scalable (3ª Geração+) ou AMD EPYC (7003+ @ 16+ Núcleos)"],
                      [text.graphics, "NVIDIA RTX 4090, A10G ou L40S (24GB VRAM dedicada)"],
                      [text.ram, "64 GB a 128 GB ECC RAM DDR4 / DDR5 corporativa"],
                      [text.diskNetwork, "SSD NVMe Enterprise PCIe Gen4 + Link Ethernet Gigabit de 10 GbE"],
                    ]}
                    foot={text.serverFoot}
                  />
                  <SpecCard
                    icon={Zap}
                    title={text.nodeTitle}
                    sub={text.nodeSub}
                    badge={language === "en" ? "PROPRIETARY" : "PROPRIETÁRIO"}
                    rows={[
                      [text.nodeConcept, text.nodeConceptVal],
                      [text.nodeSystem, text.nodeSystemVal],
                      [text.nodeEngineering, text.nodeEngineeringVal],
                      [text.nodeAdvantage, text.nodeAdvantageVal],
                    ]}
                    foot={text.nodeFoot}
                    overlay={cautionOverlay}
                  />
                </div>

                {/* Warning alert */}
                <div className="aether-card flex flex-col gap-4 !rounded-2xl border-amber-600/25 p-6 sm:flex-row">
                  <span className="aether-card-icon !h-11 !w-11 !rounded-xl !border-amber-600/30 !bg-amber-600/10 !text-amber-700 shrink-0">
                    <AlertTriangle className="h-5 w-5" />
                  </span>
                  <div className="space-y-1.5 text-left">
                    <h5 className="text-sm font-semibold tracking-wide text-amber-800">{text.warningTitle}</h5>
                    <p className="text-xs leading-relaxed text-[#211d18]/60">{text.warningDesc}</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </div>
  );
};

export default PricingSection;
