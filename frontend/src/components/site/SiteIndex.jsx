import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";

/**
 * SiteIndex — a cinematic, Awwwards-flavored navigation index.
 * Replaces the old "//mapa do site" card grid with an editorial list
 * that reacts to hover, cursor and scroll.
 */

const IndexRow = ({ item, index, total, activeIndex, setActiveIndex }) => {
  const mouseX = useMotionValue(0);
  const isActive = activeIndex === index;
  const rectRef = useRef(null);

  const handleMouseEnter = (event) => {
    rectRef.current = event.currentTarget.getBoundingClientRect();
    setActiveIndex(index);
  };

  const handleMouseMove = (event) => {
    if (!rectRef.current) {
      rectRef.current = event.currentTarget.getBoundingClientRect();
    }
    mouseX.set(event.clientX - rectRef.current.left);
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    setActiveIndex(-1);
  };

  const num = String(index + 1).padStart(2, "0");
  const rowBg = useMotionTemplate`radial-gradient(340px circle at ${mouseX}px 50%, rgba(109,40,217,0.10), transparent 65%)`;

  return (
    <motion.li
      className="sda-rise"
      style={{ "--sda-i": index }}
      initial={false}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <Link
        to={item.to}
        data-testid={`site-index-row-${index}`}
        className="group relative block overflow-hidden"
      >
        {/* Ambient spotlight following the cursor */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: rowBg }}
        />

        {/* Divider line — grows on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-[rgba(33,29,24,0.14)]"
        />
        {index === total - 1 && (
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-px bg-[rgba(33,29,24,0.14)]"
          />
        )}

        {/* Content grid */}
        <div className="relative flex items-center gap-6 py-8 md:py-10 lg:py-12 px-1 md:px-3">
          {/* Number */}
          <div className="w-14 md:w-24 shrink-0 font-mono text-[11px] md:text-xs uppercase tracking-[0.24em] text-[#837a6c]">
            <span className="tabular-nums">{num}</span>
            <span className="hidden md:inline"> / {String(total).padStart(2, "0")}</span>
          </div>

          {/* Title + description */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-4 overflow-hidden">
              <motion.h3
                animate={{
                  x: isActive ? 12 : 0,
                  color: isActive ? "#A34A33" : "#211d18",
                }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                className="text-2xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.05] truncate"
              >
                {item.t}
              </motion.h3>

              {/* Kinetic serif italic underline word (peeks on hover) */}
              <motion.span
                aria-hidden="true"
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  x: isActive ? 0 : -18,
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="hidden lg:inline-block font-serif-italic italic text-2xl text-[#A34A33]/80"
              >
                ↗
              </motion.span>
            </div>

            {/* Description — collapses vertically on rest, expands on hover */}
            <motion.p
              initial={false}
              animate={{
                height: isActive ? "auto" : 0,
                opacity: isActive ? 1 : 0,
                marginTop: isActive ? 10 : 0,
              }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm md:text-base text-[#5d564b] max-w-xl leading-relaxed overflow-hidden"
            >
              {item.d}
            </motion.p>
          </div>

          {/* Arrow bubble */}
          <div className="hidden md:flex shrink-0">
            <motion.span
              animate={{
                rotate: isActive ? 45 : 0,
                scale: isActive ? 1.1 : 1,
                backgroundColor: isActive ? "#211d18" : "rgba(255,255,255,0)",
                color: isActive ? "#f4f1e8" : "#211d18",
                borderColor: isActive ? "#211d18" : "rgba(33,29,24,0.2)",
              }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border"
            >
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.li>
  );
};

const SiteIndex = ({ items, kicker, title, desc, footerCaption }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Giant ambient word that drifts as you scroll
  const wordX = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const wordOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0, 0.09, 0.09, 0]);

  return (
    <section
      id="site-index"
      ref={sectionRef}
      data-testid="site-index"
      className="relative overflow-hidden py-24 md:py-36 sda-drift"
    >
      {/* Giant ambient scroll-driven word */}
      <motion.div
        aria-hidden="true"
        style={{ x: wordX, opacity: wordOpacity }}
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none"
      >
        <div className="whitespace-nowrap text-center font-display font-medium tracking-[-0.06em] text-[#211d18]"
          style={{ fontSize: "clamp(6rem, 22vw, 22rem)", lineHeight: 0.85 }}>
          {kicker?.toUpperCase()}
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-12 md:mb-20">
          <div className="lg:col-span-5 sda-blur">
            <span className="inline-flex items-center font-mono text-[11px] md:text-xs uppercase tracking-[0.28em] text-[#5d564b]">
              <span className="text-[#837a6c] mr-2">//</span>
              {kicker}
            </span>
            <h2 className="mt-5 text-4xl md:text-6xl font-medium tracking-tight leading-[1.02] text-[#211d18]">
              {title}
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex items-end sda-blur" style={{ "--sda-i": 2 }}>
            {desc && (
              <p className="text-base md:text-lg text-[#5d564b] leading-relaxed max-w-xl">
                {desc}
              </p>
            )}
          </div>
        </div>

        {/* Index list */}
        <ul className="relative border-t border-[rgba(33,29,24,0.14)]">
          {items.map((item, i) => (
            <IndexRow
              key={`${item.to}-${i}`}
              item={item}
              index={i}
              total={items.length}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          ))}
        </ul>

        {footerCaption && (
          <div className="mt-10 flex items-center justify-between gap-6 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-[#837a6c]">
            <span>{footerCaption}</span>
            <span className="tabular-nums">
              {String(items.length).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default SiteIndex;
