export default function CallToAction() {
  return (
    <section id="cta" className="section-border relative overflow-hidden px-6 py-24" aria-labelledby="cta-title">
      <div className="cta-ring cta-ring-lg" aria-hidden="true"></div>
      <div className="cta-ring cta-ring-md" aria-hidden="true"></div>
      <div className="cta-ring cta-ring-sm" aria-hidden="true"></div>

      <div className="scale-in relative z-10 mx-auto max-w-3xl text-center">
        <p className="mb-6 font-mono text-xs text-gold">FOUNDER BETA ACCESS</p>
        <h2 id="cta-title" className="section-title-xl mb-6">
          Bring real files.<br /><em className="text-mid">Keep the controls visible.</em>
        </h2>
        <p className="mx-auto mb-10 max-w-lg text-[.98rem] font-light leading-relaxed text-mid">
          Founder beta starts with a small Curitiba cohort. The goal is practical: test governed local execution on real workflows before broad release.
        </p>

        <form id="early-access-form" className="signup-form mb-5" aria-label="Request early access">
          <label htmlFor="early-access-email" className="sr-only">Email address</label>
          <div aria-hidden="true" style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', zIndex: -1 }}>
            <label htmlFor="early-access-bot">Do not fill this out if you are human:</label>
            <input type="text" id="early-access-bot" name="early-access-bot" tabIndex={-1} autoComplete="off" />
          </div>
          <input id="early-access-email" className="signup-input" name="email" type="email" autoComplete="email" placeholder="founder@company.com" required />
          <button type="submit" className="btn-primary btn-large" aria-label="Request an invitation to the founder beta">
            <i className="bi bi-stars" aria-hidden="true"></i>
            Request founder beta
            <i className="bi bi-arrow-right-short" aria-hidden="true"></i>
          </button>
        </form>

        <p id="signup-feedback" className="signup-feedback mb-8 font-mono text-xs" role="status" aria-live="polite"></p>

        <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="#how" className="btn-ghost btn-large" aria-label="Read the AetherCore documentation">
            <i className="bi bi-file-earmark-text" aria-hidden="true"></i>
            See the execution loop
          </a>
        </div>

        <p className="font-mono text-xs text-dim">
          After signup: product brief · beta intake · no automatic data collection
        </p>
      </div>
    </section>
  );
}
