export default function WhatItIs() {
  return (
    <section id="what" className="section-border relative overflow-hidden px-6 py-24" aria-labelledby="what-title">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <div className="fade-up glass-panel">
            <div className="mb-6 flex items-center">
              <span className="gold-line" aria-hidden="true"></span>
              <span className="label-kicker">01 — WHAT IT IS</span>
            </div>
            <h2 id="what-title" className="section-title-lg mb-8">
              Sovereign cognitive infrastructure<br /><em className="text-mid">for the real world.</em>
            </h2>
            <div className="space-y-6 text-[1rem] font-light leading-relaxed text-mid">
              <p>Most AI tools live in a browser tab. They generate text. They answer questions. They stop there.</p>
              <p>AetherCore was built on a different premise: intelligence without agency is incomplete. True capability requires the ability to <em className="not-italic text-text">act</em> — to read files, call tools, write outputs, and stop when an approval gate is required.</p>
              <p>This is not a cloud chatbot with a desktop skin. It is a local-first workspace that separates local data, agent execution, optional Uplink, and audit memory into explicit boundaries.</p>
            </div>
          </div>

          <aside className="motion-stable" aria-label="AetherCore definition">
            <div className="card mesh-bg relative overflow-hidden p-8">
              <div className="decor-circle-large" aria-hidden="true"></div>
              <div className="decor-circle-medium" aria-hidden="true"></div>

              <p className="mb-6 font-mono text-xs text-gold">aether·core /ˈeɪθər kɔːr/</p>
              <p className="mb-2 font-mono text-xs text-dim">noun · software architecture</p>
              <hr className="hr mb-6" />

              <p className="definition-copy mb-6 font-display font-light text-text">
                "An autonomous reasoning engine capable of decomposing goals, executing multi-step actions, and iterating toward outcomes — entirely within the user's local environment."
              </p>

              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-3">
                  <span className="bullet-dot mt-0" aria-hidden="true"></span>
                  <span className="font-mono text-xs text-mid">Trinity: Cofre Local · Aether Agent · Uplink</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="bullet-dot mt-0" aria-hidden="true"></span>
                  <span className="font-mono text-xs text-mid">Core runtime: Rust tools, CEF shell, typed IPC</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="bullet-dot mt-0" aria-hidden="true"></span>
                  <span className="font-mono text-xs text-mid">Loop: ReAct → ARL approval → auditable trace</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
