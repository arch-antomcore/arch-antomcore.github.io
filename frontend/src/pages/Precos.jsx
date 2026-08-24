import React from "react";
import PageHero from "@/components/site/PageHero";
import PricingSection from "@/components/site/PricingSection";
import CtaSection from "@/components/site/CtaSection";
import PrecosEditorial from "@/components/aether/PrecosEditorial";
import SectionRail from "@/components/aether/SectionRail";
import { useTranslation } from "@/hooks/useTranslation";

const Precos = () => {
  const { t, language } = useTranslation();
  const PRICING = t.PRICING;

  const railItems = language === "pt"
    ? [
        { id: "precos-hero", label: "01 · Intro" },
        { id: "precos-editorial", label: "02 · Preâmbulo" },
        { id: "pricing", label: "03 · Planos" },
        { id: "pricing-extras", label: "04 · Hardware" },
        { id: "cta", label: "05 · Contato" },
      ]
    : [
        { id: "precos-hero", label: "01 · Intro" },
        { id: "precos-editorial", label: "02 · Preamble" },
        { id: "pricing", label: "03 · Plans" },
        { id: "pricing-extras", label: "04 · Hardware" },
        { id: "cta", label: "05 · Contact" },
      ];

  return (
    <div data-testid="precos-page">
      <SectionRail items={railItems} />
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
