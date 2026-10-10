import React, { useCallback, useEffect, useState, useRef, useId } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/motionPreference";
import { useLenis } from "lenis/react";
import { List as Menu, X, ArrowUpRight, House as Home, Briefcase, FileText, CurrencyDollar as DollarSign, Cpu, ShieldCheck, Heart, Question as HelpCircle, Plant as Leaf, User, PuzzlePiece as Blocks, TrendUp } from "@phosphor-icons/react";
import { ScrollProgress, Magnetic } from "@/components/site/interactions";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { useTranslation } from "@/hooks/useTranslation";
import { TextReveal } from "@/components/ui/cascade-text";

const tabs = [
  { title: "Início", icon: Home, to: "/" },
  { title: "Ecossistema", icon: Blocks, to: "/ecossistema" },
  { title: "Sobre", icon: User, to: "/sobre" },
  { title: "Validação", icon: TrendUp, to: "/validacao" },
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
  const menuId = useId();
  const menuRef = useRef(null);
  const menuOpenRef = useRef(null);
  const menuCloseRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

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
    if (t.to.startsWith("/#")) {
      return location.pathname === "/" && location.hash === t.to.substring(1);
    }
    return location.pathname === t.to || location.pathname.startsWith(`${t.to}/`);
  });

  const updateHeader = useCallback((scrollY) => {
    const currentScrollY = Math.max(0, scrollY);
    const isScrolled = currentScrollY > 12;
    setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));

    if (currentScrollY <= 100 || currentScrollY < lastScrollY.current) {
      setHidden((prev) => (prev ? false : prev));
    } else if (currentScrollY > lastScrollY.current) {
      setHidden((prev) => (!prev ? true : prev));
    }

    lastScrollY.current = currentScrollY;
  }, []);

  const onLenisScroll = useCallback((instance) => updateHeader(instance.scroll), [updateHeader]);
  const lenis = useLenis(onLenisScroll);

  useEffect(() => {
    if (lenis) return undefined;
    let frame;
    const onScroll = () => {
      if (frame !== undefined) return;
      frame = window.requestAnimationFrame(() => {
        frame = undefined;
        updateHeader(window.scrollY);
      });
    };
    updateHeader(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [lenis, updateHeader]);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();
    return () => {
      document.body.style.overflow = previousOverflow;
      lenis?.start();
    };
  }, [open, lenis]);

  useEffect(() => {
    setOpen(false);
    setHidden(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return undefined;

    const opener = menuOpenRef.current;
    const frame = window.requestAnimationFrame(() => menuCloseRef.current?.focus());
    const handleMenuKey = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key === "Tab" && menuRef.current) {
        const focusable = Array.from(menuRef.current.querySelectorAll(
          'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
        ));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first) return;
        const isOutside = !menuRef.current.contains(document.activeElement);
        if (event.shiftKey && (document.activeElement === first || isOutside)) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && (document.activeElement === last || isOutside)) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handleMenuKey);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("keydown", handleMenuKey);
      opener?.focus({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => {
    const desktopQuery = window.matchMedia?.("(min-width: 1280px)");
    if (!desktopQuery) return undefined;

    const closeMenuAtDesktop = (event) => {
      if (event.matches) setOpen(false);
    };

    closeMenuAtDesktop(desktopQuery);
    desktopQuery.addEventListener?.("change", closeMenuAtDesktop);
    return () => desktopQuery.removeEventListener?.("change", closeMenuAtDesktop);
  }, []);

  const handleNavigate = (to) => {
    if (!to) return;
    lenis?.start();
    if (to.startsWith("/#") || to.startsWith("#")) {
      const hash = to.startsWith("/#") ? to.substring(1) : to;
      if (location.pathname !== "/" || location.hash !== hash) {
        // A changed URL is handled by Layout, including lazy anchor content.
        // Keeping the router in sync also makes the next Home click reliable.
        navigate(`/${hash}`);
      } else {
        const el = document.querySelector(hash);
        if (el) {
          if (lenis) {
            lenis.resize?.();
            lenis.scrollTo(el, {
              offset: -80,
              duration: prefersReducedMotion ? 0 : 1.2,
              immediate: prefersReducedMotion,
              force: true,
            });
          } else {
            el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
          }
        } else {
          navigate(`/${hash}`);
        }
      }
    } else if (to === location.pathname && !location.hash) {
      if (lenis) {
        lenis.resize?.();
        lenis.scrollTo(0, {
          duration: prefersReducedMotion ? 0 : 1.2,
          immediate: prefersReducedMotion,
          force: true,
        });
      } else {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
      }
      setHidden(false);
    } else {
      navigate(to);
    }
  };

  return (
    <>
      <ScrollProgress />
      <motion.header
        initial={prefersReducedMotion ? false : { y: "-100%", opacity: 0 }}
        animate={{ 
          y: hidden && !open ? "-100%" : "0%",
          opacity: hidden && !open ? 0 : 1
        }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50"
        data-testid="site-header"
        data-nav-hidden={hidden && !open ? "true" : "false"}
        data-nav-scrolled={scrolled ? "true" : "false"}
        onFocusCapture={() => setHidden(false)}
      >
        <div className="nav-glass absolute inset-0 z-0 pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 h-16 md:h-[72px] flex items-center justify-between">
          <Link
            to="/"
            onClick={(event) => {
              if (location.pathname === "/" && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                event.preventDefault();
                handleNavigate("/");
              }
            }}
            className="flex items-center gap-2.5 group"
            data-testid="brand-logo"
          >
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
                className="font-medium tracking-tight"
                style={{ padding: 0 }}
                color="#211d18"
                hoverColor="#0038FF"
              />
              <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                {BRAND.tagline}
              </span>
            </span>
          </Link>

          <div className="hidden xl:block shrink-0">
            <ExpandableTabs
              tabs={translatedTabs}
              activeTab={activeIndex !== -1 ? activeIndex : null}
              onChange={(index) => {
                if (index !== null && translatedTabs[index] && translatedTabs[index].to) {
                  handleNavigate(translatedTabs[index].to);
                }
              }}
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
              className="font-mono text-[10px] font-bold text-zinc-400 hover:text-white px-2.5 py-1 rounded-full border border-orange-300/15 bg-orange-400/[0.035] hover:bg-orange-400/[0.08] hover:border-orange-200/30 transition-all duration-300"
              aria-label={language === "pt" ? "Switch to English" : "Mudar para Português"}
            >
              {language === "pt" ? "EN" : "PT"}
            </button>

            <Magnetic strength={0.4} className="hidden xl:inline-block">
              <a
                href="#cta"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate("/#cta");
                }}
                data-testid="nav-cta"
                className="group inline-flex items-center gap-1.5 rounded-full border border-[#211d18] bg-[#211d18] !text-[#f7f4ec] px-4 py-2 text-sm font-medium shadow-[0_14px_30px_-14px_rgba(33,29,24,0.45)] hover:bg-[#0038FF] hover:border-[#0038FF] hover:shadow-[0_18px_38px_-12px_rgba(0,56,255,0.45)] transition-all duration-300 cursor-pointer"
              >
                {language === "pt" ? "Acesso antecipado" : "Early access"}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.75} />
              </a>
            </Magnetic>
            <button
              type="button"
              ref={menuOpenRef}
              onClick={() => setOpen(true)}
              className="xl:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#211d18]/20 text-[#211d18] hover:bg-[#211d18]/5 transition-colors"
              data-testid="menu-open"
              aria-label={language === "pt" ? "Abrir menu" : "Open menu"}
              aria-expanded={open}
              aria-controls={menuId}
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
            className="fixed inset-0 z-[70] bg-black/95 supports-[backdrop-filter]:backdrop-blur-lg xl:hidden overflow-y-auto"
            data-testid="mobile-menu"
            data-lenis-prevent
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label="Menu principal"
          >
            <div className="flex items-center justify-between px-6 h-16 shrink-0">
              <span className="text-[15px] font-medium tracking-tight">{BRAND.name}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                ref={menuCloseRef}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15"
                data-testid="menu-close"
                aria-label={language === "pt" ? "Fechar menu" : "Close menu"}
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
                  transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.05 * i }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      handleNavigate(l.to);
                    }}
                    className="block w-full text-left py-3 text-2xl font-medium tracking-tight text-zinc-200 hover:text-white"
                    data-testid={`mobile-nav-${l.label.toLowerCase()}`}
                  >
                    {l.label}
                  </button>
                </motion.div>
              ))}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  handleNavigate("/#cta");
                }}
                className="mt-6 inline-flex items-center justify-center gap-1.5 rounded-full border border-[#211d18] bg-[#211d18] !text-[#f7f4ec] px-5 py-3 font-medium shadow-[0_14px_30px_-14px_rgba(33,29,24,0.45)]"
                data-testid="mobile-nav-cta"
              >
                {language === "pt" ? "Acesso antecipado" : "Early access"} <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
