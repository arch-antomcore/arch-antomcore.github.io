import React, { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, ArrowLeft, ArrowRight, BookOpen, Desktop, Compass, Pause, Play, ArrowsOut, X } from "@phosphor-icons/react";
import { TiltedGridHero } from "@/components/ui/tilted-grid-hero";
import { Tiles } from "@/components/ui/tiles";
import { useTranslation } from "@/hooks/useTranslation";
import { ManifestoChapters, EditorialMarquee } from "./AetherSections";
import "./aether-hero.css";

// The original homepage gallery, in the same order, without its duplicates.
const SCREENSHOTS = [
  { src: "/assets/img/gallery/aether-5.png", pt: "Chat inteligente do Quintessence", en: "Quintessence intelligent chat" },
  { src: "/assets/img/gallery/aether-2.png", pt: "Hub de modelos e LLMs", en: "Models and LLM hub" },
  { src: "/assets/img/gallery/aether-1.png", pt: "Console AetherCore", en: "AetherCore console" },
  { src: "/assets/img/gallery/aether-4.png", pt: "Marketplace do Quintessence", en: "Quintessence marketplace" },
  { src: "/assets/img/gallery/aether-3.png", pt: "Workspace do Quintessence", en: "Quintessence workspace" },
];

const ProductReel = ({ labels, isPt }) => {
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const openerRef = useRef(null);
  const images = useMemo(() => SCREENSHOTS.map((image) => ({ src: image.src, alt: isPt ? image.pt : image.en })), [isPt]);
  const move = (direction) => setSelected((current) => (current + direction + images.length) % images.length);
  const inspect = (index, opener) => { openerRef.current = opener; setSelected(index); setOpen(true); };

  return (
    <div className="aether-product-reel" data-testid="aether-product-mockup-section">
      <div className="aether-reel-heading">
        <div>
          <span className="aether-reel-kicker">{labels.consoleLabel} <span aria-hidden="true">↘</span></span>
          <h2>{isPt ? "O AetherCore, por dentro." : "A look inside AetherCore."}</h2>
        </div>
        <button type="button" className="aether-reel-pause" aria-pressed={paused} onClick={() => setPaused((value) => !value)} aria-label={isPt ? (paused ? "Retomar carrossel" : "Pausar carrossel") : (paused ? "Resume carousel" : "Pause carousel")}>
          {paused ? <Play weight="fill" /> : <Pause weight="fill" />}
          <span>{isPt ? (paused ? "Retomar" : "Pausar") : (paused ? "Resume" : "Pause")}</span>
        </button>
      </div>

      <TiltedGridHero images={images} speed={5.5} tileHeight={48} curve={74} axis={48} gap={7} fade={10} paused={paused || open} className="aether-reel-stage" data-testid="aether-curved-carousel">
        <button type="button" className="aether-reel-open" onClick={(event) => inspect(selected, event.currentTarget)}>
          <ArrowsOut size={16} />
          {isPt ? "Explorar as telas" : "Explore the screens"}
          <ArrowUpRight size={16} />
        </button>
      </TiltedGridHero>

      <div className="aether-reel-footer">
        <p>{isPt ? "Interfaces reais. Inteligência no seu dispositivo." : "Real interfaces. Intelligence on your device."}</p>
        <div className="aether-reel-index" role="group" aria-label={isPt ? "Abrir captura de tela" : "Open screenshot"}>
          {images.map((image, index) => (
            <button key={image.src} type="button" onClick={(event) => inspect(index, event.currentTarget)} aria-label={String(index + 1).padStart(2, "0") + " — " + image.alt} title={image.alt}>
              {String(index + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="aether-screen-overlay" />
          <Dialog.Content className="aether-screen-dialog" data-lenis-prevent onCloseAutoFocus={(event) => {
            event.preventDefault();
            openerRef.current?.focus({ preventScroll: true });
          }} onKeyDown={(event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              move(event.key === "ArrowLeft" ? -1 : 1);
            }
          }}>
            <div className="aether-screen-toolbar">
              <div>
                <Dialog.Title className="aether-screen-title">{images[selected].alt}</Dialog.Title>
                <Dialog.Description className="aether-screen-description">{isPt ? "Captura da interface · use as setas para navegar" : "Interface screenshot · use the arrows to browse"}</Dialog.Description>
              </div>
              <Dialog.Close className="aether-screen-close" aria-label={isPt ? "Fechar galeria" : "Close gallery"}><X size={22} /></Dialog.Close>
            </div>
            <div className="aether-screen-image-wrap">
              <img src={images[selected].src} alt={images[selected].alt} className="aether-screen-image" data-testid="aether-product-mockup-image" />
            </div>
            <div className="aether-screen-navigation">
              <button type="button" onClick={() => move(-1)} aria-label={isPt ? "Captura anterior" : "Previous screenshot"}><ArrowLeft size={19} /></button>
              <p aria-live="polite">{String(selected + 1).padStart(2, "0")} <span>/ {String(images.length).padStart(2, "0")}</span></p>
              <button type="button" onClick={() => move(1)} aria-label={isPt ? "Próxima captura" : "Next screenshot"}><ArrowRight size={19} /></button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

const AetherHero = () => {
  const { t, language } = useTranslation();
  const isPt = language === "pt";
  const A = t.HOME.aether;

  return (
    <section className="aether-hero-root aether-home-intro" data-testid="aethercore-hero">
      <div className="aether-home-panel aether-tile-surface">
        <Tiles tileSize="lg" />
        <div className="aether-home-eyebrow aether-enter" data-testid="aether-eyebrow">
          <span className="aether-home-pill"><span className="aether-home-dot" />{A.eyebrow}</span>
          <span className="aether-home-version">{A.eyebrowRight}</span>
        </div>

        <svg className="aether-home-doodle" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M88 9C80 50 61 76 38 61C12 44 34 16 53 30C75 46 60 72 39 85M43 70L39 85L55 79" />
        </svg>

        <h1 className="aether-home-headline" data-testid="aether-kinetic-headline">
          <span className="aether-enter" style={{ "--i": 1 }}>{A.headline.l1}{" "}</span>
          <span className="aether-enter" style={{ "--i": 2 }}>{A.headline.l2}{" "}</span>
          <span className="aether-home-headline-paper aether-enter" style={{ "--i": 3 }}>{A.headline.l3a} {A.headline.l3b}<span className="aether-home-period">.</span></span>
        </h1>

        <div className="aether-home-summary">
          <p data-testid="aether-subheadline">{A.sub}</p>
          <div className="aether-home-stamp" aria-hidden="true">
            <span>LOCAL-FIRST</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3 20 7v6c0 4-8 8-8 8s-8-4-8-8V7z" /><path d="m8 12 3 3 5-6" /></svg>
            <span>{isPt ? "VOCÊ NO CONTROLE" : "YOU ARE IN CONTROL"}</span>
          </div>
        </div>

        <div className="aether-home-actions" data-testid="aether-cta-group">
          <Link to="/#cta" className="aether-home-primary" data-testid="aether-primary-cta">{t.HOME.primaryCta}<ArrowUpRight size={18} /></Link>
          <Link to="/produto" className="aether-home-secondary"><BookOpen size={17} />{t.HOME.secondaryCta}<ArrowUpRight size={17} /></Link>
        </div>

        <div className="aether-home-ecosystem">
          <span>{isPt ? "Ecossistema Exvorn · Outros projetos" : "Exvorn ecosystem · Other projects"}</span>
          <div>
            <a href="https://monitorsmith.app/" target="_blank" rel="noopener noreferrer" data-testid="hero-link-monitorsmith"><Desktop size={16} />MonitorSmith<ArrowUpRight size={15} /></a>
            <Link to="/ecossistema#component-atlas" data-testid="hero-link-component-atlas"><Compass size={16} />Component Atlas<small>{isPt ? "Em breve" : "Soon"}</small></Link>
          </div>
        </div>
      </div>

      <ProductReel labels={A} isPt={isPt} />

      <div className="aether-home-chapters">
        <ManifestoChapters chapters={A.chapters} />
        <EditorialMarquee items={A.marquee} />
      </div>
    </section>
  );
};

export default AetherHero;
