/**
 * Keep Lenis and GSAP ScrollTrigger on one animation clock.
 *
 * ReactLenis runs with autoRaf disabled. GSAP owns the only RAF that advances
 * Lenis, exactly as recommended by Lenis, which prevents two competing frame
 * loops and keeps scrubbed sections aligned with the interpolated scroll.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initLenisGsapSync(lenis) {
  if (!lenis || typeof window === "undefined") return () => {};

  gsap.registerPlugin(ScrollTrigger);

  const updateScrollTrigger = () => ScrollTrigger.update();

  lenis.on("scroll", updateScrollTrigger);
  
  // By default, let ReactLenis handle its own highly optimized RAF loop.
  // We just need to make sure GSAP ScrollTrigger updates when Lenis scrolls.
  gsap.ticker.lagSmoothing(0);

  return () => {
    lenis.off("scroll", updateScrollTrigger);
  };
}

export default initLenisGsapSync;
