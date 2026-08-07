// Delivered by Originkit · stack: nextjs · styling: tailwind
"use client";

"use client";

import { useEffect, useState } from "react";

/** Matches `--breakpoint-ipad` / `--breakpoint-desktop-sm` in globals.css */
const IPAD_MIN = 768;
const DESKTOP_SM_MIN = 1280;

export type TunnelConfig = {
  tunnelSize: number;
  /** Middle fade 0–100 — higher on larger screens to match design wash */
  fade: number;
  boost: number;
};

/**
 * Responsive GalleryTunnel config:
 * - < ipad: size 5, fade 88
 * - ipad … desktop-sm: size 6, fade 96
 * - desktop-sm+: size 10, fade 100
 */
export const useTunnelConfig = (): TunnelConfig => {
  const [config, setConfig] = useState<TunnelConfig>({
    tunnelSize: 5,
    fade: 88,
    boost: 30,
  });

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (width < IPAD_MIN) {
        setConfig({ tunnelSize: 4, fade: 80, boost: 25 });
        return;
      }
      if (width < DESKTOP_SM_MIN) {
        setConfig({ tunnelSize: 5, fade: 85, boost: 25 });
        return;
      }
      // Elegant perspective depth without excessive frame zoom
      setConfig({ tunnelSize: 5, fade: 85, boost: 25 });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return config;
};

/** @deprecated use useTunnelConfig */
export const useTunnelSize = (): number => useTunnelConfig().tunnelSize;
