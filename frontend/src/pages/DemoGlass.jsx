import React, { useState } from "react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { ArrowLeft, ArrowsClockwise as RefreshCw, Stack as Layers } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const DemoGlass = () => {
  const [scale, setScale] = useState(100);
  const [radius, setRadius] = useState(32);
  const { language } = useTranslation();

  const text = {
    pt: {
      backHome: "Voltar para Home",
      panelTitle: "Painel de Teste",
      panelDesc: (
        <>
          Experimente alterar os parâmetros do componente reutilizável{" "}
          <code className="text-[#A34A33] font-mono bg-[#A34A33]/10 px-1 rounded">
            LiquidGlassCard
          </code>{" "}
          para ver a distorção e o vidro líquido reagirem em tempo real.
        </>
      ),
      distortion: "Distorção (displacementScale)",
      radius: "Arredondamento (cornerRadius)",
      instruction: "Mova o mouse sobre o card da direita",
      viewerTitle: "Visualizador de Efeito",
      viewerDesc: "Este card está utilizando o componente reutilizável. O fundo é a foto do oceano debaixo dele, distorcida e refratada de acordo com os parâmetros do painel.",
      btnInteract: "Resetar Parâmetros",
    },
    en: {
      backHome: "Back to Home",
      panelTitle: "Control Panel",
      panelDesc: (
        <>
          Try changing the parameters of the reusable{" "}
          <code className="text-[#A34A33] font-mono bg-[#A34A33]/10 px-1 rounded">
            LiquidGlassCard
          </code>{" "}
          component to see the displacement and liquid glass react in real time.
        </>
      ),
      distortion: "Displacement (displacementScale)",
      radius: "Corner Radius (cornerRadius)",
      instruction: "Move your mouse over the right card",
      viewerTitle: "Effect Viewer",
      viewerDesc: "This card uses the reusable component. The background is the ocean photo behind it, displaced and refracted based on the control panel inputs.",
      btnInteract: "Reset Parameters",
    }
  }[language === "pt" ? "pt" : "en"];

  return (
    <div 
      className="min-h-screen w-full relative flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden"
      style={{
        backgroundImage: "url('/assets/img/backgrounds/cta-seaside.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/45 z-0" />

      {/* Header Controls */}
      <div className="relative z-10 w-full max-w-4xl flex items-center justify-between mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium bg-black/20 hover:bg-black/45 px-4 py-2 rounded-full border border-white/10 transition-all duration-300 backdrop-blur-md"
        >
          <ArrowLeft className="h-4 w-4" />
          {text.backHome}
        </Link>
        <span className="text-white/60 font-mono text-xs uppercase tracking-widest bg-black/20 px-3 py-1.5 rounded-full border border-white/5 backdrop-blur-md">
          Liquid Glass Demo Page
        </span>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
        
        {/* Left Side: Controls card (Regular transparent styling) */}
        <div className="bg-black/35 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 text-white shadow-2xl flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">{text.panelTitle}</h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {text.panelDesc}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Scale Slider */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-mono text-zinc-400">
                <span>{text.distortion}</span>
                <span className="text-[#A34A33] font-bold">{scale}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="200" 
                value={scale} 
                onChange={(e) => setScale(Number(e.target.value))}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#A34A33]"
              />
            </div>

            {/* Corner Radius Slider */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-mono text-zinc-400">
                <span>{text.radius}</span>
                <span className="text-[#A34A33] font-bold">{radius}px</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={radius} 
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#A34A33]"
              />
            </div>
          </div>

          <div className="border-t border-white/5 pt-4 flex gap-3 text-xs text-zinc-400 font-mono">
            <span className="flex items-center gap-1">
              <RefreshCw className="h-3 w-3 animate-spin-slow" /> {text.instruction}
            </span>
          </div>
        </div>

        {/* Right Side: Reusable LiquidGlassCard being demonstrated */}
        <div className="flex justify-center items-center h-full min-h-[320px]">
          <LiquidGlassCard
            displacementScale={scale}
            cornerRadius={radius}
            className="w-full max-w-sm"
          >
            <div className="p-8 text-white flex flex-col gap-6 select-none">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-[#A34A33] to-fuchsia-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <Layers className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold tracking-tight text-lg">{text.viewerTitle}</h3>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-mono">AetherCore UI Primitive</p>
                </div>
              </div>

              <p className="text-sm text-zinc-200 leading-relaxed">
                {text.viewerDesc}
              </p>

              <button 
                onClick={() => { setScale(100); setRadius(32); }}
                className="w-full py-2.5 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 text-xs font-semibold tracking-wide"
              >
                {text.btnInteract}
              </button>
            </div>
          </LiquidGlassCard>
        </div>

      </div>
    </div>
  );
};

export default DemoGlass;
