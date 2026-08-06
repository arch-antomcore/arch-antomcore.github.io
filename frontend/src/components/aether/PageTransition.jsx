import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

/**
 * Awwwards-style page transition curtain.
 * On route change: 3 stacked tangerine + ink slabs sweep across the viewport
 * with a serif label announcing the destination.
 * Runs once per route change (skipped on very first mount so the intro curtain wins).
 */

const ROUTE_LABELS = {
  pt: {
    "/": "Home",
    "/produto": "Produto",
    "/precos": "Preços",
    "/casos-de-uso": "Casos de Uso",
    "/arquitetura": "Arquitetura",
    "/sobre": "Sobre",
    "/blog": "Blog",
    "/plugins": "Plugins",
    "/principios": "Princípios",
    "/sustentabilidade": "Sustentabilidade",
    "/roadmap": "Roadmap",
    "/faq": "FAQ",
    "/privacidade": "Privacidade",
    "/dossie": "Dossiê",
    "/referencias": "Referências",
  },
  en: {
    "/": "Home",
    "/produto": "Product",
    "/precos": "Pricing",
    "/casos-de-uso": "Use Cases",
    "/arquitetura": "Architecture",
    "/sobre": "About",
    "/blog": "Journal",
    "/plugins": "Plugins",
    "/principios": "Principles",
    "/sustentabilidade": "Sustainability",
    "/roadmap": "Roadmap",
    "/faq": "FAQ",
    "/privacidade": "Privacy",
    "/dossie": "Dossier",
    "/referencias": "References",
  },
};

const PageTransition = ({ language = "pt" }) => {
  const { pathname } = useLocation();
  const initialRef = useRef(pathname);
  const [displayPath, setDisplayPath] = useState(pathname);

  useEffect(() => {
    // Skip the very first mount (initial page load) so it doesn't compete with the intro curtain.
    if (pathname === initialRef.current) return;
    setDisplayPath(pathname);
  }, [pathname]);

  const label = ROUTE_LABELS[language]?.[pathname] || pathname.replace("/", "") || "Home";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={displayPath}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[100]"
      >
        {/* Slab 1 — tangerine */}
        <motion.div
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.55, ease: [0.83, 0, 0.17, 1], delay: 0.0 }}
          style={{ transformOrigin: "top" }}
          className="absolute inset-0 bg-[#A34A33]"
        />
        {/* Slab 2 — ink */}
        <motion.div
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.55, ease: [0.83, 0, 0.17, 1], delay: 0.08 }}
          style={{ transformOrigin: "top" }}
          className="absolute inset-0 bg-[#211d18]"
        />
        {/* Slab 3 — off-white */}
        <motion.div
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.55, ease: [0.83, 0, 0.17, 1], delay: 0.16 }}
          style={{ transformOrigin: "top" }}
          className="absolute inset-0 bg-[#f4f1e8] flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#A34A33] animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#211d18]/50">
              //
            </span>
            <span className="aether-font-serif italic text-[#211d18] text-4xl md:text-6xl font-normal">
              {label}
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
