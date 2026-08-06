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
import { ArrowUpRight } from "@phosphor-icons/react";

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Numbered manifesto chapters — scroll reveal + rich hover choreography:
 * number lifts, arrow slides in, tangerine underline grows.
 */
export const ManifestoChapters = ({ chapters }) => (
  <div
    className="relative z-10 grid grid-cols-1 md:grid-cols-3 border-t border-b border-[#211d18]/10 divide-y md:divide-y-0 md:divide-x divide-[#211d18]/10"
    data-testid="aether-manifesto-chapters"
  >
    {chapters.map((c, i) => (
      <motion.div
        key={c.n}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
        transition={{ delay: i * 0.1 }}
        className="group relative p-8 md:p-12 lg:p-16 transition-colors duration-500 hover:bg-[#211d18]/[0.03]"
        data-cursor="hover"
        data-cursor-text="Ler"
        data-testid={`aether-manifesto-chapter-${c.n}`}
      >
        <div className="flex items-start justify-between">
          <span className="aether-font-serif italic text-2xl text-[#A34A33] inline-block origin-left transition-transform duration-500 group-hover:scale-125 group-hover:-translate-y-1">
            {c.n}
          </span>
          <ArrowUpRight className="w-5 h-5 text-[#211d18] opacity-0 -translate-x-2 translate-y-2 transition-[opacity,transform] duration-500 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
        </div>
        <h3 className="aether-font-display font-bold uppercase text-xl md:text-2xl mt-4 mb-1 tracking-tight text-[#211d18]">
          {c.title}
        </h3>
        <span className="block h-[2px] w-0 bg-[#A34A33] transition-[width] duration-500 group-hover:w-full mb-4" />
        <p className="text-sm md:text-base text-[#211d18]/55 leading-relaxed max-w-xs">
          {c.body}
        </p>
      </motion.div>
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
        <span className="text-[#A34A33] ml-12">///</span>
      </span>
    ))}
  </span>
);

/**
 * Scroll-velocity-reactive marquee: the obsidian band's speed and direction
 * respond to how fast (and which way) the user scrolls, with a subtle skew.
 */
export const EditorialMarquee = ({ items }) => {
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
    if (!isInView || document.hidden) return;
    let moveBy = directionFactor.current * -3.5 * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * Math.abs(velocityFactor.get());
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      ref={containerRef}
      className="relative z-10 bg-[#0A0A0A] py-6 md:py-8 overflow-hidden"
      data-testid="aether-editorial-marquee"
      aria-label="AetherCore highlights ticker"
    >
      <motion.div style={{ x, skewX }} className="flex whitespace-nowrap will-change-transform">
        <Chunk items={items} />
        <Chunk items={items} />
        <Chunk items={items} />
        <Chunk items={items} />
      </motion.div>
    </div>
  );
};
