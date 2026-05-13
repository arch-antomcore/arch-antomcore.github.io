export default function Philosophy() {
  return (
    <section id="philosophy" className="section-border relative overflow-hidden px-6 py-24" aria-labelledby="philosophy-title">
      <div className="fade-up relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-8 flex items-center justify-center">
          <span className="gold-line" aria-hidden="true"></span>
              <span className="label-kicker">07 — PHILOSOPHY</span>
        </div>

        <div className="relative inline-block">
          <span className="quote-mark" aria-hidden="true">"</span>
          <h2 id="philosophy-title" className="quote-text">
            Intelligence is not about answering better.<br />
            <span className="text-gold">It's about solving better.</span>
          </h2>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-mid">
          The history of computing is a history of abstraction — each layer freeing us to think at a higher level. AetherCore is the next layer: not a tool you use, but a system that acts alongside you, transparently, with your goals as its own.
        </p>

        <div className="cascade mt-8 grid gap-5 text-left lg:grid-cols-3">
          <article className="philosophy-card p-8 lg:col-span-2 relative overflow-hidden bento-hero">
            <h3 className="mb-4 font-display text-[1.4rem] italic text-gold">Sovereign</h3>
            <p className="text-base font-light leading-relaxed text-mid">Your data belongs to you. Always. The system runs where you choose, processes what you permit. AetherCore doesn't force your work into an opaque cloud ecosystem.</p>
          </article>
          <article className="philosophy-card p-6">
            <h3 className="mb-2 font-display text-[1.1rem] italic text-gold">Transparent</h3>
            <p className="text-sm font-light leading-relaxed text-mid">Every action is visible, auditable, and reversible. You are always in control of what the agent does.</p>
          </article>
          <article className="philosophy-card p-6">
            <h3 className="mb-2 font-display text-[1.1rem] italic text-gold">Purposeful</h3>
            <p className="text-sm font-light leading-relaxed text-mid">Not built to impress — built to complete. Every design decision bends toward actual utility.</p>
          </article>
          <article className="philosophy-card p-6 lg:col-span-2">
            <h3 className="mb-2 font-display text-[1.1rem] italic text-gold">Governed</h3>
            <p className="text-sm font-light leading-relaxed text-mid">Agentic actions without guardrails are liabilities. We prioritize human approval over complete autonomy when state changes are involved.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
