"use client";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";

const buttonVariants = {
  initial: {
    paddingLeft: "0.65rem",
    paddingRight: "0.65rem",
  },
  animate: (isExpanded) => ({
    paddingLeft: isExpanded ? "1.05rem" : "0.65rem",
    paddingRight: isExpanded ? "1.05rem" : "0.65rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0, scale: 0.95 },
  animate: { width: "auto", opacity: 1, scale: 1 },
  exit: { width: 0, opacity: 0, scale: 0.95 },
};

/* Luxurious, low-mass spring for silky smooth expansion without abrupt snapping */
const transition = { type: "spring", stiffness: 210, damping: 24, mass: 0.75 };

export function ExpandableTabs({
  tabs,
  className,
  activeColor = "text-white",
  onChange,
  activeTab,
}) {
  const [selected, setSelected] = React.useState(activeTab ?? null);
  const [hovered, setHovered] = React.useState(null);
  const outsideClickRef = React.useRef(null);

  React.useEffect(() => {
    if (activeTab !== undefined) {
      setSelected(activeTab);
    }
  }, [activeTab]);

  useOnClickOutside(outsideClickRef, () => {
    setSelected(null);
    onChange?.(null);
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
        "relative flex flex-wrap items-center gap-1 rounded-full border border-white/12 bg-zinc-950/80 p-1.5 shadow-2xl backdrop-blur-xl transition-all duration-300",
        className
      )}
    >
      {tabs.map((tab, index) => {
        if (tab.type === "separator") {
          return <Separator key={`separator-${index}`} />;
        }

        const Icon = tab.icon;
        const isSelected = selected === index;
        const isHovered = hovered === index;
        const isExpanded = isSelected || isHovered;
        const isHighlight = isHovered || (hovered === null && isSelected);

        return (
          <motion.button
            key={tab.title}
            variants={buttonVariants}
            initial={false}
            animate="animate"
            custom={isExpanded}
            onMouseEnter={() => handleMouseEnter(index)}
            onClick={() => handleSelect(index)}
            transition={transition}
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
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                className="absolute inset-0 rounded-full bg-white/12 border border-white/15 shadow-sm z-0 pointer-events-none"
              />
            )}

            <span className="relative z-10 flex items-center shrink-0">
              <Icon size={17} strokeWidth={1.75} />
            </span>

            <AnimatePresence initial={false} mode="wait">
              {isExpanded && (
                <motion.span
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="relative z-10 overflow-hidden select-none whitespace-nowrap pl-2 pr-0.5"
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