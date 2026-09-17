/* One clock: GSAP's ticker advances Lenis and ScrollTrigger follows Lenis. */
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function initLenisGsapSync(lenis) {
  if (!lenis || typeof window === "undefined") return () => {};

  const updateScrollTrigger = () => ScrollTrigger.update();
  const tick = (time) => lenis.raf(time * 1000);

  lenis.on("scroll", updateScrollTrigger);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    lenis.off("scroll", updateScrollTrigger);
    gsap.ticker.remove(tick);
  };
}

export default initLenisGsapSync;
