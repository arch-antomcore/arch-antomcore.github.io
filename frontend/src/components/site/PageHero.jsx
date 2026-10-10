import React from "react";
import { ArrowUpRight, ArrowRight } from "@phosphor-icons/react";
import { Container } from "@/components/site/primitives";
import { MagneticButton } from "@/components/site/interactions";
import { Tiles } from "@/components/ui/tiles";
import { useTranslation } from "@/hooks/useTranslation";

// One shared cover: heavy typography, interactive tiles and a curved frame.
const PageHero = ({ kicker, lines = [], lead, primary, secondary }) => {
  const { language } = useTranslation();
  const isEnglish = language === "en";
  const action = (value, fallbackLabel, fallbackTo) => value ? {
    to: typeof value === "string" ? value : value.to || fallbackTo,
    href: typeof value === "object" ? value.href : undefined,
    isExternal: typeof value === "object" && value.isExternal,
    label: (typeof value === "object" && value.label) || fallbackLabel,
  } : null;
  const primaryAction = action(primary, isEnglish ? "Request early access" : "Solicitar acesso antecipado", "/#cta");
  const secondaryAction = action(secondary, isEnglish ? "View product" : "Ver produto", "/produto");
  const renderAction = (item, isPrimary) => {
    if (!item) return null;
    const Icon = isPrimary ? ArrowUpRight : ArrowRight;
    const className = `reference-action ${isPrimary ? "reference-action-primary" : "reference-action-secondary"}`;
    const testId = isPrimary ? "hero-primary-cta" : "hero-secondary-cta";
    const children = <>{item.label}<Icon className="h-4 w-4 shrink-0" aria-hidden="true" /></>;
    return item.isExternal && item.href ? (
      <a className={className} href={item.href} target="_blank" rel="noopener noreferrer" data-testid={testId}>{children}</a>
    ) : (
      <MagneticButton to={item.to} variant={isPrimary ? "primary" : "ghost"} className={className} data-testid={testId}>{children}</MagneticButton>
    );
  };
  return (
    <header className="reference-page-cover" data-testid="page-hero">
      <Container>
        <div className="reference-cover-panel aether-tile-surface">
        <Tiles tileSize="lg" />
          <div className="reference-cover-meta aether-enter">
            <span className="reference-cover-kicker"><span aria-hidden="true" />{kicker}</span>
            <span className="reference-cover-edition">AetherCore / MMXXVI</span>
          </div>
          <svg className="reference-cover-arrow" viewBox="0 0 80 100" fill="none" aria-hidden="true">
            <path d="M65 8c-4 36-19 70-42 58C-7 49 16 11 39 29c25 20 5 46-14 57m0 0 16-4m-16 4 3-17" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h1 className="reference-cover-title">
            {lines.map((line, index) => (
              <span key={index} className={`aether-enter ${index === 0 ? "reference-title-lime" : "reference-title-paper"}`} style={{ "--i": index + 1 }}>{line}{" "}</span>
            ))}
          </h1>
          <div className="reference-cover-bottom aether-enter" style={{ "--i": lines.length + 1 }}>
            {lead && <p className="reference-cover-lead">{lead}</p>}
            {(primaryAction || secondaryAction) && <div className="reference-cover-actions">{renderAction(primaryAction, true)}{renderAction(secondaryAction, false)}</div>}
          </div>
          <div className="reference-cover-rule"><span>EXPLORE ↓</span></div>
        </div>
      </Container>
    </header>
  );
};
export default PageHero;
