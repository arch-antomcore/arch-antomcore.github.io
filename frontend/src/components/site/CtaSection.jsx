import React, { useRef, useEffect, useState } from "react";
import { ArrowUpRight, ChatCircle as MessageCircle, LinkedinLogo as Linkedin } from "@phosphor-icons/react";
import { useTranslation } from "@/hooks/useTranslation";
import { Container, Reveal } from "@/components/site/primitives";
import { MEDIA, MediaCredit } from "@/components/aether/GlassMedia";

const LINKEDIN_URL = "https://www.linkedin.com/in/matheus-peres-da-silva/";

/* Video backdrop — lazy: only plays while the section is on screen */
const VideoBackdrop = () => {
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "120px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="none"
      poster={MEDIA.networkVideo.poster}
      onCanPlay={() => setReady(true)}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
        ready ? "opacity-30" : "opacity-20"
      }`}
      aria-hidden="true"
      data-testid="cta-video-bg"
    >
      <source src={MEDIA.networkVideo.src} type="video/mp4" />
    </video>
  );
};

const CtaSection = () => {
  const { t, language } = useTranslation();
  const CTA = t.CTA;

  return (
    <section id="cta" className="px-4 py-16 md:px-8 md:py-24" data-testid="cta-section">
      {/* Dark glass island with live video backdrop */}
      <div className="relative overflow-hidden rounded-[40px] bg-[#0b0a08]">
        <VideoBackdrop />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b0a08]/85 via-[#0b0a08]/55 to-[#0b0a08]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_80%_10%,rgba(163, 74, 51,0.16),transparent_60%)]" />
        <div className="noise-print absolute inset-0 opacity-[0.1] mix-blend-overlay" />

        <Container className="relative z-10 py-20 md:py-28">
          <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <Reveal>
              <span className="flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-[#f7f4ec]/60">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A34A33]" />
                {CTA.kicker}
              </span>
              <h2 className="aether-font-display mt-6 max-w-2xl text-4xl font-bold uppercase leading-[1.02] tracking-tight text-[#f7f4ec] md:text-6xl">
                {CTA.title}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#f7f4ec]/60 md:text-lg">
                {CTA.desc}
              </p>

              {/* Notice banner — glass */}
              <div className="mt-8 max-w-xl" data-testid="cta-notice">
                <div className="glass-panel flex items-start gap-3 !rounded-2xl px-5 py-4">
                  <MessageCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#A34A33]" strokeWidth={1.75} />
                  <span className="text-sm leading-relaxed text-[#f7f4ec]/85">{CTA.notice}</span>
                </div>
              </div>

              {/* CTA buttons — LinkedIn + Email */}
              <div className="mt-8 flex max-w-xl flex-col gap-4 sm:flex-row">
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="cta-linkedin-button"
                  data-cursor="hover"
                  data-cursor-text="LinkedIn"
                  className="group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-8 py-4 text-sm font-medium transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #0A66C2 0%, #004182 100%)",
                    color: "#fff",
                    boxShadow: "0 0 20px rgba(10, 102, 194, 0.25), 0 4px 12px rgba(0,0,0,0.15)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 30px rgba(10, 102, 194, 0.45), 0 6px 20px rgba(0,0,0,0.2)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(10, 102, 194, 0.25), 0 4px 12px rgba(0,0,0,0.15)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <Linkedin className="h-4.5 w-4.5" strokeWidth={1.75} />
                  {CTA.linkedinButton}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.75} />
                </a>

                <a
                  href="mailto:business@exvorn.tech"
                  data-testid="cta-email-button"
                  data-cursor="hover"
                  data-cursor-text="Email"
                  className="group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-8 py-4 text-sm font-medium transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #A34A33 0%, #7a3526 100%)",
                    color: "#fff",
                    boxShadow: "0 0 20px rgba(163, 74, 51, 0.25), 0 4px 12px rgba(0,0,0,0.15)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 30px rgba(163, 74, 51, 0.45), 0 6px 20px rgba(0,0,0,0.2)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(163, 74, 51, 0.25), 0 4px 12px rgba(0,0,0,0.15)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <MessageCircle className="h-4.5 w-4.5" strokeWidth={1.75} />
                  {language === "en" ? "Email us" : "Enviar email"}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.75} />
                </a>
              </div>

              {/* Founder avatar + micro-bio */}
              <div className="mt-10 flex max-w-xl items-center gap-4">
                <img
                  src="/founder.jpg"
                  alt="Matheus Peres"
                  className="h-12 w-12 rounded-full border-2 border-[#f7f4ec]/20 object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-[#f7f4ec]">Matheus Peres</p>
                  <p className="text-xs text-[#f7f4ec]/55">
                    {language === "en"
                      ? "Founder & CEO — always open for a good conversation"
                      : "Fundador & CEO — sempre aberto pra um bom papo"}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Details — liquid glass over the moving video */}
            <Reveal delay={0.1}>
              <div className="glass-panel p-8" data-cursor="hover" data-testid="cta-details-panel">
                <dl className="divide-y divide-[#f7f4ec]/10">
                  {CTA.details.map((d) => (
                    <div key={d.k} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                      <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#f7f4ec]/50">
                        {d.k}
                      </dt>
                      <dd className="text-sm text-[#f7f4ec]">{d.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </Container>

        <MediaCredit media={MEDIA.networkVideo} type={language === "en" ? "Video" : "Vídeo"} className="absolute bottom-5 right-5 md:bottom-6 md:right-8" />
      </div>
    </section>
  );
};

export default CtaSection;
