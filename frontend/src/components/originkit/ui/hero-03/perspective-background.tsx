// Delivered by Originkit · stack: nextjs · styling: tailwind
"use client";

"use client";

import { useReducedMotion } from "framer-motion";
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

/**
 * Animated Three.js gallery tunnel.
 * Click/hold empty areas to boost; UI stays clickable above.
 */
export const PerspectiveBackground = ({ background = "#f4f1e8", lineColor = "#211d18", lineOpacity = 18 }: { background?: string; lineColor?: string; lineOpacity?: number }) => {
  const reduceMotion = useReducedMotion();
  const { tunnelSize, fade, boost } = useTunnelConfig();

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
    >
      <GalleryTunnel
        background={background}
        lineColor={lineColor}
        lineOpacity={lineOpacity}
        colors={AETHER_COLORS}
        grid={4}
        tunnelSize={3}
        speed={180}
        boost={350}
        fade={90}
        label={false}
        images={TUNNEL_IMAGES}
        style={{ width: "100%", height: "100%" }}
      />

      {/* Soft center veil — keeps text crisp and ultra-readable */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(244,241,232,0.85)_0%,rgba(244,241,232,0.5)_45%,rgba(244,241,232,0.15)_80%)]" />
    </div>
  );
};
