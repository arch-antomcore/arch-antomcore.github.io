// Delivered by Originkit · stack: nextjs · styling: tailwind
"use client";

"use client";

import { useEffect, useId, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import GalleryTunnel from "@/components/originkit/ui/hero-03/gallery-tunnel";
import { useTunnelConfig } from "@/components/originkit/ui/hero-03/use-tunnel-size";

/** Public asset URLs — use a function so preview rewriters stay stable. */
function asset(file: string) {
  return `/originkit/hero-03/${file}`;
}

const TUNNEL_IMAGES = [
  { src: asset("aether-1.png"), alt: "AetherCore Workspace" },
  { src: asset("aether-2.png"), alt: "Model Hub & LLMs" },
  { src: asset("aether-3.png"), alt: "Quintessence IDE" },
  { src: asset("aether-4.png"), alt: "Marketplace de Extensões" },
  { src: asset("aether-5.png"), alt: "Chat IA Local" },
  { src: asset("1.png"), alt: "AetherCore Feature 1" },
  { src: asset("2.png"), alt: "AetherCore Feature 2" },
  { src: asset("3.png"), alt: "AetherCore Feature 3" },
];

const AETHER_COLORS = ["#A34A33", "#211d18", "#d97706", "#7c2d12", "#ece7da", "#451a03"];

const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

type GalleryOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export const GalleryOverlay = ({ open, onClose }: GalleryOverlayProps) => {
  const titleId = useId();
  const reduceMotion = useReducedMotion();
  const { tunnelSize, fade, boost } = useTunnelConfig();

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleBackdropKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClose();
    }
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.28, ease: EASE_OUT }}
      className="fixed inset-0 z-50 flex flex-col bg-[#f4f1e8]"
    >
      <h2 id={titleId} className="sr-only">
        Interactive AetherCore 3D perspective gallery tunnel
      </h2>

      <div className="relative z-10 flex items-center justify-between px-6 py-4 bg-[#ece7da] border-b border-[#211d18]/10">
        <p className="font-mono text-xs uppercase tracking-widest text-[#211d18]/70">
          Hold click to speed up · Press Esc or click Close to return
        </p>
        <button
          type="button"
          aria-label="Close gallery"
          onClick={onClose}
          className="inline-flex items-center justify-center rounded-full border border-[#211d18] bg-[#211d18] px-5 py-2 text-xs uppercase font-semibold tracking-wider text-[#fbf9f2] transition-colors hover:bg-[#A34A33] hover:border-[#A34A33]"
        >
          Fechar Galeria
        </button>
      </div>

      <div
        className="relative min-h-0 flex-1"
        onKeyDown={handleBackdropKeyDown}
      >
        <GalleryTunnel
          background="#f4f1e8"
          lineColor="#211d18"
          lineOpacity={25}
          colors={AETHER_COLORS}
          grid={4}
          tunnelSize={tunnelSize}
          speed={180}
          boost={350}
          fade={fade}
          label={false}
          images={TUNNEL_IMAGES}
        />
      </div>
    </motion.div>
  );
};
