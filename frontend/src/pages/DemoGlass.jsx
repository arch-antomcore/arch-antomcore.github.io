import React, { useState } from "react";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { ArrowLeft, ArrowsClockwise as RefreshCw, Stack as Layers } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import "./visual-previews.css";

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
          <code className="reference-glass-demo-code">
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
      previewLabel: "Vidro sobre o oceano",
    },
    en: {
      backHome: "Back to Home",
      panelTitle: "Control Panel",
      panelDesc: (
        <>
          Try changing the parameters of the reusable{" "}
          <code className="reference-glass-demo-code">
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
      previewLabel: "Glass over the ocean",
    }
  }[language === "pt" ? "pt" : "en"];

  return (
    <div
      className="reference-glass-demo relative flex flex-col items-center justify-center overflow-hidden"
      data-testid="glass-demo-page"
      style={{
        backgroundImage: "url('/assets/img/backgrounds/cta-seaside.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Dark overlay for contrast */}
      <div className="reference-glass-demo-wash absolute inset-0 z-0" aria-hidden="true" />

      {/* Header Controls */}
      <div className="reference-glass-demo-nav relative z-10 w-full max-w-5xl flex items-center justify-between mb-8">
        <Link 
          to="/" 
          className="reference-glass-demo-back inline-flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {text.backHome}
        </Link>
        <span className="reference-glass-demo-label">
          <span aria-hidden="true" />
          {text.previewLabel}
        </span>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-5xl grid md:grid-cols-2 gap-6 md:gap-10 items-center">
        
        {/* Paper controls retain contrast independently of the photo. */}
        <div className="reference-glass-demo-controls flex flex-col gap-6" data-testid="glass-demo-controls">
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-2">{text.panelTitle}</h1>
            <p className="reference-glass-demo-description text-sm leading-relaxed">
              {text.panelDesc}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Scale Slider */}
            <div className="flex flex-col gap-1.5">
              <div className="reference-glass-demo-control-label flex justify-between gap-3">
                <label htmlFor="glass-demo-distortion">{text.distortion}</label>
                <output htmlFor="glass-demo-distortion">{scale}</output>
              </div>
              <input 
                type="range" 
                id="glass-demo-distortion"
                min="0" 
                max="200" 
                value={scale} 
                onChange={(e) => setScale(Number(e.target.value))}
                className="reference-glass-demo-range"
              />
            </div>

            {/* Corner Radius Slider */}
            <div className="flex flex-col gap-1.5">
              <div className="reference-glass-demo-control-label flex justify-between gap-3">
                <label htmlFor="glass-demo-radius">{text.radius}</label>
                <output htmlFor="glass-demo-radius">{radius}px</output>
              </div>
              <input 
                type="range" 
                id="glass-demo-radius"
                min="0" 
                max="100" 
                value={radius} 
                onChange={(e) => setRadius(Number(e.target.value))}
                className="reference-glass-demo-range"
              />
            </div>
          </div>

          <div className="reference-glass-demo-instruction pt-4 flex gap-3">
            <span className="flex items-center gap-1">
              <RefreshCw className="h-3 w-3 shrink-0" /> {text.instruction}
            </span>
          </div>
        </div>

        {/* Right Side: Reusable LiquidGlassCard being demonstrated */}
        <div className="flex justify-center items-center h-full min-h-[320px]">
          <LiquidGlassCard
            displacementScale={scale}
            cornerRadius={radius}
            className="reference-glass-demo-viewer w-full max-w-sm"
            style={{ "--lgc-bg": "rgba(7, 20, 52, 0.52)" }}
            data-testid="glass-demo-viewer"
          >
            <div className="reference-glass-demo-viewer-content p-8 flex flex-col gap-6 select-none">
              <div className="flex items-center gap-3">
                <div className="reference-glass-demo-icon h-11 w-11 shrink-0 flex items-center justify-center">
                  <Layers className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold tracking-tight text-lg">{text.viewerTitle}</h3>
                  <p className="reference-glass-demo-viewer-meta">AetherCore / Liquid Glass</p>
                </div>
              </div>

              <p className="reference-glass-demo-viewer-description text-sm leading-relaxed">
                {text.viewerDesc}
              </p>

              <button 
                onClick={() => { setScale(100); setRadius(32); }}
                type="button"
                className="reference-glass-demo-reset w-full"
                data-testid="glass-demo-reset"
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
