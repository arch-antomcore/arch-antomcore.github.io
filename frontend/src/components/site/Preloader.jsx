import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

const STEPS_PT = [
  "INICIALIZANDO KERNEL...",
  "CARREGANDO ASSETS E FONTES...",
  "RESOLVENDO ROTAS ESTÁTICAS...",
  "CARREGANDO PAINEL DO AGENTE...",
  "MALHA COGNITIVA PRONTA"
];

const STEPS_EN = [
  "INITIALIZING KERNEL...",
  "LOADING ASSETS & FONTS...",
  "RESOLVING STATIC ROUTES...",
  "LOADING AGENT HUB...",
  "COGNITIVE MESH READY"
];

const CRITICAL_IMAGES = [
  "/assets/img/brand/logo-aether.png",
  "/assets/img/mockups/console-aether.png",
  "/assets/img/gallery/aether-1.png",
  "/assets/img/gallery/aether-2.png",
  "/assets/img/gallery/aether-3.png",
  "/assets/img/gallery/aether-4.png",
  "/assets/img/gallery/aether-5.png",
];

const warmImage = (src) =>
  new Promise((resolve) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      const decoded = image.decode?.();
      if (decoded?.then) decoded.then(resolve, resolve);
      else resolve();
    };
    image.onerror = resolve;
    image.src = src;
  });

export const Preloader = ({ onComplete }) => {
  const { language } = useTranslation();
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState("");
  const steps = language === "pt" ? STEPS_PT : STEPS_EN;

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    let current = 0;
    let finished = false;
    let completeTimer;
    const startedAt = performance.now();

    const finish = () => {
      if (finished) return;
      finished = true;
      clearInterval(interval);
      window.clearTimeout(hardLimit);
      setProgress(100);
      setActiveStep(steps[steps.length - 1]);
      const elapsed = performance.now() - startedAt;
      const readablePause = Math.max(180, 760 - elapsed);
      completeTimer = window.setTimeout(() => {
        document.body.style.overflow = "";
        onComplete();
      }, readablePause);
    };

    const interval = setInterval(() => {
      // Smoothly approach 92%; actual image decoding decides completion.
      const increment = Math.max(1, Math.round((94 - current) * 0.16));
      current = Math.min(current + increment, 92);
      setProgress(current);

      // Map progress range to diagnostic steps
      const stepIndex = Math.min(
        Math.floor((current / 95) * (steps.length - 1)),
        steps.length - 1
      );
      setActiveStep(steps[stepIndex]);

    }, 70);

    const hardLimit = window.setTimeout(finish, 1500);
    Promise.all([
      Promise.all(CRITICAL_IMAGES.map(warmImage)),
      document.fonts?.ready || Promise.resolve(),
      new Promise((resolve) => window.setTimeout(resolve, 520)),
    ]).then(finish);

    return () => {
      clearInterval(interval);
      window.clearTimeout(hardLimit);
      window.clearTimeout(completeTimer);
      document.body.style.overflow = "";
    };
  }, [steps, onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ 
        y: "-100%", 
        transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#f4f1e8] text-[#211d18]"
    >
      {/* Background grain noise */}
      <div
        className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{ backgroundImage: "url(/assets/img/backgrounds/noise.png)" }}
      />

      <div className="relative flex flex-col items-center max-w-sm w-full px-6 text-center z-10">
        {/* Sleek Logo Fade-in */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <img 
            src="/assets/img/brand/logo-aether.png" 
            alt="AetherCore Logo" 
            className="w-16 h-16 object-contain" 
          />
        </motion.div>

        {/* Diagonal Loader Line */}
        <div className="w-40 h-[1px] bg-[#211d18]/10 relative overflow-hidden mb-6">
          <motion.div 
            className="absolute top-0 left-0 bottom-0 bg-[#A34A33]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Counter Number */}
        <h2 className="font-mono text-4xl font-extrabold tracking-tight mb-2">
          {String(progress).padStart(2, "0")}%
        </h2>

        {/* Dynamic Diagnostics Ticker */}
        <div className="h-4 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeStep}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#211d18]/65"
            >
              {activeStep}
            </motion.p>
          </AnimatePresence>
        </div>

      </div>
      {/* Tiny Version Stamp */}
      <span className="absolute bottom-10 font-mono text-[8px] uppercase tracking-widest text-[#211d18]/30">
        AetherCore v0.5.1 · Security Kernel
      </span>
    </motion.div>
  );
};
