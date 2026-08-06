import React from "react";
import { GlassCard } from "@developer-hub/liquid-glass";

/**
 * Reusable LiquidGlassCard component based on Apple WWDC 2025 liquid glassmorphism.
 * Wraps any content with realistic liquid glass refraction, blur, and aberration.
 *
 * @example
 * // Basic usage:
 * import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
 * 
 * <LiquidGlassCard cornerRadius={24}>
 *   <div className="p-6">
 *     <h3>My Premium Card</h3>
 *     <p>Refracting background elements smoothly.</p>
 *   </div>
 * </LiquidGlassCard>
 * 
 * @param {React.ReactNode} children - The elements to render inside the glass card.
 * @param {number} [displacementScale=100] - Strength of the liquid distortion warp (0 to 200).
 * @param {number} [blurAmount=0.01] - Blur intensity of the glass.
 * @param {number} [cornerRadius=32] - Rounded corners border radius in pixels.
 * @param {boolean} [shadowMode=false] - Optimizes shadows and contrast for light backgrounds.
 * @param {string} [className=""] - Additional tailwind/css classes.
 * @param {React.CSSProperties} [style={}] - Inline style overrides.
 */
export const LiquidGlassCard = ({
  children,
  displacementScale = 100,
  blurAmount = 0.01,
  cornerRadius = 32,
  shadowMode = false,
  className = "",
  style = {},
  ...props
}) => {
  return (
    <GlassCard
      displacementScale={displacementScale}
      blurAmount={blurAmount}
      cornerRadius={cornerRadius}
      shadowMode={shadowMode}
      className={`lgc-shadow ${className}`}
      style={{
        backgroundColor: "var(--lgc-bg, rgba(10, 10, 10, 0.15))",
        ...style,
      }}
      {...props}
    >
      {children}
    </GlassCard>
  );
};
