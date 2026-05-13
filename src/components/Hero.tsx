export default function Hero() {
  return (
    <section id="hero" className="hero-section relative flex min-h-screen flex-col items-center justify-center overflow-hidden" aria-labelledby="hero-title">
      <div id="hero-3d" className="hero-3d" aria-hidden="true"></div>
      <div className="hero-grid" aria-hidden="true"></div>
      <div className="hero-vignette" aria-hidden="true"></div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <div className="hero-fade fade-in mb-6 flex flex-wrap justify-center gap-3">
          <div className="eyebrow inline-flex items-center gap-3 rounded-full px-4 py-2">
            <i className="bi bi-stars text-teal" aria-hidden="true"></i>
            <span className="font-mono text-xs text-gold">0.1.0-pre — Founder Beta</span>
          </div>
          <div className="eyebrow inline-flex items-center gap-3 rounded-full px-4 py-2">
            <i className="bi bi-shield-lock text-teal" aria-hidden="true"></i>
            <span className="font-mono text-xs text-gold">Local-first by default</span>
          </div>
          <div className="eyebrow inline-flex items-center gap-3 rounded-full px-4 py-2">
            <span className="font-mono text-xs text-dim">CEF desktop runtime</span>
          </div>
        </div>

        <h1 id="hero-title" className="hero-headline mb-6">
          <span className="word-mask"><span className="word-inner">AetherCore:</span></span><br />
          <span className="word-mask"><span className="word-inner text-gold">doesn't answer.</span></span><br />
          <span className="word-mask"><span className="word-inner text-gold">It executes.<span className="cursor" aria-hidden="true"></span></span></span>
        </h1>

        <p className="hero-fade fade-up mx-auto mb-6 max-w-2xl text-[1.15rem] font-light leading-relaxed text-mid">
          AetherCore is a local-first AI workspace that plans, acts, and executes real tasks beside your files. It uses local engines by default, exposes cloud Uplink as an explicit choice, and routes sensitive actions through ARL approval gates.
        </p>

        <div className="hero-fade fade-up flex flex-col items-center justify-center gap-6 sm:flex-row sm:items-start">
          <div className="flex flex-col items-center gap-3">
            <a href="#cta" className="btn-primary" aria-label="Request founder beta access in Curitiba">
              <i className="bi bi-stars" aria-hidden="true"></i>
              Founder beta — Curitiba
              <i className="bi bi-arrow-right-short" aria-hidden="true"></i>
            </a>
            <span className="font-mono text-[10px] uppercase tracking-widest text-gold/60">Invite only • limited batch</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <a href="#how" className="btn-ghost" aria-label="Watch AetherCore execution loop">
              <i className="bi bi-play-circle" aria-hidden="true"></i>
              Watch the execution loop
            </a>
            <span className="font-mono text-[10px] uppercase tracking-widest text-gold/0" aria-hidden="true">&nbsp;</span>
          </div>
        </div>

        <dl className="hero-fade fade-up hero-metrics mt-10 grid sm:inline-grid sm:grid-cols-3">
          <div className="hero-metric text-center">
            <i className="bi bi-window-sidebar" aria-hidden="true"></i>
            <dt className="font-display text-3xl font-light text-text">CEF</dt>
            <dd className="mt-1 font-mono text-xs text-dim">desktop shell</dd>
          </div>
          <div className="hero-metric border-y border-border text-center sm:border-x sm:border-y-0">
            <i className="bi bi-shield-check" aria-hidden="true"></i>
            <dt className="font-display text-3xl font-light text-text">ARL</dt>
            <dd className="mt-1 font-mono text-xs text-dim">approval layer</dd>
          </div>
          <div className="hero-metric text-center">
            <i className="bi bi-file-earmark-spreadsheet" aria-hidden="true"></i>
            <dt className="font-display text-3xl font-light text-text">XLSX</dt>
            <dd className="mt-1 font-mono text-xs text-dim">native BI tools</dd>
          </div>
        </dl>
      </div>

      <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 opacity-30" aria-hidden="true">
        <span className="font-mono text-xs text-dim">scroll</span>
        <span className="scroll-line"></span>
      </div>
    </section>
  );
}
