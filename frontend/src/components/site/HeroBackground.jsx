import React, { memo } from "react";

/* GPU-friendly abstract backdrop for the home hero — off-white edition. */

const PARTICLES = [
  { l: "14%", t: "32%", d: "0s", s: 3 },
  { l: "26%", t: "72%", d: "1.2s", s: 2 },
  { l: "44%", t: "18%", d: "2.1s", s: 2 },
  { l: "63%", t: "66%", d: "0.6s", s: 3 },
  { l: "78%", t: "26%", d: "1.8s", s: 2 },
  { l: "88%", t: "70%", d: "2.6s", s: 2 },
  { l: "54%", t: "84%", d: "1.0s", s: 2 },
  { l: "33%", t: "50%", d: "3.1s", s: 2 },
];

const STREAKS = [
  { top: "28%", rot: -14, delay: "0s", dur: "9s" },
  { top: "52%", rot: -14, delay: "2.5s", dur: "10s" },
  { top: "74%", rot: -14, delay: "1.2s", dur: "11s" },
];

const HeroBackground = memo(() => (
  <div
    className="hero-bg-root absolute inset-0 overflow-hidden pointer-events-none"
    aria-hidden="true"
    data-anim-scope
    data-dynamic="true"
  >
    <div className="absolute inset-0 overflow-hidden opacity-90">
      <div
        style={{
          "--white": "#fdfcf8",
          "--transparent": "transparent",
          "--blue-500": "#7dd3fc",
          "--indigo-300": "#c4b5fd",
          "--blue-300": "#a5b4fc",
          "--orange-200": "#ffd4c2",
          "--blue-400": "#99f6e4",
        }}
        className="
          [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
          [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--orange-200)_25%,var(--blue-400)_30%)]
          [background-image:var(--white-gradient),var(--aurora)]
          [background-size:300%,_200%]
          [background-position:50%_50%,50%_50%]
          filter blur-[10px]
          after:content-[''] after:absolute after:-inset-[150%] after:[background-image:var(--white-gradient),var(--aurora)]
          after:[background-size:200%,_100%]
          after:animate-aurora after:[will-change:transform]
          pointer-events-none absolute -inset-[10px] will-change-transform
          [mask-image:radial-gradient(ellipse_at_50%_30%,black_10%,transparent_70%)]
        "
      />
    </div>

    <div className="aurora-blob aurora-blob-primary h-[680px] w-[680px] left-1/2 -top-48" />
    <div className="aurora-blob aurora-blob-secondary h-[480px] w-[480px] -right-10 top-1/4" />
    <div className="aurora-blob aurora-blob-tertiary h-[450px] w-[450px] left-1/4 top-1/3" />

    <div className="hero-grid" />

    {STREAKS.map((s, i) => (
      <div
        key={i}
        className="hero-streak absolute -left-1/4 -right-1/4 h-px"
        style={{
          top: s.top,
          transform: `rotate(${s.rot}deg)`,
          "--streak-delay": s.delay,
          "--streak-duration": s.dur,
        }}
      >
        <div className="hero-streak-line h-full w-full" />
      </div>
    ))}

    {PARTICLES.map((p, i) => (
      <span
        key={i}
        className="hero-particle absolute rounded-full bg-[#A34A33]/30"
        style={{
          left: p.l,
          top: p.t,
          height: p.s,
          width: p.s,
          "--particle-delay": p.d,
          "--particle-duration": `${8 + i}s`,
        }}
      />
    ))}

    <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-[#f4f1e8]" />
  </div>
));

HeroBackground.displayName = "HeroBackground";

export default HeroBackground;
