import React, { useState } from 'react';

export function InfiniteSlider({
  children,
  gap = 48,
  duration = 28,
  durationOnHover,
  direction = 'horizontal',
  reverse = false,
  className = '',
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Compute effective animation duration on hover
  const activeDuration = isHovered && durationOnHover ? durationOnHover : duration;

  return (
    <div
      className={`overflow-hidden w-full select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="flex w-max items-center will-change-transform"
        style={{
          gap: `${gap}px`,
          animation: `aether-marquee-${reverse ? 'reverse' : 'forward'} ${activeDuration}s linear infinite`,
          transition: 'animation-duration 0.5s ease-out',
          transform: 'translateZ(0)',
        }}
      >
        {/* 3 copies are plenty for seamless looping up to ultra-wide 4K screens */}
        <div className="flex items-center shrink-0" style={{ gap: `${gap}px` }}>
          {children}
        </div>
        <div className="flex items-center shrink-0" style={{ gap: `${gap}px` }} aria-hidden="true">
          {children}
        </div>
        <div className="flex items-center shrink-0" style={{ gap: `${gap}px` }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
