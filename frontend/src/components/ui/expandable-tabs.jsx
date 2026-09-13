"use client";
import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";

const buttonVariants = {
  initial: {
    paddingLeft: "0.65rem",
    paddingRight: "0.65rem",
  },
  animate: (isExpanded) => ({
    paddingLeft: isExpanded ? "0.95rem" : "0.65rem",
    paddingRight: isExpanded ? "0.95rem" : "0.65rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0, paddingLeft: 0, paddingRight: 0 },
  animate: { width: "auto", opacity: 1, paddingLeft: "0.5rem", paddingRight: "0.2rem" },
  exit: { width: 0, opacity: 0, paddingLeft: 0, paddingRight: 0 },
};

/* Calibrated spring for responsive, smooth expansion without layout lag */
const transition = { type: "spring", stiffness: 280, damping: 26, mass: 0.6 };

export function ExpandableTabs({
  tabs,
  className,
  activeColor = "text-white",
  onChange,
  activeTab,
}) {
  const [selected, setSelected] = React.useState(activeTab ?? null);
  const [hovered, setHovered] = React.useState(null);
  const [focused, setFocused] = React.useState(null);
  const outsideClickRef = React.useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const isControlled = activeTab !== undefined;
  const selectedIndex = isControlled ? activeTab : selected;
  const interactionIndex = hovered ?? focused;
  const motionTransition = prefersReducedMotion ? { duration: 0 } : transition;

  React.useEffect(() => {
    if (activeTab !== undefined) {
      setSelected(activeTab);
    }
  }, [activeTab]);

  useOnClickOutside(outsideClickRef, () => {
    if (!isControlled) {
      setSelected(null);
      onChange?.(null);
    }
  });

  const handleSelect = (index) => {
    setSelected(index);
    onChange?.(index);
  };

  const handleMouseEnter = (index) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const Separator = () => (
    <div className="mx-1 h-[22px] w-[1px] bg-white/10" aria-hidden="true" />
  );

  return (
    <div
      ref={outsideClickRef}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative flex flex-nowrap items-center gap-1 rounded-full border border-white/12 bg-zinc-950/80 p-1.5 shadow-2xl backdrop-blur-xl transition-all duration-300",
        className
      )}
    >
      {tabs.map((tab, index) => {
        if (tab.type === "separator") {
          return <Separator key={`separator-${index}`} />;
        }

        const Icon = tab.icon;
        const isSelected = selectedIndex === index;
        const isInteracting = interactionIndex === index;
        const isExpanded = isInteracting || (interactionIndex === null && isSelected);
        const isHighlight = isInteracting || (interactionIndex === null && isSelected);

        return (
          <motion.button
            key={tab.title}
            layout
            variants={buttonVariants}
            initial={false}
            animate="animate"
            custom={isExpanded}
            onMouseEnter={() => handleMouseEnter(index)}
            onFocus={() => setFocused(index)}
            onBlur={() => setFocused(null)}
            onClick={() => handleSelect(index)}
            transition={motionTransition}
            aria-label={tab.title}
            aria-current={isSelected ? "page" : undefined}
            data-nav-expanded={isExpanded ? "true" : "false"}
            title={tab.title}
            className={cn(
              "relative flex items-center rounded-full py-1.5 text-xs md:text-sm font-medium transition-colors duration-300 select-none cursor-pointer",
              isHighlight
                ? cn("text-white font-semibold", activeColor)
                : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            {/* Smooth gliding background pill under hovered / active tab */}
            {isHighlight && (
              <motion.div
                layoutId="nav-expandable-tab-glide"
                transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 280, damping: 26 }}
                className="absolute inset-0 rounded-full bg-white/12 border border-white/15 shadow-sm z-0 pointer-events-none"
              />
            )}

            <span className="relative z-10 flex items-center shrink-0">
              <Icon size={17} strokeWidth={1.75} />
            </span>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.span
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={motionTransition}
                  className="relative z-10 overflow-hidden select-none whitespace-nowrap"
                >
                  {tab.title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}
