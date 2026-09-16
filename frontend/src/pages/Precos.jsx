import React from "react";
import PageHero from "@/components/site/PageHero";
import PricingSection from "@/components/site/PricingSection";
import CtaSection from "@/components/site/CtaSection";
import PrecosEditorial from "@/components/aether/PrecosEditorial";
import { useTranslation } from "@/hooks/useTranslation";

const Precos = () => {
  const { t, language } = useTranslation();
  const PRICING = t.PRICING;

  return (
    <div data-testid="precos-page">
      <div id="precos-hero">
        <PageHero
          kicker={PRICING.kicker}
          lines={PRICING.title}
          lead={PRICING.lead}
          ghostWord={language === "en" ? "Pricing" : "Preços"}
          primary={{ to: "/#cta" }}
          secondary={{ to: "/produto" }}
        />
      </div>
      <div id="precos-editorial">
        <PrecosEditorial />
      </div>
      <PricingSection />
      <CtaSection />
    </div>
  );
};

export default Precos;
