import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { EditorialMarquee } from "./AetherSections";

/* A moving index leads directly to prices; the plan cards appear only once. */
const PrecosEditorial = () => {
  const { t, language } = useTranslation();
  return (
    <section className="pricing-opening pt-8 pb-4 md:pt-12 md:pb-6" aria-label={language === "pt" ? "Do beta à equipe" : "From beta to your team"} data-testid="precos-editorial">
      <div data-testid="precos-marquee">
        <EditorialMarquee items={t.PRICING.plans.map((plan) => plan.name)} />
      </div>
    </section>
  );
};

export default PrecosEditorial;
