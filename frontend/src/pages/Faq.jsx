import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Container, Section, Reveal } from "@/components/site/primitives";
import PageHero from "@/components/site/PageHero";
import CtaSection from "@/components/site/CtaSection";
import { FaqPro } from "@/components/faq-pro";

const Faq = () => {
  const { t, language } = useTranslation();
  const FAQ = t.FAQ;

  const faqItems = FAQ.items.map((item, index) => ({
    id: index.toString(),
    question: item.q,
    answer: item.a
  }));

  return (
    <div data-testid="faq-page">
      <PageHero
        kicker={FAQ.kicker}
        lines={FAQ.title}
        lead={FAQ.lead}
        primary={{ 
          label: language === "en" ? "Request early access" : "Solicitar acesso antecipado", 
          to: "/#cta" 
        }}
        secondary={{ 
          label: language === "en" ? "View use cases" : "Ver casos de uso", 
          to: "/casos-de-uso" 
        }}
      />

      <Section className="liquid-divider">
        <Container>
          <Reveal className="mt-8">
            <FaqPro items={faqItems} defaultOpenFirst={true} />
          </Reveal>
        </Container>
      </Section>

      <CtaSection />
    </div>
  );
};

export default Faq;
