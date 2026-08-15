import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp } from "@phosphor-icons/react";
import { useTranslation } from "@/hooks/useTranslation";
import { Magnetic, useMotionBudget } from "@/components/site/interactions";
import { Boxes } from "@/components/ui/background-boxes";
import { motion } from "framer-motion";

const Footer = () => {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const motionEnabled = useMotionBudget({ allowLow: true });
  const [shouldReveal, setShouldReveal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const { t, language, setLanguage } = useTranslation();
  const { BRAND, FOOTER_LINKS } = t;

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const query = window.matchMedia("(min-width: 768px) and (min-height: 600px)");

    const update = () => {
      setShouldReveal(motionEnabled && query.matches && !isSafari);
    };

    update();
    if (query.addEventListener) {
      query.addEventListener("change", update);
    } else {
      query.addListener?.(update);
    }
    return () => {
      if (query.removeEventListener) {
        query.removeEventListener("change", update);
      } else {
        query.removeListener?.(update);
      }
    };
  }, [motionEnabled]);

  useEffect(() => {
    if (!wrapperRef.current || !contentRef.current) {
      return undefined;
    }

    if (!shouldReveal) {
      gsap.set(contentRef.current, { clearProps: "all" });
      return undefined;
    }

    gsap.registerPlugin(ScrollTrigger);
    let refreshFrame;
    let refreshTimer;
    const ctx = gsap.context(() => {
      gsap.set(contentRef.current, { y: 64 });

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 0.85,
          invalidateOnRefresh: true,
        },
      });

      timeline.to(contentRef.current, { y: 0, duration: 1 });

      refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
      refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 250);
    }, wrapperRef);

    return () => {
      cancelAnimationFrame(refreshFrame);
      window.clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [shouldReveal, language, pathname]);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: shouldReveal ? "smooth" : "auto" });

  const handleLinkClick = (e, to) => {
    if (!to) return;
    if (to.startsWith("/#") || to.startsWith("#")) {
      const hash = to.startsWith("/#") ? to.substring(1) : to;
      if (location.pathname === "/") {
        e.preventDefault();
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.pushState(null, "", hash);
        }
      } else {
        navigate(`/${hash}`);
      }
    }
  };

  const productLinks = [
    { label: language === "pt" ? "Início" : "Home", to: "/" },
    { label: language === "pt" ? "Produto" : "Product", to: "/produto" },
    { label: language === "pt" ? "Funcionamento Local" : "How it Works", to: "/produto#funcionamento" },
    { label: language === "pt" ? "Planos & Edições" : "Editions & Plans", to: "/produto#edicoes" },
    { label: language === "pt" ? "Casos de Uso" : "Use Cases", to: "/casos-de-uso" },
    { label: language === "pt" ? "Tabela de Riscos" : "Risk Comparison", to: "/casos-de-uso#comparison-section" },
    { label: language === "pt" ? "Preços" : "Pricing", to: "/precos" },
    { label: language === "pt" ? "Roadmap de Lançamentos" : "Release Roadmap", to: "/roadmap" },
    { label: language === "pt" ? "Ecossistema de Plugins" : "Plugin Ecosystem", to: "/plugins" },
    { label: language === "pt" ? "Ecossistema da Startup" : "Startup Ecosystem", to: "/#ecosystem" },
    { label: "MonitorSmith (Telemetria) ↗", href: "https://monitorsmith.app/" },
    { label: language === "pt" ? "Component Atlas (Em breve)" : "Component Atlas (Soon)", to: "/#ecosystem" },
  ];

  const exploreLinks = [
    { label: language === "pt" ? "Sobre a AetherCore" : "About AetherCore", to: "/sobre" },
    { label: language === "pt" ? "Equipe de Engenharia" : "Engineering Team", to: "/sobre#equipe" },
    { label: language === "pt" ? "Motor Duplo (Twin)" : "Symmetric Twin Engine", to: "/sobre#paradigma" },
    { label: language === "pt" ? "Blog & Novidades" : "Blog & News", to: "/blog" },
    { label: language === "pt" ? "Arquitetura do Sistema" : "System Architecture", to: "/arquitetura" },
    { label: language === "pt" ? "Nossos Princípios" : "Our Principles", to: "/principios" },
    { label: language === "pt" ? "Dossiê de Segurança" : "Security Dossier", to: "/dossie" },
    { label: language === "pt" ? "Fontes & Referências" : "References & Sources", to: "/referencias" },
    { label: language === "pt" ? "Plugins & Extensibilidade" : "Plugins & Extensibility", to: "/plugins" },
  ];

  const supportLinks = [
    { label: language === "pt" ? "Perguntas Frequentes" : "FAQ", to: "/faq" },
    { label: language === "pt" ? "Sustentabilidade Verde" : "Green Sustainability", to: "/sustentabilidade" },
    { label: language === "pt" ? "Política de Privacidade" : "Privacy Policy", to: "/privacidade" },
    { label: language === "pt" ? "Segurança Local-First" : "Local-First Security", to: "/arquitetura#seguranca" },
    { label: language === "pt" ? "Termos & Licenciamento" : "Terms & Licensing", to: "/sobre#licenciamento" },
    { label: language === "pt" ? "Sandbox Declarativo" : "Declarative Sandbox", to: "/referencias#configuracao" },
    { label: language === "pt" ? "Plano de Contingência" : "Contingency Plan", to: "/dossie#plano" },
    { label: language === "pt" ? "Solicitar Suporte" : "Request Support", to: "/#cta" },
    { label: language === "pt" ? "Model Context Protocol (MCP)" : "Model Context Protocol (MCP)", to: "/plugins#mcp" },
  ];

  return (
    <div
      ref={wrapperRef}
      className={
        shouldReveal
          ? "cinematic-footer-wrapper relative h-[90vh] w-full md:h-[95vh]"
          : "cinematic-footer-wrapper relative w-full py-16"
      }
      style={shouldReveal ? { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" } : undefined}
      data-anim-scope
      data-render-defer
    >
      <footer
        className={`${
          shouldReveal ? "fixed bottom-0 left-0 h-[65vh] md:h-[70vh]" : "relative"
        } flex w-full flex-col justify-end overflow-hidden bg-[#f4f1e8] text-[#211d18] border-t border-[#211d18]/10`}
        data-testid="site-footer"
        data-cursor="hidden"
      >
        <div className="absolute inset-0 overflow-hidden z-0">
          <div 
            className="absolute inset-0 w-full h-full z-10 pointer-events-none" 
            style={{
              background: "radial-gradient(circle at 50% 50%, transparent 20%, #f4f1e8 85%)",
            }}
          />
          <Boxes />
        </div>

        <div
          ref={contentRef}
          className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-6 pt-12 md:px-12 md:pb-8 flex flex-col justify-between h-full pointer-events-none"
        >
          <div className="footer-glass-surface w-full border border-[#211d18]/10 shadow-2xl pointer-events-auto relative overflow-hidden rounded-[24px]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#211d18]/20 to-transparent" />
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                visible: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                }
              }}
              className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-5 p-8 md:p-12 relative z-10"
            >
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="md:col-span-2 flex flex-col items-start gap-4"
              >
                <Link
                  to="/"
                  className="flex items-center gap-2.5 group pointer-events-auto"
                  data-testid="footer-brand-logo"
                >
                  <img
                    src="/assets/img/brand/logo-aether.png"
                    alt="AetherCore"
                    className="h-8 w-8 object-contain footer-logo-hover logo-invert"
                  />
                  <span className="text-xl font-medium tracking-tight text-[#211d18] font-display group-hover:text-[#211d18]/70 transition-colors">
                    {BRAND.name}
                  </span>
                </Link>

                <p className="text-sm text-[#211d18]/60 max-w-sm leading-relaxed mt-2 pointer-events-auto">
                  {language === "pt"
                    ? "IA local-first projetada para máxima privacidade, controle e velocidade."
                    : "Local-first AI designed for maximum privacy, control, and speed."}
                </p>
              </motion.div>

              {/* Col 2: Produto */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="flex flex-col gap-4 pointer-events-auto"
              >
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#211d18]/60 font-semibold">
                  {language === "pt" ? "Produto" : "Product"}
                </h3>
                <ul className="flex flex-col gap-3 text-sm text-[#211d18]/70">
                  {productLinks.map((link) => (
                    <li key={link.to || link.href || link.label}>
                      {link.href ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="footer-link-underline hover:text-[#211d18] transition-colors duration-200"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          to={link.to}
                          onClick={(e) => handleLinkClick(e, link.to)}
                          className="footer-link-underline hover:text-[#211d18] transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Col 3: Explorar */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="flex flex-col gap-4 pointer-events-auto"
              >
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#211d18]/60 font-semibold">
                  {language === "pt" ? "Explorar" : "Explore"}
                </h3>
                <ul className="flex flex-col gap-3 text-sm text-[#211d18]/70">
                  {exploreLinks.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        onClick={(e) => handleLinkClick(e, link.to)}
                        className="footer-link-underline hover:text-[#211d18] transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Col 4: Suporte */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="flex flex-col gap-4 pointer-events-auto"
              >
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#211d18]/60 font-semibold">
                  {language === "pt" ? "Suporte & Docs" : "Support & Docs"}
                </h3>
                <ul className="flex flex-col gap-3 text-sm text-[#211d18]/70">
                  {supportLinks.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        onClick={(e) => handleLinkClick(e, link.to)}
                        className="footer-link-underline hover:text-[#211d18] transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  {FOOTER_LINKS.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        onClick={(e) => handleLinkClick(e, link.to)}
                        className="footer-link-underline hover:text-[#211d18] transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col items-center justify-between gap-6 pt-6 md:flex-row pointer-events-auto">
            <p className="text-xs text-[#211d18]/50 font-mono tracking-tight text-center md:text-left">
              {BRAND.copyright}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center rounded-full bg-[#ece7da] border border-[#211d18]/10 p-0.5">
                <button
                  onClick={() => setLanguage("pt")}
                  className={`px-3 py-1 rounded-full text-[10px] font-mono transition-all duration-200 ${
                    language === "pt"
                      ? "bg-[#f4f1e8] text-[#211d18] border border-[#211d18]/10 shadow-sm"
                      : "text-[#211d18]/50 hover:text-[#211d18]"
                  }`}
                >
                  PT
                </button>
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1 rounded-full text-[10px] font-mono transition-all duration-200 ${
                    language === "en"
                      ? "bg-[#f4f1e8] text-[#211d18] border border-[#211d18]/10 shadow-sm"
                      : "text-[#211d18]/50 hover:text-[#211d18]"
                  }`}
                >
                  EN
                </button>
              </div>

              <div className="rounded-full bg-[#ece7da] border border-[#211d18]/10 px-3.5 py-1 flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-zinc-500/60 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#211d18]/40" />
                </span>
                <span className="font-mono text-[10px] tracking-wider text-[#211d18]/50 uppercase">
                  {BRAND.version}
                </span>
              </div>
            </div>

            <Magnetic strength={0.28}>
              <button
                onClick={scrollToTop}
                data-testid="footer-back-to-top"
                aria-label={language === "pt" ? "Voltar ao topo" : "Back to top"}
                className="group flex h-9 w-9 items-center justify-center rounded-full border border-[#211d18]/10 bg-[#ece7da] hover:bg-[#f4f1e8] hover:border-[#211d18]/20 text-[#211d18]/60 hover:text-[#211d18] transition-all duration-200 cursor-pointer"
              >
                <ArrowUp
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </button>
            </Magnetic>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
