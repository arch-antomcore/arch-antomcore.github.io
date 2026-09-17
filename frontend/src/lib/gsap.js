import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);
gsap.defaults({ ease: "power3.out", duration: 1.2 });

export const EASE_SOFT = "power3.out";
export const EASE_EXPO = "expo.out";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/* Global `data-reveal` engine: one GSAP tween per element, fired once when it
   enters the viewport. Light profile = shorter travel, no scale. */
export function initGsapReveals({ light = false } = {}) {
  if (typeof window === "undefined" || prefersReducedMotion()) return () => {};

  const tweens = [];
  const seen = new WeakSet();

  const reveal = (el) => {
    if (seen.has(el)) return;
    seen.add(el);
    const kind = el.dataset.reveal || "rise";
    const index = Number(el.dataset.revealIndex || 0);
    const from = { autoAlpha: 0, y: light ? 22 : 40 };
    if (kind === "scale" && !light) from.scale = 0.965;
    if (kind === "left") { from.x = light ? -18 : -40; from.y = 0; }
    if (kind === "fade") from.y = 0;

    tweens.push(
      gsap.fromTo(el, from, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: light ? 1.05 : 1.35,
        delay: index * 0.09,
        ease: EASE_SOFT,
        clearProps: "transform",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      }),
    );
  };

  const scan = (node) => {
    if (!(node instanceof Element)) return;
    if (node.matches("[data-reveal]")) reveal(node);
    node.querySelectorAll("[data-reveal]").forEach(reveal);
  };

  scan(document.body);
  const mo = new MutationObserver((records) => {
    records.forEach((record) => record.addedNodes.forEach(scan));
  });
  mo.observe(document.body, { childList: true, subtree: true });

  // Lazy routes, fonts and images shift the layout after triggers are created;
  // recompute start positions once the document height settles.
  let refreshTimer;
  const scheduleRefresh = () => {
    window.clearTimeout(refreshTimer);
    refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 220);
  };
  const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(scheduleRefresh) : null;
  ro?.observe(document.body);

  return () => {
    mo.disconnect();
    ro?.disconnect();
    window.clearTimeout(refreshTimer);
    tweens.forEach((tween) => {
      const targets = tween.targets();
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(targets, { clearProps: "opacity,visibility,transform" });
    });
  };
}

export { gsap, ScrollTrigger, useGSAP };
