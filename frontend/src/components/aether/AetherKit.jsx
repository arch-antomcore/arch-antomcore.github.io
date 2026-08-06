import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const GLYPHS = "AETHRCO#/%&X*";

/* Terminal-style decode effect: random glyphs resolve into the final text. */
export const ScrambleText = ({ text, delay = 0, className }) => {
  const [display, setDisplay] = useState(text.replace(/\S/g, "\u00A0"));

  useEffect(() => {
    let interval;
    let frame = 0;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        frame += 1;
        const resolved = Math.floor((frame * text.length) / 22);
        setDisplay(
          text
            .split("")
            .map((c, i) => {
              if (i < resolved || c === " ") return c;
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join("")
        );
        if (resolved >= text.length) clearInterval(interval);
      }, 45);
    }, delay * 1000);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay]);

  return (
    <span className={className} data-testid="aether-scramble-text">
      {display}
    </span>
  );
};

/* Slow-drifting blurred blobs — ambient looping background. */
export const AmbientBlobs = () => (
  <div
    className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    data-testid="aether-ambient-blobs"
    aria-hidden="true"
  >
    <div className="aether-blob aether-blob--ink" />
    <div className="aether-blob aether-blob--tangerine" />
  </div>
);

/* Custom cursor — vanilla RAF spring physics (matches the AetherCore Cursor Lab reference).
   - dot: 8px tangerine, follows the mouse instantly (scale 0 on hover).
   - ring: 32px, spring-lagged with stiffness=0.16 / damping=0.75; on hover grows to 50px
     with tangerine fill.
   - label: optional tag from data-cursor-text on the hovered element.
*/
export const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let ringVx = 0;
    let ringVy = 0;
    let isHovering = false;
    let isCursorHidden = true;
    let currentLabel = "";
    const stiffness = 0.16;
    const damping = 0.75;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;

    // Set initial hidden states
    if (dot) {
      dot.style.opacity = "0";
      dot.style.scale = "1";
    }
    if (ring) {
      ring.style.opacity = "0";
    }
    if (label) {
      label.style.opacity = "0";
    }

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const getCursorTarget = (e) => {
      if (!e || !e.target || typeof e.target.closest !== "function") return null;
      // Exclusively target the Console AetherCore product mockup section
      return e.target.closest("[data-testid='aether-product-mockup-section'] [data-cursor='hover']");
    };

    const onOver = (e) => {
      const target = getCursorTarget(e);
      if (target) {
        isCursorHidden = false;
        isHovering = true;
        document.documentElement.classList.add("aether-cursor-active");
        if (dot) {
          dot.style.opacity = "1";
          dot.style.scale = "0"; // shrink dot when hovering to fill the ring
        }
        if (ring) {
          ring.style.opacity = "1";
          ring.classList.add("aether-hovering");
        }
        const txt = target.getAttribute("data-cursor-text") || "";
        if (txt !== currentLabel) {
          currentLabel = txt;
          if (label) {
            label.textContent = txt;
            label.style.opacity = txt ? "1" : "0";
            label.style.scale = txt ? "1" : "0.6";
          }
        }
      } else {
        isCursorHidden = true;
        isHovering = false;
        document.documentElement.classList.remove("aether-cursor-active");
        if (dot) dot.style.opacity = "0";
        if (ring) {
          ring.style.opacity = "0";
          ring.classList.remove("aether-hovering");
        }
        if (label) {
          label.style.opacity = "0";
          label.style.scale = "0.6";
        }
        currentLabel = "";
      }
    };

    const onOut = (e) => {
      if (!e.target || typeof e.target.closest !== "function") return;
      // We don't need to do anything here if onOver handles the enter/leave of elements properly.
      // But just to be safe, if we leave a target, we hide it.
      const target = e.target.closest("[data-cursor='hover']");
      if (target) {
        // If we are leaving the target, we should hide it.
        // Let's rely on onOver triggering for the new element (or document.body) to hide it.
      }
    };

    const onLeave = () => {
      document.documentElement.classList.remove("aether-cursor-active");
      if (dot) dot.style.opacity = "0";
      if (ring) {
        ring.style.opacity = "0";
        ring.classList.remove("aether-hovering");
      }
      if (label) label.style.opacity = "0";
    };
    
    const onEnter = (e) => {
      // Mouse entering window
      // Only show if we are over a valid target
      onOver(e);
    };
    
    const onDown = () => {
      if (!isCursorHidden) ring?.classList.add("aether-pressing");
    };
    const onUp = () => ring?.classList.remove("aether-pressing");

    let raf = null;
    let isRunning = false;

    const loop = () => {
      const ax = (mouseX - ringX) * stiffness;
      const ay = (mouseY - ringY) * stiffness;
      ringVx = (ringVx + ax) * damping;
      ringVy = (ringVy + ay) * damping;
      ringX += ringVx;
      ringY += ringVy;

      // Calculate speed and angle of travel for organic spring distortion
      const speed = Math.sqrt(ringVx * ringVx + ringVy * ringVy);
      const angle = Math.atan2(ringVy, ringVx) * (180 / Math.PI);
      
      // Stretch dynamically based on velocity (max stretch 1.4x, squash perpendicular)
      const stretch = Math.min(1 + speed * 0.015, 1.4);
      const squash = 1 / stretch;

      if (dot) {
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      if (ring) {
        const baseScale = isHovering ? 1.55 : 1.0;
        // Align rotation with velocity, stretch along travel vector, then rotate back
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${baseScale * stretch}, ${baseScale * squash}) rotate(${-angle}deg)`;
      }
      
      if (label) {
        // Inertial swing opposite to current velocity vector
        const offsetX = -Math.max(-10, Math.min(10, ringVx * 0.45));
        const offsetY = -Math.max(-8, Math.min(8, ringVy * 0.35));
        label.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(calc(-50% + ${offsetX}px), calc(-50% + ${34 + offsetY}px))`;
      }

      // If position has settled and the mouse is stationary, pause even while
      // hovering. The next pointer event restarts the spring immediately.
      const distToTarget = Math.abs(mouseX - ringX) + Math.abs(mouseY - ringY);
      if (distToTarget < 0.05 && speed < 0.01) {
        isRunning = false;
        raf = null;
        return;
      }

      raf = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        raf = requestAnimationFrame(loop);
      }
    };

    const onMoveWithLoop = (e) => {
      onMove(e);
      // We also check onMove to ensure it hides when not on Console target
      const target = getCursorTarget(e);
      if (!target && !isCursorHidden) {
          isCursorHidden = true;
          isHovering = false;
          document.documentElement.classList.remove("aether-cursor-active");
          if (dot) dot.style.opacity = "0";
          if (ring) {
            ring.style.opacity = "0";
            ring.classList.remove("aether-hovering");
          }
          if (label) {
            label.style.opacity = "0";
            label.style.scale = "0.6";
          }
          currentLabel = "";
      } else if (target && isCursorHidden) {
         onOver(e);
      }
      startLoop();
    };

    window.addEventListener("mousemove", onMoveWithLoop, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });
    document.addEventListener("mouseleave", onLeave, { passive: true });
    document.addEventListener("mouseenter", onEnter, { passive: true });
    document.addEventListener("mousedown", onDown, { passive: true });
    document.addEventListener("mouseup", onUp, { passive: true });
    startLoop();

    return () => {
      document.documentElement.classList.remove("aether-cursor-active");
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMoveWithLoop);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="aether-cursor-dot"
        data-testid="aether-cursor-dot"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="aether-cursor-ring"
        data-testid="aether-cursor-ring"
        aria-hidden="true"
      />
      <div
        ref={labelRef}
        className="aether-cursor-label"
        data-testid="aether-cursor-label"
        aria-hidden="true"
      />
    </>
  );
};

/* Obsidian intro curtain — shown only on the first visit of the session. */
export const IntroCurtain = () => {
  const [show] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      if (sessionStorage.getItem("aether-intro-done")) return false;
      sessionStorage.setItem("aether-intro-done", "1");
      return true;
    } catch {
      return false;
    }
  });
  const [done, setDone] = useState(false);
  if (!show || done) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#0A0A0A] flex items-center justify-center pointer-events-none"
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 0.85, delay: 0.65, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => setDone(true)}
      data-testid="aether-intro-curtain"
      aria-hidden="true"
    >
      <span className="block overflow-hidden">
        <motion.span
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          className="block aether-font-display font-extrabold uppercase tracking-tighter text-3xl md:text-5xl text-[#f4f1e8]"
        >
          AetherCore<span className="text-[#A34A33]">.</span>
        </motion.span>
      </span>
    </motion.div>
  );
};
