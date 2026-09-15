import React, { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { MotionConfig, useReducedMotion } from "framer-motion";
import { ReactLenis, useLenis } from "lenis/react";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { GlassFilter } from "@/components/liquid-glass";
import { useTranslation } from "@/hooks/useTranslation";
import { initScrollAnimations } from "@/lib/scrollAnimations";
import { CustomCursor } from "@/components/aether/AetherKit";
import { InteractiveMenu } from "@/components/ui/modern-mobile-menu";
import ExperienceSelector from "@/components/site/ExperienceSelector";
import { ExperienceProvider, useExperience } from "@/context/ExperienceContext";
import {
  applyExperienceToDocument,
  EXPERIENCE,
  getInitialExperience,
  saveExperience,
} from "@/lib/experience";

const getHardwareTier = (experience) => {
  if (typeof window === "undefined") return "high";

  // Preserve the existing query-string control for review and troubleshooting.
  const override = new URLSearchParams(window.location.search).get("motion");
  if (override === "high" || override === "medium" || override === "low") {
    return override;
  }

  // An explicit visitor choice is more reliable than trying to infer a GPU
  // from browser APIs (which do not expose a dependable GPU performance tier).
  if (experience === EXPERIENCE.LIGHT) return "low";
  if (experience === EXPERIENCE.FULL) return "high";

  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return "low";
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) return "low";
  if (window.matchMedia?.("(max-width: 767px)").matches) return "medium";
  return "high";
};

/* A single Lenis instance owns smooth scrolling in the full experience. */
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

const SiteContent = ({ lenis = null }) => {
  const { pathname, hash } = useLocation();
  const { language } = useTranslation();
  const { experience, isLightExperience } = useExperience();
  const prefersReducedMotion = useReducedMotion();
  const shouldReduceMotion = isLightExperience || prefersReducedMotion;

  useEffect(() => {
    if (!lenis) return undefined;
    let active = true;
    let cleanup = () => {};

    import("@/lib/lenisGsapSync")
      .then(({ initLenisGsapSync }) => {
        if (active) cleanup = initLenisGsapSync(lenis);
      })
      .catch(() => {});

    return () => {
      active = false;
      cleanup();
    };
  }, [lenis]);

  // Route-change scroll handling uses Lenis only in the full experience.
  useEffect(() => {
    if (hash) {
      let retries = 0;
      let retryTimer;
      const tryScroll = () => {
        const el = document.querySelector(hash);
        if (el) {
          if (lenis) {
            lenis.scrollTo(el, {
              offset: -80,
              duration: shouldReduceMotion ? 0 : 1.2,
              immediate: shouldReduceMotion,
            });
          } else {
            el.scrollIntoView({ behavior: "auto", block: "start" });
          }
        } else if (retries < 30) {
          retries += 1;
          retryTimer = window.setTimeout(tryScroll, 100);
        }
      };
      tryScroll();
      return () => window.clearTimeout(retryTimer);
    }

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
    return undefined;
  }, [pathname, hash, lenis, shouldReduceMotion]);

  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
  }, [language]);

  useEffect(() => {
    const updateFavicon = () => {
      const isDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
      const faviconLink = document.getElementById("dynamic-favicon");
      if (faviconLink) faviconLink.href = isDark ? "/favicon-light.png" : "/favicon-32.png";
    };
    updateFavicon();
    const mediaQuery = window.matchMedia?.("(prefers-color-scheme: dark)");
    mediaQuery?.addEventListener?.("change", updateFavicon);
    return () => mediaQuery?.removeEventListener?.("change", updateFavicon);
  }, []);

  // The fallback observer only exists for the animated profile. The light
  // profile renders content directly rather than staging it off-screen.
  useEffect(() => {
    if (isLightExperience) return undefined;
    return initScrollAnimations();
  }, [isLightExperience]);

  useEffect(() => {
    const root = document.documentElement;
    const applyTier = () => {
      const tier = getHardwareTier(experience);
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
  }, [experience]);

  // Off-screen animation bookkeeping is not needed when effects are not
  // mounted. Keeping it out of light mode also avoids a document-wide observer.
  useEffect(() => {
    if (isLightExperience || !("IntersectionObserver" in window)) return undefined;
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
    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach(observeWithin));
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname, isLightExperience]);

  // Full mode may warm likely next pages after idle time. In light mode those
  // background requests and parse tasks are deliberately avoided.
  useEffect(() => {
    if (isLightExperience) return undefined;

    const routePreloaders = {
      "/": () => import("@/pages/Home"),
      "/ecossistema": () => import("@/pages/Ecossistema"),
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
      if (!loader) return;
      prefetchedPaths.add(path);
      loader().catch(() => prefetchedPaths.delete(path));
    };

    let cancelled = false;
    let idleHandle;
    let delayHandle;
    const idleQueue = ["/produto", "/precos", "/arquitetura", "/sobre"];
    const canIdlePrefetch =
      !navigator.connection?.saveData &&
      (!navigator.deviceMemory || navigator.deviceMemory >= 4);
    const requestIdle = window.requestIdleCallback || ((callback) => window.setTimeout(callback, 120));
    const cancelIdle = window.cancelIdleCallback || window.clearTimeout;
    const scheduleNext = () => {
      if (cancelled || !idleQueue.length) return;
      idleHandle = requestIdle(() => {
        if (cancelled) return;
        prefetchRoute(idleQueue.shift());
        scheduleNext();
      }, { timeout: 5000 });
    };
    if (canIdlePrefetch) delayHandle = window.setTimeout(scheduleNext, 2800);

    const onMouseOver = (event) => {
      if (!event.target || typeof event.target.closest !== "function") return;
      const link = event.target.closest("a");
      const href = link?.getAttribute("href");
      if (href?.startsWith("/")) prefetchRoute(href.split("#")[0] || "/");
    };
    document.addEventListener("mouseover", onMouseOver, { passive: true });

    return () => {
      cancelled = true;
      window.clearTimeout(delayHandle);
      if (idleHandle !== undefined) cancelIdle(idleHandle);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, [isLightExperience]);

  return (
    <div className="relative min-h-screen bg-[#f4f1e8] text-[#211d18]">
      {!isLightExperience && <CustomCursor />}
      {!isLightExperience && <GlassFilter />}
      {!isLightExperience && (
        <div
          className="noise-overlay"
          style={{ backgroundImage: "url(/assets/img/backgrounds/noise.png)" }}
          aria-hidden="true"
        />
      )}
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
      <div
        className="md:hidden fixed left-0 right-0 z-[60] px-4 pointer-events-none"
        style={{ bottom: "max(1.5rem, env(safe-area-inset-bottom, 0px))" }}
      >
        <div className="pointer-events-auto">
          <InteractiveMenu />
        </div>
      </div>
    </div>
  );
};

const FullExperienceContent = () => {
  const lenis = useLenis();
  return <SiteContent lenis={lenis} />;
};

const FullExperienceRuntime = () => {
  const prefersReducedMotion = useReducedMotion();
  const options = prefersReducedMotion
    ? { ...LENIS_OPTIONS, anchors: false, lerp: 1, smoothWheel: false, touchMultiplier: 1 }
    : LENIS_OPTIONS;

  return (
    <ReactLenis root options={options}>
      <FullExperienceContent />
    </ReactLenis>
  );
};

const readInitialExperience = () => {
  // A full browser entry intentionally starts at the chooser again. React
  // state still carries the selection across client-side route changes, while
  // F5/direct entries do not inherit a previous device preference.
  const queryExperience = getInitialExperience();
  if (queryExperience) applyExperienceToDocument(queryExperience);
  return queryExperience;
};

const Layout = () => {
  const [experience, setExperience] = useState(readInitialExperience);
  const chooseExperience = useCallback((nextExperience) => {
    const saved = saveExperience(nextExperience);
    if (!saved) return;
    applyExperienceToDocument(saved);
    setExperience(saved);
  }, []);

  // Deep links keep their destination: the chooser renders in place and the
  // requested page appears right after the visitor picks a profile.
  if (!experience) {
    return <ExperienceSelector onSelect={chooseExperience} />;
  }

  const isLightExperience = experience === EXPERIENCE.LIGHT;
  return (
    <ExperienceProvider experience={experience} setExperience={chooseExperience}>
      <MotionConfig reducedMotion={isLightExperience ? "always" : "user"}>
        {isLightExperience ? <SiteContent /> : <FullExperienceRuntime />}
      </MotionConfig>
    </ExperienceProvider>
  );
};

export default Layout;
