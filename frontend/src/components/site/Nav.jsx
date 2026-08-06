import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { List as Menu, X, ArrowUpRight, House as Home, Briefcase, FileText, CurrencyDollar as DollarSign, Cpu, ShieldCheck, Heart, Question as HelpCircle, Plant as Leaf, User, PuzzlePiece as Blocks } from "@phosphor-icons/react";
import { ScrollProgress, Magnetic } from "@/components/site/interactions";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";

import { useTranslation } from "@/hooks/useTranslation";
import { TextReveal } from "@/components/ui/cascade-text";

const tabs = [
  { title: "Início", icon: Home, to: "/" },
  { title: "Sobre", icon: User, to: "/sobre" },
  { title: "Produto", icon: Briefcase, to: "/produto" },
  { title: "Sustentabilidade", icon: Leaf, to: "/sustentabilidade" },
  { title: "Blog", icon: FileText, to: "/blog" },
  { title: "Preços", icon: DollarSign, to: "/precos" },
  { title: "Arquitetura", icon: Cpu, to: "/arquitetura" },
  { title: "Plugins", icon: Blocks, to: "/plugins" },
  { title: "Casos", icon: ShieldCheck, to: "/casos-de-uso" },
  { title: "Princípios", icon: Heart, to: "/principios" },
  { title: "FAQ", icon: HelpCircle, to: "/faq" },
];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, language, setLanguage } = useTranslation();
  const lastScrollY = useRef(0);

  const BRAND = t.BRAND;
  const NAV_LINKS = t.NAV_LINKS;
  const FOOTER_LINKS = t.FOOTER_LINKS;

  const translatedTabs = tabs.map((tab) => {
    const link = NAV_LINKS.find((l) => l.to === tab.to);
    return {
      ...tab,
      title: link ? link.label : tab.title,
    };
  });

  const activeIndex = translatedTabs.findIndex((t) => {
    if (t.to === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(t.to);
  });

  // ── Use Lenis scroll events for perfectly-synced navbar show/hide ──
  // This replaces the native window 'scroll' listener so the navbar
  // reacts to the interpolated Lenis position — no visual lag.
  const lenisInstanceRef = useRef(null);

  useLenis((lenis) => {
    // Keep a ref to the live instance for imperative use (stop/start)
    lenisInstanceRef.current = lenis;

    const currentScrollY = lenis.scroll;
    const isScrolled = currentScrollY > 12;
    setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));

    // Hide if scrolling down (and past the very top), show if scrolling up
    if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
      setHidden((prev) => (!prev ? true : prev));
    } else if (currentScrollY < lastScrollY.current) {
      setHidden((prev) => (prev ? false : prev));
    }

    lastScrollY.current = currentScrollY;
  });

  // ── Stop/Start Lenis when mobile menu opens/closes ──
  // Pauses smooth scroll while the fullscreen menu is open to prevent
  // background page scrolling.
  useEffect(() => {
    const lenis = lenisInstanceRef.current;
    if (!lenis) return;

    if (open) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      <ScrollProgress />
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        }`}
        data-testid="site-header"
      >
        {/* One composited glass layer keeps the fixed header inexpensive while scrolling. */}
        <div className="nav-glass absolute inset-0 z-0 pointer-events-none" aria-hidden="true" />

        {/* Original untouched content container positioned on top */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 h-16 md:h-[72px] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group" data-testid="brand-logo">
            <img
              src="/assets/img/brand/logo-aether.png"
              alt="AetherCore"
              fetchPriority="high"
              decoding="async"
              className="h-7 w-7 object-contain transition-transform duration-500 group-hover:rotate-[20deg] logo-invert"
            />
            <span className="flex items-baseline gap-2">
              <TextReveal
                text={BRAND.name}
                as="span"
                fontSize="15px"
                className="font-medium tracking-tight text-white"
                style={{ padding: 0 }}
                hoverColor="#A34A33"
              />
              <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                {BRAND.tagline}
              </span>
            </span>
          </Link>

          <div className="hidden md:block">
            <ExpandableTabs
              tabs={translatedTabs}
              activeTab={activeIndex !== -1 ? activeIndex : null}
              onChange={(index) => {
                if (index !== null && translatedTabs[index] && translatedTabs[index].to) {
                  navigate(translatedTabs[index].to);
                }
              }}
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switcher Button */}
            <button
              onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
              className="font-mono text-[10px] font-bold text-zinc-400 hover:text-white px-2.5 py-1 rounded-full border border-orange-300/15 bg-orange-400/[0.035] hover:bg-orange-400/[0.08] hover:border-orange-200/30 transition-all duration-300"
              aria-label={language === "pt" ? "Switch to English" : "Mudar para Português"}
            >
              {language === "pt" ? "EN" : "PT"}
            </button>

            <Magnetic strength={0.4} className="hidden md:inline-block">
              <Link
                to="/#cta"
                data-testid="nav-cta"
                className="group inline-flex items-center gap-1.5 rounded-full border border-[#211d18] bg-[#211d18] !text-[#f7f4ec] px-4 py-2 text-sm font-medium shadow-[0_14px_30px_-14px_rgba(33,29,24,0.45)] hover:bg-[#A34A33] hover:border-[#A34A33] hover:shadow-[0_18px_38px_-12px_rgba(109,40,217,0.5)] transition-all duration-300"
              >
                {language === "pt" ? "Acesso antecipado" : "Early access"}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.75} />
              </Link>
            </Magnetic>
            <button
              onClick={() => setOpen(true)}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white"
              data-testid="menu-open"
              aria-label="Abrir menu"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-black/95 supports-[backdrop-filter]:backdrop-blur-lg md:hidden overflow-y-auto"
            data-testid="mobile-menu"
            data-lenis-prevent
          >
            <div className="flex items-center justify-between px-6 h-16 shrink-0">
              <span className="text-[15px] font-medium tracking-tight">{BRAND.name}</span>
              <button
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15"
                data-testid="menu-close"
                aria-label="Fechar menu"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
            <div className="px-6 pt-6 pb-12 flex flex-col gap-1">
              {[...NAV_LINKS, ...FOOTER_LINKS].map((l, i) => (
                <motion.div
                  key={l.to + i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    to={l.to}
                    className="block py-3 text-2xl font-medium tracking-tight text-zinc-200 hover:text-white"
                    data-testid={`mobile-nav-${l.label.toLowerCase()}`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                to="/#cta"
                className="mt-6 inline-flex items-center justify-center gap-1.5 rounded-full border border-[#211d18] bg-[#211d18] !text-[#f7f4ec] px-5 py-3 font-medium shadow-[0_14px_30px_-14px_rgba(33,29,24,0.45)]"
                data-testid="mobile-nav-cta"
              >
                {language === "pt" ? "Acesso antecipado" : "Early access"} <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
