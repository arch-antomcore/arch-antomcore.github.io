import { prefersReducedMotion } from "./motionPreference";

/* Fallback engine for the SDA (scroll-driven animation) system.
   Browsers with native `animation-timeline: view()` need nothing;
   older ones get an IntersectionObserver that toggles `.sda-in`. */

export function initScrollAnimations() {
  if (typeof window === "undefined") return () => {};

  const nativeSupport =
    typeof CSS !== "undefined" && CSS.supports?.("animation-timeline: view()");
  if (nativeSupport) return () => {};

  const reduced = prefersReducedMotion();
  const observed = new Set();

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("sda-in");
          io.unobserve(entry.target);
          observed.delete(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
  );

  const SELECTOR = ".sda-rise, .sda-fade, .sda-left, .sda-right, .sda-scale, .sda-blur";

  const observe = (el) => {
    if (!(el instanceof Element) || !el.matches(SELECTOR)) return;
    if (el.classList.contains("sda-in") || observed.has(el)) return;
    if (reduced) {
      el.classList.add("sda-in");
    } else {
      io.observe(el);
      observed.add(el);
    }
  };

  const observeWithin = (node) => {
    if (!(node instanceof Element)) return;
    observe(node);
    node.querySelectorAll?.(SELECTOR).forEach(observe);
  };

  observeWithin(document.body);

  const mo = new MutationObserver((records) => {
    records.forEach((record) => record.addedNodes.forEach(observeWithin));
    if (records.some((record) => record.removedNodes.length > 0)) {
      observed.forEach((el) => {
        if (el.isConnected) return;
        io.unobserve(el);
        observed.delete(el);
      });
    }
  });
  mo.observe(document.body, { childList: true, subtree: true });

  return () => {
    io.disconnect();
    mo.disconnect();
    observed.clear();
  };
}
