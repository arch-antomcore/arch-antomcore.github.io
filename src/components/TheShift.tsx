export default function TheShift() {
  return (
    <section id="shift" className="section-border px-6 py-20" aria-labelledby="shift-title">
      <div className="mx-auto max-w-5xl">
        <div className="fade-up glass-panel mb-16 text-center">
          <div className="mb-4 flex items-center justify-center">
            <span className="gold-line" aria-hidden="true"></span>
            <span className="label-kicker">02 — THE SHIFT</span>
          </div>
          <h2 id="shift-title" className="section-title-lg">
            Not an upgrade.<br /><em className="text-mid">It's a paradigm shift.</em>
          </h2>
        </div>

        <div className="cascade grid gap-6 md:grid-cols-2">
          <article className="card compare-old border-dashed p-8">
            <h3 className="mb-5 font-mono text-xs text-dim">TRADITIONAL AI</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="comparison-mark text-dim" aria-hidden="true"><i className="bi bi-dash-circle"></i></span>
                <div>
                  <p className="mb-0.5 font-light leading-relaxed text-dim">Responds to prompts</p>
                  <p className="font-mono text-xs text-dim">Passive, reactive, terminal</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="comparison-mark text-dim" aria-hidden="true"><i className="bi bi-dash-circle"></i></span>
                <div>
                  <p className="mb-0.5 font-light leading-relaxed text-dim">Lives in the browser</p>
                  <p className="font-mono text-xs text-dim">Cloud-dependent, data-exposed</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="comparison-mark text-dim" aria-hidden="true"><i className="bi bi-dash-circle"></i></span>
                <div>
                  <p className="mb-0.5 font-light leading-relaxed text-dim">One shot per query</p>
                  <p className="font-mono text-xs text-dim">No iteration, no memory</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="comparison-mark text-dim" aria-hidden="true"><i className="bi bi-dash-circle"></i></span>
                <div>
                  <p className="mb-0.5 font-light leading-relaxed text-dim">Generates text and answers</p>
                  <p className="font-mono text-xs text-dim">You still have to do the real work</p>
                </div>
              </li>
            </ul>
          </article>

          <article className="card compare-new p-8">
            <h3 className="mb-5 font-mono text-xs text-gold">AETHERCORE</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="comparison-mark text-gold" aria-hidden="true"><i className="bi bi-arrow-right-circle"></i></span>
                <div>
                  <p className="mb-0.5 font-light leading-relaxed text-text">Acts toward goals</p>
                  <p className="font-mono text-xs text-mid">Plans, executes, self-corrects</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="comparison-mark text-gold" aria-hidden="true"><i className="bi bi-arrow-right-circle"></i></span>
                <div>
                  <p className="mb-0.5 font-light leading-relaxed text-text">Runs on your hardware</p>
                  <p className="font-mono text-xs text-mid">Local-first, Uplink explicit</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="comparison-mark text-gold" aria-hidden="true"><i className="bi bi-arrow-right-circle"></i></span>
                <div>
                  <p className="mb-0.5 font-light leading-relaxed text-text">Iterative execution loop</p>
                  <p className="font-mono text-xs text-mid">Stateful memory and file context</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="comparison-mark text-gold" aria-hidden="true"><i className="bi bi-arrow-right-circle"></i></span>
                <div>
                  <p className="mb-0.5 font-light leading-relaxed text-text">Calls native Rust tools</p>
                  <p className="font-mono text-xs text-mid">Governed by ARL approval gates</p>
                </div>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
