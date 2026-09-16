import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CYCLE_INTERVAL = 2000;
const COLUMN_DELAY = 200;

export const shuffleArray = (array) => {
  const shuffled = [...array];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const replacementIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[replacementIndex]] = [
      shuffled[replacementIndex],
      shuffled[index],
    ];
  }

  return shuffled;
};

export const distributeLogos = (allLogos, columnCount) => {
  if (!allLogos.length || columnCount < 1) return [];

  const shuffled = shuffleArray(allLogos);
  const columns = Array.from({ length: columnCount }, () => []);

  shuffled.forEach((logo, index) => {
    columns[index % columnCount].push(logo);
  });

  const maxLength = Math.max(...columns.map((column) => column.length));
  columns.forEach((column) => {
    while (column.length < maxLength) {
      column.push(shuffled[Math.floor(Math.random() * shuffled.length)]);
    }
  });

  return columns;
};

export const getCurrentLogoIndex = (currentTime, columnIndex, logosLength) => {
  if (!logosLength) return 0;

  const adjustedTime = (currentTime + columnIndex * COLUMN_DELAY) % (CYCLE_INTERVAL * logosLength);
  return Math.floor(adjustedTime / CYCLE_INTERVAL);
};

const LogoContent = ({ logo }) => (
  <div className="absolute inset-0 flex items-center justify-center">
    <img
      src={logo.src}
      alt={logo.name}
      className="h-20 w-20 max-h-[80%] max-w-[80%] object-contain md:h-32 md:w-32"
      decoding="async"
      loading="lazy"
      draggable="false"
    />
  </div>
);

export const LogoColumn = React.memo(({ logos, index, currentTime, isStatic, profile = "full" }) => {
  const currentIndex = getCurrentLogoIndex(currentTime, index, logos.length);
  const currentLogo = useMemo(() => logos[currentIndex], [logos, currentIndex]);

  if (!currentLogo) return null;

  if (isStatic) {
    return (
      <div
        className="relative h-14 w-24 overflow-hidden md:h-24 md:w-48"
        data-testid="logo-carousel-column"
      >
        <LogoContent logo={currentLogo} />
      </div>
    );
  }

  return (
    <motion.div
      className="relative h-14 w-24 overflow-hidden md:h-24 md:w-48"
      data-testid="logo-carousel-column"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentLogo.id ?? currentLogo.name}-${currentIndex}`}
          className="absolute inset-0 flex items-center justify-center"
          initial={{
            y: profile === "light" ? "4%" : "10%",
            opacity: 0,
            filter: profile === "light" ? "blur(0px)" : "blur(8px)",
          }}
          animate={{
            y: "0%",
            opacity: 1,
            filter: "blur(0px)",
            transition: {
              ...(profile === "light"
                ? { type: "tween", ease: "easeOut", duration: 0.28 }
                : {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    mass: 1,
                    bounce: 0.2,
                    duration: 0.5,
                  }),
            },
          }}
          exit={{
            y: profile === "light" ? "-8%" : "-20%",
            opacity: 0,
            filter: profile === "light" ? "blur(0px)" : "blur(6px)",
            transition: {
              type: "tween",
              ease: "easeIn",
              duration: profile === "light" ? 0.2 : 0.3,
            },
          }}
        >
          <img
            src={currentLogo.src}
            alt={currentLogo.name}
            className="h-20 w-20 max-h-[80%] max-w-[80%] object-contain md:h-32 md:w-32"
            decoding="async"
            loading="lazy"
            draggable="false"
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
});

export function LogoCarousel({ columnCount = 2, logos, isStatic = false, profile = "full" }) {
  // The light product profile still cycles through integrations. It removes
  // blur and spring physics, while `isStatic` remains an explicit opt-out for
  // embeds that need a frozen snapshot.
  const shouldRemainStatic = isStatic;
  const [currentTime, setCurrentTime] = useState(0);
  const logoSets = useMemo(() => distributeLogos(logos, columnCount), [logos, columnCount]);

  const updateTime = useCallback(() => {
    setCurrentTime((previousTime) => previousTime + 100);
  }, []);

  useEffect(() => {
    if (shouldRemainStatic) return undefined;

    const intervalId = window.setInterval(updateTime, 100);
    return () => window.clearInterval(intervalId);
  }, [shouldRemainStatic, updateTime]);

  return (
    <div
      className="flex space-x-4"
      data-testid="logo-carousel"
      data-carousel-mode={shouldRemainStatic ? "static" : "animated"}
      data-carousel-profile={profile}
      aria-label="Tecnologias da plataforma AetherCore"
    >
      {logoSets.map((columnLogos, index) => (
        <LogoColumn
          key={index}
          logos={columnLogos}
          index={index}
          currentTime={currentTime}
          isStatic={shouldRemainStatic}
          profile={profile}
        />
      ))}
    </div>
  );
}
