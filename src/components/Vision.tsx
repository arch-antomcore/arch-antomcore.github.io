export default function Vision() {
  return (
    <section id="vision" className="section-border relative overflow-hidden px-6 py-24" aria-labelledby="vision-title">
      <div className="vision-field" aria-hidden="true"></div>
      <div className="mx-auto max-w-5xl">
        <div className="fade-up mb-12">
          <div className="mb-4 flex items-center">
            <span className="gold-line" aria-hidden="true"></span>
            <span className="label-kicker">09 — VISION</span>
          </div>
          <h2 id="vision-title" className="section-title-lg max-w-[600px]">
            From assistant<br />to <em className="text-gold">infrastructure.</em>
          </h2>
        </div>

        <div className="timeline-list relative pl-8">
          <article className="timeline-item relative mb-14">
            <div className="timeline-dot absolute -left-[21px] top-1" aria-hidden="true"></div>
            <p className="label-kicker mb-2">HOJE</p>
            <h3 className="mb-2 font-display text-2xl font-light">Local cognitive workspace</h3>
            <p className="max-w-lg text-sm font-light leading-relaxed text-mid">
              A CEF desktop runtime with local workspaces, engine routing, Aether Agent, RAG search, ARL approval flows, and native Rust tools for real file work.
            </p>
          </article>

          <article className="timeline-item relative mb-14">
            <div className="timeline-dot timeline-dot-muted absolute -left-[21px] top-1" aria-hidden="true"></div>
            <p className="label-kicker mb-2 opacity-60">PRÓXIMO — 12 MESES</p>
            <h3 className="mb-2 font-display text-2xl font-light text-mid">Enterprise-ready control plane</h3>
            <p className="max-w-lg text-sm font-light leading-relaxed text-dim">
              Signed packaging, stronger workspace-root enforcement, richer approval diffs, configurable memory retention, and private beta task packs for regulated teams.
            </p>
          </article>

          <article className="timeline-item relative">
            <div className="timeline-dot timeline-dot-faint absolute -left-[21px] top-1" aria-hidden="true"></div>
            <p className="label-kicker mb-2 opacity-40">HORIZONTE</p>
            <h3 className="mb-2 font-display text-2xl font-light text-dim">AI Infrastructure Layer</h3>
            <p className="max-w-lg text-sm font-light leading-relaxed text-dim">
              Hybrid sovereign nodes where local devices and optional dedicated AetherCore servers share governed work without surrendering custody by default.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
