import React, { useRef, useState } from "react";
import { Sparkle, Leaf, X } from "@phosphor-icons/react";
import { useExperience } from "@/context/ExperienceContext";
import { useTranslation } from "@/hooks/useTranslation";
import { EXPERIENCE, markAutoDetected, wasAutoDetected } from "@/lib/experience";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const COPY = {
  pt: {
    light: "Modo leve ativado para a sua máquina.",
    full: "Modo animado ativado.",
    toLight: "Trocar para leve",
    toFull: "Trocar para animado",
    close: "Fechar aviso",
  },
  en: {
    light: "Light mode enabled for your device.",
    full: "Animated mode enabled.",
    toLight: "Switch to light",
    toFull: "Switch to animated",
    close: "Dismiss",
  },
};

/* Non-blocking pill shown once after auto-detection; lets the visitor flip
   profiles without hunting for the footer toggle. */
const ExperienceHint = () => {
  const { isLightExperience, setExperience } = useExperience();
  const { language } = useTranslation();
  const copy = COPY[language] || COPY.pt;
  const ref = useRef(null);
  const [visible, setVisible] = useState(() => wasAutoDetected());

  useGSAP(
    () => {
      if (!visible || !ref.current) return;
      if (prefersReducedMotion()) return;
      gsap.fromTo(ref.current, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1.1, delay: 1.6, ease: "power3.out" });
    },
    { scope: ref, dependencies: [visible] },
  );

  const dismiss = () => {
    markAutoDetected(false);
    const el = ref.current;
    if (!el || prefersReducedMotion()) return setVisible(false);
    gsap.to(el, { autoAlpha: 0, y: 16, duration: 0.5, ease: "power2.in", onComplete: () => setVisible(false) });
  };

  const toggle = () => {
    setExperience(isLightExperience ? EXPERIENCE.FULL : EXPERIENCE.LIGHT);
    dismiss();
  };

  if (!visible) return null;

  return (
    <div
      ref={ref}
      role="status"
      className="experience-hint fixed left-4 z-[65] flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-full border border-[#211d18]/12 bg-[#fbf9f2]/95 py-2 pl-3.5 pr-2 shadow-[0_18px_44px_-22px_rgba(33,29,24,0.35)] md:left-6"
      style={{ opacity: 0 }}
      data-testid="experience-hint"
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#A34A33] text-[#fbf9f2]">
        {isLightExperience ? <Leaf className="h-3.5 w-3.5" weight="fill" /> : <Sparkle className="h-3.5 w-3.5" weight="fill" />}
      </span>
      <span className="truncate text-xs text-[#211d18]/80">{isLightExperience ? copy.light : copy.full}</span>
      <button
        type="button"
        onClick={toggle}
        data-testid="experience-hint-toggle"
        className="shrink-0 rounded-full bg-[#211d18] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#f4f1e8] transition-colors duration-300 hover:bg-[#A34A33]"
      >
        {isLightExperience ? copy.toFull : copy.toLight}
      </button>
      <button
        type="button"
        onClick={dismiss}
        aria-label={copy.close}
        data-testid="experience-hint-close"
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#211d18]/50 transition-colors duration-300 hover:bg-[#211d18]/8 hover:text-[#211d18]"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};

export default ExperienceHint;
