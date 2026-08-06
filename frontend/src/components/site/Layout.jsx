import React, { useEffect, useState, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { ReactLenis, useLenis } from "lenis/react";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { GlassFilter } from "@/components/liquid-glass";
import { useTranslation } from "@/hooks/useTranslation";
import { initScrollAnimations } from "@/lib/scrollAnimations";
import InteractiveDots from "@/components/ui/dots-pattern";
import { CustomCursor } from "@/components/aether/AetherKit";
import { Preloader } from "@/components/site/Preloader";
import { initLenisGsapSync } from "@/lib/lenisGsapSync";
import { InteractiveMenu } from "@/components/ui/modern-mobile-menu";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 32, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      data-testid="scroll-progress"
      style={{ scaleX }}
      className="scroll-progress fixed top-0 left-0 right-0 z-[70] h-[2px] origin-left bg-[#A34A33]"
    />
  );
};

const getHardwareTier = () => {
  if (typeof window === "undefined") return "high";

  // Allow query parameter or localStorage override for testing / presentation
  const urlParams = new URLSearchParams(window.location.search);
  const override = urlParams.get("motion") || localStorage.getItem("aether-motion-override");
  if (override === "high" || override === "medium" || override === "low") {
    return override;
  }

  // 1. Accessibility: Check if user prefers reduced motion
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    return "low";
  }

  // 2. Hardware: Constrained CPUs (< 4 cores) get low-performance tier
  const cores = navigator.hardwareConcurrency;
  if (cores && cores < 4) {
    return "low";
  }

  // 3. Viewport: Mobile devices get medium tier to conserve battery/performance
  if (window.matchMedia?.("(max-width: 767px)").matches) {
    return "medium";
  }

  return "high";
};

/* ── Premium Lenis configuration ──────────────────────────────────────
   Calibrated for a ultra-silky, cinematic feel matching Awwwards-grade sites.
   - lerp 0.08 → smooth exponential interpolation for buttery gliding
   - duration 1.2 → smooth decelerating momentum
   - wheelMultiplier 1.0 → natural 1:1 mouse wheel responsiveness
   - touchMultiplier 1.5 → fluid flick response on touch devices
   ──────────────────────────────────────────────────────────────────── */
const LENIS_OPTIONS = {
  autoToggle: true,
  anchors: true,
  stopInertiaOnNavigate: true,
  lerp: 0.1,
  smoothWheel: true,
  wheelMultiplier: 1.0,
  touchMultiplier: 1.0,
  infinite: false,
};

/**
 * Inner layout content — must be rendered inside <ReactLenis> so
 * useLenis() can access the scroll instance for route-aware scrolling
 * and GSAP synchronization.
 */
const LayoutInner = () => {
  const { pathname, hash } = useLocation();
  const { language } = useTranslation();
  const [isPreloading, setIsPreloading] = useState(() => {
    if (typeof window !== "undefined") {
      return !sessionStorage.getItem("aether-loaded");
    }
    return true;
  });

  // ── Lenis-powered scroll-to-top / anchor navigation & GSAP sync ──
  const lenisRef = React.useRef(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return undefined;
    lenisRef.current = lenis;
    const cleanup = initLenisGsapSync(lenis);
    return () => {
      cleanup();
      if (lenisRef.current === lenis) lenisRef.current = null;
    };
  }, [lenis]);

  // Route-change scroll handling via Lenis API
  useEffect(() => {
    const lenis = lenisRef.current;

    if (hash) {
      let retries = 0;
      const tryScroll = () => {
        const el = document.querySelector(hash);
        if (el) {
          if (lenis) {
            // Scroll to anchor using Lenis for a smooth, premium feel
            lenis.scrollTo(el, { offset: -80, duration: 1.6 });
          } else {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        } else if (retries < 15) {
          retries++;
          requestAnimationFrame(tryScroll);
        }
      };
      requestAnimationFrame(tryScroll);
      return;
    }

    // Scroll-to-top: use Lenis for an ultra-smooth reset, instant on first paint
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    }
  }, [pathname, hash]);

  // Dynamically update the html.lang tag
  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
  }, [language]);

  // Dynamic high-contrast favicon watcher for browser window titlebar
  useEffect(() => {
    const updateFavicon = () => {
      const isDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
      const faviconLink = document.getElementById("dynamic-favicon");
      if (faviconLink) {
        faviconLink.href = isDark ? "/favicon-light.png" : "/favicon-32.png";
      }
    };
    updateFavicon();
    const mediaQuery = window.matchMedia?.("(prefers-color-scheme: dark)");
    mediaQuery?.addEventListener?.("change", updateFavicon);
    return () => mediaQuery?.removeEventListener?.("change", updateFavicon);
  }, []);

  // Fallback engine for scroll-driven animations (non view()-timeline browsers)
  useEffect(() => initScrollAnimations(), []);

  // Device-aware motion budget. High-end machines keep the richer composition;
  // constrained hardware gets fewer infinite layers and lighter blur.
  useEffect(() => {
    const root = document.documentElement;
    const applyTier = () => {
      const tier = getHardwareTier();
      root.classList.remove("motion-tier-low", "motion-tier-medium", "motion-tier-high");
      root.classList.add(`motion-tier-${tier}`);
      root.dataset.motionTier = tier;
      window.dispatchEvent(new CustomEvent("aether:motion-tier-change", { detail: { tier } }));
    };

    applyTier();
    const motionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const widthQuery = window.matchMedia?.("(max-width: 767px)");
    motionQuery?.addEventListener?.("change", applyTier);
    widthQuery?.addEventListener?.("change", applyTier);
    const onVisibility = () => {
      root.classList.toggle("is-page-hidden", document.hidden);
      window.dispatchEvent(new Event("aether:motion-tier-change"));
    };
    document.addEventListener("visibilitychange", onVisibility);
    onVisibility();

    return () => {
      motionQuery?.removeEventListener?.("change", applyTier);
      widthQuery?.removeEventListener?.("change", applyTier);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Pause long-running animation scopes when they are away from the viewport.
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-out-of-view", !entry.isIntersecting);
        });
      },
      { rootMargin: "180px 0px" },
    );

    const observeWithin = (node) => {
      if (!(node instanceof Element)) return;
      if (node.matches("[data-anim-scope]")) observer.observe(node);
      node.querySelectorAll?.("[data-anim-scope]").forEach((scope) => observer.observe(scope));
    };

    document.querySelectorAll("[data-anim-scope]").forEach((scope) => observer.observe(scope));

    // Observe only newly-added subtrees instead of rescanning the whole page.
    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach(observeWithin));
    });
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  // Dynamic Route Prefetching & Idle Caching
  useEffect(() => {
    const routePreloaders = {
      "/": () => import("@/pages/Home"),
      "/produto": () => import("@/pages/Produto"),
      "/precos": () => import("@/pages/Precos"),
      "/arquitetura": () => import("@/pages/Arquitetura"),
      "/plugins": () => import("@/pages/Plugins"),
      "/casos-de-uso": () => import("@/pages/Casos"),
      "/principios": () => import("@/pages/Principios"),
      "/faq": () => import("@/pages/Faq"),
      "/blog": () => import("@/pages/Blog"),
      "/sustentabilidade": () => import("@/pages/Sustentabilidade"),
      "/sobre": () => import("@/pages/Sobre"),
      "/dossie": () => import("@/pages/Dossie"),
      "/roadmap": () => import("@/pages/Roadmap"),
      "/referencias": () => import("@/pages/Referencias"),
      "/privacidade": () => import("@/pages/Privacidade"),
      "/demo-glass": () => import("@/pages/DemoGlass"),
    };

    const prefetchedPaths = new Set();

    const prefetchRoute = (path) => {
      if (prefetchedPaths.has(path)) return;
      const loader = routePreloaders[path];
      if (loader) {
        prefetchedPaths.add(path);
        loader().catch(() => {
          prefetchedPaths.delete(path); // retry on failure
        });
      }
    };

    // 1. Idle prefetching: parse one route per idle slot so it never lands as
    // a four-chunk main-thread spike during the visitor's first scroll.
    let cancelled = false;
    let idleHandle;
    let delayHandle;
    const idleQueue = ["/produto", "/precos", "/arquitetura", "/sobre"];
    const canIdlePrefetch =
      !navigator.connection?.saveData &&
      (!navigator.deviceMemory || navigator.deviceMemory >= 4);
    const requestIdle = window.requestIdleCallback || ((cb) => window.setTimeout(cb, 120));
    const cancelIdle = window.cancelIdleCallback || window.clearTimeout;
    const scheduleNext = () => {
      if (cancelled || !idleQueue.length) return;
      idleHandle = requestIdle(async () => {
        if (cancelled) return;
        const nextPath = idleQueue.shift();
        prefetchRoute(nextPath);
        scheduleNext();
      }, { timeout: 5000 });
    };
    if (canIdlePrefetch) delayHandle = window.setTimeout(scheduleNext, 2800);

    // 2. Hover Pre-fetching: Preload any local path when hovering links or navigation buttons
    const onMouseOver = (e) => {
      if (!e.target || typeof e.target.closest !== "function") return;
      const link = e.target.closest("a");
      if (link) {
        const href = link.getAttribute("href");
        if (href && href.startsWith("/")) {
          const cleanPath = href.split("#")[0]; // remove anchor hashes
          prefetchRoute(cleanPath || "/");
        }
      }
    };

    document.addEventListener("mouseover", onMouseOver, { passive: true });
    return () => {
      cancelled = true;
      window.clearTimeout(delayHandle);
      if (idleHandle !== undefined) cancelIdle(idleHandle);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#f4f1e8] text-[#211d18]">
      <AnimatePresence>
        {isPreloading && (
          <Preloader 
            onComplete={() => {
              setIsPreloading(false);
              if (typeof window !== "undefined") {
                sessionStorage.setItem("aether-loaded", "true");
              }
            }} 
          />
        )}
      </AnimatePresence>
      <CustomCursor />
      <GlassFilter />
      <div
        className="noise-overlay"
        style={{ backgroundImage: "url(/assets/img/backgrounds/noise.png)" }}
        aria-hidden="true"
      />
      <Nav />
      <main className="relative z-10 bg-transparent">
        <React.Suspense
          fallback={
            <div className="min-h-[70vh] w-full flex items-center justify-center bg-[#f4f1e8]">
              <div className="flex flex-col items-center gap-3">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#211d18]/20 border-t-[#211d18]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                  {language === "pt" ? "Carregando..." : "Loading..."}
                </span>
              </div>
            </div>
          }
        >
          <Outlet />
        </React.Suspense>
      </main>
      <Footer />
      <div className="md:hidden fixed bottom-6 left-0 right-0 z-[60] px-4 pointer-events-none">
        <div className="pointer-events-auto">
          <InteractiveMenu />
        </div>
      </div>
    </div>
  );
};

const Layout = () => {
  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      <LayoutInner />
    </ReactLenis>
  );
};

export default Layout;
