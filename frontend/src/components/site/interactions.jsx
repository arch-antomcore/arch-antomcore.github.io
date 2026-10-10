import React, { useRef, useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useVelocity,
  useTransform,
} from "framer-motion";
import { useReducedMotion } from "@/lib/motionPreference";

export const useMotionBudget = () => {
  const [enabled, setEnabled] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const update = () => {
      setEnabled(!reducedMotion && !document.hidden);
    };

    update();
    document.addEventListener("visibilitychange", update);
    return () => {
      document.removeEventListener("visibilitychange", update);
    };
  }, [reducedMotion]);

  return enabled && !reducedMotion;
};

/* Thin scroll-progress bar fixed at the very top of the viewport */
export const ScrollProgress = () => {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 34,
    restDelta: 0.001,
  });
  if (reducedMotion) return null;
  return (
    <motion.div
      style={{ scaleX }}
      className="scroll-progress fixed top-0 left-0 right-0 z-[80] h-[2px] origin-left bg-[#0038FF]"
      aria-hidden="true"
    />
  );
};

/* Magnetic wrapper — direct transform via rAF, avoiding React re-render on every pointer move. */
export const Magnetic = ({ children, strength = 0.28, className = "" }) => {
  const ref = useRef(null);
  const rectRef = useRef(null);
  const raf = useRef(null);
  const enabled = useMotionBudget();

  const canTrackPointer = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;
  }, []);

  const onEnter = () => {
    if (!enabled || !canTrackPointer || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    rectRef.current = {
      left: r.left + window.pageXOffset,
      top: r.top + window.pageYOffset,
      width: r.width,
      height: r.height,
    };
    ref.current.style.willChange = "transform";
  };

  const onMove = (e) => {
    if (!enabled || !canTrackPointer || !ref.current) return;
    const el = ref.current;
    if (!rectRef.current) {
      onEnter();
    }
    const r = rectRef.current;
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      raf.current = null;
      const pageX = e.pageX;
      const pageY = e.pageY;
      const x = (pageX - (r.left + r.width / 2)) * strength;
      const y = (pageY - (r.top + r.height / 2)) * strength;
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
    });
  };

  const onLeave = () => {
    rectRef.current = null;
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = null;
    if (ref.current) {
      ref.current.style.removeProperty("transform");
      ref.current.style.removeProperty("will-change");
    }
  };

  useEffect(() => {
    const element = ref.current;
    const reset = () => {
      rectRef.current = null;
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = null;
      element?.style.removeProperty("transform");
      element?.style.removeProperty("will-change");
    };
    if (!enabled || !canTrackPointer) reset();
    return reset;
  }, [enabled, canTrackPointer]);

  return (
    <div
      ref={ref}
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`magnetic inline-block ${className}`}
    >
      {children}
    </div>
  );
};

/* Button-like Link with magnetic pull. variant: primary | ghost */
export const MagneticButton = ({
  to,
  children,
  variant = "primary",
  className = "",
  cursorText,
  ...rest
}) => {
  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-colors duration-300 overflow-hidden";
  const styles =
    variant === "primary"
      ? "border border-[#211d18] bg-[#211d18] !text-[#f7f4ec] shadow-[0_18px_38px_-16px_rgba(33,29,24,0.45)] hover:bg-[#0038FF] hover:border-[#0038FF] hover:shadow-[0_22px_48px_-14px_rgba(0,56,255,0.5)]"
    : variant === "orange"
      ? "border border-transparent bg-[#0038FF] !text-white shadow-[0_18px_40px_-16px_rgba(0,56,255,0.45)] hover:bg-[#211d18] hover:shadow-[0_24px_52px_-14px_rgba(33,29,24,0.55)]"
      : "border border-[#211d18]/20 text-[#211d18] hover:bg-[#211d18]/[0.05] hover:border-[#211d18]/45";
  const cursorProps = cursorText
    ? { "data-cursor": "hover", "data-cursor-text": cursorText }
    : {};
  return (
    <Magnetic strength={0.28}>
      <Link to={to} className={`${base} ${styles} ${className}`} {...cursorProps} {...rest}>
        {children}
      </Link>
    </Magnetic>
  );
};

/* A bounded pointer tilt. Work is scheduled only in response to pointer input. */
export const SpotlightCard = ({ as: Tag = "div", className = "", children, cursorText, enableTilt = true, ...rest }) => {
  const ref = useRef(null);
  const rectRef = useRef(null);
  const raf = useRef(null);
  const enabled = useMotionBudget();
  const canTrackPointer = useMemo(() => {
    if (typeof window === "undefined") return false;
    return Boolean(window.matchMedia?.("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const onEnter = () => {
    if (!enabled || !canTrackPointer || !enableTilt || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    rectRef.current = {
      left: r.left + window.pageXOffset,
      top: r.top + window.pageYOffset,
      width: r.width,
      height: r.height,
    };
    ref.current.style.willChange = "transform";
  };

  const onMove = (e) => {
    if (!enabled || !canTrackPointer || !enableTilt || !ref.current) return;
    const el = ref.current;
    if (!rectRef.current) {
      onEnter();
    }
    const r = rectRef.current;
    if (raf.current) cancelAnimationFrame(raf.current);

    if (enableTilt && r && r.width && r.height) {
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        const pageX = e.pageX;
        const pageY = e.pageY;
        const x = pageX - r.left;
        const y = pageY - r.top;
        const centerX = r.width / 2;
        const centerY = r.height / 2;
        const relX = x - centerX;
        const relY = y - centerY;
        const rotX = (Math.max(-1, Math.min(1, relY / centerY)) * -2.5).toFixed(2);
        const rotY = (Math.max(-1, Math.min(1, relX / centerX)) * 2.5).toFixed(2);
        el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px) scale3d(1.008, 1.008, 1.008)`;
      });
    }
  };

  const onLeave = () => {
    rectRef.current = null;
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = null;
    if (ref.current) {
      ref.current.style.removeProperty("transform");
      ref.current.style.removeProperty("will-change");
    }
  };

  useEffect(() => {
    const element = ref.current;
    const reset = () => {
      rectRef.current = null;
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = null;
      element?.style.removeProperty("transform");
      element?.style.removeProperty("will-change");
    };
    if (!enabled || !canTrackPointer || !enableTilt) reset();
    return reset;
  }, [enabled, canTrackPointer, enableTilt]);

  const cursorProps = cursorText
    ? { "data-cursor": "hover", "data-cursor-text": cursorText }
    : {};

  return (
    <Tag
      ref={ref}
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onBlur={onLeave}
      className={`aether-interactive-card card-glow transition-[border-color,box-shadow,background-color] duration-300 ease-out ${className}`}
      style={{ transformStyle: "preserve-3d", ...rest.style }}
      {...cursorProps}
      {...rest}
    >
      {children}
    </Tag>
  );
};

/* Headline that reveals word-by-word with a soft upward mask */
export const KineticText = ({ text, className = "", delay = 0 }) => {
  const enabled = useMotionBudget();
  const words = text.split(" ");
  if (!enabled) return <span className={className}>{text}</span>;
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden="true">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * 0.045,
            }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

/* Cycles through a list of words with a vertical slide — kinetic typography */
export const WordRotator = ({ words, interval = 2600, className = "" }) => {
  const [i, setI] = useState(0);
  const enabled = useMotionBudget();
  const longestWord = useMemo(
    () => words.reduce((longest, word) => (word.length > longest.length ? word : longest), words[0] || ""),
    [words],
  );

  useEffect(() => {
    if (!enabled) return;
    const t = setInterval(() => setI((p) => (p + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [enabled, words.length, interval]);

  if (!enabled) return <span className={className}>{words[0]}</span>;

  return (
    <span
      className="relative inline-grid select-none overflow-hidden align-bottom pt-[0.04em] pr-3 pb-[0.18em] leading-[1.12]"
      aria-live="polite"
    >
      <span className={`invisible col-start-1 row-start-1 inline-block whitespace-nowrap ${className}`}>
        {longestWord}
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          initial={{ y: "115%", opacity: 0, filter: "blur(7px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-115%", opacity: 0, filter: "blur(7px)" }}
          transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
          className={`col-start-1 row-start-1 inline-block select-none whitespace-nowrap will-change-transform ${className}`}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

/* ScrollVelocityEffect wraps any component and dynamically skews it / squeezes it based on scroll speed & direction. */
export const ScrollVelocityEffect = ({ children, className = "" }) => {
  const enabled = useMotionBudget();
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 300 });

  // Map scroll velocity to a slight tilt (skewY) and scale squeeze
  const skewY = useTransform(smoothVelocity, [-2000, 2000], [-3.5, 3.5]);
  const scale = useSpring(
    useTransform(smoothVelocity, (latest) => {
      const absVal = Math.abs(latest);
      return 1 - Math.min(absVal / 22000, 0.035);
    }),
    { damping: 40, stiffness: 300 }
  );

  return (
    <motion.div style={enabled ? { skewY, scale } : undefined} className={`origin-center ${enabled ? "will-change-transform" : ""} ${className}`}>
      {children}
    </motion.div>
  );
};
