import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useReducedMotion } from "@/lib/motionPreference";

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Numbered manifesto chapters with a staggered entrance.
 */
export const ManifestoChapters = ({ chapters }) => (
  <div
    className="relative z-10 grid grid-cols-1 md:grid-cols-3 border-t border-b border-[#211d18]/10 divide-y md:divide-y-0 md:divide-x divide-[#211d18]/10"
    data-testid="aether-manifesto-chapters"
  >
    {chapters.map((c, i) => (
      <motion.article
        key={c.n}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
        transition={{ delay: i * 0.1 }}
        className="group relative p-8 md:p-10 lg:p-14 transition-colors duration-500 hover:bg-[#0038FF]/[0.04]"
        data-testid={`aether-manifesto-chapter-${c.n}`}
      >
        <div className="flex items-start justify-between">
          <span className="manifesto-chapter-number text-3xl font-black text-[#0038FF] inline-block origin-left transition-transform duration-500 group-hover:-translate-y-1">
            {c.n}
          </span>
        </div>
        <h3 className="aether-font-display font-bold uppercase text-xl md:text-2xl mt-4 mb-1 tracking-tight text-[#211d18]">
          {c.title}
        </h3>
        <span className="block h-[2px] w-0 bg-[#0038FF] transition-[width] duration-500 group-hover:w-full mb-4" />
        <p className="text-sm md:text-base text-[#211d18]/75 leading-relaxed max-w-xs">
          {c.body}
        </p>
      </motion.article>
    ))}
  </div>
);

const wrapValue = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const Chunk = ({ items }) => (
  <span className="flex items-center shrink-0">
    {items.map((t, i) => (
      <span
        key={i}
        className="aether-font-display font-bold uppercase tracking-tight text-2xl md:text-4xl text-[#f4f1e8] mx-6 flex items-center"
      >
        {t}
        <span className="text-[#ccff00] ml-12" aria-hidden="true">✳</span>
      </span>
    ))}
  </span>
);

/**
 * Scroll-velocity-reactive marquee: the blue band's speed and direction
 * respond to how fast (and which way) the user scrolls, with a subtle skew.
 */
export const EditorialMarquee = ({ items }) => {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "240px 0px" });
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const skewX = useTransform(smoothVelocity, [-1500, 1500], ["4deg", "-4deg"]);
  const directionFactor = useRef(1);
  const x = useTransform(baseX, (v) => `${wrapValue(-25, 0, v)}%`);

  useAnimationFrame((t, delta) => {
    if (shouldReduceMotion || !isInView || document.hidden) return;
    let moveBy = directionFactor.current * -3.5 * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * Math.min(6, Math.abs(velocityFactor.get()));
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      ref={containerRef}
      className="relative z-10 bg-[#08258f] py-6 md:py-8 overflow-hidden"
      data-testid="aether-editorial-marquee"
      aria-label={items.join(" · ")}
    >
      <motion.div style={{ x: shouldReduceMotion ? 0 : x, skewX: shouldReduceMotion ? 0 : skewX }} className="flex whitespace-nowrap will-change-transform" aria-hidden="true">
        <Chunk items={items} />
        <Chunk items={items} />
        <Chunk items={items} />
        <Chunk items={items} />
      </motion.div>
    </div>
  );
};
