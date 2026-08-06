import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown } from "@phosphor-icons/react";

/**
 * Scroll-driven 3D parallax dashboard + cursor-tracking tangerine spotlight
 * and a rotating "scroll to explore" sticker badge.
 */
const ProductMockup = ({ labels }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.4], [0.9, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.4], [15, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div
      ref={ref}
      className="relative z-10 px-6 md:px-12 mt-24 md:mt-32 max-w-6xl mx-auto"
      style={{ perspective: "1200px" }}
      data-testid="aether-product-mockup-section"
    >
      <div className="flex items-center justify-between mb-4 text-[11px] uppercase tracking-[0.25em] font-semibold text-[#211d18]/40">
        <span>{labels.consoleLabel}</span>
        <span className="text-[#A34A33] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A34A33] animate-pulse" />
          {labels.consoleLive}
        </span>
      </div>

      <motion.div
        style={{ scale, rotateX, y, transformStyle: "preserve-3d" }}
        className="relative w-full overflow-hidden rounded-lg border border-[#211d18]/10 shadow-2xl shadow-[#211d18]/15 bg-[#fbf9f2]"
        data-cursor="hover"
        data-cursor-text="Ver console"
      >
        <img
          src="/assets/img/mockups/console-aether.png"
          alt="Console AetherCore — orquestração local de agentes autônomos"
          className="w-full h-auto block"
          loading="lazy"
          data-testid="aether-product-mockup-image"
        />
        {/* Editorial serial number watermark */}
        <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-[#211d18]/80 backdrop-blur-md px-3 py-1.5 z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A34A33] animate-pulse" />
          <span className="text-[9px] uppercase tracking-[0.3em] font-mono text-[#f4f1e8]/90">
            CONSOLE · LIVE · v0.5.1
          </span>
        </div>
        <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-[#fbf9f2]/85 backdrop-blur-md px-3 py-1.5 z-10 border border-[#211d18]/10">
          <span className="text-[9px] uppercase tracking-[0.3em] font-mono text-[#211d18]/70">
            //SYS.0001 — Modelo Local (GLM)
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 160, damping: 14, delay: 0.3 }}
        className="hidden lg:flex absolute -bottom-12 right-16 z-20 w-28 h-28 rounded-full bg-[#211d18] items-center justify-center shadow-xl"
        data-testid="aether-scroll-badge"
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full aether-spin-slow">
          <defs>
            <path
              id="aether-circle-path"
              d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"
            />
          </defs>
          <text fill="#f4f1e8" fontSize="9" letterSpacing="2.5" className="uppercase font-semibold">
            <textPath href="#aether-circle-path">{labels.scrollBadge}</textPath>
          </text>
        </svg>
        <ArrowDown className="w-5 h-5 text-[#A34A33] relative" />
      </motion.div>
    </div>
  );
};

export default ProductMockup;
