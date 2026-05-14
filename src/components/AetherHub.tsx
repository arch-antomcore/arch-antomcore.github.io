import { useEffect, useRef } from 'react';

export default function AetherHub() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = document.getElementById('hub-header');
    const hint = document.getElementById('hub-scroll-hint');
    if (!section || !header) return;

    let ticking = false;
    let vh = window.innerHeight;

    function updateHub() {
      ticking = false;
      const rect = section!.getBoundingClientRect();
      const sTop = -rect.top;
      const range = vh * 0.85;
      const ratio = Math.min(1, Math.max(0, sTop / range));

      /* Height: 100vh → 72px */
      header!.style.height = (vh - (vh - 72) * ratio) + 'px';

      /* Background fade-in */
      const isNavy = document.documentElement.getAttribute('data-theme') === 'navy';
      const rgb = isNavy ? '8,21,38' : '7,6,4';
      header!.style.background = 'rgba(' + rgb + ',' + (ratio * 0.88) + ')';
      header!.style.backdropFilter = 'blur(' + (ratio * 18) + 'px)';
      (header!.style as any).webkitBackdropFilter = 'blur(' + (ratio * 18) + 'px)';
      header!.style.borderBottom = '1px solid rgba(168,117,50,' + (ratio * 0.14) + ')';

      /* Logo shrink */
      const lw = header!.querySelector<HTMLElement>('.hub-logo-wrap');
      if (lw) {
        const base = window.innerWidth < 640 ? 80 : 140;
        const sz = Math.round(base - (base - 32) * ratio) + 'px';
        lw.style.width = sz;
        lw.style.height = sz;
      }

      /* Wordmark fade + scale */
      const wm = header!.querySelector<HTMLElement>('.hub-wordmark');
      if (wm) {
        wm.style.transform = 'scale(' + (1 - ratio * 0.38) + ')';
        wm.style.opacity = '' + (1 - ratio * 0.45);
      }

      /* Scroll hint */
      if (hint) hint.classList.toggle('hidden', ratio > 0.05);
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateHub);
        ticking = true;
      }
    }

    const handleResize = () => {
      vh = window.innerHeight;
      updateHub();
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    updateHub();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section id="aether-hub-section" ref={sectionRef} aria-label="AetherCore Private AI Hub">

      {/* Ambient orbs */}
      <div className="hub-ambient" aria-hidden="true">
        <div className="hub-orb hub-orb-1"></div>
        <div className="hub-orb hub-orb-2"></div>
        <div className="hub-orb hub-orb-3"></div>
      </div>

      {/* Spacer so hero header starts at scroll-start of section */}
      <div className="hub-spacer" aria-hidden="true"></div>

      {/* Sticky hero header — collapses to thin bar on scroll */}
      <header className="hub-header" id="hub-header">
        <div className="hub-hero-inner">

          <div className="hub-logo-wrap" aria-hidden="true">
            <img src="/assets/iconsf.PNG" alt="" className="hub-logo-img" width="160" height="160" loading="lazy" />
            <div className="hub-logo-glow"></div>
            <div className="hub-orbit hub-orbit-1"><div className="hub-dot"></div></div>
            <div className="hub-orbit hub-orbit-2"><div className="hub-dot"></div></div>
          </div>

          <div className="hub-wordmark">
            <div className="hub-wordmark-top">AetherCore</div>
            <div className="hub-wordmark-sub">Private AI Hub</div>
            <div className="hub-wordmark-line" aria-hidden="true"></div>
          </div>
        </div>

        <div className="hub-scroll-hint" id="hub-scroll-hint" aria-hidden="true">
          <span>scroll</span>
          <div className="hub-scroll-line"></div>
        </div>
      </header>

      {/* Intro */}
      <div className="hub-content-section">
        <div className="hub-content-inner">
          <div className="hub-badge hub-badge-teal">Neural Core</div>
          <h2 className="hub-section-title">Intelligence without boundaries.</h2>
          <p className="hub-section-desc">AetherCore is a sovereign AI infrastructure designed for those who demand performance, privacy, and precision. No cloud dependencies. No compromises. Just raw, unconstrained intelligence — under your control.</p>
          <div className="hub-glyph-row" aria-hidden="true">
            <span className="hub-glyph hub-g-1">Ψ</span>
            <span className="hub-glyph hub-g-2">Ω</span>
            <span className="hub-glyph hub-g-3">Λ</span>
            <span className="hub-glyph hub-g-4">Σ</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="hub-content-section">
        <div className="hub-content-inner">
          <div className="hub-badge hub-badge-gold">System Metrics</div>
          <h2 className="hub-section-title">AetherCore by the Numbers</h2>
          <div className="hub-stats-grid">
            <div className="hub-stat-card hub-stat-a">
              <div className="hub-stat-icon" aria-hidden="true">⬡</div>
              <div className="hub-stat-value">100%</div>
              <div className="hub-stat-label">Private &amp; Local</div>
              <div className="hub-stat-bar"><div className="hub-stat-fill" style={{ '--w': '100%' } as React.CSSProperties}></div></div>
            </div>
            <div className="hub-stat-card hub-stat-b">
              <div className="hub-stat-icon" aria-hidden="true">◈</div>
              <div className="hub-stat-value">0ms</div>
              <div className="hub-stat-label">Cloud Latency</div>
              <div className="hub-stat-bar"><div className="hub-stat-fill" style={{ '--w': '2%' } as React.CSSProperties}></div></div>
            </div>
            <div className="hub-stat-card hub-stat-c">
              <div className="hub-stat-icon" aria-hidden="true">⬟</div>
              <div className="hub-stat-value">∞</div>
              <div className="hub-stat-label">Model Support</div>
              <div className="hub-stat-bar"><div className="hub-stat-fill" style={{ '--w': '100%' } as React.CSSProperties}></div></div>
            </div>
            <div className="hub-stat-card hub-stat-d">
              <div className="hub-stat-icon" aria-hidden="true">◉</div>
              <div className="hub-stat-value">256-bit</div>
              <div className="hub-stat-label">Encryption</div>
              <div className="hub-stat-bar"><div className="hub-stat-fill" style={{ '--w': '88%' } as React.CSSProperties}></div></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="hub-content-section">
        <div className="hub-content-inner">
          <div className="hub-badge hub-badge-violet">Core Pillars</div>
          <h2 className="hub-section-title">Engineered for sovereignty.</h2>
          <div className="hub-features-list">
            <div className="hub-feature-item hub-feat-1">
              <div className="hub-feat-num" aria-hidden="true">01</div>
              <div className="hub-feat-content">
                <h3>Air-Gapped Architecture</h3>
                <p>Run entirely offline. Your data never leaves your hardware. Certified for high-security environments.</p>
              </div>
              <div className="hub-feat-divider" aria-hidden="true"></div>
            </div>
            <div className="hub-feature-item hub-feat-2">
              <div className="hub-feat-num" aria-hidden="true">02</div>
              <div className="hub-feat-content">
                <h3>Multi-Model Orchestration</h3>
                <p>Route queries across specialized models in real time. Intelligence that adapts to every task.</p>
              </div>
              <div className="hub-feat-divider" aria-hidden="true"></div>
            </div>
            <div className="hub-feature-item hub-feat-3">
              <div className="hub-feat-num" aria-hidden="true">03</div>
              <div className="hub-feat-content">
                <h3>Cryptographic Identity</h3>
                <p>Every session signed and sealed. Zero-knowledge architecture ensures even we cannot see your work.</p>
              </div>
              <div className="hub-feat-divider" aria-hidden="true"></div>
            </div>
            <div className="hub-feature-item hub-feat-4">
              <div className="hub-feat-num" aria-hidden="true">04</div>
              <div className="hub-feat-content">
                <h3>Aether API Gateway</h3>
                <p>Drop-in replacement for major AI APIs. Migrate in minutes. Stay private forever.</p>
              </div>
              <div className="hub-feat-divider" aria-hidden="true"></div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="hub-content-section" style={{ paddingBottom: 'clamp(6rem,12vw,10rem)' }}>
        <div className="hub-content-inner">
          <div className="hub-cta-inner">
            <span className="hub-cta-sigil" aria-hidden="true">Λ</span>
            <h2 className="hub-section-title" style={{ textAlign: 'center', maxWidth: 'none' }}>Enter the Aether.</h2>
            <p className="hub-section-desc" style={{ textAlign: 'center', margin: '0 auto' }}>Request private access. Limited nodes available.</p>
            <div className="hub-cta-buttons">
              <a href="#cta" className="btn-primary btn-large">Request Access</a>
              <a href="#architecture" className="btn-ghost btn-large">View Architecture</a>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
