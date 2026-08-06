import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Fixed right-edge section rail.
 * Auto-discovers `[data-section]` blocks on the page and displays a stacked
 * chapter list. On scroll the active section is highlighted with a tangerine
 * dot + serif label. Very Awwwards editorial detail.
 */

const SectionRail = ({ items }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!items?.length) return;
    let ticking = false;

    const updateActiveSection = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.35;
      let bestIdx = 0;
      items.forEach((it, idx) => {
        const el = document.getElementById(it.id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollY >= top) bestIdx = idx;
        }
      });
      setActive(bestIdx);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActiveSection);
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  if (!items?.length) return null;

  return (
    <div
      className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col items-end gap-3.5 pointer-events-none"
      data-testid="section-rail"
      aria-hidden="true"
    >
      {items.map((it, idx) => {
        const isActive = idx === active;
        return (
          <a
            key={it.id}
            href={`#${it.id}`}
            className="pointer-events-auto flex items-center gap-3 group"
            data-cursor="hover"
            data-cursor-text="Jump"
          >
            <motion.span
              animate={{
                opacity: isActive ? 1 : 0,
                x: isActive ? 0 : 8,
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#211d18]/70"
            >
              {it.label}
            </motion.span>
            <motion.span
              animate={{
                scale: isActive ? 1.4 : 1,
                backgroundColor: isActive ? "#A34A33" : "rgba(33,29,24,0.25)",
              }}
              transition={{ duration: 0.3 }}
              className="block h-1.5 w-1.5 rounded-full"
            />
          </a>
        );
      })}
    </div>
  );
};

export default SectionRail;
