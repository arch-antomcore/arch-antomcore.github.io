import React from "react";
import { Lightning, Sparkle, Gauge, Leaf } from "@phosphor-icons/react";
import { EXPERIENCE, prefersLightExperience } from "@/lib/experience";
import { useTranslation } from "@/hooks/useTranslation";

const COPY = {
  pt: {
    eyebrow: "CONFIGURAÇÃO DE EXPERIÊNCIA",
    title: "Como você quer explorar o Aether?",
    description:
      "Este site usa animações, camadas 3D e efeitos de rolagem. Escolha o perfil que faz mais sentido para sua máquina agora.",
    fullTitle: "Experiência completa",
    fullDescription: "Animações, partículas, galerias 3D, vídeo e rolagem cinematográfica.",
    fullDetail: "Para uma GPU confortável com efeitos visuais.",
    lightTitle: "Versão leve",
    lightDescription: "Conteúdo completo com scroll nativo, sem 3D/WebGL nem vídeo automático.",
    lightDetail: "Menos uso de GPU, CPU e memória.",
    recommended: "RECOMENDADO",
    systemHint: "Seu dispositivo ou navegador sinalizou uma preferência por menos movimento. A versão leve é a opção mais segura.",
    footer: "Você poderá trocar esta escolha no rodapé a qualquer momento.",
  },
  en: {
    eyebrow: "EXPERIENCE SETUP",
    title: "How would you like to explore Aether?",
    description:
      "This site uses animation, 3D layers, and scroll effects. Choose the profile that fits your machine right now.",
    fullTitle: "Full experience",
    fullDescription: "Animation, particles, 3D galleries, video, and cinematic scrolling.",
    fullDetail: "For GPUs that are comfortable with visual effects.",
    lightTitle: "Light version",
    lightDescription: "The complete content with native scrolling, no 3D/WebGL, and no autoplay video.",
    lightDetail: "Uses less GPU, CPU, and memory.",
    recommended: "RECOMMENDED",
    systemHint: "Your device or browser reported a preference for less motion. The light version is the safer choice.",
    footer: "You can change this choice in the footer at any time.",
  },
};

export const ExperienceSelector = ({ onSelect }) => {
  const { language } = useTranslation();
  const copy = COPY[language] || COPY.pt;
  const recommendLight = prefersLightExperience();

  return (
    <main
      className="experience-selector relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f4f1e8] px-5 py-10 text-[#211d18]"
      data-testid="experience-selector"
      aria-labelledby="experience-selector-title"
    >
      <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden="true">
        <div className="absolute -left-24 top-[12%] h-72 w-72 rounded-full bg-[#A34A33]/10 blur-3xl" />
        <div className="absolute -right-24 bottom-[8%] h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <section className="relative z-10 w-full max-w-4xl">
        <div className="mx-auto mb-8 flex w-fit items-center gap-3 rounded-full border border-[#211d18]/10 bg-white/70 px-4 py-2 shadow-sm">
          <img
            src="/assets/img/brand/logo-aether.png"
            alt="AetherCore"
            width="30"
            height="30"
            className="h-7 w-7 object-contain"
          />
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#211d18]/65">
            AetherCore
          </span>
        </div>

        <header className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#A34A33]">
            {copy.eyebrow}
          </p>
          <h1 id="experience-selector-title" className="aether-font-display mt-4 text-4xl font-extrabold uppercase leading-[0.98] tracking-tight sm:text-5xl">
            {copy.title}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#211d18]/65 sm:text-base">
            {copy.description}
          </p>
        </header>

        {recommendLight && (
          <p className="mx-auto mt-6 flex max-w-2xl items-start gap-3 rounded-2xl border border-[#A34A33]/20 bg-[#A34A33]/[0.06] px-4 py-3 text-left text-sm leading-relaxed text-[#211d18]/75">
            <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-[#A34A33]" weight="bold" aria-hidden="true" />
            {copy.systemHint}
          </p>
        )}

        <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-2">
          <button
            type="button"
            onClick={() => onSelect(EXPERIENCE.FULL)}
            autoFocus={!recommendLight}
            className="experience-choice group relative min-h-[220px] rounded-[28px] border border-[#211d18]/15 bg-white/75 p-7 text-left shadow-[0_18px_50px_-32px_rgba(33,29,24,0.45)] outline-offset-4 transition-colors hover:border-[#211d18]/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A34A33]"
            data-testid="experience-full-button"
          >
            <span className="mb-8 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#211d18] text-[#f4f1e8]">
              <Sparkle className="h-5 w-5" weight="fill" aria-hidden="true" />
            </span>
            <span className="block text-xl font-semibold tracking-tight">{copy.fullTitle}</span>
            <span className="mt-3 block text-sm leading-relaxed text-[#211d18]/65">{copy.fullDescription}</span>
            <span className="mt-5 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#211d18]/45">
              <Lightning className="h-3.5 w-3.5" weight="fill" aria-hidden="true" />
              {copy.fullDetail}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onSelect(EXPERIENCE.LIGHT)}
            autoFocus={recommendLight}
            className="experience-choice group relative min-h-[220px] rounded-[28px] border border-[#A34A33]/35 bg-[#A34A33] p-7 text-left text-[#fffaf4] shadow-[0_22px_58px_-30px_rgba(163,74,51,0.66)] outline-offset-4 transition-colors hover:bg-[#8d3e2b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#211d18]"
            data-testid="experience-light-button"
          >
            <span className="absolute right-5 top-5 rounded-full border border-white/25 bg-white/10 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em]">
              {copy.recommended}
            </span>
            <span className="mb-8 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-white">
              <Gauge className="h-5 w-5" weight="bold" aria-hidden="true" />
            </span>
            <span className="block text-xl font-semibold tracking-tight">{copy.lightTitle}</span>
            <span className="mt-3 block text-sm leading-relaxed text-white/80">{copy.lightDescription}</span>
            <span className="mt-5 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
              <Leaf className="h-3.5 w-3.5" weight="fill" aria-hidden="true" />
              {copy.lightDetail}
            </span>
          </button>
        </div>

        <p className="mt-7 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-[#211d18]/45">
          {copy.footer}
        </p>
      </section>
    </main>
  );
};

export default ExperienceSelector;
