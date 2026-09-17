import React, { useRef } from "react";
import { gsap, useGSAP, EASE_SOFT, prefersReducedMotion } from "@/lib/gsap";
import { useExperience } from "@/context/ExperienceContext";

/* Section-level entrance: one tween on enter (never scrubbed), so heavy
   children (glass cards, canvases) are not re-rastered on every frame. */
const GsapReveal = ({ children, className = "", y = 48, scale = 0.975, duration = 1.4 }) => {
  const ref = useRef(null);
  const { isLightExperience } = useExperience();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: isLightExperience ? 24 : y, scale: isLightExperience ? 1 : scale },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: isLightExperience ? 1.1 : duration,
          ease: EASE_SOFT,
          clearProps: "transform",
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        },
      );
    },
    { scope: ref, dependencies: [isLightExperience] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default GsapReveal;
