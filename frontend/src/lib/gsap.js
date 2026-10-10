import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "./motionPreference";

gsap.registerPlugin(ScrollTrigger, useGSAP);
gsap.defaults({ ease: "power3.out", duration: 1.2 });

export const EASE_SOFT = "power3.out";
export const EASE_EXPO = "expo.out";

export { prefersReducedMotion };

/* Global `data-reveal` engine: one tween per element on viewport entry. */
export function initGsapReveals() {
  if (typeof window === "undefined" || prefersReducedMotion()) return () => {};

  const tweens = new Map();
  const seen = new WeakSet();

  const reveal = (el) => {
    if (seen.has(el)) return;
    seen.add(el);
    const kind = el.dataset.reveal || "rise";
    const index = Number(el.dataset.revealIndex || 0);
    const from = { autoAlpha: 0, y: 40 };
    if (kind === "scale") from.scale = 0.965;
    if (kind === "left") { from.x = -40; from.y = 0; }
    if (kind === "fade") from.y = 0;

    const tween = gsap.fromTo(el, from, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 1.35,
        delay: index * 0.09,
        ease: EASE_SOFT,
        clearProps: "opacity,visibility,transform",
        // Completed reveals must not retain nodes from previously visited routes.
        onComplete: () => tweens.delete(el),
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    tweens.set(el, tween);
  };

  const scan = (node) => {
    if (!(node instanceof Element)) return;
    if (node.matches("[data-reveal]")) reveal(node);
    node.querySelectorAll("[data-reveal]").forEach(reveal);
  };

  scan(document.body);
  const mo = new MutationObserver((records) => {
    records.forEach((record) => record.addedNodes.forEach(scan));
    // A route can disappear before its reveal trigger ever enters the viewport.
    // Kill that trigger immediately; allow ordinary DOM reparenting to finish.
    if (records.some((record) => record.removedNodes.length > 0)) {
      tweens.forEach((tween, el) => {
        if (el.isConnected) return;
        tween.scrollTrigger?.kill();
        tween.kill();
        tweens.delete(el);
      });
    }
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
    tweens.clear();
  };
}

export { gsap, ScrollTrigger, useGSAP };
