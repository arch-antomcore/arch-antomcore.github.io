import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown } from "@phosphor-icons/react";

import { useTranslation } from "@/hooks/useTranslation";

/**
 * Scroll-driven product image. A screenshot is presented as a preview,
 * without implying that it is a live console or an interactive application.
 */
const ProductMockup = ({ labels }) => {
  const { language } = useTranslation();
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
      className="relative z-10 px-6 md:px-12 mt-14 md:mt-20 max-w-6xl mx-auto"
      style={{ perspective: "1200px" }}
      data-testid="aether-product-mockup-section"
    >
      <div className="flex items-center justify-between mb-4 text-[11px] uppercase tracking-[0.25em] font-semibold text-[#211d18]/40">
        <span>{labels.consoleLabel}</span>
        <span className="text-[#0038FF]">
          {language === "pt" ? "Interface do produto" : "Product interface"}
        </span>
      </div>

      <motion.div
        style={{ scale, rotateX, y, transformStyle: "preserve-3d" }}
        className="relative w-full overflow-hidden rounded-[32px] border-2 border-[#0038FF]/20 bg-[#f7f4ec]"
      >
        <img
          src="/assets/img/mockups/console-aether.png"
          alt="Console AetherCore — orquestração local de agentes autônomos"
          className="w-full h-auto block pointer-events-none"
          loading="lazy"
          data-testid="aether-product-mockup-image"
        />
      </motion.div>

      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 160, damping: 14, delay: 0.3 }}
        className="hidden lg:flex absolute -bottom-12 right-16 z-20 w-28 h-28 rounded-full bg-[#ccff00] items-center justify-center"
        data-testid="aether-scroll-badge"
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full aether-spin-slow">
          <defs>
            <path
              id="aether-circle-path"
              d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"
            />
          </defs>
          <text fill="#08258f" fontSize="9" letterSpacing="2.5" className="uppercase font-semibold">
            <textPath href="#aether-circle-path">{labels.scrollBadge}</textPath>
          </text>
        </svg>
        <ArrowDown className="w-5 h-5 text-[#0038FF] relative" />
      </motion.div>
    </div>
  );
};

export default ProductMockup;
