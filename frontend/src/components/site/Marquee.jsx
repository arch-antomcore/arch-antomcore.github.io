import React from "react";
import { STACK } from "@/data/content";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

const Marquee = () => {
  const row1 = STACK.slice(0, 7);
  const row2 = STACK.slice(7);

  return (
    <div className="relative z-10 w-full py-6 md:py-10 overflow-hidden" data-testid="stack-marquee">
      {/* Edge gradient masks for seamless screen fading */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#f4f1e8] via-[#f4f1e8]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#f4f1e8] via-[#f4f1e8]/80 to-transparent z-20 pointer-events-none" />

      {/* Row 1: Free Floating Logo + Name (Smooth Slowdown on Hover) */}
      <div className="mb-6 md:mb-8">
        <InfiniteSlider gap={48} duration={28} durationOnHover={80} className="w-full">
          {row1.map((item, idx) => (
            <div
              key={`row1-${item.name}-${idx}`}
              className="flex items-center gap-3.5 shrink-0 group cursor-pointer select-none py-1"
              title={item.name}
              data-cursor="hover"
              data-cursor-text={item.name}
            >
              <img
                src={item.src}
                alt={item.name}
                className="h-[38px] md:h-[50px] w-auto max-w-[130px] object-contain transition-transform duration-300 group-hover:scale-105"
                decoding="async"
                loading="lazy"
                draggable="false"
              />
              <span className="aether-font-display text-base md:text-xl font-bold tracking-tight text-[#211d18] transition-colors duration-300 group-hover:text-[#A34A33]">
                {item.name}
              </span>
            </div>
          ))}
        </InfiniteSlider>
      </div>

      {/* Row 2: Reverse Free Floating Logo + Name (Smooth Slowdown on Hover) */}
      <div>
        <InfiniteSlider gap={48} duration={24} durationOnHover={70} reverse className="w-full">
          {row2.map((item, idx) => (
            <div
              key={`row2-${item.name}-${idx}`}
              className="flex items-center gap-3.5 shrink-0 group cursor-pointer select-none py-1"
              title={item.name}
              data-cursor="hover"
              data-cursor-text={item.name}
            >
              <img
                src={item.src}
                alt={item.name}
                className="h-[38px] md:h-[50px] w-auto max-w-[130px] object-contain transition-transform duration-300 group-hover:scale-105"
                decoding="async"
                loading="lazy"
                draggable="false"
              />
              <span className="aether-font-display text-base md:text-xl font-bold tracking-tight text-[#211d18] transition-colors duration-300 group-hover:text-[#A34A33]">
                {item.name}
              </span>
            </div>
          ))}
        </InfiniteSlider>
      </div>
    </div>
  );
};

export default Marquee;
