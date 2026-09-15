import React, { useState } from 'react';

export function InfiniteSlider({
  children,
  gap = 48,
  duration = 28,
  reverse = false,
  className = '',
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`infinite-slider relative w-full overflow-hidden select-none ${className}`}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <div
        className={`infinite-slider__track flex w-max items-center will-change-transform ${reverse ? 'is-reverse' : ''} ${isHovered ? 'is-paused' : ''}`}
        style={{
          '--infinite-slider-gap': `${gap}px`,
          '--infinite-slider-duration': `${duration}s`,
        }}
      >
        <div className="infinite-slider__group flex shrink-0 items-center" style={{ gap: `${gap}px` }}>
          {children}
        </div>
        <div
          className="infinite-slider__group infinite-slider__group--clone flex shrink-0 items-center"
          style={{ gap: `${gap}px` }}
          aria-hidden="true"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
