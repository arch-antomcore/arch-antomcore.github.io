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

const getMotionTier = () =>
  typeof document === "undefined"
    ? "medium"
    : document.documentElement.dataset.motionTier || "medium";

export const useMotionBudget = ({ allowLow = false } = {}) => {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const update = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const override = urlParams.get("motion") || localStorage.getItem("aether-motion-override");

      if (override === "high") {
        setEnabled(true);
        return;
      }
      if (override === "low") {
        setEnabled(allowLow);
        return;
      }
      if (override === "medium") {
        setEnabled(true);
        return;
      }

      const tier = getMotionTier();
      setEnabled(!document.hidden && (allowLow || tier !== "low"));
    };

    update();
    document.addEventListener("visibilitychange", update);
    window.addEventListener("aether:motion-tier-change", update);
    return () => {
      document.removeEventListener("visibilitychange", update);
      window.removeEventListener("aether:motion-tier-change", update);
    };
  }, [allowLow]);

  return enabled;
};

/* Thin scroll-progress bar fixed at the very top of the viewport */
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 34,
    restDelta: 0.001,
  });
  return (
    <motion.div
      style={{ scaleX }}
      className="scroll-progress fixed top-0 left-0 right-0 z-[80] h-[2px] origin-left bg-[#A34A33]"
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
    if (!ref.current) return;
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
    if (ref.current) {
      ref.current.style.transform = "translate3d(0, 0, 0)";
      ref.current.style.willChange = "auto";
    }
  };

  useEffect(() => () => raf.current && cancelAnimationFrame(raf.current), []);

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
      ? "border border-[#211d18] bg-[#211d18] !text-[#f7f4ec] shadow-[0_18px_38px_-16px_rgba(33,29,24,0.45)] hover:bg-[#A34A33] hover:border-[#A34A33] hover:shadow-[0_22px_48px_-14px_rgba(109,40,217,0.5)]"
    : variant === "orange"
      ? "border border-transparent bg-[#A34A33] !text-white shadow-[0_18px_40px_-16px_rgba(163, 74, 51,0.45)] hover:bg-[#211d18] hover:shadow-[0_24px_52px_-14px_rgba(33,29,24,0.55)]"
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

/* Card that tracks the cursor to render an inner radial glow & 3D tilt micro-animation */
export const SpotlightCard = ({ as: Tag = "div", className = "", children, cursorText, enableTilt = true, ...rest }) => {
  const ref = useRef(null);
  const rectRef = useRef(null);
  const raf = useRef(null);
  const enabled = useMotionBudget({ allowLow: true });

  const onEnter = () => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    rectRef.current = {
      left: r.left + window.pageXOffset,
      top: r.top + window.pageYOffset,
      width: r.width,
      height: r.height,
    };
    ref.current.style.willChange = "transform, background";
  };

  const onMove = (e) => {
    if (!enabled || !ref.current) return;
    const el = ref.current;
    if (!rectRef.current) {
      onEnter();
    }
    const r = rectRef.current;
    if (raf.current) cancelAnimationFrame(raf.current);

    if (enableTilt && r && r.width && r.height) {
      raf.current = requestAnimationFrame(() => {
        const pageX = e.pageX;
        const pageY = e.pageY;
        const x = pageX - r.left;
        const y = pageY - r.top;
        const centerX = r.width / 2;
        const centerY = r.height / 2;
        const relX = x - centerX;
        const relY = y - centerY;
        const rotX = ((relY / centerY) * -5).toFixed(2);
        const rotY = ((relX / centerX) * 5).toFixed(2);
        el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px) scale3d(1.015, 1.015, 1.015)`;
      });
    }
  };

  const onLeave = () => {
    rectRef.current = null;
    if (raf.current) cancelAnimationFrame(raf.current);
    if (ref.current) {
      ref.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)";
      ref.current.style.willChange = "auto";
    }
  };

  useEffect(() => () => raf.current && cancelAnimationFrame(raf.current), []);

  const cursorProps = cursorText
    ? { "data-cursor": "hover", "data-cursor-text": cursorText }
    : {};

  return (
    <Tag
      ref={ref}
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`card-glow transition-transform duration-500 ease-out ${className}`}
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
  const enabled = useMotionBudget({ allowLow: true });
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
    <motion.div style={{ skewY, scale }} className={`origin-center will-change-transform ${className}`}>
      {children}
    </motion.div>
  );
};
