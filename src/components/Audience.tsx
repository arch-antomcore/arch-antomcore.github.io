export default function Audience() {
  return (
    <section id="audience" className="section-border px-6 py-20" aria-labelledby="audience-title">
      <div className="mx-auto max-w-7xl">
        <div className="fade-up mb-16 text-center">
          <div className="mb-4 flex items-center justify-center">
            <span className="gold-line" aria-hidden="true"></span>
            <span className="label-kicker">06 — WHO IT'S FOR</span>
          </div>
          <h2 id="audience-title" className="section-title-md">Built for regulated operations.</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <article className="card gs-stagger p-8 text-center lg:col-span-2 relative overflow-hidden bento-hero">
            <div className="cap-icon mx-auto mb-5 h-12 w-12 text-lg" aria-hidden="true"><i className="bi bi-shield-lock"></i></div>
            <h3 className="card-title-sm mb-3 font-display font-light">Legal & Compliance</h3>
            <p className="text-sm font-light leading-relaxed text-mid">
              Run auditable contract analysis, policy review, and evidence extraction locally with privacy preserved by design.
            </p>
          </article>

          <article className="card gs-stagger p-8 text-center">
            <div className="cap-icon mx-auto mb-5 h-12 w-12 text-lg" aria-hidden="true"><i className="bi bi-bar-chart-line"></i></div>
            <h3 className="card-title-sm mb-3 font-display font-light">Financial & Auditing</h3>
            <p className="text-sm font-light leading-relaxed text-mid">
              Process BI exports, audit workpapers, and anomaly detection with zero data exposure beyond controlled environments.
            </p>
          </article>

          <article className="card gs-stagger p-8 text-center">
            <div className="cap-icon mx-auto mb-5 h-12 w-12 text-lg" aria-hidden="true"><i className="bi bi-heart-pulse"></i></div>
            <h3 className="card-title-sm mb-3 font-display font-light">Healthcare & Clinics</h3>
            <p className="text-sm font-light leading-relaxed text-mid">
              Analyze patient records and clinic operations under strict compliance and LGPD-aligned local processing.
            </p>
          </article>

          <article className="card gs-stagger p-8 text-center lg:col-span-2 relative overflow-hidden bento-wide">
            <div className="cap-icon mx-auto mb-5 h-12 w-12 text-lg" aria-hidden="true"><i className="bi bi-terminal"></i></div>
            <h3 className="card-title-sm mb-3 font-display font-light">Enterprise Developers</h3>
            <p className="text-sm font-light leading-relaxed text-mid">
              Automate internal systems securely on local infrastructure without cloud API keys or secret sprawl.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
