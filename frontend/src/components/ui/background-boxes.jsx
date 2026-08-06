"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Animated footer grid rendered as three composited layers.
 *
 * The previous implementation mounted thousands of Framer Motion nodes (plus
 * hundreds of inline SVGs). That made the footer expensive even while it was
 * off-screen. This version keeps the same skewed, cursor-reactive character
 * with a single DOM subtree and only listens to the pointer while visible.
 */
export const BoxesCore = ({ className, ...rest }) => {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === "undefined") return undefined;

    let frame = 0;
    let listening = false;

    const updatePointer = (event) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = root.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        root.style.setProperty("--footer-grid-x", `${x.toFixed(2)}%`);
        root.style.setProperty("--footer-grid-y", `${y.toFixed(2)}%`);
      });
    };

    const start = () => {
      if (listening) return;
      listening = true;
      window.addEventListener("pointermove", updatePointer, { passive: true });
    };

    const stop = () => {
      if (!listening) return;
      listening = false;
      window.removeEventListener("pointermove", updatePointer);
    };

    const observer = new IntersectionObserver(
      ([entry]) => (entry?.isIntersecting ? start() : stop()),
      { rootMargin: "180px 0px" },
    );
    observer.observe(root);

    return () => {
      observer.disconnect();
      stop();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={cn("footer-grid-plane", className)}
      aria-hidden="true"
      {...rest}
    >
      <div className="footer-grid-plane__lines" />
      <div className="footer-grid-plane__glow" />
      <div className="footer-grid-plane__scan" />
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
