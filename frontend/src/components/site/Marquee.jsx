import React from "react";
import { STACK } from "@/data/content";
import { useExperience } from "@/context/ExperienceContext";
import { LogoCarousel } from "@/components/ui/infinite-slider";

const carouselLogos = STACK.map((logo, id) => ({ ...logo, id }));

const Marquee = () => {
  const { isLightExperience } = useExperience();

  return (
    <div
      className="relative z-10 flex w-full justify-center py-6 md:py-10"
      data-testid="stack-marquee"
      data-carousel-template="vertical-logo-columns"
    >
      <LogoCarousel
        columnCount={3}
        logos={carouselLogos}
        isStatic={isLightExperience}
      />
    </div>
  );
};

export default Marquee;
