export default function ProductProof() {
  return (
    <section id="product-proof" className="section-border px-6 py-16" aria-labelledby="product-proof-title">
      <div className="mx-auto max-w-7xl">
        <div className="product-proof-grid grid gap-5 lg:grid-cols-[.95fr_1.05fr]">
          <div className="fade-up glass-panel">
            <div className="mb-5 flex items-center">
              <span className="gold-line" aria-hidden="true"></span>
              <span className="label-kicker">00 — PRODUCT REALITY</span>
            </div>
            <h2 id="product-proof-title" className="section-title-md mb-6">
              What you install.<br /><em className="text-mid">What is already real.</em>
            </h2>
            <p className="max-w-xl text-[1rem] font-light leading-relaxed text-mid">
              AetherCore is packaged as a local CEF desktop runtime: governed sessions, file-aware workspaces, RAG search, engine routing, native Rust tools, and an approval layer before sensitive writes or cloud Uplink.
            </p>
          </div>

          <div className="proof-steps grid gap-3 sm:grid-cols-3">
            <article className="card product-step gs-stagger p-5">
              <p className="mb-4 font-mono text-xs text-gold">RUN</p>
              <h3 className="mb-2 font-display text-[1.2rem] font-light text-text">CEF shell</h3>
              <p className="text-sm font-light leading-relaxed text-mid">Loads local assets through Chromium Embedded Framework without a localhost dev server.</p>
            </article>
            <article className="card product-step gs-stagger p-5">
              <p className="mb-4 font-mono text-xs text-gold">ACT</p>
              <h3 className="mb-2 font-display text-[1.2rem] font-light text-text">Agent runtime</h3>
              <p className="text-sm font-light leading-relaxed text-mid">Uses ReAct, tools, workspace memory, and visible execution events instead of hidden context.</p>
            </article>
            <article className="card product-step gs-stagger p-5">
              <p className="mb-4 font-mono text-xs text-gold">APPROVE</p>
              <h3 className="mb-2 font-display text-[1.2rem] font-light text-text">ARL decision</h3>
              <p className="text-sm font-light leading-relaxed text-mid">Write, delete, shell, PowerShell, REPL, and WriteExcel actions pause for human approval.</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
