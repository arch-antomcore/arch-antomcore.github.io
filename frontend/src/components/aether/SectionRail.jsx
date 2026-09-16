import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const LABELS = {
  "what-is-aether": ["O que é Aether", "What is Aether"],
  "global-leak-counter": ["Telemetria", "Telemetry"],
  stack: ["Stack", "Stack"],
  synthesis: ["Síntese", "Synthesis"],
  cta: ["Contato", "Contact"],
  "plugins-conectores": ["Conectores", "Connectors"],
  "plugins-skills": ["Skills", "Skills"],
  "plugins-seguranca": ["Segurança", "Security"],
  "blog-posts": ["Artigos", "Articles"],
  configuracao: ["Configuração", "Configuration"],
};

const titleFromId = (id, language) => {
  const known = LABELS[id];
  if (known) return known[language === "pt" ? 0 : 1];
  return id.replace(/[-_]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const isChapterElement = (element) => {
  const { id, tagName } = element;
  if (!id || id.includes(":") || /(?:^|-)title$/.test(id)) return false;
  if (tagName === "SECTION") return true;
  if (Object.prototype.hasOwnProperty.call(LABELS, id)) return true;
  return /(?:^|-)hero$|(?:^|-)compare$|(?:^|-)audience$|(?:^|-)editorial$|(?:^|-)cards$|^(?:projetos|pricing|pricing-extras|configuracao|blog-posts|plano)$/.test(id);
};

const getDiscoveredItems = (language) => {
  if (typeof document === "undefined") return [];
  const seen = new Set();
  const elements = Array.from(document.querySelectorAll("main [id]"));
  const items = [{ id: "__top", label: language === "pt" ? "Início" : "Intro" }];

  elements.forEach((element) => {
    const { id } = element;
    if (!id || id === "__top" || seen.has(id)) return;
    if (element.closest('[data-testid="section-rail"]')) return;
    if (element !== document.getElementById(id) || !isChapterElement(element)) return;
    seen.add(id);
    items.push({ id, label: titleFromId(id, language) });
  });

  // Very short utility pages (for example the glass demo) may have no
  // editorial section ids at all. Keep the rail visible with a deterministic
  // end marker instead of disappearing on those routes.
  if (items.length === 1) {
    items.push({ id: "__bottom", label: language === "pt" ? "Fim" : "End" });
  }

  return items.map((item, index) => ({
    ...item,
    index: String(index + 1).padStart(2, "0"),
  }));
};

/**
 * Fixed right-edge chapter rail shared by every route. Pages can pass curated
 * `items`; otherwise page-level ids are discovered after lazy content mounts.
 */
const SectionRail = ({ items: providedItems }) => {
  const [active, setActive] = useState(0);
  const [discovered, setDiscovered] = useState([]);
  const { pathname } = useLocation();
  const { language } = useTranslation();
  const items = providedItems?.length ? providedItems : discovered;

  useEffect(() => {
    if (providedItems?.length) return undefined;
    let frame;
    let retry;
    const collect = () => {
      const next = getDiscoveredItems(language);
      setDiscovered(next);
      const hasEditorialAnchor = next.some((item) => !item.id.startsWith("__"));
      if (!hasEditorialAnchor) retry = window.setTimeout(collect, 120);
    };
    const schedule = window.requestAnimationFrame || ((callback) => window.setTimeout(callback, 0));
    frame = schedule(collect);
    return () => {
      window.cancelAnimationFrame?.(frame);
      window.clearTimeout(frame);
      window.clearTimeout(retry);
    };
  }, [pathname, language, providedItems]);

  useEffect(() => setActive(0), [pathname, items.length]);

  useEffect(() => {
    if (!items.length) return undefined;
    let ticking = false;
    const updateActiveSection = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.35;
      let bestIdx = 0;
      items.forEach((item, index) => {
        if (item.id === "__bottom") {
          if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 80) bestIdx = index;
          return;
        }
        const el = item.id === "__top" ? null : document.getElementById(item.id);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (scrollY >= top) bestIdx = index;
      });
      setActive(bestIdx);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        (window.requestAnimationFrame || ((callback) => window.setTimeout(callback, 16)))(updateActiveSection);
      }
    };
    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  const displayItems = useMemo(
    () => items.map((item, index) => ({ ...item, number: item.index || String(index + 1).padStart(2, "0") })),
    [items],
  );

  if (!displayItems.length) return null;

  const jumpTo = (event, item) => {
    event.preventDefault();
    if (item.id === "__top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (item.id === "__bottom") {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
      return;
    }
    document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col items-end gap-3.5"
      data-testid="section-rail"
      aria-label={language === "pt" ? "Navegação por capítulos" : "Chapter navigation"}
    >
      {displayItems.map((item, index) => {
        const isActive = index === active;
        return (
          <a
            key={item.id}
            href={item.id === "__top" ? "#" : `#${item.id}`}
            onClick={(event) => jumpTo(event, item)}
            className="pointer-events-auto flex items-center gap-3 group"
            data-cursor="hover"
            data-cursor-text={language === "pt" ? "Ir" : "Jump"}
            aria-current={isActive ? "location" : undefined}
          >
            <motion.span
              animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#211d18]/80 rounded-full bg-[#f4f1e8]/90 px-2.5 py-1 shadow-[0_6px_18px_-10px_rgba(33,29,24,0.4)] whitespace-nowrap"
            >
              {item.number} · {item.label}
            </motion.span>
            <motion.span
              animate={{
                scale: isActive ? 1.4 : 1,
                backgroundColor: isActive ? "#A34A33" : "rgba(138,131,119,0.7)",
              }}
              transition={{ duration: 0.25 }}
              className="block h-1.5 w-1.5 rounded-full"
            />
          </a>
        );
      })}
    </nav>
  );
};

export default SectionRail;
