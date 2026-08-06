/**
 * useLenisScroll — Custom hook for interacting with the Lenis smooth scroll instance.
 *
 * Provides:
 * - scrollTo(target, options) — wrapper around lenis.scrollTo()
 * - stop() / start() — pause/resume smooth scrolling (e.g. for modals)
 *
 * Usage:
 *   const { scrollTo, stop, start } = useLenisScroll();
 *   scrollTo('#section', { offset: -80, duration: 1.6 });
 */
import { useCallback } from "react";
import { useLenis } from "lenis/react";

export function useLenisScroll() {
  const lenis = useLenis();

  const scrollTo = useCallback(
    (target, options = {}) => {
      if (!lenis) {
        // Fallback to native scroll if Lenis is not yet mounted
        if (typeof target === "string") {
          const el = document.querySelector(target);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (typeof target === "number") {
          window.scrollTo({ top: target, behavior: "smooth" });
        }
        return;
      }

      lenis.scrollTo(target, {
        offset: options.offset ?? 0,
        duration: options.duration ?? 1.4,
        easing: options.easing ?? ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
        immediate: options.immediate ?? false,
        lock: options.lock ?? false,
        ...options,
      });
    },
    [lenis],
  );

  const stop = useCallback(() => {
    lenis?.stop();
  }, [lenis]);

  const start = useCallback(() => {
    lenis?.start();
  }, [lenis]);

  return { scrollTo, stop, start, lenis };
}

export default useLenisScroll;
