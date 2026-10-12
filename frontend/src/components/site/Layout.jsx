import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { applyMotionPreferenceToDocument } from "@/lib/motionPreference";
import { ReactLenis, useLenis } from "lenis/react";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import { initScrollAnimations } from "@/lib/scrollAnimations";
import { InteractiveMenu } from "@/components/ui/modern-mobile-menu";
import SectionRail from "@/components/aether/SectionRail";
import { ExperienceProvider } from "@/context/ExperienceContext";
import { initGsapReveals } from "@/lib/gsap";
import { applyRouteSeo } from "@/lib/seo";
import { Tiles } from "@/components/ui/tiles";

// One scroll runtime for the cinematic composition; touch scrolling stays native.
const LENIS_OPTIONS = {
  autoRaf: true,
  anchors: true,
  stopInertiaOnNavigate: true,
  lerp: 0.16,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1,
  infinite: false,
};

const SiteContent = ({ lenis = null, previousNavigation }) => {
  const { pathname, hash, key: locationKey } = useLocation();
  const { language } = useTranslation();

  useEffect(() => initGsapReveals(), []);
  useEffect(() => initScrollAnimations(), []);

  useEffect(() => {
    applyRouteSeo(pathname, language);
  }, [pathname, language]);

  useEffect(() => {
    // Router gives repeated visits to the same URL a new key. That includes
    // the mobile dock and links to an already-current section.
    const navigation = `${pathname}${hash}:${locationKey}`;
    if (previousNavigation.current === navigation) return undefined;
    if (hash) {
      let retries = 0;
      let retryTimer;
      const tryScroll = () => {
        let el;
        try {
          el = document.querySelector(hash);
        } catch {
          return;
        }
        if (el) {
          previousNavigation.current = navigation;
          if (lenis) {
            lenis.resize();
            lenis.scrollTo(el, {
              offset: -80,
              duration: 1.2,
              immediate: false,
              force: true,
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

    previousNavigation.current = navigation;
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo({ top: 0, behavior: "auto" });
    return undefined;
  }, [pathname, hash, locationKey, lenis, previousNavigation]);

  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
  }, [language]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("motion-tier-low", "motion-tier-medium", "motion-tier-high");
    delete root.dataset.motionTier;
    const onVisibility = () => {
      root.classList.toggle("is-page-hidden", document.hidden);
    };
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <div className="aether-tile-surface relative min-h-screen bg-[#f4f1e8] text-[#211d18]">
      <Tiles variant="paper" tileSize="lg" className="aether-site-tiles" />
      <Nav />
      <SectionRail />
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

const SmoothSiteContent = ({ previousNavigation }) => {
  const lenis = useLenis();
  return <SiteContent lenis={lenis} previousNavigation={previousNavigation} />;
};

const CinematicRuntime = () => {
  const previousNavigation = useRef(null);

  useLayoutEffect(() => applyMotionPreferenceToDocument(), []);

  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      <SmoothSiteContent previousNavigation={previousNavigation} />
    </ReactLenis>
  );
};

const Layout = () => (
  <ExperienceProvider>
    <CinematicRuntime />
  </ExperienceProvider>
);

export default Layout;
